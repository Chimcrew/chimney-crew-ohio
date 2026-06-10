import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, CalendarCheck, ShieldCheck, Flame } from "lucide-react";
import { ScheduleInline } from "@/components/ScheduleWidget";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ChimCrew — Chimney Sweep Columbus, Cincinnati, Dayton" },
      { name: "description", content: "Call, email, or request a quote from ChimCrew. Local chimney sweeps serving Columbus, Cincinnati, and Dayton, OH." },
      { property: "og:title", content: "Contact ChimCrew" },
      { property: "og:description", content: "Reach Ohio's fired-up chimney crew. Same-day callbacks." },
    ],
  }),
  component: ContactPage,
});

function DroneChimneyScene() {
  return (
    <div className="relative mx-auto flex h-56 w-full items-end justify-center md:h-72">
      {/* soft ground glow */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 h-6 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-2xl" aria-hidden />
      {/* technical grid panel */}
      <div className="absolute inset-x-0 bottom-0 h-40 rounded-2xl border-2 border-border bg-gradient-to-b from-transparent via-card/60 to-card md:h-52" aria-hidden>
        <div className="absolute inset-0 rounded-2xl bg-grid opacity-[0.08]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-flame/40 bg-card px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-flame">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" /> Live drone inspection
        </span>
        <span className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.22em] text-primary/60">
          ALT 32ft · ORBIT 360°
        </span>
      </div>

      {/* Orbit stage */}
      <div className="relative h-56 w-56 md:h-64 md:w-64">
        {/* Pulse rings around chimney */}
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-flame/40 drone-ring" aria-hidden />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-flame/30 drone-ring" style={{ animationDelay: "1.3s" }} aria-hidden />

        {/* Chimney (centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="120" height="180" viewBox="0 0 120 180" className="drop-shadow-[0_10px_20px_oklch(0_0_0/0.18)]">
            {/* smoke puffs */}
            <g>
              <circle cx="58" cy="30" r="7" fill="oklch(0.78 0.02 250)" opacity="0.6" className="chimney-smoke" style={{ animationDelay: "0s" }} />
              <circle cx="64" cy="30" r="6" fill="oklch(0.82 0.01 250)" opacity="0.5" className="chimney-smoke" style={{ animationDelay: "1.2s" }} />
              <circle cx="55" cy="30" r="5" fill="oklch(0.86 0.01 250)" opacity="0.45" className="chimney-smoke" style={{ animationDelay: "2.4s" }} />
            </g>
            {/* roof */}
            <polygon points="0,170 120,170 95,130 25,130" fill="oklch(0.34 0.06 30)" />
            <polygon points="0,170 120,170 95,130 25,130" fill="url(#roofShade)" opacity="0.5" />
            {/* chimney body */}
            <rect x="42" y="40" width="36" height="100" rx="2" fill="oklch(0.42 0.05 30)" />
            {/* brick lines */}
            {[52,64,76,88,100,112,124].map((y, i) => (
              <line key={i} x1="42" y1={y} x2="78" y2={y} stroke="oklch(0.32 0.04 30)" strokeWidth="1" />
            ))}
            {[58,70,82,94,106,118].map((y, i) => (
              <line key={`v${i}`} x1={i % 2 === 0 ? 54 : 66} y1={y - 6} x2={i % 2 === 0 ? 54 : 66} y2={y} stroke="oklch(0.32 0.04 30)" strokeWidth="1" />
            ))}
            {/* crown */}
            <rect x="38" y="34" width="44" height="8" rx="1" fill="oklch(0.38 0.05 30)" />
            {/* opening */}
            <rect x="50" y="40" width="20" height="6" fill="oklch(0.15 0.02 30)" />
            <defs>
              <linearGradient id="roofShade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="oklch(0.2 0.02 30)" stopOpacity="0.5" />
                <stop offset="1" stopColor="oklch(0.2 0.02 30)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Drone shadow on roof (separate slower-feel orbit, smaller) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2" aria-hidden>
          <div className="drone-shadow h-3 w-10 -translate-x-1/2 rounded-full bg-primary/70 blur-[3px]" />
        </div>

        {/* Orbiting drone */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="drone-orbit">
            <Drone />
          </div>
        </div>
      </div>
    </div>
  );
}

function Drone() {
  return (
    <svg width="78" height="48" viewBox="0 0 78 48" className="-translate-x-1/2 -translate-y-1/2">
      {/* arms */}
      <line x1="12" y1="14" x2="30" y2="22" stroke="oklch(0.2 0.02 250)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="66" y1="14" x2="48" y2="22" stroke="oklch(0.2 0.02 250)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="34" x2="30" y2="26" stroke="oklch(0.2 0.02 250)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="66" y1="34" x2="48" y2="26" stroke="oklch(0.2 0.02 250)" strokeWidth="2.5" strokeLinecap="round" />

      {/* body */}
      <rect x="28" y="18" width="22" height="12" rx="4" fill="oklch(0.22 0.02 250)" />
      <rect x="32" y="20" width="14" height="3" rx="1.5" fill="oklch(0.78 0.19 92)" />
      <circle cx="39" cy="27" r="1.5" fill="oklch(0.78 0.19 92)" />

      {/* rotor hubs + blades */}
      {[
        { cx: 12, cy: 14 },
        { cx: 66, cy: 14 },
        { cx: 12, cy: 34 },
        { cx: 66, cy: 34 },
      ].map((r, i) => (
        <g key={i}>
          <circle cx={r.cx} cy={r.cy} r="6" fill="oklch(0.78 0.19 92 / 0.18)" />
          <circle cx={r.cx} cy={r.cy} r="2" fill="oklch(0.2 0.02 250)" />
          <g className="drone-rotor" style={{ transformOrigin: `${r.cx}px ${r.cy}px` }}>
            <rect x={r.cx - 8} y={r.cy - 0.5} width="16" height="1" fill="oklch(0.2 0.02 250)" opacity="0.7" />
            <rect x={r.cx - 0.5} y={r.cy - 8} width="1" height="16" fill="oklch(0.2 0.02 250)" opacity="0.7" />
          </g>
        </g>
      ))}

      {/* scan beam */}
      <g transform="translate(39 30)">
        <polygon points="0,0 -10,18 10,18" fill="oklch(0.78 0.19 92)" opacity="0.18" className="drone-scan" />
      </g>
    </svg>
  );
}

function ContactPage() {
  return (
    <div className="bg-background py-8 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* Industrial bordered container */}
        <div className="grid grid-cols-1 border-4 border-primary bg-card shadow-[12px_12px_0px_0px_var(--color-primary)] md:grid-cols-12">
          {/* Header / Title Block */}
          <div className="border-b-4 border-primary bg-primary p-8 text-primary-foreground md:col-span-8 md:border-b-4 md:border-r-4 md:p-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-3 w-3 animate-pulse rounded-full bg-flame" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                Direct Service Dispatch
              </span>
            </div>
            <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
              Talk to a real
              <br />
              <span className="text-flame">Ohio Crew.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium text-primary-foreground/80 md:text-lg">
              Skip the call center. Pick your service, select a window, and a CSIA-certified tech handles the rest.
            </p>
          </div>

          {/* Quick Contact Block */}
          <div className="flex flex-col justify-between border-b-4 border-primary bg-flame p-8 md:col-span-4">
            <div className="space-y-6">
              <div>
                <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary/60">
                  Emergency Dispatch
                </p>
                <a href="tel:6145491954" className="font-display text-2xl font-black text-primary underline-offset-4 hover:underline">
                  (614) 549-1954
                </a>
              </div>
              <div>
                <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary/60">
                  Support Email
                </p>
                <a href="mailto:hello@chimcrew.com" className="break-all font-display text-xl font-bold text-primary underline-offset-4 hover:underline">
                  hello@chimcrew.com
                </a>
              </div>
              <div>
                <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary/60">
                  Hours
                </p>
                <p className="font-display text-sm font-bold uppercase text-primary">
                  Sun – Fri · 7a – 7p
                </p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-primary/20 pt-8">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-flame bg-primary" />
                <div className="h-8 w-8 rounded-full border-2 border-flame bg-primary" />
                <div className="h-8 w-8 rounded-full border-2 border-flame bg-primary" />
              </div>
              <p className="text-[11px] font-bold uppercase leading-tight text-primary">
                4 Crews active in
                <br />
                Columbus / Dayton
              </p>
            </div>
          </div>

          {/* Sidebar Trust Features */}
          <div className="hidden border-primary bg-background p-8 md:col-span-4 md:block md:border-r-4">
            <div className="space-y-10">
              <div className="relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-flame" />
                <h3 className="mb-3 font-display text-sm font-black uppercase text-primary">
                  Live Drone Inspection
                </h3>
                <p className="text-sm italic leading-relaxed text-primary/70">
                  Every quote includes high-definition aerial footage of your chimney stack and flashing.
                </p>
              </div>

              <DroneChimneyScene />

              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-primary p-4 text-center">
                  <p className="font-display text-2xl font-black text-primary">1.8k</p>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary/70">
                    Local Homes
                  </p>
                </div>
                <div className="border-2 border-primary bg-primary p-4 text-center text-primary-foreground">
                  <p className="font-display text-2xl font-black">CSIA</p>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] opacity-80">
                    Certified
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-primary">
                  <ShieldCheck className="h-4 w-4 text-flame" /> Fully Insured &amp; Bonded
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-primary">
                  <CalendarCheck className="h-4 w-4 text-flame" /> Same-Day Callback
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-primary">
                  <Flame className="h-4 w-4 text-flame" /> Flat-Rate Quotes in Writing
                </div>
              </div>
            </div>
          </div>

          {/* Scheduler Component Area */}
          <div className="bg-card p-6 md:col-span-8 md:p-10">
            <div className="mb-8 flex items-center justify-between border-b-2 border-border pb-4">
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-sm bg-primary font-display font-black text-primary-foreground">
                  01
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                    Book your visit
                  </p>
                  <h2 className="font-display text-xl font-black uppercase text-primary">
                    Select Your Service
                  </h2>
                </div>
              </div>
              <span className="hidden rounded-full bg-flame/15 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-flame sm:inline-block">
                <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-flame align-middle" />
                Live Availability
              </span>
            </div>

            <ScheduleInline />
          </div>
        </div>

        {/* Bottom Decorative Coordinates */}
        <div className="mt-4 flex flex-wrap justify-between gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-primary/40">
          <span>39.9612° N, 82.9988° W</span>
          <span className="hidden sm:inline">Certified OH Chimney Force // Ref: 0092-B</span>
          <span>Est. 1994</span>
        </div>
      </div>
    </div>
  );
}