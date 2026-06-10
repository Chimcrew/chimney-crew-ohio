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
    <div className="bg-background">
      {/* HERO + INLINE SCHEDULE */}
      <section className="relative overflow-hidden bg-background text-primary">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-flame/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-flame/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 pt-12 md:px-8 md:pt-16">
          <DroneChimneyScene />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* Left: intro */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              <Flame className="h-3 w-3" /> Book in 60 seconds
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Talk to a real Ohio <span className="italic text-flame">chimney crew.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary/70">
              Skip the phone tag. Pick a service, pick a window, and a CSIA-certified tech will confirm with you within the hour.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Phone, label: "Call", value: "(614) 549-1954", href: "tel:6145491954" },
                { icon: Mail, label: "Email", value: "hello@chimcrew.com", href: "mailto:hello@chimcrew.com" },
                { icon: MapPin, label: "Service area", value: "Columbus · Cincinnati · Dayton · Cleveland" },
                { icon: Clock, label: "Hours", value: "Sun–Fri · 7a–7p" },
              ].map((c) => {
                const Inner = (
                  <>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-flame/15 text-flame ring-1 ring-flame/40">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/55">{c.label}</p>
                      <p className="mt-0.5 truncate font-display text-sm font-bold text-primary">{c.value}</p>
                    </div>
                  </>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-3 transition hover:border-flame hover:-translate-y-0.5 hover:shadow-[0_8px_24px_oklch(0.2_0.02_60/0.08)]">
                    {Inner}
                  </a>
                ) : (
                  <div key={c.label} className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-3">
                    {Inner}
                  </div>
                );
              })}
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {[
                { icon: ShieldCheck, label: "Licensed & insured" },
                { icon: CalendarCheck, label: "Same-day callback" },
                { icon: Flame, label: "Flat-rate quotes in writing" },
              ].map((t) => (
                <li key={t.label} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">
                  <t.icon className="h-3 w-3 text-flame" /> {t.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: inline schedule form */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-flame/20 blur-3xl" aria-hidden />
            <div className="relative">
              <ScheduleInline />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}