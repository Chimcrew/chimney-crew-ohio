import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import logoAsset from "@/assets/chimcrew-logo-transparent-v2.png.asset.json";
const logo = logoAsset.url;
import { SERVICES } from "@/data/services";
import { SERVICE_CITIES } from "@/components/ServiceAreaSeo";
export function SiteFooter() {
  return (
    <footer className="relative border-t-2 border-primary/40 bg-gradient-to-b from-background to-secondary text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1.1fr_1fr_1fr]">
          <div>
            <img src={logo} alt="ChimCrew" className="h-14 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Locally owned chimney sweeps serving Columbus, Cincinnati, and Dayton.
              Certified, insured, and obsessed with clean flues.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/chim_crew/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @chim_crew" className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary">All Services</Link></li>
              <li><Link to="/before-after" className="hover:text-primary">Done Projects</Link></li>
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
                <a href="tel:6146835763" className="hover:text-primary">(614) 683-5763</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <a href="mailto:office@chimcrew.com" className="hover:text-primary">office@chimcrew.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>Columbus · Dayton · Cincinnati · Cleveland</span>
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
