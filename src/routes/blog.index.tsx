import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";

const SITE = "https://chimcrew.com";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Ohio Chimney Blog — Sweep, Repair & Safety Tips | ChimCrew" },
      {
        name: "description",
        content:
          "Practical chimney advice from working sweeps in Columbus, Cincinnati, and Dayton. Creosote, liner, leak, and inspection guides — written by ChimCrew technicians.",
      },
      { name: "keywords", content: "chimney sweep Ohio, chimney repair Columbus, creosote, chimney liner, chimney inspection Cincinnati, chimney crown Dayton" },
      { property: "og:title", content: "ChimCrew Blog — Ohio Chimney Tips & Safety" },
      { property: "og:description", content: "Advice from the rooftops — written by sweeps, not marketers." },
      { property: "og:url", content: `${SITE}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "ChimCrew Field Notes",
          url: `${SITE}/blog`,
          publisher: { "@type": "Organization", name: "ChimCrew" },
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE}/blog/${p.slug}`,
            datePublished: p.dateISO,
            author: { "@type": "Person", name: p.author },
            image: `${SITE}${p.cover}`,
          })),
        }),
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-primary/20 bg-card/40 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-flame">
            ◆ Field Notes · Written by working sweeps
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            The ChimCrew <span className="text-flame">blog</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Practical chimney advice from rooftops across Columbus, Cincinnati,
            and Dayton. No fluff, no SEO filler — what we'd tell our own
            homeowners.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid gap-8 overflow-hidden rounded-2xl border-2 border-border bg-card transition hover:border-flame hover:shadow-flame md:grid-cols-2"
          >
            <div className="aspect-[16/11] overflow-hidden md:aspect-auto">
              <img
                src={featured.cover}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="inline-flex w-fit rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                Latest · {featured.category}
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {featured.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} min read
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-flame">
                Read the article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-flame">
                ◆ More from the field
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
                All articles
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {BLOG_POSTS.length} guides · updated monthly
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border-2 border-border bg-card transition hover:border-flame hover:shadow-flame"
              >
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex w-fit rounded-full border border-flame/30 bg-flame/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-flame">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-extrabold leading-tight">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-flame">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {p.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {p.readMinutes} min
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}