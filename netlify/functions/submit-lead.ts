import { notifiedAnyone, processLead } from "./lib/process-lead";
import type { LeadFields } from "./lib/workiz";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function parseBody(body: string | null, isBase64?: boolean): LeadFields {
  if (!body) return {};
  const raw = isBase64 ? Buffer.from(body, "base64").toString("utf8") : body;
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    const out: LeadFields = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string" || typeof value === "boolean") {
        out[key] = String(value);
      }
    }
    return out;
  }
  const params = new URLSearchParams(trimmed);
  const out: LeadFields = {};
  for (const [key, value] of params.entries()) {
    out[key] = value;
  }
  return out;
}

export async function handler(event: {
  httpMethod?: string;
  body?: string | null;
  isBase64Encoded?: boolean;
}) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS, body: "" };
  }
  if (event.httpMethod && event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: "Method not allowed" };
  }

  let data: LeadFields;
  try {
    data = parseBody(event.body ?? null, event.isBase64Encoded);
  } catch {
    return { statusCode: 400, headers: CORS, body: "Invalid body" };
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  if (!name || !phone) {
    return { statusCode: 400, headers: CORS, body: "Name and phone are required" };
  }

  try {
    const result = await processLead(data);
    if (!notifiedAnyone(result)) {
      console.error("Lead accepted but no email was delivered", result);
      return {
        statusCode: 502,
        headers: { ...CORS, "Content-Type": "application/json" },
        body: JSON.stringify({
          ok: false,
          error: "Could not email the office or Workiz. Check RESEND_API_KEY.",
          result,
        }),
      };
    }
    return {
      statusCode: 200,
      headers: { ...CORS, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, result }),
    };
  } catch (error) {
    console.error("submit-lead failed", error);
    return {
      statusCode: 500,
      headers: CORS,
      body: error instanceof Error ? error.message : "Failed to submit lead",
    };
  }
}
