import { useState, useEffect } from "react";
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
  Camera,
  Video,
} from "lucide-react";
import logoAsset from "@/assets/chimcrew-logo-transparent-v2.png.asset.json";

const logo = logoAsset.url;
import sweep from "@/assets/leak-chimney-rooftop.jpg";
import fireplace from "@/assets/fireplace-cozy.jpg";
import projectHero from "@/assets/projects/project-01-double-crown.jpg.asset.json";
import projectTuck from "@/assets/projects/project-02-tuckpointing-after.jpg.asset.json";
import projectLiner from "@/assets/projects/project-03-liner-install.jpg.asset.json";
import projectCap from "@/assets/projects/project-04-cap-install.jpg.asset.json";
import projectTech from "@/assets/projects/project-06-tech-onsite.jpg.asset.json";
import techScaffold from "@/assets/real/tech-scaffolding-rebuild.png.asset.json";
import techLiner from "@/assets/real/tech-liner-install.png.asset.json";
import certifiedBadge from "@/assets/badges/certified-chimney-sweep.svg.asset.json";
import jobPhotoA from "@/assets/uploads/chimney-job-a.jpeg.asset.json";
import jobPhotoB from "@/assets/uploads/chimney-job-b.jpeg.asset.json";
import teamHeroPhoto from "@/assets/team/chimcrew-team-hero.png.asset.json";
import teamTruckPhoto from "@/assets/team/chimcrew-team-truck.png.asset.json";
import inspectionRoofPhoto from "@/assets/team/chimcrew-inspection-roof.png.asset.json";
import chimcrewLogoCrew from "@/assets/chimcrew-logo-transparent-v2.png.asset.json";
import sweepCloseupPhoto from "@/assets/team/chimcrew-sweep-closeup.png.asset.json";
import beforeAfterPhoto from "@/assets/chimney-before-after.png.asset.json";
import cameraInspectionPhoto from "@/assets/inspection/camera-inspection.png.asset.json";
import inspectionVideo from "@/assets/inspection/inspection.mp4.asset.json";
import fireplaceServicePhoto from "@/assets/team/chimcrew-fireplace-service.png.asset.json";
import techFireplaceSweepPhoto from "@/assets/tech-fireplace-sweep.png.asset.json";
import rooftopTechsPhoto from "@/assets/team/chimcrew-techs-rooftop.png.asset.json";
import damagedLinerPhoto from "@/assets/problems/damaged-liner.png.asset.json";
import chimneyLeakCeilingPhoto from "@/assets/problems/chimney-leak-ceiling.png.asset.json";
import draftSmokeFireplacePhoto from "@/assets/problems/draft-smoke-fireplace.png.asset.json";
import brickMortarDamagePhoto from "@/assets/problems/brick-mortar-damage.png.asset.json";
import chimneyWaterDamageAtticPhoto from "@/assets/problems/chimney-water-damage-attic.png.asset.json";
import crackedCrownPhoto from "@/assets/problems/cracked-crown.png.asset.json";
import damagedChimneyCapPhoto from "@/assets/problems/damaged-chimney-cap.jpg.asset.json";
import { RecentProjects } from "@/components/RecentProjectsSection";
import { SERVICES, formatFromPrice, getService } from "@/data/services";


import { ServiceAreaSeo } from "@/components/ServiceAreaSeo";
import { BeforeAfter } from "@/components/BeforeAfter";
import { BEFORE_AFTER_JOBS } from "@/data/before-after";
import { DroneInspection } from "@/components/DroneInspection";
import { ScheduleInline } from "@/components/ScheduleWidget";
import { FlashingJobShowcase } from "@/components/FlashingJobShowcase";
import { InstagramFollow } from "@/components/InstagramFollow";
import teamWidePhoto from "@/assets/chimcrew-team-wide.png.asset.json";
import techFireplaceBurner from "@/assets/team-jobs/tech-fireplace-burner.jpeg.asset.json";
import techCrownWaterproof from "@/assets/team-jobs/tech-crown-waterproof.jpeg.asset.json";
import techRooftopLadder from "@/assets/team-jobs/tech-rooftop-ladder.jpeg.asset.json";
import chimneyNightRebuild from "@/assets/team-jobs/chimney-night-rebuild.jpeg.asset.json";
import techChimneyCapInstall from "@/assets/fireplace-tile-install.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ohio Chimney Sweep, Repair & Fireplace | ChimCrew" },
      {
        name: "description",
        content:
          "CSIA-certified chimney sweeps, inspections, and repairs across Columbus, Dayton, Cincinnati & Cleveland. Upfront pricing, fully insured, same-day callbacks.",
      },
      { property: "og:title", content: "Ohio Chimney Sweep, Repair & Fireplace | ChimCrew" },
      {
        property: "og:description",
        content:
          "CSIA-certified chimney sweeps and repairs across Columbus, Dayton, Cincinnati & Cleveland. Upfront pricing, fully insured.",
      },
      { property: "og:url", content: "https://chimcrew.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://chimcrew.com/" },
      { rel: "preload", as: "image", href: projectHero, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How often should I sweep my chimney?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The CSIA recommends an annual inspection and a sweep whenever creosote reaches 1/8\". For most Ohio homes that burn wood weekly, that's once a year.",
              },
            },
            {
              "@type": "Question",
              name: "Do you service gas fireplaces too?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — we sweep, inspect and repair wood, gas and pellet systems, including inserts and zero-clearance units.",
              },
            },
            {
              "@type": "Question",
              name: "How long does a sweep take?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A standard sweep and Level 1 inspection takes 45–90 minutes. Repairs are quoted on the spot in a written estimate.",
              },
            },
            {
              "@type": "Question",
              name: "What does it cost?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our chimney inspection is only $69 for Columbus-area homeowners. Repairs are quoted in writing, in plain English, after we see the chimney. Honest, flat-rate pricing — no hidden fees.",
              },
            },
            {
              "@type": "Question",
              name: "Are you local?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Born and raised in Ohio. Our crew lives in Columbus, Cincinnati and Dayton — same neighborhoods we service.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <HeroToOfferBridge />
      <ScheduleSection id="schedule-section" />
      <FlashingJobShowcase variant="compact" />
      <Testimonials />
      <CommonProblems />
      <RecentProjects />
      <ServiceAreaSeo />
      <DroneInspection />
      <TrustMarquee />
      <EmergencyCallBar />
      <LeakingChimney />
      <Faq />
      <TrustMarquee />
      <EmergencyCallBar />
    </>
  );
}

/* ============================================================
   SCHEDULE SECTION — main form on the homepage
   ============================================================ */
function ScheduleSection({ id }: { id?: string }) {
  return (
    <section id={id} className="relative bg-background py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <ScheduleInline />
      </div>
    </section>
  );
}

/* ============================================================
   HERO → OFFER BRIDGE
   A floating, 3D-tilted photo card that straddles the seam
   between the hero and the dark coupon banner.
   ============================================================ */
function HeroToOfferBridge() {
  return (
    <div className="relative z-10 mx-auto flex max-w-7xl justify-center px-4 py-8 md:px-8 md:py-10">
      <figure className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
        {/* soft warm halo */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-none bg-flame/20 blur-2xl"
          aria-hidden
        />
        {/* logo */}
        <img
          src={chimcrewLogoCrew.url}
          alt="ChimCrew — Chimney Repair & Inspection USA"
          className="relative block w-full h-auto"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>
  );
}

/* ============================================================
   TEAM WIDE PHOTO BRIDGE — small framed crew shot under hero
   ============================================================ */
function TeamWidePhotoBridge() {
  return (
    <div className="relative z-10 mx-auto flex max-w-7xl justify-center px-4 py-8 md:px-8 md:py-10">
      <figure className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <div className="overflow-hidden rounded-xl border-2 border-border bg-card shadow-[0_20px_50px_-20px_oklch(0_0_0/0.35)]">
          <img
            src={teamWidePhoto.url}
            alt="The ChimCrew team — certified chimney professionals in Columbus, Ohio"
            className="block h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </figure>
    </div>
  );
}

/* ============================================================
   HERO  — image LEFT, message RIGHT (as originally requested)
   ============================================================ */
function HeroPhotoCard() {
  const photos = [
    { src: jobPhotoA.url, caption: "New caps + crown seal", city: "Columbus, OH" },
    { src: jobPhotoB.url, caption: "Crown rebuild in progress", city: "Columbus, OH" },
    { src: projectHero, caption: "Crown rebuild + new caps", city: "Columbus, OH" },
    { src: projectLiner, caption: "Stainless liner install", city: "Dayton, OH" },
    { src: projectTuck, caption: "Tuckpointing restoration", city: "Cincinnati, OH" },
    { src: projectCap, caption: "New cap & flashing", city: "Cleveland, OH" },
    { src: projectTech, caption: "On-site sweep & inspect", city: "Westerville, OH" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((n) => (n + 1) % photos.length), 3800);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
      {/* ambient glow */}
      <div className="absolute -inset-6 rounded-none bg-flame/15 blur-3xl" aria-hidden />

      <div className="relative overflow-hidden rounded-none border border-white/10 bg-[oklch(0.12_0.01_250)] shadow-[0_30px_80px_oklch(0_0_0/0.55)]">
        {/* top meta strip */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" /> Live · Recent Ohio
            jobs
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
            {String(idx + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
        </div>

        {/* photo stack — cross-fade */}
        <div className="relative aspect-[4/5] overflow-hidden bg-primary sm:aspect-[4/5]">
          {photos.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt={`ChimCrew project — ${p.caption} in ${p.city}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${i === idx ? "opacity-100" : "opacity-0"}`}
              width={800}
              height={1000}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}

          {/* gradient scrim */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-primary/10"
            aria-hidden
          />

          {/* top-left chip */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-flame/30 bg-primary/80 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame backdrop-blur">
            <Clock className="h-3 w-3" /> Same-day slots
          </div>

          {/* caption card */}
          <div className="absolute inset-x-4 bottom-4 rounded-none border border-white/10 bg-primary/85 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-primary-foreground">
                  {photos[idx].caption}
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                  <MapPin className="h-3 w-3" /> {photos[idx].city}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-flame/40 bg-flame/15 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                Done
              </span>
            </div>
          </div>
        </div>

        {/* thumbnail rail */}
        <div className="flex items-center gap-2 border-t border-white/5 px-4 py-3">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show ${p.caption}`}
              className={`group relative h-10 w-10 shrink-0 overflow-hidden rounded-none border transition ${i === idx ? "border-flame ring-2 ring-flame/40" : "border-white/10 opacity-60 hover:opacity-100"}`}
            >
              <img
                src={p.src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
            Jobs
          </span>
        </div>
      </div>
    </div>
  );
}

/* (MobileHero removed — unified responsive Hero below) */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.04] to-background">
      {/* Mobile-only compact hero photo above the fold */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden rounded-b-2xl bg-card shadow-[0_20px_60px_-20px_oklch(0_0_0/0.25)]">
          <img
            src={teamHeroPhoto.url}
            alt="The ChimCrew team in front of their branded service vehicles in Columbus, Ohio"
            className="block h-44 w-full object-cover sm:h-56"
            fetchPriority="high"
            decoding="async"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" aria-hidden />
          <p className="absolute inset-x-4 bottom-3 font-display text-sm font-bold text-primary-foreground sm:text-base">
            Meet the ChimCrew team.
          </p>
        </div>
      </div>

      {/* Hero message */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-10 sm:pt-8 md:pb-14 lg:px-8 lg:pt-12">
        <div className="max-w-3xl">
        {/* Certified badge */}
        <div className="flex items-start gap-2">
          <img
            src={certifiedBadge.url}
            alt="Certified chimney sweep credential"
            width={80}
            height={80}
            className="h-[70px] w-[70px] shrink-0 rounded-full bg-white p-1 ring-1 ring-border min-[414px]:h-20 min-[414px]:w-20 sm:h-20 sm:w-20"
            loading="eager"
            decoding="async"
          />
          <div className="min-w-0 pt-0.5 ml-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black min-[414px]:text-[11px] sm:text-[11px]">
              Certified chimney professionals
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
              <span className="ml-4 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground min-[414px]:text-[11px]">
                <ShieldCheck className="h-2.5 w-2.5 text-flame" /> Licensed · Insured
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-flame/40 bg-flame/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground min-[414px]:text-[11px]">
                <Star className="h-2.5 w-2.5 fill-flame text-flame" /> 5-Star Reviews
              </span>
            </div>
          </div>
        </div>

        <h1 className="hero-main-title mt-8 mb-2 min-w-0 max-w-full font-sans font-bold tracking-normal text-foreground sm:mt-6">
          <span className="block">The Chimney Experts You've Trusted for Over 18 Years</span>
        </h1>
        <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1 border-l-2 border-flame pl-3 text-foreground/70">
          <MapPin className="h-4 w-4 shrink-0 text-flame" aria-hidden />
          <span className="hero-city-line min-w-0 font-mono font-bold uppercase tracking-[0.1em] sm:tracking-[0.16em]">
            Serving <span className="text-foreground">Columbus</span> · <span className="text-foreground">Cincinnati</span> · <span className="text-foreground">Dayton</span>
          </span>
        </div>

        <p className="hero-copy mt-6 max-w-[38ch] leading-[1.75] text-foreground/80 sm:mt-4 sm:max-w-xl sm:leading-relaxed">
          Trusted <span className="font-bold text-foreground">Columbus &amp; Central Ohio</span> homeowners' choice for chimney inspections, repairs, masonry, leak repairs, liners, caps, crowns, flashing, and fireplace services.
        </p>

        <div className="mt-8 flex flex-col items-start gap-4 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
          <a
            href="#schedule-section"
            data-cta
            className="inline-flex h-13 items-center justify-center gap-2 bg-primary px-5 font-sans text-[15px] font-bold text-primary-foreground transition active:scale-95 min-[414px]:h-14 min-[414px]:px-6 min-[414px]:text-base"
          >
            <CalendarCheck className="h-4 w-4" /> Schedule free inspection
          </a>
          <a
            href="tel:6146835763"
            data-cta
            className="inline-flex h-13 max-w-full items-center justify-center gap-2 border border-foreground/30 bg-background px-4 font-sans text-[14px] font-bold text-foreground transition hover:border-flame active:scale-95 min-[414px]:h-14 min-[414px]:px-5 min-[414px]:text-[15px] sm:px-5 sm:text-base"
          >
            <Phone className="h-4 w-4 shrink-0 text-flame" /> <span className="truncate">Call Now (614) 683-5763</span>
          </a>
        </div>

        {/* Emergency line micro-CTA */}
        <a
          href="tel:6146835763"
          className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E63A1F] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:brightness-110 min-[414px]:text-[12px] sm:mt-3"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Emergency line 24/7
        </a>

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/50 pt-8 sm:mt-8 sm:pt-6">
          {[
            { icon: CheckCircle2, label: "CSIA-certified" },
            { icon: ShieldCheck, label: "Fully insured" },
            { icon: Clock, label: "Same-day callback" },
            { icon: Award, label: "Family owned & operated" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="hero-trust-item inline-flex items-center gap-2 font-medium text-foreground/80"
            >
              <Icon className="h-4 w-4 text-flame" />
              {label}
            </span>
          ))}
        </div>
        </div>
      </div>

      {/* Running review line */}
      <TrustMarquee />
    </section>
  );
}

/* ============================================================
   TEAM GALLERY — authentic crew at work, near top of page
   Placeholders included so we can drop in more crew photos later
   ============================================================ */
function RealTeamGallery() {
  const items = [
    { src: techFireplaceBurner.url, label: "Fireplace burner service", city: "Columbus, OH" },
    { src: techCrownWaterproof.url, label: "Crown waterproofing", city: "Dublin, OH" },
    { src: techRooftopLadder.url, label: "Rooftop chimney inspection", city: "Powell, OH" },
    { src: techScaffold.url, label: "Scaffolded chimney rebuild", city: "Westerville, OH" },
    { src: techLiner.url, label: "Stainless liner installation", city: "Dayton, OH" },
    { src: inspectionRoofPhoto.url, label: "Liner installation", city: "Hilliard, OH" },
    { src: techChimneyCapInstall.url, label: "Fireplace tile & surround install", city: "Upper Arlington, OH" },
    { src: chimneyNightRebuild.url, label: "Late-night rebuild — finished clean", city: "Columbus, OH" },
  ];
  return (
    <section className="relative bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Camera className="h-3.5 w-3.5 text-flame" /> Our Crew · On the Job
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
            The ChimCrew team — <span className="text-flame">certified techs, on the job</span>.
          </h2>
          <p className="mt-3 text-base text-foreground/75 md:text-lg">
            Photos of our technicians working on Ohio chimneys this season.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {items.map((it) => (
            <figure key={it.src} className="group relative overflow-hidden rounded-none border border-border bg-primary aspect-square">
              <img
                src={it.src}
                alt={`${it.label} — ChimCrew technician in ${it.city}`}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-90" aria-hidden />
              <figcaption className="absolute inset-x-3 bottom-3">
                <p className="font-display text-xs font-extrabold leading-tight text-primary-foreground sm:text-sm">{it.label}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-primary-foreground/70">
                  <MapPin className="h-3 w-3" /> {it.city}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/gallery"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame px-5 font-sans text-sm font-bold text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95"
          >
            See the full gallery <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="tel:6146835763"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-foreground/20 bg-background px-5 font-sans text-sm font-medium text-foreground transition hover:border-flame active:scale-95"
          >
            <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TRUST MARQUEE
   ============================================================ */
function TrustMarquee() {
  // Review-platform chips. Brand-styled inline so we don't ship 3rd-party logo files.
  const chips = [
    {
      label: "Google",
      node: (
        <span className="flex items-center gap-1.5 font-sans text-sm font-medium">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
          <span className="ml-1 text-[#FBBC05]">★★★★★</span>
        </span>
      ),
    },
    {
      label: "Yelp",
      node: (
        <span className="flex items-center gap-1.5 font-sans text-sm font-bold">
          <span className="rounded-none bg-[#D32323] px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
            yelp
          </span>
          <span className="text-[#D32323]">★★★★★</span>
        </span>
      ),
    },
    {
      label: "Angi",
      node: (
        <span className="flex items-center gap-1.5 font-sans text-sm font-bold">
          <span className="rounded-none bg-[#F26F21] px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
            Angi
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-foreground/70">
            Super Service '24
          </span>
        </span>
      ),
    },
    {
      label: "HomeAdvisor",
      node: (
        <span className="flex items-center gap-1.5 font-sans text-sm font-bold">
          <span className="text-[#F68B1F]">Home</span>
          <span className="text-foreground/80">Advisor</span>
          <span className="text-[#F68B1F]">★★★★★</span>
        </span>
      ),
    },
    {
      label: "BBB",
      node: (
        <span className="flex items-center gap-1.5 font-sans text-sm font-bold">
          <span className="rounded-none bg-[#005DAA] px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
            BBB
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-foreground/70">
            A+ Accredited
          </span>
        </span>
      ),
    },
    {
      label: "Porch",
      node: (
        <span className="flex items-center gap-1.5 font-sans text-sm font-bold">
          <span className="text-[#1A75BB]">▲ Porch</span>
          <span className="text-[#D32323]">★★★★★</span>
        </span>
      ),
    },
  ];
  return (
    <section
      aria-label="Trusted on review platforms"
      className="relative overflow-hidden border-y border-border bg-secondary/60 py-4"
    >
      <p className="mb-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
        ★ 5-Star Rated · Google · Yelp · Angi · BBB
      </p>
      <div className="flex w-max animate-marquee-single items-center gap-3 whitespace-nowrap px-3">
        {chips.map((c, i) => (
          <span
            key={`${c.label}-${i}`}
            className="inline-flex items-center rounded-none border border-border bg-background px-3 py-2 shadow-sm"
          >
            {c.node}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   EMERGENCY CALL BAR — bright red strip with the crew phone
   ============================================================ */
function EmergencyCallBar() {
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

/* ============================================================
   COMMON CHIMNEY PROBLEMS WE FIX — homeowner-language list
   ============================================================ */
function CommonProblems() {
  const problems = [
    {
      label: "Chimney Leaks",
      body: "Water stains, ceiling drips, and damp brick after every rain.",
      slug: "flashing-repair",
      image: chimneyLeakCeilingPhoto.url,
      alt: "Water stain and ceiling damage caused by a leaking chimney",
    },
    {
      label: "Cracked Chimney Crowns",
      body: "Hairline cracks letting water sit on top of the chimney.",
      slug: "crown-tuckpoint",
      image: crackedCrownPhoto.url,
      alt: "Cracked concrete chimney crown around flue tiles",
    },
    {
      label: "Missing or Damaged Chimney Caps",
      body: "Open flues let in rain, debris, and animals.",
      slug: "cap-install",
      image: damagedChimneyCapPhoto.url,
      alt: "Damaged chimney cap sitting loose on top of a chimney",
    },
    {
      label: "Brick & Mortar Damage",
      body: "Spalling brick and washed-out mortar joints.",
      slug: "crown-tuckpoint",
      image: brickMortarDamagePhoto.url,
      alt: "Chimney brick and mortar joints with visible cracking and deterioration",
    },
    {
      label: "Chimney Water Damage",
      body: "Stained masonry, efflorescence, and rotting framing inside.",
      slug: "waterproofing",
      image: chimneyWaterDamageAtticPhoto.url,
      alt: "Water damage and staining around a chimney in an attic",
    },
    {
      label: "Damaged Chimney Liners",
      body: "Cracked clay tiles or rusted-out metal liners hurting draft and safety.",
      slug: "liner-install",
      image: damagedLinerPhoto.url,
      alt: "Broken clay flue liner tiles inside a chimney",
    },
    {
      label: "Draft & Ventilation Problems",
      body: "Smoke spilling into the room, cold downdrafts, hard-to-start fires.",
      slug: "damper-repair",
      image: draftSmokeFireplacePhoto.url,
      alt: "Smoke backing into a living room from a fireplace with draft problems",
    },
  ];
  return (
    <section className="relative bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Wrench className="h-3.5 w-3.5 text-flame" /> What We Fix
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
            Common Chimney Problems <span className="text-flame">We Fix</span>
          </h2>
          <p className="mt-3 text-base text-foreground/75 md:text-lg">
            If any of these sound familiar, we can take a look — most are far cheaper to fix now
            than after they cause water or fire damage.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {problems.map(({ label, body, slug, image, alt }) => (
            <Link
              key={label}
              to="/services/$slug"
              params={{ slug }}
              className="group relative flex flex-col overflow-hidden rounded-none border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-flame hover:shadow-flame"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={image}
                  alt={alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" aria-hidden />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-flame/40 bg-primary/80 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-flame backdrop-blur">
                  <AlertTriangle className="h-3 w-3" /> Common issue
                </span>
                <h3 className="absolute inset-x-4 bottom-3 font-display text-lg font-extrabold leading-tight text-primary-foreground drop-shadow sm:text-xl">
                  {label}
                </h3>
              </div>
              <div className="flex flex-1 items-start justify-between gap-3 p-4 sm:p-5">
                <p className="text-sm leading-snug text-foreground/80">{body}</p>
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-primary transition group-hover:border-flame group-hover:bg-flame group-hover:text-primary">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => (window.location.href = "/schedule")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
          >
            <CalendarCheck className="h-4 w-4" /> Schedule appointment online
          </button>
          <a
            href="tel:6146835763"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-foreground/20 bg-background px-5 font-sans text-[13px] font-medium tracking-normal text-foreground transition hover:border-flame active:scale-95 sm:px-6"
          >
            <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PHOTO & VIDEO DOCUMENTATION TRUST CALLOUT
   ============================================================ */
function PhotoVideoTrust() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-primary py-12 text-primary-foreground md:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-[1fr_1fr] md:px-8">
        {/* Camera inspection photo + drone inspection video */}
        <div className="order-1 grid grid-cols-2 gap-3 md:order-none md:gap-4">
          <figure className="flex flex-col">
            <img
              src={cameraInspectionPhoto.url}
              alt="Inside-the-firebox camera inspection by ChimCrew technician"
              className="aspect-[3/4] w-full rounded-none border border-white/10 object-cover shadow-lg"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
              <Camera className="mr-1 inline h-3 w-3 text-flame" /> Camera inspection
            </figcaption>
          </figure>
          <figure className="flex flex-col">
            <video
              src={inspectionVideo.url}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="aspect-[3/4] w-full rounded-none border border-white/10 object-cover shadow-lg"
            />
            <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
              <Camera className="mr-1 inline h-3 w-3 text-flame" /> Drone inspection
            </figcaption>
          </figure>
        </div>

        {/* Text + CTA */}
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-flame">
            Transparent inspections
          </p>
          <h3 className="mt-2 font-display text-2xl font-extrabold leading-snug md:text-3xl">
            ⭐ State-Of-The-Art Inspection Equipment
          </h3>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            You see exactly what we see on the roof and inside the flue. No upsell theater, no
            "trust us" — just clear evidence and a written quote.
          </p>
          <button
            type="button"
            onClick={() => (window.location.href = "/schedule")}
            className="mt-5 inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-none bg-flame px-5 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-md transition active:scale-95"
          >
            <CalendarCheck className="h-4 w-4" /> Book Inspection
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY CHOOSE CHIMCREW — trust + benefit cards
   ============================================================ */
function WhyChooseUs() {
  const reasons = [
    {
      icon: HomeIcon,
      title: "Family-Owned & Operated",
      body: "Three brothers, one Ohio crew. We answer the phone and show up ourselves — no call centers.",
    },
    {
      icon: ThumbsUp,
      title: "Honest Up-Front Pricing",
      body: "Flat rates quoted in writing before we start. No surprises, no upsell theater, no hidden fees.",
    },
    {
      icon: Clock,
      title: "Fast Response · Same-Day Service",
      body: "Most calls booked within the hour. Same-day slots open on weekdays during chimney season.",
    },
    {
      icon: ShieldCheck,
      title: "Licensed, Insured & CSIA Certified",
      body: "Fully insured Ohio crew with industry-standard certifications. Your home is covered every visit.",
    },
    {
      icon: Star,
      title: "5-Star Rated by Ohio Homeowners",
      body: "Consistently top-rated on Google, Yelp, Angi and Facebook by Columbus, Cincinnati and Dayton homeowners.",
    },
    {
      icon: Award,
      title: "Written Workmanship Warranty",
      body: "Every repair backed in writing — transferable to the next owner. We stand behind every job.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-flame" /> Why Chimcrew
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-primary md:text-5xl">
            Six reasons Ohio homeowners{" "}
            <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
              trust us first
            </span>
            .
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            We're not the biggest chimney company in Ohio. We're the one your homeowners keep
            calling back.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div
            className="group relative overflow-hidden rounded-none border border-border bg-card shadow-[0_30px_70px_-25px_oklch(0_0_0/0.45)] transition-transform duration-500 hover:-translate-y-1 hover:rotate-0 [transform:perspective(1400px)_rotateY(-8deg)_rotateX(2deg)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="pointer-events-none absolute -inset-8 -z-10 rounded-none bg-flame/25 blur-3xl"
              aria-hidden
            />
            <img
              src={techFireplaceSweepPhoto.url}
              alt="A ChimCrew technician sweeping a fireplace inside an Ohio home"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="border-t border-border px-6 py-5 text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                In customers' homes every day
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Clean work practices, protective floor coverings, clear explanations, and documented
                findings from a local ChimCrew technician.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
            {reasons.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group relative flex flex-col overflow-hidden rounded-none border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-flame hover:shadow-flame sm:p-6"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-flame/10 blur-2xl transition group-hover:bg-flame/30" />
                <div className="relative grid h-10 w-10 place-items-center rounded-none bg-primary text-flame ring-1 ring-flame/40 sm:h-12 sm:w-12">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-primary sm:mt-5 sm:text-lg">
                  {title}
                </h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => (window.location.href = "/schedule")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
          >
            <CalendarCheck className="h-4 w-4" /> Schedule appointment online
          </button>
          <a
            href="tel:6146835763"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-foreground/20 bg-background px-5 font-sans text-[13px] font-medium tracking-normal text-foreground transition hover:border-flame active:scale-95 sm:px-6"
          >
            <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BEFORE / AFTER (home) — drag-to-compare highlights
   ============================================================ */
function BeforeAfterHome() {
  const jobs = BEFORE_AFTER_JOBS;
  return (
    <section className="relative overflow-hidden border-y-2 border-border bg-primary py-20 text-primary-foreground md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-flame/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
            <Sparkles className="h-3.5 w-3.5" /> Before / After
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Drag the slider.{" "}
            <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
              See the work.
            </span>
          </h2>
          <p className="mt-3 text-base text-primary-foreground/80">
            Ohio chimneys, ChimCrew results — drag any photo with your finger to compare.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <article key={j.id} className="space-y-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame/80">
                {j.service} · {j.city}
              </p>
              <BeforeAfter before={j.before} after={j.after} alt={j.headline} />
              <h3 className="font-display text-base font-bold leading-snug text-primary-foreground/90">
                {j.headline}
              </h3>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/before-after"
            className="inline-flex items-center gap-2 rounded-none bg-flame px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_30px_oklch(0.78_0.19_92/0.25)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            See all before & after jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROBLEM SOLVER — pain points → solutions
   ============================================================ */
function ProblemSolver() {
  const problems = [
    {
      icon: Droplets,
      problem: "Water leaking around your chimney?",
      solution: "Crown seal + flashing repair — stops it for good.",
      cta: "Fix the leak",
    },
    {
      icon: Wind,
      problem: "Smoke smell inside your home?",
      solution: "Camera inspection + flue cleaning — find the cause today.",
      cta: "Schedule inspection",
    },
    {
      icon: AlertTriangle,
      problem: "Cracked chimney crown or mortar?",
      solution: "Stainless-reinforced rebuild with a 10-year warranty.",
      cta: "Get a repair quote",
    },
    {
      icon: Flame,
      problem: "Fireplace not drafting or won't light?",
      solution: "Same-day diagnostic — gas, wood, or insert.",
      cta: "Book a diagnostic",
    },
    {
      icon: HomeIcon,
      problem: "Dryer taking forever to dry?",
      solution: "Dryer vent cleaning — lower fire risk, faster loads.",
      cta: "Clean my vent",
    },
    {
      icon: ShieldCheck,
      problem: "Buying or selling a home?",
      solution: "Level 2 inspection with PDF report — realtor-approved.",
      cta: "Book inspection",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-14 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" /> Sound familiar?
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-primary md:text-5xl">
            The problem you're searching for —{" "}
            <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
              we fix it
            </span>
            .
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Tell us what's wrong. We've already seen it on an Ohio rooftop this week.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {problems.map(({ icon: Icon, problem, solution, cta }) => (
            <article
              key={problem}
              className="group flex flex-col rounded-none border-2 border-border bg-card p-4 transition hover:-translate-y-1 hover:border-flame hover:shadow-flame sm:p-6"
            >
              <div className="grid h-9 w-9 place-items-center rounded-none bg-destructive/10 text-destructive ring-1 ring-destructive/30 sm:h-11 sm:w-11">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary sm:mt-4 sm:text-lg">
                {problem}
              </h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                {solution}
              </p>
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center gap-2 self-start rounded-none border-2 border-primary bg-primary px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground transition group-hover:border-flame group-hover:bg-flame group-hover:text-primary sm:mt-5 sm:px-4 sm:py-2.5 sm:text-[11px]"
              >
                {cta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center">
          <a
            href="tel:6146835763"
            className="inline-flex items-center gap-2 rounded-none bg-flame px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_10px_30px_oklch(0.78_0.19_92/0.25)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            <Phone className="h-4 w-4" /> Talk to a tech now · (614) 683-5763
          </a>
        </div>
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
      body: 'A 1/8" layer of creosote can ignite at 451°F and burn at 2,000°F — hot enough to crack flue tiles and torch your roof.',
      stat: "#1 cause of chimney fires",
    },
    {
      icon: Wind,
      title: "Carbon monoxide leaks",
      body: "Blocked or cracked flues push CO back into your living room. It's odorless, colorless, and kills 400+ Americans every year.",
      stat: "Invisible · Odorless · Deadly",
    },
    {
      icon: AlertTriangle,
      title: "Animal & debris blockage",
      body: "Birds, squirrels and leaves nest in uncapped flues, trapping smoke and embers right above your fireplace.",
      stat: "Common in Ohio fall & spring",
    },
    {
      icon: HomeIcon,
      title: "Damaged crown & cap",
      body: "Ohio freeze-thaw cycles crack mortar crowns. One season untreated and water reaches the firebox.",
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
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-primary md:text-5xl">
            What your chimney is{" "}
            <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
              hiding right now
            </span>
            .
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            25,000+ chimney fires hit U.S. homes every year — most start invisible. Two minutes here
            could save your roof, your air, and a $40,000 insurance fight. Here's what we look for
            on every Ohio rooftop we climb.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hazards.map(({ icon: Icon, title, body, stat }, i) => (
            <article
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-none border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-flame hover:shadow-flame"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-flame/10 blur-2xl transition group-hover:bg-flame/30" />
              <div className="relative grid h-12 w-12 place-items-center rounded-none bg-primary text-flame ring-1 ring-flame/40">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-primary">{title}</h3>
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
          <div className="relative overflow-hidden rounded-none border-2 border-primary/20 shadow-flame">
            <img src={sweep} alt="Chimney inspection on an Ohio rooftop" className="block w-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-flame backdrop-blur">
              <HardHat className="h-3 w-3" /> Crown rebuild
            </div>
          </div>
          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-4 hidden rounded-none border-2 border-flame bg-primary p-4 text-primary-foreground shadow-flame md:block">
            <p className="font-display text-3xl text-flame">93%</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em]">
              of chimney leaks
              <br />
              stop with one repair
            </p>
          </div>
        </div>

        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Droplets className="h-3.5 w-3.5 text-flame" /> Is your chimney leaking?
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-primary md:text-5xl">
            One bad Ohio winter and{" "}
            <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
              the water wins
            </span>
            .
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Freeze-thaw widens hairline cracks until water reaches your firebox, your walls, your
            ceiling. We climb up, find the source, seal it for good, and put it in writing — with a
            leak warranty you can hand to the next owner.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {signs.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 rounded-none border border-border bg-card p-3 text-sm text-foreground"
              >
                <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => (window.location.href = "/schedule")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
            >
              <CalendarCheck className="h-4 w-4" /> Schedule appointment online
            </button>
            <a
              href="tel:6146835763"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-foreground/20 bg-background px-5 font-sans text-[13px] font-medium tracking-normal text-foreground transition hover:border-flame active:scale-95 sm:px-6"
            >
              <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
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
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,_oklch(0.24_0.02_250)_0%,_oklch(0.08_0.01_250)_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-flame/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-10 rounded-none border border-flame/30 bg-primary/40 p-8 backdrop-blur md:grid-cols-[1.2fr_1fr] md:p-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
              <CalendarCheck className="h-3.5 w-3.5" /> 60-second booking
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold md:text-5xl">
              Pick a window.{" "}
              <span className="inline-block rounded-none bg-primary-foreground px-2.5 py-0.5 text-primary">
                We handle everything else.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-primary-foreground/80">
              Tell us your address and pick a 2-hour window. We text to confirm within the hour, and
              a local Ohio crew rolls up on time — in uniform, with shoe covers, tarps, and a smile.
              If we're late, your inspection is on us.
            </p>

            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Choose service", "Sweep, inspect, repair"],
                ["02", "Pick a window", "Same-day if open"],
                ["03", "We arrive on time", "Or we discount the bill"],
              ].map(([n, t, s]) => (
                <li key={n} className="rounded-none border border-flame/20 bg-primary/60 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                    Step {n}
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold">{t}</p>
                  <p className="mt-1 text-xs text-primary-foreground/70">{s}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => (window.location.href = "/schedule")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
              >
                <CalendarCheck className="h-4 w-4" /> Schedule appointment online
              </button>
              <a
                href="tel:6146835763"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-foreground/20 bg-background px-5 font-sans text-[13px] font-medium tracking-normal text-foreground transition hover:border-flame active:scale-95 sm:px-6"
              >
                <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-none border-2 border-flame/40 shadow-flame">
              <img
                src={techScaffold.url}
                alt="ChimCrew crew on-site rebuilding a chimney crown"
                className="block aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
                loading="lazy"
                decoding="async"
              />
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
    {
      icon: Phone,
      title: "Call or book online",
      body: "Tell us your address, fireplace type and the issue.",
    },
    {
      icon: CalendarCheck,
      title: "Pick a 2-hour window",
      body: "Same-day slots open most weekdays.",
    },
    {
      icon: Search,
      title: "On-site assessment",
      body: "Camera inspection + written report before any work starts.",
    },
    {
      icon: Wrench,
      title: "Clean, repair, restore",
      body: "We finish the job in one visit when possible.",
    },
  ];
  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <Clock className="h-3.5 w-3.5 text-flame" /> How it works
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-primary md:text-5xl">
            From "hello" to handshake in{" "}
            <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
              four steps
            </span>
            .
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
              <h3 className="mt-5 font-display text-base font-semibold text-primary">{title}</h3>
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
    {
      quote:
        "Booked online at 8am, crew was at my door by 1pm. Diagnosed a draft issue our last sweep missed and fixed it the same visit. Honest pricing.",
      name: "Jason T.",
      city: "Upper Arlington, OH",
    },
    {
      quote:
        "Dryer was taking three cycles to dry a load. ChimCrew cleared the vent, showed me before/after photos, and now it's one cycle. Should've called sooner.",
      name: "Lauren B.",
      city: "Mason, Cincinnati",
    },
    {
      quote:
        "Family-owned and it shows. They treated my mom's house like their own — shoe covers, polite, explained everything. We're customers for life.",
      name: "Marcus W.",
      city: "Kettering, Dayton",
    },
  ];
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Big social-proof banner */}
        <div className="mb-12 grid gap-6 rounded-none border-2 border-flame/30 bg-secondary/60 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-7 w-7 fill-flame text-flame" />
              ))}
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">
                5-Star
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Verified Ohio reviews
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-foreground sm:text-base">
            Google · Facebook · BBB A+ · Nextdoor Neighborhood Favorite —
            <span className="font-semibold text-primary">
              {" "}
              Ohio homeowners rate us their #1 chimney crew.
            </span>
          </p>
          <Link
            to="/schedule"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame px-5 font-sans text-[13px] font-bold tracking-normal text-primary shadow-[0_8px_22px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 sm:px-6"
          >
            <CalendarCheck className="h-4 w-4" /> Schedule appointment online
          </Link>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              <Star className="h-3.5 w-3.5 text-flame" /> Reviews
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-primary md:text-5xl">
              Ohio homeowners.{" "}
              <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
                Honest words
              </span>
              .
            </h2>
          </div>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-primary hover:text-flame"
          >
            All reviews <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile: swipeable snap carousel — one review in view */}
        <div className="mt-8 sm:hidden -mx-4">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {reviews.map((r, i) => (
              <figure
                key={i}
                className="relative flex w-[86%] shrink-0 snap-center flex-col overflow-hidden rounded-none border border-border bg-card p-5"
              >
                <div className="flex text-flame">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">
                  "{r.quote}"
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-3">
                  <p className="font-display text-sm font-semibold text-primary">{r.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {r.city}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ← Swipe for more reviews →
          </p>
        </div>

        {/* Tablet/desktop: grid */}
        <div className="mt-12 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="relative flex flex-col overflow-hidden rounded-none border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-flame hover:shadow-flame"
            >
              <div className="flex text-flame">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-display text-sm font-semibold text-primary">{r.name}</p>
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
      a: "Our chimney inspection is only $69 for Columbus-area homeowners. Repairs are quoted in writing, in plain English, after we see the chimney — no hidden fees.",
    },
    {
      q: "Are you local?",
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
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-primary md:text-5xl">
            Ask us anything.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Ohioans answer the phone. No call centers, no pressure, no charge for advice.
          </p>
          <a
            href="tel:6146835763"
            className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-primary hover:text-flame"
          >
            <Phone className="h-4 w-4" /> (614) 683-5763
          </a>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-none border border-border bg-card p-5 transition open:border-flame open:shadow-flame"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-display text-base font-semibold text-primary">{f.q}</span>
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
   SERVICE AREA — Central Ohio cities we cover
   ============================================================ */
function ServiceArea() {
  const metros = [
    { city: "Columbus", tag: "HQ · Same-day dispatch", icon: MapPin },
    { city: "Dayton", tag: "Full coverage", icon: MapPin },
    { city: "Cincinnati", tag: "Full coverage", icon: MapPin },
  ];
  const suburbs = ["Dublin", "Hilliard", "Westerville", "Powell", "Grove City", "Worthington"];

  return (
    <section className="relative bg-primary py-14 text-primary-foreground md:py-20">
      <div className="relative mx-auto max-w-4xl px-4 md:px-8">
        {/* Headline */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground/70">
            <MapPin className="h-3 w-3" /> Local Dispatch
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
            Serving the <span className="text-primary-foreground/90">Ohio Heartland</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/60">
            From Columbus to Cincinnati and Dayton — one local crew, same-day dispatch.
          </p>
        </div>

        {/* City cards — simple row */}
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3">
          {metros.map((m) => (
            <div
              key={m.city}
              className="rounded-none border border-primary-foreground/10 bg-primary-foreground/[0.04] px-4 py-4 text-center"
            >
              <m.icon className="mx-auto h-4 w-4 text-primary-foreground/40" />
              <p className="mt-2 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground">
                {m.city}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground/50">
                {m.tag}
              </p>
            </div>
          ))}
        </div>

        {/* Suburbs */}
        <div className="mx-auto mt-6 max-w-2xl border-t border-primary-foreground/10 pt-5 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/40">
            Also serving
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {suburbs.map((s) => (
              <span key={s} className="font-mono text-[12px] text-primary-foreground/60">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/contact"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-none bg-flame px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary transition hover:brightness-110"
          >
            Check my address <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="tel:6146835763"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-none border border-primary-foreground/20 bg-primary-foreground/[0.04] px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            <Phone className="h-4 w-4 text-flame" /> (614) 683-5763
          </a>
        </div>
      </div>
    </section>
  );
}

