import { useState, useCallback, useRef } from "react";
import { CheckCircle2, CalendarCheck, Flame, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { reportLeadFormConversion } from "@/lib/track";
import { submitLead } from "@/lib/lead-submit";
import { ConsentCheckboxes } from "@/components/ConsentCheckboxes";

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
  { value: "⭐ Promo – Free Chimney Inspection", label: "⭐ Promo – Free Chimney Inspection", price: "Free" },
  { value: "Chimney Sweep — $99", label: "Chimney Sweep", price: "$99" },
  { value: "Dryer Vent Cleaning — $79", label: "Dryer Vent Cleaning", price: "$79" },
  { value: "Chimney/Fireplace Inspection — $69", label: "Chimney/Fireplace Inspection", price: "$69" },
] as const;

const SLOTS = ["8:00AM-11:00AM", "11:00AM-2:00PM", "2:00PM-5:00PM"];

const STEPS = ["Service", "Contact", "Address"] as const;
/** which wizard step owns each validated field (used to jump to the first error) */
const FIELD_STEP: Record<string, number> = {
  service: 0,
  date: 0,
  slot: 0,
  name: 1,
  phone: 1,
  email: 1,
  smsConsent: 2,
  notRobot: 2,
};

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
  const [smsConsent, setSmsConsent] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [step, setStep] = useState(0);
  const [stepDirection, setStepDirection] = useState<"forward" | "back">("forward");
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const todayStr = date ? format(date, "yyyy-MM-dd") : "";
  const minDateStr = format(new Date(), "yyyy-MM-dd");
  const emailTrimmed = email.trim();
  const emailIsValid = emailTrimmed === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);

  const submit = useCallback(async () => {
    setSubmitError("");
    // Only require the essentials so a customer can always book by phone follow-up.
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) nextErrors.name = "Please enter your name";
    if (phone.replace(/\D/g, "").length < 7) nextErrors.phone = "Enter a phone number we can reach you at";
    if (!emailIsValid) nextErrors.email = "That email doesn't look right — or leave it blank";
    if (!date) nextErrors.date = "Pick a date";
    if (!slot) nextErrors.slot = "Pick a time window";
    if (!service) nextErrors.service = "Choose a service";
    if (!smsConsent) nextErrors.smsConsent = "Please check the box to consent to text messages";
    if (!notRobot) nextErrors.notRobot = "Please confirm you're not a robot";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstKey = Object.keys(nextErrors)[0];
      const errorStep = FIELD_STEP[firstKey] ?? 0;
      setStepDirection(errorStep < step ? "back" : "forward");
      setStep(errorStep);
      const el = fieldRefs.current[firstKey];
      if (el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          (el as HTMLInputElement).focus?.();
        }, 60);
      }
      toast.error("Please fix the highlighted field" + (Object.keys(nextErrors).length > 1 ? "s" : ""), { duration: 5000 });
      return;
    }
    setSubmitting(true);
    const dateStr = date ? format(date, "EEE, MMM d") : undefined;
    const address = [street, city, zip].filter(Boolean).join(", ");
    const pageSuffix = sourcePath ? ` · ${sourcePath}` : "";
    const sourceLabel = `Schedule form${pageSuffix}`.slice(0, 60);
    const payload = {
      source: sourceLabel,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      service,
      city: city.trim() || undefined,
      address: address.trim() || undefined,
      date: dateStr,
      timeWindow: slot,
      notes: notes.trim() || undefined,
      smsConsent,
    };

    try {
      await submitLead(payload);
    } catch (err) {
      setSubmitting(false);
      const msg = err instanceof Error ? err.message : "";
      const friendly =
        "We couldn't submit your booking online. Please call or text (614) 683-5763 and we'll get you on the schedule right now.";
      setSubmitError(friendly + (msg ? ` (Details: ${msg})` : ""));
      toast.error("Booking didn't go through", { description: friendly, duration: 9000 });
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
    setSmsConsent(false);
    setNotRobot(false);
    setStepDirection("back");
    setStep(0);
  }, [date, street, city, zip, sourcePath, name, phone, email, emailIsValid, service, slot, notes, smsConsent, notRobot, step, onDone]);

  /** validate only the fields on the current step before moving forward */
  const goNext = useCallback(() => {
    const next: Record<string, string> = {};
    if (step === 0) {
      if (!service) next.service = "Choose a service";
      if (!date) next.date = "Pick a date";
      if (!slot) next.slot = "Pick a time window";
    }
    if (step === 1) {
      if (name.trim().length < 2) next.name = "Please enter your name";
      if (phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number we can reach you at";
      if (!emailIsValid) next.email = "That email doesn't look right — or leave it blank";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please fix the highlighted field" + (Object.keys(next).length > 1 ? "s" : ""), { duration: 4000 });
      return;
    }
    setStepDirection("forward");
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }, [step, service, date, slot, name, phone, emailIsValid]);

  return (
    <div className="bg-background text-foreground">
      {/* Compact header */}
      <div className="mb-4 border-b border-border pb-3">
        <span className="inline-flex items-center gap-1.5 bg-black px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-flame">
          <Flame className="h-3 w-3" /> ChimCrew · 60-second booking
        </span>
        <h2 className="mt-2 font-display text-xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-2xl">
          Schedule Service Online
        </h2>
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] uppercase tracking-[0.12em] text-foreground/60">
          <ShieldCheck className="h-3 w-3 shrink-0 text-flame" />
          No extra charge · nights · weekends · holidays
        </p>

        {/* Step indicator */}
        <div className="mt-3 grid grid-cols-3 gap-1.5" aria-hidden>
          {STEPS.map((label, i) => (
            <div key={label} className="space-y-1">
              <div className={"h-1 w-full " + (i <= step ? "bg-flame" : "bg-foreground/15")} />
              <span
                className={
                  "block font-mono text-[9px] font-bold uppercase tracking-[0.16em] " +
                  (i <= step ? "text-foreground/80" : "text-foreground/35")
                }
              >
                {i + 1}. {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Compact 3-step form — all fields still submitted together */}
      <form
        className="space-y-2"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (submitting) return;
          if (step < STEPS.length - 1) {
            goNext();
            return;
          }
          void submit();
        }}
      >
        {submitError && (
          <div
            role="alert"
            className="rounded-none border-2 border-[#E63A1F] bg-[#E63A1F]/10 p-3 text-sm text-[#7a1810]"
          >
            <p className="font-bold">{submitError}</p>
            <a
              href="tel:6146835763"
              className="mt-2 inline-flex items-center gap-1 font-display text-sm font-extrabold underline decoration-2 underline-offset-2"
            >
              Tap to call (614) 683-5763
            </a>
          </div>
        )}
        {/* Only the active panel is rendered, so the form stays compact; the
            wrapper animates its height smoothly as steps change. */}
        <div className="grid overflow-hidden transition-all duration-300 ease-out">
        {/* Service — full width, most important */}
        <div
          aria-hidden={step !== 0}
          className={
            "col-start-1 row-start-1 space-y-2 " +
            (step === 0
              ? stepDirection === "forward" ? "schedule-step-forward" : "schedule-step-back"
              : "hidden")
          }
        >
        <Field label="Service Needed" required error={errors.service}>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger className="h-10 rounded-none border-foreground/20 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {SCHEDULE_SERVICES.map((s) => (
                <SelectItem key={s.value} value={s.value} className="rounded-none">
                  {s.label} {s.price === "Free" ? "" : `— Starts from ${s.price}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Date + Time */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Appointment Date" required error={errors.date}>
            <Input
              type="date"
              name="appointment-date"
              aria-label="Appointment Date"
              value={todayStr}
              min={minDateStr}
              onChange={(e) => setDate(e.target.value ? new Date(e.target.value + "T00:00:00") : undefined)}
              className="h-10 rounded-none border-foreground/20 text-sm"
            />
          </Field>
          <Field label="Appointment Time" required error={errors.slot}>
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
        </div>

        {/* ---------- Step 2: contact ---------- */}
        <div
          aria-hidden={step !== 1}
          className={
            "col-start-1 row-start-1 space-y-2 " +
            (step === 1
              ? stepDirection === "forward" ? "schedule-step-forward" : "schedule-step-back"
              : "hidden")
          }
        >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Full Name" required error={errors.name}>
            <Input
              name="name"
              aria-label="Full Name"
              autoComplete="name"
              ref={(el) => { fieldRefs.current.name = el; }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={"h-10 rounded-none text-sm " + (errors.name ? "border-2 border-[#E63A1F]" : "border-foreground/20")}
            />
          </Field>
          <Field label="Phone Number" required error={errors.phone}>
            <Input
              name="phone"
              aria-label="Phone Number"
              autoComplete="tel"
              ref={(el) => { fieldRefs.current.phone = el; }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              className={"h-10 rounded-none text-sm " + (errors.phone ? "border-2 border-[#E63A1F]" : "border-foreground/20")}
            />
          </Field>
        </div>

        {/* Email — optional; used to send a booking confirmation when provided */}
        <Field label="Email (optional — for confirmation)" error={errors.email}>
          <Input
            type="email"
              name="email"
              aria-label="Email (optional — for confirmation)"
              ref={(el) => { fieldRefs.current.email = el; }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
              autoComplete="email"
            placeholder="you@example.com"
            className={"h-10 rounded-none text-sm " + (errors.email ? "border-2 border-[#E63A1F]" : "border-foreground/20")}
          />
        </Field>
        </div>

        {/* ---------- Step 3: address, notes, consent ---------- */}
        <div
          aria-hidden={step !== 2}
          className={
            "col-start-1 row-start-1 space-y-3 " +
            (step === 2
              ? stepDirection === "forward" ? "schedule-step-forward" : "schedule-step-back"
              : "invisible pointer-events-none")
          }
        >
        <Field label="Street Address (optional)">
          <Input
            name="street-address"
            aria-label="Street Address"
            autoComplete="street-address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="123 Main St"
            className="h-10 rounded-none border-foreground/20 text-sm"
          />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="City (optional)">
            <Input
              name="city"
              aria-label="City"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Columbus"
              className="h-10 rounded-none border-foreground/20 text-sm"
            />
          </Field>
          <Field label="ZIP Code">
            <Input
              name="zip"
              aria-label="ZIP Code"
              autoComplete="postal-code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              inputMode="numeric"
              maxLength={10}
              placeholder="43215"
              className="h-10 rounded-none border-foreground/20 text-sm"
            />
          </Field>
        </div>

        {/* Notes */}
        <Field label="Note (optional)">
          <Textarea
            name="notes"
            aria-label="Note (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything we should know?"
            rows={2}
            className="rounded-none border-foreground/20 text-sm"
          />
        </Field>

        <ConsentCheckboxes
          smsConsent={smsConsent}
          setSmsConsent={(value) => {
            setSmsConsent(value);
            if (value) {
              setErrors((current) => {
                const { smsConsent: _cleared, ...remaining } = current;
                return remaining;
              });
            }
          }}
          notRobot={notRobot}
          setNotRobot={(value) => {
            setNotRobot(value);
            if (value) {
              setErrors((current) => {
                const { notRobot: _cleared, ...remaining } = current;
                return remaining;
              });
            }
          }}
          error={errors.smsConsent || errors.notRobot}
        />
        </div>
        </div>

        {/* Navigation — one primary action per step */}
        <div className="flex items-center gap-2 pt-1">
          {step > 0 && (
            <button
              type="button"
              onClick={() => {
                setStepDirection("back");
                setStep((s) => Math.max(0, s - 1));
              }}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 border-2 border-foreground/20 px-4 font-display text-xs font-bold uppercase tracking-wider text-foreground/80 transition hover:border-foreground/40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 w-full min-w-0 items-center justify-center gap-2 bg-flame font-display text-sm font-bold uppercase tracking-wider text-primary shadow-[0_6px_16px_oklch(0.78_0.19_92/0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step < STEPS.length - 1 ? (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <CalendarCheck className="h-4 w-4" />
                {submitting ? "Booking…" : "Submit Booking"}
              </>
            )}
          </button>
        </div>

        <p className="flex items-center justify-center gap-1.5 pt-0.5 text-[11px] text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#E63A1F]" />
          No card. No spam. Appointment confirmation email within 10 minutes.
        </p>
      </form>
    </div>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
        {label} {required && <span className="text-[#E63A1F]">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs font-semibold text-[#E63A1F]">{error}</p>}
    </div>
  );
}
