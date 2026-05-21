import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowRight } from "lucide-react";
import sweep from "@/assets/sweep-rooftop.jpg";
import fireplace from "@/assets/fireplace-cozy.jpg";
import after from "@/assets/after-chimney.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Chimney Tips & Safety | ChimCrew Ohio" },
      { name: "description", content: "Chimney maintenance tips, safety guides, and seasonal advice from ChimCrew — Ohio's local chimney sweep crew." },
      { property: "og:title", content: "ChimCrew Blog — Chimney Tips & Safety" },
      { property: "og:description", content: "Practical advice from working sweeps in Columbus, Cincinnati and Dayton." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  {
    title: "How often should you sweep your chimney in Ohio?",
    excerpt: "Burning seasoned hardwood twice a week? Here's our honest answer on inspection cadence.",
    date: "May 12, 2026",
    cover: sweep,
    slug: "#",
  },
  {
    title: "Creosote 101: the three stages and why Stage 3 is scary",
    excerpt: "What that black, glossy build-up actually is — and why it's the #1 cause of chimney fires.",
    date: "Apr 28, 2026",
    cover: after,
    slug: "#",
  },
  {
    title: "Gas fireplace humming? Cracked liner symptoms to watch for",
    excerpt: "Five subtle signs your flue is failing before the carbon monoxide alarm proves it.",
    date: "Apr 09, 2026",
    cover: fireplace,
    slug: "#",
  },
];

function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">Field notes</p>
      <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)]">The ChimCrew blog.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Real advice from the rooftops — written by sweeps, not marketers.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="group flex flex-col overflow-hidden rounded-sm border-2 border-border bg-card transition hover:border-primary hover:shadow-flame">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {p.date}
              </div>
              <h2 className="mt-3 font-display text-xl leading-tight">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-primary">
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}