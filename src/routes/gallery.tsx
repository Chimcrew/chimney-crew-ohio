import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Camera, ArrowRight } from "lucide-react";
import p01 from "@/assets/projects/project-01-double-crown.jpg";
import p02 from "@/assets/projects/project-02-tuckpointing-after.jpg";
import p03 from "@/assets/projects/project-03-liner-install.jpg";
import p04 from "@/assets/projects/project-04-cap-install.jpg";
import p05 from "@/assets/projects/project-05-crown-rebuild.jpg";
import p06 from "@/assets/projects/project-06-tech-onsite.jpg";
import p07 from "@/assets/projects/project-07-flue-before.jpg";
import p08 from "@/assets/projects/project-08-cap-finished.jpg";
import p09 from "@/assets/projects/project-09-crown-before.jpg";
import up4 from "@/assets/uploads/job_4.jpeg.asset.json";
import up5 from "@/assets/uploads/job_5.jpeg.asset.json";
import up6 from "@/assets/uploads/job_6.jpeg.asset.json";
import up0 from "@/assets/uploads/job0.jpeg.asset.json";
import up1 from "@/assets/uploads/job_1.jpeg.asset.json";
import up8 from "@/assets/uploads/job_8.jpeg.asset.json";
import up3 from "@/assets/uploads/job_3.jpeg.asset.json";

const SITE = "https://chimcrew.com";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Real ChimCrew Jobs in Columbus, Cincinnati & Dayton" },
      {
        name: "description",
        content:
          "Real photos from ChimCrew jobs across Ohio — crown rebuilds, stainless liner installs, tuckpointing, caps, and waterproofing. No stock imagery, no AI.",
      },
      { property: "og:title", content: "ChimCrew Gallery — Real Ohio Chimney Work" },
      { property: "og:description", content: "Every photo is a job we finished. No stock. No AI." },
      { property: "og:url", content: `${SITE}/gallery` },
      { property: "og:image", content: `${SITE}${p01}` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/gallery` }],
  }),
  component: GalleryPage,
});

type Photo = {
  src: string;
  alt: string;
  title: string;
  city: string;
  tag: "Crown" | "Liner" | "Tuckpointing" | "Cap" | "Crew" | "Waterproof";
  size: "tall" | "wide" | "square";
};

const PHOTOS: Photo[] = [
  { src: up5.url, alt: "Custom stainless chase cover installed on a sided chimney", title: "Custom Chase Cover Install", city: "Westerville, OH", tag: "Cap", size: "tall" },
  { src: up4.url, alt: "Fresh stainless steel chase cover replacement", title: "New Stainless Chase Cover", city: "Hilliard, OH", tag: "Cap", size: "square" },
  { src: up8.url, alt: "Brick chimney after tuckpointing with new stainless cap", title: "Tuckpoint + Cap — Finished", city: "Dublin, OH", tag: "Tuckpointing", size: "tall" },
  { src: up6.url, alt: "Step flashing replacement on a brick chimney", title: "Step Flashing Replacement", city: "Upper Arlington, OH", tag: "Crown", size: "wide" },
  { src: up1.url, alt: "Crown sealed and new black mesh cap installed on a brick chimney", title: "Crown Seal + Black Mesh Cap", city: "Powell, OH", tag: "Crown", size: "square" },
  { src: up0.url, alt: "Cracked chimney crown with exposed terracotta flue before repair", title: "Cracked Crown — Before", city: "Powell, OH", tag: "Crown", size: "square" },
  { src: up3.url, alt: "Freshly waterproofed and coated chimney with new cap", title: "Waterproof Recoat", city: "Columbus, OH", tag: "Waterproof", size: "tall" },
  { src: p01, alt: "Dual crown rebuild with stainless caps on a brick chimney", title: "Dual Crown Rebuild + Caps", city: "Columbus, OH", tag: "Crown", size: "tall" },
  { src: p02, alt: "Tuckpointing restoration finished on chimney masonry", title: "Full Tuckpointing Restoration", city: "Dublin, OH", tag: "Tuckpointing", size: "square" },
  { src: p03, alt: "Stainless steel chimney liner installed from the roof", title: "Stainless Liner Install", city: "Cincinnati, OH", tag: "Liner", size: "wide" },
  { src: p04, alt: "Mesh chimney cap installation in progress", title: "Mesh Cap + Crown Repair", city: "Worthington, OH", tag: "Cap", size: "square" },
  { src: p05, alt: "Rebuilt chimney crown with round stainless cap", title: "Crown Rebuild + Round Cap", city: "Dayton, OH", tag: "Crown", size: "tall" },
  { src: p06, alt: "ChimCrew technician on site at a residential job", title: "Crew On Site", city: "Hilliard, OH", tag: "Crew", size: "wide" },
  { src: p07, alt: "Flue interior before sweep showing creosote build-up", title: "Flue Before Sweep", city: "Westerville, OH", tag: "Liner", size: "square" },
  { src: p08, alt: "Finished stainless chimney cap installed cleanly", title: "Cap Install — Finished", city: "Powell, OH", tag: "Cap", size: "tall" },
  { src: p09, alt: "Cracked chimney crown before rebuild", title: "Crown Before Rebuild", city: "Grove City, OH", tag: "Crown", size: "square" },
];

const FILTERS = ["All", "Crown", "Liner", "Tuckpointing", "Cap", "Crew"] as const;

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible = filter === "All" ? PHOTOS : PHOTOS.filter((p) => p.tag === filter);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-primary/20 bg-primary py-20 text-primary-foreground md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-flame/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-flame">
            ◆ Real Work · Real Ohio Homes
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1] tracking-tight md:text-7xl">
            On the <span className="text-flame">job</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            Every photo below is a real ChimCrew job we finished this season —
            shot on a phone from the roof or the truck. No stock. No AI. No
            staged before-and-afters.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Stat label="Jobs this season" value="180+" />
            <span className="hidden h-8 w-px bg-primary-foreground/20 md:block" />
            <Stat label="Ohio cities served" value="3" />
            <span className="hidden h-8 w-px bg-primary-foreground/20 md:block" />
            <Stat label="CSIA certified" value="Yes" />
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-0 z-20 border-b border-border bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 md:px-8">
          <span className="mr-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Filter:
          </span>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border-2 px-3.5 py-1.5 font-display text-[11px] font-bold uppercase tracking-wider transition ${
                filter === f
                  ? "border-flame bg-flame text-primary"
                  : "border-border bg-card text-foreground hover:border-flame hover:text-flame"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {visible.length} photos
          </span>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-background py-12 md:py-16">
        <div className="pointer-events-none absolute inset-x-0 -z-0 h-64 bg-grid opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
            {visible.map((p, i) => (
              <PhotoTile key={`${p.src}-${i}`} photo={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-2xl border-2 border-flame/30 bg-card p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-flame">
              ◆ Want your chimney on this wall?
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-primary md:text-3xl">
              Book a free Ohio inspection.
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-flame px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary transition hover:brightness-110"
          >
            Schedule now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-extrabold leading-none text-flame md:text-3xl">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">{label}</p>
    </div>
  );
}

function PhotoTile({ photo, index }: { photo: Photo; index: number }) {
  const span =
    photo.size === "tall"
      ? "row-span-2"
      : photo.size === "wide"
        ? "col-span-2"
        : "";
  return (
    <figure className={`group relative overflow-hidden rounded-2xl border-2 border-border bg-primary transition hover:border-flame ${span}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading={index < 2 ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-90" aria-hidden />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-flame/40 bg-primary/70 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-flame backdrop-blur">
        <Camera className="h-2.5 w-2.5" /> {photo.tag}
      </span>
      <figcaption className="absolute inset-x-3 bottom-3">
        <p className="font-display text-sm font-extrabold leading-tight text-primary-foreground md:text-base">
          {photo.title}
        </p>
        <p className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/70">
          <MapPin className="h-3 w-3" /> {photo.city}
        </p>
      </figcaption>
    </figure>
  );
}
