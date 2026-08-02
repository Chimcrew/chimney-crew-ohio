import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import photoInspect from "@/assets/team-jobs/tech-rooftop-ladder.jpeg.asset.json";
import photoDiagnose from "@/assets/uploads2/crown-severely-damaged.jpeg.asset.json";
import photoCondition from "@/assets/uploads2/crown-damaged-open-before.jpeg.asset.json";
import photoMasonry from "@/assets/uploads4/tech-tuckpointing-brick.jpeg.asset.json";
import photoCrown from "@/assets/uploads2/crown-parge-side-fresh.jpeg.asset.json";
import photoFlashing from "@/assets/process/flashing-after.jpeg.asset.json";
import photoCap from "@/assets/uploads2/brick-chimney-white-crown-cap.jpeg.asset.json";


/* ------------------------------------------------------------------
   Scroll-driven chimney restoration explainer.
   - No scroll hijacking: the section is a tall block with a sticky
     stage inside. Native scrolling only, progress read from rect.
   - Pure inline SVG (no 3D runtime, no model download) => zero extra
     network weight, no layout shift, smooth on mid-range mobile.
   - prefers-reduced-motion => static finished chimney + plain stages.
------------------------------------------------------------------- */

type Stage = {
  kicker: string;
  title: string;
  body: string;
  photo: string;
  alt: string;
};

const STAGES: Stage[] = [
  {
    kicker: "Stage 1 · Inspection",
    title: "Every repair starts with a complete inspection.",
    body: "We inspect the chimney from top to bottom to identify visible damage, water entry points, and structural concerns.",
    photo: photoInspect.url,
    alt: "ChimCrew technician climbing a ladder to inspect a rooftop chimney",
  },
  {
    kicker: "Stage 2 · Diagnosis",
    title: "We identify the source of the problem.",
    body: "Instead of covering visible damage, we determine what is causing it.",
    photo: photoDiagnose.url,
    alt: "Severely damaged chimney crown with cracked concrete and open joints",
  },
  {
    kicker: "Stage 3 · Existing condition",
    title: "A clear repair plan is created.",
    body: "Each damaged component is reviewed before the restoration begins.",
    photo: photoCondition.url,
    alt: "Deteriorated chimney crown and flue opening before restoration",
  },
  {
    kicker: "Stage 4 · Masonry Restoration",
    title: "Masonry Restoration",
    body: "Damaged joints and bricks are repaired to restore strength and stability.",
    photo: photoMasonry.url,
    alt: "Technician tuckpointing brick chimney joints with fresh mortar",
  },
  {
    kicker: "Stage 5 · Crown Repair",
    title: "Crown Repair",
    body: "A properly built crown helps prevent water from entering the chimney structure.",
    photo: photoCrown.url,
    alt: "Freshly parged and sloped chimney crown after rebuild",
  },
  {
    kicker: "Stage 6 · Water Protection",
    title: "Water Protection",
    body: "Flashing and protective sealing help keep water away from vulnerable areas.",
    photo: photoFlashing.url,
    alt: "New chimney flashing sealed against the roofline",
  },
  {
    kicker: "Stage 7 · Cap & final result",
    title: "Restored. Protected. Built to Last.",
    body: "A complete chimney repair should solve the problem, protect the structure, and help prevent future damage.",
    photo: photoCap.url,
    alt: "Restored brick chimney with white crown and new stainless cap",
  },
];

const CHECKS = [
  "Inspection Complete",
  "Masonry Restored",
  "Crown Protected",
  "Flashing Sealed",
  "Chimney Cap Installed",
];

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
/** normalized 0..1 ramp between two global progress points */
const ramp = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export function ChimneyRestorationProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  /* pause all work while offscreen */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setVisible(e.some((x) => x.isIntersecting)), {
      rootMargin: "10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return setProgress(1);
      setProgress(clamp01(-rect.top / span));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [visible, reduced]);

  const p = reduced ? 1 : progress;
  const collapsed = !reduced && p > 0.02;
  const active = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length * 0.999));

  return (
    <section
      ref={sectionRef}
      aria-label="How we restore your chimney"
      className="relative bg-background"
      style={reduced ? undefined : { height: "260vh" }}
    >
      <div className={reduced ? "" : "sticky top-0 flex h-dvh flex-col overflow-hidden"}>
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-32 pt-32 md:px-10 md:pb-10 md:pt-32 lg:px-14">
          {/* Intro */}
          <header className="shrink-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-flame">
              The ChimCrew Process
            </p>
            <h2
              className={`mt-2 font-display font-extrabold leading-tight text-primary md:text-4xl ${
                collapsed ? "text-lg" : "text-2xl"
              }`}
            >
              How We Restore Your Chimney
            </h2>
            <p
              className={`mt-2 max-w-2xl text-xs text-foreground/70 md:text-base ${
                collapsed ? "hidden md:block" : ""
              }`}
            >
              From the first inspection to the final protective layer, every repair is completed with
              a clear process and attention to every component.
            </p>
          </header>

          {/* Stage grid */}
          <div className="mt-4 grid flex-1 md:mt-8 grid-cols-1 items-center gap-5 md:mt-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
            <div className="relative min-h-0 flex-1">
              <PhotoStage active={active} p={p} reduced={reduced} />
            </div>

            {reduced ? (
              <ol className="space-y-6">
                {STAGES.map((s) => (
                  <li key={s.title}>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-flame">
                      {s.kicker}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-primary">{s.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{s.body}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <StageCopy active={active} p={p} />
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 flex shrink-0 flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/before-after"
              className="story-link self-start text-sm font-semibold text-primary underline-offset-4"
            >
              See Our Recent Projects
            </Link>
            <Button
              asChild
              size="lg"
              className="min-h-12 w-full rounded-none bg-flame text-primary hover:bg-flame/90 sm:w-fit"
            >
              <Link to="/schedule">
                Get Your Free Estimate
                <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageCopy({ active, p }: { active: number; p: number }) {
  const stage = STAGES[active];
  const final = active === STAGES.length - 1;
  return (
    <div className="relative">
      {/* progress rail */}
      <div className="mb-4 flex items-center gap-1.5" aria-hidden>
        {STAGES.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 transition-colors duration-500 ${
              i <= active ? "bg-flame" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div key={active} className="animate-fade-in">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-flame md:text-[11px]">
          {stage.kicker}
        </p>
        <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-primary md:text-3xl">
          {stage.title}
        </h3>
        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-foreground/75 md:text-lg">
          {stage.body}
        </p>
      </div>

      {final && (
        <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
          {CHECKS.map((c, i) => {
            const shown = p > 0.87 + i * 0.02;
            return (
              <li
                key={c}
                className={`flex items-center gap-2 text-xs font-semibold text-primary transition-all duration-500 md:text-sm ${
                  shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-flame text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {c}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Real job photography, cross-faded as the stage changes.
------------------------------------------------------------------- */
function PhotoStage({ active, p, reduced }: { active: number; p: number; reduced: boolean }) {
  const local = clamp01(p * STAGES.length - active); // 0..1 within the active stage

  return (
    <div className="relative h-full min-h-[180px] w-full overflow-hidden bg-primary md:min-h-[320px]">
      {STAGES.map((s, i) => {
        const on = i === active;
        return (
          <img
            key={s.title}
            src={s.photo}
            alt={s.alt}
            loading={i < 2 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{
              opacity: on ? 1 : 0,
              transform: reduced || !on ? undefined : `scale(${1.06 + local * 0.06})`,
              transition: "opacity 700ms ease-out, transform 200ms linear",
            }}
          />
        );
      })}

      {/* cinematic grade so the copy stays readable over any photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:linear-gradient(180deg,oklch(0_0_0/0.35)_0%,transparent_35%,transparent_55%,oklch(0_0_0/0.6)_100%)]"
      />

      {/* stage counter */}
      <div className="absolute left-0 top-0 flex items-center gap-2 bg-flame px-3 py-1.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
          {String(active + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
        </span>
      </div>

      {/* caption */}
      <p className="absolute bottom-0 left-0 right-0 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/85 md:text-[10px]">
        Real ChimCrew job · Columbus, OH
      </p>

      {/* progress within the stage */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[3px] bg-flame transition-[width] duration-150"
        style={{ width: `${(reduced ? 1 : local) * 100}%` }}
      />
    </div>
  );
}

export default ChimneyRestorationProcess;
