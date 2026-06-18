import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { ScheduleInline } from "@/components/ScheduleWidget";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule Service Online — ChimCrew" },
      {
        name: "description",
        content:
          "Book a chimney inspection, sweep, or repair in 60 seconds. Servicing Columbus, Dayton, Cincinnati & surrounding Ohio neighborhoods.",
      },
      { property: "og:title", content: "Schedule Service Online — ChimCrew" },
      {
        property: "og:description",
        content:
          "Book a chimney inspection, sweep, or repair in 60 seconds. Servicing your area and surrounding Ohio neighborhoods.",
      },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/schedule" }],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <>
      <section className="relative bg-background py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="mb-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-flame">
              Book online · No pop-ups · No spam
            </p>
            <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight text-primary md:text-4xl">
              Schedule your ChimCrew appointment.
            </h1>
            <p className="mt-2 text-sm text-foreground/75 md:text-base">
              Three quick steps. Appointment confirmation emailed within 10 minutes.
            </p>
          </div>
          <ScheduleInline />
        </div>
      </section>
      <TrustMarqueeLite />
      <EmergencyCallBarLite />
    </>
  );
}

/* Lightweight inline copies of the homepage trust + emergency bars
   so the /schedule page renders both directly under the form,
   above the global footer. */
function TrustMarqueeLite() {
  const chips = [
    "★★★★★ Google",
    "★★★★★ Yelp",
    "Angi Super Service '24",
    "BBB A+ Accredited",
    "★★★★★ HomeAdvisor",
    "★★★★★ Porch",
  ];
  const loop = [...chips, ...chips];
  return (
    <section
      aria-label="Trusted on review platforms"
      className="relative overflow-hidden border-y border-border bg-secondary/60 py-4"
    >
      <p className="mb-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
        ★ 5-Star Rated · Google · Yelp · Angi · BBB
      </p>
      <div className="flex w-max animate-marquee items-center gap-3 whitespace-nowrap px-3">
        {loop.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-2 font-sans text-sm font-semibold text-foreground shadow-sm"
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

function EmergencyCallBarLite() {
  return (
    <a
      href="tel:6146835763"
      className="block w-full bg-[#E63A1F] py-3 text-center text-primary-foreground transition hover:brightness-110"
    >
      <span className="inline-flex items-center gap-2 font-display text-sm font-bold underline decoration-2 underline-offset-4 sm:text-base">
        <Phone className="h-4 w-4" />
        For emergency service Call: (614) 683-5763
      </span>
    </a>
  );
}