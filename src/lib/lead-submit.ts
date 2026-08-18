export const NETLIFY_FORM_NAME = "chimcrew-lead";
/** Static HTML file Netlify registers at deploy time. POST here so SSR does not swallow the form. */
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

function encode(payload: LeadPayload): string {
  const cleaned = normalizeLeadPayload(payload);
  const body = new URLSearchParams();
  body.set("form-name", NETLIFY_FORM_NAME);
  body.set("bot-field", "");
  body.set("name", cleaned.name ?? "");
  body.set("phone", cleaned.phone ?? "");
  body.set("email", cleaned.email ?? "");
  body.set("service", cleaned.service ?? "");
  body.set("city", cleaned.city ?? "");
  body.set("address", cleaned.address ?? "");
  body.set("date", cleaned.date ?? "");
  body.set("timeWindow", cleaned.timeWindow ?? "");
  body.set("notes", cleaned.notes ?? "");
  body.set("source", cleaned.source ?? "Website form");
  body.set("smsConsent", cleaned.smsConsent ? "yes" : "no");
  return body.toString();
}

export async function submitLead(payload: LeadPayload) {
  const cleaned = normalizeLeadPayload(payload);
  if (!cleaned.name || !cleaned.phone) {
    throw new Error("Name and phone are required");
  }

  const res = await fetch(NETLIFY_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(cleaned),
  });

  if (!res.ok) {
    throw new Error(`Form submission failed (${res.status})`);
  }

  return { saved: true, via: "netlify" as const };
}
