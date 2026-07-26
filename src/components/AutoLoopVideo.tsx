import { Play, MapPin } from "lucide-react";
import chimneySweepVideo from "@/assets/videos/chimney-sweep-action.mp4.asset.json";

export function AutoLoopVideo({ className = "" }: { className?: string }) {
  return (
    <video
      className={className}
      src={chimneySweepVideo.url}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
    />
  );
}

export function AutoLoopVideoSection() {
  return (
    <section className="relative bg-secondary/40 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent" />
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-8 flex flex-col items-center text-center md:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Play className="h-3.5 w-3.5 text-flame" /> Watch our crew
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
            Real ChimCrew Job — Live On The Roof
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground/75 md:text-[16px]">
            No stock footage. This is our team on an actual Ohio home — the same crew
            that shows up when you book below.
          </p>
        </div>

        <figure className="relative overflow-hidden rounded-none border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0_0_0/0.5)]">
          <AutoLoopVideo className="block aspect-video w-full object-cover" />
          <figcaption className="flex items-center justify-between gap-3 border-t border-border bg-background/80 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 md:px-5">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3 w-3 text-flame" /> ChimCrew · Ohio · Real job footage
            </span>
            <span className="hidden items-center gap-2 sm:inline-flex">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
              Live loop
            </span>
          </figcaption>
        </figure>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent" />
    </section>
  );
}
