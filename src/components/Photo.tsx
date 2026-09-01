import manifest from "@/generated/image-manifest.json";

/**
 * Drop-in replacement for `<img>` that serves a resized WebP derivative when
 * one exists for `src`, and behaves exactly like a plain `<img>` when one
 * doesn't.
 *
 * The originals under public/__l5e are 2–3 MB PNGs painted into 200–400 px
 * boxes. They are all `loading="lazy"`, so they never blocked first paint, but
 * Chrome's lazy threshold reaches ~2500 px on a slow connection — far enough
 * down a page this long that several of them were competing with the LCP image
 * for a throttled 1.6 Mbps link. The 800 px derivatives are typically 50–150 KB,
 * i.e. 95–98% smaller, at a size no larger than they are ever displayed.
 *
 * Derivatives and the manifest are produced by scripts/optimize-images.mjs.
 * Anything not in the manifest — small images, SVGs, the already-optimized hero
 * and logo WebPs — falls through untouched, so this is safe to use anywhere.
 */

type Entry = {
  /** Path prefix; the real files are `${b}-${w}.webp`. */
  b: string;
  /** Widths actually generated, ascending. Never upscaled past the source. */
  w: number[];
  /** Intrinsic [width, height] of the *original*, for aspect-ratio. */
  ar: [number, number];
};

const MAP = manifest as unknown as Record<string, Entry>;

export type PhotoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function Photo({ src, sizes, ...rest }: PhotoProps) {
  const entry = typeof src === "string" ? MAP[src] : undefined;

  if (!entry) {
    return <img src={src} sizes={sizes} {...rest} />;
  }

  const srcSet = entry.w.map((w) => `${entry.b}-${w}.webp ${w}w`).join(", ");
  // Fallback `src` for the srcSet-less path: prefer 800w, else the widest we
  // generated. Never the original — that is the multi-megabyte file.
  const fallbackWidth = entry.w.includes(800) ? 800 : entry.w[entry.w.length - 1];

  return (
    <img
      src={`${entry.b}-${fallbackWidth}.webp`}
      srcSet={srcSet}
      // Without a hint the browser assumes the image is full-width. That is
      // right for the full-bleed sections and merely conservative elsewhere,
      // so callers only need to pass `sizes` for grids and thumbnails.
      sizes={sizes ?? "100vw"}
      // Intrinsic size lets the browser reserve the box before bytes arrive.
      // `rest` is spread after, so an explicit width/height still wins.
      width={entry.ar[0]}
      height={entry.ar[1]}
      {...rest}
    />
  );
}
