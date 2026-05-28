import { useState } from "react";
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
import sweep from "@/assets/leak-chimney-rooftop.jpg";
import fireplace from "@/assets/fireplace-cozy.jpg";
import beforeImg from "@/assets/before-chimney.jpg";
import afterImg from "@/assets/after-chimney.jpg";
import crownBefore from "@/assets/crown-before.jpg";
import crownAfter from "@/assets/crown-after.jpg";
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
      <LogoDivider />
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

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-8 md:py-28">
        {/* ---------- TOP HERO ---------- */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* LEFT — message */}
          <div className="reveal order-2 space-y-7 lg:order-none lg:col-span-7" style={{ animationDelay: "0.05s" }}>
            {/* Trust eyebrow */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-flame" />
                Serving Ohio since 1975
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/80">
                <Star className="h-3 w-3 fill-flame text-flame" /> 4.9 · 1,836 reviews
              </span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-primary-foreground sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem]">
              Ohio Chimney Sweep
              <br />
              <span className="bg-gradient-to-r from-flame via-[oklch(0.94_0.16_92)] to-white bg-clip-text text-transparent">
                &amp; Repair, Done Right.
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
              Same-day sweeps, HD camera inspections, leak repair and crown rebuilds —
              flat-rate pricing, photos with every job, and a written warranty you can hand
              to the next owner.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-flame px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_30px_oklch(0.78_0.19_92/0.25)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                <CalendarCheck className="h-4 w-4" /> Get my free quote
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <a
                href="tel:5551234567"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/10 bg-primary/60 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:border-flame"
              >
                <Phone className="h-4 w-4" /> Talk to a sweep
              </a>
            </div>

            {/* Inline trust row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-primary-foreground/65">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-flame" /> CSIA Certified</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-flame" /> BBB A+ Rated</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-flame" /> Licensed &amp; Insured</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-flame" /> Same-Day Callback</span>
            </div>
          </div>

          {/* RIGHT — one strong visual */}
          <div className="reveal order-1 lg:order-none lg:col-span-5" style={{ animationDelay: "0.15s" }}>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
              {/* glow */}
              <div className="absolute -inset-6 rounded-[2rem] bg-flame/20 blur-3xl" aria-hidden />

              {/* Main visual card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.12_0.01_250)] shadow-[0_30px_80px_oklch(0_0_0/0.55)]">
                {/* top meta strip */}
                <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                    ChimCrew · The Yellow Van
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/55">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" /> Online now
                  </span>
                </div>

                {/* hero image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.01_250)] to-[oklch(0.06_0.01_250)]">
                  {/* subtle backdrop accents */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-flame/25 blur-3xl" />
                  <div className="pointer-events-none absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-flame/10 blur-3xl" />
                  <div className="pointer-events-none absolute inset-0 animate-shine" />

                  {/* The van — clean, centered, hero */}
                  <img
                    src={van}
                    alt="ChimCrew yellow chimney sweep van — Ohio"
                    className="absolute inset-x-0 bottom-[14%] mx-auto w-[92%] animate-float object-contain drop-shadow-[0_25px_35px_oklch(0_0_0/0.55)]"
                  />

                  {/* Floating "Same-day" pill */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-flame/30 bg-primary/85 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame backdrop-blur">
                    <Clock className="h-3 w-3" /> Same-day slots open
                  </div>

                  {/* Caption pill bottom */}
                  <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-primary/80 px-3 py-2 text-center backdrop-blur">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                      ◆ The yellow van you'll spot in the driveway
                    </p>
                  </div>
                </div>

                {/* bottom row */}
                <div className="flex items-center justify-between gap-3 border-t border-white/5 px-5 py-3">
                  <div className="flex items-center gap-2 text-primary-foreground/70">
                    <Flame className="h-4 w-4 text-flame" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Safety · Sweeps · Repairs</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/55">
                    OH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- City strip (kept) ---------- */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-flame/30 bg-flame/10 px-4 py-2">
            <MapPin className="h-3.5 w-3.5 text-flame" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              Columbus · Cincinnati · Dayton · all of Central Ohio
            </span>
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
              <span className="font-display font-extrabold text-primary-foreground">482 Ohio neighbors</span> trusted us this month — your spot opens next.
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
   LOGO DIVIDER — branded section break
   ============================================================ */
function LogoDivider() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.22_0.02_250)_0%,_oklch(0.06_0.01_250)_70%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center md:px-8">
        <div className="flex items-center gap-6">
          <span className="hidden h-px w-24 bg-gradient-to-r from-transparent to-flame/60 md:block" />
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-flame/20 blur-2xl" aria-hidden />
            <img
              src={logo}
              alt="ChimCrew — Ohio's chimney crew"
              className="relative h-28 w-28 animate-float md:h-36 md:w-36"
            />
          </div>
          <span className="hidden h-px w-24 bg-gradient-to-l from-transparent to-flame/60 md:block" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-flame">
          One crew · One promise · All of Ohio
        </p>
        <h2 className="max-w-2xl font-display text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] text-primary-foreground md:text-4xl">
          Same yellow van.{" "}
          <span className="text-flame">Same family crew.</span>{" "}
          <span className="text-primary-foreground/70">Every visit.</span>
        </h2>
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
            What your chimney is hiding right now.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            25,000+ chimney fires hit U.S. homes every year — most start invisible.
            Two minutes here could save your roof, your air, and a $40,000 insurance fight.
            Here's what we look for on every Ohio rooftop we climb.
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
  const services = [
    {
      icon: Sparkles,
      title: "Chimney Sweep",
      tag: "Most booked",
      priceFrom: "$189",
      duration: "60–90 min",
      headline: "We pull years of creosote out — without a speck of soot in your living room.",
      body: "Drop cloths corner to corner, HEPA-vacuum sealed at the firebox, every soot line wiped down before we leave. You get a written safety summary and a side-by-side photo.",
      includes: ["HEPA-contained sweep", "Smoke chamber & damper", "Photo safety report", "Free Level 1 visual check"],
    },
    {
      icon: Search,
      title: "Camera Inspection",
      tag: "For home sales",
      priceFrom: "$129",
      duration: "45–60 min",
      headline: "See what's hiding inside your flue — on a tablet, in plain English.",
      body: "Level 1 & Level 2 inspections with a high-res chimney camera. You watch the footage with us, we mark every crack and recommend only what your home actually needs.",
      includes: ["Full-flue HD camera scan", "Written PDF report", "Real-estate compliant", "No upsell — promise"],
    },
    {
      icon: Wrench,
      title: "Repair & Tuckpoint",
      tag: "Built for OH winters",
      priceFrom: "$650",
      duration: "1–2 days",
      headline: "Crowns, mortar, liners — rebuilt to outlast another decade of freeze-thaw.",
      body: "We rebuild crowns with stainless reinforcement, repoint with weather-rated mortar, and reline with insulated stainless. Every job ships with a 5-year written workmanship warranty.",
      includes: ["Stainless-reinforced crowns", "Weather-rated mortar", "Insulated stainless liners", "5-year workmanship warranty"],
    },
    {
      icon: ShieldCheck,
      title: "Waterproof & Cap",
      tag: "Stops leaks for good",
      priceFrom: "$349",
      duration: "Same day",
      headline: "Seal the chimney once. Keep rain, snow and wildlife out for years.",
      body: "Vapor-permeable waterproofing on the masonry, stainless cap sized to your flue, flashing checked and resealed. We back it with a transferable leak warranty.",
      includes: ["Stainless steel cap install", "Vapor-permeable seal", "Flashing inspection & touch-up", "Transferable leak warranty"],
    },
    {
      icon: HardHat,
      title: "Crown Seal Repair",
      tag: "Stops cracks for good",
      priceFrom: "$489",
      duration: "Same day",
      headline: "Cracked, crumbling crown? We rebuild and seal it so water can't sneak in again.",
      body: "We grind out the failed mortar, rebuild the wash with a stainless-reinforced overlay, and finish with a flexible elastomeric seal that flexes through every Ohio freeze-thaw. Real before/after photos with every job.",
      includes: ["Crack-bridging elastomeric seal", "Stainless-reinforced overlay", "10-year crown warranty", "Before/after photo report"],
      beforeImg: crownBefore,
      afterImg: crownAfter,
      beforeLabel: "Cracked & failing",
      afterLabel: "Rebuilt & sealed",
    },
  ];
  const [active, setActive] = useState(0);
  const s = services[active] ?? services[0];
  const Icon = s.icon;
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              <HardHat className="h-3.5 w-3.5 text-flame" /> What we do · all in one visit
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-6xl">
              Pick a service.<br/>See the actual work.
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Tap any service to see a real ChimCrew before/after from an Ohio home this season —
              with plain-English pricing and what's included.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-3 font-display text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            All 7 services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Layered showcase */}
        {(() => {
          const panel = (
            <article
            key={active}
            className="reveal relative overflow-hidden rounded-3xl border-2 border-primary/15 bg-card shadow-flame"
          >
            {/* Before / after split */}
            <div className="relative grid grid-cols-2 overflow-hidden">
              <div className="relative">
                <img src={(s as any).beforeImg ?? beforeImg} alt={`${s.title} — before`} className="aspect-[3/4] w-full bg-primary object-contain md:aspect-[4/5]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                <span className="absolute left-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary-foreground backdrop-blur md:left-3 md:top-3 md:px-2.5 md:py-1 md:text-[10px]">
                  {(s as any).beforeLabel ?? "Before"}
                </span>
              </div>
              <div className="relative">
                <img src={(s as any).afterImg ?? afterImg} alt={`${s.title} — after`} className="aspect-[3/4] w-full bg-primary object-contain md:aspect-[4/5]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-flame/10 to-transparent" />
                <span className="absolute right-2 top-2 rounded-full bg-flame px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary backdrop-blur md:right-3 md:top-3 md:px-2.5 md:py-1 md:text-[10px]">
                  {(s as any).afterLabel ?? "After"}
                </span>
              </div>
              {/* divider */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-flame shadow-[0_0_18px_oklch(0.78_0.19_92/0.7)]" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-flame bg-primary text-flame md:h-10 md:w-10">
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </div>
            </div>
            {/* Meta strip — now below images, no overlap */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                Real ChimCrew job · Ohio
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <Clock className="h-3 w-3" /> {s.duration}
              </span>
            </div>

            {/* Body */}
            <div className="grid gap-6 p-6 md:grid-cols-[1fr_280px] md:p-8">
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-flame ring-1 ring-flame/40">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Service 0{active + 1} / 0{services.length}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-primary md:text-3xl">
                  {s.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.body}
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {s.includes.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flame" /> {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <aside className="flex flex-col justify-between gap-4 rounded-2xl border-2 border-primary/10 bg-secondary/60 p-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Flat rate · Ohio neighbors
                  </p>
                  <p className="mt-1 font-display text-4xl font-extrabold text-primary">
                    {s.priceFrom}
                    <span className="ml-1 text-sm font-medium text-muted-foreground">+ tax</span>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Quoted in writing before we start. No surprises, ever.
                  </p>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/contact"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-flame px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary transition hover:-translate-y-0.5"
                  >
                    Book this service
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href="tel:5551234567"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary px-5 py-3 font-display text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    <Phone className="h-3.5 w-3.5" /> Ask a question first
                  </a>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Most homeowners get a quote in under a minute.
                  </p>
                </div>
              </aside>
            </div>
            </article>
          );
          return (
            <div className="relative mt-12 grid gap-6 lg:grid-cols-[340px_1fr]">
              {/* Service tabs */}
              <ol className="flex flex-col gap-2.5">
                {services.map((svc, i) => {
                  const SIcon = svc.icon;
                  const isActive = i === active;
                  return (
                    <li key={svc.title}>
                      <button
                        type="button"
                        onClick={() => setActive(isActive ? -1 : i)}
                        className={`group flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${
                          isActive
                            ? "border-flame bg-primary text-primary-foreground shadow-flame"
                            : "border-border bg-card hover:border-flame/60 hover:-translate-y-0.5"
                        }`}
                      >
                        <div
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition ${
                            isActive ? "bg-flame text-primary" : "bg-primary text-flame"
                          }`}
                        >
                          <SIcon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${isActive ? "text-flame" : "text-muted-foreground"}`}>
                            0{i + 1} · {svc.tag}
                          </p>
                          <h3 className={`mt-0.5 font-display text-lg font-semibold tracking-tight ${isActive ? "text-primary-foreground" : "text-primary"}`}>
                            {svc.title}
                          </h3>
                        </div>
                        <ChevronRight className={`h-5 w-5 shrink-0 transition ${isActive ? "translate-x-0.5 text-flame" : "text-muted-foreground"}`} />
                      </button>
                      {/* Mobile: panel opens right below the active tab */}
                      {isActive && (
                        <div className="mt-3 lg:hidden">{panel}</div>
                      )}
                    </li>
                  );
                })}
              </ol>

              {/* Desktop: side panel */}
              <div className="hidden lg:block">
                {active >= 0 ? panel : (
                  <div className="grid h-full min-h-[420px] place-items-center rounded-3xl border-2 border-dashed border-primary/15 bg-card/50 p-8 text-center">
                    <div>
                      <Sparkles className="mx-auto h-8 w-8 text-flame" />
                      <p className="mt-3 font-display text-lg font-semibold text-primary">Pick a service to see the before & after.</p>
                      <p className="mt-1 text-sm text-muted-foreground">Tap any service on the left — tap again to close.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
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
            One bad Ohio winter and the water wins.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Freeze-thaw widens hairline cracks until water reaches your firebox, your walls,
            your ceiling. We climb up, find the source, seal it for good, and put it in
            writing — with a leak warranty you can hand to the next owner.
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
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              Pick a window. <span className="text-flame">We handle everything else.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-primary-foreground/80">
              Tell us your address and pick a 2-hour window. We text to confirm within the hour,
              and a local Ohio crew rolls up on time — in uniform, with shoe covers, tarps,
              and a smile. If we're late, your inspection is on us.
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
              From "hello" to handshake in four steps.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              No quote-bait, no upsells, no surprise invoices. The price you see is the price you pay.
            </p>
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
              Real Ohio neighbors. Honest words.
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
            Ask us anything — we don't bite.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Real Ohioans answer the phone. No call centers, no pressure, no charge for advice.
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
              One quick form. A safer home tonight.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
              Same-day callback · No card · 100% Ohio crew
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Get my free quote <CalendarCheck className="h-4 w-4" />
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