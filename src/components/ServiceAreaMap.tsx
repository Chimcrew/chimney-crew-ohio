// Stylized SVG map of southwest/central Ohio with the three service cities pinned.
// No external map provider — design-forward, matches the brand.

const cities = [
  { name: "Columbus",   cx: 560, cy: 215, radius: 90 },
  { name: "Dayton",     cx: 305, cy: 245, radius: 70 },
  { name: "Cincinnati", cx: 285, cy: 380, radius: 80 },
];

export function ServiceAreaMap() {
  return (
    <div className="relative w-full bg-[oklch(0.18_0.012_50)]">
      <svg
        viewBox="0 0 800 500"
        className="block h-auto w-full"
        role="img"
        aria-label="ChimCrew service area covering Columbus, Cincinnati, and Dayton, Ohio"
      >
        <defs>
          <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.86 0.17 88)" stopOpacity="0.55" />
            <stop offset="60%" stopColor="oklch(0.7 0.22 45)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.7 0.22 45)" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.86 0.17 88 / 0.06)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="800" height="500" fill="url(#grid)" />

        {/* Stylized Ohio outline — abstract, evocative not literal */}
        <path
          d="M150 90 L640 70 L700 130 L690 230 L720 320 L660 430 L540 450 L420 470 L260 450 L180 380 L120 280 Z"
          fill="oklch(0.21 0.015 55)"
          stroke="oklch(0.86 0.17 88 / 0.5)"
          strokeWidth="2"
        />

        {/* Interstate lines */}
        <g stroke="oklch(0.86 0.17 88 / 0.3)" strokeWidth="1.5" strokeDasharray="6 6" fill="none">
          <path d="M285 380 L305 245 L560 215" />
          <path d="M305 245 L560 215" />
          <path d="M285 380 L560 215" />
        </g>

        {/* City glows + pins */}
        {cities.map((c) => (
          <g key={c.name}>
            <circle cx={c.cx} cy={c.cy} r={c.radius} fill="url(#cityGlow)" />
            <circle cx={c.cx} cy={c.cy} r="10" fill="oklch(0.86 0.17 88)" />
            <circle cx={c.cx} cy={c.cy} r="4" fill="oklch(0.12 0.01 50)" />
            <text
              x={c.cx}
              y={c.cy - 22}
              textAnchor="middle"
              fontFamily="Bungee, Impact, sans-serif"
              fontSize="18"
              fill="oklch(0.97 0.02 90)"
              letterSpacing="1"
            >
              {c.name.toUpperCase()}
            </text>
          </g>
        ))}

        {/* OHIO label */}
        <text
          x="400"
          y="120"
          textAnchor="middle"
          fontFamily="Bungee, Impact, sans-serif"
          fontSize="36"
          fill="oklch(0.86 0.17 88 / 0.18)"
          letterSpacing="8"
        >
          OHIO
        </text>
      </svg>
    </div>
  );
}
