import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import projectHero from "@/assets/projects/project-01-double-crown.jpg";
import projectTuckpoint from "@/assets/projects/project-02-tuckpointing-after.jpg";
import projectLiner from "@/assets/projects/project-03-liner-install.jpg";
import projectCap from "@/assets/projects/project-04-cap-install.jpg";
import projectCrownRebuild from "@/assets/projects/project-05-crown-rebuild.jpg";
import projectTech from "@/assets/projects/project-06-tech-onsite.jpg";
import projectCapFinished from "@/assets/projects/project-08-cap-finished.jpg";

const PROJECTS = [
  { img: projectHero, title: "Dual Crown Rebuild + Caps", city: "Columbus, OH", tag: "Crown & Caps" },
  { img: projectTuckpoint, title: "Full Tuckpointing Restoration", city: "Dublin, OH", tag: "Masonry" },
  { img: projectCapFinished, title: "Stainless Cap Install", city: "Westerville, OH", tag: "Cap Install" },
  { img: projectLiner, title: "New Stainless Liner Installed", city: "Cincinnati, OH", tag: "Liner" },
  { img: projectCap, title: "Mesh Cap + Crown Repair", city: "Worthington, OH", tag: "Cap & Crown" },
  { img: projectTech, title: "Waterproof Seal + Cap", city: "Hilliard, OH", tag: "Waterproofing" },
  { img: projectCrownRebuild, title: "Crown Rebuild + Round Cap", city: "Dayton, OH", tag: "Crown Rebuild" },
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
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-none border-2 border-foreground/15 bg-card px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-foreground transition hover:border-flame hover:text-flame"
          >
            See full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <ProjectTile project={PROJECTS[0]} className="col-span-2 row-span-2 aspect-square md:aspect-auto" priority />
          {PROJECTS.slice(1, 5).map((p, i) => (
            <ProjectTile key={i} project={p} className="aspect-square" />
          ))}
          {PROJECTS.slice(5).map((p, i) => (
            <ProjectTile key={`b-${i}`} project={p} className="col-span-2 aspect-[4/3] md:aspect-square" />
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
  project: { img: string; title: string; city: string; tag: string };
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`group relative overflow-hidden rounded-none border-2 border-border bg-primary transition hover:border-flame ${className}`}>
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
    </figure>
  );
}