import { type ReactNode } from "react";
import heroPhoto from "@/assets/team/chimcrew-team-truck.png.asset.json";

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, subtitle, children, className = "" }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden bg-primary text-primary-foreground min-h-[420px] md:min-h-[520px] flex items-center ${className}`}>
      {/* Background photo — ChimCrew team + truck */}
      <img
        aria-hidden
        src={heroPhoto.url}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
      />
      {/* Uniform tint for text legibility (no gradient) */}
      <div className="pointer-events-none absolute inset-0 bg-black/55" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-14 md:px-8 md:py-20">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-4xl whitespace-normal break-words font-display text-4xl font-black leading-[1.08] tracking-tight text-white md:text-6xl [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}