// Editorial Ohio service-area map for ChimCrew.
// Real lat/lon-driven layout covering Cincinnati, Dayton, Columbus + suburbs.

type City = {
  name: string;
  lat: number;
  lon: number;
  tier: "metro" | "suburb";
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "middle" | "end";
};

const cities: City[] = [
  // Major metros we serve
  { name: "COLUMBUS",   lat: 39.961, lon: 82.999, tier: "metro",  labelDy: -28, labelAnchor: "middle" },
  { name: "DAYTON",     lat: 39.759, lon: 84.192, tier: "metro",  labelDy: -22, labelAnchor: "middle" },
  { name: "CINCINNATI", lat: 39.103, lon: 84.512, tier: "metro",  labelDy: 32,  labelAnchor: "middle" },
  // Columbus-area suburbs
  { name: "Powell",      lat: 40.158, lon: 83.075, tier: "suburb", labelDy: -14, labelAnchor: "middle" },
  { name: "Dublin",      lat: 40.099, lon: 83.114, tier: "suburb", labelDx: -10, labelDy: 4, labelAnchor: "end" },
  { name: "Worthington", lat: 40.093, lon: 83.018, tier: "suburb", labelDx: 10,  labelDy: -6, labelAnchor: "start" },
  { name: "Westerville", lat: 40.126, lon: 82.929, tier: "suburb", labelDx: 10,  labelDy: 4, labelAnchor: "start" },
  { name: "Hilliard",    lat: 40.027, lon: 83.159, tier: "suburb", labelDx: -10, labelDy: 4, labelAnchor: "end" },
  { name: "Grove City",  lat: 39.875, lon: 83.092, tier: "suburb", labelDy: 18,  labelAnchor: "middle" },
];

// Project lat/lon into the SVG viewBox.
const VB_W = 900;
const VB_H = 620;
const LON_MIN = 85.0;
const LON_MAX = 82.5;
const LAT_MIN = 38.8;
const LAT_MAX = 40.45;
const PAD_X = 70;
const PAD_Y = 80;

function project(lat: number, lon: number) {
  const x = PAD_X + ((LON_MIN - lon) / (LON_MIN - LON_MAX)) * (VB_W - PAD_X * 2);
  const y = PAD_Y + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (VB_H - PAD_Y * 2);
  return { x, y };
}

export function ServiceAreaMap() {
  const points = cities.map((c) => ({ ...c, ...project(c.lat, c.lon) }));
  const columbus = points.find((p) => p.name === "COLUMBUS")!;
  const dayton = points.find((p) => p.name === "DAYTON")!;
  const cincinnati = points.find((p) => p.name === "CINCINNATI")!;
  const metros = [columbus, dayton, cincinnati];
  const suburbs = points.filter((p) => p.tier === "suburb");

  return (
    <div className="relative w-full overflow-hidden rounded-none border border-border bg-[oklch(0.985_0.008_85)] shadow-sm">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="ChimCrew Ohio service area: Cincinnati, Dayton, Columbus and surrounding suburbs"
      >
        <defs>
          <radialGradient id="mapVignette" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0" />
            <stop offset="80%" stopColor="oklch(0.92 0.02 70)" stopOpacity="0" />
            <stop offset="100%" stopColor="oklch(0.85 0.03 60)" stopOpacity="0.5" />
          </radialGradient>

          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.22 42)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="oklch(0.65 0.22 42)" stopOpacity="0" />
          </radialGradient>

          <pattern id="dotgrid" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="oklch(0.22 0.04 45 / 0.10)" />
          </pattern>

          <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="3" result="off" />
            <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* base */}
        <rect width={VB_W} height={VB_H} fill="oklch(0.985 0.008 85)" />
        <rect width={VB_W} height={VB_H} fill="url(#dotgrid)" />

        {/* simplified Ohio silhouette outline (relative to viewBox) */}
        <path
          d="M 80 110 L 820 100 L 825 230 L 800 340 L 770 430 L 720 510 L 640 560 L 540 555 L 460 545 L 360 540 L 260 520 L 180 470 L 130 380 L 100 280 Z"
          fill="oklch(0.96 0.015 80)"
          stroke="oklch(0.22 0.04 45 / 0.25)"
          strokeWidth="1.5"
        />

        {/* service radius halos around each metro */}
        {metros.map((m) => (
          <g key={`halo-${m.name}`}>
            <circle cx={m.x} cy={m.y} r="110" fill="url(#coreGlow)" />
            <circle cx={m.x} cy={m.y} r="70" fill="none" stroke="oklch(0.58 0.21 35 / 0.35)" strokeWidth="1.2" strokeDasharray="3 6" />
            <circle cx={m.x} cy={m.y} r="110" fill="none" stroke="oklch(0.58 0.21 35 / 0.22)" strokeWidth="1" strokeDasharray="2 7" />
          </g>
        ))}

        {/* corridor lines connecting our three metros (I-71 / I-75) */}
        <g stroke="oklch(0.58 0.21 35 / 0.55)" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <line x1={columbus.x} y1={columbus.y} x2={dayton.x} y2={dayton.y} strokeDasharray="6 6" />
          <line x1={dayton.x} y1={dayton.y} x2={cincinnati.x} y2={cincinnati.y} strokeDasharray="6 6" />
          <line x1={columbus.x} y1={columbus.y} x2={cincinnati.x} y2={cincinnati.y} strokeDasharray="2 8" opacity="0.5" />
        </g>

        {/* compass */}
        <g transform={`translate(${VB_W - 70} 80)`} fontFamily="Geist, Inter, system-ui, sans-serif">
          <circle r="26" fill="oklch(1 0 0 / 0.7)" stroke="oklch(0.22 0.04 45 / 0.35)" strokeWidth="1" />
          <path d="M0 -16 L6 8 L0 3 L-6 8 Z" fill="oklch(0.58 0.21 35)" />
          <text y="-30" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="oklch(0.22 0.04 45 / 0.75)">N</text>
        </g>

        {/* header label */}
        <text x={PAD_X} y={48} fontFamily="Geist, Inter, system-ui, sans-serif" fontSize="13" letterSpacing="4" fontWeight="700" fill="oklch(0.22 0.04 45 / 0.75)">
          SERVICE AREA · OHIO
        </text>
        <text x={PAD_X} y={68} fontFamily="Geist, Inter, system-ui, sans-serif" fontSize="11" letterSpacing="2" fontWeight="500" fill="oklch(0.22 0.04 45 / 0.5)">
          Columbus · Dayton · Cincinnati & surrounding communities
        </text>

        {/* suburb spoke connectors to Columbus */}
        <g stroke="oklch(0.58 0.21 35 / 0.45)" strokeWidth="1" strokeLinecap="round">
          {suburbs.map((s) => (
            <line key={`spoke-${s.name}`} x1={columbus.x} y1={columbus.y} x2={s.x} y2={s.y} />
          ))}
        </g>

        {/* suburb pins */}
        {suburbs.map((s) => (
          <g key={`pin-${s.name}`} filter="url(#pinShadow)">
            <circle cx={s.x} cy={s.y} r="6" fill="oklch(0.99 0.015 90)" stroke="oklch(0.58 0.21 35)" strokeWidth="2" />
            <circle cx={s.x} cy={s.y} r="2" fill="oklch(0.58 0.21 35)" />
          </g>
        ))}

        {/* suburb labels */}
        {suburbs.map((s) => (
          <text
            key={`lbl-${s.name}`}
            x={s.x + (s.labelDx ?? 0)}
            y={s.y + (s.labelDy ?? 0)}
            textAnchor={s.labelAnchor ?? "middle"}
            fontFamily="Geist, Inter, system-ui, sans-serif"
            fontWeight="600"
            fontSize="13"
            fill="oklch(0.22 0.04 45)"
          >
            {s.name}
          </text>
        ))}

        {/* metro pins (drawn last so they sit on top) */}
        {metros.map((m) => (
          <g key={`metro-${m.name}`}>
            <g filter="url(#pinShadow)">
              <circle cx={m.x} cy={m.y} r="16" fill="oklch(0.58 0.21 35)" />
              <circle cx={m.x} cy={m.y} r="7" fill="oklch(0.99 0.015 90)" />
            </g>
            <text
              x={m.x}
              y={m.y + (m.labelDy ?? 0)}
              textAnchor={m.labelAnchor ?? "middle"}
              fontFamily="Geist, Inter, system-ui, sans-serif"
              fontWeight="800"
              fontSize="22"
              letterSpacing="2"
              fill="oklch(0.22 0.04 45)"
            >
              {m.name}
            </text>
          </g>
        ))}

        {/* vignette */}
        <rect width={VB_W} height={VB_H} fill="url(#mapVignette)" pointerEvents="none" />
      </svg>

      {/* coverage chip list */}
      <div className="flex flex-wrap gap-2 border-t border-border bg-background/60 px-5 py-4 sm:px-8">
        {[
          "Columbus",
          "Dayton",
          "Cincinnati",
          "Dublin",
          "Hilliard",
          "Grove City",
          "Westerville",
          "Powell",
          "Worthington",
        ].map((name) => (
          <span
            key={name}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-foreground/80"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
