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
import { ACCENT_CLASSES, getService, formatFromPrice, type ServiceSpec } from "@/data/services";
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
    <div className="bg-primary text-primary-foreground">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-white/5 bg-black/30">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground/60 md:px-8">
          <li><Link to="/" className="hover:text-flame">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link to="/services" className="hover:text-flame">Services</Link></li>
          <li aria-hidden>/</li>
          <li className="text-flame">{service.shortTitle}</li>
        </ol>
      </nav>

      {/* HERO — varies by variant */}
      <Hero service={service} accent={accent} Icon={Icon} />

      {/* Variant-specific signature band right after hero */}
      {variant === "emergency" && <EmergencyBanner />}
      {variant === "plan" && <PlanPerks />}
      {variant === "inspection" && <InspectionBand service={service} />}

      {/* What's included */}
      <section className="border-b border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">// What you get</p>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              {service.quoteOnly
                ? `Everything in your ${service.shortTitle.toLowerCase()}.`
                : `Everything in the flat ${service.price} price.`}
            </h2>
            <p className="text-primary-foreground/65">
              {service.quoteOnly
                ? "Every project starts with a free on-site inspection and a written, flat-rate quote. No surprises, no upsells — just the work your home actually needs."
                : "No add-ons, no nickel-and-diming. The number you see is the number you pay — and you'll know it before we lift a tool."}
            </p>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {service.bullets.map((b) => (
              <li
                key={b}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-flame/40 hover:bg-white/[0.05]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-flame/15 text-flame ring-1 ring-flame/30 transition group-hover:bg-flame group-hover:text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="pt-1.5 text-primary-foreground/90">{b}</span>
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
      <section className="border-b border-white/5 py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">// Common questions</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
            {service.shortTitle} <span className="text-flame">FAQs</span>
          </h2>
          <div className="mt-10 space-y-3">
            {service.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 open:border-flame/40 open:bg-white/[0.06] transition"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="font-display text-lg font-bold text-primary-foreground">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-flame transition group-open:rotate-45 group-open:border-flame group-open:bg-flame group-open:text-primary text-xl leading-none">+</span>
                </summary>
                <p className="mt-4 border-t border-white/10 pt-4 text-primary-foreground/75 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <Related service={service} />

      {/* Final CTA — unified across all service pages */}
      <FinalServiceCta ctaLabel={ctaLabel} />

      <LeadForm />
    </div>
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
            href="tel:6145491954"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-white/5 px-7 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground backdrop-blur transition hover:border-flame hover:bg-white/10 sm:w-auto"
          >
            <Phone className="h-4 w-4" /> Call Now · (614) 549-1954
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
  const priceLabel = formatFromPrice(service);
  const ctaLabel = service.quoteOnly ? "Request Free Inspection" : "Schedule Free Inspection";
  void accent;

  // Split headline so last word renders in flame italic
  const headline = service.hero.headline;
  const words = headline.split(" ");
  const lastTwo = words.slice(-2).join(" ");
  const headlineLead = words.slice(0, -2).join(" ");

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Subtle warm ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-flame/15 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-[36rem] w-[36rem] rounded-full bg-flame/10 blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-8 lg:col-span-7">
          {/* Mono eyebrow with leading line */}
          <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
            <span className="h-px w-8 bg-flame" aria-hidden />
            {service.hero.eyebrow}
          </div>

          {/* Headline — last two words in flame italic */}
          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            {headlineLead ? (
              <>
                {headlineLead}{" "}
                <span className="italic text-flame">{lastTwo}</span>
              </>
            ) : (
              headline
            )}
          </h1>

          {/* Body sub */}
          <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/65 md:text-xl">
            {service.hero.sub}
          </p>

          {/* Stat strip — price + duration */}
          <div className="inline-flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground/45">
                {service.quoteOnly ? "Estimated Investment" : "Flat rate"}
              </span>
              <span className="font-display text-3xl font-extrabold text-flame">{priceLabel}</span>
            </div>
            {service.duration && (
              <>
                <div className="hidden h-12 w-px bg-white/10 sm:block" aria-hidden />
                <div className="flex flex-col">
                  <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground/45">
                    Completion Time
                  </span>
                  <span className="font-display text-3xl font-extrabold">{service.duration}</span>
                </div>
              </>
            )}
            <div className="hidden h-12 w-px bg-white/10 sm:block" aria-hidden />
            <div className="flex flex-col">
              <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground/45">
                Guarantee
              </span>
              <span className="font-display text-3xl font-extrabold">Workmanship</span>
            </div>
          </div>

          {/* CTAs — rounded pill, matches homepage */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={openSchedule}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-flame px-8 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-primary shadow-[0_0_40px_-5px_oklch(0.78_0.19_92/0.5)] transition hover:scale-[1.02] hover:bg-white"
            >
              <CalendarCheck className="h-5 w-5" />
              {ctaLabel}
            </button>
            <a
              href="tel:6145491954"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-transparent px-8 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-primary-foreground transition hover:border-white hover:bg-white/5"
            >
              <Phone className="h-5 w-5" />
              Call (614) 549-1954
            </a>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
            {[
              "CSIA Certified",
              "BBB A+ Rated",
              "Licensed & Insured",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground/55">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-flame/15 text-flame">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right-side service card with glow */}
        <div className="relative lg:col-span-5">
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-flame/10 blur-[100px]" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-flame" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                  {service.quoteOnly ? "Custom Project" : "Service Spec"}
                </span>
              </div>
              <span className="font-mono text-[10px] text-primary-foreground/40">
                /{service.slug.toUpperCase().slice(0, 12)}
              </span>
            </div>
            <div className="relative aspect-[5/6] bg-gradient-to-br from-flame/15 via-primary to-black/40">
              <div className="absolute inset-0 grid place-items-center">
                <Icon className="h-40 w-40 text-flame opacity-30" strokeWidth={1.2} />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,oklch(0.78_0.19_92/0.25),transparent_60%)]" />
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-flame backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-flame" />
                  Same-day slots
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                <p className="font-display text-xl font-extrabold text-flame">{service.shortTitle}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-primary-foreground/70">
                  <MapPin className="mr-1 inline h-3 w-3" />
                  Columbus · Cincinnati · Dayton
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 bg-black/20 p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/60">
                Tagline
              </span>
              <span className="text-right font-display text-sm font-bold text-primary-foreground">
                {service.tagline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmergencyBanner() {
  return (
    <div className="border-y border-flame/30 bg-flame/[0.08]">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 text-sm md:px-8">
        <AlertTriangle className="h-4 w-4 text-flame" />
        <span className="font-display uppercase tracking-widest text-flame">Same-day available</span>
        <span className="text-primary-foreground/65">— call before noon for next-availability dispatch.</span>
      </div>
    </div>
  );
}

function PlanPerks() {
  const perks = ["Annual reminder", "Priority dispatch", "10% off repairs", "Digital service history"];
  return (
    <div className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 md:grid-cols-4 md:px-8">
        {perks.map((p) => (
          <div key={p} className="flex items-center gap-2 text-sm text-primary-foreground/85">
            <CheckCircle2 className="h-4 w-4 text-flame" /> {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function InspectionBand({ service }: { service: ServiceSpec }) {
  return (
    <div className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-sm md:px-8">
        <div className="flex items-center gap-2 text-primary-foreground/70">
          <ShieldCheck className="h-4 w-4 text-flame" />
          <span>NFPA 211 compliant · CSIA-credentialed technicians</span>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-primary-foreground/45">
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
  void accent;
  const v = service.variant;
  const title =
    v === "plan"
      ? "How the membership works"
      : v === "install"
      ? "From quote to first burn"
      : "What a visit actually looks like.";

  return (
    <section className="border-b border-white/5 bg-black/30 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">// The process</p>
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">{title}</h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((p, i) => (
            <div
              key={p.title}
              className="group flex flex-col gap-4 bg-primary p-8 transition hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary-foreground/40">
                  Step_{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-5xl font-black text-white/5 transition group-hover:text-flame/30">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65">{p.desc}</p>
              </div>
              <div className="mt-auto h-px w-10 bg-flame" />
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
  void accent;
  const v = service.variant;
  const loud = v === "repair" || v === "emergency";

  return (
    <section className={`border-b border-white/5 py-20 ${loud ? "bg-flame/[0.04]" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">
              // {loud ? "Don't ignore" : "Signs you need this"}
            </p>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              {loud ? (
                <>If you see any of this, <span className="text-flame italic">call today.</span></>
              ) : (
                <>When to book a <span className="text-flame italic">{service.shortTitle.toLowerCase()}.</span></>
              )}
            </h2>
          </div>
          {loud && (
            <a
              href="tel:6145491954"
              className="inline-flex items-center gap-2 rounded-full border-2 border-flame px-6 py-3 font-display text-xs font-extrabold uppercase tracking-widest text-flame transition hover:bg-flame hover:text-primary"
            >
              <Phone className="h-4 w-4" /> Call (614) 549-1954
            </a>
          )}
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {service.signs.map((s, i) => (
            <li
              key={s}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-flame/40"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-flame/15 text-flame ring-1 ring-flame/30">
                {loud ? <AlertTriangle className="h-5 w-5" /> : <span className="font-mono text-xs font-bold">{String(i+1).padStart(2,'0')}</span>}
              </span>
              <span className="pt-1.5 text-primary-foreground/90">{s}</span>
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
    <section className="border-b border-white/5 bg-black/30 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">// Pairs well with</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Related <span className="text-flame italic">services.</span></h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((s) => {
            const RIcon = s.icon;
            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-flame/50 hover:bg-white/[0.06]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-flame/15 text-flame ring-1 ring-flame/30 transition group-hover:bg-flame group-hover:text-primary">
                  <RIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold">{s.shortTitle}</h3>
                <p className="mt-2 text-sm text-primary-foreground/65">{s.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-flame">
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
  void accent;
  return (
    <section className="border-b border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">// Common problems</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Problems we see on Ohio homes <span className="text-flame italic">every week.</span></h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {service.problems!.map((p) => (
            <li key={p} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-flame/40">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-flame/15 text-flame ring-1 ring-flame/30">
                <Droplets className="h-5 w-5" />
              </span>
              <span className="pt-1.5 text-primary-foreground/90">{p}</span>
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
  void accent;
  return (
    <section className="border-b border-white/5 bg-black/30 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">// Benefits of the repair</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">What you get when this is <span className="text-flame italic">done right.</span></h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {service.benefits!.map((b) => (
            <li key={b} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-flame/40">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-flame/15 text-flame ring-1 ring-flame/30">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="pt-1.5 text-primary-foreground/90">{b}</span>
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