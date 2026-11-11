import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock, CalendarCheck, ShieldCheck, Flame, MessageSquare, Star, Facebook, Instagram, Linkedin } from "lucide-react";
import { ScheduleInline } from "@/components/ScheduleWidget";
// lucide-react ships no Pinterest brand mark, so we inline the official glyph.
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.378-.293 1.194-.333 1.361-.052.22-.173.267-.4.161-1.492-.695-2.424-2.875-2.424-4.627 0-3.769 2.738-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373l-.745 2.841c-.269 1.038-.996 2.339-1.485 3.132C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
import { TrustBadges } from "@/components/TrustBadges";
import { PageHero } from "@/components/PageHero";
import mobileHeroPhoto from "@/assets/hero/hero-mobile-team-chimney.png.asset.json";
import desktopHeroPhoto from "@/assets/hero/hero-desktop-team-chimney.png.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Chimcrew - Chimney Sweep & Repair — Chimney Sweep Columbus, Cincinnati, Dayton" },
      { name: "description", content: "Call, email, or request a quote from Chimcrew - Chimney Sweep & Repair. Local chimney sweeps serving Columbus, Cincinnati, and Dayton, OH." },
      { property: "og:title", content: "Contact Chimcrew - Chimney Sweep & Repair" },
      { property: "og:description", content: "Reach Ohio's fired-up chimney crew. Same-day callbacks." },
      { property: "og:url", content: "https://chimcrew.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Same-day callback · Ohio crew"
        title={<>Talk to an <span className="text-flame">Ohio chimney crew</span>.</>}
        subtitle="Pick the easiest way to reach us. We answer fast, quote in writing, and never sell what you don't need."
        mobileBgImage={mobileHeroPhoto}
        desktopBgImage={desktopHeroPhoto}
      >
          {/* Quick-reach tiles */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href="tel:6146835763"
              className="group flex items-center gap-3 rounded-none border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-flame/50 hover:bg-white/10"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-none bg-flame text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">Call</p>
                <p className="truncate font-display text-base font-bold">(614) 683-5763</p>
              </div>
            </a>
            <a
              href="sms:6146835763"
              className="group flex items-center gap-3 rounded-none border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-flame/50 hover:bg-white/10"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-none bg-flame text-primary">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">Text</p>
                <p className="truncate font-display text-base font-bold">Reply in &lt; 15 min</p>
              </div>
            </a>
            <a
              href="mailto:office@chimcrew.com"
              className="group flex items-center gap-3 rounded-none border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-flame/50 hover:bg-white/10"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-none bg-flame text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">Email</p>
                <p className="truncate font-display text-base font-bold">office@chimcrew.com</p>
              </div>
            </a>
          </div>
      </PageHero>

      {/* Main grid */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* Scheduler */}
          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                  Book online · Takes 60 seconds
                </p>
              </div>
            </div>
            <ScheduleInline />
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-none border border-border bg-card p-5">
              <h3 className="font-display text-sm font-black uppercase tracking-wide text-primary">
                Hours
              </h3>
              <div className="mt-3 space-y-2 text-sm text-primary/80">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-flame" /> Every day</span>
                  <span className="font-mono font-semibold">Open 24 hours</span>
                </div>
              </div>
            </div>

            <div className="rounded-none border border-border bg-card p-5">
              <h3 className="font-display text-sm font-black uppercase tracking-wide text-primary">
                Why homeowners call us
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-primary/80">
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-flame" /> CSIA-certified, fully insured</li>
                <li className="flex items-start gap-2"><CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-flame" /> Flat-rate quotes in writing</li>
                <li className="flex items-start gap-2"><Flame className="mt-0.5 h-4 w-4 shrink-0 text-flame" /> Free drone inspection w/ every quote</li>
              </ul>
            </div>

            <div className="rounded-none border border-border bg-card p-5">
              <h3 className="font-display text-sm font-black uppercase tracking-wide text-primary">
                Follow us
              </h3>
              <div className="mt-3 flex gap-3">
                <a
                  href="https://www.facebook.com/people/Chimcrew-Chimney-Sweep-Repair/61590821911485"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/chim_crew/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @chim_crew"
                  className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/chimcrew/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.pinterest.com/chimcrew/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <PinterestIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-none border border-border bg-gradient-to-br from-primary to-[oklch(0.22_0.04_250)] p-5 text-primary-foreground">
              <div className="flex items-center gap-1 text-flame">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-flame" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
                "Showed up on time, walked me through everything with their drone footage, and the price didn't budge."
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                — Megan R., Westerville
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}