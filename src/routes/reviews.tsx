import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote, ShieldCheck, MapPin, BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What Ohio homeowners say about ChimCrew" },
      { name: "description", content: "Reviews from ChimCrew customers across Columbus, Cincinnati and Dayton, Ohio." },
      { property: "og:title", content: "ChimCrew Reviews — Ohio Homeowners" },
      { property: "og:description", content: "Real reviews from real customers across Columbus, Cincinnati and Dayton." },
      { property: "og:url", content: "https://chimcrew.com/reviews" },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/reviews" }],
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
      <section className="relative border-b-2 border-primary/30 bg-card/40 py-20">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// Reviews</p>
          <h1 className="mt-3 text-6xl md:text-7xl">Homeowners <span className="text-flame">talk.</span></h1>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              5-star rated across Google, Yelp, Angi & Facebook
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-sm border-2 border-primary/40 bg-background/70 px-4 py-3">
              <Star className="h-6 w-6 fill-current text-primary" />
              <div>
                <p className="font-display text-sm uppercase tracking-wider">5-Star Rated</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Across every platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-sm border-2 border-primary/40 bg-background/70 px-4 py-3">
              <MapPin className="h-6 w-6 text-flame" />
              <div>
                <p className="font-display text-sm uppercase tracking-wider">Locally Owned</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Ohio family business</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-sm border-2 border-primary/40 bg-background/70 px-4 py-3">
              <ShieldCheck className="h-6 w-6 text-flame" />
              <div>
                <p className="font-display text-sm uppercase tracking-wider">Licensed & Insured</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Bonded · CSIA certified</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SOURCES.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-sm border border-border bg-card/60 px-4 py-3">
                <span className="font-display text-sm uppercase tracking-wider">{s.name}</span>
                <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span className="flex text-primary">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </span>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="relative flex flex-col rounded-sm border-2 border-border bg-card p-6">
              <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/15" />
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="flex items-center gap-1 rounded-sm border border-border bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
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
