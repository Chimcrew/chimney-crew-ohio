import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Star, Award, Clock } from "lucide-react";
import { getSeoCity, SEO_CITIES } from "@/data/seo-cities";
import { ScheduleInline } from "@/components/ScheduleWidget";
import { SERVICES } from "@/data/services";

export const Route = createFileRoute("/service-area/$city")({
  loader: ({ params }) => {
    const city = getSeoCity(params.city);
    if (!city) throw notFound();
    return { slug: city.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData ? getSeoCity(loaderData.slug) : undefined;
    if (!c) return { meta: [{ title: "Service Area — ChimCrew" }] };
    const url = `https://chimcrew.com/service-area/${c.slug}`;
    return {
      meta: [
        { title: c.title },
        { name: "description", content: c.description },
        { property: "og:title", content: c.title },
        { property: "og:description", content: c.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `ChimCrew — ${c.name}`,
            url,
            telephone: "+1-614-683-5763",
            areaServed: { "@type": "City", name: `${c.name}, ${c.state}` },
            address: {
              "@type": "PostalAddress",
              addressLocality: c.name,
              addressRegion: c.state,
              postalCode: c.zip,
              addressCountry: "US",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="py-24 text-left mx-auto max-w-3xl px-4">
      <h1 className="font-display text-4xl font-bold">Service area not found</h1>
      <Link to="/" className="mt-6 inline-block text-flame underline">Back home</Link>
    </section>
  ),
  errorComponent: ({ error, reset }) => (
    <section className="py-24 mx-auto max-w-3xl px-4">
      <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
      <button onClick={() => reset()} className="mt-6 rounded-md border-2 border-primary px-5 py-2 font-display text-xs uppercase tracking-widest text-primary">Try again</button>
    </section>
  ),
  component: CityPage,
});

function CityPage() {
  const { slug } = Route.useLoaderData();
  const city = getSeoCity(slug)!;
  const nearby = SEO_CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-border bg-primary py-16 text-primary-foreground md:py-20">
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
            <MapPin className="h-3.5 w-3.5" /> {city.name}, {city.state} · {city.zip}
          </p>
          <h1 className="mt-4 font-display font-extrabold leading-[1.05] tracking-tight">
            {city.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-primary-foreground/85">{city.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#schedule"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E63A1F] px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-white transition hover:brightness-110"
            >
              Schedule {city.name} Service <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:6146835763"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:border-flame"
            >
              <Phone className="h-4 w-4" /> (614) 683-5763
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-6">
            {[
              { I: ShieldCheck, t: "CSIA-certified" },
              { I: Award, t: "Fully insured" },
              { I: Star, t: "5-star rated" },
              { I: Clock, t: "Same-week scheduling" },
            ].map(({ I, t }) => (
              <span key={t} className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/85">
                <I className="h-4 w-4 text-flame" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="border-b border-border bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display font-bold">Why {city.name} homeowners choose ChimCrew</h2>
          <p className="mt-4 max-w-3xl text-base text-foreground/80">{city.whyUs}</p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-flame">Recent {city.name} job</p>
            <p className="mt-2 text-base text-foreground/85">{city.localProof}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-b border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display font-bold">Chimney services we provide in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Every {city.name} job comes with flat-rate pricing, a written photo report, and our workmanship warranty.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition hover:border-flame"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-flame/10 text-flame">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold">{s.shortTitle}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.tagline}</p>
                  </div>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-flame" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEIGHBORHOODS / KEYWORDS */}
      <section className="border-b border-border bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display font-bold">{city.name} neighborhoods we serve</h2>
          <p className="mt-3 max-w-3xl text-base text-foreground/80">
            We're on a {city.name} rooftop nearly every week — chimney sweep, chimney inspection, fireplace
            cleaning, dryer vent cleaning, chimney crown repair, chimney cap installation, chimney leak repair
            and chimney drone inspection are all part of our {city.region}-metro daily route. {city.climateNote}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {city.neighborhoods.map((n) => (
              <li key={n} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground/80">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SCHEDULE FORM */}
      <section id="schedule" className="border-b border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <h2 className="font-display font-bold">Book chimney service in {city.name}</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Pick a time, tell us what's going on, and we'll text or call within the hour.
          </p>
          <div className="mt-6">
            <ScheduleInline />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="font-display font-bold">Frequently asked questions — {city.name}, OH</h2>
          <div className="mt-8 space-y-3">
            {city.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-5 transition open:border-flame">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-display text-base font-semibold text-primary">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-primary transition group-open:rotate-45 group-open:border-flame group-open:text-flame">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY */}
      {nearby.length > 0 && (
        <section className="border-b border-border bg-secondary/40 py-14">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-display font-bold">Also serving nearby {city.region}-area cities</h2>
            <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6">
              {nearby.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/service-area/$city"
                    params={{ city: c.slug }}
                    className="flex items-center justify-between gap-1 rounded-md border border-border bg-card px-3 py-3 transition hover:border-flame"
                  >
                    <span className="font-display text-sm font-semibold">{c.name}</span>
                    <CheckCircle2 className="h-4 w-4 text-flame" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
