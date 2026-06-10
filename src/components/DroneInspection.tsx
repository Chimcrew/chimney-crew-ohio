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

            {/* Animated SVG drone scene */}
            <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-b from-[oklch(0.18_0.02_250)] via-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.02_250)]">
              {/* sky grid */}
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, oklch(0.78 0.19 92 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.78 0.19 92 / 0.4) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(ellipse at center, black 40%, transparent 75%)",
                }}
              />
              {/* scanning line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-flame shadow-[0_0_20px_4px_oklch(0.78_0.19_92/0.6)] drone-scan" />

              {/* House + chimney silhouette */}
              <svg viewBox="0 0 400 320" className="absolute inset-x-0 bottom-0 w-full" aria-hidden>
                <defs>
                  <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="oklch(0.32 0.03 250)" />
                    <stop offset="1" stopColor="oklch(0.18 0.02 250)" />
                  </linearGradient>
                  <linearGradient id="brick" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="oklch(0.55 0.13 40)" />
                    <stop offset="1" stopColor="oklch(0.32 0.10 40)" />
                  </linearGradient>
                </defs>
                {/* house body */}
                <rect x="60" y="210" width="280" height="100" fill="oklch(0.22 0.02 250)" />
                {/* roof */}
                <polygon points="40,210 200,120 360,210" fill="url(#roof)" />
                {/* chimney */}
                <rect x="240" y="140" width="44" height="100" fill="url(#brick)" />
                <rect x="234" y="134" width="56" height="12" fill="oklch(0.28 0.02 250)" />
                {/* brick lines */}
                <g stroke="oklch(0.18 0.02 30 / 0.6)" strokeWidth="1">
                  <line x1="240" y1="160" x2="284" y2="160" />
                  <line x1="240" y1="180" x2="284" y2="180" />
                  <line x1="240" y1="200" x2="284" y2="200" />
                  <line x1="240" y1="220" x2="284" y2="220" />
                </g>
                {/* warm smoke */}
                <g className="drone-smoke" opacity="0.6">
                  <circle cx="262" cy="120" r="8" fill="oklch(0.85 0.02 250 / 0.4)" />
                  <circle cx="270" cy="100" r="10" fill="oklch(0.85 0.02 250 / 0.3)" />
                  <circle cx="258" cy="82" r="12" fill="oklch(0.85 0.02 250 / 0.2)" />
                </g>
              </svg>

              {/* Drone */}
              <svg viewBox="0 0 120 80" className="drone-fly absolute left-1/2 top-[28%] w-44 -translate-x-1/2" aria-hidden>
                {/* rotors */}
                <g className="drone-rotor">
                  <ellipse cx="20" cy="20" rx="18" ry="3" fill="oklch(0.78 0.19 92 / 0.45)" />
                  <ellipse cx="100" cy="20" rx="18" ry="3" fill="oklch(0.78 0.19 92 / 0.45)" />
                  <ellipse cx="20" cy="60" rx="18" ry="3" fill="oklch(0.78 0.19 92 / 0.45)" />
                  <ellipse cx="100" cy="60" rx="18" ry="3" fill="oklch(0.78 0.19 92 / 0.45)" />
                </g>
                {/* arms */}
                <line x1="20" y1="20" x2="60" y2="40" stroke="oklch(0.95 0 0)" strokeWidth="3" strokeLinecap="round" />
                <line x1="100" y1="20" x2="60" y2="40" stroke="oklch(0.95 0 0)" strokeWidth="3" strokeLinecap="round" />
                <line x1="20" y1="60" x2="60" y2="40" stroke="oklch(0.95 0 0)" strokeWidth="3" strokeLinecap="round" />
                <line x1="100" y1="60" x2="60" y2="40" stroke="oklch(0.95 0 0)" strokeWidth="3" strokeLinecap="round" />
                {/* body */}
                <rect x="48" y="32" width="24" height="16" rx="4" fill="oklch(0.18 0.02 250)" stroke="oklch(0.78 0.19 92)" strokeWidth="1.5" />
                {/* camera */}
                <circle cx="60" cy="52" r="4" fill="oklch(0.78 0.19 92)" />
                <circle cx="60" cy="52" r="1.5" fill="oklch(0.18 0.02 250)" />
              </svg>

              {/* Camera scan beam from drone toward chimney */}
              <div className="pointer-events-none absolute left-1/2 top-[42%] h-32 w-px origin-top -translate-x-1/2 rotate-[15deg] bg-gradient-to-b from-flame/0 via-flame/60 to-flame/0 drone-beam" />

              {/* HUD reticle on chimney */}
              <div className="pointer-events-none absolute left-[64%] top-[58%]">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 rounded-md border border-flame/80 shadow-[0_0_24px_oklch(0.78_0.19_92/0.55)]" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-flame/60" />
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-flame/60" />
                  <span className="absolute -top-5 left-0 font-mono text-[9px] uppercase tracking-[0.22em] text-flame">Target</span>
                </div>
              </div>

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
