import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, CalendarCheck, ChevronDown } from "lucide-react";
import truckMark from "@/assets/chimcrew-truck.png";

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
    <header className="sticky top-0 z-50 [overflow:visible]">
      {/* Row 1 — dark band with logo, tagline, primary nav */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="ChimCrew home">
            <img
              src={truckMark}
              alt="ChimCrew"
              className="h-16 w-auto md:h-20"
            />
            <div className="hidden flex-col leading-tight md:flex">
              <span className="font-display text-base tracking-wider">ChimCrew</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                Your Local Chimney Sweep Company
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="font-display text-sm uppercase tracking-widest underline-offset-8 hover:underline"
              activeProps={{ className: "underline" }}
              activeOptions={{ exact: true }}
            >
              HOME
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-1 font-display text-sm uppercase tracking-widest underline-offset-8 hover:underline"
              activeProps={{ className: "underline" }}
            >
              Services <ChevronDown className="h-3 w-3" />
            </Link>
            <Link
              to="/reviews"
              className="font-display text-sm uppercase tracking-widest underline-offset-8 hover:underline"
              activeProps={{ className: "underline" }}
            >
              REVIEWS &gt;
            </Link>
            <Link
              to="/contact"
              className="font-display text-sm uppercase tracking-widest underline-offset-8 hover:underline"
              activeProps={{ className: "underline" }}
            >
              Contact Us
            </Link>
            <Link
              to="/blog"
              className="font-display text-sm uppercase tracking-widest underline-offset-8 hover:underline"
              activeProps={{ className: "underline" }}
            >
              Blog
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Row 2 — light band with secondary nav + CTAs */}
      <div className="hidden border-b border-border bg-background md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="flex items-center gap-6">
            <Link to="/contact" className="font-display text-sm uppercase tracking-widest text-foreground hover:text-flame">
              CONTACT US
            </Link>
            <Link to="/blog" className="font-display text-sm uppercase tracking-widest text-foreground hover:text-flame">
              BLOG
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-primary px-4 py-2 font-display text-sm uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Schedule Online <CalendarCheck className="h-4 w-4" />
            </Link>
            <a
              href="tel:5551234567"
              className="inline-flex items-center gap-2 rounded-sm bg-flame px-4 py-2 font-display text-sm uppercase tracking-wider text-primary-foreground shadow-flame transition hover:brightness-110"
              style={{ color: "white" }}
            >
              Call 555-123-4567 <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-base uppercase tracking-wider text-foreground"
                activeProps={{ className: "text-flame" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="tel:5551234567"
              className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-flame px-3 py-3 font-display text-base uppercase tracking-wider text-white"
            >
              <Phone className="h-4 w-4" /> Call 555-123-4567
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-sm border-2 border-primary px-3 py-3 font-display text-base uppercase tracking-wider text-primary"
            >
              Schedule Online <CalendarCheck className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
