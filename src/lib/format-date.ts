/**
 * The two date formats the booking flow needs, without pulling in date-fns.
 *
 * `date-fns` was a static import of ScheduleWidget, which the homepage renders
 * inline, so ~91 KB of rendered module source landed in the shared entry chunk
 * to produce exactly two strings. These helpers emit byte-identical output to
 * the `format(date, …)` calls they replace, using local date parts the same way
 * date-fns does with the default en-US locale.
 *
 * The `EEE, MMM d, yyyy` string is written into the lead payload's `date` field
 * and echoed in the booking confirmation toast, so its shape is load-bearing —
 * keep these tables and the padding rules exactly as they are.
 */

// date-fns en-US `EEE` (abbreviated weekday), indexed by Date#getDay().
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

// date-fns en-US `MMM` (abbreviated month), indexed by Date#getMonth().
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Equivalent to date-fns `format(date, "yyyy-MM-dd")`. */
export function formatIsoDate(date: Date): string {
  return `${String(date.getFullYear()).padStart(4, "0")}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

/** Equivalent to date-fns `format(date, "EEE, MMM d, yyyy")` — e.g. "Tue, Sep 2, 2026". */
export function formatLongDate(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
