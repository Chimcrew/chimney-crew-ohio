import {
  createWorkizLead,
  workizInboundEmail,
  workizInboundText,
  workizSubject,
  type LeadFields,
} from "./workiz";

const PHONE = "(614) 683-5763";
const DELAY_MS = 5 * 60 * 1000;
export const OWNER_EMAIL = "theductorsairduct@gmail.com";

function field(data: LeadFields, key: string) {
  const value = data[key];
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

function rowHtml(label: string, value: string) {
  if (!value) return "";
  return kv(label, escapeHtml(value));
}

function ownerLeadHtml(data: LeadFields) {
  const details = [
    rowHtml("Name", field(data, "name")),
    rowHtml("Phone", field(data, "phone")),
    rowHtml("Email", field(data, "email")),
    rowHtml("Service", field(data, "service")),
    rowHtml("Address", field(data, "address")),
    rowHtml("City", field(data, "city")),
    rowHtml("Date", field(data, "date")),
    rowHtml("Window", field(data, "timeWindow")),
    rowHtml("Source", field(data, "source")),
    rowHtml("SMS consent", field(data, "smsConsent")),
    rowHtml("Notes", field(data, "notes")),
  ].join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <p style="margin:0 0 8px;color:#FACC15;background:#0B0F19;padding:12px 16px;font-size:16px;font-weight:800;letter-spacing:0.16em">NEW CHIMCREW LEAD</p>
    <div style="background:#f7f7f5;border-radius:10px;padding:16px 18px;margin:16px 0;border:1px solid #ececec">
      ${details}
    </div>
    <p style="font-size:14px;color:#1a1a1a">Call them back ASAP at ${escapeHtml(field(data, "phone") || PHONE)}.</p>
  </div>
</body>
</html>`;
}

function confirmationHtml(data: LeadFields) {
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

async function sendWithResend(options: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  scheduledAt?: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false as const, skipped: "missing RESEND_API_KEY" };

  const from = process.env.CONFIRM_FROM_EMAIL || "ChimCrew Website <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [options.to],
      subject: options.subject,
      ...(options.html ? { html: options.html } : {}),
      ...(options.text ? { text: options.text } : {}),
      ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      ...(options.scheduledAt ? { scheduled_at: options.scheduledAt } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
  return { ok: true as const };
}

export async function processLead(data: LeadFields) {
  const result: Record<string, unknown> = {};
  const replyTo = field(data, "email") || undefined;
  const name = field(data, "name") || "Website lead";

  try {
    result.api = await createWorkizLead(data);
  } catch (error) {
    console.error("Workiz API lead create failed", error);
    result.api = { ok: false, error: error instanceof Error ? error.message : String(error) };
  }

  try {
    const inbound = workizInboundEmail();
    const sent = await sendWithResend({
      to: inbound,
      subject: workizSubject(data),
      text: workizInboundText(data),
      replyTo,
    });
    result.workiz = sent.ok ? { ok: true, to: inbound } : sent;
  } catch (error) {
    console.error("Workiz inbound email failed", error);
    result.workiz = { ok: false, error: error instanceof Error ? error.message : String(error) };
  }

  try {
    const sent = await sendWithResend({
      to: OWNER_EMAIL,
      subject: `New lead: ${name}${field(data, "service") ? ` — ${field(data, "service")}` : ""}`,
      html: ownerLeadHtml(data),
      replyTo,
    });
    result.owner = sent.ok ? { ok: true, to: OWNER_EMAIL } : sent;
  } catch (error) {
    console.error("Owner lead email failed", error);
    result.owner = { ok: false, error: error instanceof Error ? error.message : String(error) };
  }

  const clientEmail = field(data, "email");
  if (!clientEmail || !clientEmail.includes("@")) {
    result.confirmation = { skipped: "no client email" };
    return result;
  }

  const first = field(data, "name").split(" ")[0];
  const scheduledAt = new Date(Date.now() + DELAY_MS).toISOString();
  try {
    const sent = await sendWithResend({
      to: clientEmail,
      subject: `✓ ChimCrew appointment confirmed${first ? `, ${first}` : ""}`,
      html: confirmationHtml(data),
      scheduledAt,
    });
    result.confirmation = sent.ok
      ? { ok: true, to: clientEmail, scheduledAt }
      : sent;
  } catch (error) {
    console.error("Client confirmation failed", error);
    result.confirmation = { ok: false, error: error instanceof Error ? error.message : String(error) };
  }

  return result;
}

export function notifiedAnyone(result: Record<string, unknown>) {
  const owner = result.owner as { ok?: boolean } | undefined;
  const workiz = result.workiz as { ok?: boolean } | undefined;
  const confirmation = result.confirmation as { ok?: boolean } | undefined;
  return Boolean(owner?.ok || workiz?.ok || confirmation?.ok);
}
