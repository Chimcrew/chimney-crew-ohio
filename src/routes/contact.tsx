import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ChimCrew — Chimney Sweep Columbus, Cincinnati, Dayton" },
      { name: "description", content: "Call, email, or request a quote from ChimCrew. Local chimney sweeps serving Columbus, Cincinnati, and Dayton, OH." },
      { property: "og:title", content: "Contact ChimCrew" },
      { property: "og:description", content: "Reach Ohio's fired-up chimney crew. Same-day callbacks." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <section className="border-b-2 border-primary/20 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Get in touch</p>
          <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)]">Contact Our Ohio Chimney Crew</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Quotes are free, callbacks are same-day, and the coffee is always on.
            Pick whichever way is easiest for you.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Phone, label: "Call", value: "(614) 549-1954", href: "tel:6145491954" },
              { icon: Mail, label: "Email", value: "hello@chimcrew.com", href: "mailto:hello@chimcrew.com" },
              { icon: MapPin, label: "Service area", value: "Columbus · Cincinnati · Dayton", href: undefined },
              { icon: Clock, label: "Hours", value: "Mon–Sat · 7a–7p", href: undefined },
            ].map((c) => (
              <div key={c.label} className="rounded-sm border-2 border-border bg-card p-5 shadow-flame">
                <c.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="mt-1 block font-display text-base text-foreground hover:text-primary">
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 font-display text-base text-foreground">{c.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadForm />
    </div>
  );
}