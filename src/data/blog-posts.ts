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
    slug: "chimney-sweep-columbus-ohio",
    title: "Chimney sweep in Columbus, Ohio: the complete homeowner's guide",
    excerpt:
      "A working sweep's guide to chimney cleaning in Columbus — when to book, what a real sweep includes, pricing ranges, and the local quirks that catch homeowners off-guard.",
    date: "Jun 14, 2026",
    dateISO: "2026-06-14",
    cover: projectTechOnsite,
    category: "Chimney Sweep",
    readMinutes: 9,
    author: "Marcus Reed, ChimCrew",
    body: [
      {
        heading: "Why Columbus chimneys need a different sweep schedule",
        paragraphs: [
          "Columbus sits in a humid-continental climate band where wet springs, hot summers, and below-freezing winters all hit the same masonry stack every year. That freeze-thaw cycle is the single biggest reason chimneys in Franklin, Delaware, and Licking counties age faster than the national average. Water seeps into hairline cracks in the crown or brick face, freezes overnight, expands, and pops the masonry apart from the inside.",
          "On top of the weather, central Ohio has a high concentration of pre-1980 brick homes — Clintonville, German Village, Bexley, Upper Arlington, Worthington — many built with soft, hand-fired brick and lime-based mortar that simply was not engineered for modern high-heat appliances. Pair that with the Ohio Valley's notoriously damp wood and you get faster creosote buildup than what manufacturers' manuals assume.",
          "For most Columbus homeowners burning seasoned hardwood once or twice a week, we recommend an NFPA 211 Level 1 inspection every fall and a full sweep every one to two years. Weekend burners who run an open fireplace 3+ nights a week through winter should plan on an annual sweep.",
        ],
      },
      {
        heading: "What a real chimney sweep actually includes",
        paragraphs: [
          "A proper sweep in Columbus is not just a brush down the flue. When ChimCrew crews show up, the visit covers: dropcloths and HEPA vacuum containment at the firebox, full top-to-bottom flue brushing with the correct-diameter poly or steel brush, smoke shelf and damper cleaning, firebox vacuuming, cap and screen inspection, crown visual from the roofline, flashing check, and a written Level 1 report with photos.",
          "If you are quoted under $150 for a chimney sweep in the Columbus metro, ask exactly what is included. National coupon-driven companies routinely advertise a low sweep price, then add inspection, video scan, and dropcloth fees on the invoice. Honest local pricing for a real Level 1 sweep in 2026 runs roughly $189 to $279 depending on roof access and stack height.",
          "A Level 2 inspection — required by NFPA 211 anytime a home is sold, a new appliance is installed, or a chimney fire is suspected — adds an internal video camera scan and typically runs $250 to $400 on top of the sweep.",
        ],
      },
      {
        heading: "Columbus neighborhoods we sweep most often",
        paragraphs: [
          "Older urban neighborhoods — Clintonville, German Village, Victorian Village, Olde Towne East, Bexley, and Grandview — make up the bulk of our sweep volume because the housing stock is full of original brick masonry chimneys that have been venting wood and gas for 80+ years.",
          "Newer suburban areas like Dublin, Powell, New Albany, Lewis Center, Pickerington, and Hilliard see different problems: prefab metal fireboxes with class-A chimney pipe, missing rain caps, and condensation issues on gas inserts that were converted from wood without re-lining the flue.",
          "Whatever side of 270 you live on, a Columbus sweep should be familiar with both worlds. Always ask whether the technician is CSIA-certified and whether they carry a real Ohio contractor's liability policy — both are non-negotiable for anyone working on your roof.",
        ],
      },
      {
        heading: "Red flags that mean you need a sweep right now",
        paragraphs: [
          "Strong smoky smell on humid summer days. That is creosote re-volatilizing when moisture hits the flue. It means buildup is heavy enough to be a fire risk.",
          "Black, glossy 'tar' visible just above the damper. That is Stage 2 or Stage 3 creosote — beyond what a normal brush will remove. Schedule a sweep before your next fire.",
          "Smoke spilling into the room when you light a fire. Possibilities include a blocked cap, a closed damper, a downdraft pulling on a tight modern house, or — most seriously — a partial flue obstruction. Stop using the fireplace until a sweep clears it.",
          "Daylight visible in the firebox from above, or rust streaks down the chimney face. Both point to a failed cap, crown, or flashing system letting water into the stack.",
        ],
      },
      {
        heading: "How to book the right Columbus chimney sweep",
        paragraphs: [
          "Look for CSIA certification, written quotes, photo documentation, and Ohio-licensed insurance. Avoid companies that demand cash up front, refuse to provide a written inspection report, or try to upsell a full liner replacement during a routine sweep without showing you camera footage of the damage.",
          "Fall — September through early November — is peak sweep season in Columbus. Book by August if you want a weekend slot. Mid-winter is technically fine for cleaning, but if a Level 2 inspection reveals damage, you may be without your fireplace through the coldest months. The best time to schedule is right after burning season ends, in April or May.",
        ],
      },
    ],
  },
  {
    slug: "chimney-repair-columbus-ohio",
    title: "Chimney repair in Columbus, Ohio: a real-world cost & process guide",
    excerpt:
      "Crown rebuilds, tuckpointing, liner replacement, flashing leaks — what chimney repair in Columbus actually costs in 2026, how long the work takes, and how to tell good repair work from bad.",
    date: "Jun 11, 2026",
    dateISO: "2026-06-11",
    cover: projectCrownRebuild,
    category: "Chimney Repair",
    readMinutes: 10,
    author: "Marcus Reed, ChimCrew",
    body: [
      {
        heading: "The five repairs Columbus homeowners ask about most",
        paragraphs: [
          "After more than a decade on Columbus rooftops, the same five repair jobs come up over and over: crown rebuilds, tuckpointing (mortar joint replacement), chimney liner replacement, flashing leak repair, and rebuilding the top few courses of brick above the roofline. Almost every other repair — caps, dampers, smoke chamber parging — is a smaller line item bundled into one of those five.",
          "The reason these dominate is climate. Columbus winters routinely cycle between 35°F and 15°F in a single 24-hour period. Any water sitting in a crack freezes, expands roughly 9%, and pries the masonry further apart. Over five to ten years that cycle destroys exposed crowns, mortar joints, and the upper brick courses faster than the chimneys below the roofline.",
        ],
      },
      {
        heading: "Crown rebuilds — the most common Columbus repair",
        paragraphs: [
          "The crown is the concrete or mortar 'lid' at the very top of the chimney that sheds water off the masonry. On many central Ohio homes built before 2000, the crown was poured as a thin mortar wash rather than a proper reinforced concrete cap. By year 15 to 20, those mortar washes crack, water gets in, and the chimney starts to fail from the top down.",
          "A real crown rebuild — full demo of the failed crown, installation of a bond break and overhang, and a 3–4 inch reinforced concrete pour with drip edge — runs roughly $850 to $1,800 in the Columbus market in 2026, depending on stack size and access. Cheaper 'crown coat' sealant jobs in the $200 range are a temporary patch, not a repair, and we only recommend them on crowns that are structurally intact.",
        ],
      },
      {
        heading: "Tuckpointing and brick repair",
        paragraphs: [
          "Tuckpointing is the process of grinding out failed mortar joints and packing in fresh, color-matched mortar. On a typical two-story Columbus chimney, full tuckpointing of the above-roof portion runs about $1,200 to $2,800. Spot tuckpointing of just the worst joints is sometimes possible for $500 to $900, but if more than 20% of the joints have failed, full tuckpointing is the more cost-effective call.",
          "Spalling brick — where the face of the brick has popped off, exposing softer interior clay — usually means individual brick replacement is needed. We salvage matching brick from the back side of the stack whenever possible to keep the front looking original.",
        ],
      },
      {
        heading: "Chimney liner repair and replacement",
        paragraphs: [
          "Original Columbus homes from the early 1900s often have clay tile liners that have cracked from chimney fires or settled from decades of heat cycling. Anything that vents wood, gas, or oil in 2026 must have a continuous, code-compliant liner — that is non-negotiable under both NFPA 211 and the Ohio Residential Code.",
          "A stainless-steel liner installation for a wood-burning fireplace in a 25-foot Columbus stack typically runs $2,500 to $4,500 installed. Smaller-diameter aluminum liners for gas furnace venting are cheaper, around $900 to $1,800. We strongly recommend lifetime-warranty 316Ti stainless steel for any wood-burning application — cheaper 304 stainless will not stand up to long-term creosote exposure.",
        ],
      },
      {
        heading: "Flashing leak repair",
        paragraphs: [
          "If you have a wet wall, ceiling stain, or musty smell near the chimney, flashing is the first suspect. Flashing is the metal collar where the chimney meets the roof. On most Columbus homes it is step flashing tied into counter flashing cut into the brick. Asphalt and tar 'roof sealant' applied over flashing is the most common bad fix we see — it lasts one season at best and traps water against the masonry.",
          "A proper flashing repair removes the failed material, installs new aluminum or copper step and counter flashing, mortars the counter flashing back into a freshly cut reglet, and seals with high-grade polyurethane — not roof tar. Plan on $450 to $950 for a standard repair, more if shingles need to be lifted and reset.",
        ],
      },
      {
        heading: "How long Columbus chimney repairs actually take",
        paragraphs: [
          "Crown rebuild: one full day on site, plus 7–10 days of cure time before burning. Tuckpointing: one to two days depending on stack size. Liner install: typically half a day. Flashing repair: half a day. Full above-roof rebuild (top 5–8 courses): one to two days.",
          "Weather matters. Masonry work in central Ohio is best done between April and early November when overnight temps stay above 40°F. Cold-weather repairs are possible with additives and tarping, but the mortar cure is never as strong as work done in dry, moderate conditions.",
        ],
      },
      {
        heading: "How to vet a Columbus chimney repair company",
        paragraphs: [
          "Ask for current Ohio liability insurance with proof, CSIA or NCSG certification, and before/after photos of recent crown and tuckpointing jobs in the Columbus area. A real repair company will happily show you the camera footage that justifies a quoted liner replacement and will give you a written, itemized scope of work — not a one-line invoice.",
          "Walk away from any contractor offering 'free chimney inspections' that conveniently turn into $8,000 of recommended work. Honest chimney repair is technical, weather-dependent, and never sold door-to-door.",
        ],
      },
    ],
  },
  {
    slug: "gas-fireplace-inspection-guide",
    title: "Gas fireplace inspection: what every homeowner should know",
    excerpt:
      "A clean fire and no chimney soot does not mean a gas fireplace is safe. Here is exactly what a proper gas fireplace inspection covers — and the failures we find most often.",
    date: "Jun 8, 2026",
    dateISO: "2026-06-08",
    cover: projectCapFinished,
    category: "Gas Fireplace",
    readMinutes: 9,
    author: "Marcus Reed, ChimCrew",
    body: [
      {
        heading: "Why gas fireplaces still need an annual inspection",
        paragraphs: [
          "Gas fireplaces feel low-maintenance because they do not produce visible soot or creosote the way wood fires do. That perception is the single biggest reason we get called to homes with serious safety issues — failed thermocouples, cracked heat exchangers, blocked vents, and rodent damage in vent terminations.",
          "The Chimney Safety Institute of America, the National Fireplace Institute, and the gas appliance manufacturers themselves all recommend an annual inspection. The Ohio Residential Code echoes that standard. A gas fireplace inspection is not optional maintenance — it is the only routine check standing between a small, fixable issue and a carbon monoxide event.",
        ],
      },
      {
        heading: "What a real gas fireplace inspection covers",
        paragraphs: [
          "A proper inspection always includes: a combustion analysis with a calibrated CO meter at the firebox and at the room air, visual inspection of the burner ports and pilot assembly, thermocouple or thermopile millivolt test, gas pressure check at the manifold, glass-front seal and gasket condition, log placement against the manufacturer's diagram (incorrect placement is the #1 cause of soot and CO), and full venting inspection from termination cap back to the appliance.",
          "For direct-vent units, the technician should pull the glass, inspect and clean the burner, check the air mixer, vacuum the firebox, polish the glass with non-ammonia cleaner, and reseat the gasket. For B-vent or natural-vent units, the chimney itself still needs a Level 1 inspection because gas combustion produces water vapor that can corrode metal liners and erode masonry over time.",
        ],
      },
      {
        heading: "The failures we find most often in Ohio homes",
        paragraphs: [
          "Spider and insect blockage in the pilot orifice. Tiny mud-dauber wasps and spiders are attracted to the mercaptan odorant in natural gas. Their webs clog pilot assemblies and cause intermittent ignition failures — extremely common in central Ohio after summer.",
          "Failed thermocouples and thermopiles. These are the small sensors that prove the pilot is lit before the main valve opens. They typically last 5–10 years. A weak thermopile reading (under 350 mV under load) is the most common reason a gas fireplace will not stay lit.",
          "Cracked or warped logs. Ceramic logs are not decorative — their shape and position direct flames and air. A broken log can redirect flame onto the glass or burner ports, causing sooting that quickly clogs the orifices and creates incomplete combustion.",
          "Blocked or damaged termination caps. We pull bird nests, leaves, and dryer-vent-style debris out of horizontal direct-vent terminations every fall. A partially blocked vent will produce CO and may not trip an under-rated detector.",
          "Carbon monoxide drift. Even a properly burning gas fireplace can leak combustion products into a room if the gasket is failed, the glass is cracked, or the venting is compromised. A combustion analyzer is the only way to know.",
        ],
      },
      {
        heading: "When to schedule and what to expect",
        paragraphs: [
          "Schedule a gas fireplace inspection every fall, before first use. In Ohio that means August through October. A standard inspection takes about 60 to 90 minutes per appliance and costs roughly $159 to $249 in 2026 depending on access and whether the unit is direct-vent, B-vent, or vent-free.",
          "You should receive a written report covering CO readings, manifold pressure, thermopile millivolts, venting condition, and any code or manufacturer-spec deviations found. Photos of the burner, logs, and venting are standard with a professional inspection.",
        ],
      },
      {
        heading: "Carbon monoxide: the part nobody wants to talk about",
        paragraphs: [
          "Every home with a gas appliance — fireplace, furnace, water heater, range — should have at least one UL-2034 listed CO detector on each floor and one within 10 feet of every sleeping area. Detectors expire; replace them every 5 to 7 years per the manufacturer's date stamp.",
          "Symptoms of low-level CO exposure mimic the flu: headache, fatigue, dizziness, nausea that gets better when you leave the house. If multiple family members feel better away from home, suspect CO and have your gas appliances inspected immediately. A properly tuned gas fireplace produces near-zero CO in the room — anything else is a problem you can fix.",
        ],
      },
      {
        heading: "Choosing a qualified gas fireplace technician",
        paragraphs: [
          "Look for NFI Gas Specialist certification (NFI-G), CSIA credentialing, and current Ohio liability insurance. Many general HVAC techs are excellent at furnaces and air conditioning but have never been trained on hearth appliances. Gas fireplaces have their own venting standards, their own combustion math, and their own failure modes — and they sit in your living room. Hire a specialist.",
        ],
      },
    ],
  },
  {
    slug: "how-often-sweep-chimney-ohio",
    title: "How often should you sweep your chimney in Ohio?",
    excerpt:
      "Burning seasoned hardwood twice a week? Here's our honest answer on inspection and sweep cadence for Columbus, Cincinnati, and Dayton homes.",
    date: "May 12, 2026",
    dateISO: "2026-05-12",
    cover: projectTechOnsite,
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
    cover: projectFlueBefore,
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
    cover: projectCapInstall,
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
      "Ohio's freeze-thaw cycle is brutal on brick chimneys. Here's where the water actually gets in — and what a fix looks like.",
    date: "Mar 22, 2026",
    dateISO: "2026-03-22",
    cover: projectTuckpointing,
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
    cover: projectCapFinished,
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
    cover: projectCrownRebuild,
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