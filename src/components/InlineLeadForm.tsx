import { useState } from "react";
import { CalendarCheck, CheckCircle2, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { reportLeadFormConversion } from "@/lib/track";
import { submitLead } from "@/lib/lead-submit";
import { ConsentCheckboxes } from "@/components/ConsentCheckboxes";

type Props = {
  source?: string;
  title?: string;
  subtitle?: string;
  tone?: "light" | "dark";
};

const TEL = "tel:6146835763";
const TEL_DISPLAY = "(614) 683-5763";

export function InlineLeadForm({
  source = "Home hero inline form",
  title = "Book your free inspection",
  subtitle = "Takes ~30 seconds. Appointment confirmation emailed within 10 minutes.",
  tone = "light",
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isDark = tone === "dark";
  const cardCls = isDark
    ? "rounded-none border border-white/15 bg-white/[0.06] p-5 backdrop-blur sm:p-6 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.55)]"
    : "rounded-none border border-border/60 bg-card p-5 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.25)] sm:p-6";
  const titleCls = isDark
    ? "font-display text-xl font-extrabold tracking-tight text-primary-foreground"
    : "font-display text-xl font-extrabold tracking-tight";
  const subCls = isDark ? "mt-1 text-sm text-primary-foreground/70" : "mt-1 text-sm text-muted-foreground";
  const inputCls = isDark
    ? "h-12 rounded-none border border-white/20 bg-white/[0.06] px-4 text-base text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-flame"
    : "h-12 rounded-none border border-foreground/15 bg-background px-4 text-base outline-none focus:border-flame";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const missing: string[] = [];
    if (name.trim().length < 2) missing.push("your name");
    if (phone.replace(/\D/g, "").length < 7) missing.push("phone number");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) missing.push("valid email");
    if (missing.length) {
      toast.error("Please add: " + missing.join(", "));
      return;
    }
    setSubmitting(true);
    try {
      const path = typeof window !== "undefined" ? window.location.pathname : "";
      const pageSuffix = path ? ` · ${path}` : "";
      const sourceLabel = `${source}${pageSuffix}`.slice(0, 60);
      await submitLead({
        source: sourceLabel,
        name,
        phone,
        email,
        city: zip,
        service: "Free chimney inspection",
      });
      reportLeadFormConversion();
      setDone(true);
      toast.success("Request received — check your email for the appointment confirmation within 10 minutes.");
    } catch {
      toast.error("Something went wrong. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className={cardCls + " text-center"}>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-flame/15 text-flame">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h2 className={"mt-3 " + titleCls}>You're booked in.</h2>
        <p className={subCls}>We'll email your appointment confirmation within 10 minutes.</p>
        <a
          href={TEL}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-none bg-flame px-4 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-primary"
        >
          <Phone className="h-4 w-4" /> Call {TEL_DISPLAY}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cardCls}>
      <h2 className={titleCls}>{title}</h2>
      <p className={subCls}>{subtitle}</p>
      <div className="mt-4 grid gap-3">
        <input
          type="text"
          required
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputCls}
          aria-label="Your name"
        />
        <input
          type="tel"
          required
          maxLength={30}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className={inputCls}
          aria-label="Phone number"
          inputMode="tel"
        />
        <div className="relative">
          <Mail className={"pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 " + (isDark ? "text-primary-foreground/60" : "text-muted-foreground")} />
          <input
            type="email"
            required
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email for confirmation"
            className={inputCls + " w-full pl-9"}
            aria-label="Email"
          />
        </div>
        <div className="relative">
          <MapPin className={"pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 " + (isDark ? "text-primary-foreground/60" : "text-muted-foreground")} />
          <input
            type="text"
            maxLength={20}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="ZIP code (optional)"
            className={inputCls + " w-full pl-9"}
            aria-label="ZIP code"
            inputMode="numeric"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-flame font-display text-sm font-extrabold uppercase tracking-wider text-primary shadow-[0_6px_18px_oklch(0.78_0.19_92/0.45)] transition active:scale-95 disabled:opacity-70"
        >
          <CalendarCheck className="h-5 w-5" />
          {submitting ? "Sending…" : "Schedule free inspection"}
        </button>
      </div>
    </form>
  );
}

export default InlineLeadForm;