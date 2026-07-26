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
import newChimneyRestored from "@/assets/uploads/new-chimney-restored.jpeg.asset.json";
import newCapInstallRooftop from "@/assets/uploads/new-cap-install-rooftop.jpeg.asset.json";
import newCrownFreshCaps from "@/assets/uploads/new-crown-fresh-caps.jpeg.asset.json";
import newCrownCapsView from "@/assets/uploads/new-crown-caps-view.jpeg.asset.json";
import newBoomliftHouse from "@/assets/uploads/new-boomlift-house.jpeg.asset.json";
import newBoomliftCapInstall from "@/assets/uploads/new-boomlift-cap-install.jpeg.asset.json";
import newBoomliftInspect from "@/assets/uploads/new-boomlift-inspect.jpeg.asset.json";
import newTechLadderPoint from "@/assets/uploads/new-tech-ladder-point.jpeg.asset.json";
import newTechLadderBack from "@/assets/uploads/new-tech-ladder-back.jpeg.asset.json";
import newTechFireplace from "@/assets/uploads/new-tech-fireplace.jpeg.asset.json";
import u2CapMesh from "@/assets/uploads2/cap-install-brick-mesh.jpeg.asset.json";
import u2CrownSide from "@/assets/uploads2/crown-parge-side-fresh.jpeg.asset.json";
import u2CrownCloseup from "@/assets/uploads2/crown-parge-closeup.jpeg.asset.json";
import u2CapDomed from "@/assets/uploads2/cap-domed-crown-flue.jpeg.asset.json";
import u2CrownOverhead from "@/assets/uploads2/crown-parge-overhead.jpeg.asset.json";
import u2CrownOverhead2 from "@/assets/uploads2/crown-parge-overhead-2.jpeg.asset.json";
import u2BrickTall from "@/assets/uploads2/brick-chimney-tall-restored.jpeg.asset.json";
import u2BrickCap from "@/assets/uploads2/brick-chimney-restored-cap.jpeg.asset.json";
import u2BrickTuck from "@/assets/uploads2/brick-tuckpoint-double-crown.jpeg.asset.json";
import u2WhiteCrown from "@/assets/uploads2/brick-chimney-white-crown-cap.jpeg.asset.json";
import u2CrownDamaged from "@/assets/uploads2/crown-damaged-open-before.jpeg.asset.json";
import u2CrownSevere from "@/assets/uploads2/crown-severely-damaged.jpeg.asset.json";
import u2CapsBrick from "@/assets/uploads2/caps-installed-brick.jpeg.asset.json";
import u2CapRepairMesh from "@/assets/uploads2/cap-repair-worn-mesh.jpeg.asset.json";
import u2CrownNewCaps from "@/assets/uploads2/crown-new-with-caps.jpeg.asset.json";
import u2CrownDoubleCaps from "@/assets/uploads2/crown-new-double-caps.jpeg.asset.json";
import u2LinerMeasure from "@/assets/uploads2/liner-stainless-measure.jpeg.asset.json";
import u2LinerFlue from "@/assets/uploads2/liner-inside-flue-clean.jpeg.asset.json";
import u2LinerSmoke from "@/assets/uploads2/liner-smoke-chamber-view.jpeg.asset.json";
import u2FoundationParge from "@/assets/uploads2/foundation-parge-basement.jpeg.asset.json";
import u4CapBlack from "@/assets/uploads4/cap-black-fresh-crown.jpeg.asset.json";
import u4CrownOpen from "@/assets/uploads4/crown-fresh-open-flue.jpeg.asset.json";
import u4Tuck from "@/assets/uploads4/tech-tuckpointing-brick.jpeg.asset.json";
import u4CrewShirts from "@/assets/uploads4/crew-branded-shirts-truck.jpeg.asset.json";
import u4CrewNight from "@/assets/uploads4/crew-night-truck-gear.jpeg.asset.json";
import u4LinerFarm from "@/assets/uploads4/liner-stainless-farm-view.jpeg.asset.json";

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
  { src: u4CapBlack.url, title: "Black Cap on Fresh Crown", caption: "New stainless cap set on a hand-troweled crown seal", city: "Columbus, OH", size: "feature" },
  { src: u4Tuck.url, title: "Tuckpointing In Progress", caption: "Grinding out and re-pointing failed mortar joints", city: "Dublin, OH", size: "tall" },
  { src: u4LinerFarm.url, title: "Stainless Liner — Final Check", caption: "Inspecting a freshly installed 316Ti liner", city: "Delaware, OH", size: "square" },
  { src: u4CrownOpen.url, title: "Fresh Crown, Open Flue", caption: "Crown parged and sealed before cap install", city: "Westerville, OH", size: "wide" },
  { src: u4CrewShirts.url, title: "ChimCrew Loading Out", caption: "Gearing up for a same-day service run", city: "Columbus, OH", size: "square" },
  { src: u4CrewNight.url, title: "Night Prep — Ready to Roll", caption: "Trucks loaded for a morning of chimney work", city: "Columbus, OH", size: "wide" },
  { src: u2LinerMeasure.url, title: "Stainless Liner — Sized & Sealed", caption: "New 316Ti liner measured and set on the flue collar", city: "Dublin, OH", size: "tall" },
  { src: u2LinerSmoke.url, title: "Smoke Chamber Liner Transition", caption: "Clean liner tie-in inside a rebuilt smoke chamber", city: "Bexley, OH", size: "square" },
  { src: u2LinerFlue.url, title: "Flue Interior — Post Repair", caption: "Smooth, sealed flue interior after liner work", city: "Upper Arlington, OH", size: "square" },
  { src: u2CrownSevere.url, title: "Crown Replacement — Before", caption: "Severely spalled crown ready for full rebuild", city: "Hilliard, OH", size: "tall" },
  { src: u2CrownDamaged.url, title: "Crown Rebuild — Opened Up", caption: "Old crown removed, brick prepped for fresh cap", city: "Grove City, OH", size: "wide" },
  { src: u2CapRepairMesh.url, title: "Cap Repair — Worn Mesh Out", caption: "Failed mesh screen removed for a new stainless cap", city: "Powell, OH", size: "square" },
  { src: u2CapsBrick.url, title: "Dual Stainless Caps + Crown", caption: "Two new caps set on a freshly parged brick crown", city: "Westerville, OH", size: "wide" },
  { src: u2CrownNewCaps.url, title: "Fresh Crown + Twin Caps", caption: "Crown rebuilt with two matching stainless caps", city: "Worthington, OH", size: "tall" },
  { src: u2CrownDoubleCaps.url, title: "Crown Rebuild + Double Caps", caption: "Finished crown with dual caps on brick stack", city: "Clintonville, OH", size: "square" },
  { src: u2FoundationParge.url, title: "Foundation Parge & Seal", caption: "Basement foundation wall parged and sealed", city: "German Village, OH", size: "square" },
  { src: u2CapMesh.url, title: "Stainless Cap Install on Brick", caption: "Hand-set mesh cap on a freshly parged crown", city: "Dublin, OH", size: "tall" },
  { src: u2WhiteCrown.url, title: "Crown Replacement + New Cap", caption: "White crown wash with new stainless cap on metal roof", city: "Powell, OH", size: "square" },
  { src: u2BrickCap.url, title: "Full Chimney Restoration", caption: "Tuckpointed brick with new cap — top to bottom", city: "Upper Arlington, OH", size: "feature" },
  { src: u2CrownSide.url, title: "Fresh Crown Parge", caption: "Rebuilt crown sealed against Ohio freeze-thaw", city: "Bexley, OH", size: "square" },
  { src: u2CrownCloseup.url, title: "Crown Wash Close-Up", caption: "Hand-troweled crown seal, no cracks", city: "Westerville, OH", size: "square" },
  { src: u2CapDomed.url, title: "Cap + Domed Crown", caption: "New cap set over a fresh domed crown", city: "Grove City, OH", size: "wide" },
  { src: u2BrickTall.url, title: "Tall Brick Chimney Repair", caption: "Full-height brick restoration on a two-story home", city: "Hilliard, OH", size: "tall" },
  { src: u2BrickTuck.url, title: "Brick + Double Crown Tuckpoint", caption: "Restored mortar joints with fresh dual crowns", city: "Clintonville, OH", size: "square" },
  { src: u2CrownOverhead.url, title: "Crown Parge — Side View", caption: "Overhead of a freshly sealed side-mount crown", city: "New Albany, OH", size: "square" },
  { src: u2CrownOverhead2.url, title: "Crown Rebuild Overhead", caption: "Second angle on a completed crown rebuild", city: "German Village, OH", size: "wide" },
  { src: newChimneyRestored.url, title: "Full Crown Seal + Stainless Cap", caption: "Fresh crown, cap and flashing rebuild", city: "Columbus, OH", size: "feature" },
  { src: newCapInstallRooftop.url, title: "Stainless Chimney Cap Install", caption: "New cap sealed onto brick chimney", city: "Westerville, OH", size: "tall" },
  { src: newCrownFreshCaps.url, title: "Fresh Crown + Dual Caps", caption: "Parged crown with two stainless caps", city: "Worthington, OH", size: "square" },
  { src: newCrownCapsView.url, title: "Crown Rebuild Complete", caption: "Aerial view of finished crown work", city: "Grove City, OH", size: "wide" },
  { src: newBoomliftHouse.url, title: "Boom Lift Chimney Access", caption: "Reaching a tricky 3-story chimney safely", city: "Bexley, OH", size: "tall" },
  { src: newBoomliftCapInstall.url, title: "Cap Install From Lift", caption: "Setting a new cap on a steep roof", city: "Upper Arlington, OH", size: "square" },
  { src: newBoomliftInspect.url, title: "High-Access Inspection", caption: "Camera inspection from the boom", city: "Dublin, OH", size: "square" },
  { src: newTechLadderPoint.url, title: "On-Site Inspection", caption: "Diagnosing an aged brick chimney", city: "Hilliard, OH", size: "tall" },
  { src: newTechLadderBack.url, title: "Roof Access", caption: "Ladder up to a brick chimney inspection", city: "Clintonville, OH", size: "square" },
  { src: newTechFireplace.url, title: "Fireplace Service", caption: "Interior fireplace inspection & sweep", city: "German Village, OH", size: "wide" },
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
