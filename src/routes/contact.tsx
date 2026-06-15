import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock, CalendarCheck, ShieldCheck, Flame, MessageSquare, Star } from "lucide-react";
import { ScheduleInline } from "@/components/ScheduleWidget";
import { TrustBadges } from "@/components/TrustBadges";

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
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-flame/25 blur-3xl" aria-hidden />
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
            Same-day callback · Ohio crew
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Talk to a real <span className="text-flame">Ohio chimney crew</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            Pick the easiest way to reach us. We answer fast, quote in writing, and never sell what you don't need.
          </p>

          {/* Quick-reach tiles */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href="tel:6146835763"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-flame/50 hover:bg-white/10"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flame text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">Call</p>
                <p className="truncate font-display text-base font-bold">(614) 683-5763</p>
              </div>
            </a>
            <a
              href="sms:6146835763"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-flame/50 hover:bg-white/10"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flame text-primary">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">Text</p>
                <p className="truncate font-display text-base font-bold">Reply in &lt; 15 min</p>
              </div>
            </a>
            <a
              href="mailto:office@chimcrew.com"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-flame/50 hover:bg-white/10"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flame text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">Email</p>
                <p className="truncate font-display text-base font-bold">office@chimcrew.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* Scheduler */}
          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                  Book online · Takes 60 seconds
                </p>
                <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-primary md:text-3xl">
                  Schedule an appointment online
                </h2>
              </div>
            </div>
            <ScheduleInline />
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-black uppercase tracking-wide text-primary">
                Hours
              </h3>
              <div className="mt-3 space-y-2 text-sm text-primary/80">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-flame" /> Sun – Fri</span>
                  <span className="font-mono font-semibold">7a – 7p</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5 opacity-50" /> Saturday</span>
                  <span className="font-mono">Closed</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-black uppercase tracking-wide text-primary">
                Why homeowners call us
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-primary/80">
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-flame" /> CSIA-certified, fully insured</li>
                <li className="flex items-start gap-2"><CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-flame" /> Flat-rate quotes in writing</li>
                <li className="flex items-start gap-2"><Flame className="mt-0.5 h-4 w-4 shrink-0 text-flame" /> Free drone inspection w/ every quote</li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-[oklch(0.22_0.04_250)] p-5 text-primary-foreground">
              <div className="flex items-center gap-1 text-flame">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-flame" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
                "Showed up on time, walked me through everything with their drone footage, and the price didn't budge."
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                — Megan R., Westerville
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}