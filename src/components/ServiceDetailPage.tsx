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
  Clock,
  Award,
  Flame,
} from "lucide-react";
import {
  ACCENT_CLASSES,
  getService,
  formatFromPrice,
  warrantyFor,
  heroImageFor,
  serviceCtaLabel,
  type ServiceSpec,
} from "@/data/services";
import { TrustBadges } from "@/components/TrustBadges";
import { DroneInspection } from "@/components/DroneInspection";
import certifiedBadge from "@/assets/badges/certified-chimney-sweep.svg.asset.json";

function openSchedule() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("chimcrew:open-schedule"));
  }
}

export function ServiceDetailPage({ service }: { service: ServiceSpec }) {
  const ctaLabel = serviceCtaLabel(service);

  return (
    <div className="bg-background text-foreground">
      {/* HOMEPAGE-STYLE LIGHT HERO */}
      <ServiceHero service={service} />

      {/* Marquee separator — trust strip */}
      <TrustMarquee />

      {/* Emergency call bar — same as homepage */}
      <EmergencyCallBar />

      {/* Drone inspection block (homepage parity) */}
      <DroneInspection />

      {/* OVERVIEW + spec card (editorial split) */}
      <Overview service={service} />

      {/* WHAT'S INCLUDED — magazine columns with big numerals */}
      <Included service={service} />

      {/* Inline conversion block — keeps CTA reachable without scrolling back up */}
      <InlineRepairCta ctaLabel={ctaLabel} />

      {/* SIGNS — alternating zig-zag list */}
      <Signs service={service} />

      {/* PROBLEMS (optional) */}
      {service.problems && service.problems.length > 0 && <ProblemsBlock service={service} />}

      {/* BENEFITS (optional) */}
      {service.benefits && service.benefits.length > 0 && <BenefitsBlock service={service} />}

      {/* Second inline CTA before final dark band */}
      <InlineRepairCta variant="flame" ctaLabel={ctaLabel} />

      {/* Pull-quote testimonial */}
      <PullQuote service={service} />

      {/* FAQ */}
      <Faqs service={service} />

      {/* RELATED */}
      <Related service={service} />

      {/* FINAL CTA (dark band) */}
      <FinalServiceCta ctaLabel={ctaLabel} />
    </div>
  );
}

/* ---------- HERO (homepage-style light hero) ---------- */

function ServiceHero({ service }: { service: ServiceSpec }) {
  const priceLabel = formatFromPrice(service);
  const ctaLabel = serviceCtaLabel(service);
  const Icon = service.icon;
  const heroPhoto = heroImageFor(service);

  return (
    <section className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-primary/[0.04] to-background">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="relative z-10 border-b border-border/40">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/55 md:px-8">
          <li><Link to="/" className="hover:text-flame">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link to="/services" className="hover:text-flame">Services</Link></li>
          <li aria-hidden>/</li>
          <li className="text-flame">{service.shortTitle}</li>
        </ol>
      </nav>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 pb-12 pt-8 sm:gap-10 md:pt-12 lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-16">
        {/* LEFT — message column */}
        <div className="px-4 sm:px-6 lg:order-1 lg:col-span-6 lg:px-8 lg:pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-foreground">
              <ShieldCheck className="h-3 w-3 text-flame" /> Licensed · Insured · Ohio
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-flame/40 bg-flame/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground">
              <Star className="h-3 w-3 fill-flame text-flame" /> 1,836 ★ reviews
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
              <Icon className="h-3 w-3 text-flame" /> {service.hero.eyebrow}
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {service.hero.headline}
          </h1>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/80 sm:text-base lg:text-lg">
            {service.hero.sub}
          </p>

          {/* Price / warranty / reviews strip */}
          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
            {priceLabel && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/55">Starting at</p>
                <p className="mt-1 font-display text-3xl font-extrabold text-flame md:text-4xl">{priceLabel}</p>
              </div>
            )}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/55">Warranty</p>
              <p className="mt-1 font-display text-lg font-bold text-foreground">{warrantyFor(service)}</p>
            </div>
            <div className="hidden sm:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/55">Reviews</p>
              <p className="mt-1 inline-flex items-center gap-1.5 font-display text-lg font-bold text-foreground">
                <Star className="h-4 w-4 fill-flame text-flame" /> 4.9 · 1,836
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={openSchedule}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
            >
              <CalendarCheck className="h-4 w-4" /> {ctaLabel}
            </button>
            <a
              href="tel:6146835763"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-foreground/20 bg-background px-5 font-sans text-[13px] font-medium tracking-normal text-foreground transition hover:border-flame active:scale-95 sm:px-6"
            >
              <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
            </a>
          </div>

          {/* Emergency line micro-CTA */}
          <a
            href="tel:6146835763"
            className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E63A1F] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:brightness-110"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Emergency line 24/7
          </a>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/50 pt-6">
            {[
              { icon: CheckCircle2, label: "CSIA-certified" },
              { icon: ShieldCheck, label: "Fully insured" },
              { icon: Clock, label: "Same-day callback" },
              { icon: Award, label: "Family owned since 1975" },
            ].map(({ icon: I, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-xs font-medium text-foreground/80 sm:text-[13px]">
                <I className="h-4 w-4 text-flame" /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — photo card */}
        <div className="relative lg:order-2 lg:col-span-6 lg:px-8">
          <div className="relative mx-auto w-full lg:max-w-none">
            <div className="relative overflow-hidden rounded-b-3xl bg-card lg:rounded-2xl lg:border lg:border-border/60 lg:shadow-[0_20px_60px_-20px_oklch(0_0_0/0.25)]">
              <img
                src={heroPhoto}
                alt={`ChimCrew ${service.shortTitle.toLowerCase()} — Ohio crew on the job`}
                className="block aspect-[5/4] h-auto w-full object-cover"
                fetchPriority="high"
                decoding="async"
                loading="eager"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-primary-foreground sm:text-base">
                    {service.shortTitle} · ChimCrew Ohio
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">
                    <MapPin className="h-3 w-3 text-flame" /> Columbus · Dayton · Cincinnati
                  </p>
                </div>
                <span className="hidden shrink-0 rounded-full border border-flame/30 bg-flame/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame sm:inline-flex">
                  Real photos
                </span>
              </div>
            </div>

            {/* Credential chip below image */}
            <div className="mx-4 mt-4 flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3 shadow-sm sm:mx-6 lg:mx-0">
              <img
                src={certifiedBadge.url}
                alt="Certified chimney sweep credential"
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 rounded-full bg-white p-1.5"
                loading="eager"
                decoding="async"
              />
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">Certified chimney professionals</p>
                <p className="mt-0.5 text-xs text-foreground/75 sm:text-[13px]">Every inspection documented with written photo reports.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- EMERGENCY CALL BAR ---------- */

function EmergencyCallBar() {
  return (
    <a
      href="tel:6146835763"
      className="block w-full bg-[#E63A1F] py-3 text-center text-primary-foreground transition hover:brightness-110"
    >
      <span className="inline-flex items-center gap-2 font-display text-sm font-bold underline decoration-2 underline-offset-4 sm:text-base">
        <Phone className="h-4 w-4" />
        For emergency service Call: (614) 683-5763
      </span>
    </a>
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
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// The job</p>
          <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            {service.shortTitle}, done <span className="italic text-flame">right.</span>
          </h2>
        </div>
        <div className="space-y-6 lg:col-span-7">
          <p className="text-2xl font-light leading-snug text-foreground md:text-3xl">
            {service.hero.sub}
          </p>
          <div className="grid grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-3">
            {formatFromPrice(service) ? (
              <Stat label="Price" value={formatFromPrice(service)} />
            ) : (
              <Stat label="Pricing" value="Free Quote" />
            )}
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
    <section className="relative overflow-hidden border-b border-border bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-flame/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-flame/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <ClipboardCheck className="h-3.5 w-3.5 text-flame" /> What's included
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
            Everything you need —{" "}
            <span className="inline-block rounded-lg bg-primary px-2.5 py-0.5 text-primary-foreground">
              nothing extra to pay
            </span>
            .
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            One {service.quoteOnly ? "written quote" : "flat-rate price"}. Every step below is part
            of your {service.shortTitle.toLowerCase()} — no upsells on the truck.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground shadow-sm">
            <BadgeDollarSign className="h-4 w-4 text-flame" />
            {service.quoteOnly ? "Flat-rate quote in writing" : "Flat-rate pricing · no surprises"}
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {service.bullets.map((b, i) => (
            <li
              key={b}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_oklch(0_0_0/0.18)] transition hover:-translate-y-1 hover:border-flame hover:shadow-[0_22px_50px_-20px_oklch(0.78_0.19_92/0.45)]"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-flame/10 blur-2xl transition group-hover:bg-flame/30"
                aria-hidden
              />
              <div className="relative flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-flame ring-1 ring-flame/40">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                  Step · {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="relative mt-4 text-[15px] font-medium leading-snug text-foreground">
                {b}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- SIGNS (alternating zig-zag) ---------- */

function Signs({ service }: { service: ServiceSpec }) {
  const loud = service.variant === "repair" || service.variant === "emergency";
  return (
    <section
      className={`border-b border-border py-24 ${loud ? "bg-flame/[0.04]" : "bg-background"}`}
    >
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
              // {loud ? "Don't ignore" : "Signs you need this"}
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              {loud ? (
                <>
                  If you see any of this, <span className="italic text-flame">call today.</span>
                </>
              ) : (
                <>
                  When to <span className="italic text-flame">book it.</span>
                </>
              )}
            </h2>
          </div>
          {loud && (
            <a
              href="tel:6146835763"
              className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-xs font-extrabold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-flame"
            >
              <Phone className="h-4 w-4" /> (614) 683-5763
            </a>
          )}
        </div>

        <ul className="mt-14 divide-y divide-border border-y border-border">
          {service.signs.map((s, i) => (
            <li key={s} className="group grid items-center gap-6 py-8 md:grid-cols-[auto_1fr_auto]">
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
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
            // Common problems
          </p>
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
    <section className="relative overflow-hidden border-b border-border bg-primary py-20 text-primary-foreground md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-flame/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-flame/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/50 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground">
              <Flame className="h-3.5 w-3.5 text-flame" /> The payoff
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              What you get when{" "}
              <span className="inline-block rounded-lg bg-flame px-2.5 py-0.5 text-primary">
                it's done right
              </span>
              .
            </h2>
            <p className="mt-4 max-w-xl text-base text-primary-foreground/80">
              A {service.shortTitle.toLowerCase()} that holds up — backed in writing, documented
              with photos, and built to last past the next Ohio winter.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <span className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em]">
              <ShieldCheck className="h-3.5 w-3.5 text-flame" /> {warrantyFor(service)} warranty
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em]">
              <Award className="h-3.5 w-3.5 text-flame" /> CSIA-certified
            </span>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {service.benefits!.map((b, i) => (
            <li
              key={b}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-flame hover:bg-primary-foreground/[0.08]"
            >
              <div
                className="pointer-events-none absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-flame/15 blur-2xl transition group-hover:bg-flame/35"
                aria-hidden
              />
              <div className="relative flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-flame text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)]">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                  / {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="relative mt-5 text-[15px] font-medium leading-snug text-primary-foreground">
                {b}
              </p>
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
          “They showed up on time, explained everything with photos, and the{" "}
          {service.shortTitle.toLowerCase()} held up through the worst winter we've had.{" "}
          <span className="italic text-flame">Best contractor we've hired.</span>”
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
              <span className="ml-2 font-mono uppercase tracking-widest">
                Verified Google review
              </span>
            </p>
          </div>
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
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
          // Common questions
        </p>
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
                <span className="font-display text-lg font-bold text-foreground md:text-xl">
                  {f.q}
                </span>
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
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
          // Pairs well with
        </p>
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
                  {formatFromPrice(s) && (
                    <span className="absolute right-4 top-4 rounded-full border border-flame/40 bg-flame/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-flame backdrop-blur">
                      {formatFromPrice(s)}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-extrabold">{s.shortTitle}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-flame">
                    Learn more{" "}
                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
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
    <section className="relative overflow-hidden bg-flame py-12 text-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center md:flex-row md:text-left md:px-8">
        <div className="flex items-center gap-4">
          <Flame className="h-10 w-10" />
          <div>
            <p className="font-display text-2xl font-bold md:text-3xl">
              One quick form. A safer home tonight.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
              Same-day callback · No card · 100% Ohio crew
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={openSchedule}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-sans text-[13px] font-bold tracking-normal text-primary-foreground shadow-[0_8px_22px_oklch(0_0_0/0.25)] transition active:scale-95 sm:px-6"
          >
            <CalendarCheck className="h-4 w-4" /> {ctaLabel}
          </button>
          <a
            href="tel:6146835763"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-primary px-6 py-3 font-display text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> (614) 683-5763
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

function InlineRepairCta({ variant = "dark", ctaLabel = "Schedule appointment online" }: { variant?: "dark" | "flame"; ctaLabel?: string }) {
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
          <p
            className={
              flame
                ? "mt-2 text-sm font-semibold text-primary/80 md:text-base"
                : "mt-2 text-sm text-primary-foreground/80 md:text-base"
            }
          >
            Book Your Free Chimney Inspection Today.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={openSchedule}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
          >
            <CalendarCheck className="h-4 w-4" /> {ctaLabel}
          </button>
          <a
            href="tel:6146835763"
            className={
              flame
                ? "inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 font-display text-sm font-bold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
                : "inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-white/[0.04] px-6 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:border-flame"
            }
          >
            <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-3xl px-4 md:px-8">
        <TrustBadges variant={flame ? "dark" : "light"} />
      </div>
    </section>
  );
}
