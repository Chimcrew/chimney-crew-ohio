import { useState, useEffect, useCallback } from "react";
import { CalendarCheck, Phone, Flame, MapPin, Sparkles, Clock, ArrowRight, Wrench, Search, Droplets, ShieldCheck, HardHat, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const OPEN_EVENT = "chimcrew:open-schedule";

export function openScheduleDialog() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }
}

const services = [
  { id: "sweep", label: "Chimney Sweep", icon: Sparkles, from: "$189" },
  { id: "inspect", label: "Camera Inspection", icon: Search, from: "$129" },
  { id: "repair", label: "Repair / Tuckpoint", icon: Wrench, from: "$650" },
  { id: "waterproof", label: "Waterproof & Cap", icon: ShieldCheck, from: "$349" },
  { id: "crown", label: "Crown Seal Repair", icon: HardHat, from: "$489" },
  { id: "leak", label: "Leak Diagnosis", icon: Droplets, from: "$99" },
];

const slots = [
  { id: "early", label: "Early", time: "8–10 AM" },
  { id: "mid",   label: "Mid morning", time: "10 AM – 12 PM" },
  { id: "lunch", label: "Lunch", time: "12 – 2 PM" },
  { id: "afternoon", label: "Afternoon", time: "2 – 4 PM" },
  { id: "evening", label: "Evening", time: "4 – 6 PM" },
];

export function ScheduleWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string>("sweep");
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("mid");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [rush, setRush] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setStep(0);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

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
        notes: rush ? `RUSH callback requested. ${notes}` : (notes || undefined),
      }),
    }).catch(() => {});
    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      toast.success("You're on the schedule!", {
        description: `${svc.label} · ${date ? format(date, "EEE, MMM d") : ""} · ${slt.time}. We'll text ${phone} within an hour to confirm.`,
        duration: 7000,
      });
      // reset
      setStep(0);
      setName(""); setPhone(""); setAddress(""); setNotes(""); setRush(false);
    }, 700);
  }, [svc, slt, date, phone]);

  return (
    <>
      <StickyCta onClick={() => { setStep(0); setOpen(true); }} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-2 border-flame/30 bg-card p-0 sm:max-w-xl [&>button.absolute]:right-3 [&>button.absolute]:top-3 [&>button.absolute]:z-10 [&>button.absolute]:flex [&>button.absolute]:h-9 [&>button.absolute]:w-9 [&>button.absolute]:items-center [&>button.absolute]:justify-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-flame/40 [&>button.absolute]:bg-primary/70 [&>button.absolute]:text-primary-foreground [&>button.absolute]:opacity-100 [&>button.absolute]:shadow-[0_4px_12px_oklch(0_0_0/0.4)] [&>button.absolute]:backdrop-blur [&>button.absolute]:transition [&>button.absolute:hover]:bg-flame [&>button.absolute:hover]:text-primary [&>button.absolute_svg]:h-5 [&>button.absolute_svg]:w-5">
          {/* Header bar */}
          <div className="relative overflow-hidden rounded-t-lg bg-primary px-6 py-5 text-primary-foreground">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-flame/30 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
            <DialogHeader className="relative space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-flame/40 bg-flame/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-flame">
                  <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-flame" /> Live availability
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/80">
                  Step {step + 1} / 3
                </span>
              </div>
              <DialogTitle className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                {step === 0 && "What do you need handled?"}
                {step === 1 && "Pick your window."}
                {step === 2 && "Where should we roll up?"}
              </DialogTitle>
              <DialogDescription className="text-primary-foreground/70">
                {step === 0 && "Choose the service — we'll confirm a flat-rate quote before any work starts."}
                {step === 1 && "We text to confirm within the hour. If we're late, your inspection is on us."}
                {step === 2 && "One quick form. A real Ohio sweep calls you back — no robots."}
              </DialogDescription>
            </DialogHeader>

            {/* progress bar */}
            <div className="relative mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 bg-flame transition-all duration-500"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {step === 0 && (
              <div className="grid grid-cols-2 gap-2.5">
                {services.map((s) => {
                  const Icon = s.icon;
                  const active = s.id === serviceId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceId(s.id)}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl border-2 p-3 text-left transition",
                        active
                          ? "border-flame bg-flame/10 shadow-flame"
                          : "border-border bg-card hover:border-flame/60 hover:-translate-y-0.5"
                      )}
                    >
                      <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg transition", active ? "bg-flame text-primary" : "bg-primary text-flame")}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold leading-tight text-primary">{s.label}</p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">From {s.from}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div className="rounded-2xl border-2 border-border bg-secondary/40 p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0}
                    className="pointer-events-auto mx-auto"
                  />
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Pick a 2-hour window</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {slots.map((sl) => {
                      const active = sl.id === slot;
                      return (
                        <button
                          key={sl.id}
                          type="button"
                          onClick={() => setSlot(sl.id)}
                          className={cn(
                            "rounded-xl border-2 p-3 text-left transition",
                            active
                              ? "border-flame bg-flame/10 shadow-flame"
                              : "border-border bg-card hover:border-flame/60"
                          )}
                        >
                          <p className="font-display text-sm font-bold text-primary">{sl.label}</p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{sl.time}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRush(!rush)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition",
                    rush ? "border-flame bg-flame/10" : "border-border bg-card hover:border-flame/60"
                  )}
                >
                  <div className={cn("grid h-9 w-9 place-items-center rounded-lg transition", rush ? "bg-flame text-primary" : "bg-primary text-flame")}>
                    <Flame className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-sm font-bold text-primary">Rush me to the front of the line</p>
                    <p className="text-xs text-muted-foreground">Same-day callback within 15 min · no extra cost</p>
                  </div>
                  <div className={cn("grid h-6 w-10 items-center rounded-full p-0.5 transition", rush ? "bg-flame" : "bg-border")}>
                    <span className={cn("h-5 w-5 rounded-full bg-white shadow transition-transform", rush ? "translate-x-4" : "translate-x-0")} />
                  </div>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {/* Summary card */}
                <div className="rounded-2xl border-2 border-primary/15 bg-secondary/40 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flame">Your booking</p>
                  <div className="mt-2 grid gap-2 text-sm">
                    <Row icon={<Sparkles className="h-3.5 w-3.5 text-flame" />} label="Service" value={`${svc.label} · from ${svc.from}`} />
                    <Row icon={<CalendarCheck className="h-3.5 w-3.5 text-flame" />} label="Date" value={date ? format(date, "EEEE, MMM d") : "—"} />
                    <Row icon={<Clock className="h-3.5 w-3.5 text-flame" />} label="Window" value={slt.time} />
                    {rush && <Row icon={<Flame className="h-3.5 w-3.5 text-flame" />} label="Priority" value="Rush callback (15 min)" />}
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
            <div className="mt-6 flex items-center justify-between gap-3">
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
                  className="inline-flex items-center gap-2 rounded-xl bg-flame px-5 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-flame transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canAdvance || submitting}
                  onClick={submit}
                  className="inline-flex items-center gap-2 rounded-xl bg-flame px-5 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-flame transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Booking…" : (<>Lock it in <CalendarCheck className="h-4 w-4" /></>)}
                </button>
              )}
            </div>

            {/* Bottom trust strip */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-t border-border pt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3 text-flame" /> Ohio crew</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-flame" /> CSIA Certified</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3 text-flame" /> (614) 549-1954</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
            href="tel:6145491954"
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