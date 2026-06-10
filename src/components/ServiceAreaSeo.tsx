import { Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";

export const SERVICE_CITIES = [
  {
    slug: "columbus-oh",
    name: "Columbus",
    state: "OH",
    blurb:
      "Full-service chimney sweep, inspection, and repair across Columbus and the I-270 outerbelt — including Dublin, Hilliard, Westerville, Powell, Worthington and Grove City.",
  },
  {
    slug: "dayton-oh",
    name: "Dayton",
    state: "OH",
    blurb:
      "Trusted chimney repair, flashing, and crown work for Dayton, Kettering, Beavercreek, Centerville, and Huber Heights — same-week scheduling.",
  },
  {
    slug: "cincinnati-oh",
    name: "Cincinnati",
    state: "OH",
    blurb:
      "CSIA-certified sweeps, fireplace tune-ups, and masonry restoration throughout Cincinnati, Mason, West Chester, Anderson, and Hyde Park.",
  },
  {
    slug: "cleveland-oh",
    name: "Cleveland",
    state: "OH",
    blurb:
      "Chimney inspections, liner installs, and waterproofing serving Cleveland, Lakewood, Parma, Shaker Heights, and the East and West sides.",
  },
] as const;

export function ServiceAreaSeo() {
  return (
    <section className="relative border-y border-border bg-background py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <MapPin className="h-3.5 w-3.5 text-flame" /> Service Area
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
            Local chimney service across Ohio.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            ChimCrew provides chimney repair, sweeping, inspections, and fireplace
            services to homeowners throughout these regions. Tap your city for
            local pricing, response times, and recent jobs.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CITIES.map((c) => (
            <li key={c.slug}>
              <Link
                to="/service-area/$city"
                params={{ city: c.slug }}
                className="group block h-full rounded-xl border-2 border-border bg-card p-6 transition hover:border-flame hover:shadow-flame"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
                    <MapPin className="h-3.5 w-3.5" /> {c.state}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-flame" />
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
                  Chimney Services in {c.name}, {c.state}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[11px] uppercase tracking-widest text-primary">
                  View {c.name} services
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}