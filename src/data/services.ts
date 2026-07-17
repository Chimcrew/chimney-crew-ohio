import {
  Wind,
  Search,
  Hammer,
  Flame,
  Bird,
  ShieldCheck,
  Droplets,
  Wrench,
  HardHat,
  AlertTriangle,
  CloudRain,
  Thermometer,
  Sparkles,
  Home as HomeIcon,
  type LucideIcon,
} from "lucide-react";
import fireplaceCozy from "@/assets/fireplace-cozy.jpg";
import afterChimney from "@/assets/after-chimney.jpg";
import beforeChimney from "@/assets/before-chimney.jpg";
import crownAfter from "@/assets/crown-after.jpg";
import leakRooftop from "@/assets/leak-chimney-rooftop.jpg";
// Real photos sent by the team — use these on the service pages.
import techLinerInstallAsset from "@/assets/real/tech-liner-install.png.asset.json";
import techScaffoldingRebuildAsset from "@/assets/real/tech-scaffolding-rebuild.png.asset.json";
import baCapCrownAsset from "@/assets/real/ba-cap-crown.png.asset.json";
import baCrownStoneAsset from "@/assets/real/ba-crown-stone.png.asset.json";
import baSpalledBrickAsset from "@/assets/real/ba-spalled-brick.png.asset.json";
import crownDemoInProgressAsset from "@/assets/real/crown-demo-inprogress.png.asset.json";
import tuckpointTech1Asset from "@/assets/real/tuckpoint-tech-1.png.asset.json";
import capInstallHeroAsset from "@/assets/real/cap-install-hero.jpeg.asset.json";
import chimneyJobAAsset from "@/assets/uploads/chimney-job-a.jpeg.asset.json";
import chimneyJobBAsset from "@/assets/uploads/chimney-job-b.jpeg.asset.json";
import fireplaceServiceAsset from "@/assets/team/chimcrew-fireplace-service.png.asset.json";
import sweepCloseupAsset from "@/assets/team/chimcrew-sweep-closeup.png.asset.json";
import chaseCoverMeshAsset from "@/assets/gallery-new/new-chase-cover-mesh.jpeg.asset.json";

const techLinerInstall = techLinerInstallAsset.url;
const techScaffoldingRebuild = techScaffoldingRebuildAsset.url;
const baCapCrown = baCapCrownAsset.url;
const baCrownStone = baCrownStoneAsset.url;
const baSpalledBrick = baSpalledBrickAsset.url;
const crownDemoInProgress = crownDemoInProgressAsset.url;
const tuckpointTech1 = tuckpointTech1Asset.url;
const capInstallHero = capInstallHeroAsset.url;
const chimneyJobA = chimneyJobAAsset.url;
const chimneyJobB = chimneyJobBAsset.url;
const fireplaceServicePhoto = fireplaceServiceAsset.url;
const sweepCloseupPhoto = sweepCloseupAsset.url;
const chaseCoverHero = chaseCoverMeshAsset.url;

export type ServiceVariant =
  | "maintenance"
  | "inspection"
  | "repair"
  | "install"
  | "emergency"
  | "plan";

export interface ServiceSpec {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  price: string;
  duration: string;
  icon: LucideIcon;
  variant: ServiceVariant;
  accent: "flame" | "primary" | "amber" | "sky" | "leaf";
  /** When true, the service is too custom/expensive to show a price.
   *  UI should show a "Custom Quote" label and "Request Free Inspection" CTA. */
  quoteOnly?: boolean;
  /** Optional override for the primary CTA button label on the page. */
  ctaLabel?: string;
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
  };
  bullets: string[];
  process: { title: string; desc: string }[];
  signs: string[];
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
  metaDescription: string;
  /** Common problems homeowners run into that this service solves. */
  problems?: string[];
  /** Direct benefits of doing the repair / service. */
  benefits?: string[];
  /** Short warranty/guarantee label shown in hero + overview. */
  warranty?: string;
}

/** Primary CTA label for a service page. Falls back to a sensible
 *  service-specific phrase derived from variant + shortTitle. */
export function serviceCtaLabel(s: Pick<ServiceSpec, "ctaLabel" | "shortTitle" | "variant" | "quoteOnly">): string {
  if (s.ctaLabel) return s.ctaLabel;
  const t = s.shortTitle.toLowerCase();
  if (s.quoteOnly) return `Book your ${t} inspection`;
  switch (s.variant) {
    case "inspection":
      return `Book your ${t}`;
    case "repair":
      return `Book your ${t}`;
    case "install":
      return `Book your ${t}`;
    case "maintenance":
      return `Book your ${t}`;
    case "emergency":
      return `Get emergency ${t}`;
    case "plan":
      return `Start your ${t}`;
    default:
      return `Book your ${t}`;
  }
}

/** Display label for a service price.
 *
 *  We advertise flat-rate prices for our scheduled services (inspection,
 *  sweep, gas fireplace, dryer vent). Everything else is custom and shows
 *  no price — the homeowner is asked to request a free quote instead.
 */
export function formatFromPrice(s: Pick<ServiceSpec, "slug">): string {
  if (s.slug === "level-1-inspection") return "Starts from $69";
  if (s.slug === "gas-fireplace-service") return "Starts from $49";
  if (s.slug === "chimney-sweep") return "Starts from $99";
  if (s.slug === "dryer-vent-cleaning") return "Starts from $79";
  return "";
}

/** Short warranty/guarantee label per service. Falls back to a sensible default. */
export function warrantyFor(s: Pick<ServiceSpec, "warranty" | "variant" | "quoteOnly">): string {
  if (s.warranty) return s.warranty;
  if (s.variant === "install") return "10-Year Workmanship Warranty";
  if (s.variant === "repair" && s.quoteOnly) return "10-Year Workmanship Warranty";
  if (s.variant === "repair") return "5-Year Warranty";
  if (s.variant === "inspection") return "Accurate Report";
  if (s.variant === "plan") return "Cancel Anytime";
  return "Satisfaction Guaranteed";
}

/** Hero photo for a service — picks the most relevant real photo we have. */
export function heroImageFor(s: Pick<ServiceSpec, "slug" | "variant">): string {
  switch (s.slug) {
    case "crown-tuckpoint":
      return tuckpointTech1;
    case "level-1-inspection":
    case "level-2-inspection":
      return sweepCloseupPhoto;
    case "waterproofing":
      return baSpalledBrick;
    case "flashing-repair":
      return leakRooftop;
    case "liner-install":
      return techLinerInstall;
    case "firebox-rebuild":
      return techScaffoldingRebuild;
    case "smoke-chamber-parging":
      return crownDemoInProgress;
    case "cap-install":
      return capInstallHero;
    case "chase-cover-replacement":
      return chaseCoverHero;
    case "animal-removal":
      return beforeChimney;
    case "gas-fireplace-service":
      return fireplaceServicePhoto;
    case "chimney-sweep":
      return chimneyJobA;
    case "annual-plan":
      return chimneyJobB;
    case "damper-repair":
      return crownAfter;
    case "dryer-vent-cleaning":
      return afterChimney;
    default:
      return fireplaceCozy;
  }
}

export const SERVICES: ServiceSpec[] = [
  {
    slug: "chimney-sweep",
    warranty: "Satisfaction Guaranteed",
    title: "Chimney Sweep & Cleaning",
    shortTitle: "Chimney Sweep",
    tagline: "Creosote, soot and ash — gone in under 90 minutes.",
    price: "$99",
    duration: "",
    icon: Wind,
    variant: "maintenance",
    accent: "primary",
    hero: {
      eyebrow: "Annual maintenance",
      headline: "A clean flue is a safe flue.",
      sub: "HEPA-contained sweep that removes creosote build-up, the #1 cause of chimney fires in Ohio homes.",
    },
    bullets: [
      "Drop cloths + dual-HEPA vacuum — no mess",
      "Smoke chamber, damper, and shelf cleaned",
      "Written safety summary with photos",
      "Includes a free Level 1 visual check",
    ],
    process: [
      { title: "Setup", desc: "Floor protection, shoe covers, HEPA vac sealed to firebox." },
      { title: "Sweep", desc: "Rotary brushes from cap to smoke shelf, removing glaze and soot." },
      { title: "Vacuum", desc: "All debris collected. Hearth left cleaner than we found it." },
      { title: "Report", desc: "You get photos + a written summary in your inbox same day." },
    ],
    signs: [
      "It's been a year (or you can't remember)",
      "Strong campfire smell in the house",
      "Dark, flaky build-up in the firebox",
      "Smoke spilling into the room",
    ],
    faqs: [
      { q: "How often should I sweep?", a: "Once per heating season, or every cord of wood burned — whichever comes first." },
      { q: "Is it really mess-free?", a: "Yes. We seal the firebox and run a HEPA vacuum the entire time. No soot in your living room." },
    ],
    related: ["level-1-inspection", "cap-install", "annual-plan"],
    metaDescription: "Professional chimney sweep in Ohio. HEPA-contained creosote removal. Includes photo report. Columbus, Cincinnati, Dayton.",
  },
  {
    slug: "level-1-inspection",
    warranty: "100% Accurate Report",
    title: "Level 1 Chimney Inspection",
    shortTitle: "Chimney Inspection",
    tagline: "The annual check-up the NFPA recommends for every fireplace — starts from $69.",
    price: "$69",
    duration: "",
    icon: Search,
    variant: "inspection",
    accent: "sky",
    hero: {
      eyebrow: "NFPA 211 compliant",
      headline: "Know what's going on up there.",
      sub: "A visual inspection of every accessible part of your chimney, with a written report you can hand to anyone.",
    },
    bullets: [
      "Inspect firebox, damper, smoke chamber, flue",
      "Exterior crown, cap, flashing, masonry walk-through",
      "Digital photo report emailed same day",
      "Free when bundled with a sweep",
    ],
    process: [
      { title: "Interior", desc: "Firebox, damper, smoke chamber, and visible flue." },
      { title: "Exterior", desc: "Crown, cap, flashing, mortar joints, brickwork." },
      { title: "Documentation", desc: "Photos of every concern, ranked by urgency." },
      { title: "Walkthrough", desc: "We sit down and explain what we found." },
    ],
    signs: [
      "It's been over a year since the last inspection",
      "You bought the house recently",
      "You changed insurance providers",
      "You're burning more this winter than last",
    ],
    faqs: [
      { q: "What's the difference vs Level 2?", a: "Level 1 is visual only. Level 2 adds a camera scan and is required after a sale, fire, or appliance change." },
      { q: "How long does it take?", a: "About 45 minutes including the walkthrough." },
    ],
    related: ["level-2-inspection", "chimney-sweep", "annual-plan"],
    metaDescription: "NFPA Level 1 chimney inspection in Ohio with photo report. Bundle free with a sweep. Columbus, Cincinnati, Dayton.",
  },
  {
    slug: "level-2-inspection",
    warranty: "Lender-Accepted Report",
    title: "Level 2 Chimney Inspection",
    shortTitle: "Level 2 Inspection",
    tagline: "Camera-scanned, real-estate-ready documentation.",
    price: "$318",
    duration: "",
    icon: Search,
    variant: "inspection",
    accent: "sky",
    hero: {
      eyebrow: "Required for closings",
      headline: "Every inch of your flue, on camera.",
      sub: "Required after a chimney fire, before a home sale, or any time you change appliances. Compliant with NFPA 211.",
    },
    bullets: [
      "Internal camera scan of the entire flue",
      "Includes everything in a Level 1",
      "Written documentation accepted by lenders",
      "Bundles all findings into a single PDF",
    ],
    process: [
      { title: "Level 1 sweep", desc: "All accessible interior and exterior areas." },
      { title: "Camera scan", desc: "We feed a calibrated camera down the entire flue." },
      { title: "Defect review", desc: "Cracked tiles, gaps, blockages — all flagged." },
      { title: "PDF report", desc: "Real-estate-ready documentation in your inbox." },
    ],
    signs: [
      "You're buying or selling the home",
      "There was a chimney fire (even a small one)",
      "You're swapping a wood stove or insert",
      "Lender or insurer is asking for documentation",
    ],
    faqs: [
      { q: "Is this accepted by lenders?", a: "Yes. Our PDF includes our CSIA credentials and is accepted by every Ohio lender we've worked with." },
      { q: "Can you do same-day for a closing?", a: "Often yes — call us at (614) 683-5763 and we'll squeeze you in." },
    ],
    related: ["level-1-inspection", "liner-install", "crown-tuckpoint"],
    metaDescription: "Level 2 chimney inspection with camera scan in Ohio. Lender-ready PDF. Columbus, Cincinnati, Dayton.",
  },
  {
    slug: "crown-tuckpoint",
    warranty: "10-Year Workmanship Warranty",
    title: "Crown Repair & Tuckpointing",
    shortTitle: "Crown & Tuckpoint",
    tagline: "Stop water at the source. Save the chimney.",
    price: "Custom Quote",
    duration: "",
    quoteOnly: true,
    icon: Hammer,
    variant: "repair",
    accent: "amber",
    hero: {
      eyebrow: "Masonry restoration",
      headline: "Water is the silent killer of chimneys.",
      sub: "Rebuild a cracked crown and re-mortar failing joints before freeze-thaw turns small cracks into a five-figure rebuild.",
    },
    bullets: [
      "Cracked crowns rebuilt with reinforced concrete",
      "Failing mortar ground out and tuckpointed",
      "Color-matched mortar where visible",
      "10-year workmanship warranty",
    ],
    process: [
      { title: "Assessment", desc: "Drone or rooftop inspection, photos of every defect." },
      { title: "Demo", desc: "Failing crown and mortar carefully removed." },
      { title: "Rebuild", desc: "Stainless-reinforced crown poured with proper overhang and drip edge." },
      { title: "Seal", desc: "Breathable waterproofing applied to brick. 10-year product warranty." },
    ],
    signs: [
      "Visible cracks across the top slab",
      "White staining (efflorescence) on the brick",
      "Mortar joints crumbling or missing",
      "Stains on the ceiling near the chimney",
    ],
    faqs: [
      { q: "Crown repair vs full rebuild?", a: "If cracks are under 1/4\" we can resurface. Wider than that and we recommend a full re-pour." },
      { q: "Do you waterproof too?", a: "Yes — included on every crown job. We use ChimneySaver, the industry standard." },
    ],
    related: ["waterproofing", "flashing-repair", "level-2-inspection"],
    metaDescription: "Chimney crown repair and tuckpointing in Ohio. 5-year warranty. Stop leaks before they become rebuilds.",
    problems: [
      "Hairline cracks in the crown letting water seep into the chimney structure",
      "Brick faces spalling (popping off) from freeze-thaw water damage",
      "Mortar joints washed out, leaving gaps along the chimney exterior",
      "Efflorescence (white staining) showing chronic water intrusion",
    ],
    benefits: [
      "Stops water at the source before it rots the framing or stains ceilings",
      "Prevents the small five-figure rebuild down the road",
      "Restores curb appeal with color-matched mortar and a clean crown line",
      "Adds 15–25 years of life to the existing masonry",
    ],
  },
  {
    slug: "liner-install",
    warranty: "Lifetime Warranty (Transferable)",
    title: "Stainless Steel Liner Installation",
    shortTitle: "Stainless Liner",
    tagline: "Sized to your appliance. Built to outlive your house.",
    price: "Custom Quote",
    duration: "",
    quoteOnly: true,
    icon: Flame,
    variant: "install",
    accent: "flame",
    hero: {
      eyebrow: "Lifetime warranty",
      headline: "The right liner is the difference between safe and sorry.",
      sub: "A properly-sized stainless liner improves draft, contains heat, and protects your home from creosote-fueled fires.",
    },
    bullets: [
      "316Ti stainless — the industry's best alloy",
      "Sized to your specific appliance",
      "Insulated wrap for better draft and efficiency",
      "Lifetime warranty, transferable to next owner",
    ],
    process: [
      { title: "Sizing", desc: "We measure your appliance and flue, then pick the exact diameter." },
      { title: "Removal", desc: "Old tiles or damaged liner pulled if needed." },
      { title: "Install", desc: "Insulated liner dropped from the top, sealed at top and bottom." },
      { title: "Verify", desc: "Smoke test, draft test, and a final inspection." },
    ],
    signs: [
      "Cracked clay tiles found during inspection",
      "Wood stove or insert added to an old fireplace",
      "Smoke spillage even after sweeping",
      "Insurance is asking for a UL-listed liner",
    ],
    faqs: [
      { q: "Why stainless?", a: "Clay tiles crack under thermal shock. Stainless flexes and lasts the life of the home." },
      { q: "Will my draft improve?", a: "Almost always. A properly-sized liner is the single biggest fix for poor draft." },
    ],
    related: ["level-2-inspection", "smoke-chamber-parging", "gas-fireplace-service"],
    metaDescription: "Stainless steel chimney liner installation in Ohio. 316Ti, lifetime warranty. Columbus, Cincinnati, Dayton.",
    problems: [
      "Cracked clay tiles allowing heat and combustion gases into the wall cavity",
      "Oversized flue causing poor draft, smoke spillage, and rapid creosote build-up",
      "Old liner not rated for a new wood stove or gas insert",
      "Carbon monoxide concerns from a deteriorated or unlined flue",
    ],
    benefits: [
      "Dramatically improves draft so your fireplace stops smoking back into the room",
      "Contains heat and combustion gases safely — protects your home from chimney fires",
      "Properly sized for your appliance (wood stove, insert, furnace, or gas log set)",
      "Lifetime, transferable warranty that adds resale value",
    ],
  },
  {
    slug: "animal-removal",
    warranty: "5-Year Cap Warranty",
    title: "Animal Removal & Cap Install",
    shortTitle: "Animal Removal",
    tagline: "Get them out humanely. Keep them out for good.",
    price: "$318",
    duration: "",
    icon: Bird,
    variant: "emergency",
    accent: "leaf",
    hero: {
      eyebrow: "Humane + permanent",
      headline: "Scratching at 3am? We can be there today.",
      sub: "Birds, squirrels, raccoons — we remove them without harm, then cap the flue so they can't come back.",
    },
    bullets: [
      "Humane removal, no traps left behind",
      "Stainless steel cap installed same visit",
      "Sanitization and odor treatment available",
      "5-year cap warranty",
    ],
    process: [
      { title: "Locate", desc: "Camera or rooftop look to identify what's in there." },
      { title: "Remove", desc: "Species-appropriate humane removal." },
      { title: "Sanitize", desc: "Nesting material out, optional enzymatic cleaning." },
      { title: "Cap", desc: "Stainless mesh cap installed. They don't get back in." },
    ],
    signs: [
      "Scratching, chirping, or scurrying in the flue",
      "Strong odor from the fireplace",
      "Twigs or nesting material in the firebox",
      "Sudden draft problems mid-season",
    ],
    faqs: [
      { q: "Is it really humane?", a: "Yes — we follow Ohio Division of Wildlife guidelines and never harm the animal." },
      { q: "What if there are babies?", a: "We wait until they're mobile (usually 2–4 weeks), then remove the whole family and cap." },
    ],
    related: ["cap-install", "chimney-sweep", "level-1-inspection"],
    metaDescription: "Humane animal removal from chimneys in Ohio, includes a stainless cap. Same-day service available.",
  },
  {
    slug: "cap-install",
    warranty: "5-Year Warranty",
    title: "Chimney Cap Installation",
    shortTitle: "Chimney Cap Installation",
    tagline: "The cheapest insurance policy on your house.",
    price: "$218",
    duration: "",
    icon: ShieldCheck,
    variant: "install",
    accent: "primary",
    hero: {
      eyebrow: "Animals + rain + sparks",
      headline: "Chimney Cap Installation",
      sub: "Keep critters out, rain off your smoke shelf, and sparks off your roof — for the price of a nice dinner.",
    },
    bullets: [
      "304 or 316 stainless steel only",
      "Bolted, not glued — won't blow off",
      "Mesh spark arrestor included",
      "5-year warranty",
    ],
    process: [
      { title: "Measure", desc: "We size to your exact flue opening." },
      { title: "Install", desc: "Bolted to the crown with stainless hardware." },
      { title: "Verify", desc: "Tug test, photos, and a written warranty handed off." },
    ],
    signs: [
      "No cap, or a rusted one",
      "Birds or squirrels recently removed",
      "Roof shingles with burn marks near the flue",
      "Rain dripping into the firebox",
    ],
    faqs: [
      { q: "Will it affect my draft?", a: "No — properly-sized caps have more open area than your flue." },
      { q: "Multi-flue chimney?", a: "We make custom caps for unusual configurations. Ask for a quote." },
    ],
    related: ["animal-removal", "waterproofing", "chimney-sweep"],
    metaDescription: "Stainless steel chimney cap installation in Ohio with lifetime warranty. Keeps animals, rain, and sparks out.",
  },
  {
    slug: "chase-cover-replacement",
    warranty: "Lifetime Stainless Warranty",
    title: "Chase Cover Replacement",
    shortTitle: "Chase Cover Replacement",
    tagline: "Stop the rusting galvanized lid soaking your chase — for good.",
    price: "Custom Quote",
    duration: "",
    quoteOnly: true,
    icon: HardHat,
    variant: "install",
    accent: "primary",
    hero: {
      eyebrow: "Prefab chimney chase — lifetime stainless",
      headline: "A rusted chase cover funnels water straight into your framing.",
      sub: "We fabricate custom-fit 24-gauge stainless (or copper) chase covers with a cross-break, drip edge, and collar-flashed flue penetrations — sized to your exact chase.",
    },
    bullets: [
      "24-gauge stainless — will not rust like the builder-grade galvanized",
      "Custom fabricated to your exact chase measurements",
      "Cross-break + drip edge sheds water off the top",
      "Flue collars flashed and sealed with high-temp silicone",
      "Copper upgrade available",
    ],
    process: [
      { title: "Measure", desc: "We measure the chase top and every flue penetration on site." },
      { title: "Fabricate", desc: "Shop-bent stainless cover with cross-break, skirt, and collars." },
      { title: "Install", desc: "Old cover removed, new cover set, screwed and sealed watertight." },
      { title: "Document", desc: "Photo report and written warranty handed off." },
    ],
    signs: [
      "Rust streaks running down the siding of a prefab chase",
      "Standing water or ponding on top of the chase",
      "Chase cover is flat (no cross-break) and sagging",
      "Water stains on the ceiling near the fireplace",
      "Original galvanized cover is 10+ years old",
    ],
    faqs: [
      { q: "Is this different from a chimney cap?", a: "Yes — a chimney cap sits on top of a masonry flue. A chase cover is the full metal lid over a prefab (wood-framed) chase. Most prefab chimneys need both a new chase cover and new flue caps." },
      { q: "Why stainless and not galvanized?", a: "Galvanized rusts through in 8-15 years. Stainless is a one-and-done — it will outlast the chimney." },
      { q: "Do you fit any size?", a: "Yes. Every cover is fabricated to your exact chase dimensions with a proper skirt and drip edge." },
    ],
    problems: [
      "Rusted-through galvanized chase cover",
      "Water leaking into the framed chase",
      "Ponding water and ice damage on the chase top",
      "Ceiling stains near the fireplace",
    ],
    benefits: [
      "Lifetime stainless — no more rust streaks",
      "Custom fit — no sag, no ponding",
      "Watertight collars stop leaks at the flue penetration",
      "Protects the entire framed chase from rot",
    ],
    related: ["cap-install", "flashing-repair", "waterproofing"],
    metaDescription: "Stainless chase cover replacement in Ohio. Custom-fabricated 24-gauge stainless covers with cross-break, drip edge, and lifetime warranty.",
  },
  {
    slug: "waterproofing",
    warranty: "10-Year Product Warranty",
    title: "Chimney Waterproofing",
    shortTitle: "Waterproofing",
    tagline: "Breathable seal that stops freeze-thaw damage cold.",
    price: "Custom Quote",
    duration: "",
    quoteOnly: true,
    icon: Droplets,
    variant: "maintenance",
    accent: "sky",
    hero: {
      eyebrow: "10-year product warranty",
      headline: "Brick is a sponge. We give it a raincoat.",
      sub: "Vapor-permeable ChimneySaver lets your masonry breathe out but keeps the rain from getting in.",
    },
    bullets: [
      "ChimneySaver — the only sealer we'll use",
      "Vapor-permeable — won't trap moisture",
      "Two coats, low-pressure spray application",
      "10-year manufacturer warranty",
    ],
    process: [
      { title: "Inspect", desc: "Tuckpoint and crown must be sound first." },
      { title: "Prep", desc: "Mask any non-masonry surfaces." },
      { title: "Apply", desc: "Two coats, wet-on-wet, low-pressure spray." },
      { title: "Document", desc: "Photos, batch numbers, and your warranty card." },
    ],
    signs: [
      "White staining on the brick",
      "Spalling — brick faces flaking off",
      "Mortar joints washing out",
      "Chimney was last sealed >10 years ago",
    ],
    faqs: [
      { q: "Why not silicone sealers?", a: "They trap moisture inside the brick. When it freezes, the brick spalls. ChimneySaver is vapor-permeable." },
      { q: "How long does it last?", a: "10 years per the manufacturer. We've seen jobs hold for 12+." },
    ],
    related: ["crown-tuckpoint", "flashing-repair", "level-1-inspection"],
    metaDescription: "Chimney waterproofing in Ohio with ChimneySaver. 10-year warranty. Stop spalling and freeze-thaw damage.",
  },
  {
    slug: "flashing-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Flashing Repair",
    shortTitle: "Flashing Repair",
    tagline: "Where the chimney meets the roof — the #1 leak source.",
    price: "Custom Quote",
    duration: "",
    quoteOnly: true,
    icon: CloudRain,
    variant: "repair",
    accent: "amber",
    hero: {
      eyebrow: "Stop ceiling stains",
      headline: "If it's leaking near the chimney, it's usually the flashing.",
      sub: "We replace failed step and counter-flashing with proper lead and copper details that last 30+ years.",
    },
    bullets: [
      "Step + counter-flashing replaced",
      "Cut into mortar joint, not surface-sealed",
      "Lead, copper, or color-matched aluminum",
      "Coordinated with your roofer if needed",
    ],
    process: [
      { title: "Diagnose", desc: "Confirm flashing is the leak source, not crown or cap." },
      { title: "Remove", desc: "Old caulk, sealer, and failed flashing pulled." },
      { title: "Cut + install", desc: "New flashing tucked into a fresh mortar joint." },
      { title: "Seal", desc: "Polyurethane sealant at all transitions, not silicone." },
    ],
    signs: [
      "Stains on the ceiling near the chimney",
      "Visible caulk at the roof line",
      "Curled or missing shingles around the base",
      "Drips inside the firebox during rain",
    ],
    faqs: [
      { q: "Will you reuse the old flashing?", a: "Almost never — if it failed once, it'll fail again." },
      { q: "Do you do the roof too?", a: "We handle the chimney side. We have roofer partners for the rest." },
    ],
    related: ["crown-tuckpoint", "waterproofing", "level-2-inspection"],
    metaDescription: "Chimney flashing repair in Ohio. Stop ceiling leaks with proper step + counter-flashing.",
    problems: [
      "Roof leak symptoms appearing only after heavy rain or snowmelt",
      "Interior water stains on ceilings or walls near the chimney",
      "Curled or missing shingles around the base of the chimney",
      "Failed surface caulk that was used instead of proper flashing",
    ],
    benefits: [
      "Stops chronic ceiling and attic leaks at the most common entry point",
      "Protects roof decking, framing, and drywall from rot and mold",
      "Lead, copper, or color-matched aluminum that lasts 30+ years",
      "Properly tucked into the mortar joint — not caulked on top",
    ],
  },
  {
    slug: "firebox-rebuild",
    warranty: "10-Year Workmanship Warranty",
    title: "Firebox Rebuild & Refractory Repair",
    shortTitle: "Firebox Rebuild",
    tagline: "Refractory panels, firebrick, and mortar back to spec.",
    price: "Custom Quote",
    duration: "",
    quoteOnly: true,
    icon: HardHat,
    variant: "repair",
    accent: "flame",
    hero: {
      eyebrow: "Code-compliant restoration",
      headline: "When your firebox cracks, your house frame is one fire away from trouble.",
      sub: "We rebuild cracked or eroded fireboxes with proper firebrick and refractory mortar — to code, not to caulk.",
    },
    bullets: [
      "Firebrick rebuilt with refractory mortar",
      "Cracked refractory panels replaced",
      "Smoke shelf and damper restored",
      "Inspection-passed or it's not done",
    ],
    process: [
      { title: "Demo", desc: "Failed brick and panels carefully removed." },
      { title: "Rebuild", desc: "Code-rated firebrick laid with refractory mortar." },
      { title: "Cure", desc: "24-hour cure with no fire before first burn." },
      { title: "Burn-in", desc: "Test fire under our supervision. Final photos." },
    ],
    signs: [
      "Cracks wider than a quarter in the firebox floor or walls",
      "Crumbling mortar between firebrick",
      "Refractory panels cracked or sagging",
      "Heat damage on the wall behind the chimney",
    ],
    faqs: [
      { q: "Can I just patch it?", a: "Hairline cracks, maybe. Anything wider needs proper firebrick — caulk burns out." },
      { q: "Will it look the same?", a: "Yes, we match the existing brick pattern and color where possible." },
    ],
    related: ["smoke-chamber-parging", "liner-install", "level-2-inspection"],
    metaDescription: "Firebox rebuild and refractory repair in Ohio. Code-compliant firebrick and panels.",
  },
  {
    slug: "smoke-chamber-parging",
    warranty: "10-Year Workmanship Warranty",
    title: "Smoke Chamber Parging",
    shortTitle: "Smoke Chamber Parging",
    tagline: "Smooth the corbel. Tame the smoke. Pass the inspection.",
    price: "Custom Quote",
    duration: "",
    quoteOnly: true,
    icon: Wrench,
    variant: "repair",
    accent: "amber",
    hero: {
      eyebrow: "NFPA 211 upgrade",
      headline: "Rough smoke chambers are why so many fireplaces spill.",
      sub: "We trowel a refractory parge coat over a rough corbeled smoke chamber, making it draft properly and pass any inspection.",
    },
    bullets: [
      "Heatstop or Chamber-Tech refractory used",
      "Smooths corbel steps to NFPA 211 spec",
      "Often resolves chronic smoke spillage",
      "Required for many liner installs",
    ],
    process: [
      { title: "Clean", desc: "Smoke chamber swept and prepped for adhesion." },
      { title: "Trowel", desc: "1/4\" refractory parge troweled to a smooth slope." },
      { title: "Cure", desc: "24-hour cure before first fire." },
      { title: "Verify", desc: "Smoke and draft test." },
    ],
    signs: [
      "Chronic smoke spilling into the room",
      "Inspector flagged a corbeled chamber",
      "Planning a new liner install",
      "Old chimney with no parge",
    ],
    faqs: [
      { q: "Will this fix my smoking fireplace?", a: "Often, yes — combined with a properly-sized liner, almost always." },
      { q: "How long does it last?", a: "Indefinitely, if your flue stays in good shape." },
    ],
    related: ["liner-install", "firebox-rebuild", "level-2-inspection"],
    metaDescription: "Smoke chamber parging in Ohio. Refractory parge coat to fix smoke spillage and pass inspection.",
  },
  {
    slug: "damper-repair",
    warranty: "5-Year Warranty",
    title: "Damper Repair & Top-Sealing Damper",
    shortTitle: "Damper Repair",
    tagline: "Stop the draft, save the heating bill.",
    price: "$118",
    duration: "",
    icon: Thermometer,
    variant: "repair",
    accent: "sky",
    hero: {
      eyebrow: "Energy + safety",
      headline: "A broken damper is an open window in your roof.",
      sub: "We repair throat dampers or install top-sealing dampers that close airtight and stop the year-round draft.",
    },
    bullets: [
      "Throat damper repaired or replaced",
      "Top-sealing damper option for an airtight seal",
      "Cable-operated, hand-pull from inside",
      "Cuts conditioned-air loss dramatically",
    ],
    process: [
      { title: "Diagnose", desc: "Determine if the throat damper can be repaired or needs replacement." },
      { title: "Replace or upgrade", desc: "Repair in place, or upgrade to a top-sealing damper." },
      { title: "Test", desc: "Confirm airtight close and smooth open from inside." },
    ],
    signs: [
      "You can feel a draft with the damper closed",
      "Damper plate is rusted, warped, or stuck",
      "Energy bill jumped with no other changes",
      "Animals or rain getting past the damper",
    ],
    faqs: [
      { q: "Throat damper or top-sealing?", a: "Top-sealing is more efficient and doubles as an animal/rain guard. Throat is cheaper to repair if it's only mildly damaged." },
      { q: "Will it fit my chimney?", a: "We stock sizes for almost every common Ohio chimney." },
    ],
    related: ["cap-install", "chimney-sweep", "gas-fireplace-service"],
    metaDescription: "Chimney damper repair and top-sealing damper install in Ohio. Stop drafts and lower heating bills.",
  },
  {
    slug: "gas-fireplace-service",
    warranty: "1-Year Service Warranty",
    title: "Gas Fireplace Service",
    shortTitle: "Gas Fireplace Service",
    tagline: "Tune, clean, and safety-check your gas insert or log set.",
    price: "$49",
    duration: "",
    icon: Sparkles,
    variant: "maintenance",
    accent: "flame",
    hero: {
      eyebrow: "Manufacturer-spec service",
      headline: "Gas doesn't make soot — it makes carbon monoxide if neglected.",
      sub: "Annual tune-up for vented gas inserts, log sets, and direct-vent units. Pilot, burner, sensors, and seals.",
    },
    bullets: [
      "Pilot, burner and thermocouple cleaned",
      "Glass front pulled, gasketed, and resealed",
      "Carbon monoxide test at the appliance",
      "Log placement reset to manufacturer spec",
    ],
    process: [
      { title: "Shutdown", desc: "Gas off, components allowed to cool." },
      { title: "Clean", desc: "Burner, pilot, and glass front cleaned of dust and residue." },
      { title: "Inspect", desc: "Seals, gaskets, venting, and ignition components checked." },
      { title: "Test", desc: "Relight, draft test, and CO check at the front of the unit." },
    ],
    signs: [
      "Soot or yellow flame on a gas unit",
      "Pilot won't stay lit",
      "Hasn't been serviced in 12+ months",
      "Faint odor when the unit runs",
    ],
    faqs: [
      { q: "How often should gas be serviced?", a: "Once a year, same as wood. Different work, equally important." },
      { q: "Do you work on all brands?", a: "Yes — Heat & Glo, Majestic, Lennox, Napoleon, Mendota, Regency, and more." },
    ],
    related: ["chimney-sweep", "annual-plan", "level-1-inspection"],
    metaDescription: "Gas fireplace service in Ohio. Annual tune-up: pilot, burner, seals, and CO check for vented gas inserts and log sets.",
  },
  {
    slug: "dryer-vent-cleaning",
    warranty: "1-Year Warranty",
    title: "Dryer Vent Cleaning",
    shortTitle: "Dryer Vent Cleaning",
    tagline: "The other lint trap nobody empties — until it catches fire.",
    price: "$118",
    duration: "",
    icon: AlertTriangle,
    variant: "maintenance",
    accent: "amber",
    hero: {
      eyebrow: "Fire prevention",
      headline: "Clogged dryer vents start ~13,000 fires a year.",
      sub: "Same crew, same truck. We clean your dryer vent end-to-end with rotary brushes and HEPA vacuum.",
    },
    bullets: [
      "Brushed end-to-end, not just blown",
      "Termination cover cleaned or replaced",
      "Airflow tested before and after",
      "Bundle with a sweep and save",
    ],
    process: [
      { title: "Disconnect", desc: "Dryer pulled, vent disconnected at both ends." },
      { title: "Brush", desc: "Rotary brush run through the full length." },
      { title: "Vacuum", desc: "HEPA vac catches everything dislodged." },
      { title: "Test", desc: "Airflow checked at the termination." },
    ],
    signs: [
      "Clothes take more than one cycle to dry",
      "Dryer is hot to the touch after a load",
      "Burning smell when running",
      "It's been over a year since the last cleaning",
    ],
    faqs: [
      { q: "Why not just clean the lint trap?", a: "The lint trap only catches a fraction. The rest builds up in the duct itself." },
      { q: "Do you do commercial?", a: "Yes — multi-unit and laundromats. Call for a quote." },
    ],
    related: ["chimney-sweep", "annual-plan", "level-1-inspection"],
    metaDescription: "Dryer vent cleaning in Ohio with rotary brushes and HEPA vacuum. Prevent the #1 cause of laundry-room fires.",
  },
  {
    slug: "annual-plan",
    warranty: "Cancel Anytime",
    title: "Annual Chimney Service Plan",
    shortTitle: "Annual Service Plan",
    tagline: "Set it and forget it. We'll remind you when it's time.",
    price: "$218/yr",
    duration: "",
    icon: HomeIcon,
    variant: "plan",
    accent: "leaf",
    hero: {
      eyebrow: "Membership",
      headline: "One price. One call a year. Zero worry.",
      sub: "Yearly sweep, Level 1 inspection, priority scheduling, and 10% off any repairs — for less than one emergency callout.",
    },
    bullets: [
      "Yearly sweep + Level 1 inspection included",
      "10% off any repair, parts and labor",
      "Priority dispatch on emergencies",
      "Digital service history, transferable on sale",
    ],
    process: [
      { title: "Sign up", desc: "Card on file. We do the rest." },
      { title: "We schedule you", desc: "Reminder in the fall — you pick a window." },
      { title: "Annual visit", desc: "Sweep + inspection + report. In and out in 90 minutes." },
      { title: "Stay covered", desc: "Renews automatically. Cancel anytime." },
    ],
    signs: [
      "You forget when you last had it cleaned",
      "You burn wood every winter",
      "You want one less thing to manage",
      "You like 10% off everything",
    ],
    faqs: [
      { q: "Can I cancel anytime?", a: "Yes. No cancellation fee, ever." },
      { q: "Does it transfer if I sell?", a: "Yes — and the service history is a great selling point." },
    ],
    related: ["chimney-sweep", "level-1-inspection", "dryer-vent-cleaning"],
    metaDescription: "Annual chimney service plan in Ohio. Yearly sweep, inspection, priority dispatch, and 10% off repairs.",
  },
];

export function getService(slug: string): ServiceSpec | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const ACCENT_CLASSES: Record<
  ServiceSpec["accent"],
  { bg: string; text: string; border: string; ring: string }
> = {
  primary: {
    bg: "bg-primary",
    text: "text-primary",
    border: "border-primary",
    ring: "ring-primary/30",
  },
  flame: {
    bg: "bg-flame",
    text: "text-flame",
    border: "border-flame",
    ring: "ring-flame/30",
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-amber-500",
    border: "border-amber-500",
    ring: "ring-amber-500/30",
  },
  sky: {
    bg: "bg-sky-500",
    text: "text-sky-500",
    border: "border-sky-500",
    ring: "ring-sky-500/30",
  },
  leaf: {
    bg: "bg-emerald-500",
    text: "text-emerald-500",
    border: "border-emerald-500",
    ring: "ring-emerald-500/30",
  },
};