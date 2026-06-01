import projectDoubleCrown from "@/assets/projects/project-01-double-crown.jpg";
import projectTuckpointing from "@/assets/projects/project-02-tuckpointing-after.jpg";
import projectLiner from "@/assets/projects/project-03-liner-install.jpg";
import projectCapInstall from "@/assets/projects/project-04-cap-install.jpg";
import projectCrownRebuild from "@/assets/projects/project-05-crown-rebuild.jpg";
import projectTechOnsite from "@/assets/projects/project-06-tech-onsite.jpg";
import projectFlueBefore from "@/assets/projects/project-07-flue-before.jpg";
import projectCapFinished from "@/assets/projects/project-08-cap-finished.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  cover: string;
  category: string;
  readMinutes: number;
  author: string;
  /** Each item is a heading + paragraphs. */
  body: { heading: string; paragraphs: string[] }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-often-sweep-chimney-ohio",
    title: "How often should you sweep your chimney in Ohio?",
    excerpt:
      "Burning seasoned hardwood twice a week? Here's our honest answer on inspection and sweep cadence for Columbus, Cincinnati, and Dayton homes.",
    date: "May 12, 2026",
    dateISO: "2026-05-12",
    cover: sweep,
    category: "Maintenance",
    readMinutes: 5,
    author: "Marcus Reed, ChimCrew",
    body: [
      {
        heading: "The short answer",
        paragraphs: [
          "The National Fire Protection Association (NFPA 211) recommends an annual chimney inspection for every wood-burning appliance, regardless of how often you use it. In central and southwest Ohio, where wet springs and freeze-thaw winters are normal, we recommend it every fall before you light your first fire.",
          "A sweep — the actual cleaning — depends on use. If you burn one or two fires a week through an Ohio winter, plan on sweeping every 1 to 2 years. Heavy weekend burners often need it annually.",
        ],
      },
      {
        heading: "What we look for during an Ohio inspection",
        paragraphs: [
          "Creosote thickness in the flue (anything over 1/8\" is a fire risk), masonry crown condition, flashing seal at the roofline, cap and screen integrity, and any liner cracks from previous chimney fires you may not have noticed.",
          "On older Columbus and Cincinnati homes, we also check for spalling brick caused by the freeze-thaw cycle — water seeps in, freezes overnight, and pops the brick face off.",
        ],
      },
      {
        heading: "Why annual matters even if you don't burn",
        paragraphs: [
          "Even unused chimneys collect bird nests, leaves, and moisture damage. A blocked flue on a gas furnace venting through the chimney can push carbon monoxide back into the house.",
        ],
      },
    ],
  },
  {
    slug: "creosote-stages-explained",
    title: "Creosote 101: the three stages and why Stage 3 is scary",
    excerpt:
      "That black, glossy build-up is the #1 cause of chimney fires in Ohio. Here's how to tell which stage you're at — and what we can actually remove.",
    date: "Apr 28, 2026",
    dateISO: "2026-04-28",
    cover: after,
    category: "Safety",
    readMinutes: 6,
    author: "Marcus Reed, ChimCrew",
    body: [
      {
        heading: "Stage 1 — flaky soot",
        paragraphs: [
          "Dusty, dry, and brushes off easily. This is normal residue from any wood fire. A standard sweep handles it in one visit.",
        ],
      },
      {
        heading: "Stage 2 — hardened flakes",
        paragraphs: [
          "Crunchy, tar-like deposits that have started to bond to the flue. Caused by cooler smoke, often from burning unseasoned wood. We use rotary chains to break it loose.",
        ],
      },
      {
        heading: "Stage 3 — glazed creosote",
        paragraphs: [
          "Black, shiny, almost lacquered. This is concentrated fuel sitting in your flue. A single Stage-3 chimney fire can reach 2000°F in under a minute and crack tile liners straight down the chimney.",
          "We treat Stage 3 with a thermal modifier over multiple visits — a regular brush will not touch it. If you see a shiny black coating with a flashlight, stop using the fireplace and book an inspection.",
        ],
      },
    ],
  },
  {
    slug: "cracked-liner-symptoms",
    title: "Gas fireplace humming? Cracked liner symptoms to watch for",
    excerpt:
      "Five subtle signs your flue is failing — before the carbon monoxide alarm proves it. Written for Ohio homeowners running gas inserts.",
    date: "Apr 09, 2026",
    dateISO: "2026-04-09",
    cover: fireplace,
    category: "Safety",
    readMinutes: 4,
    author: "ChimCrew Tech Team",
    body: [
      {
        heading: "1. Persistent humming or pressure imbalance",
        paragraphs: [
          "A cracked liner changes the draft, and the appliance has to work harder to vent. That extra effort often shows up as a low hum or whistle when the burner is running.",
        ],
      },
      {
        heading: "2. Soot stains above the firebox",
        paragraphs: [
          "Vertical black streaks on the surround mean flue gases are escaping where they shouldn't be.",
        ],
      },
      {
        heading: "3. White, chalky residue on the brick",
        paragraphs: [
          "Efflorescence — salts deposited as moisture moves through cracked masonry. Almost always points to a compromised liner or crown.",
        ],
      },
      {
        heading: "4. Cold air falling into the room",
        paragraphs: [
          "Downdraft when the appliance is off can mean the flue is no longer sealed properly.",
        ],
      },
      {
        heading: "5. A CO detector that won't stop chirping",
        paragraphs: [
          "Treat this as an emergency. Shut the appliance down, open windows, and call us — or 911 if anyone feels symptoms.",
        ],
      },
    ],
  },
  {
    slug: "chimney-leak-causes",
    title: "Why is my chimney leaking? 4 causes we see every spring in Ohio",
    excerpt:
      "Ohio's freeze-thaw cycle is brutal on brick chimneys. Here's where the water actually gets in — and what a real fix looks like.",
    date: "Mar 22, 2026",
    dateISO: "2026-03-22",
    cover: leak,
    category: "Repairs",
    readMinutes: 5,
    author: "Marcus Reed, ChimCrew",
    body: [
      {
        heading: "1. Failed flashing",
        paragraphs: [
          "The metal collar where the chimney meets the roof is the #1 leak point. Old tar sealant cracks within 3 to 5 winters. The fix is step flashing plus a proper counter-flashing, not another bead of caulk.",
        ],
      },
      {
        heading: "2. Cracked crown",
        paragraphs: [
          "The concrete cap on top of the masonry develops hairline cracks that funnel rainwater straight into the flue. We rebuild crowns with a sloped, overhanging pour so water sheds clear of the bricks.",
        ],
      },
      {
        heading: "3. Missing or undersized cap",
        paragraphs: [
          "Without a stainless cap, rain, snow, leaves and squirrels go right down the flue. A proper cap pays for itself the first season.",
        ],
      },
      {
        heading: "4. Porous brick",
        paragraphs: [
          "Brick absorbs water like a sponge. After tuckpointing, we apply a vapor-permeable sealer that blocks liquid water but lets the masonry breathe.",
        ],
      },
    ],
  },
  {
    slug: "seasoned-firewood-guide-ohio",
    title: "Seasoned firewood in Ohio: what to buy and what to skip",
    excerpt:
      "Wet wood is the leading cause of Stage-2 creosote. Here's how to spot truly seasoned hardwood at an Ohio firewood lot.",
    date: "Mar 04, 2026",
    dateISO: "2026-03-04",
    cover: truck,
    category: "Maintenance",
    readMinutes: 4,
    author: "ChimCrew Tech Team",
    body: [
      {
        heading: "Target moisture content: under 20%",
        paragraphs: [
          "A $20 pin-type moisture meter from any Ohio hardware store will tell you in seconds. Anything above 25% is going to smolder, smoke, and coat your flue.",
        ],
      },
      {
        heading: "Hardwoods that work in Ohio",
        paragraphs: [
          "Oak, hickory, sugar maple, and ash burn hot and long. Skip pine, spruce, and other softwoods — they burn fast and leave heavy creosote.",
        ],
      },
      {
        heading: "Visual signs of truly seasoned wood",
        paragraphs: [
          "Gray weathered ends, cracks radiating from the heart, and a hollow ringing sound when two pieces are knocked together. If it's heavy and dense-feeling, it's still wet inside.",
        ],
      },
    ],
  },
  {
    slug: "stainless-liner-vs-clay-tile",
    title: "Stainless liner vs. clay tile: which one belongs in your Ohio home?",
    excerpt:
      "Most pre-1990 Ohio chimneys still have clay tile liners. Here's when relining with stainless is the right call.",
    date: "Feb 18, 2026",
    dateISO: "2026-02-18",
    cover: projectLiner,
    category: "Repairs",
    readMinutes: 6,
    author: "Marcus Reed, ChimCrew",
    body: [
      {
        heading: "Clay tile: what it does well",
        paragraphs: [
          "Clay is cheap, common in older Columbus and Cincinnati homes, and works fine for open wood-burning fireplaces — when it's intact.",
        ],
      },
      {
        heading: "Where clay tile fails",
        paragraphs: [
          "After a chimney fire, the tiles often crack from thermal shock. They also can't be safely used to vent modern high-efficiency gas appliances, which produce acidic condensation that eats clay from the inside.",
        ],
      },
      {
        heading: "Why stainless wins for most Ohio retrofits",
        paragraphs: [
          "A 316Ti or AL29-4C stainless liner is sized exactly to the appliance, lasts 20-plus years, comes with a lifetime warranty when professionally installed, and is required by most insurance companies after a documented chimney fire.",
        ],
      },
      {
        heading: "What an install looks like",
        paragraphs: [
          "One day on site. We drop the liner from the top, insulate it, connect at the appliance, and seal the top plate. No demolition. Your fireplace works the same evening.",
        ],
      },
    ],
  },
  {
    slug: "annual-inspection-checklist",
    title: "The annual chimney inspection: what's actually on our checklist",
    excerpt:
      "What a CSIA Level 1 inspection covers, what Level 2 adds, and when you should ask for Level 3 — in plain English.",
    date: "Jan 28, 2026",
    dateISO: "2026-01-28",
    cover: crown,
    category: "Maintenance",
    readMinutes: 5,
    author: "ChimCrew Tech Team",
    body: [
      {
        heading: "Level 1 — the annual",
        paragraphs: [
          "Visual inspection of all readily accessible portions of the chimney, structure, flue, and connections. Includes basic appliance check. This is what most Ohio homes need every fall.",
        ],
      },
      {
        heading: "Level 2 — change of conditions",
        paragraphs: [
          "Required by NFPA 211 any time you change fuel type, replace an appliance, or after a chimney fire or weather event. Adds a camera scan of the entire flue interior.",
        ],
      },
      {
        heading: "Level 3 — when something's seriously wrong",
        paragraphs: [
          "Reserved for hidden hazards that require removing a section of masonry or wall. Rare, but the right call when a Level 2 finds damage we can't fully see.",
        ],
      },
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  BLOG_POSTS.find((p) => p.slug === slug);