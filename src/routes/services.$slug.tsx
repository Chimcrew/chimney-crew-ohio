import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService, SERVICES } from "@/data/services";
import { ServiceDetailPage, NotFoundService } from "@/components/ServiceDetailPage";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getService(loaderData.slug) : undefined;
    if (!s) {
      return {
        meta: [
          { title: "Service — ChimCrew" },
          { name: "description", content: "Chimney services in Ohio." },
        ],
      };
    }
    const title = `${s.title} — ChimCrew Ohio`;
    return {
      meta: [
        { title },
        { name: "description", content: s.metaDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: s.metaDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: s.metaDescription },
      ],
    };
  },
  notFoundComponent: NotFoundService,
  errorComponent: ({ error, reset }) => (
    <section className="py-24 text-center">
      <h1 className="text-5xl">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-8 inline-flex items-center gap-2 rounded-sm border-2 border-primary px-6 py-3 font-display text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        Try again
      </button>
    </section>
  ),
  component: ServiceDetailRoute,
});

function ServiceDetailRoute() {
  const { slug } = Route.useLoaderData();
  const service = getService(slug);
  if (!service) return <NotFoundService />;
  return <ServiceDetailPage service={service} />;
}

// Touch SERVICES so tree-shaking keeps the data in dev preview tooling.
void SERVICES;