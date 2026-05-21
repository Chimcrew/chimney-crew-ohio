import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Wind, Hammer, Search, Bird, ShieldCheck, ChevronRight } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ChimCrew Chimney Sweeps Ohio" },
      { name: "description", content: "Chimney sweeps, inspections, liners, caps, animal removal and full rebuilds in Columbus, Cincinnati, and Dayton." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Wind, title: "Chimney Sweep", price: "$189", desc: "Full creosote and soot removal with HEPA containment. Includes basic safety check.", bullets: ["Drop cloths + HEPA vacuum", "Smoke chamber & damper cleaned", "Written safety summary"] },
  { icon: Search, title: "Level 1 Inspection", price: "$129", desc: "Visual inspection of all accessible portions, recommended annually.", bullets: ["Photo report", "Recommended next steps", "Bundled free with sweep"] },
  { icon: Search, title: "Level 2 Inspection", price: "$299", desc: "Required for home sales, after a chimney fire, or appliance changes.", bullets: ["Camera scan of full flue", "Written documentation", "Compliant for real estate"] },
  { icon: Hammer, title: "Crown & Tuckpoint", price: "From $650", desc: "Repair or rebuild your chimney crown and mortar joints.", bullets: ["Waterproofing included", "Stainless steel reinforcement", "5-year workmanship warranty"] },
  { icon: Flame, title: "Stainless Liner Install", price: "From $1,890", desc: "Sized to your appliance for safer burns and better draft.", bullets: ["Lifetime liner warranty", "Insulated wrap", "Full inspection after install"] },
  { icon: Bird, title: "Animal Removal + Cap", price: "From $349", desc: "Humane removal and a stainless cap so they don't come back.", bullets: ["Humane methods", "Cap install included", "Sanitization available"] },
  { icon: ShieldCheck, title: "Annual Service Plan", price: "$249/yr", desc: "Yearly sweep + Level 1 inspection + priority scheduling.", bullets: ["10% off any repairs", "Priority emergency dispatch", "Digital service history"] },
];

function ServicesPage() {
  return (
    <>
      <section className="relative border-b-2 border-primary/30 bg-card/40 py-20">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// Services</p>
          <h1 className="mt-3 text-6xl md:text-7xl">Flat-rate. <span className="text-flame">No surprises.</span></h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every job priced before we start. Every job ends with photos and a
            written report. Everything we do, all in one place.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.title} className="flex flex-col rounded-sm border-2 border-border bg-card p-6 transition hover:border-primary hover:shadow-flame">
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-sm bg-primary text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="font-display text-2xl text-primary">{s.price}</span>
              </div>
              <h3 className="mt-5 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}</li>
                ))}
              </ul>
              <Link to="/" hash="quote" className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm border-2 border-primary px-4 py-3 font-display text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground">
                Book this service
              </Link>
            </article>
          ))}
        </div>
      </section>

      <LeadForm />
    </>
  );
}
