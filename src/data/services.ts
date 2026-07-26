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
import techCrownWaterproofAsset from "@/assets/team-jobs/tech-crown-waterproof.jpeg.asset.json";
import newAluminumCapAsset from "@/assets/gallery-new/new-aluminum-cap.jpeg.asset.json";
import project07FlueBeforeAsset from "@/assets/projects/project-07-flue-before.jpg.asset.json";
import project05CrownRebuildAsset from "@/assets/projects/project-05-crown-rebuild.jpg.asset.json";
import project02TuckpointAsset from "@/assets/projects/project-02-tuckpointing-after.jpg.asset.json";
import tuckpointTech2Asset from "@/assets/real/tuckpoint-tech-2.png.asset.json";
import baBrickCopperFlashAsset from "@/assets/gallery-new/new-brick-copper-flash.jpeg.asset.json";
import baCopperFlashDetailAsset from "@/assets/gallery-new/new-copper-flashing-detail.jpeg.asset.json";
import baBrickCrownSealAsset from "@/assets/gallery-new/new-brick-crown-seal.jpeg.asset.json";
import newChimneyRestoredAsset from "@/assets/uploads/new-chimney-restored.jpeg.asset.json";
import fireplaceInteriorAsset from "@/assets/gallery-new/new-fireplace-interior.jpeg.asset.json";
import techFireplaceBurnerAsset from "@/assets/team-jobs/tech-fireplace-burner.jpeg.asset.json";
import newTechFireplaceAsset from "@/assets/uploads/new-tech-fireplace.jpeg.asset.json";
// Additional gallery photos re-used for accurate per-service matching.
import gj4Asset from "@/assets/gallery-jobs/gj4.jpeg.asset.json";
import gj5Asset from "@/assets/gallery-jobs/gj5.jpeg.asset.json";
import gj9Asset from "@/assets/gallery-jobs/gj9.jpeg.asset.json";
import gj14Asset from "@/assets/gallery-jobs/gj14.jpeg.asset.json";
import gj17Asset from "@/assets/gallery-jobs/gj17.jpeg.asset.json";
import gj18Asset from "@/assets/gallery-jobs/gj18.jpeg.asset.json";
import job0Asset from "@/assets/uploads/job0.jpeg.asset.json";
import job2Asset from "@/assets/uploads/job_2.jpeg.asset.json";
import job3Asset from "@/assets/uploads/job_3.jpeg.asset.json";
import job4Asset from "@/assets/uploads/job_4.jpeg.asset.json";
import job5Asset from "@/assets/uploads/job_5.jpeg.asset.json";
import job6Asset from "@/assets/uploads/job_6.jpeg.asset.json";
import job7Asset from "@/assets/uploads/job_7.jpeg.asset.json";
import job8Asset from "@/assets/uploads/job_8.jpeg.asset.json";
import boomliftInspectAsset from "@/assets/uploads/new-boomlift-inspect.jpeg.asset.json";
import meshCapCloseupAsset from "@/assets/gallery-new/new-mesh-cap-closeup.jpeg.asset.json";
import chimneyNightRebuildAsset from "@/assets/team-jobs/chimney-night-rebuild.jpeg.asset.json";
import techStoneChimneyCapAsset from "@/assets/team-jobs/tech-stone-chimney-cap.jpeg.asset.json";
// New uploads (2026-07-26 batch)
import capInstallBrickMeshAsset from "@/assets/uploads2/cap-install-brick-mesh.jpeg.asset.json";
import crownPargeSideFreshAsset from "@/assets/uploads2/crown-parge-side-fresh.jpeg.asset.json";
import crownPargeCloseupAsset from "@/assets/uploads2/crown-parge-closeup.jpeg.asset.json";
import capDomedCrownFlueAsset from "@/assets/uploads2/cap-domed-crown-flue.jpeg.asset.json";
import crownPargeOverheadAsset from "@/assets/uploads2/crown-parge-overhead.jpeg.asset.json";
import brickChimneyTallRestoredAsset from "@/assets/uploads2/brick-chimney-tall-restored.jpeg.asset.json";
import brickChimneyRestoredCapAsset from "@/assets/uploads2/brick-chimney-restored-cap.jpeg.asset.json";
import brickTuckpointDoubleCrownAsset from "@/assets/uploads2/brick-tuckpoint-double-crown.jpeg.asset.json";
import brickChimneyWhiteCrownCapAsset from "@/assets/uploads2/brick-chimney-white-crown-cap.jpeg.asset.json";

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
const techCrownWaterproof = techCrownWaterproofAsset.url;
const newAluminumCap = newAluminumCapAsset.url;
const project07FlueBefore = project07FlueBeforeAsset.url;
const project05CrownRebuild = project05CrownRebuildAsset.url;
const project02Tuckpoint = project02TuckpointAsset.url;
const tuckpointTech2 = tuckpointTech2Asset.url;
const baBrickCopperFlash = baBrickCopperFlashAsset.url;
const baCopperFlashDetail = baCopperFlashDetailAsset.url;
const baBrickCrownSeal = baBrickCrownSealAsset.url;
const newChimneyRestored = newChimneyRestoredAsset.url;
const fireplaceInterior = fireplaceInteriorAsset.url;
const techFireplaceBurner = techFireplaceBurnerAsset.url;
const newTechFireplace = newTechFireplaceAsset.url;
const gj4 = gj4Asset.url;
const gj5 = gj5Asset.url;
const gj9 = gj9Asset.url;
const gj14 = gj14Asset.url;
const gj17 = gj17Asset.url;
const gj18 = gj18Asset.url;
const job0 = job0Asset.url;
const job2 = job2Asset.url;
const job3 = job3Asset.url;
const job4 = job4Asset.url;
const job5 = job5Asset.url;
const job6 = job6Asset.url;
const job7 = job7Asset.url;
const job8 = job8Asset.url;
const boomliftInspect = boomliftInspectAsset.url;
const meshCapCloseup = meshCapCloseupAsset.url;
const chimneyNightRebuild = chimneyNightRebuildAsset.url;
const techStoneChimneyCap = techStoneChimneyCapAsset.url;
const capInstallBrickMesh = capInstallBrickMeshAsset.url;
const crownPargeSideFresh = crownPargeSideFreshAsset.url;
const crownPargeCloseup = crownPargeCloseupAsset.url;
const capDomedCrownFlue = capDomedCrownFlueAsset.url;
const crownPargeOverhead = crownPargeOverheadAsset.url;
const brickChimneyTallRestored = brickChimneyTallRestoredAsset.url;
const brickChimneyRestoredCap = brickChimneyRestoredCapAsset.url;
const brickTuckpointDoubleCrown = brickTuckpointDoubleCrownAsset.url;
const brickChimneyWhiteCrownCap = brickChimneyWhiteCrownCapAsset.url;

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
      return crownPargeOverhead;
    case "level-1-inspection":
      return sweepCloseupPhoto;
    case "level-2-inspection":
      return boomliftInspect;
    case "waterproofing":
      return techCrownWaterproof;
    case "flashing-repair":
      return job7;
    case "liner-install":
      return techLinerInstall;
    case "firebox-rebuild":
      return gj17;
    case "smoke-chamber-parging":
      return crownDemoInProgress;
    case "cap-install":
      return capInstallBrickMesh;
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
    // Chimney Repair — new SEO pages
    case "chimney-crown-repair":
      return crownPargeSideFresh;
    case "chimney-crown-replacement":
      return brickChimneyWhiteCrownCap;
    case "chimney-cap-repair":
      return capInstallBrickMesh;
    case "chimney-cap-replacement":
      return capDomedCrownFlue;
    case "chimney-liner-repair":
      return job2;
    case "chimney-flue-repair":
      return project07FlueBefore;
    case "chimney-leak-repair":
      return job6;
    case "chimney-mortar-repair":
      return baBrickCopperFlash;
    case "chimney-spalling-repair":
      return baSpalledBrick;
    // Sweep & Inspection — new
    case "chimney-cleaning":
      return chimneyJobA;
    case "chimney-maintenance":
      return chimneyJobB;
    // Fireplace — new
    case "wood-fireplace-service":
      return gj5;
    case "wood-fireplace-repair":
      return gj14;
    case "wood-fireplace-insert":
      return fireplaceCozy;
    case "gas-fireplace-repair":
      return newTechFireplace;
    case "gas-fireplace-insert":
      return fireplaceInterior;
    case "gas-fireplace-cleaning":
      return techFireplaceBurner;
    case "fireplace-damper-repair":
      return gj4;
    // Masonry — new
    case "chimney-masonry-repair":
      return brickChimneyRestoredCap;
    case "chimney-brick-repair":
      return brickChimneyTallRestored;
    case "chimney-tuckpointing":
      return brickTuckpointDoubleCrown;
    case "brick-repair":
      return brickChimneyTallRestored;
    case "tuckpointing":
      return brickTuckpointDoubleCrown;
    case "brick-wall-repair":
      return brickChimneyRestoredCap;
    case "foundation-masonry":
      return techStoneChimneyCap;
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
  // ===================================================================
  // Chimney Repair — SEO-focused pages (Royal-style)
  // ===================================================================
  {
    slug: "chimney-crown-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Crown Repair",
    shortTitle: "Crown Repair",
    tagline: "Seal hairline cracks before they become a full rebuild.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Hammer, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Crown restoration",
      headline: "A hairline crack today is a leaking chimney tomorrow.",
      sub: "For crowns that are structurally sound but cracked, we clean, prep, and resurface with CrownCoat flexible sealer — a 15-year fix without the cost of a full replacement.",
    },
    bullets: [
      "CrownCoat elastomeric sealer — flexes with freeze-thaw",
      "Hairline through 1/4\" cracks bridged and waterproofed",
      "Two-coat application, 15-year product warranty",
      "Includes waterproofing of the top course of brick",
    ],
    process: [
      { title: "Assess", desc: "Rooftop photos — confirm the crown is a repair candidate, not a rebuild." },
      { title: "Prep", desc: "Wire-brush, clean, and prime the crown surface." },
      { title: "Seal", desc: "Two coats of CrownCoat troweled and rolled over the entire crown." },
      { title: "Warranty", desc: "Photo report + 15-year manufacturer warranty on file." },
    ],
    signs: [
      "Hairline cracks on the top slab",
      "Small chips at the edge of the crown",
      "Efflorescence (white staining) on brick just below the crown",
      "Crown is intact but weathered",
    ],
    faqs: [
      { q: "Repair vs replacement?", a: "If cracks are wider than 1/4\" or the crown is spalling, we recommend replacement. Anything smaller is a candidate for a repair." },
      { q: "How long does the repair last?", a: "15 years per the manufacturer, in Ohio's freeze-thaw climate." },
    ],
    related: ["chimney-crown-replacement", "waterproofing", "crown-tuckpoint"],
    metaDescription: "Chimney crown repair in Ohio with CrownCoat elastomeric sealer. 15-year warranty. Stop leaks before they become rebuilds.",
  },
  {
    slug: "chimney-crown-replacement",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Crown Replacement",
    shortTitle: "Crown Replacement",
    tagline: "Full crown re-pour with proper overhang and drip edge.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: HardHat, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Full masonry re-pour",
      headline: "When a crown is past saving, half-measures just delay a bigger bill.",
      sub: "We demo the failed crown, form up a proper 3\" reinforced concrete slab with 2\" overhang, drip edge, and expansion bond around the flue tile — the way a crown was supposed to be built the first time.",
    },
    bullets: [
      "3\" reinforced concrete slab — not mortar wash",
      "2\" overhang with drip edge sheds water off brick",
      "Compressible bond around flue tile prevents thermal cracking",
      "Includes waterproofing of the top masonry course",
    ],
    process: [
      { title: "Demo", desc: "Cracked or spalled crown broken out to the top course of brick." },
      { title: "Form", desc: "Wood forms set with overhang; stainless mesh laid for reinforcement." },
      { title: "Pour", desc: "High-strength concrete poured, screeded, and finished." },
      { title: "Cure + seal", desc: "48-hour cure, then ChimneySaver sealer applied." },
    ],
    signs: [
      "Wide cracks across the top slab",
      "Missing chunks or crown breaking apart",
      "Original mortar-wash crown that was never a real crown",
      "Water leaking down the interior of the flue",
    ],
    faqs: [
      { q: "Why so much more than a repair?", a: "A full replacement means demo, forming, rebar, concrete, and cure time. It's a two-day job that lasts 30+ years." },
      { q: "Do I need to be home?", a: "No — everything is exterior. We just need roof access." },
    ],
    related: ["chimney-crown-repair", "crown-tuckpoint", "waterproofing"],
    metaDescription: "Chimney crown replacement in Ohio. 3\" reinforced concrete slab with proper overhang and drip edge. 30+ year rebuild.",
  },
  {
    slug: "chimney-cap-repair",
    warranty: "5-Year Warranty",
    title: "Chimney Cap Repair",
    shortTitle: "Cap Repair",
    tagline: "Bent mesh, missing bolts, rusted lids — fixed in one visit.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Wrench, variant: "repair", accent: "primary",
    hero: {
      eyebrow: "Cap restoration",
      headline: "A damaged cap fails silently until an animal or storm gets in.",
      sub: "We straighten and re-bolt salvageable caps, patch damaged mesh, and replace failed hardware with stainless — extending the life of a cap you already own.",
    },
    bullets: [
      "Mesh straightened or spot-replaced",
      "Rusted or missing bolts replaced with stainless",
      "Cap re-seated on the crown and re-torqued",
      "5-year warranty on the repair",
    ],
    process: [
      { title: "Inspect", desc: "Confirm the cap is a candidate for repair vs replacement." },
      { title: "Repair", desc: "Straighten mesh, replace hardware, re-seat cap on the crown." },
      { title: "Photo report", desc: "Before/after photos so you see the fix." },
    ],
    signs: [
      "Cap looks dented or leaning",
      "Mesh has a hole or torn corner",
      "Cap wiggles when touched",
      "Recent storm damage",
    ],
    faqs: [
      { q: "Repair vs replace?", a: "If the cap body is rusted through or mesh is missing on multiple sides, replacement is cheaper long-term. Otherwise repair is a great value." },
      { q: "Do you carry parts?", a: "Yes — stainless hardware and mesh in the truck for same-day fixes." },
    ],
    related: ["chimney-cap-replacement", "cap-install", "animal-removal"],
    metaDescription: "Chimney cap repair in Ohio. Bent mesh, rusted bolts, and damaged caps fixed with stainless hardware.",
  },
  {
    slug: "chimney-cap-replacement",
    warranty: "Lifetime Stainless Warranty",
    title: "Chimney Cap Replacement",
    shortTitle: "Cap Replacement",
    tagline: "Swap the rusted galvanized cap for lifetime stainless.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: ShieldCheck, variant: "install", accent: "primary",
    hero: {
      eyebrow: "Lifetime stainless upgrade",
      headline: "The builder's cap was never meant to last.",
      sub: "We pull the old rusted cap and install a proper 304/316 stainless replacement — bolted, gasketed, and sized to your exact flue opening.",
    },
    bullets: [
      "304 or 316 stainless — outlives the chimney",
      "Sized to your exact flue opening (no shims)",
      "Bolted to the crown with stainless hardware",
      "Mesh spark arrestor included",
    ],
    process: [
      { title: "Measure", desc: "Old cap removed, flue measured precisely." },
      { title: "Install", desc: "New stainless cap bolted to the crown with high-temp sealant." },
      { title: "Warranty", desc: "Lifetime stainless warranty handed off in writing." },
    ],
    signs: [
      "Rust streaks on the crown or brick",
      "Galvanized cap is 10+ years old",
      "Cap has holes, cracks, or missing sides",
      "Multi-flue cap sagging in the middle",
    ],
    faqs: [
      { q: "Difference from cap installation?", a: "Replacement means removing an existing cap first. Same product, includes the removal." },
      { q: "Do you handle multi-flue caps?", a: "Yes — custom-fabricated to your chimney's exact dimensions." },
    ],
    related: ["cap-install", "chimney-cap-repair", "chase-cover-replacement"],
    metaDescription: "Chimney cap replacement in Ohio. Lifetime stainless caps custom-fitted to your flue. Removes old rusted cap.",
  },
  {
    slug: "chimney-liner-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Liner Repair",
    shortTitle: "Liner Repair",
    tagline: "Cracked tiles patched with HeatShield — before a full re-liner.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Wrench, variant: "repair", accent: "flame",
    hero: {
      eyebrow: "HeatShield certified",
      headline: "Not every cracked liner needs a full re-line.",
      sub: "For clay tile liners with joint gaps or minor cracks, we apply the HeatShield ceramic system — a UL-listed repair that seals gaps and restores a smooth flue interior.",
    },
    bullets: [
      "HeatShield ceramic joint repair — UL 1777 listed",
      "Cerfractory-Flue sealant for minor cracks",
      "Camera-inspected before + after",
      "Fraction of the cost of a full liner replacement",
    ],
    process: [
      { title: "Camera scan", desc: "Full flue camera pass to confirm HeatShield candidacy." },
      { title: "Apply", desc: "Foam applicator drawn up through the flue, sealant tools cracks and joints." },
      { title: "Verify", desc: "Camera scan after cure to confirm every gap is sealed." },
    ],
    signs: [
      "Level 2 inspection flagged cracked tiles",
      "Gaps between clay tile joints",
      "Small cracks with no offset or missing sections",
      "Insurance won't cover a full re-liner yet",
    ],
    faqs: [
      { q: "When does HeatShield NOT work?", a: "If tiles are missing, offset, or the flue is structurally compromised, a stainless re-liner is the right fix." },
      { q: "Is it code-compliant?", a: "Yes — HeatShield is UL 1777 listed for wood, gas, oil, and pellet." },
    ],
    related: ["liner-install", "chimney-flue-repair", "level-2-inspection"],
    metaDescription: "Chimney liner repair in Ohio with HeatShield ceramic system. UL-listed repair for cracked clay tile flues.",
  },
  {
    slug: "chimney-flue-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Flue Repair",
    shortTitle: "Flue Repair",
    tagline: "Restore a damaged flue without ripping out the chimney.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Flame, variant: "repair", accent: "flame",
    hero: {
      eyebrow: "Flue restoration",
      headline: "Your flue is the last line of defense between fire and framing.",
      sub: "Depending on the damage, we repair with HeatShield ceramic, re-parge the smoke chamber, or install a new stainless liner. We recommend the smallest fix that will actually work.",
    },
    bullets: [
      "Camera-scanned diagnosis first",
      "HeatShield ceramic repair for cracked tiles",
      "Stainless re-line when tiles are missing or offset",
      "Smoke chamber parging when corbeled steps are rough",
    ],
    process: [
      { title: "Diagnose", desc: "Full flue camera scan, photos of every defect." },
      { title: "Recommend", desc: "The smallest fix that resolves the problem — not always the most expensive." },
      { title: "Repair", desc: "HeatShield, re-line, or parge as needed." },
      { title: "Verify", desc: "Post-repair camera scan and burn test." },
    ],
    signs: [
      "Cracked or missing flue tiles on inspection",
      "Smoke or heat entering the wall cavity",
      "Failed a Level 2 inspection",
      "New wood stove or insert being installed",
    ],
    faqs: [
      { q: "How do I know what my flue needs?", a: "A Level 2 camera inspection is the only way. We scan first, quote after." },
      { q: "Can I keep using the fireplace meanwhile?", a: "If we've flagged a defect that could allow heat transfer to framing, no. Safety first." },
    ],
    related: ["liner-install", "chimney-liner-repair", "smoke-chamber-parging"],
    metaDescription: "Chimney flue repair in Ohio. HeatShield, stainless re-line, or smoke chamber parging based on camera diagnosis.",
  },
  {
    slug: "chimney-leak-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Leak Repair",
    shortTitle: "Leak Repair",
    tagline: "Find the actual leak source. Fix it once.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: CloudRain, variant: "repair", accent: "sky",
    hero: {
      eyebrow: "Leak diagnosis + fix",
      headline: "Water can enter a chimney at five different places.",
      sub: "Most \"leak repairs\" are just caulking guesswork. We diagnose the actual entry point — crown, cap, flashing, mortar, or brick — then fix that specific problem so it doesn't come back next storm.",
    },
    bullets: [
      "Five-point leak diagnosis (crown / cap / flashing / mortar / brick)",
      "Written report showing exactly where water is entering",
      "Fix the source, not the symptom",
      "Follow-up rain test guarantee",
    ],
    process: [
      { title: "Investigate", desc: "Interior and exterior inspection, water-staining trace, sometimes a controlled water test." },
      { title: "Diagnose", desc: "Photo report showing the actual leak source ranked by likelihood." },
      { title: "Fix", desc: "Whatever the source needs — crown, flashing, tuckpoint, or waterproofing." },
      { title: "Verify", desc: "Rain-test follow-up call. If it leaks again from the same source, we come back." },
    ],
    signs: [
      "Ceiling stains near the chimney after rain",
      "Water in the firebox after a storm",
      "Musty smell from the fireplace",
      "Efflorescence (white staining) on interior walls",
    ],
    faqs: [
      { q: "Why not just caulk it?", a: "Because caulk fails in 12–24 months and hides the real problem. We fix the source." },
      { q: "Do you guarantee no more leaks?", a: "Yes — if the same source leaks again within 10 years, we come back at no charge." },
    ],
    related: ["flashing-repair", "waterproofing", "crown-tuckpoint"],
    metaDescription: "Chimney leak repair in Ohio. Five-point diagnosis to find the real leak source — crown, cap, flashing, mortar, or brick.",
  },
  {
    slug: "chimney-mortar-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Mortar Repair",
    shortTitle: "Mortar Repair",
    tagline: "Grind out failing joints. Re-mortar with color-matched Type N.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Hammer, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Joint restoration",
      headline: "Once the mortar goes, the brick is next.",
      sub: "We grind out failed mortar joints to a proper depth and re-point with color-matched Type N mortar — restoring both weather-tightness and appearance.",
    },
    bullets: [
      "Failed joints ground out to 3/4\" depth",
      "Type N mortar (correct for chimneys, not Type S)",
      "Color-matched to the existing joint",
      "10-year workmanship warranty",
    ],
    process: [
      { title: "Grind", desc: "Failed joints cut out with a diamond blade to proper depth." },
      { title: "Point", desc: "Fresh Type N mortar packed and tooled to match existing profile." },
      { title: "Cure", desc: "Damp-cured for 48 hours for full strength." },
    ],
    signs: [
      "Crumbling or missing mortar between bricks",
      "You can slide a fingernail into a joint",
      "Mortar looks eroded or washed out",
      "Loose bricks anywhere on the chimney",
    ],
    faqs: [
      { q: "Can I just caulk the joints?", a: "No — caulk traps moisture in the brick and accelerates spalling. Real mortar breathes." },
      { q: "Why Type N and not Type S?", a: "Type S is harder than most historic brick and will crack the brick faces. Type N is the correct chimney mortar." },
    ],
    related: ["crown-tuckpoint", "chimney-tuckpointing", "chimney-brick-repair"],
    metaDescription: "Chimney mortar repair in Ohio. Failed joints ground out and re-pointed with color-matched Type N mortar.",
  },
  {
    slug: "chimney-spalling-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Spalling Repair",
    shortTitle: "Spalling Repair",
    tagline: "Replace popped brick faces. Stop the freeze-thaw cycle.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: HardHat, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Brick replacement",
      headline: "Spalling bricks mean water is already inside.",
      sub: "We remove and replace popped-face bricks with color-matched units, re-mortar, and waterproof — stopping the freeze-thaw damage before it hits the flue.",
    },
    bullets: [
      "Damaged bricks removed and replaced individually",
      "Color-matched replacement brick",
      "Type N mortar, tooled to match existing joints",
      "ChimneySaver waterproofing applied at completion",
    ],
    process: [
      { title: "Assess", desc: "Photo-map every spalled brick and rank by severity." },
      { title: "Replace", desc: "Damaged bricks chiseled out and replaced with matching units." },
      { title: "Point + seal", desc: "Fresh mortar, cured, then ChimneySaver sealer top-to-bottom." },
    ],
    signs: [
      "Brick faces popping off the chimney",
      "Piles of brick chunks on the roof or ground",
      "White staining (efflorescence) on the brick",
      "Rust streaks or bulging brick",
    ],
    faqs: [
      { q: "Why does brick spall?", a: "Water enters porous brick, freezes, expands, and pops the face off. Sealing after repair prevents recurrence." },
      { q: "Can you match my brick?", a: "Almost always — we source from local brickyards with a good match rate. If not exact, we blend for a natural look." },
    ],
    related: ["chimney-brick-repair", "waterproofing", "chimney-mortar-repair"],
    metaDescription: "Chimney spalling repair in Ohio. Popped-face bricks replaced with color-matched units. Includes ChimneySaver waterproofing.",
  },
  // ===================================================================
  // Sweep & Inspection — SEO twins
  // ===================================================================
  {
    slug: "chimney-cleaning",
    warranty: "Satisfaction Guaranteed",
    title: "Chimney Cleaning",
    shortTitle: "Chimney Cleaning",
    tagline: "Same-day HEPA-contained cleaning — starts from $99.",
    price: "$99", duration: "",
    icon: Wind, variant: "maintenance", accent: "primary",
    hero: {
      eyebrow: "Annual maintenance",
      headline: "A clean chimney is a safe chimney.",
      sub: "Full HEPA-contained cleaning of the firebox, smoke chamber, damper, and flue. No mess. Photo report included.",
    },
    bullets: [
      "Drop cloths and dual-HEPA vacuum sealed to the firebox",
      "Rotary brush cleaning from cap to smoke shelf",
      "Firebox, damper, smoke chamber, and flue included",
      "Photo report emailed same day",
    ],
    process: [
      { title: "Setup", desc: "Floor protection, HEPA vacuum sealed to firebox." },
      { title: "Clean", desc: "Rotary brush from cap to smoke shelf, all soot vacuumed out." },
      { title: "Report", desc: "Photos + written summary in your inbox before we leave." },
    ],
    signs: [
      "Over a year since the last cleaning",
      "Smoky smell in the house when the fireplace is cold",
      "Dark, flaky build-up in the firebox",
      "Slow-starting fires or smoke back-drafting",
    ],
    faqs: [
      { q: "How is this different from a sweep?", a: "It's the same service — 'sweep' and 'cleaning' are two names for the same thing in the trade." },
      { q: "Do you clean gas fireplaces too?", a: "Yes, but they use a different process — see our Gas Fireplace Cleaning page." },
    ],
    related: ["chimney-sweep", "level-1-inspection", "annual-plan"],
    metaDescription: "Chimney cleaning in Ohio. HEPA-contained rotary brush cleaning of firebox, smoke chamber, and flue. Starts from $99.",
  },
  {
    slug: "chimney-maintenance",
    warranty: "Cancel Anytime",
    title: "Chimney Maintenance",
    shortTitle: "Chimney Maintenance",
    tagline: "Preventive care that keeps repairs off the books.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: HomeIcon, variant: "maintenance", accent: "leaf",
    hero: {
      eyebrow: "Preventive care",
      headline: "Maintenance is 10x cheaper than repair.",
      sub: "An annual maintenance visit catches crown cracks, failing mortar, and cap damage while they're still $200 fixes — not $5,000 rebuilds.",
    },
    bullets: [
      "Annual sweep + Level 1 inspection",
      "Cap, crown, flashing, and mortar visual check",
      "Written condition report ranked by urgency",
      "10% off any recommended repairs",
    ],
    process: [
      { title: "Visit", desc: "Sweep + interior/exterior inspection in one 90-minute stop." },
      { title: "Report", desc: "Photo report with any concerns ranked low/medium/high." },
      { title: "Recommend", desc: "Only what actually needs doing — we don't upsell." },
    ],
    signs: [
      "You want to catch problems early",
      "You use your fireplace regularly",
      "It's been 2+ years since the last professional visit",
      "You just bought the house",
    ],
    faqs: [
      { q: "Is this the same as your Annual Plan?", a: "The Annual Plan is our subscription version — same visit, plus priority scheduling and 10% off repairs." },
      { q: "How often do I need maintenance?", a: "Once a year is the industry standard, and matches NFPA guidance." },
    ],
    related: ["annual-plan", "chimney-sweep", "level-1-inspection"],
    metaDescription: "Chimney maintenance in Ohio. Annual sweep + inspection to catch problems before they become expensive repairs.",
  },
  // ===================================================================
  // Fireplace Services — SEO expansion
  // ===================================================================
  {
    slug: "wood-fireplace-service",
    warranty: "1-Year Service Warranty",
    title: "Wood Fireplace Service",
    shortTitle: "Wood Fireplace Service",
    tagline: "Full annual service for wood-burning fireplaces and stoves.",
    price: "$99", duration: "",
    icon: Flame, variant: "maintenance", accent: "flame",
    hero: {
      eyebrow: "Annual wood service",
      headline: "Your wood fireplace works hardest — service it like it.",
      sub: "Sweep, inspection, damper check, firebox review, and gasket check for freestanding stoves. Everything a wood-burning appliance needs to run safely all winter.",
    },
    bullets: [
      "Full sweep of flue, smoke chamber, and firebox",
      "Damper operation and gasket check",
      "Door gasket check on wood stoves and inserts",
      "Level 1 inspection included",
    ],
    process: [
      { title: "Sweep", desc: "HEPA-contained rotary brush cleaning." },
      { title: "Inspect", desc: "Firebox, damper, smoke chamber, flue, cap." },
      { title: "Service", desc: "Gaskets, door seals, and any hardware checked." },
      { title: "Report", desc: "Photo summary with any recommendations." },
    ],
    signs: [
      "You burn wood every winter",
      "It's been a year since the last visit",
      "Draft feels weaker than last season",
      "Door gasket looks worn or leaks smoke",
    ],
    faqs: [
      { q: "Includes stoves and inserts?", a: "Yes — freestanding wood stoves, fireplace inserts, and open-hearth fireplaces." },
      { q: "Do you work on the appliance itself?", a: "Yes — gasket replacement, glass cleaning, and minor hardware fixes are included." },
    ],
    related: ["chimney-sweep", "wood-fireplace-repair", "level-1-inspection"],
    metaDescription: "Wood fireplace service in Ohio. Annual sweep, inspection, damper and gasket check for wood fireplaces, stoves, and inserts.",
  },
  {
    slug: "wood-fireplace-repair",
    warranty: "1-Year Service Warranty",
    title: "Wood Fireplace Repair",
    shortTitle: "Wood Fireplace Repair",
    tagline: "Damper, gasket, glass, firebox — we fix what wears out.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Wrench, variant: "repair", accent: "flame",
    hero: {
      eyebrow: "Wood fireplace repair",
      headline: "Wood fireplaces are simple — until something breaks.",
      sub: "Broken damper handles, worn door gaskets, cracked glass, deteriorated firebrick — we carry the common parts and fix most issues in one visit.",
    },
    bullets: [
      "Damper handle and hardware replacement",
      "Door gasket and rope-seal replacement",
      "Ceramic glass replacement on inserts and stoves",
      "Firebrick and refractory panel repair",
    ],
    process: [
      { title: "Diagnose", desc: "Identify the failed part or panel." },
      { title: "Source", desc: "Match manufacturer part or a spec-equivalent replacement." },
      { title: "Repair", desc: "Install, seal, and test-fire under supervision." },
    ],
    signs: [
      "Damper won't open or close",
      "Smoke leaking around a stove door",
      "Cracked glass on an insert",
      "Crumbling firebrick or refractory panels",
    ],
    faqs: [
      { q: "Do you work on all brands?", a: "Almost all — Vermont Castings, Jotul, Regency, Napoleon, Lopi, Quadra-Fire, and more." },
      { q: "Are parts under warranty?", a: "Our workmanship is warrantied 1 year; parts carry the manufacturer's warranty." },
    ],
    related: ["wood-fireplace-service", "firebox-rebuild", "damper-repair"],
    metaDescription: "Wood fireplace repair in Ohio. Damper, gasket, glass, and firebrick repair for wood stoves, inserts, and fireplaces.",
  },
  {
    slug: "wood-fireplace-insert",
    warranty: "10-Year Workmanship Warranty",
    title: "Wood Fireplace Insert Installation",
    shortTitle: "Wood Insert",
    tagline: "Turn an inefficient masonry fireplace into a real heat source.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Flame, variant: "install", accent: "flame",
    hero: {
      eyebrow: "Efficiency upgrade",
      headline: "An open fireplace loses heat. An insert makes it.",
      sub: "We install EPA-certified wood inserts from Regency, Napoleon, and Lopi with a proper insulated stainless liner — turning a decorative fireplace into a serious secondary heat source.",
    },
    bullets: [
      "EPA-certified insert (up to 80% efficiency)",
      "Insulated 316Ti stainless liner sized to the appliance",
      "Surround, blower, and hearth accessories included",
      "Full permit and inspection handled",
    ],
    process: [
      { title: "Measure", desc: "Firebox measured, appliance and liner sized." },
      { title: "Prep", desc: "Old damper removed, chimney cleaned, liner dropped." },
      { title: "Install", desc: "Insert set, connected, surround trimmed to fit." },
      { title: "Commission", desc: "First burn under our supervision. Photo record." },
    ],
    signs: [
      "Your open fireplace is more show than heat",
      "You want to reduce heating bills",
      "You have a functional masonry fireplace",
      "You're renovating and want a real fireplace",
    ],
    faqs: [
      { q: "How much heat will I gain?", a: "A modern insert can heat 1,500–2,500 sq ft. Most customers reduce their heating bill 20–40%." },
      { q: "Wood vs gas insert?", a: "Wood is cheaper to run if you have wood access. Gas is more convenient. Both are big upgrades over an open fireplace." },
    ],
    related: ["wood-fireplace-service", "liner-install", "gas-fireplace-insert"],
    metaDescription: "Wood fireplace insert installation in Ohio. EPA-certified inserts with insulated stainless liner. Up to 80% efficiency.",
  },
  {
    slug: "gas-fireplace-repair",
    warranty: "1-Year Service Warranty",
    title: "Gas Fireplace Repair",
    shortTitle: "Gas Fireplace Repair",
    tagline: "Pilot won't stay lit? Won't turn on? We diagnose and fix same-visit.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Wrench, variant: "repair", accent: "flame",
    hero: {
      eyebrow: "Gas appliance repair",
      headline: "Most 'broken' gas fireplaces are a $50 part away from working.",
      sub: "Thermocouples, thermopiles, pilot assemblies, gas valves, ignition modules — we carry the common parts and diagnose most issues in one visit.",
    },
    bullets: [
      "Thermocouple / thermopile testing and replacement",
      "Pilot assembly cleaning and replacement",
      "Gas valve and ignition module diagnostics",
      "CO test after every repair",
    ],
    process: [
      { title: "Diagnose", desc: "Multimeter check of the millivolt system, visual inspection of burner and pilot." },
      { title: "Repair", desc: "Replace failed component with manufacturer-spec part." },
      { title: "Test", desc: "Full function test, draft check, and CO reading before we leave." },
    ],
    signs: [
      "Pilot lights but goes out when you release the knob",
      "Won't ignite at all",
      "Flame is yellow or sooty instead of blue",
      "Faint gas smell when the unit is on",
    ],
    faqs: [
      { q: "Should I try to fix it myself?", a: "No — gas work in Ohio requires a licensed technician. Improper repairs risk CO poisoning." },
      { q: "Do you carry parts for my brand?", a: "We stock parts for Heat & Glo, Majestic, Lennox, Napoleon, Mendota, Regency, and Vermont Castings." },
    ],
    related: ["gas-fireplace-service", "gas-fireplace-cleaning", "fireplace-damper-repair"],
    metaDescription: "Gas fireplace repair in Ohio. Thermocouple, pilot, and gas valve diagnostics with same-visit repair for most issues.",
  },
  {
    slug: "gas-fireplace-insert",
    warranty: "10-Year Workmanship Warranty",
    title: "Gas Fireplace Insert Installation",
    shortTitle: "Gas Insert",
    tagline: "Convert a wood-burning fireplace to convenient, efficient gas.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Flame, variant: "install", accent: "flame",
    hero: {
      eyebrow: "Wood-to-gas conversion",
      headline: "Flip a switch. Real fire. No wood.",
      sub: "We install direct-vent and B-vent gas inserts with a properly-sized aluminum or stainless liner, gas line, and remote — turning any masonry fireplace into a modern gas appliance.",
    },
    bullets: [
      "Direct-vent or B-vent gas insert installation",
      "Aluminum liner (B-vent) or stainless (direct-vent)",
      "Gas line run, permit, and inspection handled",
      "Wall thermostat or remote control included",
    ],
    process: [
      { title: "Measure", desc: "Firebox measured, gas supply confirmed, appliance selected." },
      { title: "Install", desc: "Liner dropped, insert set, gas line connected." },
      { title: "Commission", desc: "First light, flame adjustment, CO test." },
    ],
    signs: [
      "You have a wood fireplace you never use",
      "You want push-button fires with no cleanup",
      "You want a heat source during power outages",
      "You're renovating and going gas",
    ],
    faqs: [
      { q: "How is this different from a log set?", a: "An insert is a sealed appliance — higher efficiency, more heat output, safer. A log set sits in the existing firebox." },
      { q: "Do I need a gas line?", a: "Almost always yes — we run it as part of the install." },
    ],
    related: ["gas-fireplace-service", "wood-fireplace-insert", "liner-install"],
    metaDescription: "Gas fireplace insert installation in Ohio. Direct-vent and B-vent inserts with proper liner and gas line.",
  },
  {
    slug: "gas-fireplace-cleaning",
    warranty: "1-Year Service Warranty",
    title: "Gas Fireplace Cleaning",
    shortTitle: "Gas Fireplace Cleaning",
    tagline: "Dust and residue on gas units cause soot and CO risk.",
    price: "$49", duration: "",
    icon: Sparkles, variant: "maintenance", accent: "flame",
    hero: {
      eyebrow: "Annual gas maintenance",
      headline: "Gas fireplaces still need annual cleaning.",
      sub: "Dust, pet hair, and combustion residue build up on burner ports, sensors, and glass. We pull the glass, clean every surface, reset logs to manufacturer spec, and CO-test.",
    },
    bullets: [
      "Glass front pulled, cleaned, and gasketed",
      "Burner ports, pilot, and thermocouple cleaned",
      "Log placement reset to manufacturer spec",
      "CO test at the front of the appliance",
    ],
    process: [
      { title: "Cool", desc: "Gas off, unit allowed to cool." },
      { title: "Clean", desc: "Glass out, burner cleaned, logs cleaned and re-set." },
      { title: "Reassemble", desc: "Gasket checked, glass resealed, unit lit." },
      { title: "Test", desc: "Draft and CO check at the appliance." },
    ],
    signs: [
      "Cloudy or filmed glass front",
      "Yellow tips on the flame",
      "Faint burning-dust smell",
      "Hasn't been serviced in 12+ months",
    ],
    faqs: [
      { q: "How is this different from gas fireplace service?", a: "Cleaning focuses on the visible surfaces and log reset. Full service includes deeper diagnostics on ignition and venting." },
      { q: "Do you clean the exterior glass too?", a: "Yes — both sides of the glass front with manufacturer-approved cleaner." },
    ],
    related: ["gas-fireplace-service", "gas-fireplace-repair", "annual-plan"],
    metaDescription: "Gas fireplace cleaning in Ohio. Glass, burner, and log cleaning with CO test. Starts from $49.",
  },
  {
    slug: "fireplace-damper-repair",
    warranty: "5-Year Warranty",
    title: "Fireplace Damper Repair",
    shortTitle: "Fireplace Damper Repair",
    tagline: "Frozen, warped, or missing dampers — repaired or replaced.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Thermometer, variant: "repair", accent: "sky",
    hero: {
      eyebrow: "Fireplace damper service",
      headline: "A broken damper wastes heat 12 months a year.",
      sub: "We free stuck dampers, replace warped throat plates, and upgrade to top-sealing dampers when the original is beyond saving.",
    },
    bullets: [
      "Frozen or stuck throat dampers freed and lubricated",
      "Warped plates replaced in place",
      "Top-sealing damper upgrade for a true airtight seal",
      "Cable-operated, hand-pull from inside",
    ],
    process: [
      { title: "Diagnose", desc: "Confirm damper type and failure mode." },
      { title: "Repair or upgrade", desc: "Repair in place, or install a top-sealing damper on the crown." },
      { title: "Test", desc: "Full open/close cycle and seal verification." },
    ],
    signs: [
      "Damper stuck open or closed",
      "You feel a draft with the damper 'closed'",
      "Rust or warping on the throat plate",
      "Handle broken or missing",
    ],
    faqs: [
      { q: "Is this different from Damper Repair?", a: "It's the same service — 'Fireplace Damper Repair' and 'Damper Repair' describe the same work." },
      { q: "Top-sealing worth it?", a: "Yes if your damper leaks — a top-sealing damper pays for itself in 2–3 years in energy savings." },
    ],
    related: ["damper-repair", "chimney-cleaning", "annual-plan"],
    metaDescription: "Fireplace damper repair in Ohio. Stuck throat dampers freed, warped plates replaced, top-sealing damper upgrades.",
  },
  // ===================================================================
  // Masonry
  // ===================================================================
  {
    slug: "chimney-masonry-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Masonry Repair",
    shortTitle: "Chimney Masonry Repair",
    tagline: "Every masonry chimney fix — one crew, one warranty.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: HardHat, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Masonry restoration",
      headline: "The chimney is the most weather-exposed masonry on your house.",
      sub: "Full-service chimney masonry — crown, tuckpoint, brick replacement, waterproofing — from a crew that does chimneys every day, not general masons who dabble.",
    },
    bullets: [
      "Crown, tuckpoint, brick, and waterproofing under one estimate",
      "Chimney-specific crews (not general masons)",
      "Color-matched mortar and brick",
      "10-year workmanship warranty on all masonry",
    ],
    process: [
      { title: "Assess", desc: "Full rooftop inspection with photo report." },
      { title: "Scope", desc: "Line-item estimate of every recommended fix." },
      { title: "Restore", desc: "Repairs completed in the right order (structural → cosmetic → sealer)." },
    ],
    signs: [
      "Chimney is visibly deteriorated",
      "Multiple issues (crown + mortar + brick)",
      "General masonry contractor gave a vague quote",
      "You want one crew, one warranty",
    ],
    faqs: [
      { q: "Why not a general mason?", a: "Chimneys need chimney-specific knowledge — proper crown design, correct mortar type, flue-safe methods. General masons often use Type S mortar that cracks brick." },
      { q: "How long does a full restoration take?", a: "1–3 days for most residential chimneys, weather permitting." },
    ],
    related: ["crown-tuckpoint", "chimney-tuckpointing", "chimney-brick-repair"],
    metaDescription: "Chimney masonry repair in Ohio. Full-service crown, tuckpoint, brick, and waterproofing from chimney specialists.",
  },
  {
    slug: "chimney-brick-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Brick Repair",
    shortTitle: "Chimney Brick Repair",
    tagline: "Damaged brick replaced, color-matched, tooled to blend.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Hammer, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Brick replacement",
      headline: "One cracked brick can let water into the whole chimney.",
      sub: "We source color-matched replacement brick from local yards and swap damaged units individually — no full rebuild required when only a few bricks have failed.",
    },
    bullets: [
      "Individual brick replacement, not full rebuild",
      "Color and texture matched from local brickyards",
      "Type N mortar tooled to match original joint",
      "ChimneySaver sealer applied at completion",
    ],
    process: [
      { title: "Match", desc: "Photo comparison with brickyard samples for closest match." },
      { title: "Replace", desc: "Damaged brick chiseled out, replacement laid in Type N mortar." },
      { title: "Blend", desc: "Joints tooled and cleaned to disappear against original brick." },
    ],
    signs: [
      "Cracked or broken bricks visible on the chimney",
      "Missing corners or faces",
      "Impact damage from a fallen branch or storm",
      "Water staining from cracked brick",
    ],
    faqs: [
      { q: "Can you always match my brick?", a: "Very close, usually. Older brick can be harder — we blend the replacements throughout the chimney for a natural look." },
      { q: "When do you recommend a rebuild vs replacement?", a: "If more than ~20% of the chimney's brick is failing, a partial rebuild is often more cost-effective." },
    ],
    related: ["chimney-spalling-repair", "chimney-mortar-repair", "chimney-tuckpointing"],
    metaDescription: "Chimney brick repair in Ohio. Individual damaged bricks replaced with color-matched units. No full rebuild required.",
  },
  {
    slug: "chimney-tuckpointing",
    warranty: "10-Year Workmanship Warranty",
    title: "Chimney Tuckpointing",
    shortTitle: "Chimney Tuckpointing",
    tagline: "Fresh joints. Restored strength. Another 30 years.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Hammer, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Joint restoration",
      headline: "The mortar is what actually holds a chimney together.",
      sub: "We grind out failing joints and re-mortar with color-matched Type N, tooled to match the original profile — restoring both structural integrity and appearance.",
    },
    bullets: [
      "Failed joints ground out to 3/4\" depth",
      "Type N mortar (correct chimney mix)",
      "Color-matched and tooled to blend",
      "Includes waterproofing at completion",
    ],
    process: [
      { title: "Grind", desc: "Diamond blade cut to proper depth on every failed joint." },
      { title: "Point", desc: "Fresh Type N mortar packed and tooled to match original profile." },
      { title: "Cure + seal", desc: "48-hour damp cure, then ChimneySaver applied top-to-bottom." },
    ],
    signs: [
      "Mortar crumbling between bricks",
      "You can slide a fingernail into joints",
      "Vertical cracks running through joints",
      "Chimney looks weathered or streaked",
    ],
    faqs: [
      { q: "Grinding or chiseling?", a: "Grinding — it's cleaner, gives a proper flat back to the joint, and lets fresh mortar bond correctly." },
      { q: "How long will it last?", a: "30+ years in Ohio's climate with proper Type N mortar and waterproofing." },
    ],
    related: ["chimney-mortar-repair", "crown-tuckpoint", "chimney-brick-repair"],
    metaDescription: "Chimney tuckpointing in Ohio. Failed mortar joints ground out and re-pointed with color-matched Type N. Includes waterproofing.",
  },
  {
    slug: "brick-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Brick Repair",
    shortTitle: "Brick Repair",
    tagline: "Cracked, spalled, or missing brick — repaired to match.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Hammer, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Residential masonry",
      headline: "Brick that fails on one part of the house doesn't stay there.",
      sub: "Beyond chimneys, we repair damaged brick on porches, steps, foundations, retaining walls, and facades — same crew, same warranty.",
    },
    bullets: [
      "Individual brick replacement with color match",
      "Failed joints re-pointed with Type N",
      "Structural cracks assessed before cosmetic work",
      "10-year workmanship warranty",
    ],
    process: [
      { title: "Assess", desc: "Photo-map every damaged area, distinguish structural vs cosmetic." },
      { title: "Match", desc: "Source replacement brick from local yards." },
      { title: "Repair", desc: "Bricks replaced, joints re-pointed, area cleaned." },
    ],
    signs: [
      "Cracked or missing bricks on the house",
      "Spalling from freeze-thaw damage",
      "Impact damage on visible walls",
      "Discoloration or staining from failed brick",
    ],
    faqs: [
      { q: "Do you do full brick replacement?", a: "We handle repairs and partial replacement. Full re-brick of a wall is usually beyond a chimney company." },
      { q: "How is pricing determined?", a: "Number of bricks replaced, access, and match difficulty. All quotes are itemized." },
    ],
    related: ["chimney-brick-repair", "tuckpointing", "brick-wall-repair"],
    metaDescription: "Brick repair in Ohio. Cracked, spalled, and missing brick on porches, steps, foundations, and facades — color-matched and warrantied.",
  },
  {
    slug: "tuckpointing",
    warranty: "10-Year Workmanship Warranty",
    title: "Tuckpointing",
    shortTitle: "Tuckpointing",
    tagline: "Re-mortar failed joints anywhere on the home — not just chimneys.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: Hammer, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Residential tuckpointing",
      headline: "Failed mortar means water in the wall.",
      sub: "We grind out failing joints and re-mortar with color-matched Type N or Type O — restoring weather-tightness on chimneys, porches, foundations, and facades.",
    },
    bullets: [
      "Diamond-blade grind to proper 3/4\" depth",
      "Type N or Type O based on brick softness",
      "Color-matched and tooled to blend",
      "Sealed at completion if requested",
    ],
    process: [
      { title: "Assess", desc: "Photo-map failed joints and select correct mortar type." },
      { title: "Grind", desc: "Diamond blade removes failed mortar without damaging brick." },
      { title: "Point", desc: "Fresh mortar packed and tooled to match original profile." },
    ],
    signs: [
      "Crumbling or missing joints",
      "Water staining below joint failures",
      "Loose bricks",
      "Prior repair with the wrong mortar type",
    ],
    faqs: [
      { q: "Type N vs Type O?", a: "Type N for most modern brick. Type O for softer historic brick where Type N would crack the face." },
      { q: "Cost per square foot?", a: "It varies with access and match difficulty — every quote is itemized." },
    ],
    related: ["chimney-tuckpointing", "brick-repair", "chimney-mortar-repair"],
    metaDescription: "Tuckpointing in Ohio. Failed masonry joints ground out and re-pointed with color-matched Type N or Type O mortar.",
  },
  {
    slug: "brick-wall-repair",
    warranty: "10-Year Workmanship Warranty",
    title: "Brick Wall Repair",
    shortTitle: "Brick Wall Repair",
    tagline: "Cracked, bowed, or leaning brick walls stabilized and rebuilt.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: HardHat, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Structural masonry",
      headline: "A cracking wall doesn't fix itself.",
      sub: "We assess cracked, bowed, or leaning brick walls — retaining, garden, garage, and facade — then repair, rebuild, or reinforce depending on what the structure needs.",
    },
    bullets: [
      "Structural crack assessment (step cracks vs settlement)",
      "Partial rebuild of failed sections",
      "Helical wall ties for bowing walls",
      "Tuckpointing and brick replacement as needed",
    ],
    process: [
      { title: "Assess", desc: "Photo and measurement documentation of the failure." },
      { title: "Plan", desc: "Structural fix (ties, rebuild) plus cosmetic repair." },
      { title: "Repair", desc: "Executed in the right order — structure first, cosmetics after." },
    ],
    signs: [
      "Visible cracks running diagonally or horizontally",
      "Wall visibly leaning or bowing",
      "Gaps between wall and adjoining structures",
      "Loose or displaced bricks",
    ],
    faqs: [
      { q: "When is a wall a structural engineer job?", a: "Foundation-related failures, major settlement, or walls over 8 feet — we'll flag it and refer if needed." },
      { q: "Can you match old brick?", a: "Usually yes — we source through local yards and reclaimed brick suppliers." },
    ],
    related: ["brick-repair", "foundation-masonry", "tuckpointing"],
    metaDescription: "Brick wall repair in Ohio. Cracked, bowed, and leaning walls assessed, rebuilt, or reinforced with helical ties.",
  },
  {
    slug: "foundation-masonry",
    warranty: "10-Year Workmanship Warranty",
    title: "Foundation Masonry Repair",
    shortTitle: "Foundation Masonry",
    tagline: "Above-grade foundation crack sealing and re-pointing.",
    price: "Custom Quote", duration: "", quoteOnly: true,
    icon: HardHat, variant: "repair", accent: "amber",
    hero: {
      eyebrow: "Foundation masonry",
      headline: "Cosmetic foundation cracks don't have to be structural.",
      sub: "We repair non-structural cracks, spalling, and joint failure on visible foundation masonry — brick, block, and stone. Structural failures are referred to a foundation specialist.",
    },
    bullets: [
      "Non-structural crack sealing",
      "Spalled brick and block replacement",
      "Failed joint re-pointing",
      "Waterproof coating at completion",
    ],
    process: [
      { title: "Assess", desc: "Distinguish cosmetic from structural — we'll refer if it needs a foundation specialist." },
      { title: "Repair", desc: "Cracks sealed, damaged units replaced, joints re-pointed." },
      { title: "Protect", desc: "Waterproof coating on above-grade sections if requested." },
    ],
    signs: [
      "Hairline cracks in visible foundation brick or block",
      "Spalling or flaking on exposed foundation",
      "Failed joints near grade",
      "Recent cosmetic damage",
    ],
    faqs: [
      { q: "Do you handle structural foundation work?", a: "No — we do cosmetic and non-structural repair only. Structural issues need a foundation contractor." },
      { q: "Basement waterproofing?", a: "Interior basement waterproofing is a different specialty. We handle above-grade exterior masonry." },
    ],
    related: ["brick-wall-repair", "brick-repair", "tuckpointing"],
    metaDescription: "Foundation masonry repair in Ohio. Cosmetic crack sealing, spalling replacement, and joint re-pointing on visible foundation brick, block, and stone.",
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