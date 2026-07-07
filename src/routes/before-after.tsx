import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import mobileHeroPhoto from "@/assets/hero/hero-mobile-team-chimney.png.asset.json";
import desktopHeroPhoto from "@/assets/hero/hero-desktop-team-chimney.png.asset.json";
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
import nCap from "@/assets/gallery-new/new-cap-ladder.jpeg.asset.json";
import nChase from "@/assets/gallery-new/new-chase-cover-mesh.jpeg.asset.json";
import nAlum from "@/assets/gallery-new/new-aluminum-cap.jpeg.asset.json";
import nCrownSeal from "@/assets/gallery-new/new-brick-crown-seal.jpeg.asset.json";
import nCopper from "@/assets/gallery-new/new-brick-copper-flash.jpeg.asset.json";
import nCopperDetail from "@/assets/gallery-new/new-copper-flashing-detail.jpeg.asset.json";

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
  { src: nCap.url, title: "Cap + Mesh Arrestor", caption: "New stainless cap installed cleanly", city: "Powell, OH", size: "tall" },
  { src: nChase.url, title: "Chase Cover Install", caption: "Fresh chase cover with round cap", city: "Dublin, OH", size: "square" },
  { src: nAlum.url, title: "Aluminum Chase Cover", caption: "Two-tone chimney with turbine cap", city: "Westerville, OH", size: "wide" },
  { src: nCrownSeal.url, title: "Crown Seal + Flashing", caption: "Protected crown and sealed roofline", city: "Hilliard, OH", size: "tall" },
  { src: nCopper.url, title: "Copper Flashing", caption: "Fresh copper flashing at brick stack", city: "Upper Arlington, OH", size: "square" },
  { src: nCopperDetail.url, title: "Counter Flashing Detail", caption: "Detailed flashing work at chimney base", city: "Clintonville, OH", size: "wide" },
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
        mobileBgImage={mobileHeroPhoto}
        desktopBgImage={desktopHeroPhoto}
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
        <p className="font-display text-lg font-extrabold leading-tight text-primary-foreground drop-shadow md:text-xl">
          {item.title}
        </p>
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
