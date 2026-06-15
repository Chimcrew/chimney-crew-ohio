import { CalendarCheck, Camera, ShieldCheck, Zap } from "lucide-react";
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
      className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28"
    >
      {/* Atmospheric background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,_oklch(0.22_0.02_250)_0%,_oklch(0.08_0.01_250)_70%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-flame/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-flame/10 blur-3xl" aria-hidden />

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
            Get a detailed aerial inspection without climbing onto your roof. Fast,
            safe, and accurate chimney diagnostics using professional drone technology.
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
              <CalendarCheck className="h-4 w-4" /> Schedule Free Inspection
            </button>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60">
              No roof access required · FAA-compliant pilots
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          {/* Ambient glow */}
          <div className="absolute -inset-6 rounded-[2rem] bg-flame/20 blur-3xl" aria-hidden />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.12_0.01_250)] shadow-[0_30px_80px_oklch(0_0_0/0.55)]">
            {/* Top status bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-flame/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
                </span>
                Drone Feed · Live
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                ALT 42 ft · GPS lock
              </span>
            </div>

            {/* Real drone footage */}
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
              {/* Corner brackets */}
              <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-flame" />
              <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-flame" />
              <span className="pointer-events-none absolute left-3 bottom-3 h-4 w-4 border-l-2 border-b-2 border-flame" />
              <span className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r-2 border-b-2 border-flame" />
              {/* Bottom telemetry */}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg border border-white/15 bg-primary/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/85 backdrop-blur">
                <span>CHIMNEY · CROWN SCAN</span>
                <span className="text-flame">REC ●</span>
              </div>
            </div>

            {/* Footer chips */}
            <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3">
              <span className="rounded-full border border-flame/40 bg-flame/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                4K
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
                Thermal-ready
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                ChimCrew Aerial Ops
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drone-fly {
          0%, 100% { transform: translate(-50%, 0) rotate(-2deg); }
          25% { transform: translate(-58%, -6px) rotate(-3deg); }
          50% { transform: translate(-50%, 4px) rotate(2deg); }
          75% { transform: translate(-42%, -4px) rotate(3deg); }
        }
        .drone-fly { animation: drone-fly 6s ease-in-out infinite; }
        @keyframes drone-rotor {
          0% { opacity: 0.25; transform: scaleY(0.4); }
          50% { opacity: 0.85; transform: scaleY(1); }
          100% { opacity: 0.25; transform: scaleY(0.4); }
        }
        .drone-rotor { transform-origin: center; transform-box: fill-box; animation: drone-rotor 0.18s linear infinite; }
        @keyframes drone-scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .drone-scan { animation: drone-scan 3.5s linear infinite; }
        @keyframes drone-beam {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
        .drone-beam { animation: drone-beam 2.4s ease-in-out infinite; }
        @keyframes drone-smoke {
          0% { transform: translateY(0); opacity: 0.6; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        .drone-smoke circle { animation: drone-smoke 4s ease-out infinite; }
        .drone-smoke circle:nth-child(2) { animation-delay: 1.3s; }
        .drone-smoke circle:nth-child(3) { animation-delay: 2.6s; }
      `}</style>
    </section>
  );
}
