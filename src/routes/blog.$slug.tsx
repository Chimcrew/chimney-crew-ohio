import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Clock, ArrowLeft, Phone } from "lucide-react";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog-posts";
import { LeadForm } from "@/components/LeadForm";

const SITE = "https://chimcrew.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article not found — ChimCrew" }] };
    const url = `${SITE}/blog/${params.slug}`;
    return {
      meta: [
        { title: `${post.title} | ChimCrew Ohio` },
        { name: "description", content: post.excerpt },
        { name: "author", content: post.author },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: `${SITE}${post.cover}` },
        { property: "article:published_time", content: post.dateISO },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: `${SITE}${post.cover}` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: [`${SITE}${post.cover}`],
            datePublished: post.dateISO,
            dateModified: post.dateISO,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "ChimCrew",
              logo: { "@type": "ImageObject", url: `${SITE}/favicon.ico` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            articleSection: post.category,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-extrabold">Article not found</h1>
      <p className="mt-3 text-muted-foreground">
        That article isn't here. Head back to the blog.
      </p>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-flame">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="bg-background">
        {/* HEADER */}
        <header className="relative overflow-hidden border-b-2 border-primary/15 bg-card/40 py-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 md:px-8">
            <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame hover:underline">
              <ArrowLeft className="h-3 w-3" /> Field Notes
            </Link>
            <span className="mt-4 inline-flex w-fit rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              {post.category}
            </span>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
              </span>
              <span>By {post.author}</span>
            </div>
          </div>
        </header>

        {/* COVER */}
        <div className="mx-auto max-w-5xl px-4 pt-10 md:px-8">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border-2 border-border">
            <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* BODY */}
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
          <div className="space-y-10">
            {post.body.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-2xl font-extrabold leading-tight text-primary md:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-foreground/85 md:text-lg">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl border-2 border-flame/40 bg-flame/5 p-6 md:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
              ◆ Live in Columbus, Cincinnati, or Dayton?
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-primary md:text-3xl">
              Book a free inspection with a real ChimCrew tech.
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:brightness-110"
              >
                Schedule online
              </Link>
              <a
                href="tel:6146834422"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> (614) 683-4422
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-flame">
            ◆ Keep reading
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">More from the field</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col overflow-hidden rounded-2xl border-2 border-border bg-card transition hover:border-flame"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-flame">{p.category}</span>
                  <h3 className="mt-2 font-display text-base font-extrabold leading-tight">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadForm />
    </>
  );
}