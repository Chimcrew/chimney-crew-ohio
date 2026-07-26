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
    <section className="relative bg-secondary/40 py-14 md:py-18">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent" />
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="mb-6 flex flex-col items-center text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Play className="h-3.5 w-3.5 text-flame" /> Watch our crew
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
            Inside the Fireplace — How We Sweep
          </h2>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-foreground/75 md:text-[15px]">
            A look at our team at work — the same crew that shows up when you book below.
          </p>
        </div>

        <figure className="relative overflow-hidden rounded-xl border-2 border-border bg-card p-2 shadow-[0_30px_80px_-30px_oklch(0_0_0/0.5)]">
          <div className="overflow-hidden rounded-lg border border-border bg-black">
            <AutoLoopVideo className="block aspect-video w-full object-cover" />
          </div>
          <figcaption className="flex items-center justify-between gap-3 px-2 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 md:px-3">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3 w-3 text-flame" /> ChimCrew · Ohio · Job footage
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
