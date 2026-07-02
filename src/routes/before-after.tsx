import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import gj1 from "@/assets/gallery-jobs/gj1.jpeg.asset.json";
import gj2 from "@/assets/gallery-jobs/gj2.jpeg.asset.json";
import gj3 from "@/assets/gallery-jobs/gj3.jpeg.asset.json";
import gj4 from "@/assets/gallery-jobs/gj4.jpeg.asset.json";
import gj5 from "@/assets/gallery-jobs/gj5.jpeg.asset.json";
import gj6 from "@/assets/gallery-jobs/gj6.jpeg.asset.json";
import gj7 from "@/assets/gallery-jobs/gj7.jpeg.asset.json";
import gj8 from "@/assets/gallery-jobs/gj8.jpeg.asset.json";
import gj9 from "@/assets/gallery-jobs/gj9.jpeg.asset.json";
import gj10 from "@/assets/gallery-jobs/gj10.jpeg.asset.json";
import gj11 from "@/assets/gallery-jobs/gj11.jpeg.asset.json";
import gj12 from "@/assets/gallery-jobs/gj12.jpeg.asset.json";
import gj13 from "@/assets/gallery-jobs/gj13.jpeg.asset.json";
import gj14 from "@/assets/gallery-jobs/gj14.jpeg.asset.json";
import gj15 from "@/assets/gallery-jobs/gj15.jpeg.asset.json";
import gj16 from "@/assets/gallery-jobs/gj16.jpeg.asset.json";
import gj17 from "@/assets/gallery-jobs/gj17.jpeg.asset.json";
import gj18 from "@/assets/gallery-jobs/gj18.jpeg.asset.json";
import gj19 from "@/assets/gallery-jobs/gj19.jpeg.asset.json";
import gj20 from "@/assets/gallery-jobs/gj20.jpeg.asset.json";

export const Route = createFileRoute("/before-after")({
  head: () => ({
    meta: [
      { title: "Done Projects — ChimCrew jobs in Ohio" },
      { name: "description", content: "Finished chimney sweeps, crown rebuilds, fireplace remodels and cap installs by ChimCrew across Columbus, Cincinnati and Dayton." },
      { property: "og:title", content: "ChimCrew Done Projects — Ohio Chimney Work" },
      { property: "og:description", content: "Finished chimney jobs from rooftops across Ohio. No stock imagery." },
      { property: "og:url", content: "https://chimcrew.com/before-after" },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/before-after" }],
  }),
  component: BeforeAfterPage,
});

type GalleryItem = {
  src: string;
  title: string;
  caption: string;
  city: string;
  size: "feature" | "tall" | "wide" | "square";
};

const GALLERY: GalleryItem[] = [
  { src: gj1.url, title: "Stone Fireplace Install", caption: "Full-height stacked-stone surround", city: "Columbus, OH", size: "feature" },
  { src: gj4.url, title: "Fireplace Surround", caption: "Clean stonework and finished trim", city: "Dublin, OH", size: "tall" },
  { src: gj2.url, title: "Fireplace Prep", caption: "Opened wall, clean rebuild layout", city: "Worthington, OH", size: "square" },
  { src: gj5.url, title: "Painted Brick Fireplace", caption: "Deep navy finish with crisp edges", city: "Bexley, OH", size: "wide" },
  { src: gj3.url, title: "Firebox Rebuild", caption: "Brickwork prepared for a safe firebox", city: "Upper Arlington, OH", size: "square" },
  { src: gj6.url, title: "Chimney Teardown", caption: "Controlled masonry removal", city: "Hilliard, OH", size: "tall" },
  { src: gj7.url, title: "Stone Chimney Build", caption: "Scaffolded exterior chimney work", city: "Powell, OH", size: "feature" },
  { src: gj8.url, title: "Arched Fireplace", caption: "Limewash finish with custom brick arch", city: "German Village, OH", size: "tall" },
  { src: gj9.url, title: "Custom Firebox", caption: "Hand-laid arched brickwork", city: "Clintonville, OH", size: "square" },
  { src: gj10.url, title: "Two-Story Chimney", caption: "Limewashed brick chimney finish", city: "New Albany, OH", size: "wide" },
  { src: gj11.url, title: "Interior Remodel", caption: "Fireplace wall prepared for finishing", city: "Gahanna, OH", size: "square" },
  { src: gj12.url, title: "Fresh Masonry", caption: "Firebox brick rebuild completed", city: "Westerville, OH", size: "tall" },
  { src: gj13.url, title: "Rooftop Inspection", caption: "Chimney accessed and documented", city: "Grandview, OH", size: "square" },
  { src: gj14.url, title: "Crown Seal", caption: "Waterproof coating and crown protection", city: "Grove City, OH", size: "wide" },
  { src: gj15.url, title: "Cap Installation", caption: "Stainless cap set on rebuilt crown", city: "Delaware, OH", size: "tall" },
  { src: gj16.url, title: "Liner Installation", caption: "Flue liner installed and finished", city: "Dayton, OH", size: "square" },
  { src: gj17.url, title: "Tuckpointing Repair", caption: "Mortar joints restored on brick stack", city: "Cincinnati, OH", size: "tall" },
  { src: gj18.url, title: "Smoke Chamber Parging", caption: "Smooth parge coat for better draft", city: "Pickerington, OH", size: "square" },
  { src: gj19.url, title: "Damper Repair", caption: "Damper rebuilt and sealed cleanly", city: "Reynoldsburg, OH", size: "wide" },
  { src: gj20.url, title: "Final Inspection", caption: "Completed chimney checked and documented", city: "Lewis Center, OH", size: "square" },
];

const UNIQUE_GALLERY = GALLERY.filter(
  (item, index, all) => all.findIndex((match) => match.src === item.src) === index,
);

function BeforeAfterPage() {
  return (
    <>
      <PageHero
        eyebrow="Done Projects · Ohio crew"
        title={<>Completed <span className="text-flame">Projects</span></>}
        subtitle="A clean look at finished ChimCrew chimney, masonry, fireplace, liner, cap, and inspection work across Ohio."
      />

      {/* DONE PROJECTS — elevated gallery, no duplicate photos */}
      <section className="relative overflow-hidden bg-background py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.16]" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="relative flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.25em] text-flame">// Finished work</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-primary md:text-4xl">
                Finished ChimCrew work across Ohio.
              </h2>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                No duplicate tiles, no crowded comparison blocks — just a curated project wall with breathing room.
              </p>
            </div>
            <div className="grid grid-cols-3 border border-border bg-card text-center shadow-[8px_8px_0_oklch(0.16_0.02_250/0.08)]">
              <Stat value={`${UNIQUE_GALLERY.length}`} label="photos" />
              <Stat value="20+" label="cities" />
              <Stat value="Done" label="status" />
            </div>
          </div>

          <div className="relative mt-10 grid auto-rows-[190px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {UNIQUE_GALLERY.map((item, index) => (
              <ProjectTile key={item.src} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 text-primary-foreground md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center md:px-8">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-flame">Need this done at your house?</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-primary-foreground md:text-4xl">
              Schedule your chimney inspection.
            </h2>
          </div>
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 bg-flame px-6 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary transition hover:brightness-110"
          >
            Schedule free inspection <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-20 border-r border-border px-4 py-3 last:border-r-0">
      <p className="font-display text-xl font-extrabold leading-none text-primary">{value}</p>
      <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
    </div>
  );
}

function ProjectTile({ item, index }: { item: GalleryItem; index: number }) {
  const sizeClass =
    item.size === "feature"
      ? "sm:col-span-2 sm:row-span-2"
      : item.size === "tall"
        ? "sm:row-span-2"
        : item.size === "wide"
          ? "sm:col-span-2"
          : "";

  return (
    <figure className={`group relative overflow-hidden border border-border bg-primary shadow-[0_18px_50px_-26px_oklch(0_0_0/0.45)] ${sizeClass}`}>
      <img
        src={item.src}
        alt={`${item.title} by ChimCrew in ${item.city}`}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
        loading={index < 4 ? "eager" : "lazy"}
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary/25 to-transparent opacity-90" aria-hidden />
      <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-primary/85 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-flame backdrop-blur">
        <Camera className="h-3 w-3" /> Done
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-display text-lg font-extrabold leading-tight text-primary-foreground drop-shadow md:text-xl">
          {item.title}
        </h3>
        <p className="mt-1 text-sm font-semibold leading-snug text-primary-foreground/85">
          {item.caption}
        </p>
        <p className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-flame">
          <MapPin className="h-3 w-3" /> {item.city}
        </p>
      </figcaption>
    </figure>
  );
}
