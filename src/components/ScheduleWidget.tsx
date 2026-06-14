import { useState, useEffect, useCallback } from "react";
import { CalendarCheck, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
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

const services = [
  "Chimney Sweep",
  "Camera Inspection",
  "Repair / Tuckpoint",
  "Waterproof & Cap",
  "Crown Seal Repair",
  "Leak Diagnosis",
  "I'm not sure yet",
];

const slots = [
  "8:00 AM – 11:00 AM",
  "11:00 AM – 2:00 PM",
  "2:00 PM – 5:00 PM",
  "5:00 PM – 7:00 PM",
];

export function ScheduleWidget() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);
  return (
    <>
      <StickyCta onClick={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-2 border-flame/30 bg-card p-0 sm:max-w-xl [&>button.absolute]:right-3 [&>button.absolute]:top-3 [&>button.absolute]:z-10 [&>button.absolute]:flex [&>button.absolute]:h-9 [&>button.absolute]:w-9 [&>button.absolute]:items-center [&>button.absolute]:justify-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-flame/40 [&>button.absolute]:bg-primary/70 [&>button.absolute]:text-primary-foreground [&>button.absolute]:opacity-100 [&>button.absolute]:shadow-[0_4px_12px_oklch(0_0_0/0.4)] [&>button.absolute]:backdrop-blur [&>button.absolute]:transition [&>button.absolute:hover]:bg-flame [&>button.absolute:hover]:text-primary [&>button.absolute_svg]:h-5 [&>button.absolute_svg]:w-5">
          <ScheduleFlow variant="dialog" onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ScheduleInline() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0_0_0/0.25)]">
      <ScheduleFlow variant="inline" />
    </div>
  );
}

function getDefaultDate(): Date {
  // Pre-select the nearest available appointment date — 2 days from today —
  // so homeowners don't have to pick a date from scratch.
  const d = new Date();
  d.setDate(d.getDate() + 2);
  d.setHours(0, 0, 0, 0);
  return d;
}

function ScheduleFlow({ variant, onDone }: { variant: "dialog" | "inline"; onDone?: () => void }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string>(services[0]);
  const [date, setDate] = useState<Date | undefined>(() => getDefaultDate());
  const [slot, setSlot] = useState<string>(slots[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const todayStr = date ? format(date, "yyyy-MM-dd") : "";
  const minDateStr = format(new Date(), "yyyy-MM-dd");

  const canSubmitStep1 =
    name.trim().length > 1 &&
    phone.replace(/\D/g, "").length >= 7 &&
    !!date &&
    !!slot;

  // Address is collected but no longer required — too much friction for paid
  // traffic. The crew confirms the address by text after the booking lands.
  const canSubmit = canSubmitStep1 && !!service;

  const submit = useCallback(async () => {
    setSubmitting(true);
    const dateStr = date ? format(date, "EEE, MMM d") : undefined;
    const payload = {
      source: "Schedule widget",
      name,
      phone,
      service,
      address: address || undefined,
      date: dateStr,
      timeWindow: slot,
      notes: notes || undefined,
    };

    let ok = false;
    // 1) Primary path: server route that also emails the office.
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

    // 2) Safety net: always try a direct insert too so a lead can never be
    // lost just because the email route is down. RLS allows anon INSERT
    // with field-length validation.
    try {
      await supabase.from("leads").insert({
        source: "Schedule widget",
        name,
        phone,
        service,
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

    onDone?.();
    // Only fire the Google Ads conversion AFTER a real successful lead.
    reportLeadFormConversion();
    toast.success("You're on the schedule!", {
      description: `${service} · ${dateStr ?? ""} · ${slot}. We'll text ${phone} within an hour to confirm.`,
      duration: 7000,
    });
    setStep(0);
    setName("");
    setPhone("");
    setAddress("");
    setNotes("");
  }, [service, slot, date, phone, onDone, address, name, notes]);

  return (
    <div className="bg-card">
      {/* Flame-yellow header — minimal & bold */}
      <div className="bg-flame px-6 py-7 text-primary md:px-8">
        <h3 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
          Schedule Service Online
        </h3>
        <p className="mt-2 text-sm font-medium text-primary/85">
          Serving <span className="font-extrabold">Columbus, Ohio</span> and surrounding areas — ChimCrew
        </p>
        <p className="mt-1 text-sm text-primary/75">
          No extra charge for evenings, weekends or holidays.
        </p>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" required>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="h-11"
                />
              </Field>
              <Field label="Phone Number" required>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  inputMode="tel"
                  className="h-11"
                />
              </Field>
              <Field label="Appointment Date" required>
                <Input
                  type="date"
                  value={todayStr}
                  min={minDateStr}
                  onChange={(e) =>
                    setDate(e.target.value ? new Date(e.target.value + "T00:00:00") : undefined)
                  }
                  className="h-11"
                />
              </Field>
              <Field label="Appointment Time" required>
                <Select value={slot} onValueChange={setSlot}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {slots.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <button
              type="button"
              disabled={!canSubmitStep1}
              onClick={() => setStep(1)}
              className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <Field label="Service Needed" required>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Service Address">
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Columbus OH (optional)"
                className="h-11"
              />
            </Field>

            <Field label="Notes (optional)">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know?"
                rows={3}
              />
            </Field>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="text-sm font-semibold text-muted-foreground transition hover:text-primary"
              >
                ← Back
              </button>
              <button
                type="button"
                disabled={!canSubmit || submitting}
                onClick={submit}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-8 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Booking…" : (<>Confirm Booking <CalendarCheck className="h-4 w-4" /></>)}
              </button>
            </div>

            <p className="flex items-center justify-center gap-2 pt-2 text-[11px] text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-flame" />
              No card. No spam. A real Ohio sweep texts you in &lt; 60 minutes.
            </p>
          </div>
        )}

        {/* Trust strip */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-t border-border pt-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3 text-flame" /> Ohio crew</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-flame" /> CSIA Certified</span>
          <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3 text-flame" /> (614) 683-5763</span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-primary">
        {label} {required && <span className="text-flame">*</span>}
      </Label>
      {children}
    </div>
  );
}

function StickyCta({ onClick }: { onClick: () => void }) {
  return (
    <>
      {/* Mobile — bottom sticky bar */}
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
            className="group relative flex h-12 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-flame px-4 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-flame"
          >
            <CalendarCheck className="h-4 w-4" /> Schedule online
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>
      </div>
      {/* Mobile spacer so content isn't hidden under the bar */}
      <div className="h-20 md:hidden" aria-hidden />

      {/* Desktop — floating side rail */}
      <button
        type="button"
        onClick={onClick}
        className="group fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 translate-x-0 items-center gap-2 rounded-l-2xl bg-flame px-3 py-5 font-mono text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary shadow-[0_20px_50px_oklch(0_0_0/0.35)] transition hover:px-4 md:inline-flex"
        aria-label="Schedule online"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-flame transition group-hover:rotate-12">
          <CalendarCheck className="h-4 w-4" />
        </span>
        <span className="vertical-writing">Schedule online</span>
      </button>
    </>
  );
}