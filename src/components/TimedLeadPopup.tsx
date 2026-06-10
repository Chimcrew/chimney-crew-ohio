import { useEffect, useState } from "react";
import { Flame, X, Phone, Check, ArrowRight, ShieldCheck, Clock, Star } from "lucide-react";

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
      if (typeof window !== "undefined" && "gtag_report_conversion" in window) {
        (window as any).gtag_report_conversion();
      }
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
        className="absolute inset-0 bg-[oklch(0_0_0/0.78)] backdrop-blur-md"
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.10_0.01_250)] text-primary-foreground shadow-[0_40px_120px_-10px_oklch(0_0_0/0.7)] animate-scale-in"
      >
        {/* Ambient flame glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 -right-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.19 92 / 0.45) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.19 92 / 0.22) 0%, transparent 70%)" }}
        />
        {/* Subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Top flame accent bar */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-flame to-transparent"
        />

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-primary-foreground/80 backdrop-blur transition hover:border-flame/60 hover:bg-white/10 hover:text-flame"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-7 pt-9 pb-7 sm:px-8">
          {done ? (
            <div className="py-6 text-center">
              <div className="relative mx-auto h-20 w-20">
                <span className="absolute inset-0 animate-ping rounded-full bg-flame/30" />
                <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-flame to-[oklch(0.62_0.2_55)] shadow-[0_18px_40px_oklch(0.78_0.19_92/0.45)]">
                  <Check className="h-9 w-9 text-primary" strokeWidth={3} />
                </div>
              </div>
              <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
                You're on the list.
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                A real human from the crew will call{" "}
                <span className="font-semibold text-flame">{form.phone}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-flame px-6 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-primary shadow-[0_14px_30px_oklch(0.78_0.19_92/0.35)] transition hover:bg-white"
              >
                Got it
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-flame/15 text-flame ring-1 ring-flame/40">
                  <Flame className="h-5 w-5 animate-flicker" />
                </div>
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-flame/40 bg-flame/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-flame">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
                    Slots open this week
                  </span>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/55">
                    ChimCrew · Ohio
                  </p>
                </div>
              </div>

              <h2
                id="popup-title"
                className="mt-5 font-display text-[1.7rem] font-extrabold leading-[1.05] tracking-tight sm:text-3xl"
              >
                Get your <span className="text-flame">free drone inspection</span> before you go.
              </h2>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Drop your number — a real Ohio tech calls back within the hour. No spam, ever.
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
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[11px] font-medium text-primary-foreground/80"
                  >
                    <t.icon className="h-3.5 w-3.5 text-flame" />
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
                  placeholder="(614) 549-1954"
                />
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-foreground/60">
                    Service
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-primary-foreground outline-none transition focus:border-flame/60 focus:bg-white/[0.06]"
                  >
                    {["Chimney Sweep","Inspection","Cap or Crown Repair","Liner Install","Animal Removal","Not sure yet"].map((s) => (
                      <option key={s} value={s} className="bg-[oklch(0.10_0.01_250)] text-primary-foreground">{s}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!form.name || !form.phone || submitting}
                  className="group relative mt-1 flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-flame px-5 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-primary shadow-[0_18px_40px_oklch(0.78_0.19_92/0.35)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-flame"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Claim my free callback
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <a
                  href="tel:+16145491954"
                  className="flex items-center justify-center gap-2 text-xs font-medium text-primary-foreground/60 transition hover:text-flame"
                >
                  <Phone className="h-3.5 w-3.5" /> Or call (614) 549-1954
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
      <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-foreground/60">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-primary-foreground outline-none transition placeholder:text-primary-foreground/30 focus:border-flame/60 focus:bg-white/[0.06]"
      />
    </div>
  );
}