import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import beforeImg from "@/assets/hero-ba/before-cutout.png.asset.json";
import afterImg from "@/assets/hero-ba/after-cutout.png.asset.json";

/**
 * Cut-out chimneys standing on a clean white stage. Both the damaged and the
 * restored chimney rise up from the bottom edge of the section when it scrolls
 * into view, with soft contact shadows and pointer parallax.
 */
export function ChimneyBeforeAfter3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 4, y: px * 6 });
  };

  return (
    <section className="relative overflow-hidden border-y border-border bg-card pt-14 md:pt-20">
      {/* soft warm floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[85%] -translate-x-1/2 rounded-[100%] bg-flame/10 blur-[90px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-flame">
            Real ChimCrew Job · Columbus, OH
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            One chimney.
            <span className="block text-flame">Two very different winters.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Full crown rebuild, tuckpointing, new stainless cap and fresh flashing —
            finished in a single day.
          </p>
        </div>

        {/* stage — chimneys rise out of the bottom edge */}
        <div
          ref={stageRef}
          onPointerMove={onMove}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          className="mt-8 [perspective:1600px] md:mt-10"
        >
          <div
            className="relative mx-auto flex max-w-4xl items-end justify-center gap-10 transition-transform duration-300 ease-out sm:gap-28 [transform-style:preserve-3d]"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            <Stack
              src={beforeImg.url}
              alt="Before — cracked, spalling brick chimney with a failing crown and no cap"
              label="Before"
              tone="dark"
              shown={shown}
              delay={0}
              height="h-[280px] sm:h-[380px] md:h-[460px]"
            />
            <Stack
              src={afterImg.url}
              alt="After — rebuilt brick chimney with new crown, stainless cap and fresh flashing"
              label="After"
              tone="flame"
              shown={shown}
              delay={220}
              height="h-[310px] sm:h-[420px] md:h-[520px]"
            />

            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                shown ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-flame text-primary shadow-[0_14px_40px_oklch(0_0_0/0.25)] sm:h-16 sm:w-16">
                <ArrowRight className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack({
  src,
  alt,
  label,
  tone,
  shown,
  delay,
  height,
}: {
  src: string;
  alt: string;
  label: string;
  tone: "dark" | "flame";
  shown: boolean;
  delay: number;
  height: string;
}) {
  return (
    <figure className="group relative flex flex-col items-center">
      <figcaption
        className={`mb-4 rounded-full px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-700 sm:text-xs ${
          tone === "flame"
            ? "bg-flame text-primary"
            : "bg-foreground/90 text-background"
        } ${shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        style={{ transitionDelay: `${delay + 400}ms` }}
      >
        {label}
      </figcaption>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${height} w-auto origin-bottom object-contain object-bottom drop-shadow-[0_30px_40px_oklch(0_0_0/0.28)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-translate-y-2 ${
          shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      />
    </figure>
  );
}

export default ChimneyBeforeAfter3D;
