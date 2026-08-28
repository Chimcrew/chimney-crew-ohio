import { processLead } from "./lib/process-lead";
import type { LeadFields } from "./lib/workiz";

type SubmissionEvent = {
  payload?: {
    data?: LeadFields;
  };
};

export async function handler(event: { body?: string | null }) {
  if (!event.body) {
    return { statusCode: 400, body: "Missing body" };
  }

  let parsed: SubmissionEvent;
  try {
    parsed = JSON.parse(event.body) as SubmissionEvent;
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const data = parsed.payload?.data ?? {};
  const result = await processLead(data);
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, ...result }),
  };
}
