import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
// lucide-react ships no Pinterest brand mark, so we inline the official glyph.
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.378-.293 1.194-.333 1.361-.052.22-.173.267-.4.161-1.492-.695-2.424-2.875-2.424-4.627 0-3.769 2.738-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373l-.745 2.841c-.269 1.038-.996 2.339-1.485 3.132C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
// Optimized WebP derivatives of the logo.
const logo = "/optimized/chimcrew-logo-384.webp";
const logoSrcSet =
  "/optimized/chimcrew-logo-192.webp 192w, /optimized/chimcrew-logo-384.webp 384w";
import { SERVICES } from "@/data/services";
import { SERVICE_CITIES } from "@/components/ServiceAreaSeo";
export function SiteFooter() {
  return (
    <footer className="relative border-t-2 border-primary/40 bg-gradient-to-b from-background to-secondary text-foreground">
      {/* Google Maps strip — real business location */}
      <div className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">// Find Us</p>
              <h3 className="mt-2 text-2xl md:text-3xl">Chimcrew - Chimney Sweep & Repair</h3>
              <p className="mt-1 text-sm text-muted-foreground">Serving Columbus, Ohio & Surrounding Areas · Open 24 hours</p>
            </div>
            <a
              href="https://maps.app.goo.gl/CdXLnGXnHRVVFnUw6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-primary px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="relative aspect-[16/6] w-full overflow-hidden border-2 border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d932374.8144472745!2d-83.76311976073052!3d39.761603089597116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x208a8b9e2ddcc519%3A0x17b40b3804b5c5b2!2sChimcrew%20-%20Chimney%20Sweep%20%26%20Repair!5e1!3m2!1sen!2sae!4v1787099033835!5m2!1sen!2sae"
              title="Google Maps location of Chimcrew - Chimney Sweep & Repair, serving Columbus, Ohio"
              width="600"
              height="450"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1.1fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              aria-label="Chimcrew - Chimney Sweep & Repair homepage"
              className="inline-block"
            >
              <img
                src={logo}
                srcSet={logoSrcSet}
                sizes="(min-width: 640px) 97px, 81px"
                alt="Chimcrew - Chimney Sweep & Repair"
                className="h-20 w-auto sm:h-24"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Locally owned chimney sweeps serving Columbus, Cincinnati, and Dayton.
              Certified, insured, and obsessed with clean flues.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/people/Chimcrew-Chimney-Sweep-Repair/61590821911485"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/chim_crew/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @chim_crew" className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/chimcrew/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.pinterest.com/chimcrew/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="grid h-10 w-10 place-items-center rounded-none border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
                <PinterestIcon className="h-4 w-4" />
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
          <p>© {new Date().getFullYear()} Chimcrew - Chimney Sweep & Repair. All rights reserved.</p>
          <p className="font-mono">CSIA Certified · Fully Insured · OH License #CHM-OH-0421</p>
        </div>
      </div>
    </footer>
  );
}
