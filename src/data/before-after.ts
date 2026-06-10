import fireplaceBefore from "@/assets/ba/fireplace-before.jpeg.asset.json";
import fireplaceAfter from "@/assets/ba/fireplace-after.jpeg.asset.json";
import flueBefore from "@/assets/ba/flue-before.jpeg.asset.json";
import flueAfter from "@/assets/ba/flue-after.jpeg.asset.json";
import crownBefore from "@/assets/ba/crown-before.jpeg.asset.json";
import crownAfter from "@/assets/ba/crown-after.jpeg.asset.json";
import capBefore from "@/assets/ba/cap-before.jpeg.asset.json";
import capAfter from "@/assets/ba/cap-after.jpeg.asset.json";
import damperBefore from "@/assets/ba/damper-before.jpg";
import damperAfter from "@/assets/ba/damper-after.jpg";
import brickBefore from "@/assets/ba/brick-before.jpg";
import brickAfter from "@/assets/ba/brick-after.jpg";
import smokeBefore from "@/assets/ba/smoke-before.jpg";
import smokeAfter from "@/assets/ba/smoke-after.jpg";

export type BeforeAfterJob = {
  id: string;
  headline: string;
  service: string;
  city: string;
  note: string;
  before: string;
  after: string;
};

export const BEFORE_AFTER_JOBS: BeforeAfterJob[] = [
  {
    id: "firebox",
    headline: "From sooty firebox to like-new hearth",
    service: "Full Firebox Sweep & Restoration",
    city: "Columbus, OH",
    note: "6 years of creosote and ash — cleared, scrubbed, sealed in one visit.",
    before: fireplaceBefore.url,
    after: fireplaceAfter.url,
  },
  {
    id: "flue",
    headline: "Heavy creosote → smooth, sealed flue",
    service: "Flue Sweep + Parge & Seal",
    city: "Cincinnati, OH",
    note: "3rd-degree creosote and a cracked liner — cleaned and parged to code.",
    before: flueBefore.url,
    after: flueAfter.url,
  },
  {
    id: "crown",
    headline: "Crumbling crown rebuilt in real stone",
    service: "Crown & Chimney Rebuild",
    city: "Dayton, OH",
    note: "Failing mortar crown taken down to the deck and rebuilt with stacked stone.",
    before: crownBefore.url,
    after: crownAfter.url,
  },
  {
    id: "cap",
    headline: "Open brick stack → capped, flashed, watertight",
    service: "New Cap + Flashing Install",
    city: "Westerville, OH",
    note: "Animal entry, water intrusion — sealed with a stainless cap and new step flashing.",
    before: capBefore.url,
    after: capAfter.url,
  },
  {
    id: "damper",
    headline: "Rusted-out damper → brand-new top-mount seal",
    service: "Top-Mount Damper Replacement",
    city: "Upper Arlington, OH",
    note: "Cast iron damper seized and corroded — pulled and replaced with a stainless top-mount, sealed airtight.",
    before: damperBefore,
    after: damperAfter,
  },
  {
    id: "brick",
    headline: "Spalled brick stack rebuilt from the roofline up",
    service: "Full Chimney Rebuild Above Roof",
    city: "Hilliard, OH",
    note: "Years of freeze-thaw shed bricks onto the lawn — rebuilt course-by-course with fresh brick and clean joints.",
    before: brickBefore,
    after: brickAfter,
  },
  {
    id: "smoke-chamber",
    headline: "Creosote-caked smoke chamber → smooth parge coat",
    service: "Smoke Chamber Parge & Seal",
    city: "Powell, OH",
    note: "3rd-degree creosote and a rough corbeled chamber — cleaned and parged smooth to code for safer draft.",
    before: smokeBefore,
    after: smokeAfter,
  },
];