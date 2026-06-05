import { useState } from "react";
import { ArrowRight, Check, Flame, Phone } from "lucide-react";
import truck from "@/assets/chimcrew-truck.png";

const services = [
  "Chimney Sweep",
  "Inspection",
  "Repair / Crown",
  "Liner Install",
  "Dryer Vent",
  "Not sure yet",
];

export function LeadForm({ id = "quote" }: { id?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: "",
    name: "",
    phone: "",
    zip: "",
  });
  const [done, setDone] = useState(false);

  function next() { setStep((s) => Math.min(s + 1, 1)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    void fetch('/api/public/notify-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'Quote form',
        name: data.name,
        phone: data.phone,
        service: data.service,
        notes: data.zip ? `ZIP: ${data.zip}` : undefined,
      }),
    }).catch(() => {});
    setDone(true);
  }

  const stepValid =
    (step === 0 && data.service) ||
    (step === 1 && data.name.trim().length > 1 && data.phone.trim().length >= 7);

  return (
    <section id={id} className="relative overflow-hidden border-y-2 border-primary/30 bg-secondary py-20">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: pitch */}
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Free estimate</p>
          <h2 className="mt-3 text-5xl md:text-6xl">
            Get a free estimate in <span className="text-flame">30 seconds.</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Two quick questions — that's it. A real human from our Ohio crew calls you back the same day. No spam, no upsell theater.
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            {["Same-day callback", "Flat-rate pricing up front", "CSIA-certified Ohio techs", "Fully licensed & insured"].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> {b}
              </li>
            ))}
          </ul>

          <a
            href="tel:6146834422"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-primary px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> Or call now · (614) 683-4422
          </a>

          <div className="relative mt-8 hidden lg:block">
            <img
              src={truck}
              alt=""
              className="w-full max-w-md drop-shadow-[0_25px_40px_oklch(0.7_0.22_45/0.35)]"
            />
          </div>
        </div>

        {/* Right: 2-step form */}
        <form onSubmit={submit} className="relative rounded-sm border-2 border-primary/40 bg-card p-6 shadow-flame md:p-8">
          {/* progress */}
          <div className="mb-6 flex items-center gap-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition ${
                  i <= step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          {done ? (
            <div className="py-12 text-center">
              <Flame className="mx-auto h-14 w-14 animate-flicker text-flame" />
              <h3 className="mt-4 text-3xl">You're on the list, {data.name.split(" ")[0]}.</h3>
              <p className="mt-2 text-muted-foreground">
                Our crew will call {data.phone} within the hour during business hours.
              </p>
              <a
                href="tel:6146834422"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-flame px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-primary"
              >
                <Phone className="h-4 w-4" /> Or call us now
              </a>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">01 / Service</p>
                  <h3 className="mt-2 text-3xl">What do you need?</h3>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {services.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => { setData({ ...data, service: s }); next(); }}
                        className={`rounded-sm border-2 p-4 text-left text-sm transition ${
                          data.service === s
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/60"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">02 / Your details</p>
                  <h3 className="mt-2 text-3xl">Where should we call?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Just name and phone. We'll grab the rest when we call you back.
                  </p>
                  <div className="mt-6 grid gap-3">
                    <Input id="lead-name" label="Full name" value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="Jane Smith" />
                    <Input id="lead-phone" label="Phone" type="tel" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="(614) 555-0123" />
                    <Input id="lead-zip" label="ZIP (optional)" value={data.zip} onChange={(v) => setData({ ...data, zip: v })} placeholder="43215" />
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                {step > 0 ? (
                  <button type="button" onClick={back} className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
                    ← Back
                  </button>
                ) : <span />}
                {step === 0 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!stepValid}
                    className="flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-display text-sm uppercase tracking-wider text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!stepValid}
                    className="flex items-center gap-2 rounded-sm bg-flame px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider text-primary transition hover:brightness-110 disabled:opacity-40"
                  >
                    Get my free estimate <Flame className="h-4 w-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Input({
  id, label, value, onChange, placeholder, type = "text",
}: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border-2 border-border bg-background p-3 text-sm outline-none transition focus:border-primary"
      />
    </div>
  );
}