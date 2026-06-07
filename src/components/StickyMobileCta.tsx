import { Phone, CalendarCheck } from "lucide-react";
import { openScheduleDialog } from "@/components/ScheduleWidget";

/**
 * Persistent bottom action bar — mobile only.
 * Two primary conversion actions, always thumb-reachable.
 */
export function StickyMobileCta() {
  return (
    <>
      {/* Spacer so content above the bar isn't covered at the page bottom */}
      <div className="h-16 md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-flame/30 bg-primary/95 backdrop-blur-xl shadow-[0_-8px_30px_oklch(0_0_0/0.4)] md:hidden">
        <div className="grid grid-cols-2 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <a
            href="tel:6146834422"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition active:scale-95"
            aria-label="Call ChimCrew now"
          >
            <Phone className="h-4 w-4 text-flame" /> Call Now
          </a>
          <button
            type="button"
            onClick={() => openScheduleDialog()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-display text-xs font-bold uppercase tracking-widest text-flame shadow-flame transition hover:bg-flame hover:text-primary active:scale-95"
            aria-label="Schedule a free inspection"
          >
            <CalendarCheck className="h-4 w-4" /> Schedule Free Inspection
          </button>
        </div>
      </div>
    </>
  );
}