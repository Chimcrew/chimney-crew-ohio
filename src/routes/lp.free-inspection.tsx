import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  Flame,
  BadgeCheck,
  CalendarCheck,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { reportLeadFormConversion } from "@/lib/track";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ConsentCheckboxes } from "@/components/ConsentCheckboxes";
import { BEFORE_AFTER_JOBS } from "@/data/before-after";
import teamHero from "@/assets/team/chimcrew-team-hero.png.asset.json";
import techFireplace from "@/assets/real/tech-fireplace-sweep-hoodie.png.asset.json";
import techCap from "@/assets/real/tech-chimney-cap-install.jpg.asset.json";
import crownRebuild from "@/assets/real/chimney-crown-rebuild.jpg.asset.json";
import techLiner from "@/assets/real/tech-liner-install.png.asset.json";
import { SiteFooter } from "@/components/SiteFooter";
import { submitLead } from "@/lib/lead-submit";

export const Route = createFileRoute("/lp/free-inspection")({
  head: () => ({
    meta: [
      { title: "Free Chimney Inspection — Columbus, OH | ChimCrew" },
      {
        name: "description",
        content:
          "Free chimney inspection in Columbus, OH. CSIA-certified, same-day callbacks, written report. Limited to this month — call (614) 683-5763 now.",
      },
      { property: "og:title", content: "Free Chimney Inspection — Columbus, OH" },
      {
        property: "og:description",
        content:
          "Free chimney inspection (normally $69). Same-day callbacks. CSIA-certified Ohio sweeps.",
      },
      { property: "og:url", content: "https://chimcrew.com/lp/free-inspection" },
      { property: "og:type", content: "website" },
      // Keep paid-traffic landing pages out of organic index to avoid
      // competing with the homepage and to keep this URL ad-only.
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/lp/free-inspection" }],
  }),
  component: FreeInspectionLanding,
});

const TEL = "tel:6146835763";
const TEL_DISPLAY = "(614) 683-5763";
const SMS =
  "sms:6146835763?&body=Hi%20ChimCrew%2C%20I%27d%20like%20a%20free%20chimney%20inspection.";

function FreeInspectionLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MinimalHeader />
      <Hero />
      <ProofBar />
      <MeetTheCrew />
      <JobsStrip />
      <Includes />
      <RecentJobs />
      <Reviews />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}

function MinimalHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-none bg-flame text-primary">
            <Flame className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight">ChimCrew</span>
        </div>
        <a
          href={TEL}
          className="inline-flex items-center gap-2 rounded-none bg-flame px-3 py-2 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_4px_14px_oklch(0.78_0.19_92/0.45)] sm:px-4 sm:text-base"
          aria-label={`Call ChimCrew at ${TEL_DISPLAY}`}
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">{TEL_DISPLAY}</span>
          <span className="sm:hidden">Call Now</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-primary/[0.04] to-background">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        {/* Left: pitch */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
            <BadgeCheck className="h-3.5 w-3.5" /> Columbus, OH · This Month Only
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Free Chimney Inspection
            <span className="mt-2 inline-block rounded-none bg-primary px-3 py-1 text-2xl text-primary-foreground sm:text-3xl md:text-4xl">
              <span className="opacity-70 line-through decoration-2">$69</span>
              <span className="ml-2">FREE this month</span>
            </span>
          </h1>
          <p className="mt-4 max-w-prose text-base text-foreground/80 sm:text-lg">
            CSIA-certified Ohio sweeps. Same-day callbacks. Written safety report with
            photos — no pressure, no surprise charges.
          </p>

          {/* Primary CTAs */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={TEL}
              className="inline-flex items-center justify-center gap-2 rounded-none bg-flame px-5 py-4 font-display text-base font-extrabold uppercase tracking-wider text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95"
            >
              <Phone className="h-5 w-5" /> Call {TEL_DISPLAY}
            </a>
            <a
              href={SMS}
              className="inline-flex items-center justify-center gap-2 rounded-none border-2 border-foreground/15 bg-background px-5 py-4 font-display text-base font-extrabold uppercase tracking-wider text-foreground transition active:scale-95"
            >
              <MessageSquare className="h-5 w-5" /> Text Us
            </a>
          </div>

          {/* Trust strip */}
          <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground/80 sm:text-sm">
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" /> CSIA-certified
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-500 text-amber-600" /> 5-Star Rated
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" /> Same-day callbacks
            </li>
          </ul>
        </div>

        {/* Right: form */}
        <div className="md:pl-4">
          <InlineLeadForm />
        </div>
      </div>
    </section>
  );
}

function InlineLeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const missing: string[] = [];
    if (name.trim().length < 2) missing.push("your name");
    if (phone.replace(/\D/g, "").length < 7) missing.push("phone number");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) missing.push("valid email");
    if (missing.length) {
      toast.error("Please add: " + missing.join(", "));
      return;
    }
    setSubmitting(true);
    try {
      await submitLead({
        source: "Landing page (/lp/free-inspection)",
        name,
        phone,
        email,
        city: zip,
        service: "Free chimney inspection",
      });
      reportLeadFormConversion();
      setDone(true);
      toast.success("Request received — appointment confirmation email arrives within 10 minutes.");
    } catch {
      toast.error("Something went wrong. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-none border border-border/60 bg-card p-6 text-center shadow-sm">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-flame/15 text-flame">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h2 className="mt-3 font-display text-xl font-extrabold">You're booked in.</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We'll email your appointment confirmation within 10 minutes. Need it sooner?
        </p>
        <a
          href={TEL}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-none bg-flame px-4 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-primary"
        >
          <Phone className="h-4 w-4" /> Call {TEL_DISPLAY}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-none border border-border/60 bg-card p-5 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.25)] sm:p-6"
    >
      <h2 className="font-display text-xl font-extrabold tracking-tight">
        Book your free inspection
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">Takes ~30 seconds.</p>

      <div className="mt-4 grid gap-3">
        <input
          type="text"
          required
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-12 rounded-none border border-foreground/15 bg-background px-4 text-base outline-none focus:border-flame"
          aria-label="Your name"
        />
        <input
          type="tel"
          required
          maxLength={30}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="h-12 rounded-none border border-foreground/15 bg-background px-4 text-base outline-none focus:border-flame"
          aria-label="Phone number"
          inputMode="tel"
        />
        <input
          type="email"
          required
          maxLength={200}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email for confirmation"
          className="h-12 rounded-none border border-foreground/15 bg-background px-4 text-base outline-none focus:border-flame"
          aria-label="Email"
        />
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            maxLength={20}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="ZIP code (optional)"
            className="h-12 w-full rounded-none border border-foreground/15 bg-background pl-9 pr-4 text-base outline-none focus:border-flame"
            aria-label="ZIP code"
            inputMode="numeric"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_6px_18px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 disabled:opacity-70"
        >
          <CalendarCheck className="h-5 w-5" />
          {submitting ? "Sending…" : "Schedule free inspection"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          No spam. Appointment confirmation emailed within 10 minutes.
        </p>
      </div>
    </form>
  );
}

function ProofBar() {
  const items = [
    { icon: ShieldCheck, label: "CSIA-Certified" },
    { icon: Star, label: "5-Star Rated" },
    { icon: Clock, label: "Same-day callbacks" },
    { icon: BadgeCheck, label: "Licensed & Insured" },
  ];
  return (
    <section className="border-b border-border/30 bg-card/40 py-5">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm font-medium text-foreground/85">
        {items.map((it) => (
          <span key={it.label} className="inline-flex items-center gap-1.5">
            <it.icon className="h-4 w-4 text-primary" />
            {it.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function Includes() {
  return _Includes();
}

function MeetTheCrew() {
  return (
    <section className="border-b border-border/30 bg-card/30 py-10 sm:py-14">
      <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 md:grid-cols-[1.1fr_1fr] md:gap-10">
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-none bg-gradient-to-br from-flame/30 to-primary/10 blur-2xl" />
          <img
            src={teamHero.url}
            alt="The ChimCrew family crew standing in front of their yellow van"
            loading="lazy"
            className="w-full rounded-none border-4 border-background object-cover shadow-[0_20px_60px_-20px_oklch(0_0_0/0.45)]"
          />
        </div>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
            <BadgeCheck className="h-3.5 w-3.5" /> Meet your crew
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            Same yellow van.{" "}
            <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
              same family crew
            </span>{" "}
            — every visit.
          </h2>
          <p className="mt-3 text-sm text-foreground/80 sm:text-base">
            We're a CSIA-certified, family-owned Ohio crew. No call centers, no
            subcontractors — just the same friendly faces on your roof and at your
            fireplace.
          </p>
        </div>
      </div>
    </section>
  );
}

function _Includes() {
  const items = [
    "Level 1 visual inspection of your flue, damper & smoke chamber",
    "Exterior crown, cap, flashing & chase check",
    "HD photo report sent to your phone",
    "Flat-rate quote in writing — no surprise charges",
    "Honest call: only fix what actually needs fixing",
  ];
  return (
    <section className="border-b border-border/30 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          What's included in your free inspection
        </h2>
        <ul className="mt-6 grid gap-3">
          {items.map((t) => (
            <li key={t} className="flex items-start gap-3 rounded-none border border-border/50 bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm sm:text-base">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RecentJobs() {
  const jobs = BEFORE_AFTER_JOBS.slice(0, 3);
  return (
    <section className="border-b border-border/30 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Recent Columbus jobs
            </h2>
            <p className="mt-1 text-sm text-foreground/70 sm:text-base">
              Drag the slider — homes, before &amp; after.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {jobs.map((job) => (
            <figure key={job.id} className="flex flex-col">
              <BeforeAfter before={job.before} after={job.after} alt={job.headline} />
              <figcaption className="mt-3">
                <div className="font-display text-sm font-extrabold leading-snug">
                  {job.headline}
                </div>
                <div className="mt-1 text-xs text-foreground/70">
                  {job.service} · {job.city}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const r = [
    {
      name: "Megan T., Dublin",
      text: "Showed up on time, sent photos straight to my phone, and didn't try to upsell. Booked the crown rebuild on the spot.",
    },
    {
      name: "Daniel R., Hilliard",
      text: "Found a cracked crown another company missed twice. Fixed the leak and gave me a written warranty.",
    },
    {
      name: "Priya N., Westerville",
      text: "Same-day callback, fair price, and a photo report. Hard to find this kind of service anymore.",
    },
  ];
  return (
    <section className="border-b border-border/30 bg-card/40 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          What Ohio homeowners say
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {r.map((it) => (
            <figure
              key={it.name}
              className="rounded-none border border-border/50 bg-background p-5 shadow-sm"
            >
              <div className="flex items-center gap-0.5 text-flame">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
                "{it.text}"
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-muted-foreground">
                — {it.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-primary py-12 text-primary-foreground sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Ready when you are — and it's free.
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-sm text-primary-foreground/80 sm:text-base">
          Most Columbus homeowners get their inspection booked within 24 hours.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={TEL}
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-none bg-flame px-5 py-4 font-display text-base font-extrabold uppercase tracking-wider text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] sm:w-auto"
          >
            <Phone className="h-5 w-5" /> Call {TEL_DISPLAY}
          </a>
          <a
            href={SMS}
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-none border-2 border-primary-foreground/30 bg-primary-foreground/5 px-5 py-4 font-display text-base font-extrabold uppercase tracking-wider text-primary-foreground sm:w-auto"
          >
            <MessageSquare className="h-5 w-5" /> Text Us
          </a>
        </div>
      </div>
    </section>
  );
}

function MinimalFooter() {
  return (
    <footer className="border-t border-border/30 py-6 text-center text-xs text-muted-foreground">
      <div className="mx-auto max-w-5xl px-4">
        © {new Date().getFullYear()} ChimCrew · Columbus, OH ·{" "}
        <a href={TEL} className="underline-offset-2 hover:underline">
          {TEL_DISPLAY}
        </a>
      </div>
    </footer>
  );
}

function JobsStrip() {
  const shots = [
    {
      src: techFireplace.url,
      caption: "Fireplace sweep — Columbus, OH",
      tag: "On the job",
    },
    {
      src: techLiner.url,
      caption: "Stainless liner install",
      tag: "Ohio job",
    },
    {
      src: techCap.url,
      caption: "New chimney cap & flashing",
      tag: "On the roof",
    },
    {
      src: crownRebuild.url,
      caption: "Crown rebuild — finished",
      tag: "Completed",
    },
  ];
  return (
    <section className="border-b border-border/30 bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-flame/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-flame">
            <BadgeCheck className="h-3.5 w-3.5" /> Photos, Columbus jobs
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            This is what shows up at your door.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-foreground/70 sm:text-base">
            Branded hoodies, branded tools, branded van — no subcontractors, no surprises.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shots.map((s) => (
            <figure
              key={s.caption}
              className="group relative overflow-hidden rounded-none border border-border/50 bg-card shadow-sm"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={s.src}
                  alt={s.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-2 top-2 rounded-none bg-flame px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow">
                  {s.tag}
                </span>
              </div>
              <figcaption className="px-3 py-2 text-xs font-semibold text-foreground/80">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}