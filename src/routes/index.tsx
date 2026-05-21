import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Flame, ShieldCheck, Clock, Star, ChevronRight, Wind, Hammer, Search, Bird } from "lucide-react";
import truck from "@/assets/chimcrew-truck.png";
import sweep from "@/assets/sweep-rooftop.jpg";
import fireplace from "@/assets/fireplace-cozy.jpg";
import beforeImg from "@/assets/before-chimney.jpg";
import afterImg from "@/assets/after-chimney.jpg";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChimCrew — Chimney Sweep in Columbus, Cincinnati & Dayton" },
      { name: "description", content: "Local Ohio chimney sweeps. Sweeps, inspections, liners, caps & repairs in Columbus, Cincinnati and Dayton. Same-day callback." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <BeforeAfterTeaser />
      <Process />
      <LeadForm />
      <ReviewsTeaser />
    </>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const p = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
      setScroll(p);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 3D-ish drive-in: starts off-screen left, tilts, rolls into hero, then floats
  const x = -60 + scroll * 90;          // %
  const rotY = 18 - scroll * 28;        // deg
  const rotZ = -2 + scroll * 4;
  const scale = 0.9 + scroll * 0.2;

  return (
    <section ref={heroRef} className="relative overflow-hidden border-b-2 border-primary/30">
      {/* Background */}
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      {/* Flame glow */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
           style={{ background: "radial-gradient(closest-side, oklch(0.7 0.22 45 / 0.7), transparent 70%)" }} />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 md:px-8 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pb-24">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
            <Flame className="h-3.5 w-3.5" /> Columbus · Cincinnati · Dayton
          </p>
          <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95]">
            Ohio's <span className="text-flame">fired-up</span><br />
            chimney crew.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Sweeps, inspections, liners and repairs done by a real local crew
            that shows up, suits up, and gets your flue back in fighting shape.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#quote"
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-4 font-display text-sm uppercase tracking-widest text-primary-foreground transition hover:brightness-110"
            >
              Get my free quote
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="tel:5551234567"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-primary/50 px-6 py-4 font-display text-sm uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Call 555-123-4567
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> CSIA Certified</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Same-day callback</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> 4.9★ on Google</span>
          </div>
        </div>

        {/* The truck — animated in 3D as user enters page */}
        <div className="relative h-[320px] md:h-[460px] lg:h-[560px]" style={{ perspective: "1400px" }}>
          {/* tire smoke */}
          <div className="pointer-events-none absolute bottom-8 left-1/4 h-16 w-40">
            <span className="absolute inset-0 rounded-full bg-foreground/10 blur-2xl animate-smoke" />
            <span className="absolute inset-0 rounded-full bg-foreground/10 blur-2xl animate-smoke" style={{ animationDelay: "1.2s" }} />
          </div>
          <img
            src={truck}
            alt="ChimCrew branded pickup truck with flame wrap"
            className="absolute left-1/2 top-1/2 w-[110%] max-w-none drop-shadow-[0_40px_50px_oklch(0.7_0.22_45/0.4)]"
            style={{
              transform: `translate(-50%, -50%) translateX(${x}%) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
              transition: "transform 80ms linear",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
      </div>

      {/* warning stripe at bottom */}
      <div className="stripe-warning h-2 w-full opacity-90" />
    </section>
  );
}

function TrustStrip() {
  const items = [
    "12+ Years in Ohio",
    "2,400+ Flues Cleaned",
    "Flat-Rate Pricing",
    "Fully Insured",
    "Local & Family-Owned",
  ];
  return (
    <div className="border-b border-primary/20 bg-card/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 md:px-8">
        {items.map((t) => (
          <span key={t} className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            ◆ {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  { icon: Wind,   title: "Chimney Sweep",       desc: "Full creosote and soot removal with HEPA containment. No mess in the living room — guaranteed." },
  { icon: Search, title: "Inspections",          desc: "CSIA Level 1, 2, and 3 inspections with a written report and photos from inside the flue." },
  { icon: Hammer, title: "Repairs & Rebuilds",   desc: "Crown rebuilds, tuckpointing, flashing, caps, dampers — anything that's failing, we fix it." },
  { icon: Flame,  title: "Liners & Installs",    desc: "Stainless steel liner installs sized to your appliance. Safer burns, better draft, longer life." },
  { icon: Bird,   title: "Animal Removal",       desc: "Birds, raccoons, squirrels — humane removal and full-cap installation so they don't come back." },
  { icon: ShieldCheck, title: "Safety Service Plans", desc: "Annual maintenance plans that keep your insurance happy and your family safe." },
];

function Services() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">// Services</p>
            <h2 className="mt-3 text-5xl md:text-6xl">Everything above the firebox.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            One crew, one truck, every service — from a quick sweep to a full
            rebuild of your chimney crown.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-sm border-2 border-border bg-card p-6 transition hover:border-primary hover:shadow-flame"
            >
              <div className="grid h-12 w-12 place-items-center rounded-sm bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterTeaser() {
  return (
    <section className="relative overflow-hidden bg-card/40 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// Before / After</p>
          <h2 className="mt-3 text-5xl md:text-6xl">From soot-caked to spotless.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Every job ends with a photo handover so you can see exactly what we
            cleaned, repaired, or replaced. Receipts, not promises.
          </p>
          <Link
            to="/before-after"
            className="mt-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-primary hover:underline"
          >
            See the full gallery <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          <figure className="relative overflow-hidden rounded-sm border-2 border-border">
            <img src={beforeImg} alt="Soot-caked chimney before" className="aspect-[3/4] w-full object-cover" loading="lazy" />
            <figcaption className="absolute left-3 top-3 rounded-sm bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest">Before</figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-sm border-2 border-primary">
            <img src={afterImg} alt="Cleaned chimney after" className="aspect-[3/4] w-full object-cover" loading="lazy" />
            <figcaption className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">After</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Tell us what's up", desc: "60-second quote form — service, city, contact. That's it." },
  { n: "02", title: "Same-day callback", desc: "A real ChimCrew tech calls you back, flat-rate pricing up front." },
  { n: "03", title: "We roll out", desc: "The crew arrives in the yellow truck, drop cloths down, work begins." },
  { n: "04", title: "Photo handover", desc: "Before & after photos, written report, warranty — all in your inbox." },
];

function Process() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">// How it works</p>
        <h2 className="mt-3 text-5xl md:text-6xl">Four steps. One yellow truck.</h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border-2 border-border bg-border md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-card p-6 transition hover:bg-card/60">
              <p className="font-display text-5xl text-primary">{s.n}</p>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <img src={sweep} alt="ChimCrew technician on a rooftop" className="h-72 w-full rounded-sm border-2 border-border object-cover lg:h-96" loading="lazy" />
          <img src={fireplace} alt="Cozy fireplace after service" className="h-72 w-full rounded-sm border-2 border-border object-cover lg:h-96" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Marcus T.", city: "Columbus, OH", text: "Booked online Monday, swept Tuesday. Crew was sharp, the truck was wild, and the price didn't change at the door. Best service call I've had all year." },
  { name: "Priya R.",  city: "Cincinnati, OH", text: "Found a cracked crown on a Level 2 inspection. They sent photos, quoted flat-rate, fixed it the next week. Very honest crew." },
  { name: "Sam & Jess", city: "Dayton, OH",    text: "Raccoons in the flue. ChimCrew got them out humanely, installed a cap, and we haven't had a problem since. Highly recommend." },
];

function ReviewsTeaser() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">// Word on the street</p>
            <h2 className="mt-3 text-5xl md:text-6xl">Neighbors talk.</h2>
          </div>
          <Link to="/reviews" className="hidden font-display text-sm uppercase tracking-widest text-primary hover:underline md:inline">All reviews →</Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="flex flex-col rounded-sm border-2 border-border bg-card p-6">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-sm text-foreground/90">"{r.text}"</blockquote>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {r.name} · {r.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
