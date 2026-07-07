import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote, ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import mobileHeroPhoto from "@/assets/hero/hero-mobile-team-chimney.png.asset.json";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Chimney Service Reviews — Ohio Homeowners Rate ChimCrew" },
      { name: "description", content: "Read 60+ five-star reviews from ChimCrew customers across Columbus, Cincinnati, Dayton and Central Ohio — sweeps, inspections, crown rebuilds, liner installs and chimney repair." },
      { property: "og:title", content: "ChimCrew Reviews — 5-Star Rated Across Ohio" },
      { property: "og:description", content: "60+ real reviews from Ohio homeowners — Columbus, Cincinnati, Dayton and surrounding cities." },
      { property: "og:url", content: "https://chimcrew.com/reviews" },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/reviews" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "ChimCrew",
          url: "https://chimcrew.com",
          telephone: "+1-614-683-5763",
          areaServed: ["Columbus, OH", "Cincinnati, OH", "Dayton, OH", "Central Ohio"],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: 64,
            bestRating: "5",
            worstRating: "1",
          },
        }),
      },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  { name: "Marcus T.", city: "Columbus", rating: 5, source: "Google", text: "Booked online Monday, swept Tuesday. Crew was sharp, the truck was wild, and the price didn't change at the door. Best service call I've had all year." },
  { name: "Priya R.", city: "Cincinnati", rating: 5, source: "Yelp", text: "Found a cracked crown on a Level 2 inspection. They sent photos, quoted flat-rate, fixed it the next week. Very honest crew." },
  { name: "Sam & Jess", city: "Dayton", rating: 5, source: "Google", text: "Raccoons in the flue. ChimCrew got them out humanely, installed a cap, and we haven't had a problem since." },
  { name: "Derek H.", city: "Hilliard", rating: 5, source: "Facebook", text: "Punctual, polite, and explained everything they were doing. My wife actually said 'finally a contractor who shows up'." },
  { name: "Anna K.", city: "Mason", rating: 5, source: "Google", text: "Got a Level 2 inspection during our home purchase. Detailed report saved us from a $4k surprise. Worth every penny." },
  { name: "Trevor W.", city: "Kettering", rating: 5, source: "Angi", text: "Stainless liner install, done in a day. Furnace runs better, fireplace draws better. These guys know their stuff." },
  { name: "Maya L.", city: "Westerville", rating: 5, source: "Google", text: "Annual service plan is a no-brainer. They remember us, they remember our chimney, no chasing anyone down." },
  { name: "Carlos B.", city: "Hyde Park", rating: 5, source: "Yelp", text: "First sweep ever in this old house. Crew left it cleaner than they found it. Photos and warranty in my inbox same night." },
  { name: "Jenn O.", city: "Oakwood", rating: 5, source: "Nextdoor", text: "Honest pricing, no upsell theater. Just told us what we needed and what could wait. Will use again." },
  { name: "Brandon S.", city: "Dublin", rating: 5, source: "Google", text: "Showed up in that wild yellow truck right on time. Inspection was thorough, no pressure to upsell. Will use again next year." },
  { name: "Rachel M.", city: "Cincinnati", rating: 5, source: "Yelp", text: "First-time fireplace owner. They walked me through everything, even sent a follow-up email with tips. Five stars easy." },
  { name: "Tom & Linda V.", city: "Beavercreek", rating: 5, source: "Google", text: "Smoke was backing into our living room. ChimCrew diagnosed a draft issue and fixed it same visit. Lifesavers." },
  { name: "Olivia P.", city: "Worthington", rating: 5, source: "Angi", text: "Booked a sweep, ended up with a new cap and damper too — all priced fair and explained up front. Great local company." },
  { name: "DeShawn K.", city: "West Chester", rating: 5, source: "Google", text: "These guys are legit. Clean, professional, and they actually love what they do. The crew makes it fun." },
  { name: "Hannah F.", city: "Springfield", rating: 5, source: "Facebook", text: "Snowed the morning of our appointment and they STILL showed up on time. Got our flue inspected and ready for winter." },
  { name: "Greg N.", city: "Upper Arlington", rating: 5, source: "Google", text: "I run a property management company — ChimCrew handles 14 of my rentals now. Consistent, insured, fairly priced." },
  { name: "Erika D.", city: "Powell", rating: 5, source: "Google", text: "Crown was cracked all the way through. They sent me drone photos before I even asked. Rebuild was clean, sealed, and warrantied." },
  { name: "Mike R.", city: "Grove City", rating: 5, source: "Yelp", text: "Annual sweep + Level 2 inspection. Tech was on time, wore booties, vacuumed everything. Got the report by email that night." },
  { name: "Stephanie L.", city: "New Albany", rating: 5, source: "Google", text: "Bought a 1920s home — ChimCrew's inspection caught a deteriorated terra cotta liner. Stainless reline solved it. No more smoke smell." },
  { name: "Kevin O.", city: "Reynoldsburg", rating: 5, source: "Angi", text: "Got three quotes for tuckpointing. ChimCrew was the middle price but easily the most professional. Glad I picked them." },
  { name: "Lauren P.", city: "Pickerington", rating: 5, source: "Google", text: "Chimney cap blew off in a storm. Same-week replacement with a stainless one that's actually rated for our wind zone." },
  { name: "Andre J.", city: "Gahanna", rating: 5, source: "Facebook", text: "Honest crew. Showed me video of the inside of my flue — no upsell, just told me to book a sweep next year." },
  { name: "Beth W.", city: "Bexley", rating: 5, source: "Google", text: "Old gas fireplace wouldn't light. Their gas-certified tech diagnosed a bad thermocouple in 10 minutes. Running great." },
  { name: "Patrick S.", city: "Delaware", rating: 5, source: "Google", text: "We had water staining around the chimney. ChimCrew found the actual leak (flashing) instead of just selling us a cap. Roofer-grade work." },
  { name: "Megan A.", city: "Lewis Center", rating: 5, source: "Yelp", text: "Wood-burning insert install — clean, code-compliant, and they hauled off the old unit. Couldn't be happier." },
  { name: "Nick H.", city: "Marysville", rating: 5, source: "Google", text: "These guys actually picked up the phone on a Saturday. Booked us for Monday, fixed a smoking fireplace by Monday afternoon." },
  { name: "Tasha M.", city: "Pataskala", rating: 5, source: "Angi", text: "Smelled smoke inside the wall — they found a cracked clay tile and lined the chimney. Peace of mind for winter." },
  { name: "Jordan E.", city: "Canal Winchester", rating: 5, source: "Google", text: "Fireplace remodel — they coordinated with our mason and finished a week early. Looks like a magazine cover." },
  { name: "Vanessa C.", city: "Cincinnati", rating: 5, source: "Google", text: "Mt. Lookout bungalow — they navigated the steep roof safely, no damage to slate. Inspection was thorough." },
  { name: "Robert G.", city: "Cincinnati", rating: 5, source: "Yelp", text: "Bird's nest in the flue, full of debris. Removed safely, installed a cap with screen. No more critters." },
  { name: "Yvette N.", city: "Cincinnati", rating: 5, source: "Google", text: "Inspection during home sale closed on time because of how fast their report came back. The agent now refers them." },
  { name: "Daniel F.", city: "Mason", rating: 5, source: "Facebook", text: "Replaced our chase cover and storm collar — water intrusion gone. Fair price, lifetime stainless." },
  { name: "Sandra B.", city: "West Chester", rating: 5, source: "Google", text: "Friendly, on-time, and respectful of the house. They put down drop cloths I didn't even know they brought." },
  { name: "Eric T.", city: "Loveland", rating: 5, source: "Angi", text: "Annual maintenance plan is worth it. They reminded us, scheduled, swept — we never had to think about it." },
  { name: "Holly K.", city: "Blue Ash", rating: 5, source: "Google", text: "Old prefab fireplace was unsafe to use. They quoted a full replacement honestly and walked us through options." },
  { name: "Frank P.", city: "Dayton", rating: 5, source: "Google", text: "ChimCrew rebuilt our crown after the last freeze cracked it. Looks brand new and they sealed the bricks too." },
  { name: "Alicia M.", city: "Dayton", rating: 5, source: "Yelp", text: "Got a thorough inspection of our pellet stove venting. Caught a loose joint that could've been a CO issue. Heroes." },
  { name: "Joshua R.", city: "Centerville", rating: 5, source: "Google", text: "Quick response after a chimney fire scare. They inspected, found minor creosote damage, swept and re-certified." },
  { name: "Renee D.", city: "Huber Heights", rating: 5, source: "Google", text: "Two-story brick chimney waterproofed and tuckpointed. No more efflorescence stains. Crew was great." },
  { name: "Wayne S.", city: "Miamisburg", rating: 5, source: "Facebook", text: "We were quoted $9k by a competitor for a 'full rebuild'. ChimCrew showed me it was a $1,400 crown repair. Saved my year." },
  { name: "Tonya G.", city: "Fairborn", rating: 5, source: "Google", text: "Punctual, courteous, and explained the report in plain English. We'll be lifetime customers." },
  { name: "Mason E.", city: "Vandalia", rating: 5, source: "Google", text: "Insurance required a Level 2 inspection after a kitchen fire. ChimCrew turned the certified report in 48 hours." },
  { name: "Heather V.", city: "Tipp City", rating: 5, source: "Angi", text: "From quote to finished crown rebuild in 9 days. Communication was 10/10." },
  { name: "Caleb J.", city: "Troy", rating: 5, source: "Google", text: "Friendly crew, fair price, real photos of the job. What more do you want from a contractor?" },
  { name: "Ingrid B.", city: "Sidney", rating: 5, source: "Google", text: "We're rural and most chimney companies wouldn't drive out. ChimCrew did, on time, no upcharge." },
  { name: "Rashid H.", city: "Columbus", rating: 5, source: "Google", text: "Smokeshelf was packed with 20 years of debris. They got it all out and the fireplace draws like new." },
  { name: "Cynthia O.", city: "Worthington", rating: 5, source: "Yelp", text: "Old brick fireplace got a full facelift — paint-friendly tuckpointing and a new firebox panel. Beautiful." },
  { name: "Brett A.", city: "Hilliard", rating: 5, source: "Google", text: "These guys saved Christmas. Diagnosed and fixed a downdraft issue the day before guests arrived." },
  { name: "Monique S.", city: "Dublin", rating: 5, source: "Google", text: "I asked a hundred questions, the tech answered every one without rushing. That alone earned the 5 stars." },
  { name: "Hector L.", city: "Westerville", rating: 5, source: "Angi", text: "Stainless liner install for a high-efficiency furnace — passed inspection first try. Pros." },
  { name: "Allison D.", city: "Reynoldsburg", rating: 5, source: "Google", text: "I love that the truck looks like a fire engine. The crew matches the energy — professional and fun." },
  { name: "Pete W.", city: "Whitehall", rating: 5, source: "Facebook", text: "Was quoted $6k somewhere else, ChimCrew did it for $2,800 with a written warranty. No-brainer." },
  { name: "Sofia R.", city: "Grandview Heights", rating: 5, source: "Google", text: "100-year-old chimney got a careful, period-correct repair. They actually researched the brick to match." },
  { name: "Damian C.", city: "Clintonville", rating: 5, source: "Google", text: "Booked online at 11pm, got a text confirmation in the morning, swept the same week. Smooth operation." },
  { name: "Whitney M.", city: "German Village", rating: 5, source: "Yelp", text: "They respect old homes. No upselling, no scare tactics — just real chimney work in a historic district." },
  { name: "Connor P.", city: "Cincinnati", rating: 5, source: "Google", text: "Hyde Park condo board hired ChimCrew for 8 stacks. All done in 3 days. Every owner happy." },
  { name: "Aubrey T.", city: "Oakley", rating: 5, source: "Google", text: "Best chimney sweep we've had in 12 years of homeownership. Clean, fast, and they educate you as they go." },
  { name: "Liam B.", city: "Norwood", rating: 5, source: "Angi", text: "Gas log set installation and chimney cleaning combined — one trip, fair flat-rate, beautiful work." },
  { name: "Natalia F.", city: "Dayton", rating: 5, source: "Google", text: "Fast response after a winter storm dropped a branch on our cap. Replaced next day with an upgraded version." },
  { name: "Quentin H.", city: "Beavercreek", rating: 5, source: "Facebook", text: "ChimCrew's crew posed for a photo with my kid in front of the truck. Made his day. Also fixed our chimney." },
  { name: "Bridget L.", city: "Kettering", rating: 5, source: "Google", text: "Detailed inspection caught a damaged smoke chamber. The parging job they did is bulletproof." },
  { name: "Theo M.", city: "Springfield", rating: 5, source: "Google", text: "Affordable, transparent, and skilled. I had 4 quotes and ChimCrew was the only one who actually got on the roof." },
  { name: "Janelle K.", city: "Xenia", rating: 5, source: "Google", text: "Booked the annual plan. Worth every penny — they track everything and just show up when needed." },
];

const SOURCES = [
  { name: "Google", label: "5-Star Rated" },
  { name: "Yelp", label: "5-Star Rated" },
  { name: "Angi", label: "5-Star Rated" },
  { name: "Facebook", label: "5-Star Rated" },
];

function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews · Ohio Homeowners"
        title={<>Chimney Service Reviews — What Ohio <span className="text-flame">Homeowners</span> Say</>}
        mobileBgImage={mobileHeroPhoto}
      >
          <div className="mt-6 flex items-center gap-4">
            <div className="flex text-flame">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
            </div>
            <p className="font-mono text-sm text-primary-foreground/75">
              5-star rated across Google, Yelp, Angi & Facebook
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-none border-2 border-white/15 bg-white/5 px-4 py-3 backdrop-blur">
              <Star className="h-6 w-6 fill-current text-flame" />
              <div>
                <p className="font-display text-sm uppercase tracking-wider">5-Star Rated</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/65">Across every platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-none border-2 border-white/15 bg-white/5 px-4 py-3 backdrop-blur">
              <MapPin className="h-6 w-6 text-flame" />
              <div>
                <p className="font-display text-sm uppercase tracking-wider">Locally Owned</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/65">Ohio family business</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-none border-2 border-white/15 bg-white/5 px-4 py-3 backdrop-blur">
              <ShieldCheck className="h-6 w-6 text-flame" />
              <div>
                <p className="font-display text-sm uppercase tracking-wider">Licensed & Insured</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/65">Bonded · CSIA certified</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SOURCES.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-none border border-white/15 bg-white/5 px-4 py-3 backdrop-blur">
                <span className="font-display text-sm uppercase tracking-wider">{s.name}</span>
                <span className="flex items-center gap-2 font-mono text-xs text-primary-foreground/65">
                  <span className="flex text-flame">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </span>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="relative flex flex-col rounded-none border-2 border-border bg-card p-6">
              <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/15" />
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="flex items-center gap-1 rounded-none border border-border bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <BadgeCheck className="h-3 w-3 text-flame" /> {r.source}
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-sm text-foreground/90">"{r.text}"</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {r.name} · {r.city}, OH
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

    </>
  );
}
