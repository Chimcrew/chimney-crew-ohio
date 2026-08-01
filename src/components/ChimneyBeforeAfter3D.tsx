import { useRef, useState } from "react";
import { ChevronsRight } from "lucide-react";
import beforeImg from "@/assets/hero-ba/before.jpg.asset.json";
import afterImg from "@/assets/hero-ba/after.jpg.asset.json";

/**
 * WOW 3D before/after — two photo slabs angled toward each other like an
 * open book, floating over a warm glow. Pointer position parallax-tilts
 * the whole rig; each slab lifts and straightens on hover.
 */
export function ChimneyBeforeAfter3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 8, y: px * 10 });
  };

  return (
    <section className="relative overflow-hidden border-y border-border bg-primary py-14 md:py-20">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/20 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-flame">
            Real ChimCrew Job · Columbus, OH
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
            One chimney.
            <span className="block text-flame">Two very different winters.</span>
          </h2>
        </div>

        {/* 3D stage */}
        <div
          ref={stageRef}
          onPointerMove={onMove}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          className="mt-10 md:mt-14 [perspective:1600px]"
        >
          <div
            className="relative mx-auto grid max-w-5xl grid-cols-2 gap-3 transition-transform duration-300 ease-out sm:gap-8 [transform-style:preserve-3d]"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            <Slab
              src={beforeImg.url}
              alt="Before — cracked, spalling brick chimney with failing crown and no cap"
              label="Before"
              tone="dark"
              side="left"
            />
            <Slab
              src={afterImg.url}
              alt="After — rebuilt brick chimney with new crown, stainless cap and fresh flashing"
              label="After"
              tone="flame"
              side="right"
            />

            {/* center pivot badge */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transform: "translate(-50%,-50%) translateZ(90px)" }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-flame bg-primary text-flame shadow-[0_18px_50px_oklch(0_0_0/0.55)] sm:h-20 sm:w-20">
                <ChevronsRight className="h-6 w-6 sm:h-9 sm:w-9" />
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-primary-foreground/70 md:mt-10">
          Full crown rebuild, tuckpointing, new stainless cap and fresh flashing —
          finished in a single day.
        </p>
      </div>
    </section>
  );
}

function Slab({
  src,
  alt,
  label,
  tone,
  side,
}: {
  src: string;
  alt: string;
  label: string;
  tone: "dark" | "flame";
  side: "left" | "right";
}) {
  const base =
    side === "left"
      ? "rotateY(9deg) translateZ(0px)"
      : "rotateY(-9deg) translateZ(0px)";
  return (
    <figure
      className="group relative [transform-style:preserve-3d]"
      style={{ transform: base }}
    >
      <div className="relative overflow-hidden rounded-lg border border-white/15 bg-black/40 shadow-[0_40px_80px_-30px_oklch(0_0_0/0.8)] transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.02]">
        <img
          src={src}
          alt={alt}
          className="block aspect-[3/5] w-full object-cover sm:aspect-[4/6]"
          loading="lazy"
          decoding="async"
        />
        {/* sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/10"
        />
        <figcaption
          className={`absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] sm:text-xs ${
            tone === "flame"
              ? "bg-flame text-primary"
              : "bg-background/90 text-foreground"
          }`}
        >
          {label}
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
        </figcaption>
      </div>
      {/* floor reflection */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mt-2 h-8 w-[85%] rounded-full bg-black/50 blur-xl"
      />
    </figure>
  );
}

export default ChimneyBeforeAfter3D;
