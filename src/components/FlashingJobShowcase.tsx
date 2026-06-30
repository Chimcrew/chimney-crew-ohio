import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
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
    variant === "compact"
      ? [
          { url: beforeNew.url, tag: "Before", caption: "Failing flashing — leak source at chimney base" },
          { url: afterNew1.url, tag: "After", caption: "New custom copper flashing installed" },
          { url: afterNew2.url, tag: "After", caption: "Sealed & watertight chimney shoulder" },
        ]
      : [
          { url: beforeNew.url, tag: "Before", caption: "Failing flashing — leak source at chimney base" },
          { url: afterNew1.url, tag: "After", caption: "New custom copper flashing installed" },
          { url: afterNew2.url, tag: "After", caption: "Sealed & watertight chimney shoulder" },
          { url: processAfter.url, tag: "Before", caption: "Original metal flashing — leak at shoulder" },
          { url: processBefore.url, tag: "In Progress", caption: "Old flashing removed, base re-sealed" },
          { url: processProgress.url, tag: "After", caption: "Fresh step flashing into rebuilt joints" },
        ];

  return (
    <section className={`border-y border-border bg-background py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              Recent ChimCrew Job
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
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

        <ol className={`mt-8 grid gap-4 sm:gap-5 ${variant === "full" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-3"}`}>
          {photos.map((p, i) => (
            <li key={i} className="group relative overflow-hidden border border-border/60 bg-card shadow-sm">
              <div className="relative">
                <img
                  src={p.url}
                  alt={`${p.tag} — ${p.caption}`}
                  className="block aspect-[4/5] w-full object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
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
      </div>
    </section>
  );
}

export default FlashingJobShowcase;