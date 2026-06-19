import { useState, useCallback } from "react";
import { CheckCircle2, CalendarCheck, Flame, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { reportLeadFormConversion } from "@/lib/track";
import { submitLead } from "@/lib/lead-submit";
import teamTruckPhoto from "@/assets/chimcrew-team-truck-schedule.png.asset.json";

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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canSubmit =
    name.trim().length > 1 &&
    phone.replace(/\D/g, "").length >= 7 &&
    emailIsValid &&
    !!date &&
    !!slot &&
    street.trim().length > 1 &&
    city.trim().length > 1 &&
    !!service;

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
      email: email.trim() || undefined,
      service,
      city: city || undefined,
      address: address || undefined,
      date: dateStr,
      timeWindow: slot,
      notes: notes || undefined,
    };

    try {
      await submitLead(payload);
    } catch {
      setSubmitting(false);
      toast.error("We couldn't submit your booking.", {
        description: "Please call (614) 683-5763 and we'll get you on the schedule.",
        duration: 8000,
      });
      return;
    }

    setSubmitting(false);

    reportLeadFormConversion();
    toast.success("You're on the schedule!", {
      description: `${service} · ${dateStr ?? ""} · ${slot}. We'll email your appointment confirmation within 10 minutes.`,
      duration: 7000,
    });
    onDone?.();
    setName("");
    setPhone("");
    setEmail("");
    setStreet("");
    setCity("");
    setZip("");
    setNotes("");
  }, [date, street, city, zip, sourcePath, name, phone, email, service, slot, notes, onDone]);

  return (
    <div className="bg-background text-foreground">
      {/* Compact header */}
      <div className="mb-4 border-b border-border pb-4">
        <span className="inline-flex items-center gap-1.5 bg-black px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-flame">
          <Flame className="h-3 w-3" /> ChimCrew · 60-second booking
        </span>
        <h2 className="mt-2 font-display text-xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-2xl">
          Schedule Service Online
        </h2>
        <p className="mt-1 text-xs text-foreground/70 md:text-sm">
          Servicing your area and surrounding neighborhoods.
        </p>
        <div className="mt-2 space-y-0.5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/50">
            <ShieldCheck className="mr-1 inline h-3 w-3 text-flame" />
            No extra charge
          </p>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/80 opacity-0"
            style={{ animation: "revealUp 0.7s ease-out 0.3s forwards" }}
          >
            nights
          </p>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/80 opacity-0"
            style={{ animation: "revealUp 0.7s ease-out 0.7s forwards" }}
          >
            weekends
          </p>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/80 opacity-0"
            style={{ animation: "revealUp 0.7s ease-out 1.1s forwards" }}
          >
            holidays
          </p>
        </div>
      </div>
      <style>{`
        @keyframes revealUp {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Team photo — builds trust without overwhelming the form */}
      <figure className="mx-auto mb-5 max-w-[120px]">
        <div className="overflow-hidden rounded-lg border-2 border-border bg-muted shadow-lg">
          <img
            src={teamTruckPhoto.url}
            alt="The ChimCrew team — certified chimney professionals in Columbus, Ohio"
            className="block h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="mt-1.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Your local crew
        </figcaption>
      </figure>

      {/* Compact single-page form */}
      <div className="space-y-3">
        {/* Service — full width, most important */}
        <Field label="Service Needed" required>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger className="h-10 rounded-none border-foreground/20 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {SCHEDULE_SERVICES.map((s) => (
                <SelectItem key={s.value} value={s.value} className="rounded-none">
                  {s.label} — {s.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Name + Phone */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Full Name" required>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-10 rounded-none border-foreground/20 text-sm" />
          </Field>
          <Field label="Phone Number" required>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" className="h-10 rounded-none border-foreground/20 text-sm" />
          </Field>
        </div>

        {/* Email — used to send a booking confirmation */}
        <Field label="Email (for confirmation)" required>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            placeholder="you@example.com"
            className="h-10 rounded-none border-foreground/20 text-sm"
          />
        </Field>

        {/* Date + Time */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Appointment Date" required>
            <Input
              type="date"
              value={todayStr}
              min={minDateStr}
              onChange={(e) => setDate(e.target.value ? new Date(e.target.value + "T00:00:00") : undefined)}
              className="h-10 rounded-none border-foreground/20 text-sm"
            />
          </Field>
          <Field label="Appointment Time" required>
            <Select value={slot} onValueChange={setSlot}>
              <SelectTrigger className="h-10 rounded-none border-foreground/20 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {SLOTS.map((s) => (
                  <SelectItem key={s} value={s} className="rounded-none">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Address */}
        <Field label="Street Address" required>
          <Input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="123 Main St" className="h-10 rounded-none border-foreground/20 text-sm" />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="City" required>
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Columbus" className="h-10 rounded-none border-foreground/20 text-sm" />
          </Field>
          <Field label="ZIP Code">
            <Input value={zip} onChange={(e) => setZip(e.target.value)} inputMode="numeric" maxLength={10} placeholder="43215" className="h-10 rounded-none border-foreground/20 text-sm" />
          </Field>
        </div>

        {/* Notes */}
        <Field label="Note (optional)">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know?" rows={2} className="rounded-none border-foreground/20 text-sm" />
        </Field>

        {/* Submit */}
        <button
          type="button"
          disabled={!canSubmit || submitting}
          onClick={submit}
          className="inline-flex h-12 w-full items-center justify-center gap-2 bg-flame font-display text-sm font-bold uppercase tracking-wider text-primary shadow-[0_6px_16px_oklch(0.78_0.19_92/0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CalendarCheck className="h-4 w-4" />
          {submitting ? "Booking…" : "Submit Booking"}
        </button>

        <p className="flex items-center justify-center gap-1.5 pt-0.5 text-[11px] text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#E63A1F]" />
          No card. No spam. Appointment confirmation email within 10 minutes.
        </p>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
        {label} {required && <span className="text-[#E63A1F]">*</span>}
      </Label>
      {children}
    </div>
  );
}
