import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AmbientEmbers } from "@/components/ChimneyDecor";
import { ScheduleWidget } from "@/components/ScheduleWidget";
import { TimedLeadPopup } from "@/components/TimedLeadPopup";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ChimCrew — Ohio Chimney Sweep & Repair" },
      { name: "description", content: "Locally owned Ohio chimney sweeps. CSIA-certified, flat-rate pricing, same-day callbacks." },
      { name: "author", content: "ChimCrew" },
      { property: "og:title", content: "ChimCrew — Ohio Chimney Sweep & Repair" },
      { property: "og:description", content: "Locally owned Ohio chimney sweeps. CSIA-certified, flat-rate pricing, same-day callbacks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "ChimCrew — Ohio Chimney Sweep & Repair" },
      { name: "twitter:description", content: "Locally owned Ohio chimney sweeps. CSIA-certified, flat-rate pricing, same-day callbacks." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6159d1b7-3552-4ec5-824c-865163694f19/id-preview-47a8de52--49851b74-ff19-4902-878c-836b03624bf9.lovable.app-1779390819801.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6159d1b7-3552-4ec5-824c-865163694f19/id-preview-47a8de52--49851b74-ff19-4902-878c-836b03624bf9.lovable.app-1779390819801.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bungee&family=Geist:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "any",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/icon-192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/icon-512.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://chimcrew.com/#business",
          name: "ChimCrew",
          description:
            "Locally owned chimney sweep, repair, and inspection company serving Columbus, Cincinnati, and Dayton, Ohio. CSIA-certified technicians.",
          url: "https://chimcrew.com",
          telephone: "+1-614-549-1954",
          priceRange: "$$",
          image: "https://chimcrew.com/og-cover.jpg",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Columbus",
            addressRegion: "OH",
            addressCountry: "US",
          },
          areaServed: [
            { "@type": "City", name: "Columbus" },
            { "@type": "City", name: "Cincinnati" },
            { "@type": "City", name: "Dayton" },
            { "@type": "City", name: "Cleveland" },
            { "@type": "City", name: "Dublin" },
            { "@type": "City", name: "Hilliard" },
            { "@type": "City", name: "Westerville" },
            { "@type": "City", name: "Powell" },
            { "@type": "City", name: "Grove City" },
            { "@type": "City", name: "Worthington" },
          ],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
              opens: "08:00",
              closes: "18:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "180",
          },
          sameAs: ["https://chimcrew.com"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QY2H753BK9"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18189794318"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-QY2H753BK9'); gtag('config', 'AW-18189794318');` }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <AmbientEmbers />
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <ScheduleWidget />
        <TimedLeadPopup />
        <StickyMobileCta />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
