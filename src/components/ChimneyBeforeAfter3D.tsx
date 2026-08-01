import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
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
  const [scrollT, setScrollT] = useState(0);

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

  // scroll-driven parallax: -1 (below viewport) → 1 (above)
  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const t = 1 - (r.top + r.height / 2) / (vh / 2 + r.height / 2);
      setScrollT(Math.max(-1, Math.min(1, t)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
    <section className="relative overflow-hidden border-y border-border bg-card pb-10 pt-14 md:pb-14 md:pt-20">
      {/* blueprint grid + spotlight backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_50%_60%,black,transparent_72%)] text-foreground"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[70%] w-[70%] -translate-x-1/2 rounded-[100%] bg-flame/[0.07] blur-[110px]"
      />
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
          <div
            className={`mt-5 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 ${
              shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {["1 day", "Crown rebuild", "Stainless cap", "New flashing"].map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
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
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${scrollT * -18}px)`,
            }}
          >
            <Stack
              src={beforeImg.url}
              alt="Before — cracked, spalling brick chimney with a failing crown and no cap"
              label="Before"
              tone="dark"
              shown={shown}
              delay={0}
              parallax={scrollT * 14}
              height="h-[280px] sm:h-[380px] md:h-[460px]"
            />
            <Stack
              src={afterImg.url}
              alt="After — rebuilt brick chimney with new crown, stainless cap and fresh flashing"
              label="After"
              tone="flame"
              shown={shown}
              delay={220}
              parallax={scrollT * -22}
              glow
              height="h-[310px] sm:h-[420px] md:h-[520px]"
            />

            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                shown ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="relative">
                <span className="absolute inset-0 animate-ping rounded-full bg-flame/40" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-flame text-primary shadow-[0_14px_40px_oklch(0_0_0/0.25)] sm:h-16 sm:w-16">
                  <ArrowRight className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
              </div>
            </div>
          </div>

          {/* reflective floor line */}
          <div
            aria-hidden
            className="mx-auto mt-0 h-px max-w-3xl bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
          />
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
  parallax = 0,
  glow = false,
}: {
  src: string;
  alt: string;
  label: string;
  tone: "dark" | "flame";
  shown: boolean;
  delay: number;
  height: string;
  parallax?: number;
  glow?: boolean;
}) {
  return (
    <figure className="group relative flex flex-col items-center">
      <figcaption
        className={`mb-4 flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-700 sm:text-xs ${
          tone === "flame"
            ? "bg-flame text-primary shadow-[0_10px_30px_oklch(0_0_0/0.2)]"
            : "bg-foreground/90 text-background"
        } ${shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        style={{ transitionDelay: `${delay + 400}ms` }}
      >
        {glow && <Sparkles className="h-3 w-3" />}
        {label}
      </figcaption>
      <div className="relative">
        {glow && (
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[50%] bg-flame/20 blur-3xl"
          />
        )}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`relative ${height} w-auto origin-bottom object-contain object-bottom drop-shadow-[0_30px_40px_oklch(0_0_0/0.28)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-translate-y-2 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDelay: `${delay}ms`,
            transform: shown
              ? `translateY(${parallax}px)`
              : "translateY(100%)",
          }}
        />
        {/* mirrored reflection */}
        <img
          src={src}
          alt=""
          aria-hidden
          loading="lazy"
          className={`pointer-events-none absolute left-0 top-full ${height} w-auto -scale-y-100 object-contain object-top opacity-[0.14] blur-[1px] [mask-image:linear-gradient(to_bottom,black,transparent_38%)] transition-opacity duration-1000 ${
            shown ? "opacity-[0.14]" : "opacity-0"
          }`}
          style={{ transitionDelay: `${delay + 300}ms` }}
        />
      </div>
    </figure>
  );
}

export default ChimneyBeforeAfter3D;
