import { useState, useEffect, useCallback } from "react";
import { CalendarCheck, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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

function ScheduleFlow({ variant, onDone }: { variant: "dialog" | "inline"; onDone?: () => void }) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string>("sweep");
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("mid");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const svc = services.find((s) => s.id === serviceId)!;
  const slt = slots.find((s) => s.id === slot)!;

  const canAdvance =
    (step === 0 && !!serviceId) ||
    (step === 1 && !!date && !!slot) ||
    (step === 2 && name.trim().length > 1 && phone.replace(/\D/g, "").length >= 7 && address.trim().length > 3);

  const submit = useCallback(() => {
    setSubmitting(true);
    void fetch('/api/public/notify-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'Schedule widget',
        name,
        phone,
        service: svc.label,
        address,
        date: date ? format(date, 'EEE, MMM d') : undefined,
        timeWindow: slt.time,
        notes: notes || undefined,
      }),
    }).catch(() => {});
    setTimeout(() => {
      setSubmitting(false);
      onDone?.();
      if (typeof window !== "undefined" && "gtag_report_conversion" in window) {
        (window as any).gtag_report_conversion();
      }
      toast.success("You're on the schedule!", {
        description: `${svc.label} · ${date ? format(date, "EEE, MMM d") : ""} · ${slt.time}. We'll text ${phone} within an hour to confirm.`,
        duration: 7000,
      });
      // reset
      setStep(0);
      setName(""); setPhone(""); setAddress(""); setNotes("");
    }, 700);
  }, [svc, slt, date, phone, onDone, address, name, notes]);

  return (
    <>
          {/* Header bar */}
          <div className="relative overflow-hidden bg-primary px-6 py-6 text-primary-foreground md:px-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-flame/25 blur-3xl" aria-hidden />
            <div className="relative">
              {/* Step indicator */}
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] font-bold transition",
                        i < step && "bg-flame text-primary",
                        i === step && "bg-flame text-primary ring-4 ring-flame/25",
                        i > step && "bg-white/10 text-primary-foreground/60"
                      )}
                    >
                      {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </span>
                    {i < 2 && (
                      <span
                        className={cn(
                          "h-px w-8 transition sm:w-12",
                          i < step ? "bg-flame" : "bg-white/15"
                        )}
                      />
                    )}
                  </div>
                ))}
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/60">
                  Step {step + 1} / 3
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight md:text-[28px]">
                {step === 0 && "What do you need handled?"}
                {step === 1 && "Pick your window."}
                {step === 2 && "Where should we roll up?"}
              </h3>
              <p className="mt-1.5 text-sm text-primary-foreground/70">
                {step === 0 && "Every visit starts with a free inspection — no pressure, no upsells."}
                {step === 1 && "Choose any 2-hour window. We text to confirm."}
                {step === 2 && "One quick form. A real Ohio sweep replies — no robots."}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {step === 0 && (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {services.map((s) => {
                  const Icon = s.icon;
                  const active = s.id === serviceId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceId(s.id)}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition",
                        active
                          ? "border-flame bg-flame/5 shadow-[0_8px_24px_-12px_oklch(0.78_0.19_92/0.5)]"
                          : "border-border bg-card hover:border-flame/50 hover:bg-flame/[0.03]"
                      )}
                    >
                      <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg transition", active ? "bg-flame text-primary" : "bg-secondary text-primary group-hover:bg-flame/15 group-hover:text-flame")}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-bold leading-tight text-primary">{s.label}</p>
                        <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-flame">
                          {s.from}
                        </p>
                      </div>
                      {active && <CheckCircle2 className="h-4 w-4 shrink-0 text-flame" />}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-secondary/30 p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 6}
                    className="pointer-events-auto mx-auto"
                  />
                </div>
                <div>
                  <p className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Pick a 2-hour window</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {slots.map((sl) => {
                      const active = sl.id === slot;
                      return (
                        <button
                          key={sl.id}
                          type="button"
                          onClick={() => setSlot(sl.id)}
                          className={cn(
                            "rounded-xl border p-3 text-left transition",
                            active
                              ? "border-flame bg-flame/5 shadow-[0_6px_18px_-10px_oklch(0.78_0.19_92/0.5)]"
                              : "border-border bg-card hover:border-flame/50"
                          )}
                        >
                          <p className="font-display text-sm font-bold text-primary">{sl.label}</p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{sl.time}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                {/* Summary card */}
                <div className="rounded-2xl border border-flame/20 bg-gradient-to-br from-flame/5 to-transparent p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">Your booking</p>
                  <div className="mt-2 grid gap-2 text-sm">
                    <Row icon={<Sparkles className="h-3.5 w-3.5 text-flame" />} label="Service" value={`${svc.label} · ${svc.from}`} />
                    <Row icon={<CalendarCheck className="h-3.5 w-3.5 text-flame" />} label="Date" value={date ? format(date, "EEEE, MMM d") : "—"} />
                    <Row icon={<Clock className="h-3.5 w-3.5 text-flame" />} label="Window" value={slt.time} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Your name">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="First & last" />
                  </Field>
                  <Field label="Mobile">
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" inputMode="tel" />
                  </Field>
                </div>
                <Field label="Address">
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Columbus OH" />
                </Field>
                <Field label="Anything we should know? (optional)">
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Wood stove, 2-story Cape, last cleaned 2022…" rows={3} />
                </Field>

                <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-flame" />
                  No card. No spam. A real Ohio sweep texts you in &lt; 60 minutes.
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary disabled:opacity-30"
              >
                ← Back
              </button>
              {step < 2 ? (
                <button
                  type="button"
                  disabled={!canAdvance}
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-xl bg-flame px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-flame transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_oklch(0.78_0.19_92/0.7)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canAdvance || submitting}
                  onClick={submit}
                  className="inline-flex items-center gap-2 rounded-xl bg-flame px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-flame transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_oklch(0.78_0.19_92/0.7)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {submitting ? "Booking…" : (<>Lock it in <CalendarCheck className="h-4 w-4" /></>)}
                </button>
              )}
            </div>

            {/* Bottom trust strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-t border-border pt-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3 text-flame" /> Ohio crew</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-flame" /> CSIA Certified</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3 text-flame" /> (614) 683-5763</span>
            </div>
          </div>
    </>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {icon} {label}
      </span>
      <span className="font-display text-sm font-semibold text-primary">{value}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</Label>
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