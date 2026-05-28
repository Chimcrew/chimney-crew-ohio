import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Phone,
  CalendarCheck,
  Wrench,
  Search,
  Sparkles,
  ShieldCheck,
  Flame,
  Star,
  ChevronRight,
  MapPin,
  ArrowRight,
  Droplets,
  AlertTriangle,
  Wind,
  Home as HomeIcon,
  Clock,
  ThumbsUp,
  Award,
  HardHat,
} from "lucide-react";
import logo from "@/assets/chimcrew-logo.png";
import van from "@/assets/chimcrew-van.png";
import sweep from "@/assets/sweep-rooftop.jpg";
import fireplace from "@/assets/fireplace-cozy.jpg";
import beforeImg from "@/assets/before-chimney.jpg";
import afterImg from "@/assets/after-chimney.jpg";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChimCrew — Ohio's Local Chimney Crew | Sweep, Repair & Inspection" },
      {
        name: "description",
        content:
          "Locally-owned Ohio chimney experts. Prevent fire hazards, fix leaks, sweep flues — Columbus, Cincinnati & Dayton. Schedule online in 60 seconds.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <FireHazards />
      <ServicesGrid />
      <LeakingChimney />
      <ScheduleOnline />
      <Process />
      <Testimonials />
      <Faq />
      <FinalCta />
      <LeadForm />
    </>
  );
}

/* ============================================================
   HERO  — image LEFT, message RIGHT (as originally requested)
   ============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background atmospherics */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_oklch(0.24_0.02_250)_0%,_oklch(0.08_0.01_250)_70%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-flame/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-flame/10 blur-3xl" aria-hidden />

      {/* Floating ember sparks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1.5 w-1.5 rounded-full bg-flame/70 animate-ember"
            style={{
              left: `${(i * 7.3) % 100}%`,
              bottom: `-${(i % 4) * 12}px`,
              animationDelay: `${(i * 0.7) % 6}s`,
              ['--drift' as any]: `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 6)}px`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — layered polaroid stack: van tilted behind, crest in front */}
          <div className="relative reveal lg:col-span-5" style={{ animationDelay: "0.05s" }}>
            <div className="relative mx-auto aspect-[5/6] w-full max-w-md">
              {/* Ambient glow */}
              <div className="absolute inset-6 rounded-full bg-flame/20 blur-3xl" aria-hidden />

              {/* Van — tilted polaroid in the back */}
              <div className="group absolute -bottom-2 -right-2 w-[78%] -rotate-6 transition-transform duration-500 hover:-rotate-3 sm:-right-6">
                <div className="overflow-hidden rounded-sm border border-white/10 bg-white p-2 pb-10 shadow-[0_20px_50px_oklch(0_0_0/0.6)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[oklch(0.10_0.01_250)]">
                    <img
                      src={van}
                      alt="ChimCrew Ohio service van"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 animate-shine" />
                  </div>
                  <p className="mt-2 px-1 font-mono text-[9px] uppercase tracking-[0.22em] text-primary/80">
                    ◆ Spot the yellow van · Ohio plates
                  </p>
                </div>
                {/* Pulse flame badge clipped on the polaroid corner */}
                <span className="absolute -left-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-flame text-primary shadow-flame">
                  <span className="absolute inset-0 rounded-full animate-pulse-ring" />
                  <Flame className="h-4 w-4" />
                </span>
              </div>

              {/* Crest — front card, slight opposite tilt */}
              <div className="group absolute left-0 top-0 w-[80%] rotate-2 transition-transform duration-500 hover:rotate-0">
                {/* Brand tape pinning it to the stack */}
                <div className="absolute -top-3 left-1/2 z-20 h-6 w-24 -translate-x-1/2 -rotate-3 bg-flame/85 shadow-md ring-1 ring-flame/30 backdrop-blur">
                  <span className="flex h-full items-center justify-center font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-primary">
                    ChimCrew · OH
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-2xl border-2 border-flame/30 bg-[oklch(0.13_0.01_250)] p-4 shadow-2xl md:p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                      Est. 1975 // Ohio
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                      <Star className="h-3 w-3 fill-flame text-flame" /> 1,836
                    </span>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-xl border border-white/5 bg-[oklch(0.10_0.01_250)] p-2">
                    <img
                      src={logo}
                      alt="ChimCrew — Your safety, our priority"
                      className="relative z-10 mx-auto w-full max-w-[260px] animate-float"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-1 w-10 bg-flame" />
                    <div className="h-1 w-3 bg-white/10" />
                    <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.22em] text-primary-foreground/60">
                      Precision sweeps & safety
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — headline + chips */}
          <div className="space-y-8 reveal lg:col-span-7" style={{ animationDelay: "0.15s" }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-flame/30 bg-flame/10 px-3 py-1.5">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-flame" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                Columbus · Cincinnati · Dayton
              </span>
            </div>

            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-primary-foreground md:text-7xl">
              Ohio's elite
              <br />
              <span className="bg-gradient-to-r from-flame via-[oklch(0.94_0.16_92)] to-white bg-clip-text text-transparent">
                chimney force.
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
              Protecting Ohio homes from creosote fires, CO leaks and water damage —
              with high-definition camera inspections and hi-vis reliability.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-flame px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_30px_oklch(0.78_0.19_92/0.25)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                <CalendarCheck className="h-4 w-4" /> Schedule Online
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <a
                href="tel:5551234567"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/10 bg-primary/60 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:border-flame"
              >
                <Phone className="h-4 w-4" /> Call 555-123-4567
              </a>
            </div>

            {/* Hazard micro-chips */}
            <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
              {[
                {
                  tag: "Creosote Hazard",
                  body: "Flue-fire prevention experts.",
                  Icon: Flame,
                  tone: "text-destructive",
                  bg: "bg-destructive/10 border-destructive/30",
                },
                {
                  tag: "Leak Detection",
                  body: "Zero-tolerance water sealing.",
                  Icon: Droplets,
                  tone: "text-[oklch(0.7_0.15_230)]",
                  bg: "bg-[oklch(0.7_0.15_230/0.1)] border-[oklch(0.7_0.15_230/0.3)]",
                },
              ].map((h) => (
                <div key={h.tag} className="group flex items-start gap-3">
                  <div className={`mt-0.5 grid h-9 w-9 place-items-center rounded-lg border ${h.bg} transition group-hover:scale-105`}>
                    <h.Icon className={`h-4 w-4 ${h.tone}`} />
                  </div>
                  <div>
                    <p className={`font-display text-xs font-extrabold uppercase tracking-wider ${h.tone}`}>
                      {h.tag}
                    </p>
                    <p className="text-sm text-primary-foreground/60">{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live status bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-white/10 bg-primary/40 p-6 backdrop-blur md:flex-row">
          <div className="flex items-center gap-5">
            <div className="flex -space-x-2">
              {["#fbbf24", "#a3a3a3", "#525252"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-primary text-[10px] font-bold text-primary"
                  style={{ background: c }}
                >
                  {["M", "D", "P"][i]}
                </span>
              ))}
            </div>
            <p className="text-sm text-primary-foreground/70">
              <span className="font-display font-extrabold text-primary-foreground">482 Ohio homes</span> protected this month.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/50">
              System status: ready
            </span>
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/4 rounded-full bg-flame" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TRUST MARQUEE
   ============================================================ */
function TrustMarquee() {
  const items = [
    "CSIA Certified",
    "BBB A+ Rated",
    "Licensed in Ohio",
    "Fully Insured",
    "Family-Owned Since 1975",
    "1,836 ★★★★★ Reviews",
    "Same-Day Callback",
    "24/7 Emergency Service",
  ];
  const loop = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/60 py-5">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap px-6 font-mono text-xs uppercase tracking-[0.25em] text-foreground/80">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            <Flame className="h-3.5 w-3.5 text-flame" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   FIRE HAZARDS — risk education
   ============================================================ */
function FireHazards() {
  const hazards = [
    {
      icon: Flame,
      title: "Creosote build-up",
      body:
        "A 1/8\" layer of creosote can ignite at 451°F and burn at 2,000°F — hot enough to crack flue tiles and torch your roof.",
      stat: "#1 cause of chimney fires",
    },
    {
      icon: Wind,
      title: "Carbon monoxide leaks",
      body:
        "Blocked or cracked flues push CO back into your living room. It's odorless, colorless, and kills 400+ Americans every year.",
      stat: "Invisible · Odorless · Deadly",
    },
    {
      icon: AlertTriangle,
      title: "Animal & debris blockage",
      body:
        "Birds, squirrels and leaves nest in uncapped flues, trapping smoke and embers right above your fireplace.",
      stat: "Common in Ohio fall & spring",
    },
    {
      icon: HomeIcon,
      title: "Damaged crown & cap",
      body:
        "Ohio freeze-thaw cycles crack mortar crowns. One season untreated and water reaches the firebox.",
      stat: "Worst after winter",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" /> Why it matters
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
            Four reasons a neglected chimney is dangerous.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Every year the U.S. logs 25,000+ chimney fires causing $125M in damage.
            We sweep, inspect and seal so your fireplace stays the warmest spot in the
            house — not the most dangerous one.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hazards.map(({ icon: Icon, title, body, stat }, i) => (
            <article
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-flame hover:shadow-flame"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-flame/10 blur-2xl transition group-hover:bg-flame/30" />
              <div className="relative grid h-12 w-12 place-items-center rounded-lg bg-primary text-flame ring-1 ring-flame/40">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-primary">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{body}</p>
              <p className="mt-4 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                {stat}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES GRID — with before/after
   ============================================================ */
function ServicesGrid() {
  const items = [
    {
      icon: Sparkles,
      title: "Chimney Sweep",
      body: "Full creosote and soot removal with HEPA vacuums — no mess in the living room.",
    },
    {
      icon: Search,
      title: "Camera Inspection",
      body: "Level 1 & 2 inspections with high-res video so you see exactly what we see.",
    },
    {
      icon: Wrench,
      title: "Repair & Tuckpointing",
      body: "Crown rebuilds, flue relining, masonry restoration — built for Ohio winters.",
    },
    {
      icon: ShieldCheck,
      title: "Waterproof & Cap",
      body: "Stainless caps and crown coatings stop leaks and animals at the source.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              <HardHat className="h-3.5 w-3.5 text-flame" /> Our services
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
              Built to last an Ohio winter.
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              Four core services. Real before/after work from local jobs in your zip code.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-primary px-4 py-2.5 font-display text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }, idx) => (
            <article
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:border-flame hover:shadow-flame"
            >
              <div className="relative grid grid-cols-2 overflow-hidden">
                <div className="relative">
                  <img src={beforeImg} alt={`${title} before`} className="aspect-square h-full w-full object-cover transition group-hover:scale-105" />
                  <span className="absolute left-2 top-2 rounded-full bg-primary/85 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary-foreground backdrop-blur">
                    Before
                  </span>
                </div>
                <div className="relative">
                  <img src={afterImg} alt={`${title} after`} className="aspect-square h-full w-full object-cover transition group-hover:scale-105" />
                  <span className="absolute right-2 top-2 rounded-full bg-flame px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary backdrop-blur">
                    After
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-flame/80 shadow-[0_0_12px_oklch(0.78_0.19_92/0.6)]" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-flame bg-primary text-flame">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-flame ring-1 ring-flame/40">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    0{idx + 1} / 04
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{body}</p>
                <Link
                  to="/services"
                  className="mt-5 inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-primary transition group-hover:text-flame"
                >
                  Local pricing <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LEAKING CHIMNEY — split feature
   ============================================================ */
function LeakingChimney() {
  const signs = [
    "Water stains on the ceiling near the chimney",
    "White efflorescence on the exterior brick",
    "Rust on the damper or firebox",
    "Musty smell after rain",
    "Crumbling crown or missing cap",
    "Damaged flashing where chimney meets roof",
  ];
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:grid-cols-2 md:px-8">
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 shadow-flame">
            <img
              src={sweep}
              alt="Chimney inspection on an Ohio rooftop"
              className="block w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-flame backdrop-blur">
              <Droplets className="h-3 w-3" /> Leak diagnosis
            </div>
          </div>
          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-4 hidden rounded-xl border-2 border-flame bg-primary p-4 text-primary-foreground shadow-flame md:block">
            <p className="font-display text-3xl text-flame">93%</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em]">
              of chimney leaks<br />stop with one repair
            </p>
          </div>
        </div>

        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Droplets className="h-3.5 w-3.5 text-flame" /> Is your chimney leaking?
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
            Water is the silent killer of Ohio chimneys.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            One bad winter is enough. Freeze-thaw cycles widen hairline cracks until
            water reaches the firebox, the walls, and the ceiling below. We diagnose
            the source, seal it for good, and back the work with a written warranty.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {signs.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 rounded-sm border border-border bg-card p-3 text-sm text-foreground"
              >
                <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-display text-sm font-semibold text-primary-foreground transition hover:bg-flame hover:text-primary"
            >
              Book a leak inspection <CalendarCheck className="h-4 w-4" />
            </Link>
            <a
              href="tel:5551234567"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-primary px-5 py-3 font-display text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" /> Talk to a sweep
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SCHEDULE ONLINE — big CTA card
   ============================================================ */
function ScheduleOnline() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,_oklch(0.24_0.02_250)_0%,_oklch(0.08_0.01_250)_70%)]" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-flame/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-10 rounded-3xl border border-flame/30 bg-primary/40 p-8 backdrop-blur md:grid-cols-[1.2fr_1fr] md:p-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
              <CalendarCheck className="h-3.5 w-3.5" /> 60-second booking
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-wider md:text-5xl">
              Schedule online — <span className="text-flame">we'll do the rest.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-primary-foreground/80">
              Pick a 2-hour window. We confirm by text within the hour and a local
              ChimCrew van rolls up on time, in uniform, with shoe covers and tarps.
            </p>

            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Choose service", "Sweep, inspect, repair"],
                ["02", "Pick a window", "Same-day if open"],
                ["03", "We arrive on time", "Or we discount the bill"],
              ].map(([n, t, s]) => (
                <li key={n} className="rounded-sm border border-flame/20 bg-primary/60 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                    Step {n}
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold">{t}</p>
                  <p className="mt-1 text-xs text-primary-foreground/70">{s}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-flame px-6 py-4 font-display text-base font-semibold text-primary shadow-flame transition hover:brightness-110"
              >
                <CalendarCheck className="h-5 w-5" /> Book my appointment
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <a
                href="tel:5551234567"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-flame/70 px-6 py-4 font-display text-base font-semibold text-flame transition hover:bg-flame hover:text-primary"
              >
                <Phone className="h-5 w-5" /> 555-123-4567
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border-2 border-flame/40 shadow-flame">
              <img src={fireplace} alt="Cozy fireplace serviced by ChimCrew" className="block w-full" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                  Limited-time
                </p>
                <p className="font-display text-2xl font-bold text-primary-foreground">
                  $69 chimney inspection
                </p>
                <p className="mt-1 text-xs text-primary-foreground/80">
                  New Ohio customers only · expires 11/30
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROCESS — vertical timeline
   ============================================================ */
function Process() {
  const steps = [
    { icon: Phone, title: "Call or book online", body: "Tell us your address, fireplace type and the issue." },
    { icon: CalendarCheck, title: "Pick a 2-hour window", body: "Same-day slots open most weekdays." },
    { icon: Search, title: "On-site assessment", body: "Camera inspection + written report before any work starts." },
    { icon: Wrench, title: "Clean, repair, restore", body: "We finish the job in one visit when possible." },
  ];
  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Clock className="h-3.5 w-3.5 text-flame" /> How it works
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
            Four steps. No surprises.
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent md:block" />
          {steps.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="relative">
              <div className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-flame bg-background text-primary shadow-flame">
                <Icon className="h-5 w-5" />
                <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-flame font-mono text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-primary">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function Testimonials() {
  const reviews = [
    {
      quote:
        "They showed up in the window they promised, laid tarps everywhere, and walked me through the camera footage. Felt like having a friend on the roof.",
      name: "Megan R.",
      city: "Worthington, OH",
    },
    {
      quote:
        "Found a cracked crown another company missed twice. Sealed it, fixed the leak, and gave me a written warranty. Wish I'd called them first.",
      name: "David K.",
      city: "Hyde Park, Cincinnati",
    },
    {
      quote:
        "Cleanest sweep I've ever had — no soot in the living room, polite crew, and the fire draws perfectly now. Worth every penny.",
      name: "Priya S.",
      city: "Oakwood, Dayton",
    },
  ];
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              <Star className="h-3.5 w-3.5 text-flame" /> Reviews
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
              Real Ohio neighbors. Real fires.
            </h2>
          </div>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-primary hover:text-flame"
          >
            All reviews <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-flame hover:shadow-flame"
            >
              <div className="flex text-flame">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-display text-sm font-semibold text-primary">
                  {r.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {r.city}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ — native details for animation
   ============================================================ */
function Faq() {
  const faqs = [
    {
      q: "How often should I sweep my chimney?",
      a: "The CSIA recommends an annual inspection and a sweep whenever creosote reaches 1/8\". For most Ohio homes that burn wood weekly, that's once a year.",
    },
    {
      q: "Do you service gas fireplaces too?",
      a: "Yes — we sweep, inspect and repair wood, gas and pellet systems, including inserts and zero-clearance units.",
    },
    {
      q: "How long does a sweep take?",
      a: "A standard sweep and Level 1 inspection takes 45–90 minutes. Repairs are quoted on the spot in a written estimate.",
    },
    {
      q: "What does it cost?",
      a: "Our new-customer inspection is $69. Sweeps start at $179 and most repairs are completed under $600. Honest, flat-rate pricing — no hidden fees.",
    },
    {
      q: "Are you really local?",
      a: "Born and raised in Ohio. Our crew lives in Columbus, Cincinnati and Dayton — same neighborhoods we service.",
    },
  ];
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[1fr_1.4fr] md:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
            Answers from the crew.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Still wondering? Call us — we answer the phone and the questions don't cost a dime.
          </p>
          <a
            href="tel:5551234567"
            className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-primary hover:text-flame"
          >
            <Phone className="h-4 w-4" /> 555-123-4567
          </a>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border bg-card p-5 transition open:border-flame open:shadow-flame"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-display text-base font-semibold text-primary">
                  {f.q}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-primary transition group-open:rotate-45 group-open:border-flame group-open:text-flame">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA strip
   ============================================================ */
function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-flame py-12 text-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center md:flex-row md:text-left md:px-8">
        <div className="flex items-center gap-4">
          <Flame className="h-10 w-10" />
          <div>
            <p className="font-display text-2xl font-bold md:text-3xl">
              Ready for a safer fireplace?
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
              Same-day callback · 24/7 emergency
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Schedule Online <CalendarCheck className="h-4 w-4" />
          </Link>
          <a
            href="tel:5551234567"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-primary px-6 py-3 font-display text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> 555-123-4567
          </a>
        </div>
      </div>
    </section>
  );
}