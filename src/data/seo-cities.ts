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
  slug: string;
  name: string;
  state: string;
  region: "Columbus" | "Dayton" | "Cincinnati";
  zip: string;
  drive: string;
  population: string;
  homeStyles: string;
  climateNote: string;
  neighborhoods: string[];
  intro: string;
  whyUs: string;
  localProof: string;
  h1: string;
  title: string;
  description: string;
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
    blurb: () => `Stop drips at the flashing, crown and brick face — Ohio storms find every weak spot.` },
  { slug: "crown-tuckpoint", label: "Chimney Crown Repair", icon: HardHat,
    blurb: () => `Rebuild cracked crowns with a proper drip-edge so freeze-thaw cycles stop eating your masonry.` },
  { slug: "crown-tuckpoint", label: "Tuckpointing", icon: Wrench,
    blurb: () => `Grind out failed mortar and repoint with matched mortar that lasts another 25+ years.` },
  { slug: "cap-install", label: "Chimney Caps", icon: ShieldCheck,
    blurb: (c) => `Stainless caps and spark arrestors sized to your ${c} flue — keeps water, critters and embers out.` },
  { slug: "liner-install", label: "Chimney Liners", icon: Flame,
    blurb: (c) => `Stainless and clay liner installs that bring older ${c} chimneys back to code.` },
];

type CitySeed = {
  name: string;
  region: "Columbus" | "Dayton" | "Cincinnati";
  zip: string;
  drive: string;
  neighborhoods: string[];
  // Optional per-city content overrides. When a field is present, buildCity()
  // uses it in place of the shared template for that field only. Seeds without
  // overrides are generated exactly as before — no other city is affected.
  titleOverride?: string;
  descriptionOverride?: string;
  introOverride?: string;
  whyUsOverride?: string;
  localProofOverride?: string;
  faqsOverride?: { q: string; a: string }[];
};

const SEEDS: CitySeed[] = [
  // Columbus metro
  {
    name: "Columbus", region: "Columbus", zip: "43215", drive: "downtown Columbus",
    neighborhoods: ["Short North", "German Village", "Clintonville", "Bexley", "Upper Arlington"],
    titleOverride: "Columbus Chimney Sweep, Inspection & Repair | ChimCrew",
    descriptionOverride:
      "CSIA-certified chimney sweep, inspection & repair in Columbus, OH (43215) — Short North, German Village, Clintonville, Bexley & Upper Arlington. Free drone inspection. (614) 683-5763.",
    introOverride:
      "ChimCrew keeps Columbus fireplaces and chimneys safe from the Short North and German Village to Clintonville, Bexley and Upper Arlington. As a CSIA-certified, fully insured, family-owned Ohio crew working downtown Columbus (43215) and the surrounding neighborhoods every week, we handle chimney sweeping, fireplace inspection, chimney repair and dryer vent cleaning — with a free drone inspection and a written photo report on every visit.",
    whyUsOverride:
      "From German Village and Clintonville to Upper Arlington and Bexley, we treat every Columbus chimney on its own terms. We show up with flat-rate pricing, an honest read on what actually needs fixing, and a free drone inspection so you can see your crown, cap and flashing for yourself. No high-pressure upsells: if your Columbus fireplace only needs a sweep and a new cap, that's what we quote.",
    localProofOverride:
      "A recent downtown Columbus visit: a full chimney sweep, a Level 1 inspection and a new stainless steel cap on a Short North home — firebox left drop-cloth clean and a written PDF report in the homeowner's inbox the same day.",
    faqsOverride: [
      { q: "How much does a chimney sweep cost in Columbus, OH?", a: "Our flat-rate chimney sweep in Columbus is $99 and includes a free visual inspection. A full chimney/fireplace inspection is $69, a gas fireplace inspection is $49, and the chimney drone inspection is free. Any repairs are quoted in writing before work starts." },
      { q: "Do you service the 43215 ZIP code and downtown Columbus?", a: "Yes. 43215 and downtown Columbus are part of our regular weekly route, and the Short North, German Village, Clintonville and Bexley are some of our most-booked neighborhoods. Same-day service is available for active leaks or no-heat situations." },
      { q: "What chimney services do you offer in Columbus?", a: "Chimney sweeping, chimney and fireplace inspections, gas fireplace inspection, free drone inspection, dryer vent cleaning, chimney leak repair, crown rebuilds, tuckpointing, chimney cap installation and stainless steel liner installs — across Columbus and the surrounding neighborhoods." },
      { q: "Do you work on chimneys in German Village or Clintonville?", a: "Yes — those are among our regular Columbus neighborhoods. We start every Columbus job with a free drone inspection of the crown, cap and flashing and a written photo report, so you see the condition before deciding on anything — whether that's a sweep, a crown or tuckpointing check, or a cap sized to the flue." },
      { q: "How fast can you get to my Columbus home?", a: "Most Columbus bookings are scheduled within 24–48 hours. Same-day slots open on weekdays during chimney season — call (614) 683-5763 and we'll get you in." },
    ],
  },
  { name: "Dublin", region: "Columbus", zip: "43017", drive: "15 minutes northwest of downtown Columbus", neighborhoods: ["Muirfield Village", "Tartan Fields", "Riverside Woods", "Llewellyn Farms"] },
  { name: "Westerville", region: "Columbus", zip: "43081", drive: "20 minutes northeast of downtown Columbus", neighborhoods: ["Uptown Westerville", "Highlands", "Hoover Reserve", "Spring Grove"] },
  {
    name: "Worthington", region: "Columbus", zip: "43085", drive: "12 minutes north of downtown Columbus",
    neighborhoods: ["Old Worthington", "Colonial Hills", "Rush Creek", "Worthington Hills"],
    titleOverride: "Worthington Chimney Sweep, Inspection & Repair | ChimCrew",
    descriptionOverride:
      "CSIA-certified chimney sweep, inspection & repair in Worthington, OH (43085) — Old Worthington, Colonial Hills, Rush Creek & Worthington Hills. Free drone inspection. (614) 683-5763.",
    introOverride:
      "ChimCrew serves Worthington homeowners from Old Worthington and Colonial Hills to Rush Creek and Worthington Hills — about 12 minutes north of downtown Columbus. We're a CSIA-certified, fully insured, family-owned Ohio crew on Worthington rooftops every week for chimney sweeping, fireplace inspection, chimney repair and dryer vent cleaning, and we back every visit with a free drone inspection and a written photo report.",
    whyUsOverride:
      "From Old Worthington to Colonial Hills, Rush Creek and Worthington Hills, we treat every Worthington chimney on its own terms. We bring flat-rate pricing, a straight answer on what genuinely needs fixing, and a free drone inspection of your crown, cap and flashing. If a Worthington fireplace only needs a sweep and a new cap, that's exactly what we quote — no upsells on the truck.",
    localProofOverride:
      "A recent Worthington visit: a full chimney sweep, a Level 1 inspection and a new stainless steel cap on an Old Worthington home — a drop-cloth-clean firebox and a written PDF report delivered the same day.",
    faqsOverride: [
      { q: "How much does a chimney sweep cost in Worthington, OH?", a: "Our flat-rate chimney sweep in Worthington is $99 and includes a free visual inspection. A full chimney/fireplace inspection is $69, a gas fireplace inspection is $49, and the chimney drone inspection is free. Repairs are always quoted in writing before any work begins." },
      { q: "Do you service the 43085 ZIP code?", a: "Yes. 43085 is on our regular route just 12 minutes north of downtown Columbus, and Old Worthington, Colonial Hills, Rush Creek and Worthington Hills are among our most-booked Worthington neighborhoods. Same-day service is available for active leaks or no-heat situations." },
      { q: "What chimney services do you offer in Worthington?", a: "Chimney sweeping, chimney and fireplace inspections, gas fireplace inspection, free drone inspection, dryer vent cleaning, chimney leak repair, crown rebuilds, tuckpointing, chimney cap installation and stainless steel liner installs — throughout Worthington and the north Columbus suburbs." },
      { q: "Can you inspect a chimney in Old Worthington?", a: "Yes — Old Worthington is one of our regular neighborhoods. We fly a free drone inspection over the crown, cap and flashing, document everything with photos, and give you a written report — so you know the condition before committing to any repair." },
      { q: "How fast can you get to my Worthington home?", a: "Most Worthington bookings are scheduled within 24–48 hours, and because we're only about 12 minutes north of downtown Columbus, same-day weekday slots open during chimney season. Call (614) 683-5763 and we'll get you in." },
    ],
  },
  {
    name: "Hilliard", region: "Columbus", zip: "43026", drive: "18 minutes west of downtown Columbus",
    neighborhoods: ["Old Hilliard", "Heritage Lakes", "Brookside Estates", "Scioto Reserve"],
    titleOverride: "Hilliard Chimney Sweep, Inspection & Repair | ChimCrew",
    descriptionOverride:
      "CSIA-certified chimney sweep, inspection & repair in Hilliard, OH (43026) — Old Hilliard, Heritage Lakes, Brookside Estates & Scioto Reserve. Free drone inspection. (614) 683-5763.",
    introOverride:
      "ChimCrew looks after Hilliard chimneys and fireplaces from Old Hilliard to Heritage Lakes, Brookside Estates and Scioto Reserve — about 18 minutes west of downtown Columbus. We're a CSIA-certified, fully insured, family-owned Ohio crew handling chimney sweeping, fireplace inspection, chimney repair and dryer vent cleaning, with a free drone inspection and a written photo report on every Hilliard visit.",
    whyUsOverride:
      "From Old Hilliard to Heritage Lakes, Brookside Estates and Scioto Reserve, we service full-masonry and prefab fireplace chimneys alike. We bring flat-rate pricing, an honest assessment, and a free drone inspection so you can see your crown, cap and flashing for yourself. If your Hilliard fireplace just needs a sweep and a new cap, that's what we quote — nothing you don't need.",
    localProofOverride:
      "A recent Hilliard visit: a full chimney sweep, a Level 1 inspection and a new stainless steel cap on an Old Hilliard home — firebox left drop-cloth clean and a written PDF report in the homeowner's inbox the same day.",
    faqsOverride: [
      { q: "How much does a chimney sweep cost in Hilliard, OH?", a: "Our flat-rate chimney sweep in Hilliard is $99 and includes a free visual inspection. A full chimney/fireplace inspection is $69, a gas fireplace inspection is $49, and the chimney drone inspection is free. Repairs are quoted in writing before any work starts." },
      { q: "Do you service the 43026 ZIP code?", a: "Yes. 43026 is on our weekly route about 18 minutes west of downtown Columbus, and Old Hilliard, Heritage Lakes, Brookside Estates and Scioto Reserve are among our most-booked Hilliard neighborhoods. Same-day service is available for active leaks or no-heat situations." },
      { q: "What chimney services do you offer in Hilliard?", a: "Chimney sweeping, chimney and fireplace inspections, gas fireplace inspection, free drone inspection, dryer vent cleaning, chimney leak repair, crown rebuilds, tuckpointing, chimney cap installation and stainless steel liner installs — across Hilliard and the west Columbus suburbs." },
      { q: "Do prefab fireplaces need a chimney sweep too?", a: "Yes. Prefab fireplaces still need regular cleaning and inspection, just like full-masonry chimneys. We service both throughout Hilliard, and every visit includes a free drone inspection and a written photo report." },
      { q: "How fast can you get to my Hilliard home?", a: "Most Hilliard bookings are scheduled within 24–48 hours. Same-day weekday slots open during chimney season — call (614) 683-5763 and we'll get you in." },
    ],
  },
  { name: "Upper Arlington", region: "Columbus", zip: "43221", drive: "10 minutes northwest of downtown Columbus", neighborhoods: ["Tremont", "Old Arlington", "Devon Triangle", "Scioto Country Club"] },
  { name: "Gahanna", region: "Columbus", zip: "43230", drive: "15 minutes east of downtown Columbus", neighborhoods: ["Old Gahanna", "Royal Manor", "Highland Crossing"] },
  { name: "Reynoldsburg", region: "Columbus", zip: "43068", drive: "20 minutes east of downtown Columbus", neighborhoods: ["Olde Reynoldsburg", "Slate Ridge", "Brice Park"] },
  {
    name: "Grove City", region: "Columbus", zip: "43123", drive: "15 minutes southwest of downtown Columbus",
    neighborhoods: ["Town Center", "Pinnacle Club", "Beulah Park"],
    titleOverride: "Grove City Chimney Sweep, Inspection & Repair | ChimCrew",
    descriptionOverride:
      "CSIA-certified chimney sweep, inspection & repair in Grove City, OH (43123) — Town Center, Pinnacle Club & Beulah Park. Free drone inspection. (614) 683-5763.",
    introOverride:
      "ChimCrew serves Grove City homeowners around Town Center, Pinnacle Club and Beulah Park — about 15 minutes southwest of downtown Columbus. We're a CSIA-certified, fully insured, family-owned Ohio crew handling chimney sweeping, fireplace inspection, chimney repair and dryer vent cleaning, and every Grove City visit comes with a free drone inspection and a written photo report.",
    whyUsOverride:
      "Grove City homeowners tell us they want three things from a chimney company: clear pricing, an honest answer on what actually needs fixing, and a crew that respects the house. Around Town Center, Pinnacle Club and Beulah Park we deliver exactly that — flat-rate quotes, a free drone inspection of your crown, cap and flashing, and no high-pressure upsells. If your Grove City fireplace only needs a sweep and a new cap, that's what we quote.",
    localProofOverride:
      "A recent Grove City visit: a full chimney sweep, a Level 1 inspection and a new stainless steel cap on a Town Center home — a drop-cloth-clean firebox and a written PDF report delivered the same day.",
    faqsOverride: [
      { q: "How much does a chimney sweep cost in Grove City, OH?", a: "Our flat-rate chimney sweep in Grove City is $99 and includes a free visual inspection. A full chimney/fireplace inspection is $69, a gas fireplace inspection is $49, and the chimney drone inspection is free. Any repairs are quoted in writing before work starts." },
      { q: "Do you service the 43123 ZIP code?", a: "Yes. 43123 is on our regular route about 15 minutes southwest of downtown Columbus, and Town Center, Pinnacle Club and Beulah Park are among our most-booked Grove City neighborhoods. Same-day service is available for active leaks or no-heat situations." },
      { q: "What chimney services do you offer in Grove City?", a: "Chimney sweeping, chimney and fireplace inspections, gas fireplace inspection, free drone inspection, dryer vent cleaning, chimney leak repair, crown rebuilds, tuckpointing, chimney cap installation and stainless steel liner installs — throughout Grove City and the southwest Columbus suburbs." },
      { q: "Is the chimney drone inspection really free in Grove City?", a: "Yes — for every Grove City homeowner. We fly a drone around the chimney, photograph the crown, cap and flashing, and email you the photos with no obligation. If anything needs repair, we quote it in writing." },
      { q: "How fast can you get to my Grove City home?", a: "Most Grove City bookings are scheduled within 24–48 hours. Same-day weekday slots open during chimney season — call (614) 683-5763 and we'll get you in." },
    ],
  },
  { name: "Pickerington", region: "Columbus", zip: "43147", drive: "22 minutes southeast of downtown Columbus", neighborhoods: ["Olde Pickerington Village", "Ridgeview", "Heritage Hill"] },
  { name: "Powell", region: "Columbus", zip: "43065", drive: "20 minutes north of downtown Columbus", neighborhoods: ["Liberty Township", "Olentangy Falls", "Bartholomew Run", "Wedgewood"] },
  { name: "New Albany", region: "Columbus", zip: "43054", drive: "20 minutes northeast of downtown Columbus", neighborhoods: ["Country Club", "Edge of the Woods", "New Albany Farms"] },
  { name: "Delaware", region: "Columbus", zip: "43015", drive: "30 minutes north of downtown Columbus", neighborhoods: ["Downtown Delaware", "Glenross", "The Lakes"] },
  { name: "Lewis Center", region: "Columbus", zip: "43035", drive: "25 minutes north of downtown Columbus", neighborhoods: ["Polaris", "Highland Lakes", "Hawksridge"] },
  { name: "Pataskala", region: "Columbus", zip: "43062", drive: "30 minutes east of downtown Columbus", neighborhoods: ["Downtown Pataskala", "Watkins Glen", "Summit Station"] },
  { name: "Bexley", region: "Columbus", zip: "43209", drive: "10 minutes east of downtown Columbus", neighborhoods: ["North Bexley", "South Bexley", "Main Street District"] },
  { name: "Whitehall", region: "Columbus", zip: "43213", drive: "12 minutes east of downtown Columbus", neighborhoods: ["Downtown Whitehall", "Robinwood", "Norton Estates"] },
  { name: "Canal Winchester", region: "Columbus", zip: "43110", drive: "25 minutes southeast of downtown Columbus", neighborhoods: ["Olde Towne", "Winchester Lakes", "Westchester"] },
  { name: "Groveport", region: "Columbus", zip: "43125", drive: "20 minutes southeast of downtown Columbus", neighborhoods: ["Downtown Groveport", "Hamilton Meadows", "Heritage"] },
  { name: "Blacklick", region: "Columbus", zip: "43004", drive: "20 minutes east of downtown Columbus", neighborhoods: ["Blacklick Estates", "Waggoner Run", "Preston Trails"] },
  { name: "Galloway", region: "Columbus", zip: "43119", drive: "20 minutes west of downtown Columbus", neighborhoods: ["Galloway Ridge", "Westpointe", "Prairie Township"] },
  { name: "Plain City", region: "Columbus", zip: "43064", drive: "30 minutes northwest of downtown Columbus", neighborhoods: ["Downtown Plain City", "Jerome Village", "Pleasant Valley"] },
  { name: "Marysville", region: "Columbus", zip: "43040", drive: "35 minutes northwest of downtown Columbus", neighborhoods: ["Uptown Marysville", "Mill Valley", "Eljer Park"] },
  { name: "London", region: "Columbus", zip: "43140", drive: "35 minutes southwest of downtown Columbus", neighborhoods: ["Downtown London", "Glade Run", "Madison Heights"] },
  { name: "Sunbury", region: "Columbus", zip: "43074", drive: "30 minutes northeast of downtown Columbus", neighborhoods: ["The Square", "North Galena", "Walnut Creek"] },
  { name: "Galena", region: "Columbus", zip: "43021", drive: "30 minutes north of downtown Columbus", neighborhoods: ["Hoover Reserve", "Bristol Park", "Olentangy Ridge"] },
  { name: "Johnstown", region: "Columbus", zip: "43031", drive: "30 minutes northeast of downtown Columbus", neighborhoods: ["Downtown Johnstown", "Concord Crossing", "Eaglecrest"] },
  { name: "Granville", region: "Columbus", zip: "43023", drive: "35 minutes east of downtown Columbus", neighborhoods: ["Downtown Granville", "Bryn Du", "Welsh Hills"] },
  { name: "Newark", region: "Columbus", zip: "43055", drive: "40 minutes east of downtown Columbus", neighborhoods: ["Downtown Newark", "North Newark", "Cherry Valley"] },
  { name: "Heath", region: "Columbus", zip: "43056", drive: "40 minutes east of downtown Columbus", neighborhoods: ["Hebron Road", "Indian Mound", "South Heath"] },
  { name: "Lancaster", region: "Columbus", zip: "43130", drive: "40 minutes southeast of downtown Columbus", neighborhoods: ["Downtown Lancaster", "Mt. Pleasant", "Pleasantville"] },
  { name: "Circleville", region: "Columbus", zip: "43113", drive: "35 minutes south of downtown Columbus", neighborhoods: ["Downtown Circleville", "Pickaway Heights", "Tarlton Road"] },
  { name: "Ashville", region: "Columbus", zip: "43103", drive: "25 minutes south of downtown Columbus", neighborhoods: ["Downtown Ashville", "Walnut Creek", "South Bloomfield"] },
  { name: "Obetz", region: "Columbus", zip: "43207", drive: "15 minutes south of downtown Columbus", neighborhoods: ["Downtown Obetz", "Lockbourne Road", "Hall Road"] },
  { name: "Grandview Heights", region: "Columbus", zip: "43212", drive: "8 minutes west of downtown Columbus", neighborhoods: ["Grandview Yard", "First Avenue", "Marble Cliff"] },
  { name: "Marble Cliff", region: "Columbus", zip: "43212", drive: "10 minutes west of downtown Columbus", neighborhoods: ["Cardigan Avenue", "Roxbury Road"] },
  { name: "Minerva Park", region: "Columbus", zip: "43231", drive: "18 minutes northeast of downtown Columbus", neighborhoods: ["Minerva Lake", "Jordan Road"] },
  { name: "Brice", region: "Columbus", zip: "43109", drive: "18 minutes east of downtown Columbus", neighborhoods: ["Brice Road", "Bixby Road"] },
  { name: "Lockbourne", region: "Columbus", zip: "43137", drive: "20 minutes south of downtown Columbus", neighborhoods: ["Downtown Lockbourne", "Rickenbacker"] },
  { name: "Urbancrest", region: "Columbus", zip: "43123", drive: "15 minutes southwest of downtown Columbus", neighborhoods: ["Urbancrest Village", "Frank Road"] },
  { name: "Valleyview", region: "Columbus", zip: "43204", drive: "10 minutes west of downtown Columbus", neighborhoods: ["Valleyview Drive", "Sullivant Avenue"] },
  { name: "Riverlea", region: "Columbus", zip: "43085", drive: "12 minutes north of downtown Columbus", neighborhoods: ["Olentangy River Road"] },
  { name: "Shawnee Hills", region: "Columbus", zip: "43065", drive: "25 minutes northwest of downtown Columbus", neighborhoods: ["O'Shaughnessy Reservoir", "Dublin Road"] },
  { name: "Ostrander", region: "Columbus", zip: "43061", drive: "35 minutes northwest of downtown Columbus", neighborhoods: ["Downtown Ostrander", "Scioto River"] },
  { name: "Ashley", region: "Columbus", zip: "43003", drive: "40 minutes north of downtown Columbus", neighborhoods: ["Downtown Ashley", "Main Street"] },
  { name: "Mount Sterling", region: "Columbus", zip: "43143", drive: "40 minutes southwest of downtown Columbus", neighborhoods: ["Downtown Mt. Sterling", "Madison Heights"] },
  { name: "Baltimore", region: "Columbus", zip: "43105", drive: "30 minutes southeast of downtown Columbus", neighborhoods: ["Downtown Baltimore", "Basil"] },
  { name: "Pickerington Ponds", region: "Columbus", zip: "43147", drive: "25 minutes southeast of downtown Columbus", neighborhoods: ["Diley Road", "Refugee Road"] },
  { name: "Etna", region: "Columbus", zip: "43062", drive: "25 minutes east of downtown Columbus", neighborhoods: ["Etna Township", "Refugee Road"] },
  { name: "Hebron", region: "Columbus", zip: "43025", drive: "35 minutes east of downtown Columbus", neighborhoods: ["Downtown Hebron", "Buckeye Lake"] },
  { name: "Buckeye Lake", region: "Columbus", zip: "43008", drive: "40 minutes east of downtown Columbus", neighborhoods: ["North Shore", "Brooks Park", "Cranberry Bog"] },

  // Dayton metro
  { name: "Dayton", region: "Dayton", zip: "45402", drive: "downtown Dayton", neighborhoods: ["Oregon District", "South Park", "St. Anne's Hill", "Belmont"] },
  { name: "Kettering", region: "Dayton", zip: "45429", drive: "10 minutes south of downtown Dayton", neighborhoods: ["Oakwood-adjacent", "Forrer Hills", "Indian Riffle"] },
  { name: "Beavercreek", region: "Dayton", zip: "45431", drive: "15 minutes east of downtown Dayton", neighborhoods: ["The Greene", "Glenwood Park", "Knollwood"] },
  { name: "Centerville", region: "Dayton", zip: "45459", drive: "18 minutes south of downtown Dayton", neighborhoods: ["Uptown Centerville", "Yankee Trace", "Cherry Hill"] },
  { name: "Huber Heights", region: "Dayton", zip: "45424", drive: "15 minutes northeast of downtown Dayton", neighborhoods: ["Carriage Trails", "Wayne Township"] },
  { name: "Miamisburg", region: "Dayton", zip: "45342", drive: "20 minutes south of downtown Dayton", neighborhoods: ["Historic Miamisburg", "Austin Landing"] },
  { name: "Springboro", region: "Dayton", zip: "45066", drive: "25 minutes south of downtown Dayton", neighborhoods: ["Downtown Springboro", "Settler's Walk", "Heatherwoode"] },
  { name: "Fairborn", region: "Dayton", zip: "45324", drive: "15 minutes northeast of downtown Dayton", neighborhoods: ["Downtown Fairborn", "Wright-Patterson area"] },

  // Cincinnati metro
  { name: "Cincinnati", region: "Cincinnati", zip: "45202", drive: "downtown Cincinnati", neighborhoods: ["Over-the-Rhine", "Hyde Park", "Mt. Adams", "Oakley", "Mt. Lookout"] },
  { name: "Mason", region: "Cincinnati", zip: "45040", drive: "25 minutes northeast of downtown Cincinnati", neighborhoods: ["Heritage Club", "Four Bridges", "Deerfield Crossing"] },
  { name: "West Chester", region: "Cincinnati", zip: "45069", drive: "25 minutes north of downtown Cincinnati", neighborhoods: ["Beckett Ridge", "Wetherington", "The Reserves"] },
  { name: "Loveland", region: "Cincinnati", zip: "45140", drive: "30 minutes northeast of downtown Cincinnati", neighborhoods: ["Historic Loveland", "Loveland Park", "Symmes Township"] },
  { name: "Blue Ash", region: "Cincinnati", zip: "45242", drive: "20 minutes northeast of downtown Cincinnati", neighborhoods: ["Hunt Club", "Heritage Hill", "Cooper Park"] },
  { name: "Milford", region: "Cincinnati", zip: "45150", drive: "25 minutes east of downtown Cincinnati", neighborhoods: ["Old Milford", "Miami Township"] },
  { name: "Hamilton", region: "Cincinnati", zip: "45011", drive: "30 minutes north of downtown Cincinnati", neighborhoods: ["German Village", "Rossville", "Lindenwald"] },
];

function slugify(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-oh`;
}

function buildCity(s: CitySeed): SeoCity {
  const hood = s.neighborhoods.slice(0, 3).join(", ");
  const moreHood = s.neighborhoods.slice(0, 4).join(", ");
  return {
    slug: slugify(s.name),
    name: s.name,
    state: "OH",
    region: s.region,
    zip: s.zip,
    drive: s.drive,
    population: `${s.name} area homeowners`,
    homeStyles: `a mix of mid-century to modern Ohio homes — both full masonry and prefab fireplace chimneys`,
    climateNote: `Ohio freeze-thaw cycles and wind-driven rain are tough on every ${s.name} chimney crown, cap and flashing seam.`,
    neighborhoods: s.neighborhoods,
    intro:
      s.introOverride ??
      `${s.name}, Ohio (${s.zip}) homeowners trust ChimCrew for chimney sweeping, fireplace inspection, chimney repair and dryer vent cleaning across ${hood} and the wider ${s.region} metro. We're a CSIA-certified, family-owned Ohio crew serving ${s.drive} every week — same neighborhoods, same trucks, same techs on every callback.`,
    whyUs:
      s.whyUsOverride ??
      `Most ${s.name} homeowners we meet want three things from a chimney company: clear pricing, an honest answer about what actually needs fixing, and a crew that respects the house. We bring a drone for the chimney inspection, a written photo report, and flat-rate quotes — no high-pressure upsells. If your ${s.name} fireplace only needs a sweep and a new cap, that's what we quote.`,
    localProof:
      s.localProofOverride ??
      `Recent ${s.name} job: full chimney sweep, Level 1 inspection, and a new stainless steel cap on a ${s.neighborhoods[0]} home — drop-cloth clean firebox and a written PDF report in the homeowner's inbox the same day.`,
    h1: `Chimney Sweep, Inspection & Repair in ${s.name}, OH`,
    title: s.titleOverride ?? `Chimney Sweep & Repair ${s.name} OH | ChimCrew`,
    description:
      s.descriptionOverride ??
      `Local chimney sweep, inspection, fireplace repair and dryer vent cleaning in ${s.name}, OH (${s.zip}). CSIA-certified, fully insured. Free chimney drone inspection. (614) 683-5763.`,
    faqs: s.faqsOverride ?? [
      {
        q: `How much does a chimney sweep cost in ${s.name}, OH?`,
        a: `Our flat-rate chimney sweep in ${s.name} is $99 and includes a free visual inspection. A full Chimney/Fireplace Inspection is $69, a Gas Fireplace Inspection is $49, and our Chimney Drone Inspection is free. Repairs are quoted in writing before any work starts.`,
      },
      {
        q: `Do you service the ${s.zip} ZIP code?`,
        a: `Yes. ${s.zip} is in our regular ${s.region}-metro route, and ${moreHood} are some of our most-booked neighborhoods. Same-day service is available for active leaks or no-heat situations.`,
      },
      {
        q: `What chimney services do you offer in ${s.name}?`,
        a: `Chimney sweep, chimney/fireplace inspection, gas fireplace inspection, chimney drone inspection, dryer vent cleaning, chimney leak repair, crown rebuilds, tuckpointing, chimney cap installation, and stainless liner installs — all in ${s.name} and surrounding ${s.region} suburbs.`,
      },
      {
        q: `Is the chimney drone inspection really free?`,
        a: `Yes — for every ${s.name} homeowner. We fly a drone around the chimney, photograph the crown, cap and flashing, and email you the photos. No obligation. If anything needs repair, we quote it in writing.`,
      },
      {
        q: `How fast can you get to my ${s.name} home?`,
        a: `Most ${s.name} bookings are scheduled within 24–48 hours. Same-day slots open on weekdays during chimney season — call (614) 683-5763 and we'll get you in.`,
      },
    ],
  };
}

export const SEO_CITIES: SeoCity[] = SEEDS.map(buildCity);

export function getSeoCity(slug: string): SeoCity | undefined {
  return SEO_CITIES.find((c) => c.slug === slug);
}
