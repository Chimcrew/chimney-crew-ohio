import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, CalendarCheck, ShieldCheck, CheckCircle2, Phone } from "lucide-react";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "Financing Calculator — ChimCrew Chimney Repair" },
      {
        name: "description",
        content:
          "Estimate your monthly payment for chimney repair or rebuild. Flexible 12–60 month financing for Ohio homeowners. Calculate in seconds, then book your free inspection.",
      },
      { property: "og:title", content: "Chimney Repair Financing — ChimCrew" },
      { property: "og:description", content: "Flexible monthly payments for chimney repair across Ohio. Calculate yours in seconds." },
    ],
    links: [{ rel: "canonical", href: "https://chimcrew.com/financing" }],
  }),
  component: FinancingPage,
});

function currency(n: number) {
  if (!isFinite(n) || isNaN(n)) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function FinancingPage() {
  const [cost, setCost] = useState(6000);
  const [down, setDown] = useState(500);
  const [term, setTerm] = useState(36);
  const [rate, setRate] = useState(9.99);

  const { financed, monthly, totalInterest, totalPaid } = useMemo(() => {
    const principal = Math.max(0, cost - down);
    const r = rate / 100 / 12;
    const n = term;
    let m = 0;
    if (principal > 0 && n > 0) {
      m = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
    }
    const total = m * n;
    return {
      financed: principal,
      monthly: m,
      totalInterest: Math.max(0, total - principal),
      totalPaid: total,
    };
  }, [cost, down, term, rate]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-primary/30 bg-primary py-16 text-primary-foreground md:py-20">
        <div className="bg-grid absolute inset-0 opacity-[0.08]" aria-hidden />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-flame/15 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 md:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
            <Calculator className="h-3.5 w-3.5" /> Financing Calculator
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl">
            Repair now. <span className="text-flame">Pay monthly.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            Move the sliders. See your real monthly payment in seconds — no
            credit pull, no email required. When you're ready, we'll lock the
            quote at your free on-site inspection.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-8 lg:grid-cols-5">
          {/* INPUTS */}
          <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm md:p-8 lg:col-span-3">
            <h2 className="font-display text-2xl font-extrabold text-primary md:text-3xl">
              Your project
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Update any field — the numbers refresh instantly.
            </p>

            <div className="mt-8 space-y-7">
              <NumberField
                id="cost"
                label="Project cost"
                hint="Total quote for the chimney work."
                value={cost}
                onChange={setCost}
                min={500}
                max={50000}
                step={100}
                prefix="$"
              />
              <NumberField
                id="down"
                label="Down payment"
                hint="Paid up front at job start."
                value={down}
                onChange={setDown}
                min={0}
                max={cost}
                step={50}
                prefix="$"
              />

              {/* Term selector */}
              <div>
                <label className="font-display text-sm font-bold uppercase tracking-wider text-primary">
                  Financing term
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Shorter terms pay less interest. Longer terms shrink the
                  monthly payment.
                </p>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {[12, 24, 36, 48, 60].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTerm(t)}
                      className={`h-14 rounded-xl border-2 font-display text-sm font-extrabold transition ${
                        term === t
                          ? "border-flame bg-flame text-primary shadow-flame"
                          : "border-border bg-background text-primary hover:border-flame/60"
                      }`}
                    >
                      {t}
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-widest opacity-80">
                        mo
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <NumberField
                id="rate"
                label="Interest rate (APR)"
                hint="Typical approved rates fall between 7.99% and 14.99%."
                value={rate}
                onChange={setRate}
                min={0}
                max={29.99}
                step={0.01}
                suffix="%"
                decimals={2}
              />
            </div>
          </div>

          {/* RESULTS */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 overflow-hidden rounded-2xl border-2 border-primary/40 bg-primary text-primary-foreground shadow-[0_20px_60px_oklch(0_0_0/0.25)]">
              <div className="bg-grid absolute inset-0 opacity-[0.08]" aria-hidden />
              <div className="relative p-6 md:p-8">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                  Your estimated payment
                </p>
                <p className="mt-2 font-display text-5xl font-extrabold leading-none tracking-tight text-primary-foreground md:text-6xl">
                  {currency(monthly)}
                  <span className="ml-1 font-mono text-base font-bold uppercase tracking-widest text-primary-foreground/70">
                    /mo
                  </span>
                </p>

                <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                  <ResultRow label="Amount financed" value={currency(financed)} />
                  <ResultRow label="Total interest" value={currency(totalInterest)} />
                  <ResultRow label="Total of payments" value={currency(totalPaid)} emphasis />
                  <ResultRow label="Term" value={`${term} months`} />
                  <ResultRow label="APR" value={`${rate.toFixed(2)}%`} />
                </dl>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-flame px-6 py-4 font-display text-base font-extrabold uppercase tracking-wider text-primary shadow-[0_14px_40px_oklch(0.78_0.19_92/0.45)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <CalendarCheck className="h-5 w-5" /> Schedule Your Free Inspection
                </Link>
                <a
                  href="tel:6146834422"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/[0.04] px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:border-flame"
                >
                  <Phone className="h-4 w-4 text-flame" /> Call (614) 683-4422
                </a>

                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                  Estimate only · Final rate set by lender
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* TRUST STRIP */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-4 px-4 sm:grid-cols-3 md:px-8">
          {[
            { icon: ShieldCheck, t: "Soft credit check", b: "Pre-qualify in 60 seconds — no impact to your score." },
            { icon: CheckCircle2, t: "Approved on-site", b: "Most homeowners get a decision before we leave the driveway." },
            { icon: CalendarCheck, t: "Work starts fast", b: "Repairs scheduled within days of approval." },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-xl border-2 border-border bg-card p-5">
              <Icon className="h-5 w-5 text-flame" />
              <p className="mt-3 font-display text-base font-bold text-primary">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  decimals = 0,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-sm font-bold uppercase tracking-wider text-primary">
        {label}
      </label>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      <div className="mt-3 flex items-stretch overflow-hidden rounded-xl border-2 border-border bg-background focus-within:border-flame">
        {prefix ? (
          <span className="grid place-items-center bg-secondary/60 px-4 font-display text-lg font-extrabold text-primary">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange(Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : 0);
          }}
          className="h-16 w-full bg-transparent px-4 font-display text-2xl font-extrabold text-primary outline-none"
        />
        {suffix ? (
          <span className="grid place-items-center bg-secondary/60 px-4 font-display text-lg font-extrabold text-primary">
            {suffix}
          </span>
        ) : null}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={`${label} slider`}
        className="mt-3 w-full accent-flame"
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>{prefix ?? ""}{min.toFixed(decimals)}{suffix ?? ""}</span>
        <span>{prefix ?? ""}{max.toFixed(decimals)}{suffix ?? ""}</span>
      </div>
    </div>
  );
}

function ResultRow({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground/70">
        {label}
      </dt>
      <dd className={emphasis ? "font-display text-lg font-extrabold text-flame" : "font-display text-base font-bold text-primary-foreground"}>
        {value}
      </dd>
    </div>
  );
}