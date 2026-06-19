import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BEFORE_AFTER_JOBS } from "@/data/before-after";
import projectCrown from "@/assets/projects/project-01-double-crown.jpg";
import projectTuck from "@/assets/projects/project-02-tuckpointing-after.jpg";
import projectLiner from "@/assets/projects/project-03-liner-install.jpg";
import projectCap from "@/assets/projects/project-04-cap-install.jpg";
import projectCrown2 from "@/assets/projects/project-05-crown-rebuild.jpg";
import projectTech from "@/assets/projects/project-06-tech-onsite.jpg";
import projectCapFin from "@/assets/projects/project-08-cap-finished.jpg";
import leakRoof from "@/assets/leak-chimney-rooftop.jpg";
import techScaffold from "@/assets/real/tech-scaffolding-rebuild.png.asset.json";
import techLiner from "@/assets/real/tech-liner-install.png.asset.json";
import baCrownStone from "@/assets/real/ba-crown-stone.png.asset.json";
import baSpalledBrick from "@/assets/real/ba-spalled-brick.png.asset.json";
import baCapCrown from "@/assets/real/ba-cap-crown.png.asset.json";
import crownDemo from "@/assets/real/crown-demo-inprogress.png.asset.json";
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

export const Route = createFileRoute("/before-after")({
  head: () => ({
    meta: [
      { title: "Gallery — ChimCrew jobs in Ohio" },
      { name: "description", content: "Before and after photos from chimney sweeps, crown rebuilds, fireplace remodels and cap installs by ChimCrew across Ohio." },
      { property: "og:title", content: "ChimCrew Gallery — Ohio Chimney Work" },
      { property: "og:description", content: "Real before and after photos from chimney jobs across Ohio. No stock imagery." },
      { property: "og:url", content: "https://chimcrew.com/before-after" },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/before-after" }],
  }),
  component: BeforeAfterPage,
});

const GALLERY = [
  { src: gj1.url, caption: "Stacked-stone fireplace tile install — in progress" },
  { src: gj4.url, caption: "Stacked-stone fireplace surround — finished" },
  { src: gj2.url, caption: "Old brick fireplace stripped to studs" },
  { src: gj5.url, caption: "Brick fireplace painted deep navy — finished" },
  { src: gj3.url, caption: "Brick firebox demo before rebuild" },
  { src: gj6.url, caption: "Full-height brick chimney teardown in progress" },
  { src: gj7.url, caption: "Stone-veneer chimney install — scaffolded" },
  { src: gj8.url, caption: "Arched brick fireplace rebuild — limewash finish" },
  { src: gj9.url, caption: "Custom arched firebox brickwork — in progress" },
  { src: gj10.url, caption: "Two-story limewashed brick chimney — finished" },
  { src: baCapCrown.url, caption: "Crown & cap rebuild — before / after" },
  { src: baSpalledBrick.url, caption: "Spalled brick chimney rebuild — before / after" },
  { src: baCrownStone.url, caption: "Stone-to-brick crown rebuild — before / after" },
  { src: techScaffold.url, caption: "Crown rebuild in progress, scaffolded job" },
  { src: techLiner.url, caption: "Stainless liner install, harnessed on roof" },
  { src: crownDemo.url, caption: "Old crown demoed, ready for fresh pour" },
  { src: projectCrown, caption: "Double-crown rebuild, Dublin OH" },
  { src: projectTuck, caption: "Tuckpointing repair, Bexley OH" },
  { src: projectLiner, caption: "Stainless liner install, Hilliard OH" },
  { src: projectCap, caption: "New cap install, Worthington OH" },
  { src: projectCrown2, caption: "Crown rebuild, Powell OH" },
  { src: projectTech, caption: "Tech on-site, Upper Arlington OH" },
  { src: projectCapFin, caption: "Cap & flashing finished, Westerville OH" },
  { src: leakRoof, caption: "Leak diagnosis, Grandview OH" },
];

function BeforeAfterPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery · Ohio crew"
        title={<>Real jobs. <span className="text-flame">Real results.</span></>}
        subtitle="Ohio chimneys and fireplaces, finished by ChimCrew. Every photo below is a job we actually completed — no stock, no AI."
      />

      {/* BEFORE / AFTER PAIRS — side by side, no slider */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-4 md:px-8">
          {BEFORE_AFTER_JOBS.map((j, i) => (
            <article key={j.id} className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
                    {`Job #${1000 + i}`} · {j.service}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-primary md:text-4xl">
                    {j.headline}
                  </h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-flame" /> {j.city}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <figure className="relative overflow-hidden rounded-2xl border border-border bg-primary">
                  <img src={j.before} alt={`${j.headline} — before`} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                  <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground">
                    Before
                  </span>
                </figure>
                <figure className="relative overflow-hidden rounded-2xl border border-border bg-primary">
                  <img src={j.after} alt={`${j.headline} — after`} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                  <span className="absolute left-3 top-3 rounded-md bg-flame px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    After
                  </span>
                </figure>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">{j.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERY OF OTHER PROJECT PHOTOS */}
      <section className="border-t-2 border-border bg-card/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-flame">// More finished work</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight text-primary md:text-5xl">
              The rest of the rooftop.
            </h2>
            <p className="mt-3 text-muted-foreground">
              A few more recent Ohio jobs from the ChimCrew camera roll.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-xl border-2 border-border bg-primary"
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent p-4 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground">
                  <span className="truncate">{g.caption}</span>
                  <span className="rounded-full border border-flame/40 bg-flame/15 px-2 py-0.5 text-flame">Done</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
