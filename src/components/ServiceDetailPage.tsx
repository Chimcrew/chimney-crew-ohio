import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  CheckCircle2,
  Phone,
  CalendarCheck,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Sparkles,
  BadgeDollarSign,
  Star,
  MapPin,
  ClipboardCheck,
} from "lucide-react";
import { ACCENT_CLASSES, getService, type ServiceSpec } from "@/data/services";
import { LeadForm } from "@/components/LeadForm";

function openSchedule() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("chimcrew:open-schedule"));
  }
}

export function ServiceDetailPage({ service }: { service: ServiceSpec }) {
  const Icon = service.icon;
  const accent = ACCENT_CLASSES[service.accent];
  const variant = service.variant;
  const ctaLabel = service.quoteOnly ? "Request Free Inspection" : "Schedule Free Inspection";

  return (
    <>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-card/40">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground md:px-8">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{service.shortTitle}</li>
        </ol>
      </nav>

      {/* HERO — varies by variant */}
      <Hero service={service} accent={accent} Icon={Icon} />

      {/* Variant-specific signature band right after hero */}
      {variant === "emergency" && <EmergencyBanner />}
      {variant === "plan" && <PlanPerks />}
      {variant === "inspection" && <InspectionBand service={service} />}

      {/* What's included */}
      <section className="border-b border-border py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-[1fr_1.2fr] md:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">// What you get</p>
            <h2 className="mt-3 text-4xl">
              {service.quoteOnly
                ? `Everything included in your ${service.shortTitle.toLowerCase()}.`
                : `Everything in the ${service.price} price.`}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {service.quoteOnly
                ? "Every project starts with a free on-site inspection and a written, flat-rate quote. No surprises, no upsells — just the work your home actually needs."
                : "No add-ons, no nickel-and-diming. The number you see is the number you pay — and you'll know it before we lift a tool."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <BadgeDollarSign className="h-4 w-4 text-flame" /> Upfront flat-rate pricing
              </span>
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4" /> Workmanship guarantee
              </span>
            </div>
          </div>
          <ul className="space-y-3">
            {service.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-sm border-2 border-border bg-card p-4 transition hover:border-primary"
              >
                <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${accent.text}`} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process — layout varies by variant */}
      <Process service={service} accent={accent} />

      {/* Warning signs — repair/emergency variants get a louder treatment */}
      <Signs service={service} accent={accent} />

      {/* Common problems (optional) */}
      {service.problems && service.problems.length > 0 && (
        <ProblemsBlock service={service} accent={accent} />
      )}

      {/* Benefits of repair (optional) */}
      {service.benefits && service.benefits.length > 0 && (
        <BenefitsBlock service={service} accent={accent} />
      )}

      {/* Why homeowners choose ChimCrew — universal trust block */}
      <WhyChimCrew accent={accent} />

      {/* FAQs */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// Common questions</p>
          <h2 className="mt-3 text-4xl">{service.shortTitle} FAQs</h2>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {service.faqs.map((f) => (
              <div key={f.q} className="grid gap-2 py-5 md:grid-cols-[1fr_2fr] md:gap-8">
                <dt className="font-display text-lg">{f.q}</dt>
                <dd className="text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related services */}
      <Related service={service} />

      {/* Final CTA — unified across all service pages */}
      <FinalServiceCta ctaLabel={ctaLabel} />

      <LeadForm />
    </>
  );
}

function WhyChimCrew({ accent }: { accent: (typeof ACCENT_CLASSES)[keyof typeof ACCENT_CLASSES] }) {
  const items = [
    { icon: ShieldCheck, label: "Licensed & Insured", desc: "Fully covered, CSIA-credentialed crew." },
    { icon: CalendarCheck, label: "Same-Day Availability", desc: "Call before noon, we'll be there." },
    { icon: ClipboardCheck, label: "Detailed Inspection Reports", desc: "Photos + written findings every visit." },
    { icon: BadgeDollarSign, label: "Upfront Pricing", desc: "Flat-rate quote in writing — no surprises." },
    { icon: Star, label: "5-Star Customer Service", desc: "Hundreds of 5-star reviews from Ohio homeowners." },
    { icon: MapPin, label: "Locally Owned & Operated", desc: "Family-run from right here in Ohio." },
  ];
  return (
    <section className="relative overflow-hidden border-b-2 border-flame/30 bg-primary py-20 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-flame/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <p className={`font-mono text-xs uppercase tracking-widest ${accent.text}`}>// Why ChimCrew</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl">
          Why Ohio Homeowners <span className="text-flame">Choose ChimCrew</span>
        </h2>
        <p className="mt-4 max-w-2xl text-primary-foreground/80">
          One local crew, doing the job right the first time — backed in writing.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.label}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-flame/60 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-flame/0 transition group-hover:bg-flame" aria-hidden />
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-flame/15 text-flame ring-1 ring-flame/30">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold">{it.label}</h3>
              <p className="mt-1 text-sm text-primary-foreground/75">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalServiceCta({ ctaLabel }: { ctaLabel: string }) {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-flame/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-flame/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-flame">// Free inspection</p>
        <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] md:text-6xl">
          Not Sure What's Wrong With <span className="text-flame">Your Chimney?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/85">
          Schedule a free inspection and we'll show you exactly what needs attention — with photos and a written report.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="tel:6146834422"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-white/5 px-7 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground backdrop-blur transition hover:border-flame hover:bg-white/10 sm:w-auto"
          >
            <Phone className="h-4 w-4" /> Call Now · (614) 683-4422
          </a>
          <button
            onClick={openSchedule}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-flame px-7 font-display text-sm font-extrabold uppercase tracking-widest text-primary shadow-[0_18px_40px_oklch(0.78_0.19_92/0.35)] transition hover:bg-white sm:w-auto"
          >
            <CalendarCheck className="h-4 w-4" /> {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function Hero({
  service,
  accent,
  Icon,
}: {
  service: ServiceSpec;
  accent: (typeof ACCENT_CLASSES)[keyof typeof ACCENT_CLASSES];
  Icon: ServiceSpec["icon"];
}) {
  const v = service.variant;
  const priceLabel = service.quoteOnly ? "Custom Quote" : service.price;
  const ctaLabel = service.quoteOnly ? "Request Free Inspection" : "Schedule Free Inspection";

  // Repair / Emergency: red/amber alert hero with split layout
  if (v === "emergency" || v === "repair") {
    return (
      <section className="relative overflow-hidden border-b-2 border-border bg-card/40 py-20">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div className={`pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full ${accent.bg} opacity-10 blur-3xl`} aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-[1.2fr_1fr] md:px-8">
          <div>
            <p className={`font-mono text-xs uppercase tracking-widest ${accent.text}`}>
              // {service.hero.eyebrow}
            </p>
            <h1 className="mt-3 text-5xl md:text-7xl">{service.hero.headline}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{service.hero.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={openSchedule}
                className={`inline-flex items-center gap-2 rounded-sm border-2 ${accent.border} ${accent.bg} px-6 py-4 font-display text-sm uppercase tracking-widest text-primary-foreground transition hover:opacity-90`}
              >
                <CalendarCheck className="h-4 w-4" /> {ctaLabel}
              </button>
              <a
                href="tel:6146834422"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-border px-6 py-4 font-display text-sm uppercase tracking-widest transition hover:border-primary"
              >
                <Phone className="h-4 w-4" /> Call (614) 683-4422
              </a>
            </div>
          </div>
          {/* Stat card */}
          <div className="relative">
            <div className={`absolute -inset-1 rounded-sm ${accent.bg} opacity-20 blur-xl`} aria-hidden />
            <div className="relative rounded-sm border-2 border-border bg-card p-8">
              <div className={`grid h-14 w-14 place-items-center rounded-sm ${accent.bg} text-primary-foreground`}>
                <Icon className="h-7 w-7" />
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {service.quoteOnly ? "Investment" : "Starting at"}
              </p>
              <p className={`mt-1 font-display ${service.quoteOnly ? "text-4xl" : "text-6xl"} ${accent.text}`}>{priceLabel}</p>
              <p className="mt-2 text-sm text-muted-foreground">{service.tagline}</p>
              <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-flame" /> Workmanship guarantee
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Inspection: centered, calm, evidence-led
  if (v === "inspection") {
    return (
      <section className="relative overflow-hidden border-b-2 border-border bg-card/40 py-24">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
          <div className={`mx-auto grid h-14 w-14 place-items-center rounded-sm ${accent.bg} text-primary-foreground`}>
            <Icon className="h-7 w-7" />
          </div>
          <p className={`mt-6 font-mono text-xs uppercase tracking-widest ${accent.text}`}>
            // {service.hero.eyebrow}
          </p>
          <h1 className="mt-3 text-5xl md:text-7xl">{service.hero.headline}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{service.hero.sub}</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-sm border-2 border-border bg-card px-5 py-3 font-mono text-sm">
            <span className="text-muted-foreground">Flat rate</span>
            <span className={`font-display text-2xl ${accent.text}`}>{priceLabel}</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={openSchedule}
              className={`inline-flex items-center gap-2 rounded-sm border-2 ${accent.border} ${accent.bg} px-6 py-4 font-display text-sm uppercase tracking-widest text-primary-foreground transition hover:opacity-90`}
            >
              <CalendarCheck className="h-4 w-4" /> {ctaLabel}
            </button>
            <a
              href="tel:6146834422"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-border px-6 py-4 font-display text-sm uppercase tracking-widest transition hover:border-primary"
            >
              <Phone className="h-4 w-4" /> Call (614) 683-4422
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Install: bold spec-sheet feel
  if (v === "install") {
    return (
      <section className="relative overflow-hidden border-b-2 border-border bg-primary py-24 text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,_oklch(0.24_0.02_250)_0%,_oklch(0.08_0.01_250)_70%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className={`font-mono text-xs uppercase tracking-widest ${accent.text}`}>
            // {service.hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-5xl md:text-8xl">{service.hero.headline}</h1>
          <p className="mt-5 max-w-2xl text-lg opacity-80">{service.hero.sub}</p>
          <div className="mt-10 grid gap-4 md:max-w-2xl md:grid-cols-3">
            <div className="rounded-sm border-2 border-white/15 bg-white/5 p-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest opacity-70">Investment</p>
              <p className={`mt-1 font-display text-2xl ${accent.text}`}>{priceLabel}</p>
            </div>
            <div className="rounded-sm border-2 border-white/15 bg-white/5 p-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest opacity-70">Inspection</p>
              <p className="mt-1 font-display text-2xl">Free</p>
            </div>
            <div className="rounded-sm border-2 border-white/15 bg-white/5 p-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest opacity-70">Warranty</p>
              <p className="mt-1 font-display text-2xl">Lifetime</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={openSchedule}
              className={`inline-flex items-center gap-2 rounded-sm border-2 ${accent.border} ${accent.bg} px-6 py-4 font-display text-sm uppercase tracking-widest text-primary-foreground transition hover:opacity-90`}
            >
              <CalendarCheck className="h-4 w-4" /> {ctaLabel}
            </button>
            <a
              href="tel:6146834422"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-white/30 px-6 py-4 font-display text-sm uppercase tracking-widest transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> Call (614) 683-4422
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Maintenance / Plan: warm, friendly split
  return (
    <section className="relative overflow-hidden border-b-2 border-border bg-card/40 py-20">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-[1.3fr_1fr] md:px-8">
        <div>
          <p className={`font-mono text-xs uppercase tracking-widest ${accent.text}`}>
            // {service.hero.eyebrow}
          </p>
          <h1 className="mt-3 text-5xl md:text-7xl">{service.hero.headline}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{service.hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={openSchedule}
              className={`inline-flex items-center gap-2 rounded-sm border-2 ${accent.border} ${accent.bg} px-6 py-4 font-display text-sm uppercase tracking-widest text-primary-foreground transition hover:opacity-90`}
            >
              <CalendarCheck className="h-4 w-4" /> {ctaLabel}
            </button>
            <a
              href="tel:6146834422"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-border px-6 py-4 font-display text-sm uppercase tracking-widest transition hover:border-primary"
            >
              <Phone className="h-4 w-4" /> Call (614) 683-4422
            </a>
          </div>
        </div>
        <div className={`rounded-sm border-2 border-border bg-card p-8 shadow-md`}>
          <div className={`grid h-14 w-14 place-items-center rounded-sm ${accent.bg} text-primary-foreground`}>
            <Icon className="h-7 w-7" />
          </div>
          <p className="mt-6 font-display text-3xl">{service.tagline}</p>
          <div className="mt-6 flex items-baseline gap-3">
            <span className={`font-display ${service.quoteOnly ? "text-3xl" : "text-5xl"} ${accent.text}`}>{priceLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmergencyBanner() {
  return (
    <div className="border-b-2 border-flame bg-flame/10">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 text-sm md:px-8">
        <AlertTriangle className="h-4 w-4 text-flame" />
        <span className="font-display uppercase tracking-widest text-flame">Same-day available</span>
        <span className="text-muted-foreground">— call before noon for next-availability dispatch.</span>
      </div>
    </div>
  );
}

function PlanPerks() {
  const perks = ["Annual reminder", "Priority dispatch", "10% off repairs", "Digital service history"];
  return (
    <div className="border-b border-border bg-card/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 md:grid-cols-4 md:px-8">
        {perks.map((p) => (
          <div key={p} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function InspectionBand({ service }: { service: ServiceSpec }) {
  return (
    <div className="border-b border-border bg-card/30">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-sm md:px-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-sky-500" />
          <span>NFPA 211 compliant · CSIA-credentialed technicians</span>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          // {service.shortTitle}
        </span>
      </div>
    </div>
  );
}

function Process({
  service,
  accent,
}: {
  service: ServiceSpec;
  accent: (typeof ACCENT_CLASSES)[keyof typeof ACCENT_CLASSES];
}) {
  const v = service.variant;

  // Install/plan get a vertical timeline, others get a horizontal track
  if (v === "install" || v === "plan") {
    return (
      <section className="border-b border-border bg-card/30 py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// How it goes</p>
          <h2 className="mt-3 text-4xl">{v === "plan" ? "How the membership works" : "From quote to first burn"}</h2>
          <ol className="mt-10 space-y-6">
            {service.process.map((p, i) => (
              <li key={p.title} className="flex gap-5">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-sm ${accent.bg} font-display text-xl text-primary-foreground`}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <p className="mt-1 text-muted-foreground">{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-card/30 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">// The process</p>
        <h2 className="mt-3 text-4xl">What a visit actually looks like.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((p, i) => (
            <div key={p.title} className="relative rounded-sm border-2 border-border bg-card p-5">
              <span className={`absolute -top-3 left-4 rounded-sm ${accent.bg} px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-primary-foreground`}>
                Step {i + 1}
              </span>
              <h3 className="mt-3 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Signs({
  service,
  accent,
}: {
  service: ServiceSpec;
  accent: (typeof ACCENT_CLASSES)[keyof typeof ACCENT_CLASSES];
}) {
  const v = service.variant;
  const loud = v === "repair" || v === "emergency";

  return (
    <section className={`border-b border-border py-16 ${loud ? "bg-flame/5" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={`font-mono text-xs uppercase tracking-widest ${loud ? "text-flame" : "text-primary"}`}>
              // {loud ? "Don't ignore" : "Signs you need this"}
            </p>
            <h2 className="mt-3 text-4xl">
              {loud ? "If you see any of this, call today." : `When to book a ${service.shortTitle.toLowerCase()}.`}
            </h2>
          </div>
          {loud && (
            <a
              href="tel:6146834422"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-flame px-5 py-3 font-display text-xs uppercase tracking-widest text-flame transition hover:bg-flame hover:text-white"
            >
              <Phone className="h-4 w-4" /> Call (614) 683-4422
            </a>
          )}
        </div>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {service.signs.map((s) => (
            <li
              key={s}
              className={`flex items-start gap-3 rounded-sm border-2 ${loud ? "border-flame/40" : "border-border"} bg-card p-4`}
            >
              {loud ? (
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-flame" />
              ) : (
                <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${accent.text}`} />
              )}
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Related({ service }: { service: ServiceSpec }) {
  const items = service.related
    .map((slug) => getService(slug))
    .filter((s): s is ServiceSpec => Boolean(s));

  if (!items.length) return null;

  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">// Pairs well with</p>
        <h2 className="mt-3 text-4xl">Related services.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((s) => {
            const RIcon = s.icon;
            const ra = ACCENT_CLASSES[s.accent];
            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex flex-col rounded-sm border-2 border-border bg-card p-6 transition hover:border-primary hover:shadow-flame"
              >
                <div className={`grid h-12 w-12 place-items-center rounded-sm ${ra.bg} text-primary-foreground`}>
                  <RIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-2xl">{s.shortTitle}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                  Learn more <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProblemsBlock({
  service,
  accent,
}: {
  service: ServiceSpec;
  accent: (typeof ACCENT_CLASSES)[keyof typeof ACCENT_CLASSES];
}) {
  return (
    <section className="border-b border-border bg-card/30 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className={`font-mono text-xs uppercase tracking-widest ${accent.text}`}>// Common problems</p>
        <h2 className="mt-3 text-4xl">Problems we see on Ohio homes every week.</h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {service.problems!.map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-sm border-2 border-border bg-card p-4">
              <Droplets className={`mt-0.5 h-5 w-5 shrink-0 ${accent.text}`} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BenefitsBlock({
  service,
  accent,
}: {
  service: ServiceSpec;
  accent: (typeof ACCENT_CLASSES)[keyof typeof ACCENT_CLASSES];
}) {
  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className={`font-mono text-xs uppercase tracking-widest ${accent.text}`}>// Benefits of the repair</p>
        <h2 className="mt-3 text-4xl">What you get when this is done right.</h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {service.benefits!.map((b) => (
            <li key={b} className="flex items-start gap-3 rounded-sm border-2 border-border bg-card p-4">
              <Sparkles className={`mt-0.5 h-5 w-5 shrink-0 ${accent.text}`} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
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
        className="mt-8 inline-flex items-center gap-2 rounded-sm border-2 border-primary px-6 py-3 font-display text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        See all services <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}