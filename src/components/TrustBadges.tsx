import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  "Free Inspections",
  "Certified Technicians",
  "Fully Insured",
  "Written Warranty",
];

/**
 * Compact trust strip designed to sit directly next to or below any lead form.
 * Variants: "light" (on dark backgrounds) and "dark" (on light card surfaces).
 */
export function TrustBadges({
  variant = "dark",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const light = variant === "light";
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-4",
        className,
      )}
    >
      {ITEMS.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 font-display text-[11px] font-extrabold uppercase tracking-[0.05em] leading-tight",
            light
              ? "border-flame/40 bg-white/[0.04] text-primary-foreground"
              : "border-flame/30 bg-flame/[0.06] text-primary",
          )}
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-flame" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}