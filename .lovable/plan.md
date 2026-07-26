
# Royal-style Header + Full SEO Service Build-Out

## Goal
Restructure the header and services to mirror royalchimneys.com — a 5-group mega-menu with ~40 total services (20 net-new pages), plus a dedicated Masonry group. Every new page gets photos that actually match the service.

---

## 1. New menu structure (5 service groups)

**Chimney Repair** (most items — matches Royal exactly)
- Chimney Crown Repair *(new)*
- Chimney Crown Replacement *(new)*
- Chimney Cap Repair *(new)*
- Chimney Cap Replacement *(new)*
- Chimney Cap Installation *(exists)*
- Chase Cover Replacement *(exists)*
- Chimney Liner Installation *(exists — rename from "Stainless Liner")*
- Chimney Liner Repair *(new)*
- Chimney Flashing Repair *(exists)*
- Chimney Flue Repair *(new)*
- Chimney Leak Repair *(new)*
- Chimney Waterproofing *(exists)*
- Chimney Mortar Repair *(new)*
- Chimney Spalling Repair *(new)*
- Firebox Rebuild *(exists)*
- Smoke Chamber Parging *(exists)*
- Damper Repair *(exists)*

**Chimney Sweep & Inspection**
- Chimney Sweep *(exists)*
- Chimney Cleaning *(new — SEO twin of sweep)*
- Level 1 Inspection *(exists)*
- Level 2 Inspection *(exists)*
- Chimney Maintenance *(new)*
- Animal Removal *(exists)*

**Fireplace Services**
- Wood Fireplace Service *(new)*
- Wood Fireplace Repair *(new)*
- Wood Fireplace Insert *(new)*
- Gas Fireplace Service *(exists — rename)*
- Gas Fireplace Repair *(new)*
- Gas Fireplace Insert *(new)*
- Gas Fireplace Cleaning *(new)*
- Fireplace Damper Repair *(new — twin of Damper Repair, fireplace-side keyword)*

**Masonry** (new group)
- Chimney Masonry Repair *(new)*
- Chimney Brick Repair *(new)*
- Chimney Tuckpointing *(new)*
- Brick Repair *(new)*
- Tuckpointing *(new)*
- Brick Wall Repair *(new)*
- Foundation Masonry *(new)*

**Dryer Vent**
- Dryer Vent Cleaning *(exists)*

Top-level nav order: Home · Services (mega) · Financing · Done Projects · Reviews · Chimney Tips · Contact.

---

## 2. New service pages (~20)

Each new page uses the same `ServiceSpec` shape (hero, bullets, process, signs, FAQs, related, metaDescription, problems, benefits, warranty). Content will be genuinely differentiated per page — not copy-pasted — so Google treats them as unique.

Priced ones stay `"Starts from $X"`; specialized/masonry pages use `quoteOnly: true` → "Custom Quote" + "Request Free Inspection" CTA.

---

## 3. Photo assignments (using assets already on the CDN)

I'll audit every existing asset in `src/assets/**` and map real photos to services by what's actually in the image. No stock, no mismatches. Where a real photo doesn't exist for a variation, sibling services share a photo of the same subject (e.g., Crown Repair + Crown Replacement + Crown Rebuild can share crown photos — all show a crown).

Concrete pairings:

```text
Crown Repair / Replacement / Rebuild       → crown-demo-inprogress, ba-crown-stone, tech-crown-waterproof
Cap Repair / Replacement / Installation    → cap-install-hero, new-aluminum-cap, new-cap-install-rooftop
Chase Cover Replacement                    → chase-cover-mesh, new-chase-side
Liner Install / Repair / Flue Repair       → tech-liner-install, project-03-liner-install, project-07-flue-before
Flashing / Leak Repair                     → flashing-ba/*, project-02-tuckpointing-after
Waterproofing                              → tech-crown-waterproof, ba-crown-stone
Mortar / Spalling / Brick / Tuckpoint      → ba-spalled-brick, tuckpoint-tech-1/2, project-05-crown-rebuild
Firebox Rebuild / Smoke Chamber            → fireplace-tile-install, ba/fireplace-*, ba/smoke-chamber-*
Damper / Fireplace Damper                  → tech-fireplace-sweep-hoodie, chimcrew-fireplace-service
Sweep / Cleaning / Maintenance             → sweep-closeup, gj gallery, tech-fireplace-burner
Level 1 / Level 2 Inspection               → camera-inspection, chimcrew-inspection-roof
Animal Removal                             → chase-cover-mesh, cap-install-hero
Wood Fireplace *                           → fireplace-cozy, tech-fireplace-sweep, chimcrew-fireplace-service
Gas Fireplace *                            → chimcrew-fireplace-service, fireplace-tile-install
Masonry (non-chimney)                      → tuckpoint-tech-1/2, ba-spalled-brick, project-02
Dryer Vent                                 → dryer before/after set (unchanged)
```

If any category has zero appropriate photo, I'll flag it after the build so you can send one — I won't invent stock.

---

## 4. Files touched

- `src/components/SiteHeader.tsx` — replace category arrays with the 5-group structure above.
- `src/data/services.ts` — add ~20 new `ServiceSpec` entries; re-map photos on ~10 existing entries.
- `src/routes/services.index.tsx` — grouped grid (5 sections) instead of one flat 14-card wall.
- `src/routes/sitemap[.]xml.ts` — add every new slug.
- `src/data/seo-cities.ts` (if it feeds the sitemap) — no change unless needed.
- No new route files needed: `services.$slug.tsx` handles every new slug automatically.

Existing pages, homepage, footer, PDFs, forms, and admin — untouched.

---

## 5. What ships in one turn

- Header mega-menu (5 groups, hover-slide, mobile accordion).
- All 20 new service pages live at `/services/<slug>` with unique content + real photos.
- Services index rebuilt as grouped sections matching the menu.
- Sitemap updated.
- Photo audit summary at the end listing anything I couldn't confidently match, so you can send replacements.

Approve and I'll ship it.
