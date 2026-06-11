import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Phone, CalendarCheck, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICE_CITIES } from "@/components/ServiceAreaSeo";
import { SERVICES } from "@/data/services";

function getCity(slug: string) {
  return SERVICE_CITIES.find((c) => c.slug === slug);
}

export const Route = createFileRoute("/service-area/$city")({
  loader: ({ params }) => {
    const city = getCity(params.city);
    if (!city) throw notFound();
    return { slug: city.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData ? getCity(loaderData.slug) : undefined;
    if (!c) {
      return { meta: [{ title: "Service Area — ChimCrew" }] };
    }
    const title = `Chimney Repair & Sweep in ${c.name}, ${c.state} — ChimCrew`;
    const description = `Local chimney repair, sweeping, inspections, and fireplace services in ${c.name}, ${c.state}. CSIA-certified, upfront pricing, same-week scheduling.`;
    const url = `https://chimcrew.com/service-area/${c.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
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
              addressCountry: "US",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="py-24 text-center">
      <h1 className="text-5xl">Service area not found</h1>
      <Link to="/" className="mt-6 inline-block text-primary underline">Back home</Link>
    </section>
  ),
  errorComponent: ({ error, reset }) => (
    <section className="py-24 text-center">
      <h1 className="text-3xl">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
      <button onClick={() => reset()} className="mt-6 rounded-md border-2 border-primary px-5 py-2 font-display text-xs uppercase tracking-widest text-primary">Try again</button>
    </section>
  ),
  component: CityPage,
});

function CityPage() {
  const { slug } = Route.useLoaderData();
  const city = getCity(slug)!;

  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-border bg-primary py-20 text-primary-foreground md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
            <MapPin className="h-3.5 w-3.5" /> {city.name}, {city.state}
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            Chimney Repair, Sweeping &amp; Fireplace Services in {city.name}.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{city.blurb}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-flame px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_30px_oklch(0.78_0.19_92/0.25)] transition hover:bg-white"
            >
              <CalendarCheck className="h-4 w-4" /> Schedule Service
            </Link>
            <a
              href="tel:6146835763"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:border-flame"
            >
              <Phone className="h-4 w-4" /> Call (614) 683-5763
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl">Services we provide in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every {city.name} job comes with flat-rate pricing, a written photo report, and our workmanship warranty.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-start gap-3 rounded-sm border-2 border-border bg-card p-4 transition hover:border-flame"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-flame/10 text-flame">
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

      <section className="border-b border-border bg-card/30 py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl">Why {city.name} homeowners choose ChimCrew</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              "Family-owned and locally operated — not a national call center",
              "Fast response times with same-week scheduling across the metro",
              "Upfront, flat-rate pricing in writing before any work begins",
              "CSIA-certified, fully insured technicians",
              "Written workmanship warranty on every repair",
              "Photos and a digital report with every visit",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-sm border-2 border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-flame" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}