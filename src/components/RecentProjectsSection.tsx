import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import newChimneyRestored from "@/assets/uploads/new-chimney-restored.jpeg.asset.json";
import newCapInstallRooftop from "@/assets/uploads/new-cap-install-rooftop.jpeg.asset.json";
import newTechLadderPoint from "@/assets/uploads/new-tech-ladder-point.jpeg.asset.json";
import newCrownFreshCaps from "@/assets/uploads/new-crown-fresh-caps.jpeg.asset.json";
import newCrownCapsView from "@/assets/uploads/new-crown-caps-view.jpeg.asset.json";
import newBoomliftCapInstall from "@/assets/uploads/new-boomlift-cap-install.jpeg.asset.json";
import newBoomliftHouse from "@/assets/uploads/new-boomlift-house.jpeg.asset.json";
import newBoomliftInspect from "@/assets/uploads/new-boomlift-inspect.jpeg.asset.json";
import newTechFireplace from "@/assets/uploads/new-tech-fireplace.jpeg.asset.json";
import oldDoubleCrown from "@/assets/projects/project-01-double-crown.jpg.asset.json";
import oldTuckpointing from "@/assets/projects/project-02-tuckpointing-after.jpg.asset.json";
import oldLiner from "@/assets/projects/project-03-liner-install.jpg.asset.json";
import oldCap from "@/assets/projects/project-04-cap-install.jpg.asset.json";
import oldCrownRebuild from "@/assets/projects/project-05-crown-rebuild.jpg.asset.json";
import oldTechOnsite from "@/assets/projects/project-06-tech-onsite.jpg.asset.json";
import oldFlueBefore from "@/assets/projects/project-07-flue-before.jpg.asset.json";
import oldCapFinished from "@/assets/projects/project-08-cap-finished.jpg.asset.json";
import oldCrownBefore from "@/assets/projects/project-09-crown-before.jpg.asset.json";

type Project = {
  img: string;
  title: string;
  city: string;
  tag: string;
  layout: "feature" | "wide" | "square";
};

const PROJECTS: Project[] = [
  { img: newChimneyRestored.url, title: "Full Crown Seal + Stainless Cap", city: "Columbus, OH", tag: "Crown & Cap", layout: "feature" },
  { img: newBoomliftCapInstall.url, title: "Boom Lift Cap Install", city: "Upper Arlington, OH", tag: "Cap Install", layout: "square" },
  { img: newCapInstallRooftop.url, title: "Stainless Cap Install", city: "Westerville, OH", tag: "Cap Install", layout: "square" },
  { img: oldCap.url, title: "Cap & Flashing Install", city: "Cleveland, OH", tag: "Cap Install", layout: "square" },
  { img: newCrownFreshCaps.url, title: "Fresh Crown + Dual Caps", city: "Worthington, OH", tag: "Crown & Caps", layout: "square" },
  { img: oldCrownRebuild.url, title: "Crown Rebuild", city: "Dayton, OH", tag: "Crown Rebuild", layout: "square" },
  { img: newBoomliftHouse.url, title: "High-Access Chimney Job", city: "Bexley, OH", tag: "Access", layout: "wide" },
  { img: oldTechOnsite.url, title: "On-Site Sweep & Inspect", city: "Westerville, OH", tag: "Inspection", layout: "square" },
  { img: newBoomliftInspect.url, title: "High-Access Inspection", city: "Dublin, OH", tag: "Done", layout: "square" },
  { img: oldLiner.url, title: "Stainless Liner Install", city: "Dayton, OH", tag: "Liner", layout: "square" },
  { img: newTechLadderPoint.url, title: "On-Site Chimney Inspection", city: "Hilliard, OH", tag: "Inspection", layout: "square" },
  { img: oldCapFinished.url, title: "Finished Cap Install", city: "New Albany, OH", tag: "Cap Install", layout: "square" },
  { img: newCrownCapsView.url, title: "Crown Rebuild + Dual Caps", city: "Grove City, OH", tag: "Crown Rebuild", layout: "wide" },
  { img: oldTuckpointing.url, title: "Tuckpointing Restoration", city: "Columbus, OH", tag: "Masonry", layout: "square" },
  { img: newTechFireplace.url, title: "Fireplace Service", city: "German Village, OH", tag: "Fireplace", layout: "square" },
  { img: oldDoubleCrown.url, title: "Double Crown Build", city: "Powell, OH", tag: "Crown", layout: "square" },
  { img: oldFlueBefore.url, title: "Flue Inspection", city: "Clintonville, OH", tag: "Inspection", layout: "wide" },
  { img: oldCrownBefore.url, title: "Crown Before Rebuild", city: "Upper Arlington, OH", tag: "Before", layout: "square" },
];

export function RecentProjects() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-24" id="recent-projects">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-flame">
              ◆ Our Work · Ohio Homes
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              Recent projects from{" "}
              <span className="inline-block rounded-none bg-primary px-2.5 py-0.5 text-primary-foreground">
                our crew
              </span>
              .
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Every photo below is a job we completed this season — no stock images, no AI, no
              fake before/afters. Just the work.
            </p>
          </div>
          <Link
            to="/before-after"
            className="inline-flex items-center gap-2 rounded-none border-2 border-foreground/15 bg-card px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-foreground transition hover:border-flame hover:text-flame"
          >
            See all done projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PROJECTS.map((p, i) => (
            <ProjectTile
              key={`${p.title}-${i}`}
              project={p}
              className={
                p.layout === "feature"
                  ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                  : p.layout === "wide"
                    ? "col-span-2 aspect-[4/3] md:aspect-square"
                    : "aspect-square"
              }
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectTile({
  project,
  className = "",
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      to="/before-after"
      className={`group relative overflow-hidden rounded-none border-2 border-border bg-primary transition hover:border-flame ${className}`}
    >
      <img
        src={project.img}
        alt={`${project.title} — ChimCrew project in ${project.city}`}
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" aria-hidden />
      <figcaption className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <div>
          <span className="inline-flex rounded-full border border-flame/40 bg-primary/70 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-flame backdrop-blur">
            {project.tag}
          </span>
          <p className="mt-1.5 font-display text-sm font-extrabold leading-tight text-primary-foreground md:text-base">
            {project.title}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/70">
            <MapPin className="h-3 w-3" /> {project.city}
          </p>
        </div>
      </figcaption>
    </Link>
  );
}
