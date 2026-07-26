import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ArrowRight } from "lucide-react";
import { SERVICES, ACCENT_CLASSES, formatFromPrice } from "@/data/services";
import { ScheduleInline } from "@/components/ScheduleWidget";

const SERVICE_GROUPS: { key: string; label: string; slugs: string[] }[] = [
  {
    key: "repair",
    label: "Chimney Repair",
    slugs: [
      "chimney-crown-repair", "chimney-crown-replacement", "crown-tuckpoint",
      "chimney-cap-repair", "chimney-cap-replacement", "cap-install",
      "chase-cover-replacement",
      "liner-install", "chimney-liner-repair", "chimney-flue-repair",
      "flashing-repair", "chimney-leak-repair", "waterproofing",
      "chimney-mortar-repair", "chimney-spalling-repair",
      "firebox-rebuild", "smoke-chamber-parging", "damper-repair",
    ],
  },
  {
    key: "sweep",
    label: "Chimney Sweep & Inspection",
    slugs: [
      "chimney-sweep", "chimney-cleaning",
      "level-1-inspection", "level-2-inspection",
      "chimney-maintenance", "animal-removal",
    ],
  },
  {
    key: "fireplace",
    label: "Fireplace Services",
    slugs: [
      "wood-fireplace-service", "wood-fireplace-repair", "wood-fireplace-insert",
      "gas-fireplace-service", "gas-fireplace-repair", "gas-fireplace-insert",
      "gas-fireplace-cleaning", "fireplace-damper-repair", "annual-plan",
    ],
  },
  {
    key: "masonry",
    label: "Masonry",
    slugs: [
      "chimney-masonry-repair", "chimney-brick-repair", "chimney-tuckpointing",
      "brick-repair", "tuckpointing", "brick-wall-repair", "foundation-masonry",
    ],
  },
  {
    key: "dryer",
    label: "Dryer Vent",
    slugs: ["dryer-vent-cleaning"],
  },
];

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Chimney Services in Ohio — ChimCrew" },
      { name: "description", content: "Sweeps, inspections, liners, crowns, caps, waterproofing, flashing, firebox rebuilds, animal removal, gas service, and more — all flat-rate." },
      { property: "og:title", content: "Chimney Services in Ohio — ChimCrew" },
      { property: "og:description", content: "14 chimney services, every one flat-rate, every one with a photo report." },
      { property: "og:url", content: "https://chimcrew.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Chimney Services in Ohio",
          url: "https://chimcrew.com/services",
          about: "Chimney sweep, inspection, repair, liner, crown, cap, waterproofing and fireplace services across Columbus, Cincinnati and Dayton.",
          hasPart: SERVICES.map((s) => ({
            "@type": "Service",
            name: s.title,
            url: `https://chimcrew.com/services/${s.slug}`,
            provider: { "@type": "LocalBusiness", name: "ChimCrew" },
            areaServed: "Ohio",
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative border-b-2 border-primary/30 bg-card/40 py-20">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// Services</p>
          <h1 className="mt-3 text-6xl md:text-7xl">Chimney Services in <span className="text-flame">Ohio</span></h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {SERVICES.length} services, every one priced before we start, every
            one ending with photos and a written report. Tap any service to see
            exactly what's included.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {SERVICE_GROUPS.map((group) => {
            const items = SERVICES.filter((s) => group.slugs.includes(s.slug));
            if (!items.length) return null;
            return (
              <div key={group.key} className="mb-16 last:mb-0">
                <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-primary/30 pb-3">
                  <h2 className="text-3xl md:text-4xl">{group.label}</h2>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {items.length} service{items.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => {
                    const accent = ACCENT_CLASSES[s.accent];
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.slug}
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="group flex flex-col rounded-none border-2 border-border bg-card p-6 transition hover:border-primary hover:shadow-flame"
                      >
                        <div className="flex items-start justify-between">
                          <div className={`grid h-12 w-12 place-items-center rounded-none ${accent.bg} text-primary-foreground`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          {formatFromPrice(s) ? (
                            <span className={`font-display text-2xl ${accent.text}`}>{formatFromPrice(s)}</span>
                          ) : (
                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Free Quote</span>
                          )}
                        </div>
                        <h3 className="mt-5 text-2xl">{s.shortTitle}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                        <ul className="mt-4 space-y-1.5 text-sm">
                          {s.bullets.slice(0, 3).map((b) => (
                            <li key={b} className="flex gap-2"><ChevronRight className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} /> {b}</li>
                          ))}
                        </ul>
                        <span className="mt-6 inline-flex items-center justify-between gap-2 border-t border-border pt-4 font-mono text-xs uppercase tracking-widest text-primary">
                          View details
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <ScheduleInline />
        </div>
      </section>

    </>
  );
}
