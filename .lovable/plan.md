
## 1. New "Schedule Service Online" form (global)

Build one shared component `ScheduleServiceForm` matching the reference photo (bold uppercase headline, left-aligned, white inputs on deep navy background, red NEXT button, 3-step tabs: Information → Address → Note).

**Step 1 — Information:** Full Name, Phone Number, Appointment Date, Appointment Time (8AM-11AM / 11AM-2PM / 2PM-5PM).
**Step 2 — Address:** Street, City, State (OH), ZIP.
**Step 3 — Note:** Service Needed (dropdown) + optional message.

Service Needed options (replace all air-duct items everywhere):
- Gas Fireplace Inspection — $49
- Chimney/Fireplace Inspection — $69
- Chimney Sweep — $99
- Dryer Vent Cleaning — $79
- Chimney Drone Inspection — Free

Submits through existing lead pipeline (`notify-lead` route / Supabase leads table — keeping current backend wiring).

Place this form on:
- Home page (new section — currently has none)
- Every service detail page (`/services/$slug`)
- Services index, Contact, Service-area city pages
- Replaces the current `InlineLeadForm` / `ScheduleWidget` usage where applicable

## 2. Service Area section + SEO city pages

Remove current map section entirely. Replace with a clean grid of ~30 rectangle tiles (4–5 per row, 6–8 rows) listing cities around Columbus, Dayton, Cincinnati. Each tile links to `/service-area/$city`.

Cities (30):
Columbus, Dublin, Westerville, Worthington, Hilliard, Upper Arlington, Gahanna, Reynoldsburg, Grove City, Pickerington, Powell, New Albany, Delaware, Lewis Center, Pataskala, Dayton, Kettering, Beavercreek, Centerville, Huber Heights, Miamisburg, Springboro, Fairborn, Cincinnati, Mason, West Chester, Loveland, Blue Ash, Milford, Hamilton.

Each city gets a unique SEO page at `/service-area/$city` with:
- H1 "Chimney Services in {City}, OH"
- 3–4 paragraphs of localized chimney/area copy (keywords: chimney sweep, chimney inspection, fireplace cleaning, dryer vent, drone inspection, {city}, suburb references)
- Services list, trust badges
- The new ScheduleServiceForm

(Route file already exists at `src/routes/service-area.$city.tsx` — update its data + content.)

## 3. Global layout / cleanup

- **Left-align all headlines** site-wide. Remove `text-center` from all section headings/subheadings; standardize on left alignment.
- **Remove van & logo section** above footer + the thin divider line above it.
- **Remove the "Reviews & Emergency" line** above "Ask us anything"; move it down to sit just above the footer.
- **"Ask us anything"**: remove the "we don't bite" subtext.
- **Add "Meet the ChimCrew team." photo** directly below the site header on the home page (using existing team hero asset).

## 4. Typography pass

Scan all pages/components and unify on the existing font stack already defined in `src/styles.css` (display + body tokens). Fix one-off `font-*` overrides on service pages, blog, legal, etc. so every heading uses the display font and every body block uses the body font at consistent sizes.

## Technical notes

- New file: `src/components/ScheduleServiceForm.tsx` (shared, 3-step, validated with zod, submits via existing lead server function).
- Updated: `src/routes/index.tsx`, `src/routes/services.index.tsx`, `src/routes/services.$slug.tsx`, `src/routes/service-area.$city.tsx`, `src/routes/contact.tsx`, `src/components/SiteFooter.tsx`, `src/components/ServiceAreaMap.tsx` (or replaced), `src/data/seo-cities.ts` (expanded city list with copy).
- Removed/retired: old map section, van+logo strip, reviews/emergency banner above CTA.

Approve and I'll build it.
