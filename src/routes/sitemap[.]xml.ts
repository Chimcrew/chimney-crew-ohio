import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BLOG_POSTS } from "@/data/blog-posts";
import { SERVICES } from "@/data/services";
import { SERVICE_CITIES } from "@/components/ServiceAreaSeo";
import { SEO_CITIES } from "@/data/seo-cities";

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
          { path: "/schedule", changefreq: "monthly", priority: "0.8" },
          { path: "/financing", changefreq: "monthly", priority: "0.7" },
          { path: "/chimney-repair-columbus", changefreq: "monthly", priority: "0.9" },
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
        const serviceUrls = SERVICES.map((s) => ({
          path: `/services/${s.slug}`,
          changefreq: "monthly",
          priority: "0.8",
        }));
        const cityUrls = SERVICE_CITIES.map((c) => ({
          path: `/service-area/${c.slug}`,
          changefreq: "monthly",
          priority: "0.8",
        }));
        const seoCityUrls = SEO_CITIES.map((c) => ({
          path: `/chimney-repair/${c.slug}`,
          changefreq: "monthly",
          priority: "0.9",
        }));
        const urls = [...staticPaths, ...serviceUrls, ...cityUrls, ...seoCityUrls, ...blogUrls]
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
