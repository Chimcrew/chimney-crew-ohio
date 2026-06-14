import { Phone, CalendarCheck, MessageSquare } from "lucide-react";
import { openScheduleDialog } from "@/components/ScheduleWidget";

/**
 * Persistent bottom action bar — mobile only.
 * Three primary conversion actions (Call · Text · Schedule) — thumb-reachable.
 */
export function StickyMobileCta() {
  return (
    <>
      {/* Spacer so content above the bar isn't covered at the page bottom */}
      <div className="h-16 md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-flame/30 bg-primary/95 backdrop-blur-xl shadow-[0_-8px_30px_oklch(0_0_0/0.4)] md:hidden">
        <div className="grid grid-cols-3 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <a
            href="tel:6146835763"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-white/15 bg-white/5 px-2 py-3 font-display text-[11px] font-extrabold uppercase tracking-wider text-primary-foreground transition active:scale-95"
            aria-label="Call ChimCrew now"
          >
            <Phone className="h-4 w-4 text-flame" /> Call
          </a>
          <a
            href="sms:6146835763?&body=Hi%20ChimCrew%2C%20I%27d%20like%20a%20free%20chimney%20inspection."
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-white/15 bg-white/5 px-2 py-3 font-display text-[11px] font-extrabold uppercase tracking-wider text-primary-foreground transition active:scale-95"
            aria-label="Text ChimCrew now"
          >
            <MessageSquare className="h-4 w-4 text-flame" /> Text
          </a>
          <button
            type="button"
            onClick={() => openScheduleDialog()}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-flame px-2 py-3 font-display text-[11px] font-extrabold uppercase tracking-wider text-primary shadow-[0_6px_18px_oklch(0.78_0.19_92/0.45)] transition active:scale-95"
            aria-label="Book a free inspection"
          >
            <CalendarCheck className="h-4 w-4" /> Free Inspect
          </button>
        </div>
      </div>
    </>
  );
}