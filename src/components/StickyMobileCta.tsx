import { Phone, CalendarCheck, MessageSquare } from "lucide-react";
import { openScheduleDialog } from "@/components/ScheduleWidget";

/**
 * Persistent action bar pinned directly UNDER the mobile header — mobile only.
 * Three primary conversion actions (Call · Text · Schedule). Sticks while scrolling.
 */
export function StickyMobileCta() {
  return (
    <>
      {/* Top spacing is reserved by SiteHeader's combined spacer */}
      <div className="fixed inset-x-0 top-[60px] z-[55] border-y border-flame/40 bg-primary text-primary-foreground shadow-[0_6px_20px_oklch(0_0_0/0.35)] md:hidden">
        <div className="grid grid-cols-3">
          <a
            href="tel:6146835763"
            data-cta
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="inline-flex items-center justify-center gap-1.5 border-r border-white/10 bg-[#E63A1F] px-2 py-2 text-[12px] font-extrabold uppercase tracking-wider text-white transition active:scale-[0.98]"
            aria-label="Call ChimCrew now"
          >
            <Phone className="h-3.5 w-3.5" /> Call
          </a>
          <a
            href="sms:6146835763?&body=Hi%20ChimCrew%2C%20I%27d%20like%20a%20free%20chimney%20inspection."
            data-cta
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="inline-flex items-center justify-center gap-1.5 border-r border-white/10 bg-primary px-2 py-2 text-[12px] font-extrabold uppercase tracking-wider text-primary-foreground transition active:scale-[0.98]"
            aria-label="Text ChimCrew now"
          >
            <MessageSquare className="h-3.5 w-3.5 text-flame" /> Text
          </a>
          <button
            type="button"
            onClick={() => openScheduleDialog()}
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="inline-flex items-center justify-center gap-1.5 bg-flame px-2 py-2 text-[12px] font-extrabold uppercase tracking-wider text-primary transition active:scale-[0.98]"
            aria-label="Schedule appointment online"
          >
            <CalendarCheck className="h-3.5 w-3.5" /> Schedule
          </button>
        </div>
      </div>
    </>
  );
}