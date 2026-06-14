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

/**
 * Fire a Google Ads conversion specifically for phone-call clicks.
 * Today it uses the same label as the generic conversion — when you
 * create a dedicated "Phone call" conversion in Google Ads, swap the
 * send_to value inside __root.tsx's gtag_report_call() helper.
 */
export function reportCallConversion(): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag_report_call?: () => boolean;
    gtag_report_conversion?: (url?: string) => boolean;
  };
  try {
    if (typeof w.gtag_report_call === "function") {
      w.gtag_report_call();
    } else if (typeof w.gtag_report_conversion === "function") {
      w.gtag_report_conversion();
    }
  } catch {
    /* ignore */
  }
}

/**
 * Fire a Google Ads conversion specifically for lead-form submissions.
 * Same note as above — swap the send_to label once a dedicated
 * "Lead form" conversion exists in Google Ads.
 */
export function reportLeadFormConversion(): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag_report_lead?: () => boolean;
    gtag_report_conversion?: (url?: string) => boolean;
  };
  try {
    if (typeof w.gtag_report_lead === "function") {
      w.gtag_report_lead();
    } else if (typeof w.gtag_report_conversion === "function") {
      w.gtag_report_conversion();
    }
  } catch {
    /* ignore */
  }
}