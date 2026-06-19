import { useEffect, useState } from "react";
import { X, Phone, Check, ArrowRight, ShieldCheck, Clock, Star, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/lead-submit";

const STORAGE_KEY = "chimcrew_popup_seen_v1";
const DELAY_MS = 90_000;

export function TimedLeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Chimney Sweep" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const trigger = () => {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    };
    const t = window.setTimeout(trigger, DELAY_MS);
    // Desktop exit-intent: mouse leaves the top of the viewport.
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.innerWidth >= 768) trigger();
    };
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;
    setSubmitting(true);
    try {
      await submitLead({
        source: "Exit popup (40s)",
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: form.service,
      });
      setSubmitting(false);
      setDone(true);
      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag_report_lead?: () => void; gtag_report_conversion?: () => void };
        try { (w.gtag_report_lead ?? w.gtag_report_conversion)?.(); } catch { /* ignore */ }
      }
    } catch {
      setSubmitting(false);
      toast.error("Something went wrong. Please call us instead.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-[oklch(0_0_0/0.6)] backdrop-blur-sm"
      />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-none bg-background text-foreground shadow-[0_40px_120px_-10px_oklch(0_0_0/0.55)] animate-scale-in">
        {/* Close button — large, high-contrast, easy to tap on mobile */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-lg transition active:scale-95 hover:bg-foreground/90"
        >
          <X className="h-6 w-6" strokeWidth={3} />
        </button>

        <div className="relative px-6 pt-8 pb-7 sm:px-8">
          {done ? (
            <div className="py-6 text-center">
              <div className="relative mx-auto h-20 w-20">
                <span className="absolute inset-0 animate-ping rounded-full bg-flame/30" />
                <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-flame to-[oklch(0.62_0.2_55)] shadow-[0_18px_40px_oklch(0.78_0.19_92/0.45)]">
                  <Check className="h-9 w-9 text-primary" strokeWidth={3} />
                </div>
              </div>
              <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-foreground">
                You're on the list.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A real human from the crew will call{" "}
                <span className="font-semibold text-foreground">{form.phone}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-none bg-foreground px-6 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-background transition hover:opacity-90"
              >
                Got it
              </button>
            </div>
          ) : (
            <>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
                <BadgeCheck className="h-3.5 w-3.5" />
                Columbus, Ohio
              </div>

              <h2
                id="popup-title"
                className="mt-4 font-display text-[1.7rem] font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-3xl"
              >
                Free chimney inspection — no obligation.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Leave your details and we'll email your appointment confirmation within 10 minutes.
              </p>

              {/* Trust strip */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { icon: Clock, label: "Same-day" },
                  { icon: ShieldCheck, label: "Insured" },
                  { icon: Star, label: "5-star" },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-1.5 rounded-none bg-foreground/5 px-2.5 py-2 text-[11px] font-medium text-foreground/80"
                  >
                    <t.icon className="h-3.5 w-3.5 text-foreground" />
                    {t.label}
                  </div>
                ))}
              </div>

              <form onSubmit={submit} className="mt-5 grid gap-3">
                <Field
                  label="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Jane Smith"
                  autoFocus
                />
                <Field
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder="(614) 683-5763"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@example.com"
                />
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
                    Service
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full appearance-none rounded-none border border-foreground/15 bg-background p-3 text-sm text-foreground outline-none transition focus:border-foreground/60"
                  >
                    {["Chimney Sweep","Inspection","Cap or Crown Repair","Liner Install","Animal Removal","Not sure yet"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!form.name || !form.phone || !form.email || submitting}
                  className="group relative mt-1 flex h-14 items-center justify-center gap-2 overflow-hidden rounded-none bg-foreground px-5 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Get my free callback
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <a
                  href="tel:+16146835763"
                  className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
                >
                  <Phone className="h-3.5 w-3.5" /> Or call (614) 683-5763
                </a>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", autoFocus,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; autoFocus?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-none border border-foreground/15 bg-background p-3 text-base text-foreground outline-none transition placeholder:text-foreground/30 focus:border-foreground/60"
      />
    </div>
  );
}