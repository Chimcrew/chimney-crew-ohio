import type { LucideIcon } from "lucide-react";
import {
  Hammer,
  Search,
  Sparkles,
  Droplets,
  HardHat,
  Wrench,
  ShieldCheck,
  Flame,
} from "lucide-react";

export interface SeoCity {
  slug: string; // URL slug, e.g. "powell-oh"
  name: string; // "Powell"
  state: string; // "OH"
  zip: string; // representative ZIP
  population: string;
  drive: string; // drive time from Columbus HQ
  neighborhoods: string[];
  landmarks: string[];
  homeStyles: string;
  climateNote: string;
  intro: string; // 1 paragraph (unique)
  whyUs: string; // 1 paragraph (unique)
  localProof: string; // recent job blurb (unique)
  h1: string;
  title: string; // SEO title
  description: string; // meta description
  faqs: { q: string; a: string }[];
}

export const CITY_SERVICES: { slug: string; label: string; icon: LucideIcon; blurb: (city: string) => string }[] = [
  { slug: "chimney-repair", label: "Chimney Repair", icon: Hammer,
    blurb: (c) => `Brick rebuilds, crown work, flashing fixes and structural repairs for ${c} homes.` },
  { slug: "level-1-inspection", label: "Chimney Inspection", icon: Search,
    blurb: (c) => `CSIA Level 1 & 2 inspections with a written photo report for every ${c} fireplace.` },
  { slug: "chimney-sweep", label: "Chimney Sweep", icon: Sparkles,
    blurb: (c) => `Full creosote removal and tune-up before burn season — drop-cloth clean inside your ${c} home.` },
  { slug: "flashing-repair", label: "Chimney Leak Repair", icon: Droplets,
    blurb: (c) => `Stop drips at the flashing, crown and brick face — Ohio storms find every weak spot.` },
  { slug: "crown-repair", label: "Chimney Crown Repair", icon: HardHat,
    blurb: (c) => `Seal cracked crowns and stop water at the top before freeze-thaw eats your masonry.` },
  { slug: "crown-rebuild", label: "Chimney Crown Rebuild", icon: HardHat,
    blurb: (c) => `Full demo and re-pour with stainless reinforcement and a proper drip edge.` },
  { slug: "tuckpointing", label: "Tuckpointing", icon: Wrench,
    blurb: (c) => `Grind out failed mortar and repoint with matched mortar that lasts another 25+ years.` },
  { slug: "cap-install", label: "Chimney Caps", icon: ShieldCheck,
    blurb: (c) => `Stainless caps and spark arrestors sized to your ${c} flue — keeps water, critters and embers out.` },
  { slug: "liner-install", label: "Chimney Liners", icon: Flame,
    blurb: (c) => `Stainless and clay liner installs that bring older ${c} chimneys back to code.` },
];

export const SEO_CITIES: SeoCity[] = [
  {
    slug: "powell-oh",
    name: "Powell",
    state: "OH",
    zip: "43065",
    population: "~14,500 residents",
    drive: "20 minutes north of downtown Columbus",
    neighborhoods: ["Liberty Township", "Olentangy Falls", "Bartholomew Run", "Wedgewood", "Golf Village"],
    landmarks: ["Columbus Zoo", "Highbanks Metro Park", "Olentangy Liberty High School"],
    homeStyles: "newer 1995–2015 two-story builds with prefab metal fireboxes and 25-foot brick veneer chases",
    climateNote: "Powell sits on exposed ridgelines above the Scioto, so prevailing west winds drive rain straight into the chase-cover seam.",
    intro:
      "Powell homes are mostly newer construction with prefabricated fireplaces tucked inside tall brick chases — and that combination hides two very specific problems: rusting chase covers and undersized factory caps. We see it almost every week in Olentangy Falls and Wedgewood. ChimCrew is a CSIA-certified, family-run crew that has serviced Delaware County since 1974, and Powell is one of our most-booked ZIPs (43065).",
    whyUs:
      "Most Powell homeowners we meet have already gotten a high-pressure pitch from a national company quoting a full rebuild. We bring a drone, a written Level 2 inspection, and a flat-rate quote — no pressure to sign on the spot. If your chase only needs a stainless chase cover and a proper cap, that's what we quote, often under $900.",
    localProof:
      "Most recent Powell job: rusted chase cover and water-damaged firebox on Liberty Hill Dr — replaced with a 24-gauge stainless cover and a new spark-arrestor cap in a single visit.",
    h1: "Chimney Repair in Powell, OH — Free Inspections & Same-Day Service",
    title: "Chimney Repair Powell OH | Free Inspection | ChimCrew",
    description:
      "Certified chimney repair, sweep & inspection in Powell, OH (43065). Family-owned since 1974, written warranty, same-day service. Free inspection — call (614) 683-5763.",
    faqs: [
      { q: "How much does chimney repair cost in Powell, OH?",
        a: "Most Powell repairs land between $350 and $1,800 — chase cover replacement runs $700–$1,200, a full crown rebuild runs $900–$1,800, and basic tuckpointing starts around $450. We give every Powell homeowner a written flat-rate quote before any work starts." },
      { q: "Do you service the 43065 ZIP code?",
        a: "Yes. Powell (43065) is one of our most-booked service areas. We're typically on-site within 24–48 hours, and same-day service is available for active leaks or no-heat situations." },
      { q: "My Powell home has a prefab fireplace — can you still inspect it?",
        a: "Absolutely. Roughly 80% of Powell homes built after 1995 have prefab (factory-built) fireboxes, and we are factory-trained on Heatilator, Majestic, Superior, and FMI units. We also stock the most common refractory panels and chase covers." },
      { q: "Is the chimney inspection actually free?",
        a: "Yes — a Level 1 visual inspection is free for Powell homeowners with no obligation. If your fireplace hasn't been swept in over a year, we'll quote the sweep separately at flat rate before doing anything." },
      { q: "Do you also serve Dublin and Worthington?",
        a: "Yes — Powell, Dublin, Worthington, Westerville and Hilliard are all in our daily route. See our Dublin and Worthington pages for those service areas." },
    ],
  },
  {
    slug: "dublin-oh",
    name: "Dublin",
    state: "OH",
    zip: "43017",
    population: "~50,000 residents",
    drive: "15 minutes northwest of downtown Columbus",
    neighborhoods: ["Muirfield Village", "Tartan Fields", "Riverside Woods", "Llewellyn Farms", "Donegal Cliffs"],
    landmarks: ["Memorial Tournament", "Historic Dublin", "Scioto River corridor"],
    homeStyles: "executive 1985–2010 brick homes with full masonry fireplaces and 30-foot stone or brick stacks",
    climateNote: "Dublin's mature tree canopy drops heavy leaf and squirrel-nest debris into uncapped flues every fall.",
    intro:
      "Dublin's housing stock is heavy on full-masonry chimneys — Muirfield Village, Tartan Fields, and Llewellyn Farms in particular — and that means brick, mortar, and freeze-thaw damage after 25+ Ohio winters. ChimCrew is the go-to chimney company for Dublin (43017) homeowners, with CSIA-certified technicians and a 5-star rated track record across Franklin County.",
    whyUs:
      "When a Dublin homeowner calls us, they usually want two things: an honest answer about whether the crown actually needs replacing, and a crew that won't track soot through the foyer. We bring HEPA vacuums, drop cloths, and a written Level 2 inspection with drone photos of the crown and flashing — so you see exactly what we see.",
    localProof:
      "Most recent Dublin job: full crown rebuild and tuckpointing on a Muirfield home where the previous contractor had used the wrong mortar mix — re-poured with type-N and a proper 2-inch overhang.",
    h1: "Chimney Repair in Dublin, OH — Masonry Specialists & Free Inspections",
    title: "Chimney Repair Dublin OH | Crown Repair & Tuckpointing | ChimCrew",
    description:
      "Dublin, OH chimney repair, sweep, inspection & tuckpointing. CSIA-certified, fully insured, written warranty. Free inspection in 43017 — call (614) 683-5763.",
    faqs: [
      { q: "How often should a Dublin chimney be swept?",
        a: "The NFPA recommends a Level 1 inspection annually. For Dublin's full-masonry wood-burning fireplaces, we recommend a sweep every 1–2 years depending on how often you burn and what wood you use (oak and hickory deposit creosote faster)." },
      { q: "How much does tuckpointing cost in Dublin, OH?",
        a: "Dublin tuckpointing typically runs $450–$2,500 depending on stack height and how much mortar has failed. Most 25-year-old brick chimneys in Muirfield and Tartan Fields need partial repointing around the crown line first — we quote that as a stand-alone job before recommending a full repoint." },
      { q: "Can you repair a chimney leak in Dublin?",
        a: "Yes — chimney leak repair is one of our most common Dublin calls. We start with a drone inspection to pinpoint whether the water is entering at the crown, flashing, brick face, or chase cover, then quote only the layer that's actually failing." },
      { q: "Do you work in historic Dublin homes?",
        a: "Yes. Several of our crew leads are trained on historic-style mortar matching and clay tile liner relining — important for the older homes around Bridge Street and Historic Dublin." },
      { q: "What other nearby cities do you serve?",
        a: "Dublin, Powell, Hilliard, Worthington and Westerville are all in our daily Franklin/Delaware County route." },
    ],
  },
  {
    slug: "worthington-oh",
    name: "Worthington",
    state: "OH",
    zip: "43085",
    population: "~14,800 residents",
    drive: "12 minutes north of downtown Columbus",
    neighborhoods: ["Old Worthington", "Colonial Hills", "Rush Creek", "Worthington Hills", "Medick Estates"],
    landmarks: ["Worthington Village Green", "Olentangy River", "Thomas Worthington High School"],
    homeStyles: "1920s–1960s colonial and Cape Cod homes with original clay-tile-lined masonry chimneys",
    climateNote: "Worthington's older clay-tile liners crack from decades of thermal shock, often invisible from the roof.",
    intro:
      "Worthington is one of the oldest neighborhoods we work in — and the chimneys show it. Old Worthington and Colonial Hills are full of 70- to 100-year-old masonry stacks with original clay tile liners, deteriorated crowns, and flashing that was last touched in the 1980s. ChimCrew has been the trusted chimney company for Worthington (43085) since 1974, and we specialize in restoring older Ohio masonry without overselling a full rebuild.",
    whyUs:
      "Older Worthington homes deserve a chimney company that respects the original brick. We use a Chim-Scan video camera to inspect the full flue interior before we recommend anything — most of the time, a stainless liner insert and a new crown is all that's needed to bring a 1940s Colonial Hills chimney safely back into service.",
    localProof:
      "Most recent Worthington job: a 1948 Colonial Hills home with a cracked clay tile liner — installed a 6-inch stainless insulated liner and rebuilt the crown in two days with a lifetime liner warranty.",
    h1: "Chimney Repair & Inspection in Worthington, OH — Old-Home Specialists",
    title: "Chimney Inspection & Repair Worthington OH | ChimCrew",
    description:
      "Worthington, OH chimney repair, sweep, liner relining & inspection. Specialists in older masonry chimneys (43085). Free inspection — call (614) 683-5763.",
    faqs: [
      { q: "My Worthington home is from the 1940s — does it need a chimney liner?",
        a: "Probably yes. Most clay tile liners installed before 1970 have hairline cracks from thermal shock, which is a fire-code issue. A Level 2 video inspection confirms it; if relining is needed, a 6-inch insulated stainless liner is the standard fix and carries a lifetime warranty." },
      { q: "How much does a chimney inspection cost in Worthington?",
        a: "Our Level 1 visual inspection is free for Worthington homeowners. A full Level 2 video inspection (recommended before buying or selling a home) is a flat $189 and includes a written PDF report with photos." },
      { q: "Do you work on the historic homes around Old Worthington?",
        a: "Yes — we are insured for historic masonry work and use matched mortar mixes. We have completed jobs on homes near the Village Green and along E North Street." },
      { q: "Can you re-flash a chimney without replacing the whole roof?",
        a: "Yes. We cut and bend new step flashing and counter-flashing into the existing brick — no roof replacement needed for 90% of Worthington flashing leaks." },
      { q: "Do you also serve Powell and Westerville?",
        a: "Yes — Worthington, Powell, Westerville, Dublin and Hilliard are all on our daily route." },
    ],
  },
  {
    slug: "westerville-oh",
    name: "Westerville",
    state: "OH",
    zip: "43081",
    population: "~41,000 residents",
    drive: "20 minutes northeast of downtown Columbus",
    neighborhoods: ["Uptown Westerville", "Highlands", "Hoover Reserve", "Spring Grove", "Annehurst"],
    landmarks: ["Hoover Reservoir", "Otterbein University", "Alum Creek"],
    homeStyles: "a mix of 1970s–2000s suburban two-story homes with both masonry and prefab fireplaces",
    climateNote: "Westerville's proximity to Hoover Reservoir means higher humidity and faster crown deterioration on east-facing chimneys.",
    intro:
      "Westerville covers a wide mix of housing — from 1970s ranches near Otterbein to newer Hoover Reserve builds — so we see everything from clay-tile masonry flues to factory-built prefab units. ChimCrew has been Westerville's (43081) trusted chimney sweep since 1974, and we are the only Columbus-area crew that brings both a masonry tech and a prefab specialist to every inspection so you only get one truck roll.",
    whyUs:
      "Most Westerville chimney calls start with the same sentence: 'There's water in my firebox.' Nine times out of ten, it's a failed crown or a missing chase cover — both of which we can quote in writing the same day. We don't subcontract; the tech on your roof is the tech who writes the quote.",
    localProof:
      "Most recent Westerville job: full chimney sweep, new stainless cap, and crown sealant on a Highlands ranch — completed in under three hours with a drop-cloth-clean firebox.",
    h1: "Chimney Sweep & Repair in Westerville, OH — Same-Day Service",
    title: "Chimney Sweep Westerville OH | Repair & Inspection | ChimCrew",
    description:
      "Westerville, OH chimney sweep, repair, leak fix & inspection (43081). CSIA-certified, fully insured, same-day service. Free inspection — call (614) 683-5763.",
    faqs: [
      { q: "How much does a chimney sweep cost in Westerville?",
        a: "A standard chimney sweep in Westerville is a flat $189 and includes a free Level 1 visual inspection. If creosote buildup is heavy (more than 1/8 inch), we'll quote the additional rotary-chain cleaning before proceeding — no surprise charges." },
      { q: "Can you fix water in my firebox?",
        a: "Yes — that's one of our most common Westerville calls. We start with a drone or rooftop inspection to confirm whether the water is entering at the crown, cap, flashing, or brick face, then quote only the failing component." },
      { q: "Do you service the 43081 and 43082 ZIPs?",
        a: "Yes — both Westerville ZIPs are in our daily service route, including Hoover Reserve, Spring Grove, and Annehurst." },
      { q: "Do you install chimney caps?",
        a: "Yes — stainless steel chimney caps sized to your specific flue, installed the same day in most cases. Lifetime warranty on the cap itself." },
      { q: "What other Columbus suburbs do you serve?",
        a: "Westerville, Worthington, Powell, Dublin and Hilliard are all in our regular route." },
    ],
  },
  {
    slug: "hilliard-oh",
    name: "Hilliard",
    state: "OH",
    zip: "43026",
    population: "~37,000 residents",
    drive: "18 minutes west of downtown Columbus",
    neighborhoods: ["Old Hilliard", "Heritage Lakes", "Brookside Estates", "Scioto Reserve", "Hoffman Farms"],
    landmarks: ["Heritage Rail Trail", "Hilliard Station Park", "Big Darby Creek"],
    homeStyles: "predominantly 1990s–2010s builds with prefab fireplaces and tall vinyl-sided chase chimneys",
    climateNote: "Hilliard's flat exposure means wind-driven rain hits chase covers and siding seams especially hard.",
    intro:
      "Hilliard is one of the fastest-growing suburbs west of Columbus, and its housing stock is dominated by 1990s–2010s builds with prefab fireplaces and vinyl-sided chase chimneys. That means two recurring issues: rusting chase covers and undersized factory caps — both of which lead to firebox rust and water-stained drywall. ChimCrew has served Hilliard (43026) since 1974, and we carry the most common chase covers and factory firebox panels in our trucks.",
    whyUs:
      "Hilliard homeowners are typically getting their first chimney service ever, and we treat that accordingly — clear explanations, photos of every issue, and a written flat-rate quote before any work starts. No high-pressure upsell, no quote-on-the-spot tactics. If your prefab unit only needs a chase cover and a cap, we quote exactly that.",
    localProof:
      "Most recent Hilliard job: replaced a rusted-through chase cover on a Heritage Lakes home, installed a multi-flue stainless cap, and resealed the chase siding — water-tight in a single visit.",
    h1: "Chimney Repair in Hilliard, OH — Prefab & Masonry Specialists",
    title: "Chimney Repair Hilliard OH | Chase Covers & Inspections | ChimCrew",
    description:
      "Hilliard, OH chimney repair, sweep, chase cover & inspection (43026). Family-owned since 1974, written warranty, same-day service. Call (614) 683-5763.",
    faqs: [
      { q: "What is a chase cover and does my Hilliard home need one?",
        a: "A chase cover is the metal lid on top of a prefab/vinyl-sided chimney chase. Most Hilliard builders installed cheap galvanized covers that rust through in 15–20 years. If you see rust streaks down your siding, you need a stainless replacement — typically $700–$1,200 installed." },
      { q: "How much is a chimney inspection in Hilliard?",
        a: "A Level 1 visual inspection is free for Hilliard homeowners. A full Level 2 video inspection with a written PDF report is a flat $189." },
      { q: "Do you service Heritage Lakes and Scioto Reserve?",
        a: "Yes — both neighborhoods are in our regular Hilliard (43026) route, and most of those homes have similar prefab chase setups we work on daily." },
      { q: "Can you fix water stains on the wall next to my fireplace?",
        a: "Yes — those stains almost always come from a failed chase cover, missing cap, or cracked crown. We inspect, identify the source, and quote only the failing layer in writing." },
      { q: "What other cities do you serve near Hilliard?",
        a: "Hilliard, Dublin, Powell, Worthington and Westerville are all in our daily Franklin County route." },
    ],
  },
];

export function getSeoCity(slug: string) {
  return SEO_CITIES.find((c) => c.slug === slug);
}