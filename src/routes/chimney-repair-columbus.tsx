import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  Star,
  MapPin,
  Wrench,
  Search,
  Sparkles,
  HardHat,
  Droplets,
  Flame,
  Hammer,
  Award,
  Home as HomeIcon,
  Users,
} from "lucide-react";
import { ScheduleInline } from "@/components/ScheduleWidget";
import { TrustBadges } from "@/components/TrustBadges";
import { BeforeAfter } from "@/components/BeforeAfter";
import { BEFORE_AFTER_JOBS } from "@/data/before-after";

export const Route = createFileRoute("/chimney-repair-columbus")({
  head: () => ({
    meta: [
      { title: "Chimney Repair Columbus, OH | Free Inspection | ChimCrew" },
      {
        name: "description",
        content:
          "Chimney repair in Columbus, OH. Free chimney inspections, CSIA-certified technicians, fully insured, written warranty. Same-day service available. Call (614) 683-5763.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Chimney Repair Columbus, OH — Free Inspection" },
      {
        property: "og:description",
        content:
          "Free chimney inspections in Columbus. Certified, insured, written warranty. Book online or call (614) 683-5763.",
      },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/chimney-repair-columbus" }],
  }),
  component: ChimneyRepairColumbus,
});

const SERVICES = [
  { icon: Hammer, label: "Chimney Repair" },
  { icon: Search, label: "Chimney Inspection" },
  { icon: Sparkles, label: "Chimney Sweep" },
  { icon: HardHat, label: "Chimney Crown Repair" },
  { icon: ShieldCheck, label: "Chimney Cap Replacement" },
  { icon: Droplets, label: "Chimney Leak Repair" },
  { icon: Wrench, label: "Chimney Tuckpointing" },
];

const TRUST = [
  { icon: HomeIcon, label: "Family Owned" },
  { icon: Award, label: "Certified Technicians" },
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: CheckCircle2, label: "Written Warranty" },
  { icon: MapPin, label: "Local Ohio Company" },
];

function ChimneyRepairColumbus() {
  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,_oklch(0.24_0.02_250)_0%,_oklch(0.08_0.01_250)_70%)]" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-flame/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 md:px-8 md:py-16 lg:grid-cols-12 lg:items-start lg:py-20">
          {/* Left — headline + trust */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
              Open Today · Same-Day Service Available
            </span>

            <h1 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-[4.25rem]">
              Chimney Repair
              <br />
              <span className="text-flame">Columbus, OH</span>
            </h1>

            <p className="mt-5 max-w-xl text-base font-medium text-primary-foreground/85 md:text-lg">
              Free Chimney Inspections · Certified Technicians · Same-Day Service Available.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/schedule"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
              >
                <CalendarCheck className="h-4 w-4" /> Schedule appointment online
              </Link>
              <a
                href="tel:6146835763"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-white/20 bg-white/[0.04] px-5 font-sans text-[13px] font-medium tracking-normal text-primary-foreground transition hover:border-flame active:scale-95 sm:px-6"
              >
                <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
              </a>
            </div>

            <div className="mt-8">
              <TrustBadges variant="light" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-primary-foreground/80">
              <span className="inline-flex items-center gap-1.5 font-display text-sm font-bold">
                <Star className="h-4 w-4 fill-flame text-flame" /> 5-Star Rated · Verified Reviews
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                CSIA Certified · BBB A+ · Licensed & Insured
              </span>
            </div>
          </div>

          {/* Right — Lead form above the fold */}
          <div id="book" className="lg:col-span-5">
            <div className="rounded-none border-2 border-flame/30 bg-card shadow-[0_30px_80px_-30px_oklch(0_0_0/0.55)]">
              <ScheduleInline />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
              No card · No spam · An Ohio sweep texts you in &lt; 60 minutes
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-b border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
              // Chimney services we deliver
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-5xl">
              Every chimney repair Columbus homes need
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-start gap-3 rounded-none border-2 border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-flame"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-none bg-primary text-flame">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-base font-extrabold text-primary">{s.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/schedule"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
            >
              <CalendarCheck className="h-4 w-4" /> Schedule appointment online
            </Link>
            <a
              href="tel:6146835763"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-primary px-5 font-sans text-[13px] font-medium tracking-normal text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-95 sm:px-6"
            >
              <Phone className="h-4 w-4" /> (614) 683-5763
            </a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Why Ohio picks ChimCrew</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
              Reliable. Local. <span className="text-flame">Accountable.</span>
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            {TRUST.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.label}
                  className="flex flex-col items-center gap-3 rounded-none border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-flame text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-sm font-extrabold uppercase tracking-wide">
                    {t.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER GALLERY */}
      <section className="border-y border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// Columbus jobs</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-5xl">
              Before &amp; After
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Drag the slider on any photo to see the difference our crew makes.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {BEFORE_AFTER_JOBS.slice(0, 4).map((job) => (
              <div key={job.id} className="overflow-hidden rounded-none border-2 border-border bg-card">
                <BeforeAfter before={job.before} after={job.after} alt={job.headline} />
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                    {job.service} · {job.city}
                  </p>
                  <p className="mt-2 font-display text-lg font-extrabold text-primary">{job.headline}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{job.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND LEAD FORM */}
      <section id="book-bottom" className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:px-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">// One quick form</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight md:text-5xl">
              Book your Free Chimney Inspection
            </h2>
            <p className="mt-4 text-base text-primary-foreground/80 md:text-lg">
              A CSIA-certified Columbus tech calls you back the same day with a flat-rate quote in writing — no pressure, no obligation.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:6146835763"
                className="inline-flex items-center justify-center gap-2 rounded-none bg-flame px-6 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_30px_oklch(0.78_0.19_92/0.35)] transition hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" /> Call (614) 683-5763
              </a>
            </div>

            <div className="mt-6">
              <TrustBadges variant="light" />
            </div>

            <div className="mt-6 flex items-center gap-3 text-primary-foreground/80">
              <Users className="h-5 w-5 text-flame" />
              <p className="text-sm">
                <span className="font-display font-extrabold text-flame">482 Columbus homeowners</span> booked this month.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-none border-2 border-flame/30 bg-card shadow-[0_30px_80px_-30px_oklch(0_0_0/0.55)]">
              <ScheduleInline />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-flame py-10 text-primary">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left md:px-8">
          <div className="flex items-center gap-4">
            <Flame className="h-8 w-8" />
            <p className="font-display text-xl font-extrabold md:text-2xl">
              Need Chimney Repair? Book Your Free Inspection Today.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/schedule"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-primary px-5 font-sans text-[13px] font-bold tracking-normal text-primary-foreground shadow-[0_8px_22px_oklch(0.18_0.02_250/0.25)] transition active:scale-95 sm:px-6"
            >
              <CalendarCheck className="h-4 w-4" /> Schedule appointment online
            </Link>
            <a
              href="tel:6146835763"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-primary px-5 font-sans text-[13px] font-medium tracking-normal text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-95 sm:px-6"
            >
              <Phone className="h-4 w-4" /> (614) 683-5763
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}