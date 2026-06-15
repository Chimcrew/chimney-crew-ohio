import { CalendarCheck, Camera, ShieldCheck, Zap } from "lucide-react";
import droneVideo from "@/assets/drone-inspection.mp4.asset.json";
import inspectionRoofPhoto from "@/assets/team/chimcrew-inspection-roof.png.asset.json";
import brickWall from "@/assets/brick-wall-texture.jpg.asset.json";

function openSchedule() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("chimcrew:open-schedule"));
  }
}

export function DroneInspection() {
  return (
    <section
      aria-labelledby="drone-heading"
      className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28"
    >
      {/* Atmospheric background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,_oklch(0.22_0.02_250)_0%,_oklch(0.08_0.01_250)_70%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-flame/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-flame/10 blur-3xl"
        aria-hidden
      />

      {/* Subtle scan-line grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame backdrop-blur">
            <Zap className="h-3 w-3" /> New · High-Tech Inspection
          </span>
          <h2
            id="drone-heading"
            className="mt-5 font-display text-5xl font-extrabold leading-[0.98] tracking-tight md:text-6xl"
          >
            Drone <span className="text-flame">Chimney Inspection</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
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
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-flame/15 text-flame ring-1 ring-flame/30">
                  <b.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-primary-foreground/90">{b.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openSchedule}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-flame px-7 font-display text-sm font-extrabold uppercase tracking-widest text-primary shadow-[0_18px_40px_oklch(0.78_0.19_92/0.35)] transition hover:bg-white"
            >
              <CalendarCheck className="h-4 w-4" /> Schedule Appointment Online
            </button>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60">
              No roof access required · FAA-compliant pilots
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-flame/12 blur-3xl" aria-hidden />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.12_0.01_250)] shadow-[0_30px_80px_oklch(0_0_0/0.55)]">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
              <div className="relative aspect-[5/4] overflow-hidden bg-black">
                <video
                  src={droneVideo.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"
                  aria-hidden
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-primary/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/82 backdrop-blur">
                  <Camera className="h-3 w-3 text-flame" /> 4K drone footage
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-primary/85 px-4 py-3 backdrop-blur">
                  <p className="font-display text-sm font-bold text-primary-foreground">
                    Roofline, crown, chase cover, flashing, and masonry documented in one visit.
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">
                    Photo report · safer roof access · faster diagnosis
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 lg:border-l lg:border-t-0">
                <img
                  src={inspectionRoofPhoto.url}
                  alt="A ChimCrew technician inspecting a chimney on a roof in Ohio"
                  className="aspect-[5/4] w-full object-cover lg:aspect-auto lg:h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
