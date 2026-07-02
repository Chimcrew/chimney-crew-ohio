import { useRef, useState } from "react";
import { Instagram, ChevronLeft, ChevronRight, X } from "lucide-react";
import logoAsset from "@/assets/chimcrew-logo-transparent-v2.png.asset.json";
import p1 from "@/assets/projects/project-01-double-crown.jpg";
import p2 from "@/assets/projects/project-04-cap-install.jpg";
import p3 from "@/assets/projects/project-06-tech-onsite.jpg";
import p4 from "@/assets/projects/project-03-liner-install.jpg";
import p5 from "@/assets/projects/project-05-crown-rebuild.jpg";
import p6 from "@/assets/projects/project-08-cap-finished.jpg";
import p7 from "@/assets/fireplace-tile-install.jpeg.asset.json";

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

  return (
    <section className="relative bg-background py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Header row — IG-style */}
        <div className="flex items-center gap-4">
          <div
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full p-[2px]"
            style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}
          >
            <div className="grid h-full w-full place-items-center rounded-full bg-background p-[2px]">
              <img src={logoAsset.url} alt="ChimCrew" className="h-full w-full rounded-full object-cover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer"
               className="font-display text-lg font-bold tracking-tight hover:underline">
              @chim_crew
            </a>
            <p className="truncate text-xs text-muted-foreground md:text-sm">
              Follow us on Instagram — tap a highlight to watch.
            </p>
          </div>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer"
             className="hidden sm:inline-flex items-center gap-2 rounded-none px-4 py-2 text-sm font-semibold text-white"
             style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
            <Instagram className="h-4 w-4" /> Follow
          </a>
        </div>

        {/* Highlights row */}
        <div className="relative mt-6">
          <button
            aria-label="Scroll highlights left"
            onClick={() => scrollBy(-1)}
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 p-2 shadow md:inline-flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Scroll highlights right"
            onClick={() => scrollBy(1)}
            className="absolute right-0 top-1/2 z-10 hidden translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 p-2 shadow md:inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
                  <div className="grid h-full w-full place-items-center rounded-full bg-background p-[3px]">
                    <img src={h.cover} alt={h.title} className="h-full w-full rounded-full object-cover" />
                  </div>
                </div>
                <span className="max-w-[6rem] truncate text-xs font-medium text-foreground/80">
                  {h.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story viewer */}
      {open !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={close}>
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            className="absolute right-4 top-4 text-white/80 hover:text-white"
          >
            <X className="h-7 w-7" />
          </button>
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