import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, CalendarCheck, ShieldCheck, Flame } from "lucide-react";
import { ScheduleInline } from "@/components/ScheduleWidget";

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
    <div className="bg-background">
      {/* HERO + INLINE SCHEDULE */}
      <section className="relative overflow-hidden bg-background text-primary">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-flame/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-flame/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* Left: intro */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              <Flame className="h-3 w-3" /> Book in 60 seconds
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Talk to a real Ohio <span className="italic text-flame">chimney crew.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary/70">
              Skip the phone tag. Pick a service, pick a window, and a CSIA-certified tech will confirm with you within the hour.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Phone, label: "Call", value: "(614) 549-1954", href: "tel:6145491954" },
                { icon: Mail, label: "Email", value: "hello@chimcrew.com", href: "mailto:hello@chimcrew.com" },
                { icon: MapPin, label: "Service area", value: "Columbus · Cincinnati · Dayton · Cleveland" },
                { icon: Clock, label: "Hours", value: "Mon–Sat · 7a–7p" },
              ].map((c) => {
                const Inner = (
                  <>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-flame/15 text-flame ring-1 ring-flame/40">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/55">{c.label}</p>
                      <p className="mt-0.5 truncate font-display text-sm font-bold text-primary">{c.value}</p>
                    </div>
                  </>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-3 transition hover:border-flame hover:-translate-y-0.5 hover:shadow-[0_8px_24px_oklch(0.2_0.02_60/0.08)]">
                    {Inner}
                  </a>
                ) : (
                  <div key={c.label} className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-3">
                    {Inner}
                  </div>
                );
              })}
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {[
                { icon: ShieldCheck, label: "Licensed & insured" },
                { icon: CalendarCheck, label: "Same-day callback" },
                { icon: Flame, label: "Flat-rate quotes in writing" },
              ].map((t) => (
                <li key={t.label} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">
                  <t.icon className="h-3 w-3 text-flame" /> {t.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: inline schedule form */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-flame/20 blur-3xl" aria-hidden />
            <div className="relative">
              <ScheduleInline />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}