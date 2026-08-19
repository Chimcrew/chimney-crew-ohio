import {
  createWorkizLead,
  workizInboundEmail,
  workizInboundHtml,
  workizInboundText,
} from "./lib/workiz";

const PHONE = "(614) 683-5763";
const DELAY_MS = 5 * 60 * 1000;
const OWNER_EMAIL = "theductorsairduct@gmail.com";

type SubmissionEvent = {
  payload?: {
    data?: Record<string, string | undefined>;
  };
};

function field(data: Record<string, string | undefined> | undefined, key: string) {
  const value = data?.[key];
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function kv(label: string, value: string) {
  return `<p style="margin:4px 0;font-size:14px;color:#1a1a1a;line-height:1.5"><span style="color:#6b7280;font-weight:700">${label} · </span>${value}</p>`;
}

function confirmationHtml(data: Record<string, string | undefined>) {
  const first = escapeHtml(field(data, "name").split(" ")[0] || "there");
  const service = escapeHtml(field(data, "service") || "Free chimney inspection");
  const city = escapeHtml(field(data, "city"));
  const date = escapeHtml(field(data, "date"));
  const timeWindow = escapeHtml(field(data, "timeWindow"));
  const address = escapeHtml(field(data, "address"));
  const phone = escapeHtml(field(data, "phone"));

  const details = [
    kv("Status", `<span style="color:#15803d;font-weight:800">Confirmed</span>`),
    kv("Service", service),
    city ? kv("Area", city) : "",
    address ? kv("Address", address) : "",
    date ? kv("Date", date) : "",
    timeWindow ? kv("Window", timeWindow) : "",
    phone ? kv("Phone", phone) : "",
  ]
    .filter(Boolean)
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:0">
    <div style="background:#0B0F19;padding:18px 28px;border-bottom:4px solid #FACC15">
      <p style="margin:0;color:#FACC15;font-size:18px;font-weight:800;letter-spacing:0.18em">CHIMCREW</p>
    </div>
    <div style="margin:22px 28px 8px">
      <p style="display:inline-block;background:#dcfce7;color:#15803d;font-size:12px;font-weight:800;letter-spacing:0.12em;padding:6px 12px;border-radius:999px;margin:0">✓ APPOINTMENT CONFIRMED</p>
    </div>
    <h1 style="font-size:24px;font-weight:800;color:#0B0F19;margin:8px 28px 8px;line-height:1.25">You're all set, ${first}.</h1>
    <p style="font-size:15px;color:#3f4756;margin:0 28px 22px;line-height:1.55">
      Your appointment with ChimCrew is officially confirmed. A CSIA-certified tech is on the schedule for your job.
    </p>
    <div style="background:#f7f7f5;border-radius:10px;padding:16px 18px;margin:0 28px 18px;border:1px solid #ececec">
      <p style="margin:0 0 10px;font-size:11px;font-weight:800;color:#0B0F19;text-transform:uppercase;letter-spacing:0.14em">Appointment details</p>
      ${details}
    </div>
    <div style="background:#0B0F19;border-radius:10px;padding:18px 22px;margin:0 28px 18px;border-left:6px solid #FACC15">
      <p style="margin:0 0 10px;font-size:11px;font-weight:800;color:#FACC15;text-transform:uppercase;letter-spacing:0.14em">What to expect</p>
      <p style="margin:4px 0;font-size:14px;color:#ffffff;line-height:1.55">• Your tech will call 30 minutes before arrival.</p>
      <p style="margin:4px 0;font-size:14px;color:#ffffff;line-height:1.55">• Full inspection report and photos delivered same day.</p>
      <p style="margin:4px 0;font-size:14px;color:#ffffff;line-height:1.55">• No-pressure, upfront pricing on anything we recommend.</p>
    </div>
    <p style="font-size:14px;color:#1a1a1a;margin:8px 28px 10px;text-align:center">Need to reschedule or add details?</p>
    <a href="tel:6146835763" style="background:#FACC15;color:#0B0F19;border-radius:10px;padding:14px 24px;font-size:15px;font-weight:800;text-decoration:none;display:block;text-align:center;margin:0 28px">Call ${PHONE}</a>
    <hr style="border:none;border-top:1px solid #ececec;margin:24px 28px" />
    <p style="font-size:12px;color:#888;margin:0 28px 24px;line-height:1.5">ChimCrew — CSIA-certified chimney sweeps serving Columbus, Cincinnati, Dayton &amp; all of Central Ohio.</p>
  </div>
</body>
</html>`;
}

async function sendWithResend(
  to: string,
  subject: string,
  html: string,
  scheduledAt?: string,
  text?: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.CONFIRM_FROM_EMAIL || "ChimCrew <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(text ? { text } : {}),
      ...(scheduledAt ? { scheduled_at: scheduledAt } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
  return true;
}

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
  const workiz: Record<string, unknown> = {};

  try {
    const created = await createWorkizLead(data);
    workiz.api = created;
  } catch (error) {
    console.error("Workiz API lead create failed", error);
    workiz.api = { ok: false, error: error instanceof Error ? error.message : String(error) };
  }

  try {
    const inbound = workizInboundEmail();
    const sent = await sendWithResend(
      inbound,
      `New ChimCrew appointment: ${field(data, "name") || "Website lead"}`,
      workizInboundHtml(data),
      undefined,
      workizInboundText(data),
    );
    workiz.email = sent ? { ok: true, to: inbound } : { skipped: "missing RESEND_API_KEY" };
  } catch (error) {
    console.error("Workiz inbound email failed", error);
    workiz.email = { ok: false, error: error instanceof Error ? error.message : String(error) };
  }

  const clientEmail = field(data, "email");
  if (!clientEmail || !clientEmail.includes("@")) {
    return { statusCode: 200, body: JSON.stringify({ ok: true, workiz, skipped: "no client email" }) };
  }

  const first = field(data, "name").split(" ")[0];
  const subject = `✓ ChimCrew appointment confirmed${first ? `, ${first}` : ""}`;
  const html = confirmationHtml(data);
  const scheduledAt = new Date(Date.now() + DELAY_MS).toISOString();

  const recipients = Array.from(new Set([clientEmail, OWNER_EMAIL]));
  const sentTo: string[] = [];

  try {
    for (const to of recipients) {
      const sent = await sendWithResend(to, subject, html, scheduledAt);
      if (!sent) {
        console.error(
          "Confirmation not sent: set RESEND_API_KEY in Netlify env to email the customer.",
        );
        return {
          statusCode: 200,
          body: JSON.stringify({ ok: true, workiz, skipped: "missing RESEND_API_KEY" }),
        };
      }
      sentTo.push(to);
    }
  } catch (error) {
    console.error("Client confirmation failed", error);
    return { statusCode: 500, body: "Failed to schedule confirmation" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, workiz, scheduledAt, to: sentTo }),
  };
}
