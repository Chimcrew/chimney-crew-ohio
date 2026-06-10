import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  CheckCircle2,
  Phone,
  CalendarCheck,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  ClipboardCheck,
  BadgeDollarSign,
  Quote,
} from "lucide-react";
import {
  ACCENT_CLASSES,
  getService,
  formatFromPrice,
  warrantyFor,
  type ServiceSpec,
} from "@/data/services";
import { TrustBadges } from "@/components/TrustBadges";

function openSchedule() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("chimcrew:open-schedule"));
  }
}

export function ServiceDetailPage({ service }: { service: ServiceSpec }) {
  const accent = ACCENT_CLASSES[service.accent];
  const ctaLabel = service.quoteOnly ? "Request Free Inspection" : "Schedule Free Inspection";

  return (
    <div className="bg-background text-foreground">
      {/* CINEMATIC HERO */}
      <CinematicHero service={service} />

      {/* Marquee separator — trust strip */}
      <TrustMarquee />

      {/* OVERVIEW + spec card (editorial split) */}
      <Overview service={service} />

      {/* WHAT'S INCLUDED — magazine columns with big numerals */}
      <Included service={service} />

      {/* Inline conversion block — keeps CTA reachable without scrolling back up */}
      <InlineRepairCta />

      {/* PROCESS — horizontal stepper with big numerals */}
      <Process service={service} />

      {/* SIGNS — alternating zig-zag list */}
      <Signs service={service} />

      {/* PROBLEMS (optional) */}
      {service.problems && service.problems.length > 0 && (
        <ProblemsBlock service={service} />
      )}

      {/* BENEFITS (optional) */}
      {service.benefits && service.benefits.length > 0 && (
        <BenefitsBlock service={service} />
      )}

      {/* Second inline CTA before final dark band */}
      <InlineRepairCta variant="flame" />

      {/* Pull-quote testimonial */}
      <PullQuote service={service} />

      {/* WHY CHIMCREW (dark band) */}
      <WhyChimCrew accent={accent} />

      {/* FAQ */}
      <Faqs service={service} />

      {/* RELATED */}
      <Related service={service} />

      {/* FINAL CTA (dark band) */}
      <FinalServiceCta ctaLabel={ctaLabel} />

    </div>
  );
}

/* ---------- HERO ---------- */

function BrickBackdrop() {
  // Staggered black-brick pattern with subtle mortar lines + soft vignette.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.55]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="chimney-bricks"
            x="0"
            y="0"
            width="120"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Mortar base */}
            <rect width="120" height="60" fill="oklch(0.06 0.005 250)" />
            {/* Row 1 bricks */}
            <rect x="1" y="1" width="58" height="28" rx="1.5" fill="oklch(0.10 0.01 30)" />
            <rect x="61" y="1" width="58" height="28" rx="1.5" fill="oklch(0.11 0.012 25)" />
            {/* Row 2 bricks (staggered) */}
            <rect x="-29" y="31" width="58" height="28" rx="1.5" fill="oklch(0.105 0.011 28)" />
            <rect x="31" y="31" width="58" height="28" rx="1.5" fill="oklch(0.095 0.009 32)" />
            <rect x="91" y="31" width="58" height="28" rx="1.5" fill="oklch(0.11 0.012 24)" />
            {/* Brick highlights — top edge */}
            <line x1="1" y1="1.5" x2="59" y2="1.5" stroke="oklch(0.18 0.015 30 / 0.4)" strokeWidth="0.5" />
            <line x1="61" y1="1.5" x2="119" y2="1.5" stroke="oklch(0.18 0.015 30 / 0.4)" strokeWidth="0.5" />
            <line x1="-29" y1="31.5" x2="29" y2="31.5" stroke="oklch(0.18 0.015 30 / 0.4)" strokeWidth="0.5" />
            <line x1="31" y1="31.5" x2="89" y2="31.5" stroke="oklch(0.18 0.015 30 / 0.4)" strokeWidth="0.5" />
            <line x1="91" y1="31.5" x2="149" y2="31.5" stroke="oklch(0.18 0.015 30 / 0.4)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="brick-vignette" cx="50%" cy="45%" r="75%">
            <stop offset="0%" stopColor="oklch(0.18 0.01 250)" stopOpacity="0" />
            <stop offset="100%" stopColor="oklch(0.18 0.01 250)" stopOpacity="0.9" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#chimney-bricks)" />
        <rect width="100%" height="100%" fill="url(#brick-vignette)" />
      </svg>
      {/* Warm flame wash to tie it back to the brand */}
      <div className="absolute inset-0 bg-gradient-to-br from-flame/[0.06] via-transparent to-transparent" />
    </div>
  );
}

function CinematicHero({ service }: { service: ServiceSpec }) {
  const priceLabel = formatFromPrice(service);
  const ctaLabel = service.quoteOnly ? "Request Free Inspection" : "Schedule Free Inspection";
  const Icon = service.icon;

  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      {/* Black brick texture — chimney bricks behind content */}
      <BrickBackdrop />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="relative z-10 border-b border-white/5">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 md:px-8">
          <li><Link to="/" className="hover:text-flame">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link to="/services" className="hover:text-flame">Services</Link></li>
          <li aria-hidden>/</li>
          <li className="text-flame">{service.shortTitle}</li>
        </ol>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-12 md:gap-14 md:px-8 md:py-16 lg:grid-cols-12 lg:items-center">
        {/* LEFT — product copy */}
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
            <span className="h-1.5 w-1.5 rounded-full bg-flame" />
            {service.hero.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-5xl lg:text-[3.5rem]">
            {service.hero.headline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
            {service.hero.sub}
          </p>

          {/* Product meta — price + guarantee + reviews. No duration. */}
          <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-foreground/55">
                {service.quoteOnly ? "Pricing" : "Starting at"}
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold text-flame md:text-4xl">
                {priceLabel}
              </p>
            </div>
            <div className="h-10 w-px bg-white/10" aria-hidden />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-foreground/55">
                Warranty
              </p>
              <p className="mt-1 font-display text-lg font-bold text-flame">
                {warrantyFor(service)}
              </p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" aria-hidden />
            <div className="hidden sm:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-foreground/55">
                Reviews
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-display text-lg font-bold text-primary-foreground">
                <Star className="h-4 w-4 fill-flame text-flame" /> 4.9 · 1,836
              </p>
            </div>
          </div>

          {/* CTA row — rounded-xl to match homepage */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openSchedule}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-flame px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_30px_oklch(0.78_0.19_92/0.35)] ring-2 ring-flame/40 transition hover:-translate-y-0.5 hover:bg-white"
            >
              <CalendarCheck className="h-5 w-5" />
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <a
              href="tel:6145491954"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/[0.03] px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground backdrop-blur transition hover:border-flame"
            >
              <Phone className="h-4 w-4 text-flame" />
              (614) 549-1954
            </a>
          </div>

          {/* Trust pills */}
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {["CSIA Certified", "BBB A+", "Licensed & Insured", "Same-Day Callback"].map((t) => (
              <li
                key={t}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/55"
              >
                <CheckCircle2 className="h-3 w-3 text-flame" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — product visual card */}
        <div className="relative lg:col-span-6">
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-flame/15 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.01_250)] shadow-[0_30px_80px_oklch(0_0_0/0.55)]">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
                Live · Ohio crew
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                {service.shortTitle}
              </span>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-[oklch(0.18_0.02_250)] via-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.02_250)]">
              {/* animated grid */}
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, oklch(0.78 0.19 92 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.78 0.19 92 / 0.4) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
                }}
              />
              {/* pulse rings */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative grid h-44 w-44 place-items-center">
                  <span className="absolute inset-0 rounded-full border border-flame/30 service-pulse" />
                  <span className="absolute inset-0 rounded-full border border-flame/30 service-pulse" style={{ animationDelay: "1s" }} />
                  <span className="absolute inset-0 rounded-full border border-flame/30 service-pulse" style={{ animationDelay: "2s" }} />
                  <div className="relative grid h-32 w-32 place-items-center rounded-full bg-flame text-primary shadow-[0_0_60px_oklch(0.78_0.19_92/0.6)] service-float">
                    <Icon className="h-14 w-14" />
                  </div>
                </div>
              </div>
              {/* floating spec chips */}
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-flame" /> CSIA Certified
              </span>
              <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-flame/40 bg-flame/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-flame backdrop-blur">
                {priceLabel}
              </span>
              {/* corner brackets */}
              <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-flame/60" />
              <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-flame/60" />
              <span className="pointer-events-none absolute left-3 bottom-3 h-3 w-3 border-l border-b border-flame/60" />
              <span className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-r border-b border-flame/60" />

              {/* Bottom telemetry bar */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-primary/85 px-4 py-2.5 backdrop-blur">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/80">
                  <MapPin className="h-3 w-3 text-flame" /> Columbus · Dayton · Cincinnati
                </span>
                <span className="rounded-full border border-flame/40 bg-flame/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                  Verified
                </span>
              </div>

              <style>{`
                @keyframes service-pulse {
                  0% { transform: scale(0.6); opacity: 0.8; }
                  100% { transform: scale(1.6); opacity: 0; }
                }
                .service-pulse { animation: service-pulse 3s ease-out infinite; }
                @keyframes service-float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                .service-float { animation: service-float 4s ease-in-out infinite; }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TRUST MARQUEE ---------- */

function TrustMarquee() {
  const items = [
    "★ 1,836 5-Star Reviews",
    "CSIA Certified Crew",
    "BBB A+ Accredited",
    "Licensed & Insured",
    "Serving Ohio Since 1975",
    "Same-Day Callback",
    "Flat-Rate Pricing",
    "Workmanship Guarantee",
  ];
  return (
    <div className="overflow-hidden border-y border-border bg-primary text-primary-foreground">
      <div
        className="flex w-max gap-12 whitespace-nowrap py-4"
        style={{ animation: "marquee 35s linear infinite" }}
      >
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.3em] text-primary-foreground/70"
          >
            {it} <span className="ml-12 text-flame">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- OVERVIEW ---------- */

function Overview({ service }: { service: ServiceSpec }) {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
            // The job
          </p>
          <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            {service.shortTitle}, done <span className="italic text-flame">right.</span>
          </h2>
        </div>
        <div className="space-y-6 lg:col-span-7">
          <p className="text-2xl font-light leading-snug text-foreground md:text-3xl">
            {service.hero.sub}
          </p>
          <div className="grid grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-3">
            <Stat label="Price" value={formatFromPrice(service)} />
            <Stat label="Crew Size" value="2 Techs" />
            <Stat label="Warranty" value={warrantyFor(service)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-extrabold text-foreground">{value}</p>
    </div>
  );
}

/* ---------- INCLUDED ---------- */

function Included({ service }: { service: ServiceSpec }) {
  return (
    <section className="border-b border-border bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
              // What you get
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Everything's <span className="italic text-flame">included.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground">
            <BadgeDollarSign className="h-4 w-4 text-flame" />
            {service.quoteOnly ? "Flat-rate quote in writing" : "Flat-rate pricing"}
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {service.bullets.map((b, i) => (
            <li
              key={b}
              className="group flex items-start gap-6 bg-card p-7 transition hover:bg-flame/[0.08]"
            >
              <span className="font-display text-5xl font-extrabold italic leading-none text-flame/30 transition group-hover:text-flame md:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pt-2 text-lg font-medium leading-snug text-foreground">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */

function Process({ service }: { service: ServiceSpec }) {
  return (
    <section className="relative border-b border-border bg-primary py-24 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-grid" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-flame/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
            // The process
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            From first call to final <span className="italic text-flame">handshake.</span>
          </h2>
          <p className="mt-5 text-primary-foreground/70">
            No mystery, no upsells. Here's exactly how a visit goes.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Timeline rule */}
          <div
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent md:block"
            aria-hidden
          />
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <div key={p.title} className="relative">
                <div className="relative z-10 grid h-24 w-24 place-items-center rounded-full border border-flame/40 bg-primary font-display text-4xl font-extrabold italic text-flame shadow-[0_0_30px_-5px_oklch(0.78_0.19_92/0.4)]">
                  {i + 1}
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-primary-foreground/65 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SIGNS (alternating zig-zag) ---------- */

function Signs({ service }: { service: ServiceSpec }) {
  const loud = service.variant === "repair" || service.variant === "emergency";
  return (
    <section className={`border-b border-border py-24 ${loud ? "bg-flame/[0.04]" : "bg-background"}`}>
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
              // {loud ? "Don't ignore" : "Signs you need this"}
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              {loud ? (
                <>If you see any of this, <span className="italic text-flame">call today.</span></>
              ) : (
                <>When to <span className="italic text-flame">book it.</span></>
              )}
            </h2>
          </div>
          {loud && (
            <a
              href="tel:6145491954"
              className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-xs font-extrabold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-flame"
            >
              <Phone className="h-4 w-4" /> (614) 549-1954
            </a>
          )}
        </div>

        <ul className="mt-14 divide-y divide-border border-y border-border">
          {service.signs.map((s, i) => (
            <li
              key={s}
              className="group grid items-center gap-6 py-8 md:grid-cols-[auto_1fr_auto]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:w-20">
                No. {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-2xl font-bold leading-tight text-foreground transition group-hover:text-flame md:text-3xl">
                {s}
              </span>
              <span className="hidden text-flame md:inline-flex">
                {loud ? (
                  <AlertTriangle className="h-6 w-6" />
                ) : (
                  <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- PROBLEMS / BENEFITS (clean cards) ---------- */

function ProblemsBlock({ service }: { service: ServiceSpec }) {
  return (
    <section className="border-b border-border bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Common problems</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            Problems we see <span className="italic text-flame">every week.</span>
          </h2>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {service.problems!.map((p) => (
            <li
              key={p}
              className="flex items-start gap-5 rounded-2xl border border-border bg-card p-6 transition hover:border-flame hover:shadow-[0_15px_40px_-15px_oklch(0.78_0.19_92/0.4)]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-flame/15 text-flame">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <span className="pt-1.5 text-foreground/85">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BenefitsBlock({ service }: { service: ServiceSpec }) {
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// The payoff</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            What you get when it's <span className="italic text-flame">done right.</span>
          </h2>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {service.benefits!.map((b) => (
            <li
              key={b}
              className="flex items-start gap-5 rounded-2xl border border-border bg-card p-6 transition hover:border-flame hover:shadow-[0_15px_40px_-15px_oklch(0.78_0.19_92/0.4)]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-flame text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <span className="pt-1.5 text-foreground/85">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- PULL QUOTE ---------- */

function PullQuote({ service }: { service: ServiceSpec }) {
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <Quote className="mx-auto h-10 w-10 text-flame" />
        <p className="mt-6 font-display text-3xl font-bold leading-snug text-foreground md:text-4xl lg:text-5xl">
          “They showed up on time, explained everything with photos, and the {service.shortTitle.toLowerCase()} held up through the worst winter we've had. <span className="italic text-flame">Best contractor we've hired.</span>”
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-flame font-display text-lg font-extrabold text-primary">
            M
          </div>
          <div className="text-left">
            <p className="font-display text-base font-bold">Mark D., Columbus OH</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-flame text-flame" />
              ))}
              <span className="ml-2 font-mono uppercase tracking-widest">Verified Google review</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY CHIMCREW ---------- */

function WhyChimCrew({ accent }: { accent: (typeof ACCENT_CLASSES)[keyof typeof ACCENT_CLASSES] }) {
  void accent;
  const items = [
    { icon: ShieldCheck, label: "Licensed & Insured", desc: "Fully covered, CSIA-credentialed crew." },
    { icon: CalendarCheck, label: "Same-Day Availability", desc: "Call before noon, we'll be there." },
    { icon: ClipboardCheck, label: "Detailed Reports", desc: "Photos + written findings every visit." },
    { icon: BadgeDollarSign, label: "Upfront Pricing", desc: "Flat-rate quote in writing — no surprises." },
    { icon: Star, label: "5-Star Customer Service", desc: "Hundreds of 5-star reviews from Ohio homeowners." },
    { icon: MapPin, label: "Locally Owned & Operated", desc: "Family-run from right here in Ohio." },
  ];
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary py-24 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-flame/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Why ChimCrew</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-5xl">
          One local crew. <span className="italic text-flame">Six reasons to call us.</span>
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.label}
              className="group bg-primary p-7 transition hover:bg-white/[0.04]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-flame/15 text-flame ring-1 ring-flame/30 transition group-hover:bg-flame group-hover:text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold">{it.label}</h3>
              <p className="mt-2 text-sm text-primary-foreground/70">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function Faqs({ service }: { service: ServiceSpec }) {
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Common questions</p>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
          {service.shortTitle} <span className="italic text-flame">FAQs.</span>
        </h2>
        <div className="mt-10 space-y-3">
          {service.faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card p-6 transition open:border-flame open:shadow-[0_15px_40px_-15px_oklch(0.78_0.19_92/0.35)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="font-display text-lg font-bold text-foreground md:text-xl">{f.q}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-flame transition group-open:rotate-45 group-open:border-flame group-open:bg-flame group-open:text-primary text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-5 border-t border-border pt-5 leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RELATED ---------- */

function Related({ service }: { service: ServiceSpec }) {
  const items = service.related
    .map((slug) => getService(slug))
    .filter((s): s is ServiceSpec => Boolean(s));

  if (!items.length) return null;

  return (
    <section className="border-b border-border bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Pairs well with</p>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
          Related <span className="italic text-flame">services.</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((s) => {
            const RIcon = s.icon;
            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-flame hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary via-[oklch(0.16_0.02_250)] to-[oklch(0.10_0.02_250)]">
                  <div
                    className="absolute inset-0 opacity-[0.18]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, oklch(0.78 0.19 92 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.78 0.19 92 / 0.4) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                      maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
                    }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-flame text-primary shadow-[0_0_40px_oklch(0.78_0.19_92/0.45)] transition group-hover:scale-110">
                      <RIcon className="h-9 w-9" />
                    </div>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full border border-flame/40 bg-flame/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-flame backdrop-blur">
                    {formatFromPrice(s)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-extrabold">{s.shortTitle}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-flame">
                    Learn more <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */

function FinalServiceCta({ ctaLabel }: { ctaLabel: string }) {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-flame/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-flame/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Free inspection</p>
        <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
          Not sure what's wrong with <span className="italic text-flame">your chimney?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
          Schedule a free inspection. We'll show you exactly what needs attention — with photos and a written report.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={openSchedule}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-flame px-8 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-primary shadow-[0_0_40px_-5px_oklch(0.78_0.19_92/0.5)] transition hover:scale-[1.02] hover:bg-white sm:w-auto"
          >
            <CalendarCheck className="h-5 w-5" /> {ctaLabel}
          </button>
          <a
            href="tel:6145491954"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-primary-foreground backdrop-blur transition hover:border-white hover:bg-white/10 sm:w-auto"
          >
            <Phone className="h-5 w-5" /> (614) 549-1954
          </a>
        </div>
      </div>
    </section>
  );
}

export function NotFoundService() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl">Service not found</h1>
      <p className="mt-4 text-muted-foreground">Try our full list.</p>
      <Link
        to="/services"
        className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-display text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        See all services <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

/* ---------- INLINE REPAIR CTA ---------- */

function InlineRepairCta({ variant = "dark" }: { variant?: "dark" | "flame" }) {
  const flame = variant === "flame";
  return (
    <section
      className={
        flame
          ? "border-y-2 border-flame/30 bg-flame py-12 text-primary"
          : "border-y-2 border-border bg-primary py-12 text-primary-foreground"
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
        <div className="text-center md:text-left">
          <p
            className={
              flame
                ? "font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70"
                : "font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-flame"
            }
          >
            // Don't wait
          </p>
          <h3 className="mt-2 font-display text-3xl font-extrabold leading-tight md:text-4xl">
            Need Chimney Repair?
          </h3>
          <p className={flame ? "mt-2 text-sm font-semibold text-primary/80 md:text-base" : "mt-2 text-sm text-primary-foreground/80 md:text-base"}>
            Book Your Free Chimney Inspection Today.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={openSchedule}
            className={
              flame
                ? "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary-foreground shadow-[0_10px_30px_oklch(0_0_0/0.25)] transition hover:-translate-y-0.5"
                : "inline-flex items-center justify-center gap-2 rounded-xl bg-flame px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_30px_oklch(0.78_0.19_92/0.35)] transition hover:-translate-y-0.5 hover:bg-white"
            }
          >
            <CalendarCheck className="h-4 w-4" /> Schedule Inspection
          </button>
          <a
            href="tel:6145491954"
            className={
              flame
                ? "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
                : "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-white/[0.04] px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:border-flame"
            }
          >
            <Phone className="h-4 w-4 text-flame" /> (614) 549-1954
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-3xl px-4 md:px-8">
        <TrustBadges variant={flame ? "dark" : "light"} />
      </div>
    </section>
  );
}