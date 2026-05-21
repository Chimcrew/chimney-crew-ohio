import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What Ohio neighbors say about ChimCrew" },
      { name: "description", content: "Real reviews from ChimCrew customers across Columbus, Cincinnati and Dayton, Ohio." },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  { name: "Marcus T.", city: "Columbus", rating: 5, text: "Booked online Monday, swept Tuesday. Crew was sharp, the truck was wild, and the price didn't change at the door. Best service call I've had all year." },
  { name: "Priya R.", city: "Cincinnati", rating: 5, text: "Found a cracked crown on a Level 2 inspection. They sent photos, quoted flat-rate, fixed it the next week. Very honest crew." },
  { name: "Sam & Jess", city: "Dayton", rating: 5, text: "Raccoons in the flue. ChimCrew got them out humanely, installed a cap, and we haven't had a problem since." },
  { name: "Derek H.", city: "Hilliard", rating: 5, text: "Punctual, polite, and explained everything they were doing. My wife actually said 'finally a contractor who shows up'." },
  { name: "Anna K.", city: "Mason", rating: 5, text: "Got a Level 2 inspection during our home purchase. Detailed report saved us from a $4k surprise. Worth every penny." },
  { name: "Trevor W.", city: "Kettering", rating: 5, text: "Stainless liner install, done in a day. Furnace runs better, fireplace draws better. These guys know their stuff." },
  { name: "Maya L.", city: "Westerville", rating: 5, text: "Annual service plan is a no-brainer. They remember us, they remember our chimney, no chasing anyone down." },
  { name: "Carlos B.", city: "Hyde Park", rating: 5, text: "First sweep ever in this old house. Crew left it cleaner than they found it. Photos and warranty in my inbox same night." },
  { name: "Jenn O.", city: "Oakwood", rating: 5, text: "Honest pricing, no upsell theater. Just told us what we needed and what could wait. Will use again." },
];

function ReviewsPage() {
  return (
    <>
      <section className="relative border-b-2 border-primary/30 bg-card/40 py-20">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// Reviews</p>
          <h1 className="mt-3 text-6xl md:text-7xl">Neighbors <span className="text-flame">talk.</span></h1>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              4.9 average from 380+ verified reviews
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="relative flex flex-col rounded-sm border-2 border-border bg-card p-6">
              <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/15" />
              <div className="flex gap-1 text-primary">
                {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-sm text-foreground/90">"{r.text}"</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {r.name} · {r.city}, OH
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <LeadForm />
    </>
  );
}
