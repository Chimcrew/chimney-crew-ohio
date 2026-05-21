import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import before from "@/assets/before-chimney.jpg";
import after from "@/assets/after-chimney.jpg";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/before-after")({
  head: () => ({
    meta: [
      { title: "Before & After — Real ChimCrew jobs in Ohio" },
      { name: "description", content: "Drag-to-compare before and after photos from real chimney sweeps and repairs by ChimCrew in Columbus, Cincinnati, and Dayton." },
    ],
  }),
  component: BeforeAfterPage,
});

const JOBS = [
  { city: "Columbus, OH", service: "Sweep + cap install", note: "Heavy creosote, 6 years between cleanings." },
  { city: "Cincinnati, OH", service: "Crown rebuild", note: "Water intrusion from cracked crown — fully rebuilt." },
  { city: "Dayton, OH", service: "Stainless liner install", note: "Old clay liner replaced with insulated stainless." },
];

function BeforeAfterPage() {
  return (
    <>
      <section className="relative border-b-2 border-primary/30 bg-card/40 py-20">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// Before / After</p>
          <h1 className="mt-3 text-6xl md:text-7xl">Drag the slider. <span className="text-flame">See the work.</span></h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Real jobs from Ohio homes. Every project we finish includes
            before-and-after photos delivered to your inbox.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-4 md:px-8">
          {JOBS.map((j, i) => (
            <article key={i}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">{`Job #${1000 + i}`}</p>
                  <h3 className="mt-1 text-3xl md:text-4xl">{j.service}</h3>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{j.city}</p>
                  <p>{j.note}</p>
                </div>
              </div>
              <Compare before={before} after={after} />
            </article>
          ))}
        </div>
      </section>

      <LeadForm />
    </>
  );
}

function Compare({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border-2 border-primary/40 shadow-flame">
      <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img src={before} alt="Before" className="absolute inset-0 h-full w-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} loading="lazy" />
      </div>

      <span className="absolute left-3 top-3 rounded-sm bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest">Before</span>
      <span className="absolute right-3 top-3 rounded-sm bg-primary px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">After</span>

      {/* divider */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-primary" />
        <div className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-primary bg-background font-display text-xs text-primary">
          ⇆
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
