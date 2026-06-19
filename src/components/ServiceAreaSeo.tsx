import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { SEO_CITIES } from "@/data/seo-cities";

// Kept for backward compatibility — old SERVICE_CITIES export used by SiteFooter & city route fallback.
export const SERVICE_CITIES = SEO_CITIES.map((c) => ({
  slug: c.slug,
  name: c.name,
  state: c.state,
  blurb: c.description,
}));

export function ServiceAreaSeo() {
  const byRegion: Record<string, typeof SEO_CITIES> = {
    Columbus: [],
    Dayton: [],
    Cincinnati: [],
  };
  SEO_CITIES.forEach((c) => byRegion[c.region].push(c));

  return (
    <section className="border-y border-border bg-secondary/40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <MapPin className="h-3.5 w-3.5 text-flame" /> Service Area
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">
            Cities we serve across Ohio.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            ChimCrew serves homeowners throughout the Columbus, Dayton and Cincinnati
            metros — over 30 cities in central and southwest Ohio. Tap your city for
            local pricing, service details, and recent jobs.
          </p>
        </div>

        {(["Columbus", "Dayton", "Cincinnati"] as const).map((region) => (
          <div key={region} className="mt-10">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-flame">
              {region} Metro
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {byRegion[region].map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/service-area/$city"
                    params={{ city: c.slug }}
                    className="group flex h-full items-center justify-between gap-1 rounded-none border border-border bg-card px-3 py-3 text-left transition hover:border-flame hover:bg-flame/5"
                  >
                    <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary">
                      {c.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      OH
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
