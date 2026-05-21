import { useState } from "react";
import { ArrowRight, Check, Flame } from "lucide-react";
import truck from "@/assets/chimcrew-truck.png";

const services = [
  "Chimney Sweep",
  "Inspection (Level 1/2)",
  "Cap or Crown Repair",
  "Liner Install",
  "Animal Removal",
  "Not sure yet",
];
const cities = ["Columbus", "Cincinnati", "Dayton", "Other"];

export function LeadForm({ id = "quote" }: { id?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: "",
    city: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [done, setDone] = useState(false);

  function next() { setStep((s) => Math.min(s + 1, 3)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  const stepValid =
    (step === 0 && data.service) ||
    (step === 1 && data.city) ||
    (step === 2 && data.name && data.phone) ||
    step === 3;

  return (
    <section id={id} className="relative overflow-hidden border-y-2 border-primary/30 bg-[oklch(0.13_0.01_50)] py-20">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: truck + pitch */}
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Step into the crew</p>
          <h2 className="mt-3 text-5xl md:text-6xl">
            Get a flat-rate quote in <span className="text-flame">60 seconds.</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Tell us what's up with your chimney. A real human from our Ohio crew
            calls you back the same day — no robots, no spam, no upsell theater.
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            {["Same-day callback", "Flat-rate pricing up front", "CSIA-certified techs", "Fully insured"].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> {b}
              </li>
            ))}
          </ul>

          <div className="relative mt-8 hidden lg:block">
            <img
              src={truck}
              alt=""
              className="w-full max-w-md drop-shadow-[0_25px_40px_oklch(0.7_0.22_45/0.35)]"
            />
          </div>
        </div>

        {/* Right: stepper form */}
        <form onSubmit={submit} className="relative rounded-sm border-2 border-primary/40 bg-card p-6 shadow-flame md:p-8">
          {/* progress */}
          <div className="mb-6 flex items-center gap-2">
            {[0, 1, 2, 3].map((i) => (
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
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">02 / City</p>
                  <h3 className="mt-2 text-3xl">Where are you?</h3>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {cities.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => { setData({ ...data, city: c }); next(); }}
                        className={`rounded-sm border-2 p-4 text-left text-sm transition ${
                          data.city === c
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/60"
                        }`}
                      >
                        {c}, OH
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">03 / You</p>
                  <h3 className="mt-2 text-3xl">How do we reach you?</h3>
                  <div className="mt-6 grid gap-3">
                    <Input label="Full name" value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="Jane Smith" />
                    <Input label="Phone" type="tel" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="(614) 555-0123" />
                    <Input label="Email (optional)" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} placeholder="jane@example.com" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">04 / Details</p>
                  <h3 className="mt-2 text-3xl">Anything else we should know?</h3>
                  <div className="mt-6 grid gap-3">
                    <Input label="Address (optional)" value={data.address} onChange={(v) => setData({ ...data, address: v })} placeholder="123 Main St" />
                    <div>
                      <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted-foreground">Notes</label>
                      <textarea
                        value={data.notes}
                        onChange={(e) => setData({ ...data, notes: e.target.value })}
                        rows={4}
                        className="w-full rounded-sm border-2 border-border bg-background p-3 text-sm outline-none focus:border-primary"
                        placeholder="Last cleaning year, fireplace type, smells, draft issues…"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                {step > 0 ? (
                  <button type="button" onClick={back} className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
                    ← Back
                  </button>
                ) : <span />}
                {step < 3 ? (
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
                    className="flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-display text-sm uppercase tracking-wider text-primary-foreground transition hover:brightness-110"
                  >
                    Send it <Flame className="h-4 w-4" />
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
  label, value, onChange, placeholder, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border-2 border-border bg-background p-3 text-sm outline-none transition focus:border-primary"
      />
    </div>
  );
}
