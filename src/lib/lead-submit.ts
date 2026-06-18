import { supabase } from "@/integrations/supabase/client";

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
  };
}

export async function submitLead(payload: LeadPayload) {
  const cleaned = normalizeLeadPayload(payload);
  let serverError = "";

  try {
    const res = await fetch("/api/public/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleaned),
    });

    if (res.ok) return { saved: true, via: "server" as const };

    try {
      const body = await res.json();
      serverError = typeof body?.error === "string" ? body.error : `HTTP ${res.status}`;
    } catch {
      serverError = `HTTP ${res.status}`;
    }
    if (res.status < 500) throw new Error(serverError || "Invalid lead details");
  } catch (error) {
    serverError = error instanceof Error ? error.message : "Network error";
    if (serverError !== "Network error" && !serverError.includes("Failed to fetch")) throw error;
  }

  const failureNote = `[Auto: server submission failed${serverError ? ` — ${serverError}` : ""}]`;
  const { error: fallbackError } = await supabase.from("leads").insert({
    source: `${cleaned.source ?? "Website form"} [NO EMAIL SENT]`.slice(0, 60),
    name: cleaned.name ?? null,
    phone: cleaned.phone ?? null,
    email: cleaned.email ?? null,
    service: cleaned.service ?? null,
    city: cleaned.city ?? null,
    address: cleaned.address ?? null,
    preferred_date: cleaned.date ?? null,
    time_window: cleaned.timeWindow ?? null,
    notes: cleaned.notes ? `${cleaned.notes}\n\n${failureNote}` : failureNote,
  });

  if (fallbackError) throw fallbackError;
  return { saved: true, via: "fallback" as const };
}