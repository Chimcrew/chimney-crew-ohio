import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, CalendarCheck, Flame, MapPin } from "lucide-react";
import logoMark from "@/assets/chimcrew-logo.png";
import { openScheduleDialog } from "@/components/ScheduleWidget";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/before-after", label: "Before / After" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

const primaryNav = nav.filter((n) => ["/", "/services", "/reviews", "/blog", "/contact"].includes(n.to));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Tiny utility strip */}
      <div className="hidden bg-flame text-primary md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] md:px-8">
          <span className="flex items-center gap-2">
            <MapPin className="h-3 w-3" /> Columbus · Cincinnati · Dayton — Local Ohio Crew
          </span>
          <span className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-primary text-flame">★</span>
              1,836 5-star reviews
            </span>
            <a href="tel:5551234567" className="hover:underline">555-123-4567</a>
          </span>
        </div>
      </div>

      {/* Main glass header */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-primary/80 shadow-[0_8px_30px_oklch(0_0_0/0.35)] backdrop-blur-xl"
            : "bg-primary"
        } text-primary-foreground`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-3" aria-label="ChimCrew home">
            <span className="relative">
              <span className="absolute -inset-1 rounded-full bg-flame/30 blur-md transition group-hover:bg-flame/50" aria-hidden />
              <img
                src={logoMark}
                alt="ChimCrew"
                className="relative h-11 w-11 rounded-full border border-flame/30 object-cover md:h-12 md:w-12"
              />
            </span>
            <span className="hidden flex-col leading-tight md:flex">
              <span className="font-display text-base font-extrabold tracking-tight">
                Chim<span className="text-flame">Crew</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary-foreground/60">
                Ohio's chimney force
              </span>
            </span>
          </Link>

          {/* Nav pill */}
          <nav className="hidden items-center rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur md:flex">
            {primaryNav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="group relative px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/70 transition hover:text-primary-foreground"
                activeProps={{ className: "text-flame" }}
                activeOptions={n.to === "/" ? { exact: true } : undefined}
              >
                {n.label}
                <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-flame transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="tel:5551234567"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground transition hover:border-flame hover:text-flame"
            >
              <Phone className="h-3.5 w-3.5" /> 555-123-4567
            </a>
            <button
              type="button"
              onClick={() => openScheduleDialog()}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-flame px-5 py-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary shadow-[0_8px_24px_oklch(0.78_0.19_92/0.35)] transition hover:bg-white"
            >
              <CalendarCheck className="h-3.5 w-3.5" /> Schedule Online
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Hairline accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-flame/40 to-transparent" />
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-white/5 bg-primary text-primary-foreground md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="flex flex-col">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/5 py-3 font-display text-base font-bold uppercase tracking-wider"
                  activeProps={{ className: "text-flame" }}
                  activeOptions={n.to === "/" ? { exact: true } : undefined}
                >
                  {n.label} <Flame className="h-4 w-4 text-flame" />
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="tel:5551234567"
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <button
                type="button"
                onClick={() => { setOpen(false); openScheduleDialog(); }}
                className="flex items-center justify-center gap-2 rounded-full bg-flame px-3 py-3 font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary"
              >
                <CalendarCheck className="h-4 w-4" /> Book
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
