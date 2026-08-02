import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
};

const STAGES: Stage[] = [
  {
    kicker: "Stage 1 · Inspection",
    title: "Every repair starts with a complete inspection.",
    body: "We inspect the chimney from top to bottom to identify visible damage, water entry points, and structural concerns.",
  },
  {
    kicker: "Stage 2 · Diagnosis",
    title: "We identify the source of the problem.",
    body: "Instead of covering visible damage, we determine what is causing it.",
  },
  {
    kicker: "Stage 3 · Existing condition",
    title: "A clear repair plan is created.",
    body: "Each damaged component is reviewed before the restoration begins.",
  },
  {
    kicker: "Stage 4 · Masonry Restoration",
    title: "Masonry Restoration",
    body: "Damaged joints and bricks are repaired to restore strength and stability.",
  },
  {
    kicker: "Stage 5 · Crown Repair",
    title: "Crown Repair",
    body: "A properly built crown helps prevent water from entering the chimney structure.",
  },
  {
    kicker: "Stage 6 · Water Protection",
    title: "Water Protection",
    body: "Flashing and protective sealing help keep water away from vulnerable areas.",
  },
  {
    kicker: "Stage 7 · Cap & final result",
    title: "Restored. Protected. Built to Last.",
    body: "A complete chimney repair should solve the problem, protect the structure, and help prevent future damage.",
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
  const active = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length * 0.999));

  return (
    <section
      ref={sectionRef}
      aria-label="How we restore your chimney"
      className="relative bg-background"
      style={reduced ? undefined : { height: "260vh" }}
    >
      <div className={reduced ? "" : "sticky top-0 flex h-dvh flex-col overflow-hidden"}>
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-28 pt-28 md:px-10 md:pb-10 md:pt-32 lg:px-14">
          {/* Intro */}
          <header className="shrink-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-flame">
              The ChimCrew Process
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-primary md:text-4xl">
              How We Restore Your Chimney
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-foreground/70 md:text-base">
              From the first inspection to the final protective layer, every repair is completed with
              a clear process and attention to every component.
            </p>
          </header>

          {/* Stage grid */}
          <div className="mt-5 grid flex-1 grid-cols-1 items-center gap-5 md:mt-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
            <div className="relative min-h-0 flex-1">
              <ChimneyVisual p={p} reduced={reduced} />
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
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/75 md:text-lg">
          {stage.body}
        </p>
      </div>

      {final && (
        <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
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
   The chimney illustration. All layers are driven by global progress.
------------------------------------------------------------------- */
function ChimneyVisual({ p, reduced }: { p: number; reduced: boolean }) {
  const draw = ramp(p, 0.0, 0.13);          // blueprint line draw
  const model = ramp(p, 0.14, 0.24);        // white solid model
  const blueprintOut = ramp(p, 0.16, 0.28); // blueprint fades
  const markers = ramp(p, 0.16, 0.26) * (1 - ramp(p, 0.36, 0.44)); // diagnosis pins
  const brick = ramp(p, 0.30, 0.42);        // realistic brick
  const damage = ramp(p, 0.32, 0.40);       // worn look in
  const mortarFix = ramp(p, 0.46, 0.58);    // masonry restored
  const crownFix = ramp(p, 0.60, 0.71);     // crown rebuilt
  const flashing = ramp(p, 0.73, 0.84);     // flashing + seal
  const cap = ramp(p, 0.86, 0.95);          // cap lowers
  const tilt = ramp(p, 0.86, 1) * 12;
  const wear = (1 - mortarFix) * damage;

  const bricks = useMemo(() => {
    const rows: { x: number; y: number; w: number }[] = [];
    for (let r = 0; r < 16; r++) {
      const y = 156 + r * 20;
      const offset = r % 2 === 0 ? 0 : -22;
      for (let c = -1; c < 4; c++) {
        rows.push({ x: 140 + offset + c * 44, y, w: 42 });
      }
    }
    return rows;
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 400 520"
        className="h-full max-h-[38dvh] w-full md:max-h-[54dvh]"
        role="img"
        aria-label="Illustration of a chimney being inspected, repaired and capped"
        style={{
          transform: reduced ? undefined : `perspective(1200px) rotateY(${tilt}deg)`,
          transition: "transform 300ms linear",
        }}
      >
        <defs>
          <clipPath id="cr-body">
            <rect x="140" y="150" width="120" height="330" />
          </clipPath>
        </defs>

        {/* roof plane */}
        <polygon
          points="10,520 200,404 390,520"
          fill="oklch(0.92 0.005 250)"
          opacity={0.35 + 0.5 * model}
        />
        <line x1="10" y1="520" x2="200" y2="404" stroke="oklch(0.78 0.01 250)" strokeWidth="2" />
        <line x1="390" y1="520" x2="200" y2="404" stroke="oklch(0.78 0.01 250)" strokeWidth="2" />

        {/* ---------- blueprint sketch ---------- */}
        <g
          stroke="oklch(0.55 0.09 250)"
          strokeWidth="1.6"
          fill="none"
          opacity={(0.15 + 0.85 * draw) * (1 - blueprintOut)}
          strokeDasharray="1400"
          strokeDashoffset={1400 * (1 - draw)}
        >
          <rect x="140" y="150" width="120" height="330" />
          <rect x="128" y="130" width="144" height="20" />
          <rect x="178" y="96" width="44" height="34" />
          <line x1="100" y1="150" x2="300" y2="150" strokeDasharray="6 6" strokeDashoffset="0" />
          <line x1="100" y1="480" x2="300" y2="480" strokeDasharray="6 6" strokeDashoffset="0" />
          <line x1="112" y1="150" x2="112" y2="480" strokeDasharray="6 6" strokeDashoffset="0" />
        </g>

        {/* ---------- solid white model ---------- */}
        <g opacity={model}>
          <rect x="140" y="150" width="120" height="330" fill="oklch(0.98 0 0)" />
          <rect x="140" y="150" width="120" height="330" fill="none" stroke="oklch(0.82 0.01 250)" strokeWidth="2" />
          <rect x="128" y="130" width="144" height="20" fill="oklch(0.95 0 0)" stroke="oklch(0.82 0.01 250)" strokeWidth="2" />
          <rect x="178" y="96" width="44" height="34" fill="oklch(0.93 0 0)" stroke="oklch(0.82 0.01 250)" strokeWidth="2" />
        </g>

        {/* ---------- realistic brick ---------- */}
        <g opacity={brick} clipPath="url(#cr-body)">
          <rect x="140" y="150" width="120" height="330" fill="oklch(0.52 0.09 40)" />
          {bricks.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={16}
              rx="1.5"
              fill={i % 3 === 0 ? "oklch(0.55 0.10 38)" : i % 4 === 0 ? "oklch(0.48 0.09 34)" : "oklch(0.52 0.095 40)"}
              stroke={`oklch(${0.86 - 0.2 * wear} 0.01 80)`}
              strokeWidth={1.6 - 0.7 * wear}
              opacity={1 - 0.12 * wear * ((i % 5) / 5)}
            />
          ))}
          {/* worn joints */}
          <g opacity={wear} stroke="oklch(0.34 0.03 40)" strokeWidth="3" strokeLinecap="round">
            <line x1="150" y1="214" x2="196" y2="214" />
            <line x1="206" y1="294" x2="252" y2="294" />
            <line x1="160" y1="372" x2="200" y2="372" />
          </g>
          {/* subtle shading */}
          <rect x="236" y="150" width="24" height="330" fill="oklch(0 0 0)" opacity="0.10" />
        </g>

        {/* ---------- crown: damaged -> rebuilt ---------- */}
        <g opacity={brick}>
          <rect
            x="128"
            y="130"
            width="144"
            height="20"
            fill={`oklch(${0.72 + 0.2 * crownFix} 0.008 250)`}
          />
          {/* crack on old crown */}
          <path
            d="M170 132 l6 8 l-5 8"
            stroke="oklch(0.35 0.02 250)"
            strokeWidth="2.5"
            fill="none"
            opacity={wear * (1 - crownFix)}
          />
          {/* new sloped crown forming */}
          <polygon
            points="124,130 276,130 262,116 138,116"
            fill="oklch(0.9 0.006 250)"
            opacity={crownFix}
          />
          <line
            x1="124"
            y1="130"
            x2="276"
            y2="130"
            stroke="oklch(0.75 0.01 250)"
            strokeWidth="2"
            opacity={crownFix}
          />
        </g>

        {/* flue */}
        <rect x="178" y="96" width="44" height="34" fill="oklch(0.42 0.02 60)" opacity={brick} />

        {/* ---------- flashing + waterproof sheen ---------- */}
        <g opacity={flashing}>
          <polygon points="128,468 272,468 286,492 114,492" fill="oklch(0.72 0.02 250)" />
          <polygon points="128,468 272,468 272,476 128,476" fill="oklch(0.82 0.02 250)" />
          <rect
            x="140"
            y="150"
            width="120"
            height="330"
            fill="oklch(0.95 0.02 220)"
            opacity={0.1 * flashing}
          />
        </g>

        {/* ---------- stainless cap lowering ---------- */}
        <g opacity={cap} transform={`translate(0 ${-70 * (1 - cap)})`}>
          <rect x="162" y="64" width="76" height="9" rx="2" fill="oklch(0.78 0.01 250)" />
          <rect x="170" y="73" width="6" height="24" fill="oklch(0.7 0.01 250)" />
          <rect x="224" y="73" width="6" height="24" fill="oklch(0.7 0.01 250)" />
          <rect x="176" y="76" width="48" height="20" fill="oklch(0.6 0.01 250)" opacity="0.5" />
        </g>

        {/* ---------- diagnosis markers ---------- */}
        <g opacity={markers}>
          {[
            { x: 272, y: 128, label: "Crown" },
            { x: 236, y: 96, label: "Cap" },
            { x: 118, y: 240, label: "Mortar" },
            { x: 286, y: 300, label: "Flue" },
            { x: 104, y: 470, label: "Flashing" },
          ].map((m) => (
            <g key={m.label}>
              <circle cx={m.x} cy={m.y} r="7" fill="none" stroke="var(--flame)" strokeWidth="2.5" />
              <circle cx={m.x} cy={m.y} r="2.5" fill="var(--flame)" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default ChimneyRestorationProcess;
