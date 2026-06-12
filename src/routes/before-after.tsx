import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { BEFORE_AFTER_JOBS } from "@/data/before-after";
import projectCrown from "@/assets/projects/project-01-double-crown.jpg";
import projectTuck from "@/assets/projects/project-02-tuckpointing-after.jpg";
import projectLiner from "@/assets/projects/project-03-liner-install.jpg";
import projectCap from "@/assets/projects/project-04-cap-install.jpg";
import projectCrown2 from "@/assets/projects/project-05-crown-rebuild.jpg";
import projectTech from "@/assets/projects/project-06-tech-onsite.jpg";
import projectCapFin from "@/assets/projects/project-08-cap-finished.jpg";
import leakRoof from "@/assets/leak-chimney-rooftop.jpg";
import fireplaceCozy from "@/assets/fireplace-cozy.jpg";
import techScaffold from "@/assets/real/tech-scaffolding-rebuild.png.asset.json";
import techLiner from "@/assets/real/tech-liner-install.png.asset.json";
import baCrownStone from "@/assets/real/ba-crown-stone.png.asset.json";
import baSpalledBrick from "@/assets/real/ba-spalled-brick.png.asset.json";
import baCapCrown from "@/assets/real/ba-cap-crown.png.asset.json";
import crownDemo from "@/assets/real/crown-demo-inprogress.png.asset.json";

export const Route = createFileRoute("/before-after")({
  head: () => ({
    meta: [
      { title: "Before & After — Real ChimCrew jobs in Ohio" },
      { name: "description", content: "Drag-to-compare before and after photos from real chimney sweeps, crown rebuilds and cap installs by ChimCrew across Ohio." },
    ],
  }),
  component: BeforeAfterPage,
});

const GALLERY = [
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
  { src: fireplaceCozy, caption: "Restored hearth, ready for winter" },
];

function BeforeAfterPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-primary/30 bg-primary py-20 text-primary-foreground md:py-24">
        <div className="bg-grid absolute inset-0 opacity-[0.08]" aria-hidden />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-flame/15 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-flame">// Before / After</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            Drag the slider. <span className="text-flame">See the work.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            Real Ohio chimneys, real ChimCrew jobs. Drag any photo below with
            your finger or mouse to compare what it looked like when we
            arrived — and what other homeowners got back.
          </p>
        </div>
      </section>

      {/* BEFORE / AFTER PAIRS */}
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
              <BeforeAfter
                before={j.before}
                after={j.after}
                alt={j.headline}
              />
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
