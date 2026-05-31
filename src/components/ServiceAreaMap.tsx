// Editorial-style service-area map for ChimCrew.
// Topographic rings, real geographic proportions, refined typography.

type City = {
  name: string;
  cx: number;
  cy: number;
  primary?: boolean;
  // text anchor offset
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "middle" | "end";
};

// Approximate Columbus-metro geographic layout (north is up)
const cities: City[] = [
  { name: "Columbus",    cx: 460, cy: 320, primary: true, labelDy: 32, labelAnchor: "middle" },
  { name: "Powell",      cx: 405, cy: 165, labelDy: -16, labelAnchor: "middle" },
  { name: "Westerville", cx: 555, cy: 215, labelDx: 14, labelDy: 4, labelAnchor: "start" },
  { name: "Worthington", cx: 480, cy: 235, labelDx: 14, labelDy: 4, labelAnchor: "start" },
  { name: "Dublin",      cx: 330, cy: 245, labelDx: -14, labelDy: 4, labelAnchor: "end" },
  { name: "Hilliard",    cx: 320, cy: 320, labelDx: -14, labelDy: 4, labelAnchor: "end" },
  { name: "Grove City",  cx: 395, cy: 425, labelDy: 28, labelAnchor: "middle" },
];

export function ServiceAreaMap() {
  const center = cities[0];
  const rings = [70, 130, 195, 260];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-[oklch(0.985_0.008_85)] shadow-sm">
      <svg
        viewBox="0 0 800 560"
        className="block h-auto w-full"
        role="img"
        aria-label="ChimCrew service area: Columbus, Dublin, Hilliard, Grove City, Westerville, Powell, and Worthington, Ohio"
      >
        <defs>
          <radialGradient id="mapVignette" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0" />
            <stop offset="80%" stopColor="oklch(0.92 0.02 70)" stopOpacity="0" />
            <stop offset="100%" stopColor="oklch(0.85 0.03 60)" stopOpacity="0.5" />
          </radialGradient>

          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.22 42)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="oklch(0.65 0.22 42)" stopOpacity="0" />
          </radialGradient>

          <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="oklch(0.22 0.04 45 / 0.10)" />
          </pattern>

          <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
            <feOffset dx="0" dy="2" result="off" />
            <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* base */}
        <rect width="800" height="560" fill="oklch(0.985 0.008 85)" />
        <rect width="800" height="560" fill="url(#dotgrid)" />

        {/* concentric topographic rings — service radius made visible */}
        <g fill="none" stroke="oklch(0.58 0.21 35)" strokeOpacity="0.18">
          {rings.map((r, i) => (
            <circle
              key={r}
              cx={center.cx}
              cy={center.cy}
              r={r}
              strokeWidth={i === rings.length - 1 ? 1.4 : 1}
              strokeDasharray={i === 0 ? "0" : "2 6"}
            />
          ))}
        </g>

        {/* warm glow at the core */}
        <circle cx={center.cx} cy={center.cy} r="260" fill="url(#coreGlow)" />

        {/* I-270 stylized outerbelt */}
        <ellipse
          cx={center.cx}
          cy={center.cy}
          rx="180"
          ry="145"
          fill="none"
          stroke="oklch(0.58 0.21 35 / 0.55)"
          strokeWidth="1.6"
        />

        {/* compass mark — N */}
        <g transform="translate(740 70)" fontFamily="Geist, Inter, system-ui, sans-serif">
          <circle r="22" fill="none" stroke="oklch(0.22 0.04 45 / 0.35)" strokeWidth="1" />
          <path d="M0 -14 L5 6 L0 2 L-5 6 Z" fill="oklch(0.58 0.21 35)" />
          <text y="-26" textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="2" fill="oklch(0.22 0.04 45 / 0.7)">N</text>
        </g>

        {/* scale bar */}
        <g transform="translate(60 510)" fontFamily="Geist, Inter, system-ui, sans-serif">
          <line x1="0" y1="0" x2="120" y2="0" stroke="oklch(0.22 0.04 45 / 0.6)" strokeWidth="1.5" />
          <line x1="0"   y1="-4" x2="0"   y2="4" stroke="oklch(0.22 0.04 45 / 0.6)" strokeWidth="1.5" />
          <line x1="60"  y1="-3" x2="60"  y2="3" stroke="oklch(0.22 0.04 45 / 0.6)" strokeWidth="1.5" />
          <line x1="120" y1="-4" x2="120" y2="4" stroke="oklch(0.22 0.04 45 / 0.6)" strokeWidth="1.5" />
          <text y="18" fontSize="10" letterSpacing="1.5" fill="oklch(0.22 0.04 45 / 0.65)" fontWeight="500">0      5      10 MI</text>
        </g>

        {/* coordinate label */}
        <text x="60" y="60" fontFamily="Geist, Inter, system-ui, sans-serif" fontSize="10" letterSpacing="2" fontWeight="600" fill="oklch(0.22 0.04 45 / 0.55)">
          39.96° N  ·  82.99° W
        </text>
        <text x="60" y="78" fontFamily="Geist, Inter, system-ui, sans-serif" fontSize="10" letterSpacing="3" fontWeight="500" fill="oklch(0.22 0.04 45 / 0.4)">
          SERVICE AREA · CENTRAL OHIO
        </text>

        {/* spoke connectors */}
        <g stroke="oklch(0.58 0.21 35 / 0.4)" strokeWidth="1" strokeLinecap="round">
          {cities.filter(c => !c.primary).map(c => (
            <line key={`l-${c.name}`} x1={center.cx} y1={center.cy} x2={c.cx} y2={c.cy} />
          ))}
        </g>

        {/* satellite city pins */}
        {cities.filter(c => !c.primary).map(c => (
          <g key={c.name} filter="url(#pinShadow)">
            <circle cx={c.cx} cy={c.cy} r="7" fill="oklch(0.99 0.015 90)" stroke="oklch(0.58 0.21 35)" strokeWidth="2" />
            <circle cx={c.cx} cy={c.cy} r="2.5" fill="oklch(0.58 0.21 35)" />
          </g>
        ))}

        {/* satellite city labels */}
        {cities.filter(c => !c.primary).map(c => (
          <text
            key={`t-${c.name}`}
            x={c.cx + (c.labelDx ?? 0)}
            y={c.cy + (c.labelDy ?? 0)}
            textAnchor={c.labelAnchor ?? "middle"}
            fontFamily="Geist, Inter, system-ui, sans-serif"
            fontWeight="600"
            fontSize="13"
            letterSpacing="0.5"
            fill="oklch(0.22 0.04 45)"
          >
            {c.name}
          </text>
        ))}

        {/* primary — Columbus */}
        <g filter="url(#pinShadow)">
          <circle cx={center.cx} cy={center.cy} r="14" fill="oklch(0.58 0.21 35)" />
          <circle cx={center.cx} cy={center.cy} r="6" fill="oklch(0.99 0.015 90)" />
        </g>
        <text
          x={center.cx}
          y={center.cy + (center.labelDy ?? 0)}
          textAnchor="middle"
          fontFamily="Geist, Inter, system-ui, sans-serif"
          fontWeight="700"
          fontSize="18"
          letterSpacing="1"
          fill="oklch(0.22 0.04 45)"
        >
          COLUMBUS
        </text>
        <text
          x={center.cx}
          y={center.cy + 50}
          textAnchor="middle"
          fontFamily="Geist, Inter, system-ui, sans-serif"
          fontWeight="500"
          fontSize="10"
          letterSpacing="3"
          fill="oklch(0.22 0.04 45 / 0.55)"
        >
          HEADQUARTERS
        </text>

        {/* vignette */}
        <rect width="800" height="560" fill="url(#mapVignette)" pointerEvents="none" />
      </svg>
    </div>
  );
}
