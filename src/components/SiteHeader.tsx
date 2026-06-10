import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, CalendarCheck, Flame, MapPin, ChevronDown } from "lucide-react";
import logoMark from "@/assets/chimcrew-logo.png";
import { openScheduleDialog } from "@/components/ScheduleWidget";
import { SERVICES, ACCENT_CLASSES } from "@/data/services";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/before-after", label: "Before / After" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/financing", label: "Financing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

const primaryNav = nav.filter((n) => ["/", "/services", "/financing", "/reviews", "/blog", "/contact"].includes(n.to));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop services dropdown on outside click / Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

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
            <a href="tel:6145491954" className="hover:underline">(614) 549-1954</a>
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
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8">
          {/* Flashing OPEN NOW button — absolutely centered in the header */}
          <button
            type="button"
            onClick={() => openScheduleDialog()}
            aria-label="We're open now — schedule online"
            className="group pointer-events-auto absolute left-1/2 top-1/2 z-30 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full border border-white/10 bg-primary/40 px-4 py-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] text-primary-foreground/90 shadow-[0_8px_32px_oklch(0_0_0/0.4)] backdrop-blur-xl transition-all active:scale-95 active:bg-primary/60 md:hidden"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-[oklch(0.75_0.2_145)/40)]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.75_0.2_145)] shadow-[0_0_10px_oklch(0.75_0.2_145/0.6)]" />
            </span>
            Open Now
          </button>

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
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary-foreground/80">
                Ohio's chimney force
              </span>
            </span>
          </Link>

          {/* Nav pill */}
          <nav className="hidden items-center rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur md:flex">
            {primaryNav.map((n) => {
              if (n.to === "/services") {
                return (
                  <div
                    key={n.to}
                    className="relative"
                    ref={servicesRef}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      aria-haspopup="menu"
                      className={`group relative inline-flex items-center gap-1 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                        servicesOpen ? "text-flame" : "text-primary-foreground/70 hover:text-primary-foreground"
                      }`}
                    >
                      {n.label}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {servicesOpen && (
                      <div
                        role="menu"
                        className="absolute left-1/2 top-full z-50 w-[min(720px,90vw)] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-primary text-primary-foreground shadow-[0_30px_60px_oklch(0_0_0/0.5)] backdrop-blur-xl">
                        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">
                            All chimney services
                          </span>
                          <Link
                            to="/services"
                            onClick={() => setServicesOpen(false)}
                            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70 transition hover:text-flame"
                          >
                            View all <ChevronDown className="h-3 w-3 -rotate-90" />
                          </Link>
                        </div>
                        <div className="grid max-h-[60vh] grid-cols-2 gap-1 overflow-auto p-2">
                          {SERVICES.map((s) => {
                            const Icon = s.icon;
                            const accent = ACCENT_CLASSES[s.accent];
                            return (
                              <Link
                                key={s.slug}
                                to="/services/$slug"
                                params={{ slug: s.slug }}
                                onClick={() => setServicesOpen(false)}
                                className="group flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-white/10 hover:bg-white/5"
                              >
                                <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${accent.bg} text-primary-foreground`}>
                                  <Icon className="h-4 w-4" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block font-display text-sm font-semibold leading-tight text-primary-foreground">
                                    {s.shortTitle}
                                  </span>
                                  <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/80">
                                    {s.price} · {s.duration}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
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
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="tel:6145491954"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground transition hover:border-flame hover:text-flame"
            >
              <Phone className="h-3.5 w-3.5" /> (614) 549-1954
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
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain border-b border-white/5 bg-primary text-primary-foreground md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 pb-8">
            <nav className="flex flex-col">
              {nav.map((n) => {
                if (n.to === "/services") {
                  return (
                    <div key={n.to} className="border-b border-white/5">
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        aria-expanded={mobileServicesOpen}
                        className="flex w-full items-center justify-between py-3 font-display text-base font-bold uppercase tracking-wider"
                      >
                        <span className={mobileServicesOpen ? "text-flame" : ""}>{n.label}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-flame transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileServicesOpen && (
                        <ul className="mb-3 grid gap-1 rounded-xl bg-white/5 p-2">
                          <li>
                            <Link
                              to="/services"
                              onClick={() => {
                                setOpen(false);
                                setMobileServicesOpen(false);
                              }}
                              className="flex items-center gap-3 rounded-lg px-2 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-flame transition active:bg-white/10"
                            >
                              View all services →
                            </Link>
                          </li>
                          {SERVICES.map((s) => {
                            const Icon = s.icon;
                            const accent = ACCENT_CLASSES[s.accent];
                            return (
                              <li key={s.slug}>
                                <Link
                                  to="/services/$slug"
                                  params={{ slug: s.slug }}
                                  onClick={() => {
                                    setOpen(false);
                                    setMobileServicesOpen(false);
                                  }}
                                  className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition active:bg-white/10"
                                >
                                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${accent.bg} text-primary-foreground`}>
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate font-display text-sm font-semibold text-primary-foreground">
                                      {s.shortTitle}
                                    </span>
                                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/80">
                                      {s.price}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                }
                return (
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
                );
              })}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="tel:6145491954"
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
