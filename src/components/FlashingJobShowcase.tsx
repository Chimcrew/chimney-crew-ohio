import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, MoveHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Photo } from "@/components/Photo";
import beforeNew from "@/assets/flashing-ba/before.jpeg.asset.json";
import afterNew1 from "@/assets/flashing-ba/after1.jpeg.asset.json";
import afterNew2 from "@/assets/flashing-ba/after2.jpeg.asset.json";
import processBefore from "@/assets/process/flashing-before.jpeg.asset.json";
import processProgress from "@/assets/process/flashing-progress.jpeg.asset.json";
import processAfter from "@/assets/process/flashing-after.jpeg.asset.json";

type Props = {
  /** Compact = single before/after row only (e.g. homepage). Full = all photos. */
  variant?: "compact" | "full";
  showCta?: boolean;
  className?: string;
};

export function FlashingJobShowcase({ variant = "compact", showCta = true, className = "" }: Props) {
  const photos =
    variant === "full"
      ? [
          { url: beforeNew.url, tag: "Before", caption: "Failing flashing — leak source at chimney base" },
          { url: afterNew1.url, tag: "After", caption: "New custom copper flashing installed" },
          { url: afterNew2.url, tag: "After", caption: "Sealed & watertight chimney shoulder" },
          { url: processAfter.url, tag: "Before", caption: "Original metal flashing — leak at shoulder" },
          { url: processBefore.url, tag: "In Progress", caption: "Old flashing removed, base re-sealed" },
          { url: processProgress.url, tag: "After", caption: "Fresh step flashing into rebuilt joints" },
        ]
      : [];

  return (
    <section className={`border-y border-border bg-background py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              Recent ChimCrew Job
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-primary md:text-5xl">
              Chimney Flashing Repair — Before & After
            </h2>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-foreground/65 sm:text-sm">
              <MapPin className="h-3.5 w-3.5 text-flame" /> Columbus · Dayton · Cincinnati
            </p>
          </div>
          {showCta && (
            <Link
              to="/services/$slug"
              params={{ slug: "flashing-repair" }}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-flame"
            >
              See the full repair process <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {variant === "compact" ? (
          <div className="mt-8">
            <BeforeAfterSlider
              beforeUrl={beforeNew.url}
              afterUrl={afterNew1.url}
              beforeCaption="Failing flashing — leak source at chimney base"
              afterCaption="New custom copper flashing installed"
            />
          </div>
        ) : (
        <ol className="mt-8 grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3">
          {photos.map((p, i) => (
            <li key={i} className="group relative overflow-hidden border border-border/60 bg-card shadow-sm">
              <div className="relative">
                <Photo
                  src={p.url}
                  alt={`${p.tag} — ${p.caption}`}
                  className="block aspect-[4/5] w-full object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  // 2 cols on mobile, 3 from md, inside a centered container.
                  sizes="(min-width: 768px) 30vw, 45vw"
                />
                <span
                  className={`absolute left-2 top-2 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                    p.tag === "Before"
                      ? "bg-foreground text-background"
                      : p.tag === "After"
                        ? "bg-flame text-primary"
                        : "bg-primary-foreground/95 text-primary"
                  }`}
                >
                  {p.tag}
                </span>
              </div>
              <p className="px-3 py-2.5 text-[12px] leading-snug text-foreground/75 sm:text-[13px]">
                {p.caption}
              </p>
            </li>
          ))}
        </ol>
        )}
      </div>
    </section>
  );
}

export default FlashingJobShowcase;

type SliderProps = {
  beforeUrl: string;
  afterUrl: string;
  beforeCaption: string;
  afterCaption: string;
};

function BeforeAfterSlider({ beforeUrl, afterUrl, beforeCaption, afterCaption }: SliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromClientX]);

  const startDrag = (clientX: number) => {
    draggingRef.current = true;
    updateFromClientX(clientX);
  };

  return (
    <figure className="mx-auto max-w-4xl">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden border border-border/60 bg-card shadow-sm sm:aspect-[16/10]"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          startDrag(e.clientX);
        }}
      >
        {/* After (base) */}
        <Photo
          src={afterUrl}
          alt={`After — ${afterCaption}`}
          className="absolute inset-0 h-full w-full object-cover"
          // The comparison figure is capped at max-w-4xl (896px).
          sizes="(min-width: 896px) 896px, 100vw"
          draggable={false}
        />
        {/* Before (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <Photo
            src={beforeUrl}
            alt={`Before — ${beforeCaption}`}
            className="absolute inset-0 h-full w-full object-cover"
            sizes="(min-width: 896px) 896px, 100vw"
            style={{ width: `${(100 / Math.max(pos, 0.0001)) * 100}%`, maxWidth: "none" }}
            draggable={false}
          />
        </div>

        {/* Tags */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-flame px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          After
        </span>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
        </div>
        <button
          type="button"
          aria-label="Drag to compare"
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-flame text-primary shadow-lg ring-2 ring-black/10"
          style={{ left: `${pos}%` }}
          onPointerDown={(e) => {
            e.stopPropagation();
            (e.target as Element).setPointerCapture?.(e.pointerId);
            startDrag(e.clientX);
          }}
        >
          <MoveHorizontal className="h-5 w-5" />
        </button>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[12px] text-foreground/70 sm:text-[13px]">
        <span>← {beforeCaption}</span>
        <span>{afterCaption} →</span>
      </figcaption>
    </figure>
  );
}