import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/chimcrew-logo.png";

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
  return (
    <header className="sticky top-0 z-50 border-b-2 border-primary/30 bg-background/85 backdrop-blur-md">
      <div className="stripe-warning h-1.5 w-full opacity-80" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ChimCrew" className="h-10 w-auto md:h-12" />
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

        <div className="flex items-center gap-3">
          <a
            href="tel:5551234567"
            className="hidden items-center gap-2 rounded-sm border border-primary/40 px-3 py-2 font-mono text-sm text-primary transition hover:bg-primary hover:text-primary-foreground md:flex"
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
