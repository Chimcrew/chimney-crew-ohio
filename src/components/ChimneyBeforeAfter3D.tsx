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
      className="overflow-hidden border-y border-showcase-line bg-showcase text-showcase-ink"
    >
      <div className="mx-auto grid min-h-[720px] max-w-7xl grid-cols-1 px-5 pt-16 md:min-h-[780px] md:grid-cols-12 md:px-10 md:pt-20 lg:px-14">
        <div className="relative z-10 md:col-span-5 md:flex md:flex-col md:justify-center md:pb-24">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-showcase-muted">
            Before / After · Columbus, Ohio
          </p>
          <h2 className="mt-5 max-w-lg font-showcase text-showcase-ink">
            Built back.
            <span className="block">Better than before.</span>
          </h2>
          <p className="mt-5 max-w-md text-base text-showcase-muted md:text-lg">
            A complete crown rebuild, precise masonry repair, fresh flashing, and a new stainless steel cap.
          </p>
          <Button asChild size="lg" className="mt-8 w-fit bg-showcase-ink text-showcase hover:bg-showcase-muted">
            <Link to="/before-after">
              View completed projects
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="relative mt-10 h-[430px] md:col-span-7 md:mt-0 md:h-auto">
          <div className="absolute inset-x-0 bottom-0 h-px bg-showcase-line" aria-hidden />

          <ChimneyFigure
            src={beforeImg.url}
            alt="Before restoration: full damaged brick chimney with deteriorated crown and mortar"
            label="Before"
            shown={shown}
            className="left-0 h-[270px] w-[46%] md:left-[2%] md:h-[420px] md:w-[42%]"
          />
          <ChimneyFigure
            src={afterImg.url}
            alt="After restoration: full rebuilt brick chimney with new masonry, flashing, and stainless steel cap"
            label="After"
            shown={shown}
            after
            className="right-[-5%] h-[390px] w-[64%] md:right-[-3%] md:h-[650px] md:w-[62%]"
          />
        </div>
      </div>
    </section>
  );
}

function ChimneyFigure({
  src,
  alt,
  label,
  shown,
  after = false,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  shown: boolean;
  after?: boolean;
  className: string;
}) {
  return (
    <figure className={`absolute bottom-0 flex items-end justify-center ${className}`}>
      <figcaption
        className={`absolute top-3 z-10 border-b border-showcase-ink pb-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-showcase-ink transition-opacity duration-500 md:text-xs ${
          after ? "right-0" : "left-0"
        } ${shown ? "opacity-100 delay-700" : "opacity-0"}`}
      >
        {label}
      </figcaption>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full origin-bottom object-contain object-bottom drop-shadow-xl transition-[transform,opacity] duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none ${
          after ? "delay-150" : ""
        } ${shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      />
    </figure>
  );
}

export default ChimneyBeforeAfter3D;
