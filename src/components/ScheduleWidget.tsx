import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, CalendarCheck, Phone } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { reportLeadFormConversion } from "@/lib/track";

const OPEN_EVENT = "chimcrew:open-schedule";

export function openScheduleDialog() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
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

export function ScheduleWidget() {
  const [open, setOpen] = useState(false);
  const [openedFromPath, setOpenedFromPath] = useState<string>("");
  useEffect(() => {
    const onOpen = () => {
      if (typeof window !== "undefined") setOpenedFromPath(window.location.pathname);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);
  return (
    <>
      <StickyCta
        onClick={() => {
          if (typeof window !== "undefined") setOpenedFromPath(window.location.pathname);
          setOpen(true);
        }}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-0 bg-transparent p-0 sm:max-w-xl [&>button.absolute]:right-3 [&>button.absolute]:top-3 [&>button.absolute]:z-10 [&>button.absolute]:flex [&>button.absolute]:h-9 [&>button.absolute]:w-9 [&>button.absolute]:items-center [&>button.absolute]:justify-center [&>button.absolute]:rounded-full [&>button.absolute]:bg-white/95 [&>button.absolute]:text-primary [&>button.absolute]:opacity-100 [&>button.absolute]:shadow-md [&>button.absolute:hover]:bg-white [&>button.absolute_svg]:h-5 [&>button.absolute_svg]:w-5">
          <ScheduleFlow sourcePath={openedFromPath} onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

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
    <div className="overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-[0_20px_60px_-20px_oklch(0_0_0/0.55)]">
      <div className="px-6 pt-8 pb-6 md:px-10 md:pt-10">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
          Schedule Service Online
        </h2>
        <p className="mt-3 text-sm text-white/85 md:text-base">
          Servicing <span className="font-bold text-white">Your Area</span> And Surrounding Areas — CHIMCREW
        </p>
        <p className="mt-2 text-sm text-white/70">
          No extra charge for appointments on nights, weekends or holidays
        </p>

        <div className="mt-6 grid grid-cols-3 gap-0 border-b border-white/15">
          {STEPS.map((s) => {
            const active = step === s.n;
            return (
              <div
                key={s.n}
                className={`pb-3 text-left text-sm transition ${
                  active
                    ? "border-b-2 border-[#E63A1F] font-semibold text-white"
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
      className={`inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#E63A1F] font-display text-base font-bold uppercase tracking-wider text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
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

function StickyCta({ onClick }: { onClick: () => void }) {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-flame/30 bg-primary/95 px-3 py-2.5 backdrop-blur-xl md:hidden" style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center gap-2">
          <a
            href="tel:6146835763"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 text-primary-foreground"
            aria-label="Call ChimCrew"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={onClick}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#E63A1F] px-4 font-display text-sm font-extrabold uppercase tracking-wider text-white shadow-md"
          >
            <CalendarCheck className="h-4 w-4" /> Schedule online
          </button>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />

      <button
        type="button"
        onClick={onClick}
        className="group fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-l-2xl bg-[#E63A1F] px-3 py-5 font-mono text-[11px] font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_20px_50px_oklch(0_0_0/0.35)] transition hover:px-4 md:inline-flex"
        aria-label="Schedule online"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#E63A1F]">
          <CalendarCheck className="h-4 w-4" />
        </span>
        <span className="vertical-writing">Schedule online</span>
      </button>
    </>
  );
}
