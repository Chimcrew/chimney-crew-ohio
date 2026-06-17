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
};

const SEEDS: CitySeed[] = [
  // Columbus metro
  { name: "Columbus", region: "Columbus", zip: "43215", drive: "downtown Columbus", neighborhoods: ["Short North", "German Village", "Clintonville", "Bexley", "Upper Arlington"] },
  { name: "Dublin", region: "Columbus", zip: "43017", drive: "15 minutes northwest of downtown Columbus", neighborhoods: ["Muirfield Village", "Tartan Fields", "Riverside Woods", "Llewellyn Farms"] },
  { name: "Westerville", region: "Columbus", zip: "43081", drive: "20 minutes northeast of downtown Columbus", neighborhoods: ["Uptown Westerville", "Highlands", "Hoover Reserve", "Spring Grove"] },
  { name: "Worthington", region: "Columbus", zip: "43085", drive: "12 minutes north of downtown Columbus", neighborhoods: ["Old Worthington", "Colonial Hills", "Rush Creek", "Worthington Hills"] },
  { name: "Hilliard", region: "Columbus", zip: "43026", drive: "18 minutes west of downtown Columbus", neighborhoods: ["Old Hilliard", "Heritage Lakes", "Brookside Estates", "Scioto Reserve"] },
  { name: "Upper Arlington", region: "Columbus", zip: "43221", drive: "10 minutes northwest of downtown Columbus", neighborhoods: ["Tremont", "Old Arlington", "Devon Triangle", "Scioto Country Club"] },
  { name: "Gahanna", region: "Columbus", zip: "43230", drive: "15 minutes east of downtown Columbus", neighborhoods: ["Old Gahanna", "Royal Manor", "Highland Crossing"] },
  { name: "Reynoldsburg", region: "Columbus", zip: "43068", drive: "20 minutes east of downtown Columbus", neighborhoods: ["Olde Reynoldsburg", "Slate Ridge", "Brice Park"] },
  { name: "Grove City", region: "Columbus", zip: "43123", drive: "15 minutes southwest of downtown Columbus", neighborhoods: ["Town Center", "Pinnacle Club", "Beulah Park"] },
  { name: "Pickerington", region: "Columbus", zip: "43147", drive: "22 minutes southeast of downtown Columbus", neighborhoods: ["Olde Pickerington Village", "Ridgeview", "Heritage Hill"] },
  { name: "Powell", region: "Columbus", zip: "43065", drive: "20 minutes north of downtown Columbus", neighborhoods: ["Liberty Township", "Olentangy Falls", "Bartholomew Run", "Wedgewood"] },
  { name: "New Albany", region: "Columbus", zip: "43054", drive: "20 minutes northeast of downtown Columbus", neighborhoods: ["Country Club", "Edge of the Woods", "New Albany Farms"] },
  { name: "Delaware", region: "Columbus", zip: "43015", drive: "30 minutes north of downtown Columbus", neighborhoods: ["Downtown Delaware", "Glenross", "The Lakes"] },
  { name: "Lewis Center", region: "Columbus", zip: "43035", drive: "25 minutes north of downtown Columbus", neighborhoods: ["Polaris", "Highland Lakes", "Hawksridge"] },
  { name: "Pataskala", region: "Columbus", zip: "43062", drive: "30 minutes east of downtown Columbus", neighborhoods: ["Downtown Pataskala", "Watkins Glen", "Summit Station"] },

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
      `${s.name}, Ohio (${s.zip}) homeowners trust ChimCrew for chimney sweeping, fireplace inspection, chimney repair and dryer vent cleaning across ${hood} and the wider ${s.region} metro. We're a CSIA-certified, family-owned Ohio crew serving ${s.drive} every week — same neighborhoods, same trucks, same techs on every callback.`,
    whyUs:
      `Most ${s.name} homeowners we meet want three things from a chimney company: clear pricing, an honest answer about what actually needs fixing, and a crew that respects the house. We bring a drone for the chimney inspection, a written photo report, and flat-rate quotes — no high-pressure upsells. If your ${s.name} fireplace only needs a sweep and a new cap, that's what we quote.`,
    localProof:
      `Recent ${s.name} job: full chimney sweep, Level 1 inspection, and a new stainless steel cap on a ${s.neighborhoods[0]} home — drop-cloth clean firebox and a written PDF report in the homeowner's inbox the same day.`,
    h1: `Chimney Sweep, Inspection & Repair in ${s.name}, OH`,
    title: `Chimney Sweep & Repair ${s.name} OH | ChimCrew`,
    description: `Local chimney sweep, inspection, fireplace repair and dryer vent cleaning in ${s.name}, OH (${s.zip}). CSIA-certified, fully insured. Free chimney drone inspection. (614) 683-5763.`,
    faqs: [
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
