import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, CalendarCheck, Flame, MapPin, ChevronDown } from "lucide-react";
import logoHeader from "@/assets/chimcrew-logo-transparent.png";
import { openScheduleDialog } from "@/components/ScheduleWidget";

/* ---------------------------------------------------------------
   Categorical service menu — modeled on premium U.S. chimney
   companies (cf. therealchimneyguys.com). Each label maps to the
   closest existing service detail page; items without a dedicated
   page route to /contact so the homeowner can request a quote.
   --------------------------------------------------------------- */
type MenuLink = { label: string; to: string; slug?: string };

const REPAIR_MENU: MenuLink[] = [
  { label: "Chimney Repair", to: "/contact" },
  { label: "Chimney Leak Repair", to: "/services/$slug", slug: "flashing-repair" },
  { label: "Chimney Crown Repair", to: "/services/$slug", slug: "crown-tuckpoint" },
  { label: "Chimney Crown Rebuild", to: "/services/$slug", slug: "crown-tuckpoint" },
  { label: "Tuckpointing", to: "/services/$slug", slug: "crown-tuckpoint" },
  { label: "Masonry Repair", to: "/services/$slug", slug: "crown-tuckpoint" },
  { label: "Flashing Repair", to: "/services/$slug", slug: "flashing-repair" },
  { label: "Chimney Cap Installation", to: "/services/$slug", slug: "cap-install" },
  { label: "Chimney Cap Repair", to: "/services/$slug", slug: "cap-install" },
  { label: "Chimney Rebuild", to: "/contact" },
  { label: "Chimney Waterproofing", to: "/services/$slug", slug: "waterproofing" },
  { label: "Chimney Liner Installation", to: "/services/$slug", slug: "liner-install" },
  { label: "Chimney Liner Repair", to: "/services/$slug", slug: "liner-install" },
];

const CLEANING_MENU: MenuLink[] = [
  { label: "Chimney Inspection — $69", to: "/services/$slug", slug: "level-1-inspection" },
  { label: "Level 1 Inspection", to: "/services/$slug", slug: "level-1-inspection" },
  { label: "Level 2 Inspection", to: "/services/$slug", slug: "level-2-inspection" },
  { label: "Level 3 Inspection", to: "/contact" },
  { label: "Chimney Sweep", to: "/services/$slug", slug: "chimney-sweep" },
  { label: "Creosote Removal", to: "/services/$slug", slug: "chimney-sweep" },
  { label: "Chimney Cleaning", to: "/services/$slug", slug: "chimney-sweep" },
];

const FIREPLACE_MENU: MenuLink[] = [
  { label: "Gas Fireplace Service", to: "/services/$slug", slug: "gas-fireplace-service" },
  { label: "Gas Fireplace Repair", to: "/services/$slug", slug: "gas-fireplace-service" },
  { label: "Fireplace Inspection", to: "/services/$slug", slug: "level-1-inspection" },
  { label: "Fireplace Repair", to: "/contact" },
];

type DropdownNav = {
  kind: "dropdown";
  key: string;
  label: string;
  items: MenuLink[];
};
type SimpleNav = { kind: "link"; to: string; label: string };

const PRIMARY_NAV: (SimpleNav | DropdownNav)[] = [
  { kind: "link", to: "/", label: "Home" },
  { kind: "dropdown", key: "repair", label: "Chimney Repair", items: REPAIR_MENU },
  { kind: "dropdown", key: "cleaning", label: "Chimney Cleaning", items: CLEANING_MENU },
  { kind: "dropdown", key: "fireplace", label: "Fireplace Services", items: FIREPLACE_MENU },
  { kind: "link", to: "/before-after", label: "Before & After" },
  { kind: "link", to: "/reviews", label: "Reviews" },
  { kind: "link", to: "/financing", label: "Financing" },
  { kind: "link", to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpenKey, setMobileOpenKey] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open dropdown on outside click / Escape
  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  return (
    <header className="sticky top-0 z-50">
      {/* Tiny utility strip */}
      <div className="hidden bg-[oklch(0.18_0.02_250)] text-[oklch(0.92_0.18_95)] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] md:px-8">
          <span className="flex items-center gap-2 opacity-80">
            <MapPin className="h-3.5 w-3.5" /> Serving Columbus, Ohio &amp; Surrounding Areas — Licensed &amp; Insured
          </span>
          <span className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 sm:flex opacity-80">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[oklch(0.92_0.18_95)] text-[oklch(0.18_0.02_250)] text-[10px] font-bold">★</span>
              1,836 Five-Star Reviews
            </span>
            <a href="tel:6146835763" className="font-bold hover:underline text-[oklch(0.92_0.18_95)]">(614) 683-5763</a>
          </span>
        </div>
      </div>

      {/* Main glass header */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-background/95 shadow-[0_4px_20px_oklch(0.18_0.02_250/0.08)] border-b border-border/60"
            : "bg-background/70"
        } backdrop-blur-xl text-foreground`}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-8 md:py-3">
          {/* Flashing OPEN NOW button — absolutely centered in the header */}
          <button
            type="button"
            onClick={() => openScheduleDialog()}
            aria-label="We're open now — schedule online"
            className="group pointer-events-auto absolute left-1/2 top-1/2 z-30 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full border border-[oklch(0.18_0.02_250/0.08)] bg-[oklch(0.18_0.02_250/0.03)] px-4 py-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] text-foreground/80 shadow-sm backdrop-blur-xl transition-all active:scale-95 active:bg-[oklch(0.18_0.02_250/0.06)] md:hidden"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-[oklch(0.65_0.18_145/0.4)]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.65_0.18_145)] shadow-[0_0_10px_oklch(0.65_0.18_145/0.5)]" />
            </span>
            Open Now
          </button>

          {/* Brand */}
          <Link
            to="/"
            className="group relative z-40 flex shrink-0 items-center bg-transparent outline-none [-webkit-tap-highlight-color:transparent]"
            aria-label="ChimCrew home"
          >
            <img
              src={logoHeader}
              alt="ChimCrew — Chimney Repair & Inspection"
              className="relative z-40 -mb-1 h-11 w-auto max-w-none origin-left object-contain drop-shadow-[0_4px_8px_oklch(0.18_0.02_250/0.12)] transition-transform duration-300 ease-out will-change-transform md:-mb-2 md:h-16 group-hover:-translate-y-0.5 group-hover:scale-[1.04]"
            />
          </Link>

          {/* Nav pill */}
          <nav
            ref={menuRef}
            className="hidden items-center rounded-full border border-[oklch(0.18_0.02_250/0.08)] bg-[oklch(0.18_0.02_250/0.03)] px-2 py-2 backdrop-blur md:flex"
          >
            {PRIMARY_NAV.map((n) => {
              if (n.kind === "dropdown") {
                const isOpen = openMenu === n.key;
                return (
                  <div
                    key={n.key}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(n.key)}
                    onMouseLeave={() => setOpenMenu((cur) => (cur === n.key ? null : cur))}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenMenu((cur) => (cur === n.key ? null : n.key))}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      className={`group relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.18em] transition ${
                        isOpen ? "text-[oklch(0.65_0.18_92)]" : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_92/0.8)] group-hover:bg-[oklch(0.78_0.19_92)]" />
                      {n.label}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div role="menu" className="absolute left-0 top-full z-50 w-[320px] pt-3">
                        <div className="overflow-hidden rounded-2xl border border-[oklch(0.18_0.02_250/0.08)] bg-background shadow-[0_20px_40px_oklch(0.18_0.02_250/0.12)] backdrop-blur-xl">
                          <div className="border-b border-[oklch(0.18_0.02_250/0.06)] bg-[oklch(0.18_0.02_250/0.03)] px-5 py-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[oklch(0.65_0.18_92)]">
                              {n.label}
                            </span>
                          </div>
                          <ul className="grid gap-0.5 p-2">
                            {n.items.map((item) =>
                              item.slug ? (
                                <li key={item.label}>
                                  <Link
                                    to="/services/$slug"
                                    params={{ slug: item.slug }}
                                    onClick={() => setOpenMenu(null)}
                                    className="block rounded-lg px-3 py-2 font-display text-sm font-semibold text-foreground transition hover:bg-[oklch(0.18_0.02_250/0.05)] hover:text-[oklch(0.65_0.18_92)]"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ) : (
                                <li key={item.label}>
                                  <Link
                                    to={item.to}
                                    onClick={() => setOpenMenu(null)}
                                    className="block rounded-lg px-3 py-2 font-display text-sm font-semibold text-foreground transition hover:bg-[oklch(0.18_0.02_250/0.05)] hover:text-[oklch(0.65_0.18_92)]"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ),
                            )}
                          </ul>
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
                  className="group relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-foreground/70 transition hover:text-foreground"
                  activeProps={{ className: "text-[oklch(0.65_0.18_92)]" }}
                  activeOptions={n.to === "/" ? { exact: true } : undefined}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_92/0.8)] group-hover:bg-[oklch(0.78_0.19_92)]" />
                  {n.label}
                  <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[oklch(0.78_0.19_92)] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="tel:6146835763"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[oklch(0.18_0.02_250/0.1)] bg-[oklch(0.18_0.02_250/0.03)] px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-foreground/80 transition hover:border-[oklch(0.78_0.19_92/0.5)] hover:text-[oklch(0.65_0.18_92)]"
            >
              <Phone className="h-4 w-4 shrink-0" /> (614) 683-5763
            </a>
            <button
              type="button"
              onClick={() => openScheduleDialog()}
              className="group relative inline-flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-[oklch(0.78_0.19_92)] px-5 py-2.5 font-mono text-[12px] font-extrabold uppercase tracking-[0.18em] text-[oklch(0.18_0.02_250)] shadow-[0_4px_16px_oklch(0.78_0.19_92/0.3)] transition hover:bg-[oklch(0.85_0.18_92)]"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" /> Schedule Online
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-[oklch(0.18_0.02_250/0.08)] bg-[oklch(0.18_0.02_250/0.03)] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Hairline accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[oklch(0.78_0.19_92/0.35)] to-transparent" />
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain border-b border-white/5 bg-primary text-primary-foreground md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 pb-8">
            <nav className="flex flex-col">
              {PRIMARY_NAV.map((n) => {
                if (n.kind === "dropdown") {
                  const isOpen = mobileOpenKey === n.key;
                  return (
                    <div key={n.key} className="border-b border-white/5">
                      <button
                        type="button"
                        onClick={() => setMobileOpenKey((cur) => (cur === n.key ? null : n.key))}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between py-3.5 font-sans text-[15px] font-semibold tracking-normal"
                      >
                        <span className={isOpen ? "text-flame" : ""}>{n.label}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-flame transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <ul className="mb-3 grid gap-1 rounded-xl bg-white/5 p-2">
                          {n.items.map((item) =>
                            item.slug ? (
                              <li key={item.label}>
                                <Link
                                  to="/services/$slug"
                                  params={{ slug: item.slug }}
                                  onClick={() => {
                                    setOpen(false);
                                    setMobileOpenKey(null);
                                  }}
                                  className="block rounded-lg px-3 py-2.5 font-sans text-sm font-medium text-primary-foreground/80 transition active:bg-white/10 active:text-flame"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ) : (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  onClick={() => {
                                    setOpen(false);
                                    setMobileOpenKey(null);
                                  }}
                                  className="block rounded-lg px-3 py-2.5 font-sans text-sm font-medium text-primary-foreground/80 transition active:bg-white/10 active:text-flame"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ),
                          )}
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
                    className="flex items-center justify-between border-b border-white/5 py-3.5 font-sans text-[15px] font-semibold tracking-normal"
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
                href="tel:6146835763"
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
