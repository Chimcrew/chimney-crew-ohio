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

  /* deterministic pseudo-random so the wall looks natural but never re-shuffles */
  const rnd = (i: number) => {
    const s = Math.sin(i * 12.9898) * 43758.5453;
    return Math.round((s - Math.floor(s)) * 1000) / 1000;
  };

  // front face: x 140..252 ; right return face: x 252..276 (perspective)
  const bricks = useMemo(() => {
    const out: { x: number; y: number; w: number; h: number; t: number }[] = [];
    const H = 19;
    for (let r = 0; r < 18; r++) {
      const y = 152 + r * H;
      const offset = r % 2 === 0 ? 0 : -28;
      for (let c = -1; c < 3; c++) {
        out.push({ x: 140 + offset + c * 56, y, w: 53, h: H - 3.4, t: rnd(r * 7 + c * 3 + 1) });
      }
    }
    return out;
  }, []);

  const sideBricks = useMemo(() => {
    const out: { y: number; t: number }[] = [];
    for (let r = 0; r < 18; r++) out.push({ y: 152 + r * 19, t: rnd(r * 3.7 + 91) });
    return out;
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 400 520"
        className="h-full max-h-[24dvh] w-full md:max-h-[54dvh]"
        role="img"
        aria-label="Illustration of a chimney being inspected, repaired and capped"
        style={{
          transform: reduced ? undefined : `perspective(1200px) rotateY(${tilt}deg)`,
          transition: "transform 300ms linear",
        }}
      >
        <defs>
          {/* the front face stops exactly on the roof plane */}
          <clipPath id="cr-front">
            <polygon points="140,150 252,150 252,457 140,408" />
          </clipPath>
          <clipPath id="cr-side">
            <polygon points="252,150 276,162 276,468 252,457" />
          </clipPath>
          {/* fine grain that makes flat fills read as fired clay */}
          <filter id="cr-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="n" />
            <feColorMatrix in="n" type="saturate" values="0" result="g" />
            <feComponentTransfer in="g" result="g2">
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feComposite in="g2" in2="SourceAlpha" operator="in" />
          </filter>
          {/* mortar bed behind the bricks */}
          <linearGradient id="cr-mortar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.80 0.012 80)" />
            <stop offset="100%" stopColor="oklch(0.70 0.012 80)" />
          </linearGradient>
          {/* light wraps the front face left-to-right */}
          <linearGradient id="cr-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.16" />
            <stop offset="42%" stopColor="oklch(1 0 0)" stopOpacity="0.02" />
            <stop offset="100%" stopColor="oklch(0 0 0)" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="cr-steel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.62 0.008 250)" />
            <stop offset="22%" stopColor="oklch(0.92 0.004 250)" />
            <stop offset="46%" stopColor="oklch(0.70 0.008 250)" />
            <stop offset="72%" stopColor="oklch(0.95 0.004 250)" />
            <stop offset="100%" stopColor="oklch(0.58 0.01 250)" />
          </linearGradient>
          <linearGradient id="cr-crown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.93 0.004 250)" />
            <stop offset="100%" stopColor="oklch(0.78 0.006 250)" />
          </linearGradient>
          <linearGradient id="cr-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.012 250)" />
            <stop offset="100%" stopColor="oklch(0.38 0.012 250)" />
          </linearGradient>
          <radialGradient id="cr-ao" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="oklch(0 0 0)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0 0 0)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ---------------- roof ---------------- */}
        <g opacity={0.35 + 0.65 * model}>
          {/* peak is off to the left so the chimney lands cleanly on one slope */}
          <polygon points="6,520 96,388 394,520" fill="url(#cr-roof)" />
          {/* shingle courses running parallel to the eave */}
          <g opacity="0.9">
            {Array.from({ length: 11 }).map((_, i) => {
              const t = (i + 1) / 12;
              const y = 388 + Math.pow(t, 1.25) * 132;
              const xl = 96 - (y - 388) * (90 / 132);
              const xr = 96 + (y - 388) * (298 / 132);
              return (
                <g key={i}>
                  <line x1={xl} y1={y} x2={xr} y2={y} stroke="oklch(0.28 0.01 250)" strokeWidth="1.6" opacity="0.55" />
                  <line x1={xl} y1={y + 2} x2={xr} y2={y + 2} stroke="oklch(0.72 0.01 250)" strokeWidth="1" opacity="0.22" />
                </g>
              );
            })}
          </g>
          {/* hips */}
          <line x1="6" y1="520" x2="96" y2="388" stroke="oklch(0.30 0.01 250)" strokeWidth="2.4" />
          <line x1="394" y1="520" x2="96" y2="388" stroke="oklch(0.30 0.01 250)" strokeWidth="2.4" />
          {/* chimney shadow cast down-slope on the roof */}
          <polygon
            points="140,408 252,457 276,468 236,492 120,436"
            fill="oklch(0 0 0)"
            opacity={0.2 * brick}
          />
        </g>

        {/* ---------- blueprint sketch ---------- */}
        <g
          stroke="oklch(0.55 0.09 250)"
          strokeWidth="1.6"
          fill="none"
          opacity={(0.15 + 0.85 * draw) * (1 - blueprintOut)}
          strokeDasharray="1400"
          strokeDashoffset={1400 * (1 - draw)}
        >
          <polygon points="140,150 252,150 252,457 140,408" />
          <polygon points="252,150 276,162 276,468 252,457" />
          <rect x="128" y="130" width="148" height="20" />
          <rect x="178" y="94" width="44" height="36" />
          <line x1="100" y1="150" x2="300" y2="150" strokeDasharray="6 6" strokeDashoffset="0" />
          <line x1="100" y1="432" x2="300" y2="432" strokeDasharray="6 6" strokeDashoffset="0" />
          <line x1="112" y1="150" x2="112" y2="432" strokeDasharray="6 6" strokeDashoffset="0" />
        </g>

        {/* ---------- solid white model ---------- */}
        <g opacity={model * (1 - brick)}>
          <polygon points="140,150 252,150 252,457 140,408" fill="oklch(0.98 0 0)" />
          <polygon points="252,150 276,162 276,468 252,457" fill="oklch(0.90 0 0)" />
          <polygon points="140,150 252,150 252,457 140,408" fill="none" stroke="oklch(0.82 0.01 250)" strokeWidth="1.6" />
          <rect x="128" y="130" width="148" height="20" fill="oklch(0.95 0 0)" stroke="oklch(0.82 0.01 250)" strokeWidth="1.6" />
          <rect x="178" y="94" width="44" height="36" fill="oklch(0.93 0 0)" stroke="oklch(0.82 0.01 250)" strokeWidth="1.6" />
        </g>

        {/* ---------- masonry: front face ---------- */}
        <g opacity={brick}>
          <g clipPath="url(#cr-front)">
            <rect x="140" y="150" width="112" height="330" fill="url(#cr-mortar)" />
            {bricks.map((b, i) => {
              const t = b.t;
              const r3 = (n: number) => Math.round(n * 1000) / 1000;
              const l = r3(0.44 + t * 0.12 - 0.03 * wear);
              const c = r3(0.075 + t * 0.045);
              const h = r3(30 + t * 16);
              return (
                <g key={i}>
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    rx="1"
                    fill={`oklch(${l} ${c} ${h})`}
                  />
                  {/* top highlight + bottom shade give each brick thickness */}
                  <rect x={b.x} y={b.y} width={b.w} height="1.6" fill="oklch(1 0 0)" opacity="0.16" />
                  <rect
                    x={b.x}
                    y={b.y + b.h - 1.8}
                    width={b.w}
                    height="1.8"
                    fill="oklch(0 0 0)"
                    opacity="0.22"
                  />
                </g>
              );
            })}
            {/* clay grain */}
            <rect
              x="140"
              y="150"
              width="112"
              height="330"
              filter="url(#cr-grain)"
              fill="oklch(0.3 0.04 40)"
              opacity="0.30"
            />
            {/* eroded joints + a hairline crack while worn */}
            <g opacity={wear}>
              <g stroke="oklch(0.30 0.03 40)" strokeWidth="3.4" strokeLinecap="round" opacity="0.85">
                <line x1="146" y1="209" x2="196" y2="209" />
                <line x1="200" y1="285" x2="248" y2="285" />
                <line x1="158" y1="361" x2="204" y2="361" />
                <line x1="176" y1="437" x2="230" y2="437" />
              </g>
              <path
                d="M186 168 l-7 22 l9 18 l-6 20"
                fill="none"
                stroke="oklch(0.28 0.02 40)"
                strokeWidth="2"
                opacity="0.7"
              />
              {/* water staining */}
              <rect x="140" y="150" width="112" height="150" fill="oklch(0.35 0.02 120)" opacity="0.14" />
            </g>
            {/* fresh tuckpointed joints after restoration */}
            <g opacity={mortarFix * damage} stroke="oklch(0.86 0.012 80)" strokeWidth="3" strokeLinecap="round">
              <line x1="146" y1="209" x2="196" y2="209" />
              <line x1="200" y1="285" x2="248" y2="285" />
              <line x1="158" y1="361" x2="204" y2="361" />
              <line x1="176" y1="437" x2="230" y2="437" />
            </g>
            {/* directional light */}
            <rect x="140" y="150" width="112" height="330" fill="url(#cr-light)" />
            <rect x="140" y="420" width="112" height="60" fill="url(#cr-ao)" />
          </g>

          {/* ---------- masonry: shaded return face ---------- */}
          <g clipPath="url(#cr-side)">
            <polygon points="252,150 276,162 276,468 252,457" fill="oklch(0.42 0.075 38)" />
            {sideBricks.map((b, i) => (
              <line
                key={i}
                x1="252"
                y1={b.y + 6}
                x2="276"
                y2={b.y + 16}
                stroke="oklch(0.62 0.012 80)"
                strokeWidth="1.4"
                opacity={Math.round((0.5 + b.t * 0.3) * 1000) / 1000}
              />
            ))}
            <polygon
              points="252,150 276,162 276,468 252,457"
              filter="url(#cr-grain)"
              fill="oklch(0.25 0.03 40)"
              opacity="0.3"
            />
            <polygon points="252,150 276,162 276,468 252,457" fill="oklch(0 0 0)" opacity="0.28" />
          </g>
          <line x1="252" y1="150" x2="252" y2="457" stroke="oklch(0 0 0)" strokeWidth="1.2" opacity="0.35" />
        </g>

        {/* ---------- crown: damaged -> rebuilt ---------- */}
        <g opacity={brick}>
          {/* old flat concrete crown */}
          <g opacity={1 - crownFix}>
            <rect x="128" y="130" width="148" height="20" fill="oklch(0.74 0.008 250)" />
            <rect x="128" y="130" width="148" height="3" fill="oklch(0.88 0.004 250)" />
            <rect x="128" y="146" width="148" height="4" fill="oklch(0 0 0)" opacity="0.2" />
            <path
              d="M168 131 l7 9 l-6 9"
              stroke="oklch(0.32 0.02 250)"
              strokeWidth="2.6"
              fill="none"
              opacity={wear}
            />
            <path
              d="M226 131 l-5 8 l6 10"
              stroke="oklch(0.32 0.02 250)"
              strokeWidth="2"
              fill="none"
              opacity={wear * 0.8}
            />
          </g>
          {/* rebuilt sloped crown with drip edge */}
          <g opacity={crownFix}>
            <polygon points="122,134 282,134 268,112 136,112" fill="url(#cr-crown)" />
            <polygon points="122,134 282,134 282,142 122,142" fill="oklch(0.70 0.008 250)" />
            <polygon points="136,112 268,112 268,115 136,115" fill="oklch(1 0 0)" opacity="0.5" />
            <line x1="122" y1="142" x2="282" y2="142" stroke="oklch(0 0 0)" strokeWidth="1.6" opacity="0.25" />
          </g>
        </g>

        {/* ---------- clay flue tile ---------- */}
        <g opacity={brick}>
          <rect x="178" y="94" width="44" height="40" fill="oklch(0.46 0.05 55)" />
          <rect x="178" y="94" width="44" height="5" fill="oklch(0.30 0.03 55)" />
          <rect x="182" y="99" width="36" height="35" fill="oklch(0.22 0.02 55)" opacity="0.55" />
          <rect x="178" y="94" width="8" height="40" fill="oklch(1 0 0)" opacity="0.10" />
          <rect x="214" y="94" width="8" height="40" fill="oklch(0 0 0)" opacity="0.16" />
        </g>

        {/* ---------- flashing + waterproof sheen ---------- */}
        <g opacity={flashing}>
          {/* step flashing along the roof line */}
          <polygon points="132,462 260,462 292,486 112,486" fill="oklch(0.66 0.012 250)" />
          <polygon points="132,462 260,462 260,470 132,470" fill="oklch(0.86 0.008 250)" />
          <g stroke="oklch(0.45 0.01 250)" strokeWidth="1" opacity="0.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={126 + i * 30} y1="486" x2={134 + i * 28} y2="462" />
            ))}
          </g>
          {/* counter-flashing tucked into the joint */}
          <rect x="134" y="452" width="126" height="8" fill="oklch(0.78 0.008 250)" />
          <rect x="134" y="452" width="126" height="2" fill="oklch(1 0 0)" opacity="0.4" />
          {/* sealer sheen */}
          <rect
            x="140"
            y="150"
            width="112"
            height="330"
            fill="oklch(0.95 0.02 220)"
            opacity={0.1 * flashing}
          />
        </g>

        {/* ---------- stainless cap lowering ---------- */}
        <g opacity={cap} transform={`translate(0 ${-70 * (1 - cap)})`}>
          <rect x="158" y="58" width="84" height="8" rx="2" fill="url(#cr-steel)" />
          <rect x="158" y="66" width="84" height="3" fill="oklch(0 0 0)" opacity="0.22" />
          {/* mesh */}
          <rect x="172" y="69" width="56" height="26" fill="oklch(0.30 0.006 250)" opacity="0.55" />
          <g stroke="oklch(0.80 0.006 250)" strokeWidth="0.8" opacity="0.65">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={`v${i}`} x1={174 + i * 9} y1="69" x2={174 + i * 9} y2="95" />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <line key={`h${i}`} x1="172" y1={73 + i * 7} x2="228" y2={73 + i * 7} />
            ))}
          </g>
          {/* legs */}
          <rect x="170" y="69" width="5" height="27" fill="url(#cr-steel)" />
          <rect x="225" y="69" width="5" height="27" fill="url(#cr-steel)" />
        </g>

        {/* ---------- diagnosis markers ---------- */}
        <g opacity={markers}>
          {[
            { x: 282, y: 126 },
            { x: 234, y: 92 },
            { x: 120, y: 236 },
            { x: 292, y: 300 },
            { x: 106, y: 466 },
          ].map((m, i) => (
            <g key={i}>
              <circle cx={m.x} cy={m.y} r="10" fill="var(--flame)" opacity="0.16" />
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
