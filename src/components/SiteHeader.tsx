import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, CalendarCheck, Flame, MapPin, ChevronDown, ChevronRight, BrickWall, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Custom broom icon (lucide doesn't include a broom)
const Broom: LucideIcon = (({ className, ...props }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M19 3l-7 7" />
    <path d="M14 8l2 2" />
    <path d="M5 21l4-9 8 4-2 5z" />
    <path d="M9 17l-2 4" />
    <path d="M13 18l-1 3" />
    <path d="M16 19l0 2" />
  </svg>
)) as unknown as LucideIcon;
import logoHeaderAsset from "@/assets/chimcrew-logo-transparent-v2.png.asset.json";
const logoHeader = logoHeaderAsset.url;
import { openScheduleDialog } from "@/components/ScheduleWidget";

type MenuLink = { label: string; to: string; slug?: string };

type ServiceCategory = {
  key: string;
  label: string;
  Icon: LucideIcon;
  items: MenuLink[];
};

const REPAIR_MENU: MenuLink[] = [
  { label: "Chimney Crown Repair", to: "/services/$slug", slug: "chimney-crown-repair" },
  { label: "Chimney Crown Replacement", to: "/services/$slug", slug: "chimney-crown-replacement" },
  { label: "Crown Repair & Tuckpointing", to: "/services/$slug", slug: "crown-tuckpoint" },
  { label: "Chimney Cap Repair", to: "/services/$slug", slug: "chimney-cap-repair" },
  { label: "Chimney Cap Replacement", to: "/services/$slug", slug: "chimney-cap-replacement" },
  { label: "Chimney Cap Installation", to: "/services/$slug", slug: "cap-install" },
  { label: "Chase Cover Replacement", to: "/services/$slug", slug: "chase-cover-replacement" },
  { label: "Chimney Liner Installation", to: "/services/$slug", slug: "liner-install" },
  { label: "Chimney Liner Repair", to: "/services/$slug", slug: "chimney-liner-repair" },
  { label: "Chimney Flue Repair", to: "/services/$slug", slug: "chimney-flue-repair" },
  { label: "Chimney Flashing Repair", to: "/services/$slug", slug: "flashing-repair" },
  { label: "Chimney Leak Repair", to: "/services/$slug", slug: "chimney-leak-repair" },
  { label: "Chimney Waterproofing", to: "/services/$slug", slug: "waterproofing" },
  { label: "Chimney Mortar Repair", to: "/services/$slug", slug: "chimney-mortar-repair" },
  { label: "Chimney Spalling Repair", to: "/services/$slug", slug: "chimney-spalling-repair" },
  { label: "Firebox Rebuild", to: "/services/$slug", slug: "firebox-rebuild" },
  { label: "Smoke Chamber Parging", to: "/services/$slug", slug: "smoke-chamber-parging" },
  { label: "Damper Repair", to: "/services/$slug", slug: "damper-repair" },
];

const CLEANING_MENU: MenuLink[] = [
  { label: "Chimney Sweep — $99", to: "/services/$slug", slug: "chimney-sweep" },
  { label: "Chimney Cleaning", to: "/services/$slug", slug: "chimney-cleaning" },
  { label: "Level 1 Inspection — $69", to: "/services/$slug", slug: "level-1-inspection" },
  { label: "Level 2 Inspection", to: "/services/$slug", slug: "level-2-inspection" },
  { label: "Chimney Maintenance", to: "/services/$slug", slug: "chimney-maintenance" },
  { label: "Animal Removal", to: "/services/$slug", slug: "animal-removal" },
];

const FIREPLACE_MENU: MenuLink[] = [
  { label: "Wood Fireplace Service", to: "/services/$slug", slug: "wood-fireplace-service" },
  { label: "Wood Fireplace Repair", to: "/services/$slug", slug: "wood-fireplace-repair" },
  { label: "Wood Fireplace Insert", to: "/services/$slug", slug: "wood-fireplace-insert" },
  { label: "Gas Fireplace Service — $49", to: "/services/$slug", slug: "gas-fireplace-service" },
  { label: "Gas Fireplace Repair", to: "/services/$slug", slug: "gas-fireplace-repair" },
  { label: "Gas Fireplace Insert", to: "/services/$slug", slug: "gas-fireplace-insert" },
  { label: "Gas Fireplace Cleaning", to: "/services/$slug", slug: "gas-fireplace-cleaning" },
  { label: "Fireplace Damper Repair", to: "/services/$slug", slug: "fireplace-damper-repair" },
  { label: "Annual Maintenance Plan", to: "/services/$slug", slug: "annual-plan" },
];

const MASONRY_MENU: MenuLink[] = [
  { label: "Chimney Masonry Repair", to: "/services/$slug", slug: "chimney-masonry-repair" },
  { label: "Chimney Brick Repair", to: "/services/$slug", slug: "chimney-brick-repair" },
  { label: "Chimney Tuckpointing", to: "/services/$slug", slug: "chimney-tuckpointing" },
  { label: "Brick Repair", to: "/services/$slug", slug: "brick-repair" },
  { label: "Tuckpointing", to: "/services/$slug", slug: "tuckpointing" },
  { label: "Brick Wall Repair", to: "/services/$slug", slug: "brick-wall-repair" },
  { label: "Foundation Masonry", to: "/services/$slug", slug: "foundation-masonry" },
];

const DRYER_VENT_MENU: MenuLink[] = [
  { label: "Dryer Vent Cleaning — $79", to: "/services/$slug", slug: "dryer-vent-cleaning" },
];

const SERVICE_CATEGORIES: ServiceCategory[] = [
  { key: "repair", label: "Chimney Repair", Icon: BrickWall, items: REPAIR_MENU },
  { key: "cleaning", label: "Chimney Sweep & Inspection", Icon: Broom, items: CLEANING_MENU },
  { key: "fireplace", label: "Fireplace Services", Icon: Flame, items: FIREPLACE_MENU },
  { key: "masonry", label: "Masonry", Icon: BrickWall, items: MASONRY_MENU },
  { key: "dryer-vent", label: "Dryer Vent Cleaning", Icon: Wind, items: DRYER_VENT_MENU },
];

type SimpleNav = { kind: "link"; to: string; label: string; slug?: string };

const PRIMARY_NAV: SimpleNav[] = [
  { kind: "link", to: "/", label: "Home" },
  { kind: "link", to: "/before-after", label: "Done Projects" },
  { kind: "link", to: "/financing", label: "Financing" },
  { kind: "link", to: "/blog", label: "Chimney Tips & Advice" },
  { kind: "link", to: "/contact", label: "Contact" },
  { kind: "link", to: "/reviews", label: "Reviews" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileOpenKey, setMobileOpenKey] = useState<string | null>(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click / touch / Escape
  useEffect(() => {
    if (!open) return;
    const closeIfOutside = (target: Node) => {
      const inMenu = mobileMenuRef.current && mobileMenuRef.current.contains(target);
      const inToggle = mobileToggleRef.current && mobileToggleRef.current.contains(target);
      if (!inMenu && !inToggle) {
        setOpen(false);
        setMobileOpenKey(null);
        setMobileOpenCategory(null);
      }
    };
    const onClick = (e: MouseEvent) => closeIfOutside(e.target as Node);
    const onTouch = (e: TouchEvent) => {
      if (e.target) closeIfOutside(e.target as Node);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpenKey(null);
        setMobileOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("touchstart", onTouch);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("touchstart", onTouch);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close any open dropdown on outside click / Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
        setHoveredCategory(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setHoveredCategory(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-[70] md:sticky md:top-0">
      {/* Tiny utility strip */}
      <div className="hidden bg-[oklch(0.78_0.19_92)] text-[oklch(0.18_0.02_250)] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] md:px-8">
          <span className="flex items-center gap-2 opacity-90">
            <MapPin className="h-3.5 w-3.5" /> Serving Columbus, Ohio &amp; Surrounding Areas — Licensed &amp; Insured
          </span>
          <span className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 sm:flex opacity-80">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[oklch(0.18_0.02_250)] text-[oklch(0.92_0.18_95)] text-[10px] font-bold">★</span>
              5-Star Rated · Google · Yelp · Angi
            </span>
            <a href="tel:6146835763" className="font-bold hover:underline text-[oklch(0.18_0.02_250)]">(614) 683-5763</a>
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
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 md:px-8 md:py-3">
          {/* LOCAL button — absolutely centered in the header */}
          <button
            type="button"
            onClick={() => openScheduleDialog()}
            aria-label="We're local — schedule online"
            className="group pointer-events-auto absolute left-1/2 top-1/2 z-30 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 border border-[oklch(0.18_0.02_250/0.08)] bg-[oklch(0.18_0.02_250/0.03)] px-4 py-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.22em] text-foreground/80 shadow-sm backdrop-blur-xl transition-all active:scale-95 active:bg-[oklch(0.18_0.02_250/0.06)] md:hidden"
          >
            <MapPin className="h-3.5 w-3.5 text-flame" aria-hidden />
            Local
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
              className="relative z-40 h-12 w-auto max-w-none origin-left object-contain transition-transform duration-300 ease-out will-change-transform md:-mb-2 md:h-20 group-hover:-translate-y-0.5 group-hover:scale-[1.04]"
            />
          </Link>

          {/* Nav */}
          <nav
            ref={menuRef}
            className="hidden items-center border border-[oklch(0.18_0.02_250/0.08)] bg-[oklch(0.18_0.02_250/0.03)] px-2 py-2 backdrop-blur md:flex"
          >
            {/* Home first */}
            <Link
              to="/"
              className="group relative inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 font-sans text-[12px] font-semibold tracking-normal text-foreground/70 transition hover:text-foreground"
              activeProps={{ className: "text-[oklch(0.65_0.18_92)]" }}
              activeOptions={{ exact: true }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_92/0.8)] group-hover:bg-[oklch(0.78_0.19_92)]" />
              Home
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[oklch(0.78_0.19_92)] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Services mega-dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => {
                setServicesOpen(false);
                setHoveredCategory(null);
              }}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((cur) => !cur)}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
                className={`group relative inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 font-sans text-[12px] font-semibold tracking-normal transition ${
                  servicesOpen ? "text-[oklch(0.65_0.18_92)]" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_92/0.8)] group-hover:bg-[oklch(0.78_0.19_92)]" />
                Services
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {servicesOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-50 w-[520px] pt-3"
                  onMouseLeave={() => {
                    setServicesOpen(false);
                    setHoveredCategory(null);
                  }}
                >
                  <div className="overflow-hidden border border-[oklch(0.18_0.02_250/0.08)] bg-background shadow-[0_20px_40px_oklch(0.18_0.02_250/0.12)] backdrop-blur-xl">
                    {/* Header */}
                    <div className="border-b border-[oklch(0.18_0.02_250/0.06)] bg-[oklch(0.18_0.02_250/0.03)] px-5 py-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[oklch(0.65_0.18_92)]">
                        Our Services
                      </span>
                    </div>

                    {/* Two-column layout: categories on left, items on right */}
                    <div className="flex">
                      {/* Categories list */}
                      <div className="w-56 shrink-0 border-r border-[oklch(0.18_0.02_250/0.06)] p-2">
                        <ul className="grid gap-0.5">
                          {SERVICE_CATEGORIES.map((cat) => {
                            const isHovered = hoveredCategory === cat.key;
                            return (
                              <li key={cat.key}>
                                <button
                                  type="button"
                                  className={`flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left font-display text-sm font-semibold transition ${
                                    isHovered
                                      ? "bg-[oklch(0.18_0.02_250/0.05)] text-[oklch(0.65_0.18_92)]"
                                      : "text-foreground hover:bg-[oklch(0.18_0.02_250/0.05)] hover:text-[oklch(0.65_0.18_92)]"
                                  }`}
                                  onMouseEnter={() => setHoveredCategory(cat.key)}
                                >
                                  <span className="inline-flex items-center gap-2">
                                    <cat.Icon className="h-4 w-4 shrink-0" />
                                    {cat.label}
                                  </span>
                                  <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${isHovered ? "translate-x-0.5" : ""}`} />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Submenu items for hovered category */}
                      <div className="flex-1 p-2">
                        {hoveredCategory ? (
                          <div className="h-full">
                            {(() => {
                              const cat = SERVICE_CATEGORIES.find((c) => c.key === hoveredCategory);
                              if (!cat) return null;
                              return (
                                <>
                                  <div className="mb-2 flex items-center gap-2 px-3 py-1.5">
                                    <cat.Icon className="h-4 w-4 text-[oklch(0.65_0.18_92)]" />
                                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[oklch(0.65_0.18_92)]">
                                      {cat.label}
                                    </span>
                                  </div>
                                  <ul className="grid gap-0.5 max-h-[320px] overflow-y-auto">
                                    {cat.items.map((item) =>
                                      item.slug ? (
                                        <li key={item.label}>
                                          <Link
                                            to="/services/$slug"
                                            params={{ slug: item.slug }}
                                            onClick={() => {
                                              setServicesOpen(false);
                                              setHoveredCategory(null);
                                            }}
                                            className="block px-3 py-2 font-display text-sm font-semibold text-foreground transition hover:bg-[oklch(0.18_0.02_250/0.05)] hover:text-[oklch(0.65_0.18_92)]"
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ) : (
                                        <li key={item.label}>
                                          <Link
                                            to={item.to}
                                            onClick={() => {
                                              setServicesOpen(false);
                                              setHoveredCategory(null);
                                            }}
                                            className="block px-3 py-2 font-display text-sm font-semibold text-foreground transition hover:bg-[oklch(0.18_0.02_250/0.05)] hover:text-[oklch(0.65_0.18_92)]"
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </>
                              );
                            })()}
                          </div>
                        ) : (
                          <div className="grid h-full place-items-center px-4">
                            <p className="text-center text-sm text-foreground/40">
                              Hover over a category to see services
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {PRIMARY_NAV.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                {...(n.slug ? { params: { slug: n.slug } } : {})}
                className="group relative inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 font-sans text-[12px] font-semibold tracking-normal text-foreground/70 transition hover:text-foreground"
                activeProps={{ className: "text-[oklch(0.65_0.18_92)]" }}
                activeOptions={n.to === "/" ? { exact: true } : undefined}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_92/0.8)] group-hover:bg-[oklch(0.78_0.19_92)]" />
                {n.label}
                <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[oklch(0.78_0.19_92)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="tel:6146835763"
              className="inline-flex items-center gap-2 whitespace-nowrap border border-[oklch(0.18_0.02_250/0.1)] bg-[oklch(0.18_0.02_250/0.03)] px-4 py-2 font-sans text-[13px] font-bold tracking-normal text-foreground/80 transition hover:border-[oklch(0.78_0.19_92/0.5)] hover:text-[oklch(0.65_0.18_92)]"
            >
              <Phone className="h-4 w-4 shrink-0" /> (614) 683-5763
            </a>
            <button
              type="button"
              onClick={() => openScheduleDialog()}
              className="group relative inline-flex items-center gap-2 overflow-hidden whitespace-nowrap bg-primary px-4 py-2 font-sans text-[13px] font-extrabold tracking-normal text-primary-foreground transition hover:bg-primary/90"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" /> Schedule Free Inspection
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={mobileToggleRef}
            className="grid h-10 w-10 place-items-center border border-[oklch(0.18_0.02_250/0.08)] bg-[oklch(0.18_0.02_250/0.03)] md:hidden"
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
        <div ref={mobileMenuRef} className="absolute left-0 right-0 top-full z-[60] max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-border/40 bg-background shadow-[0_20px_40px_oklch(0.18_0.02_250/0.12)] text-foreground md:hidden">
          <div className="mx-auto max-w-7xl px-4 pt-6 pb-8">
            <nav className="flex flex-col">
              {/* Home first */}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border/30 py-3 font-sans text-[13px] font-semibold tracking-normal text-foreground"
                activeProps={{ className: "text-[oklch(0.65_0.18_92)]" }}
                activeOptions={{ exact: true }}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.19_92)]" />
                  Home
                </span>
                <Flame className="h-4 w-4 text-[oklch(0.78_0.19_92)]" />
              </Link>

              {/* Services mega-item */}
              <div className="border-b border-border/30">
                <button
                  type="button"
                  onClick={() => setMobileOpenKey((cur) => (cur === "services" ? null : "services"))}
                  aria-expanded={mobileOpenKey === "services"}
                  className="flex w-full items-center justify-between py-3 font-sans text-[13px] font-semibold tracking-normal text-foreground"
                >
                  <span className={`inline-flex items-center gap-2 ${mobileOpenKey === "services" ? "text-[oklch(0.65_0.18_92)]" : ""}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_92)]" />
                    Services
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[oklch(0.78_0.19_92)] transition-transform duration-200 ${
                      mobileOpenKey === "services" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileOpenKey === "services" && (
                  <div className="mb-3 grid gap-3">
                    {SERVICE_CATEGORIES.map((cat) => {
                      const catOpen = mobileOpenCategory === cat.key;
                      return (
                        <div key={cat.key} className="bg-[oklch(0.18_0.02_250/0.03)] p-2">
                          <button
                            type="button"
                            onClick={() =>
                              setMobileOpenCategory((cur) => (cur === cat.key ? null : cat.key))
                            }
                            className="flex w-full items-center justify-between px-3 py-2 font-display text-sm font-semibold text-foreground"
                          >
                            <span className="inline-flex items-center gap-2">
                              <cat.Icon className="h-4 w-4 text-[#E63A1F]" />
                              {cat.label}
                            </span>
                            <ChevronRight
                              className={`h-4 w-4 text-[oklch(0.78_0.19_92)] transition-transform duration-200 ${
                                catOpen ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                          {catOpen && (
                            <ul className="mt-1 grid gap-0.5 px-2">
                              {cat.items.map((item) =>
                                item.slug ? (
                                  <li key={item.label}>
                                    <Link
                                      to="/services/$slug"
                                      params={{ slug: item.slug }}
                                      onClick={() => {
                                        setOpen(false);
                                        setMobileOpenKey(null);
                                        setMobileOpenCategory(null);
                                      }}
                                      className="block px-3 py-2 font-sans text-sm font-medium text-foreground/80 transition active:bg-[oklch(0.18_0.02_250/0.05)] active:text-[oklch(0.65_0.18_92)]"
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
                                        setMobileOpenCategory(null);
                                      }}
                                      className="block px-3 py-2 font-sans text-sm font-medium text-foreground/80 transition active:bg-[oklch(0.18_0.02_250/0.05)] active:text-[oklch(0.65_0.18_92)]"
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
                    })}
                  </div>
                )}
              </div>

                {PRIMARY_NAV.slice(1).map((n) => (
                  <Link
                    key={n.to + (n.slug ?? "")}
                    to={n.to}
                    {...(n.slug ? { params: { slug: n.slug } } : {})}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border/30 py-3 font-sans text-[13px] font-semibold tracking-normal text-foreground"
                    activeProps={{ className: "text-[oklch(0.65_0.18_92)]" }}
                    activeOptions={n.to === "/" ? { exact: true } : undefined}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.19_92)]" />
                      {n.label}
                    </span>
                    <Flame className="h-4 w-4 text-[oklch(0.78_0.19_92)]" />
                  </Link>
                ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="tel:6146835763"
                className="flex items-center justify-center gap-1.5 whitespace-nowrap border border-[oklch(0.18_0.02_250/0.1)] bg-[oklch(0.18_0.02_250/0.03)] px-4 py-3 font-sans text-[13px] font-bold tracking-normal text-foreground/80"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button
                type="button"
                onClick={() => { setOpen(false); openScheduleDialog(); }}
                className="flex items-center justify-center gap-1.5 whitespace-nowrap bg-primary px-4 py-3 font-sans text-[13px] font-extrabold tracking-normal text-primary-foreground"
              >
                <CalendarCheck className="h-4 w-4" /> Schedule Online
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
    {/* Spacer: mobile header (~60px) + sticky CTA bar (~38px) */}
    <div className="h-[98px] md:hidden" aria-hidden="true" />
    </>
  );
}
