import { useRef, useState, useEffect } from "react";
import { Instagram, ChevronLeft, ChevronRight, X, Heart, MessageCircle } from "lucide-react";
import logoAsset from "@/assets/chimcrew-logo-transparent-v2.png.asset.json";
import p1 from "@/assets/projects/project-01-double-crown.jpg.asset.json";
import p2 from "@/assets/projects/project-04-cap-install.jpg.asset.json";
import p3 from "@/assets/projects/project-06-tech-onsite.jpg.asset.json";
import p4 from "@/assets/projects/project-03-liner-install.jpg.asset.json";
import p5 from "@/assets/projects/project-05-crown-rebuild.jpg.asset.json";
import p6 from "@/assets/projects/project-08-cap-finished.jpg.asset.json";
import p7 from "@/assets/fireplace-tile-install.jpeg.asset.json";
import p8 from "@/assets/projects/project-02-tuckpointing-after.jpg.asset.json";
import p9 from "@/assets/projects/project-07-flue-before.jpg.asset.json";
import p10 from "@/assets/projects/project-09-crown-before.jpg.asset.json";
import gjA from "@/assets/gallery-new/new-brick-copper-flash.jpeg.asset.json";
import gjB from "@/assets/gallery-new/new-brick-crown-seal.jpeg.asset.json";
import gjC from "@/assets/gallery-new/new-fireplace-interior.jpeg.asset.json";
import gjD from "@/assets/gallery-new/new-copper-flashing-detail.jpeg.asset.json";
import gjE from "@/assets/gallery-new/new-mesh-cap-closeup.jpeg.asset.json";
import gjF from "@/assets/gallery-new/new-cap-ladder.jpeg.asset.json";

const IG_URL = "https://www.instagram.com/chim_crew/";

type Highlight = { title: string; cover: string; slides: string[] };

const highlights: Highlight[] = [
  { title: "Crowns",     cover: p5, slides: [p5, p1] },
  { title: "Caps",       cover: p2, slides: [p2, p6] },
  { title: "Liners",     cover: p4, slides: [p4] },
  { title: "Fireplaces", cover: p7.url, slides: [p7.url] },
  { title: "Rooftop",    cover: p3, slides: [p3] },
  { title: "Rebuilds",   cover: p1, slides: [p1, p5] },
];

const feed: { src: string; caption: string }[] = [
  { src: p5,      caption: "Crown rebuild — Dublin, OH" },
  { src: p2,      caption: "Stainless cap install" },
  { src: p7.url,  caption: "Fireplace tile & surround" },
  { src: gjA.url, caption: "Copper flashing — brick chimney" },
  { src: p4,      caption: "Stainless liner drop-in" },
  { src: gjC.url, caption: "Firebox refresh" },
  { src: p3,      caption: "Tech on the rooftop" },
  { src: gjB.url, caption: "Crown seal & waterproof" },
  { src: p6,      caption: "Cap finished — clean lines" },
  { src: p8,      caption: "Tuckpointing complete" },
  { src: gjE.url, caption: "Mesh cap close-up" },
  { src: gjD.url, caption: "Copper flashing detail" },
];

export function InstagramFollow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const openStory = (i: number) => { setOpen(i); setSlide(0); };
  const close = () => setOpen(null);
  const next = () => {
    if (open === null) return;
    const h = highlights[open];
    if (slide + 1 < h.slides.length) setSlide(slide + 1);
    else if (open + 1 < highlights.length) { setOpen(open + 1); setSlide(0); }
    else close();
  };
  const prev = () => {
    if (open === null) return;
    if (slide > 0) setSlide(slide - 1);
    else if (open > 0) { setOpen(open - 1); setSlide(highlights[open - 1].slides.length - 1); }
  };

  // Escape key closes the story viewer
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  return (
    <section className="relative overflow-hidden bg-neutral-950 py-16 text-white md:py-24">
      {/* Subtle IG-gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        {/* Section eyebrow + headline */}
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">// From the field</p>
            <h2 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
              Follow the crew on <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
              >Instagram</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">
              Fresh jobs from Columbus, Cincinnati and Dayton — crowns, caps, liners, and rooftops. Tap any photo to open the story.
            </p>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
            style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
          >
            <Instagram className="h-5 w-5" /> Follow @chim_crew
          </a>
        </div>

        {/* Profile bar */}
        <div className="mt-8 flex items-center gap-4 border-y border-white/10 py-5">
          <div
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full p-[2.5px] md:h-20 md:w-20"
            style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
          >
            <div className="grid h-full w-full place-items-center rounded-full bg-neutral-950 p-[3px]">
              <img src={logoAsset.url} alt="ChimCrew" className="h-full w-full rounded-full object-cover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer"
               className="font-display text-lg font-bold tracking-tight hover:underline md:text-xl">
              @chim_crew
            </a>
            <p className="mt-0.5 text-xs text-white/60 md:text-sm">
              ChimCrew · Chimney experts · Columbus · Cincinnati · Dayton
            </p>
          </div>
        </div>

        {/* Highlights row */}
        <div className="relative mt-6">
          <button
            aria-label="Scroll highlights left"
            onClick={() => scrollBy(-1)}
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-neutral-900/90 p-2 text-white shadow md:inline-flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Scroll highlights right"
            onClick={() => scrollBy(1)}
            className="absolute right-0 top-1/2 z-10 hidden translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-neutral-900/90 p-2 text-white shadow md:inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-visible px-1 py-2 pb-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {highlights.map((h, i) => (
              <button
                key={h.title}
                onClick={() => openStory(i)}
                className="group flex shrink-0 snap-start flex-col items-center gap-2 focus:outline-none"
                aria-label={`Open ${h.title} highlights`}
              >
                <div
                  className="grid h-20 w-20 place-items-center rounded-full p-[3px] transition group-hover:scale-105 sm:h-24 sm:w-24"
                  style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
                >
                  <div className="grid h-full w-full place-items-center rounded-full bg-neutral-950 p-[3px]">
                    <img src={h.cover} alt={h.title} className="h-full w-full rounded-full object-cover" />
                  </div>
                </div>
                <span className="max-w-[6rem] truncate text-xs font-medium text-white/85">
                  {h.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Instagram-style feed grid */}
        <div className="mt-8 grid grid-cols-3 gap-1 sm:gap-2 md:gap-3">
          {feed.map((item, i) => (
            <a
              key={i}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-neutral-900"
              aria-label={item.caption}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="w-full p-3">
                  <p className="line-clamp-2 text-[11px] font-medium text-white/95 md:text-xs">
                    {item.caption}
                  </p>
                </div>
                <Instagram className="absolute right-2 top-2 h-4 w-4 text-white/90 md:h-5 md:w-5" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            <Instagram className="h-4 w-4" /> See more on Instagram
          </a>
          <p className="text-xs text-white/50">New jobs posted every week.</p>
        </div>
      </div>

      {/* Story viewer */}
      {open !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4" onClick={close}>
          {/* Top bar with clear Close button */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4">
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Close"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-black shadow-lg hover:bg-white"
            >
              <X className="h-4 w-4" /> Close
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Close"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative flex h-[85vh] w-full max-w-[420px] flex-col overflow-hidden rounded-xl bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress bars */}
            <div className="absolute left-3 right-3 top-3 z-10 flex gap-1">
              {highlights[open].slides.map((_, idx) => (
                <div key={idx} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
                  <div className={`h-full bg-white transition-all ${idx < slide ? "w-full" : idx === slide ? "w-full" : "w-0"}`} />
                </div>
              ))}
            </div>
            {/* Header */}
            <div className="absolute left-3 right-3 top-6 z-10 flex items-center gap-2 pt-2">
              <img src={logoAsset.url} alt="" className="h-7 w-7 rounded-full border border-white/40 object-cover" />
              <span className="text-sm font-semibold text-white">@chim_crew</span>
              <span className="text-xs text-white/70">· {highlights[open].title}</span>
            </div>

            <img
              src={highlights[open].slides[slide]}
              alt={highlights[open].title}
              className="h-full w-full object-cover"
            />

            {/* Tap zones */}
            <button
              aria-label="Previous slide"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute inset-y-0 left-0 w-1/3"
            />
            <button
              aria-label="Next slide"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute inset-y-0 right-0 w-1/3"
            />

            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-black shadow"
            >
              View on Instagram
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default InstagramFollow;