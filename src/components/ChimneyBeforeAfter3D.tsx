import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import beforeImg from "@/assets/hero-ba/before-clean.png.asset.json";
import afterImg from "@/assets/hero-ba/after-clean.png.asset.json";

export function ChimneyBeforeAfter3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-showcase text-showcase-ink"
    >
      {/* ambient ember wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(120%_80%_at_78%_110%,color-mix(in_oklab,var(--showcase-accent)_28%,transparent),transparent_62%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-0 md:px-10 md:pt-20 lg:px-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-showcase-accent">
              Before / After · 📍 Columbus, OH
            </p>
            <h2 className="mt-4 font-showcase text-showcase-ink">Chimney Full Repair</h2>
          </div>
          <p className="max-w-sm text-sm text-showcase-muted md:text-base">
            A complete crown rebuild, precise masonry repair, fresh flashing, and a new stainless steel cap.
          </p>
        </div>

        {/* split stage */}
        <div className="relative mt-10 grid grid-cols-2 items-end md:mt-14">
          <div
            aria-hidden
            className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,var(--showcase-line)_18%,var(--showcase-line)_82%,transparent)]"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-showcase-accent text-showcase"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </span>

          <ChimneyPanel
            src={beforeImg.url}
            alt="Before restoration: damaged brick chimney with deteriorated crown and mortar"
            label="Before"
            note="Cracked crown · spalling brick"
            shown={shown}
          />
          <ChimneyPanel
            src={afterImg.url}
            alt="After restoration: rebuilt brick chimney with new masonry, flashing, and stainless steel cap"
            label="After"
            note="Rebuilt · sealed · capped"
            shown={shown}
            after
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 border-t border-showcase-line py-8 sm:flex-row sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-showcase-muted">
            One-day restoration · Licensed &amp; insured
          </p>
          <Button
            asChild
            size="lg"
            className="w-full rounded-none bg-showcase-accent text-showcase hover:bg-showcase-accent/85 sm:w-fit"
          >
            <Link to="/before-after">
              View completed projects
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ChimneyPanel({
  src,
  alt,
  label,
  note,
  shown,
  after = false,
}: {
  src: string;
  alt: string;
  label: string;
  note: string;
  shown: boolean;
  after?: boolean;
}) {
  return (
    <figure className={`relative flex flex-col ${after ? "items-start pl-4 md:pl-10" : "items-end pr-4 md:pr-10"}`}>
      <figcaption
        className={`mb-4 font-showcase text-2xl uppercase leading-none transition-opacity duration-700 md:text-4xl ${
          after ? "text-showcase-accent" : "text-showcase-ink/35"
        } ${shown ? "opacity-100 delay-500" : "opacity-0"}`}
      >
        {label}
      </figcaption>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-[260px] w-full origin-bottom object-contain drop-shadow-2xl transition-[transform,opacity,filter] duration-[1100ms] ease-out motion-reduce:translate-y-0 motion-reduce:transition-none md:h-[480px] ${
          after ? "object-bottom delay-200" : "object-bottom opacity-90 grayscale-[35%]"
        } ${shown ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
      />
      <span className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-showcase-muted md:text-[11px]">
        {note}
      </span>
    </figure>
  );
}

export default ChimneyBeforeAfter3D;
