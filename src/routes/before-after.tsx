import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
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
  { src: gj11.url, caption: "Interior fireplace remodel — drywall prep" },
  { src: gj12.url, caption: "Brick firebox rebuild — fresh masonry" },
  { src: gj13.url, caption: "Chimney inspection — rooftop access" },
  { src: gj14.url, caption: "Crown seal and waterproof recoat" },
  { src: gj15.url, caption: "Stainless cap install on rebuilt crown" },
  { src: gj16.url, caption: "Flue liner install — finished" },
  { src: gj17.url, caption: "Tuckpointing repair on brick stack" },
  { src: gj18.url, caption: "Smoke chamber parge — finished" },
  { src: gj19.url, caption: "Damper rebuild and gasket install" },
  { src: gj20.url, caption: "Final inspection — chimney finished" },
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
        eyebrow="Done Projects · Ohio crew"
        title={<>Before &amp; After: Ohio <span className="text-flame">Chimney</span> Restoration Projects</>}
        subtitle="Ohio chimneys and fireplaces, finished by ChimCrew. Every photo below is a job we actually completed — no stock, no AI."
      />

      {/* DONE PROJECTS — uniform grid, no before/after pairs */}
      <section className="bg-card/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-flame">// Finished work</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight text-primary md:text-5xl">
              The rooftop, finished.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Recent Ohio jobs from the ChimCrew camera roll.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-none border-2 border-border bg-primary"
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
