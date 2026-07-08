import { AlertTriangle, CheckCircle2, ClipboardCheck, ShieldCheck, MapPin } from "lucide-react";
import { heroImageFor, warrantyFor, type ServiceSpec } from "@/data/services";
import techRooftopAsset from "@/assets/team/chimcrew-techs-rooftop.png.asset.json";
import inspectionRoofAsset from "@/assets/team/chimcrew-inspection-roof.png.asset.json";
import fireplaceServiceAsset from "@/assets/team/chimcrew-fireplace-service.png.asset.json";
import sweepCloseupAsset from "@/assets/team/chimcrew-sweep-closeup.png.asset.json";
import teamTruckAsset from "@/assets/team/chimcrew-team-truck.png.asset.json";
import gj3 from "@/assets/gallery-jobs/gj3.jpeg.asset.json";
import gj6 from "@/assets/gallery-jobs/gj6.jpeg.asset.json";
import gj8 from "@/assets/gallery-jobs/gj8.jpeg.asset.json";
import gj10 from "@/assets/gallery-jobs/gj10.jpeg.asset.json";
import gj12 from "@/assets/gallery-jobs/gj12.jpeg.asset.json";
import gj15 from "@/assets/gallery-jobs/gj15.jpeg.asset.json";
import gj17 from "@/assets/gallery-jobs/gj17.jpeg.asset.json";
import gj19 from "@/assets/gallery-jobs/gj19.jpeg.asset.json";
import capInstallProcessAsset from "@/assets/uploads/cap-install-process.jpeg.asset.json";

/** Pick a secondary photo relevant to the service. Falls back to a generic
 *  ChimCrew crew shot when nothing more specific is a good match. */
function secondaryImageFor(slug: string): string {
  switch (slug) {
    case "chimney-sweep":
      return sweepCloseupAsset.url;
    case "level-1-inspection":
    case "level-2-inspection":
      return inspectionRoofAsset.url;
    case "crown-tuckpoint":
      return gj8.url;
    case "liner-install":
      return gj12.url;
    case "animal-removal":
      return gj17.url;
    case "cap-install":
      return capInstallProcessAsset.url;
    case "chase-cover-replacement":
      return gj15.url;
    case "waterproofing":
      return gj6.url;
    case "flashing-repair":
      return gj19.url;
    case "firebox-rebuild":
      return fireplaceServiceAsset.url;
    case "smoke-chamber-parging":
      return gj3.url;
    case "damper-repair":
      return fireplaceServiceAsset.url;
    case "gas-fireplace-service":
      return fireplaceServiceAsset.url;
    case "dryer-vent-cleaning":
      return teamTruckAsset.url;
    default:
      return techRooftopAsset.url;
  }
}

function PhotoCard({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-10 overflow-hidden rounded-none border border-border bg-card shadow-[0_20px_60px_-25px_oklch(0_0_0/0.35)]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block aspect-[16/10] w-full object-cover"
      />
      <figcaption className="flex items-center gap-2 border-t border-border bg-secondary/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70">
        <MapPin className="h-3 w-3 text-flame" /> {caption}
      </figcaption>
    </figure>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[16px] leading-relaxed text-foreground/85 md:text-[17px]">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85 md:text-[16px]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceArticle({ service }: { service: ServiceSpec }) {
  const s = service.shortTitle;
  const sLower = s.toLowerCase();
  const primaryPhoto = heroImageFor(service);
  const secondaryPhoto = secondaryImageFor(service.slug);

  // Generate content from existing service data — no hardcoding per slug.
  const dangers = service.problems ?? [
    `Small ${sLower} issues quietly turning into structural damage`,
    `Water intrusion, drafts, and smoke problems that get worse each season`,
    `Failed safety systems that put your home and family at risk`,
  ];

  const solutionsList = service.bullets;

  const indicators = service.signs;

  const processSteps = service.process.map((p) => `${p.title} — ${p.desc}`);

  const whyUs =
    service.benefits ?? [
      "Clear, up-front pricing before we start any work",
      "Family-owned Ohio crew that communicates from arrival to sign-off",
      "Photo report of every step delivered to your inbox the same day",
      "Skilled, background-checked technicians with years of positive reviews",
    ];

  const tools = [
    "Manufacturer-approved refractory, sealants, and stainless components",
    "HEPA-contained vacuums so your living room stays clean",
    "Rooftop safety gear and drone-assisted inspection where it helps",
    "Weather-rated materials built for Ohio's freeze-thaw cycles",
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
          <ClipboardCheck className="h-3.5 w-3.5 text-flame" /> {service.hero.eyebrow}
        </p>

        <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl lg:text-5xl">
          Expert {service.title} — ChimCrew Ohio
        </h2>
        <P>
          Technicians at ChimCrew understand how much homeowners value their homes. Your chimney
          doesn't just complete the look of your house — it protects your family's safety. That's
          why we've tailored our {sLower} service to fix problems at the source and give our
          customers peace of mind. Whether you need a routine visit or a full restoration,
          ChimCrew is here for you across Columbus, Dayton, and Cincinnati.
        </P>

        <PhotoCard
          src={primaryPhoto}
          alt={`ChimCrew technician performing ${sLower} on an Ohio home`}
          caption={`ChimCrew · ${s} · Real Ohio job`}
        />

        <H2>Why {s} Is Important</H2>
        <P>
          Unmanaged chimney issues rarely stay small — they turn into dangerous, expensive
          problems. Our technicians urge homeowners not to delay {sLower} to avoid:
        </P>
        <BulletList items={dangers} />
        <P>
          With ChimCrew, you get long-lasting, professional {sLower} that comes with a
          customized approach. Our services include:
        </P>
        <BulletList items={solutionsList} />

        <H2>Important Indicators That You Need {s}</H2>
        <P>
          The following are the signs it's time to call ChimCrew for {sLower}:
        </P>
        <BulletList items={indicators} />
        <P>
          These repairs should happen before small chimney issues develop into catastrophes like
          fire hazards, smoke leaks, or structural instability. Our technicians are always on
          standby, ready to help with timely repairs and continuous inspections. Acting early
          minimizes damage, upholds chimney performance, and extends your chimney's lifespan.
        </P>

        <PhotoCard
          src={secondaryPhoto}
          alt={`ChimCrew ${sLower} — up close on the job`}
          caption={`On the job · Columbus · Dayton · Cincinnati`}
        />

        <H2>ChimCrew's {s} Process</H2>
        <P>
          We carry out every {sLower} through a customized, professional, and thorough approach.
          A typical visit includes:
        </P>
        <BulletList items={processSteps} />
        <P>
          Each step is carried out by experienced technicians who are fluent in restoring your
          chimney's original functionality — and documenting every stage with photos.
        </P>

        <H2>Why Homeowners Prefer ChimCrew for {s}</H2>
        <P>
          Homeowners prefer ChimCrew because we combine personalized customer care, advanced
          diagnostic tools, and skilled craftsmanship to provide a quick but long-lasting fix.
          We're also considered among the best because of our ability to:
        </P>
        <BulletList items={whyUs} />

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-none border border-border bg-secondary/40 px-5 py-4">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <ShieldCheck className="h-4 w-4 text-flame" /> {warrantyFor(service)}
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <CheckCircle2 className="h-4 w-4 text-flame" /> CSIA-certified
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            <AlertTriangle className="h-4 w-4 text-flame" /> Same-day callback
          </span>
        </div>

        <H2>Book Your {s} Today</H2>
        <P>
          When it comes to delivering quality to clients, ChimCrew does not cut corners. We
          ensure every task is completed with precision. Important tools and materials we use
          include:
        </P>
        <BulletList items={tools} />
        <P>
          If you're a homeowner across Columbus, Dayton, or Cincinnati and you're experiencing
          any of the chimney issues above, contact ChimCrew today. Our customer care team will be
          happy to book you in, provide a clear price quote, and connect you with our expert
          technicians.
        </P>
      </div>
    </section>
  );
}