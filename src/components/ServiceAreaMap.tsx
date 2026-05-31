// Stylized SVG map of southwest/central Ohio with the three service cities pinned.
// No external map provider — design-forward, matches the brand.

const cities = [
  { name: "Columbus",    cx: 420, cy: 290, radius: 95, primary: true },
  { name: "Dublin",      cx: 290, cy: 215, radius: 55 },
  { name: "Powell",      cx: 370, cy: 135, radius: 50 },
  { name: "Worthington", cx: 470, cy: 185, radius: 50 },
  { name: "Westerville", cx: 580, cy: 195, radius: 55 },
  { name: "Hilliard",    cx: 250, cy: 295, radius: 55 },
  { name: "Grove City",  cx: 335, cy: 405, radius: 55 },
];

export function ServiceAreaMap() {
  return (
    <div className="relative w-full bg-secondary">
      <svg
        viewBox="0 0 800 500"
        className="block h-auto w-full"
        role="img"
        aria-label="ChimCrew service area covering Columbus, Dublin, Hilliard, Grove City, Westerville, Powell, and Worthington, Ohio"
      >
        <defs>
          <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.22 42)" stopOpacity="0.55" />
            <stop offset="60%" stopColor="oklch(0.65 0.22 42)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.65 0.22 42)" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.22 0.04 45 / 0.08)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="800" height="500" fill="url(#grid)" />

        {/* Stylized Columbus-metro outline — abstract, evocative not literal */}
        <path
          d="M120 200 Q200 100 380 90 Q540 80 640 140 Q720 200 700 300 Q680 410 560 450 Q400 480 280 450 Q140 410 110 320 Q95 250 120 200 Z"
          fill="oklch(0.97 0.02 85)"
          stroke="oklch(0.58 0.21 35 / 0.6)"
          strokeWidth="2"
        />

        {/* I-270 outerbelt ring around Columbus */}
        <ellipse
          cx="420"
          cy="290"
          rx="200"
          ry="155"
          fill="none"
          stroke="oklch(0.58 0.21 35 / 0.35)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Spoke roads from Columbus */}
        <g stroke="oklch(0.58 0.21 35 / 0.35)" strokeWidth="1.2" strokeDasharray="4 5" fill="none">
          {cities.filter(c => !c.primary).map(c => (
            <line key={c.name} x1="420" y1="290" x2={c.cx} y2={c.cy} />
          ))}
        </g>

        {/* City glows + pins */}
        {cities.map((c) => (
          <g key={c.name}>
            <circle cx={c.cx} cy={c.cy} r={c.radius} fill="url(#cityGlow)" />
            <circle cx={c.cx} cy={c.cy} r={c.primary ? 13 : 9} fill="oklch(0.58 0.21 35)" />
            <circle cx={c.cx} cy={c.cy} r={c.primary ? 5 : 3.5} fill="oklch(0.99 0.015 90)" />
            <text
              x={c.cx}
              y={c.cy - (c.primary ? 24 : 18)}
              textAnchor="middle"
              fontFamily="Bungee, Impact, sans-serif"
              fontSize={c.primary ? 20 : 15}
              fill="oklch(0.22 0.04 45)"
              letterSpacing="1"
            >
              {c.name.toUpperCase()}
            </text>
          </g>
        ))}

        {/* CENTRAL OHIO label */}
        <text
          x="400"
          y="475"
          textAnchor="middle"
          fontFamily="Bungee, Impact, sans-serif"
          fontSize="22"
          fill="oklch(0.58 0.21 35 / 0.22)"
          letterSpacing="6"
        >
          CENTRAL OHIO
        </text>
      </svg>
    </div>
  );
}
