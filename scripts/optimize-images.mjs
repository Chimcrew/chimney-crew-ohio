#!/usr/bin/env node
/**
 * optimize-images.mjs
 *
 * Generates width-capped WebP derivatives for the heavy raster assets under
 * public/ and writes a compact manifest that <Photo> (src/components/Photo.tsx)
 * uses to pick a sensible file at render time.
 *
 * The originals in public/__l5e are left untouched — they are checked in, and
 * restore-assets.mjs re-fetches them by their original URL. This script only
 * ever *adds* files under public/optimized/l5e.
 *
 * Why: the homepage renders 2–3 MB PNGs inside 200–400 px boxes. They are all
 * `loading="lazy"`, so they do not block first paint, but Chrome's lazy
 * threshold is ~2500 px on a slow connection, which is well inside a page this
 * long. On Lighthouse's throttled mobile profile (1.6 Mbps) that is many
 * seconds of contention against the LCP image.
 *
 * Usage: node scripts/optimize-images.mjs [--force]
 * Re-run when new source images are added.
 */

import { mkdir, writeFile, readdir, stat, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "optimized", "l5e");
const MANIFEST = path.join(ROOT, "src", "generated", "image-manifest.json");
const FORCE = process.argv.includes("--force");

/**
 * Only bother with files that are actually heavy *and* big enough that the
 * derivatives are a genuine downscale. Anything smaller is left to be served
 * as-is, and <Photo> falls through to the original `src` for it.
 */
const MIN_BYTES = 250 * 1024;
const MIN_SOURCE_WIDTH = 900;
/** Nothing on this site paints an image wider than ~1200 CSS px. */
const WIDTHS = [400, 800, 1200];
const QUALITY = 74;

const SCAN_DIRS = [
  path.join(ROOT, "public", "__l5e"),
  path.join(ROOT, "public", "photos"),
];

const IMAGE_RE = /\.(png|jpe?g)$/i;

async function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else if (IMAGE_RE.test(e.name)) out.push(full);
  }
  return out;
}

await mkdir(OUT_DIR, { recursive: true });
await mkdir(path.dirname(MANIFEST), { recursive: true });

const manifest = {};
let originalBytes = 0;
let derivedBytes = 0;
let converted = 0;
let skipped = 0;

for (const dir of SCAN_DIRS) {
  for (const file of await walk(dir)) {
    const { size } = await stat(file);
    // Public URL is the path relative to public/, with forward slashes.
    const url = "/" + path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");

    if (size < MIN_BYTES) {
      skipped++;
      continue;
    }

    let meta;
    try {
      meta = await sharp(file).metadata();
    } catch {
      console.warn(`  ! unreadable, left alone: ${url}`);
      skipped++;
      continue;
    }
    if (!meta.width || !meta.height || meta.width < MIN_SOURCE_WIDTH) {
      skipped++;
      continue;
    }

    // Content-addressed name: hashing the *source bytes* means the filename
    // changes if and only if the image does, which is what makes the
    // `immutable` cache header in netlify.toml safe.
    const base = createHash("sha1").update(await readFile(file)).digest("hex").slice(0, 10);
    const widths = WIDTHS.filter((w) => w < meta.width);
    // Always include the native width (capped) so we never upscale but still
    // have a "full size" candidate.
    const largest = Math.min(meta.width, WIDTHS[WIDTHS.length - 1]);
    if (!widths.includes(largest)) widths.push(largest);
    widths.sort((a, b) => a - b);

    const emitted = [];
    for (const w of widths) {
      const outName = `${base}-${w}.webp`;
      const outPath = path.join(OUT_DIR, outName);
      if (FORCE || !existsSync(outPath)) {
        await sharp(file)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: QUALITY, effort: 5 })
          .toFile(outPath);
      }
      emitted.push(w);
      derivedBytes += (await stat(outPath)).size;
    }

    originalBytes += size;
    converted++;
    manifest[url] = {
      b: `/optimized/l5e/${base}`,
      w: emitted,
      ar: [meta.width, meta.height],
    };
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 0) + "\n");

console.log(
  `\nconverted ${converted} images (${skipped} skipped as small/unreadable)\n` +
    `originals : ${(originalBytes / 1024 / 1024).toFixed(1)} MB\n` +
    `derivatives: ${(derivedBytes / 1024 / 1024).toFixed(1)} MB across ${WIDTHS.length} widths\n` +
    `manifest  : ${MANIFEST} (${(JSON.stringify(manifest).length / 1024).toFixed(1)} KB)`,
);
