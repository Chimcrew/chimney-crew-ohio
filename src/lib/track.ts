/**
 * Lightweight wrapper around Google Ads' `gtag_report_conversion`
 * injected in src/routes/__root.tsx. Safe to call on the server
 * (it no-ops) and safe to call even if gtag failed to load.
 */
export function reportAdsConversion(redirectUrl?: string): void {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as {
    gtag_report_conversion?: (url?: string) => boolean;
  }).gtag_report_conversion;
  try {
    if (typeof fn === "function") {
      fn(redirectUrl);
    } else if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  } catch {
    if (redirectUrl) window.location.href = redirectUrl;
  }
}