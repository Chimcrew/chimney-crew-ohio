import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { openScheduleDialog } from "@/components/ScheduleWidget";
import { FEATURED_SERVICE_AREAS } from "@/data/service-area-featured";

const SITE = "https://chimcrew.com";

export const Route = createFileRoute("/service-area/")({
  head: () => ({
    meta: [
      { title: "Service Areas | ChimCrew" },
      {
        name: "description",
        content:
          "Chimney Crew provides professional chimney inspections, cleaning, repair, maintenance, and related services throughout Columbus and surrounding Central Ohio communities.",
      },
      { property: "og:title", content: "Service Areas | ChimCrew" },
      {
        property: "og:description",
        content:
          "Professional chimney services throughout Columbus and surrounding Central Ohio communities.",
      },
      { property: "og:url", content: `${SITE}/service-area` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/service-area` }],
  }),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <>
            <MapPin className="h-3 w-3" />
            Columbus &amp; Surrounding Communities
          </>
        }
        title="Service Areas"
        subtitle="Chimney Crew proudly provides professional chimney services throughout Columbus and surrounding communities. Our experienced team serves homeowners with reliable chimney inspections, cleaning, repair, maintenance, and related services across Central Ohio."
      />

      <section className="border-b border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="font-display text-xl font-bold text-primary">
            We currently serve:
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {FEATURED_SERVICE_AREAS.map((city) => (
              <Link
                key={city.slug}
                to="/service-area/$city"
                params={{ city: city.slug }}
                className="group flex items-center justify-between border border-border bg-card px-5 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-flame hover:shadow-[0_10px_25px_oklch(0.18_0.02_250/0.08)]"
              >
                <span className="inline-flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-flame" />
                  <span className="font-display text-sm font-bold text-foreground transition group-hover:text-primary">
                    {city.name}, {city.state}
                  </span>
                </span>

                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition duration-200 group-hover:translate-x-1 group-hover:text-flame" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/80 md:text-lg">
            Whether you need routine chimney cleaning, an inspection before
            selling or buying a home, or professional chimney repairs, Chimney
            Crew is ready to help. Contact us today to schedule reliable chimney
            service in your area.
          </p>

          <button
            type="button"
            onClick={() => openScheduleDialog()}
            className="group mt-8 inline-flex items-center gap-2 bg-primary px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
          >
            Schedule Chimney Service
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </>
  );
}
