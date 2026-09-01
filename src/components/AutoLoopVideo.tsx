import { useEffect, useRef, useState } from "react";
import { Play, MapPin } from "lucide-react";
import { Photo } from "@/components/Photo";
import chimneySweepVideo from "@/assets/videos/chimney-sweep-action.mp4.asset.json";
import cwWaterproof from "@/assets/crew/crew-chimney-waterproof.jpeg.asset.json";
import cwStoneTuck from "@/assets/crew/crew-stone-tuckpoint.jpeg.asset.json";
import cwChaseFarm from "@/assets/crew/crew-chase-cover-farm.jpeg.asset.json";
import cwCapBrickCrown from "@/assets/crew/crew-cap-brick-crown.jpeg.asset.json";

const CREW_PHOTOS = [
  { src: "/photos/crew-ladder-yellow.jpg", alt: "ChimCrew techs in yellow uniforms finishing a dual-cap brick chimney from a ladder" },
  { src: "/photos/crew-john-flashseal.jpg", alt: "ChimCrew technician John sealing chimney flashing on a residential roof" },
  { src: cwWaterproof.url, alt: "ChimCrew crew member waterproofing a chimney and sealing flashing" },
  { src: cwStoneTuck.url, alt: "ChimCrew mason tuckpointing a stone chimney" },
  { src: cwChaseFarm.url, alt: "ChimCrew tech fitting a new chase cover and cap on a country home" },
  { src: cwCapBrickCrown.url, alt: "ChimCrew technician setting a stainless cap on a brick chimney crown" },
];

export function AutoLoopVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  // The clip is ~3 MB and lives well below the fold. Hold back the `src` until
  // the element is approaching the viewport, then let it autoplay as before.
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  // Autoplay is best-effort: a rejected play() promise (e.g. Low Power Mode)
  // must not surface as an unhandled rejection.
  useEffect(() => {
    if (!near) return;
    ref.current?.play().catch(() => {});
  }, [near]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay={near}
      loop
      muted
      playsInline
      preload="metadata"
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
      {...(near ? { src: chimneySweepVideo.url } : {})}
    />
  );
}

export function AutoLoopVideoSection() {
  return (
    <section className="relative bg-secondary/40 py-14 md:py-18">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-6 flex flex-col items-center text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Play className="h-3.5 w-3.5 text-flame" /> Watch our crew
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
            Our Chimney Crew
          </h2>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-foreground/75 md:text-[15px]">
            Real photos of the ChimCrew team on Ohio rooftops — the same crew that shows up
            when you book below.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:items-start">
          <figure className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-xl border-2 border-border bg-card p-2 shadow-[0_20px_60px_-30px_oklch(0_0_0/0.5)]">
            <div className="overflow-hidden rounded-lg border border-border bg-black">
              <AutoLoopVideo className="block aspect-video w-full object-cover" />
            </div>
            <figcaption className="flex items-center justify-between gap-2 px-1 pb-0.5 pt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/70">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-flame" /> ChimCrew · Ohio
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
                Live loop
              </span>
            </figcaption>
          </figure>

          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {CREW_PHOTOS.map((p) => (
              <div
                key={p.src}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-card"
              >
                <Photo
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  // Always a 3-up grid; the column is capped by the section's
                  // max-w-6xl container on large screens.
                  sizes="(min-width: 768px) 22vw, 31vw"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent" />
    </section>
  );
}
