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
// Real customer jobs (uploaded photos)
import realCrownBefore from "@/assets/uploads/job0.jpeg.asset.json";
import realCrownAfter from "@/assets/uploads/job_1.jpeg.asset.json";
import realStuccoBefore from "@/assets/uploads/job_2.jpeg.asset.json";
import realStuccoAfter from "@/assets/uploads/job_3.jpeg.asset.json";
import realTuckBefore from "@/assets/uploads/job_7.jpeg.asset.json";
import realTuckAfter from "@/assets/uploads/job_8.jpeg.asset.json";

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
    id: "real-crown-cap",
    headline: "Cracked crown & open flue → sealed crown + new cap",
    service: "Crown Seal + Stainless Cap Install",
    city: "Powell, OH",
    note: "Crown was split end-to-end with the terra-cotta flue exposed. We sealed every crack with high-temp CrownCoat and locked in a new black mesh cap.",
    before: realCrownBefore.url,
    after: realCrownAfter.url,
  },
  {
    id: "real-stucco",
    headline: "Spalling painted stucco → fresh elastomeric coat",
    service: "Chimney Waterproofing & Recoat",
    city: "Columbus, OH",
    note: "Years of freeze-thaw had blown the old paint right off the stack. We stripped, patched, and recoated with a vapor-permeable waterproof finish.",
    before: realStuccoBefore.url,
    after: realStuccoAfter.url,
  },
  {
    id: "real-tuckpoint",
    headline: "Failed mortar & flashing → fresh tuckpoint + new flashing",
    service: "Full Tuckpointing + Step Flashing",
    city: "Dublin, OH",
    note: "Mortar joints crumbled with a finger. Cut out, repointed every joint, and installed fresh step and counter-flashing before the next storm.",
    before: realTuckBefore.url,
    after: realTuckAfter.url,
  },
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
    headline: "Soot-caked firebox → spotless, ready for winter",
    service: "Full Firebox Sweep & Wipe-Down",
    city: "Upper Arlington, OH",
    note: "Years of build-up on the brick and hearth — HEPA-vacuumed, scrubbed, and wiped without a speck of soot in the room.",
    before: damperBefore,
    after: damperAfter,
  },
  {
    id: "brick",
    headline: "Cracked, crumbling crown → solid parged wash",
    service: "Chimney Crown Rebuild & Parge",
    city: "Hilliard, OH",
    note: "Freeze-thaw cracks ran straight through the wash — demoed, reinforced, and re-parged to shed water for another decade.",
    before: brickBefore,
    after: brickAfter,
  },
  {
    id: "smoke-chamber",
    headline: "Heavy creosote flue → smooth parge coat",
    service: "Flue Sweep + Smoke Chamber Parge",
    city: "Powell, OH",
    note: "3rd-degree creosote and rough chamber walls — swept down to brick and parged smooth to code for safer draft.",
    before: smokeBefore,
    after: smokeAfter,
  },
];