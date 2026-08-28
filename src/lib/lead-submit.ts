export const NETLIFY_FORM_NAME = "chimcrew-lead";
/** Static HTML file Netlify registers at deploy time. Kept for form detection. */
export const NETLIFY_FORM_ENDPOINT = "/netlify-forms.html";
export const OWNER_NOTIFY_EMAIL = "theductorsairduct@gmail.com";

export type LeadPayload = {
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  city?: string;
  address?: string;
  date?: string;
  timeWindow?: string;
  notes?: string;
  smsConsent?: boolean;
};

function clean(value?: string | null) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed.length ? trimmed : undefined;
}

export function normalizeLeadPayload(payload: LeadPayload): LeadPayload {
  return {
    source: clean(payload.source),
    name: clean(payload.name),
    phone: clean(payload.phone),
    email: clean(payload.email),
    service: clean(payload.service),
    city: clean(payload.city),
    address: clean(payload.address),
    date: clean(payload.date),
    timeWindow: clean(payload.timeWindow),
    notes: clean(payload.notes),
    smsConsent: payload.smsConsent === true,
  };
}

function submitEndpoint() {
  if (typeof window === "undefined") return "/.netlify/functions/submit-lead";
  const host = window.location.hostname;
  if (host === "chimcrew.com" || host === "www.chimcrew.com") {
    return "https://chimcrew.com/.netlify/functions/submit-lead";
  }
  return "/.netlify/functions/submit-lead";
}

export async function submitLead(payload: LeadPayload) {
  const cleaned = normalizeLeadPayload(payload);
  if (!cleaned.name || !cleaned.phone) {
    throw new Error("Name and phone are required");
  }

  const res = await fetch(submitEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleaned),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Form submission failed (${res.status})${detail ? `: ${detail.slice(0, 180)}` : ""}`,
    );
  }

  return { saved: true, via: "function" as const };
}
