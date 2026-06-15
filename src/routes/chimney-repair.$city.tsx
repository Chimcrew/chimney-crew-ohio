import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Phone,
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  Star,
  MapPin,
  Award,
  Home as HomeIcon,
  Flame,
  ArrowRight,
} from "lucide-react";
import { ScheduleInline } from "@/components/ScheduleWidget";
import { TrustBadges } from "@/components/TrustBadges";
import { BeforeAfter } from "@/components/BeforeAfter";
import { BEFORE_AFTER_JOBS } from "@/data/before-after";
import { SEO_CITIES, CITY_SERVICES, getSeoCity } from "@/data/seo-cities";

export const Route = createFileRoute("/chimney-repair/$city")({
  loader: ({ params }) => {
    const city = getSeoCity(params.city);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.city;
    if (!c) return { meta: [{ title: "Chimney Service | ChimCrew" }] };
    const url = `https://chimcrew.com/chimney-repair/${c.slug}`;
    return {
      meta: [
        { title: c.title },
        { name: "description", content: c.description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: c.title },
        { property: "og:description", content: c.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `ChimCrew — Chimney Services in ${c.name}, ${c.state}`,
            telephone: "+1-614-683-5763",
            url,
            areaServed: { "@type": "City", name: c.name },
            address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: c.state, postalCode: c.zip, addressCountry: "US" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faqs.map((f: { q: string; a: string }) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: CityPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">City not found</h1>
      <p className="mt-3 text-muted-foreground">Try our <Link to="/" className="text-flame underline">homepage</Link>.</p>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
    </div>
  ),
});

const TRUST = [
  { icon: HomeIcon, label: "Family Owned Since 1974" },
  { icon: Award, label: "CSIA Certified" },
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: CheckCircle2, label: "Written Warranty" },
  { icon: MapPin, label: "Local Ohio Crew" },
];

function CityPage() {
  const { city } = Route.useLoaderData();
  const others = SEO_CITIES.filter((c) => c.slug !== city.slug);

  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,_oklch(0.24_0.02_250)_0%,_oklch(0.08_0.01_250)_70%)]" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-flame/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 md:px-8 md:py-16 lg:grid-cols-12 lg:items-start lg:py-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
              {city.name}, {city.state} · {city.zip} · Same-Day Service
            </span>

            <h1 className="mt-5 font-display text-3xl font-black uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
              {city.h1}
            </h1>

            <p className="mt-5 max-w-xl text-base font-medium text-primary-foreground/85 md:text-lg">
              CSIA-certified, family-owned since 1974 · {city.drive} · Written warranty on every job.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#book" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6">
                <CalendarCheck className="h-4 w-4" /> Schedule appointment online
              </a>
              <a href="tel:6146835763" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-5 font-sans text-[13px] font-medium tracking-normal text-primary-foreground transition hover:border-flame active:scale-95 sm:px-6">
                <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
              </a>
            </div>

            <div className="mt-8">
              <TrustBadges variant="light" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-primary-foreground/80">
              <span className="inline-flex items-center gap-1.5 font-display text-sm font-bold">
                <Star className="h-4 w-4 fill-flame text-flame" /> 5-Star Rated · Verified Reviews
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                CSIA Certified · BBB A+ · Licensed &amp; Insured
              </span>
            </div>
          </div>

          <div id="book" className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-flame/30 bg-card shadow-[0_30px_80px_-30px_oklch(0_0_0/0.55)]">
              <ScheduleInline />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
              No card · No spam · A real {city.name} tech texts you in &lt; 60 minutes
            </p>
          </div>
        </div>
      </section>

      {/* LOCAL INTRO */}
      <section className="border-b border-border bg-background py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-3 md:px-8">
          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Local to {city.name}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-4xl">
              Why {city.name} homeowners call ChimCrew
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{city.intro}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{city.whyUs}</p>
            <div className="mt-6 rounded-xl border-2 border-flame/30 bg-flame/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">// Recent job in {city.name}</p>
              <p className="mt-2 text-base font-semibold text-foreground">{city.localProof}</p>
            </div>
          </div>
          <aside className="rounded-2xl border-2 border-border bg-card p-6">
            <h3 className="font-display text-lg font-extrabold text-primary">{city.name} at a glance</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">ZIP</dt>
                <dd className="font-semibold text-foreground">{city.zip}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Population</dt>
                <dd className="font-semibold text-foreground">{city.population}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">From our HQ</dt>
                <dd className="font-semibold text-foreground">{city.drive}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Neighborhoods served</dt>
                <dd className="text-foreground">{city.neighborhoods.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Typical homes</dt>
                <dd className="text-foreground">{city.homeStyles}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Local note</dt>
                <dd className="text-foreground">{city.climateNote}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-b border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Services in {city.name}, {city.state}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-5xl">
              Every chimney service {city.name} needs
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CITY_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.label}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex flex-col gap-3 rounded-xl border-2 border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-flame"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-flame">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-base font-extrabold text-primary">{s.label}</p>
                  <p className="text-sm text-muted-foreground">{s.blurb(city.name)}</p>
                  <span className="mt-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-flame">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Why {city.name} picks ChimCrew</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
              Local. Certified. <span className="text-flame">Accountable.</span>
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            {TRUST.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-flame text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-sm font-extrabold uppercase tracking-wide">{t.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="border-y border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Recent Central Ohio jobs</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-5xl">Before &amp; After</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {BEFORE_AFTER_JOBS.slice(0, 4).map((job) => (
              <div key={job.id} className="overflow-hidden rounded-2xl border-2 border-border bg-card">
                <BeforeAfter before={job.before} after={job.after} alt={job.headline} />
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                    {job.service} · {job.city}
                  </p>
                  <p className="mt-2 font-display text-lg font-extrabold text-primary">{job.headline}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{job.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-5xl">
              Chimney questions from {city.name} homeowners
            </h2>
          </div>
          <div className="mt-10 divide-y divide-border rounded-2xl border-2 border-border bg-card">
            {city.faqs.map((f: { q: string; a: string }) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-extrabold text-primary">
                  {f.q}
                  <span className="font-mono text-flame transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED CITIES */}
      <section className="border-y border-border bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Nearby service areas</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-4xl">
              Chimney service in cities near {city.name}
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/chimney-repair/$city"
                  params={{ city: o.slug }}
                  className="group block h-full rounded-xl border-2 border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-flame"
                >
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                    <MapPin className="h-3.5 w-3.5" /> {o.state}
                  </span>
                  <p className="mt-2 font-display text-lg font-extrabold text-primary">
                    Chimney Repair {o.name}, {o.state}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-foreground">
                    View {o.name} <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-flame py-10 text-primary">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left md:px-8">
          <div className="flex items-center gap-4">
            <Flame className="h-8 w-8" />
            <p className="font-display text-xl font-extrabold md:text-2xl">
              Need a chimney pro in {city.name}? Book your free inspection.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#book" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-sans text-[13px] font-bold tracking-normal text-primary-foreground shadow-[0_8px_22px_oklch(0.18_0.02_250/0.25)] transition active:scale-95 sm:px-6">
              <CalendarCheck className="h-4 w-4" /> Schedule appointment online
            </a>
            <a href="tel:6146835763" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-primary px-5 font-sans text-[13px] font-medium tracking-normal text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-95 sm:px-6">
              <Phone className="h-4 w-4" /> (614) 683-5763
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}