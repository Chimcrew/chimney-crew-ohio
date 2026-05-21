import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import truckMark from "@/assets/chimcrew-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/before-after", label: "Before / After" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground/15 bg-background/90 backdrop-blur-md [overflow:visible]">
      <div className="stripe-warning h-1.5 w-full opacity-90" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8">
        {/* 3D truck mark — sits on the header and tilts down onto the hero */}
        <Link to="/" className="group relative flex items-center gap-3" aria-label="ChimCrew home">
          <div
            className="relative h-16 w-24 shrink-0 overflow-visible md:h-20 md:w-32"
            style={{ perspective: "700px" }}
          >
            <img
              src={truckMark}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full origin-center select-none object-contain transition-[transform,filter] duration-700 ease-out"
              style={{
                transform: scrolled
                  ? "rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)"
                  : "rotateX(12deg) rotateY(-10deg) rotateZ(-2deg) scale(1.08)",
                transformStyle: "preserve-3d",
                filter: scrolled
                  ? "drop-shadow(0 2px 3px oklch(0.18 0.02 250 / 0.18))"
                  : "drop-shadow(0 6px 6px oklch(0.18 0.02 250 / 0.18))",
              }}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wider text-foreground md:text-2xl">
              CHIM<span className="text-flame">CREW</span>
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground md:text-[10px]">
              Chimney Services · Ohio
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="font-display text-xs uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <a
            href="tel:5551234567"
            className="hidden items-center gap-2 whitespace-nowrap rounded-sm border border-foreground/30 px-3 py-2 font-mono text-sm text-foreground transition hover:bg-foreground hover:text-background md:flex"
          >
            <Phone className="h-4 w-4" />
            555-123-4567
          </a>
          <Link
            to="/"
            hash="quote"
            className="hidden rounded-sm bg-primary px-4 py-2 font-display text-sm uppercase tracking-wider text-primary-foreground transition hover:brightness-110 md:inline-block"
          >
            Free Quote
          </Link>
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-7 w-7 text-primary" /> : <Menu className="h-7 w-7 text-primary" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary/20 bg-background md:hidden">
          <div className="flex flex-col px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-base uppercase tracking-wider text-foreground/90"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="tel:5551234567"
              className="mt-2 flex items-center gap-2 rounded-sm border border-primary/50 px-3 py-3 font-mono text-primary"
            >
              <Phone className="h-4 w-4" /> 555-123-4567
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
