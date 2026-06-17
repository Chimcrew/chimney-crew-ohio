import { useState, useCallback } from "react";
import { CheckCircle2, CalendarCheck, Flame, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { reportLeadFormConversion } from "@/lib/track";

/**
 * Schedule "trigger" — instead of opening a modal, we navigate to the
 * dedicated /schedule page. Kept as a function so existing call sites
 * (header, sticky CTA, etc.) keep working unchanged.
 */
export function openScheduleDialog() {
  if (typeof window !== "undefined" && window.location.pathname !== "/schedule") {
    window.location.href = "/schedule";
  }
}

export const SCHEDULE_SERVICES = [
  { value: "Gas Fireplace Inspection — $49", label: "Gas Fireplace Inspection", price: "$49" },
  { value: "Chimney/Fireplace Inspection — $69", label: "Chimney/Fireplace Inspection", price: "$69" },
  { value: "Chimney Sweep — $99", label: "Chimney Sweep", price: "$99" },
  { value: "Dryer Vent Cleaning — $79", label: "Dryer Vent Cleaning", price: "$79" },
  { value: "Chimney Drone Inspection — Free", label: "Chimney Drone Inspection", price: "Free" },
] as const;

const SLOTS = ["8:00AM-11:00AM", "11:00AM-2:00PM", "2:00PM-5:00PM"];

const STEPS = [
  { n: 1, label: "Information" },
  { n: 2, label: "Address" },
  { n: 3, label: "Note" },
];

export function ScheduleInline() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  return <ScheduleFlow sourcePath={path} />;
}

function getDefaultDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  d.setHours(0, 0, 0, 0);
  return d;
}

function ScheduleFlow({ sourcePath = "", onDone }: { sourcePath?: string; onDone?: () => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date | undefined>(() => getDefaultDate());
  const [slot, setSlot] = useState<string>(SLOTS[0]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [service, setService] = useState<string>(SCHEDULE_SERVICES[1].value);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const todayStr = date ? format(date, "yyyy-MM-dd") : "";
  const minDateStr = format(new Date(), "yyyy-MM-dd");

  const canStep1 =
    name.trim().length > 1 &&
    phone.replace(/\D/g, "").length >= 7 &&
    !!date &&
    !!slot;
  const canStep2 = street.trim().length > 1 && city.trim().length > 1;
  const canSubmit = canStep1 && canStep2 && !!service;

  const submit = useCallback(async () => {
    setSubmitting(true);
    const dateStr = date ? format(date, "EEE, MMM d") : undefined;
    const address = [street, city, zip].filter(Boolean).join(", ");
    const pageSuffix = sourcePath ? ` · ${sourcePath}` : "";
    const sourceLabel = `Schedule form${pageSuffix}`.slice(0, 60);
    const payload = {
      source: sourceLabel,
      name,
      phone,
      service,
      city: city || undefined,
      address: address || undefined,
      date: dateStr,
      timeWindow: slot,
      notes: notes || undefined,
    };

    let ok = false;
    try {
      const res = await fetch("/api/public/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    try {
      await supabase.from("leads").insert({
        source: sourceLabel,
        name,
        phone,
        service,
        city: city || null,
        address: address || null,
        preferred_date: dateStr ?? null,
        time_window: slot,
        notes: notes || null,
      });
      ok = true;
    } catch {
      /* primary already determined ok */
    }

    setSubmitting(false);

    if (!ok) {
      toast.error("We couldn't submit your booking.", {
        description: "Please call (614) 683-5763 and we'll get you on the schedule.",
        duration: 8000,
      });
      return;
    }

    reportLeadFormConversion();
    toast.success("You're on the schedule!", {
      description: `${service} · ${dateStr ?? ""} · ${slot}. We'll call ${phone} within the hour.`,
      duration: 7000,
    });
    onDone?.();
    setStep(1);
    setName("");
    setPhone("");
    setStreet("");
    setCity("");
    setZip("");
    setNotes("");
  }, [date, street, city, zip, sourcePath, name, phone, service, slot, notes, onDone]);

  return (
    <div className="overflow-hidden rounded-2xl border border-flame/30 bg-primary text-primary-foreground shadow-[0_30px_80px_-30px_oklch(0_0_0/0.6)]">
      {/* Branded header */}
      <div className="relative overflow-hidden px-6 pt-8 pb-6 md:px-10 md:pt-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-flame/20 blur-3xl" aria-hidden />
        <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
          <Flame className="h-3 w-3" /> ChimCrew · 60-second booking
        </span>
        <h2 className="mt-3 font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-3xl">
          Schedule Service Online
        </h2>
        <p className="mt-3 text-sm text-white/85 md:text-base">
          Servicing{" "}
          <span className="inline-block rounded-md bg-flame px-1.5 py-0.5 font-bold text-primary">
            your area
          </span>{" "}
          and surrounding neighborhoods.
        </p>
        <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
          <ShieldCheck className="h-3 w-3 text-flame" /> No extra charge nights · weekends · holidays
        </p>

        <div className="mt-6 grid grid-cols-3 gap-0 border-b border-white/15">
          {STEPS.map((s) => {
            const active = step === s.n;
            return (
              <div
                key={s.n}
                className={`pb-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-b-2 border-flame font-bold text-white"
                    : "border-b-2 border-transparent text-white/55"
                }`}
              >
                {s.n}. {s.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-6 mb-8 rounded-xl bg-white p-6 text-foreground md:mx-10 md:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" required>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-md border-foreground/20 text-base" />
              </Field>
              <Field label="Phone Number" required>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" className="h-12 rounded-md border-foreground/20 text-base" />
              </Field>
              <Field label="Appointment Date" required>
                <Input
                  type="date"
                  value={todayStr}
                  min={minDateStr}
                  onChange={(e) => setDate(e.target.value ? new Date(e.target.value + "T00:00:00") : undefined)}
                  className="h-12 rounded-md border-foreground/20 text-base"
                />
              </Field>
              <Field label="Appointment Time" required>
                <Select value={slot} onValueChange={setSlot}>
                  <SelectTrigger className="h-12 rounded-md border-foreground/20 text-base text-[#1d4ed8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SLOTS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <NextButton disabled={!canStep1} onClick={() => setStep(2)} label="Next" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Field label="Street Address" required>
              <Input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="123 Main St" className="h-12 rounded-md border-foreground/20 text-base" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="City" required>
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Columbus" className="h-12 rounded-md border-foreground/20 text-base" />
              </Field>
              <Field label="ZIP Code">
                <Input value={zip} onChange={(e) => setZip(e.target.value)} inputMode="numeric" maxLength={10} placeholder="43215" className="h-12 rounded-md border-foreground/20 text-base" />
              </Field>
            </div>
            <div className="flex items-center gap-3">
              <BackButton onClick={() => setStep(1)} />
              <NextButton disabled={!canStep2} onClick={() => setStep(3)} label="Next" className="flex-1" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <Field label="Service Needed" required>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="h-12 rounded-md border-foreground/20 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SCHEDULE_SERVICES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label} — {s.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Note (optional)">
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know?" rows={4} className="rounded-md border-foreground/20 text-base" />
            </Field>
            <div className="flex items-center gap-3">
              <BackButton onClick={() => setStep(2)} />
              <NextButton
                disabled={!canSubmit || submitting}
                onClick={submit}
                label={submitting ? "Booking…" : "Submit Booking"}
                className="flex-1"
              />
            </div>
            <p className="flex items-center justify-center gap-2 pt-1 text-[11px] text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#E63A1F]" />
              No card. No spam. We call within the hour.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-foreground">
        {label} {required && <span className="text-[#E63A1F]">*</span>}
      </Label>
      {children}
    </div>
  );
}

function NextButton({
  onClick,
  disabled,
  label,
  className = "",
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-flame font-display text-base font-bold uppercase tracking-wider text-primary shadow-[0_10px_24px_oklch(0.78_0.19_92/0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-14 shrink-0 items-center justify-center rounded-md border-2 border-foreground/20 px-5 text-sm font-semibold text-foreground transition hover:border-foreground/40"
    >
      ← Back
    </button>
  );
}

