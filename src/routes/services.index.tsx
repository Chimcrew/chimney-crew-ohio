import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { SERVICES, ACCENT_CLASSES } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Chimney Services in Ohio — ChimCrew" },
      { name: "description", content: "Sweeps, inspections, liners, crowns, caps, waterproofing, flashing, firebox rebuilds, animal removal, gas service, and more — all flat-rate." },
      { property: "og:title", content: "Chimney Services in Ohio — ChimCrew" },
      { property: "og:description", content: "14 chimney services, every one flat-rate, every one with a photo report." },
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
          <h1 className="mt-3 text-6xl md:text-7xl">Flat-rate. <span className="text-flame">No surprises.</span></h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {SERVICES.length} services, every one priced before we start, every
            one ending with photos and a written report. Tap any service to see
            exactly what's included.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const accent = ACCENT_CLASSES[s.accent];
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex flex-col rounded-sm border-2 border-border bg-card p-6 transition hover:border-primary hover:shadow-flame"
              >
                <div className="flex items-start justify-between">
                  <div className={`grid h-12 w-12 place-items-center rounded-sm ${accent.bg} text-primary-foreground`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`font-display text-2xl ${accent.text}`}>{s.price}</span>
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
      </section>

      <LeadForm />
    </>
  );
}
