import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BLOG_POSTS } from "@/data/blog-posts";

const BASE_URL = "https://chimcrew.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths: { path: string; changefreq: string; priority: string }[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/before-after", changefreq: "monthly", priority: "0.8" },
          { path: "/gallery", changefreq: "weekly", priority: "0.8" },
          { path: "/reviews", changefreq: "weekly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.9" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/legal/privacy", changefreq: "yearly", priority: "0.2" },
          { path: "/legal/terms", changefreq: "yearly", priority: "0.2" },
          { path: "/legal/disclaimer", changefreq: "yearly", priority: "0.2" },
          { path: "/legal/accessibility", changefreq: "yearly", priority: "0.2" },
        ];
        const blogUrls = BLOG_POSTS.map((p) => ({
          path: `/blog/${p.slug}`,
          changefreq: "monthly",
          priority: "0.7",
          lastmod: p.dateISO,
        }));
        const urls = [...staticPaths, ...blogUrls]
          .map((e) => {
            const lastmod = "lastmod" in e && e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : "";
            return `  <url><loc>${BASE_URL}${e.path}</loc>${lastmod}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`;
          })
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
