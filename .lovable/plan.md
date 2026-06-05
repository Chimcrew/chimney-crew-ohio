## Goal
Lift conversions and local SEO across ChimCrew while preserving the current dark/flame branding, fonts, and layout language.

## Scope of changes

### 1. Homepage hero (`src/routes/index.tsx`)
- Rework H1 to clearly name the three core offerings: **Chimney Repair · Chimney Sweeping · Fireplace Services** (Ohio + Pittsburgh).
- New subheadline: "Protect your home from chimney fires, water leaks, and costly structural damage with professional chimney inspections, repairs, and maintenance."
- Make the **Schedule Service** CTA visually dominant (large flame button); demote **Call Now** to secondary outline button.

### 2. Trust bar (new `src/components/TrustBar.tsx`)
- Mounted directly under the hero.
- Five badges with lucide icons: Family Owned & Operated · Fast Response Times · Upfront Pricing · Experienced Technicians · Fully Insured.

### 3. Service area SEO section (new `src/components/ServiceAreaSeo.tsx`)
- Cities: Columbus OH, Dayton OH, Cincinnati OH, Cleveland OH, Pittsburgh PA.
- Each city is a `<Link to="/service-area/$city">` for future landing pages (route stub created, generic template page so links don't 404; per-city SEO content placeholder).
- Adds `src/routes/service-area.$city.tsx` with proper `head()` per city and Service schema.
- Updates `sitemap.xml` to include the 5 city URLs.

### 4. Service page enrichment (`src/data/services.ts` + `src/components/ServiceDetailPage.tsx`)
- Extend `Service` type with: `commonProblems`, `warningSigns`, `repairBenefits`, `faqs` (Q/A pairs).
- Populate all services, with deeper content for crown repair, flashing repair, relining (the examples called out).
- Render new sections on the service detail page; emit `FAQPage` JSON-LD per service.
- Add internal-linking "Related services" block at the bottom of each service page.

### 5. Reviews section (`src/components/SocialProofSection.tsx`)
- New section on homepage with 6 customer reviews, star ratings, and a small job photo per review (reuses existing gallery assets).
- Aggregate stars summary up top; visible on mobile (stacked) and desktop (grid).

### 6. Mobile sticky CTA
- Already exists (`StickyMobileCta`) — verify both buttons present and labels match (**Call Now** + **Schedule Service**). Tweak labels/icons if needed.

### 7. Footer (`src/components/SiteFooter.tsx`)
- Replace current 4-column grid with expanded version: full Services list (from `SERVICES`), Service Areas list (5 cities), Contact (phone, email, address), Legal (Privacy, Terms, Disclaimer, Accessibility).
- Keep van band + branding intact.

### 8. SEO / schema / performance
- Homepage `head()`: title/description tuned to the three core services + 5 city footprint; add `Service` JSON-LD entries and breadcrumbs.
- Root LocalBusiness schema already exists — extend `areaServed` to include Cleveland + Pittsburgh.
- Add `loading="lazy"` and `decoding="async"` to non-hero `<img>` tags across new components.
- Tighten heading hierarchy (single H1 per page, H2 for sections, H3 for cards) on homepage + service pages.
- Add internal links: hero → services index, trust bar → about-style anchors, service cards → related services.
- Update `sitemap.xml` with new city + (already-existing) blog routes.

## Out of scope
- No backend/data model changes, no new dependencies.
- No redesign of color tokens or typography.
- No real per-city copywriting beyond solid SEO-quality boilerplate (user can refine later).

## Files touched (approx.)
- New: `src/components/TrustBar.tsx`, `src/components/ServiceAreaSeo.tsx`, `src/components/SocialProofSection.tsx`, `src/routes/service-area.$city.tsx`
- Edited: `src/routes/index.tsx`, `src/routes/__root.tsx`, `src/data/services.ts`, `src/components/ServiceDetailPage.tsx`, `src/components/SiteFooter.tsx`, `src/components/StickyMobileCta.tsx`, `src/routes/sitemap[.]xml.ts`
