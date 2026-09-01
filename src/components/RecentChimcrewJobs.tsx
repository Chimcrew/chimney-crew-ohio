import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/Photo";

import j1b from "@/assets/jobs/job1-before.jpeg.asset.json";
import j1a from "@/assets/jobs/job1-after.jpeg.asset.json";
import j2b from "@/assets/jobs/job2-before.jpeg.asset.json";
import j2a from "@/assets/jobs/job2-after.jpeg.asset.json";
import j3b from "@/assets/jobs/job3-before.jpeg.asset.json";
import j3a from "@/assets/jobs/job3-after.jpeg.asset.json";
import j4b from "@/assets/jobs/job4-before.jpeg.asset.json";
import j4a from "@/assets/jobs/job4-after.jpeg.asset.json";
import j5b from "@/assets/jobs/job5-before.jpeg.asset.json";
import j5a from "@/assets/jobs/job5-after.jpeg.asset.json";
import j6b from "@/assets/jobs/job6-before.jpeg.asset.json";
import j6a from "@/assets/jobs/job6-after.jpeg.asset.json";

const JOBS = [
  { title: "Crown & top rebuild", city: "Columbus, OH", before: j1b.url, after: j1a.url },
  { title: "Crown rebuild + new cap", city: "Westerville, OH", before: j2b.url, after: j2a.url },
  { title: "Full chimney rebuild", city: "Dublin, OH", before: j3b.url, after: j3a.url },
  { title: "Rebuild & flashing", city: "Hilliard, OH", before: j4b.url, after: j4a.url },
  { title: "Chase to brick rebuild", city: "Gahanna, OH", before: j5b.url, after: j5a.url },
  { title: "Chase cover & cap replacement", city: "Delaware, OH", before: j6b.url, after: j6a.url },
];

function JobCard({ job }: { job: (typeof JOBS)[number] }) {
  return (
    <article className="w-[248px] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-card sm:w-auto">
      <div className="grid grid-cols-2">
        {(["before", "after"] as const).map((k) => (
          <div key={k} className="relative aspect-[3/4] overflow-hidden">
            <Photo
              src={job[k]}
              alt={`${job.title} ${k} — ChimCrew ${job.city}`}
              loading="lazy"
              decoding="async"
              // Six cards across on md+, each split into a before/after pair;
              // a horizontal snap carousel at ~45vw per card below that.
              sizes="(min-width: 768px) 9vw, 23vw"
              className="h-full w-full object-cover"
            />
            <span
              className={`absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                k === "before"
                  ? "bg-foreground/80 text-background"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {k}
            </span>
          </div>
        ))}
      </div>
      <div className="px-2.5 py-2">
        <p className="truncate text-xs font-semibold text-foreground">{job.title}</p>
        <p className="truncate text-[11px] text-muted-foreground">{job.city}</p>
      </div>
    </article>
  );
}

export function RecentChimcrewJobs() {
  return (
    <section className="border-b border-border bg-background py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              Before &amp; After
            </p>
            <h2 className="truncate text-lg font-extrabold text-foreground sm:text-2xl">
              Recent Projects
            </h2>
          </div>
          <Link
            to="/before-after"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </header>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
          {JOBS.map((job) => (
            <JobCard key={job.title} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}