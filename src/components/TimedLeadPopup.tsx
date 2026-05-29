import { useEffect, useState } from "react";
import { Flame, X, Phone, Check, ArrowRight } from "lucide-react";

const STORAGE_KEY = "chimcrew_popup_seen_v1";
const DELAY_MS = 40_000;

export function TimedLeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "Chimney Sweep" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, DELAY_MS);
    return () => window.clearTimeout(t);
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

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitting(true);
    void fetch("/api/public/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "Exit popup (40s)",
        name: form.name,
        phone: form.phone,
        service: form.service,
      }),
    }).catch(() => {});
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 600);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-sm border-2 border-primary/50 bg-card shadow-[0_30px_80px_-10px_oklch(0.7_0.22_45/0.4)] animate-scale-in">
        {/* Animated ember gradient ribbon */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.7 0.22 45) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.18 25) 0%, transparent 70%)" }}
        />

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/60 text-muted-foreground backdrop-blur transition hover:border-primary hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-7 pt-9 pb-7 sm:px-9 sm:pt-10">
          {done ? (
            <div className="py-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15">
                <Flame className="h-8 w-8 animate-flicker text-flame" />
              </div>
              <h3 className="mt-5 font-display text-3xl tracking-tight">You're on the list.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A real human from the crew will call <span className="text-foreground">{form.phone}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-display text-xs uppercase tracking-widest text-primary-foreground transition hover:brightness-110"
              >
                Got it
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  <Flame className="h-3 w-3 animate-flicker" /> Limited slots this week
                </span>
              </div>

              <h2 id="popup-title" className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                Still here? Grab a <span className="text-flame">free quote</span> while we're booking.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Drop your number — our Ohio crew calls back within the hour during business hours. No spam, ever.
              </p>

              <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-muted-foreground">
                {["Same-day callback", "Flat-rate pricing", "CSIA-certified", "Fully insured"].map((b) => (
                  <li key={b} className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-primary" /> {b}
                  </li>
                ))}
              </ul>

              <form onSubmit={submit} className="mt-6 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="Jane Smith"
                    autoFocus
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="(614) 555-0123"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Service
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-sm border-2 border-border bg-background p-3 text-sm outline-none transition focus:border-primary"
                  >
                    {["Chimney Sweep", "Inspection", "Cap or Crown Repair", "Liner Install", "Animal Removal", "Not sure yet"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!form.name || !form.phone || submitting}
                  className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3.5 font-display text-sm uppercase tracking-widest text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Sending…" : (<>Claim my callback <ArrowRight className="h-4 w-4" /></>)}
                </button>

                <a
                  href="tel:+16145550123"
                  className="flex items-center justify-center gap-2 text-xs text-muted-foreground transition hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5" /> Or call us directly
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
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-sm border-2 border-border bg-background p-3 text-sm outline-none transition focus:border-primary"
      />
    </div>
  );
}