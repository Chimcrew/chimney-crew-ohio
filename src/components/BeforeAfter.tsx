import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  initial?: number;
  alt?: string;
};

/**
 * Smooth pointer-driven before/after comparison.
 * Uses Pointer Events with setPointerCapture for finger-perfect drag
 * on touch, mouse, and pen. Clicking/tapping anywhere on the image
 * also snaps the divider to that position.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  initial = 50,
  alt = "Before and after comparison",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(initial);

  const updateFromEvent = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(pct);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromEvent(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    updateFromEvent(e.clientX);
  };
  const endDrag = () => {
    draggingRef.current = false;
  };

  // Keyboard support on the handle
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  useEffect(() => {
    const stop = () => (draggingRef.current = false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, []);

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-xl border-2 border-primary/40 bg-primary shadow-flame sm:aspect-[16/10] touch-none"
      role="group"
      aria-label={alt}
    >
      {/* AFTER image (base layer) */}
      <img
        src={after}
        alt={`${alt} — after`}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      {/* BEFORE image — clipped by the divider position */}
      <img
        src={before}
        alt={`${alt} — before`}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-background/85 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-flame px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-flame shadow-[0_0_12px_oklch(0.78_0.19_92/0.6)]" />
        <button
          type="button"
          aria-label="Drag to compare before and after"
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-flame bg-primary text-flame shadow-[0_8px_24px_oklch(0_0_0/0.4)] transition active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tap hint (mobile only, fades fast) */}
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-primary/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground backdrop-blur sm:hidden">
        Drag to compare
      </span>
    </div>
  );
}

export default BeforeAfter;