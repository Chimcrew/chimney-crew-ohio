import { CalendarCheck, Camera, ShieldCheck, Zap, Flame } from "lucide-react";
import droneVideo from "@/assets/drone-inspection.mp4.asset.json";

function openSchedule() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("chimcrew:open-schedule"));
  }
}

export function DroneInspection() {
  return (
    <section
      aria-labelledby="drone-heading"
      className="relative overflow-hidden bg-background py-20 text-foreground md:py-28"
    >
      {/* Warm hearth atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_oklch(0.78_0.19_92/0.12)_0%,_transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-flame/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-flame/10 blur-3xl"
        aria-hidden
      />
      {/* Top + bottom brick-tone hairlines */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <h2
            id="drone-heading"
            className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Drone <span className="text-primary">Inspection</span> only $69
          </h2>
          <p className="mt-5 max-w-xl text-base text-foreground md:text-lg">
            Get a detailed aerial inspection without climbing onto your roof. Fast, safe, and
            accurate chimney diagnostics using professional drone technology.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Camera, label: "4K aerial photo report" },
              { icon: ShieldCheck, label: "Zero-risk, no roof damage" },
              { icon: Zap, label: "Same-day diagnostics" },
              { icon: CalendarCheck, label: "Free with any quote" },
            ].map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-3 rounded-xl border border-foreground/15 bg-background/80 px-4 py-3 shadow-sm backdrop-blur"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground ring-1 ring-primary/40">
                  <b.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-foreground">{b.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openSchedule}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
            >
              <CalendarCheck className="h-4 w-4" /> Schedule appointment online
            </button>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              No roof access required · FAA-compliant pilots
            </span>
          </div>
        </div>

        {/* Video — framed like a hearth window */}
        <div className="relative">
          {/* warm glow halo */}
          <div className="absolute -inset-6 rounded-[2rem] bg-flame/25 blur-3xl" aria-hidden />

          {/* Mantel header */}
          <div className="relative mx-auto max-w-md rounded-t-2xl bg-[oklch(0.32_0.04_45)] px-5 py-3 shadow-[0_6px_0_oklch(0.22_0.03_45)]">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                <Flame className="h-3 w-3" /> Live drone feed
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[oklch(0.92_0.06_70)]">
                <Camera className="h-3 w-3" /> 4K
              </span>
            </div>
          </div>

          {/* Brick frame around video */}
          <div className="relative mx-auto max-w-md overflow-hidden rounded-b-2xl bg-[oklch(0.45_0.09_40)] p-3 shadow-[0_30px_60px_-20px_oklch(0_0_0/0.4)]">
            {/* faux brick pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              aria-hidden
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.35_0.08_40) 2px, transparent 2px), linear-gradient(90deg, oklch(0.35_0.08_40) 2px, transparent 2px)",
                backgroundSize: "44px 22px",
              }}
            />
            <div className="relative overflow-hidden rounded-lg ring-2 ring-[oklch(0.28_0.04_40)]">
              <div className="relative aspect-video bg-black">
                <video
                  src={droneVideo.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Hearth base / mantel ledge */}
          <div className="relative mx-auto h-3 max-w-[28rem] -mt-px rounded-b-md bg-[oklch(0.28_0.04_45)] shadow-[0_4px_10px_oklch(0_0_0/0.25)]" />

          <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            Roofline · crown · flashing · masonry — documented in one visit
          </p>
        </div>
      </div>
    </section>
  );
}
