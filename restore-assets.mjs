#!/usr/bin/env node
/**
 * restore-assets.mjs
 *
 * The repo contains *.asset.json pointer files instead of real images/videos.
 * Each pointer has a `url` like /__l5e/assets-v1/<asset-id>/<filename>, which is
 * only served by Lovable's hosting layer -- nothing in this repo serves it, so
 * every one of those images 404s outside Lovable.
 *
 * This script downloads each asset from a host that still serves it and writes it
 * to public/__l5e/... so the SAME urls resolve as plain static files. No source
 * code changes required.
 *
 * Usage:
 *   node restore-assets.mjs                          # pulls from https://chimcrew.com
 *   node restore-assets.mjs --base https://your-lovable-preview.lovable.app
 *   node restore-assets.mjs --dry                    # list what it would fetch
 *
 * Run from the repo root. Requires Node 18+.
 */

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const BASE = (args.includes("--base") ? args[args.indexOf("--base") + 1] : "https://chimcrew.com")
  .replace(/\/$/, "");
const DRY = args.includes("--dry");
const CONCURRENCY = 6;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".asset.json")) out.push(full);
  }
  return out;
}

const exists = (p) => access(p).then(() => true, () => false);

const pointers = walk("src/assets");
console.log(`Found ${pointers.length} asset pointers. Base: ${BASE}\n`);

const jobs = [];
for (const p of pointers) {
  const meta = JSON.parse(await readFile(p, "utf8"));
  if (!meta.url) {
    console.warn(`!  no url field in ${p}`);
    continue;
  }
  const dest = path.join("public", meta.url.replace(/^\//, ""));
  jobs.push({ src: BASE + meta.url, dest, size: meta.size, type: meta.content_type });
}

if (DRY) {
  for (const j of jobs) console.log(`${j.src}\n   -> ${j.dest}  (${j.type}, ${j.size} bytes)`);
  console.log(`\n${jobs.length} files, ~${(jobs.reduce((a, j) => a + (j.size || 0), 0) / 1048576).toFixed(1)} MB`);
  process.exit(0);
}

let ok = 0;
const failed = [];

async function run(job) {
  if (await exists(job.dest)) {
    ok++;
    return;
  }
  try {
    const res = await fetch(job.src, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("text/html") || buf.subarray(0, 15).toString().toLowerCase().includes("<!doctype")) {
      throw new Error("got HTML, not the asset (host is not serving /__l5e/)");
    }
    await mkdir(path.dirname(job.dest), { recursive: true });
    await writeFile(job.dest, buf);
    ok++;
    console.log(`ok   ${path.basename(job.dest)}  ${(buf.length / 1024).toFixed(0)} KB`);
  } catch (err) {
    failed.push({ job, err: err.message });
    console.log(`FAIL ${path.basename(job.dest)}  ${err.message}`);
  }
}

const queue = [...jobs];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) await run(queue.shift());
  }),
);

console.log(`\nDone. ${ok}/${jobs.length} restored.`);
if (failed.length) {
  console.log(`\n${failed.length} failed:`);
  for (const f of failed.slice(0, 20)) console.log(`  ${f.job.src}  -- ${f.err}`);
  console.log(`\nIf everything failed, ${BASE} isn't serving /__l5e/ either. Try --base with the`);
  console.log(`Lovable preview URL, or re-upload the originals.`);
  process.exit(1);
}
