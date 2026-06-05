import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, CheckCircle2 } from "lucide-react";
import logo from "@/assets/chimcrew-logo.png";
import van from "@/assets/chimcrew-van.png";
import { SERVICES } from "@/data/services";
import { SERVICE_CITIES } from "@/components/ServiceAreaSeo";
export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t-2 border-primary/40 bg-gradient-to-b from-background to-secondary text-foreground">
      <div className="stripe-warning h-1.5 w-full opacity-80" />

      {/* Local commitment band featuring the wrapped service van */}
      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,_oklch(0.22_0.02_250)_0%,_oklch(0.10_0.02_250)_70%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-[1.1fr_1fr] md:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-flame">
              <MapPin className="h-3 w-3" /> Your local Ohio chimney crew
            </p>
            <h3 className="mt-4 font-display text-3xl uppercase tracking-wider md:text-4xl">
              Look for the <span className="text-flame">ChimCrew</span> van in your neighborhood.
            </h3>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "Local Ohio family business",
                "Same-day local dispatch",
                "Licensed in Ohio · Fully insured",
                "Trusted by 1,836 local homes",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2 text-sm font-semibold text-primary-foreground/90">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-flame" /> {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-sm border-2 border-flame/40 shadow-flame">
            <img src={van} alt="ChimCrew service van parked locally in Ohio" className="block w-full" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1.1fr_1fr_1fr]">
          <div>
            <img src={logo} alt="ChimCrew" className="h-14 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Locally owned chimney sweeps serving Columbus, Cincinnati, and Dayton.
              Certified, insured, and obsessed with clean flues.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-sm border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-sm border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary">All Services</Link></li>
              <li><Link to="/before-after" className="hover:text-primary">Before / After</Link></li>
              <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-primary">Reviews</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary">Services</h4>
            <ul className="mt-4 grid grid-cols-1 gap-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-primary">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary">Service Areas</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICE_CITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/service-area/$city"
                    params={{ city: c.slug }}
                    className="hover:text-primary"
                  >
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 font-display text-sm uppercase tracking-widest text-primary">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/legal/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
              <li><Link to="/legal/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
              <li><Link to="/legal/accessibility" className="hover:text-primary">Accessibility</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <a href="tel:6146834422" className="hover:text-primary">(614) 683-4422</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <a href="mailto:hello@chimcrew.com" className="hover:text-primary">hello@chimcrew.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>Columbus · Dayton · Cincinnati · Cleveland · Pittsburgh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ChimCrew Chimney Services. All rights reserved.</p>
          <p className="font-mono">CSIA Certified · Fully Insured · OH License #CHM-OH-0421</p>
        </div>
      </div>
    </footer>
  );
}
