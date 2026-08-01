import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { reportCallConversion } from "@/lib/track";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
// ScheduleWidget popup removed — scheduling lives on /schedule.
// TimedLeadPopup removed — no pop-ups per product direction.
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
            className="inline-flex items-center justify-center rounded-none bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
            className="inline-flex items-center justify-center rounded-none bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-none border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ChimCrew — Ohio Chimney Sweep & Repair" },
      { name: "twitter:description", content: "Locally owned Ohio chimney sweeps. CSIA-certified, flat-rate pricing, same-day callbacks." },
      { property: "og:image", content: "https://chimcrew.com/og-cover.jpg" },
      { name: "twitter:image", content: "https://chimcrew.com/og-cover.jpg" },
      { property: "og:site_name", content: "ChimCrew" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bungee&family=Geist:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@400;500;600;700;800&family=Oswald:wght@400;500;600;700&display=swap",
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
          telephone: "+1-614-683-5763",
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
        <script dangerouslySetInnerHTML={{ __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:6728722,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv='); window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-QY2H753BK9'); gtag('config', 'AW-18189794318'); /* Generic conversion (kept for backwards compatibility). */ function gtag_report_conversion(url){var callback=function(){if(typeof(url)!='undefined'){window.location=url;}}; gtag('event','conversion',{'send_to':'AW-18189794318/GGRvCO3rmLwcEI74yOFD','event_callback':callback}); return false;} /* Dedicated phone-call conversion. Replace send_to with a Call-specific label in Google Ads when one exists. */ function gtag_report_call(){gtag('event','conversion',{'send_to':'AW-18189794318/GGRvCO3rmLwcEI74yOFD'}); return false;} /* Dedicated lead-form conversion. Replace send_to with a Form-specific label in Google Ads when one exists. */ function gtag_report_lead(){gtag('event','conversion',{'send_to':'AW-18189794318/GGRvCO3rmLwcEI74yOFD'}); return false;}` }} />
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Dedicated landing pages (/lp/*) render their own header/footer/CTAs.
  // Hide the main site chrome so paid traffic has zero exit links.
  const isLanding = pathname.startsWith("/lp/");

  // Track every click-to-call as a Google Ads conversion.
  // Without this, phone-call campaigns appear to deliver 0 leads
  // even when calls are actually happening.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const a = t?.closest?.("a[href^='tel:']") as HTMLAnchorElement | null;
      if (a) reportCallConversion();
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        {!isLanding && <SiteHeader />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isLanding && <SiteFooter />}
        {!isLanding && <StickyMobileCta />}
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
