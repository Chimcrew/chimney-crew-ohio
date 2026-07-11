import { Checkbox } from "@/components/ui/checkbox";

export interface ConsentCheckboxesProps {
  smsConsent: boolean;
  setSmsConsent: (v: boolean) => void;
  notRobot: boolean;
  setNotRobot: (v: boolean) => void;
  error?: string;
  variant?: "light" | "dark";
}

export function ConsentCheckboxes({
  smsConsent,
  setSmsConsent,
  notRobot,
  setNotRobot,
  error,
  variant = "light",
}: ConsentCheckboxesProps) {
  const labelCls =
    variant === "dark"
      ? "text-xs leading-relaxed text-primary-foreground/80"
      : "text-xs leading-relaxed text-muted-foreground";
  const linkCls =
    variant === "dark"
      ? "underline hover:text-primary-foreground"
      : "underline hover:text-foreground";
  const boxCls =
    variant === "dark"
      ? "border-white/30 data-[state=checked]:bg-flame data-[state=checked]:text-primary"
      : "";

  return (
    <div className="space-y-3">
      <label className="flex items-start gap-2.5 cursor-pointer">
        <Checkbox
          checked={smsConsent}
          onCheckedChange={(v) => setSmsConsent(v === true)}
          className={boxCls}
          aria-label="Consent to receive text messages"
        />
        <span className={labelCls}>
          By checking this box, I consent to receive text messages related to orders, service appointments, or other relevant information. You can reply STOP at any time to opt out. Message and data rates may apply. Message frequency may vary. For more information, please refer to our{" "}
          <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className={linkCls}>
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/legal/terms#sms" target="_blank" rel="noopener noreferrer" className={linkCls}>
            SMS Terms and Conditions
          </a>
          .
        </span>
      </label>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <Checkbox
          checked={notRobot}
          onCheckedChange={(v) => setNotRobot(v === true)}
          className={boxCls}
          aria-label="I'm not a robot"
        />
        <span className={labelCls}>I&apos;m not a robot</span>
      </label>

      {error && <p className="text-xs font-semibold text-[#E63A1F]">{error}</p>}
    </div>
  );
}
