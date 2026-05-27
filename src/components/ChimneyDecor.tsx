import { Flame } from "lucide-react";

/** Stacked-brick horizontal divider. Drop between sections for a chimney-stack feel. */
export function BrickDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="bg-bricks h-6 w-full border-y-2 border-primary/40 shadow-inner" />
      {/* mortar shadow */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 h-2 bg-gradient-to-b from-foreground/20 to-transparent" />
    </div>
  );
}

/** Inline brick stack svg — small standalone chimney glyph. */
export function ChimneyGlyph({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 64 80"
      className={className}
      style={style}
      aria-hidden="true"
      fill="none"
    >
      {/* smoke */}
      <g opacity="0.55" fill="currentColor">
        <circle cx="22" cy="8" r="5" />
        <circle cx="34" cy="4" r="4" />
        <circle cx="44" cy="10" r="5" />
      </g>
      {/* cap */}
      <rect x="6" y="18" width="52" height="6" fill="currentColor" />
      {/* bricks */}
      <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.9">
        <rect x="10" y="26" width="44" height="48" />
        {/* horizontal mortar */}
        <line x1="10" y1="36" x2="54" y2="36" />
        <line x1="10" y1="46" x2="54" y2="46" />
        <line x1="10" y1="56" x2="54" y2="56" />
        <line x1="10" y1="66" x2="54" y2="66" />
        {/* alternating vertical mortar */}
        <line x1="22" y1="26" x2="22" y2="36" />
        <line x1="42" y1="26" x2="42" y2="36" />
        <line x1="32" y1="36" x2="32" y2="46" />
        <line x1="22" y1="46" x2="22" y2="56" />
        <line x1="42" y1="46" x2="42" y2="56" />
        <line x1="32" y1="56" x2="32" y2="66" />
        <line x1="22" y1="66" x2="22" y2="74" />
        <line x1="42" y1="66" x2="42" y2="74" />
      </g>
    </svg>
  );
}

/** Decorative flame SVG (hand-drawn vibe, currentColor). */
export function FlameGlyph({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 64" className={className} style={style} aria-hidden="true" fill="none">
      <path
        d="M24 2c2 10-8 14-8 24 0 6 4 9 4 14 0 4-3 6-3 6s9-2 9-12c0-4-2-6-2-9 0 0 3 4 3 9 0 6-2 9-2 9s11-3 11-16c0-12-12-15-12-25Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Floating embers + flames, fixed full-screen behind content. Pointer-events none. */
export function AmbientEmbers() {
  const sparks = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {sparks.map((_, i) => {
        const left = (i * 73) % 100;
        const delay = (i * 0.6) % 6;
        const size = 4 + (i % 4) * 2;
        const drift = ((i % 5) - 2) * 18;
        return (
          <span
            key={i}
            className="animate-ember absolute bottom-0 block rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: "oklch(0.7 0.22 48 / 0.7)",
              boxShadow: "0 0 12px oklch(0.7 0.22 48 / 0.9)",
              animationDelay: `${delay}s`,
              ["--drift" as never]: `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Corner accent — a chimney with a flickering flame. Position absolutely from parent. */
export function CornerChimneyAccent({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="relative">
        <ChimneyGlyph className="h-24 w-20 text-primary/70 md:h-32 md:w-24" />
        <Flame className="absolute -top-3 left-1/2 h-8 w-8 -translate-x-1/2 text-flame animate-flicker md:h-10 md:w-10" />
      </div>
    </div>
  );
}

/** Section header chip with a small flame icon. */
export function FlameChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
      <Flame className="h-3.5 w-3.5 text-flame animate-flicker" />
      {children}
    </span>
  );
}