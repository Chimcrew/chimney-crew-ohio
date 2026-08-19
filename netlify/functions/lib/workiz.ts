const DEFAULT_INBOUND_EMAIL = "chimcrew@msg.workiz.com";
const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export type LeadFields = Record<string, string | undefined>;

function val(data: LeadFields, key: string) {
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}

function splitName(fullName: string) {
  const parts = fullName.split(/\s+/).filter(Boolean);
  const FirstName = parts[0] || "Website";
  const LastName = parts.slice(1).join(" ") || "Lead";
  return { FirstName, LastName };
}

function parseCityZip(data: LeadFields) {
  const cityRaw = val(data, "city");
  const address = val(data, "address");
  if (/^\d{5}(-\d{4})?$/.test(cityRaw)) {
    return { City: "", PostalCode: cityRaw, Address: address };
  }
  const zipFromAddress = address.match(/\b(\d{5})(?:-\d{4})?\b/);
  return {
    City: cityRaw.replace(/,?\s*\d{5}(?:-\d{4})?$/, "").trim(),
    PostalCode: zipFromAddress?.[1] ?? "",
    Address: address,
  };
}

function jobSource() {
  return process.env.WORKIZ_JOB_SOURCE?.trim() || "Website";
}

function parseClock(token: string) {
  const match = token.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "AM") {
    if (hour === 12) hour = 0;
  } else if (hour !== 12) {
    hour += 12;
  }
  return { hour, minute };
}

function formatClock(hour: number, minute: number) {
  const meridiem = hour >= 12 ? "PM" : "AM";
  const twelve = hour % 12 || 12;
  return `${twelve}:${String(minute).padStart(2, "0")} ${meridiem}`;
}

function parseTimeWindow(raw: string) {
  const compact = raw.replace(/\s+/g, "").toUpperCase();
  const match = compact.match(/^(\d{1,2}(?::\d{2})?(?:AM|PM))-(\d{1,2}(?::\d{2})?(?:AM|PM))$/);
  if (!match) return null;
  const start = parseClock(match[1]);
  const end = parseClock(match[2]);
  if (!start || !end) return null;
  return {
    startLabel: formatClock(start.hour, start.minute),
    endLabel: formatClock(end.hour, end.minute),
    start,
    end,
  };
}

function parseLeadDate(raw: string) {
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  }

  const withYear = raw.match(/([A-Za-z]{3,})\.?\s+(\d{1,2}),?\s+(\d{4})/);
  if (withYear) {
    const month = MONTHS[withYear[1].slice(0, 3).toLowerCase()];
    if (month !== undefined) {
      return new Date(Number(withYear[3]), month, Number(withYear[2]));
    }
  }

  const monthDay = raw.match(/([A-Za-z]{3,})\.?\s+(\d{1,2})/);
  if (!monthDay) return null;
  const month = MONTHS[monthDay[1].slice(0, 3).toLowerCase()];
  if (month === undefined) return null;

  const now = new Date();
  const parsed = new Date(now.getFullYear(), month, Number(monthDay[2]));
  const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  if (parsed < cutoff) parsed.setFullYear(parsed.getFullYear() + 1);
  return parsed;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function workizDateTime(date: Date, clock: { hour: number; minute: number }) {
  return `${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}/${date.getFullYear()} ${formatClock(clock.hour, clock.minute)}`;
}

function appointmentSchedule(data: LeadFields) {
  const dateRaw = val(data, "date");
  const windowRaw = val(data, "timeWindow");
  const date = dateRaw ? parseLeadDate(dateRaw) : null;
  const window = windowRaw ? parseTimeWindow(windowRaw) : null;
  if (!date || !window) {
    return {
      start: "",
      end: "",
      summary: [dateRaw, windowRaw].filter(Boolean).join(" · "),
    };
  }
  return {
    start: workizDateTime(date, window.start),
    end: workizDateTime(date, window.end),
    summary: `${date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })} from ${window.startLabel} to ${window.endLabel}`,
  };
}

function comments(data: LeadFields) {
  const schedule = appointmentSchedule(data);
  const lines = [
    schedule.summary && `Requested arrival: ${schedule.summary}`,
    val(data, "service") && `Service: ${val(data, "service")}`,
    val(data, "source") && `Website form: ${val(data, "source")}`,
    val(data, "smsConsent") && `SMS consent: ${val(data, "smsConsent")}`,
    val(data, "notes") && `Customer notes: ${val(data, "notes")}`,
  ].filter(Boolean);
  return lines.join("\n");
}

function labeledLines(data: LeadFields) {
  const name = splitName(val(data, "name"));
  const place = parseCityZip(data);
  const schedule = appointmentSchedule(data);
  return [
    ["First Name", name.FirstName],
    ["Last Name", name.LastName],
    ["Phone", val(data, "phone")],
    ["Email", val(data, "email")],
    ["Address", place.Address],
    ["City", place.City],
    ["State", process.env.WORKIZ_STATE || "OH"],
    ["Zip", place.PostalCode],
    ["Job Type", process.env.WORKIZ_LEAD_TYPE || val(data, "service") || "Website booking"],
    ["Job Source", jobSource()],
    ["Job start date", schedule.start],
    ["Job end date", schedule.end],
    ["Arrival window", schedule.summary],
    ["Website form", val(data, "source")],
    ["SMS consent", val(data, "smsConsent")],
    ["Job notes", comments(data)],
  ].filter(([, value]) => value);
}

export function workizLeadBody(data: LeadFields) {
  const name = splitName(val(data, "name"));
  const place = parseCityZip(data);
  const schedule = appointmentSchedule(data);
  const service = val(data, "service") || "Website booking";
  return {
    LeadType: process.env.WORKIZ_LEAD_TYPE || service,
    LeadSource: jobSource(),
    JobSource: jobSource(),
    ...name,
    Phone: val(data, "phone"),
    Email: val(data, "email"),
    Address: place.Address,
    City: place.City,
    State: process.env.WORKIZ_STATE || "OH",
    PostalCode: place.PostalCode,
    Comments: comments(data),
    ...(schedule.start ? { JobDateTime: schedule.start, JobEndDateTime: schedule.end } : {}),
  };
}

export async function createWorkizLead(data: LeadFields) {
  const token = process.env.WORKIZ_API_TOKEN?.trim();
  if (!token) return { ok: false as const, skipped: "missing WORKIZ_API_TOKEN" };

  const url = `https://api.workiz.com/api/v1/${encodeURIComponent(token)}/lead/create/`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(workizLeadBody(data)),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Workiz ${res.status}: ${text.slice(0, 500)}`);
  }
  return { ok: true as const, body: text.slice(0, 500) };
}

export function workizInboundEmail() {
  return process.env.WORKIZ_INBOUND_EMAIL?.trim() || DEFAULT_INBOUND_EMAIL;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function workizInboundText(data: LeadFields) {
  const schedule = appointmentSchedule(data);
  const header = schedule.summary
    ? `Please schedule this ChimCrew website booking for ${schedule.summary}.`
    : "New ChimCrew website appointment.";
  const body = labeledLines(data)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  return `${header}\n\n${body}\n`;
}

export function workizInboundHtml(data: LeadFields) {
  const text = workizInboundText(data);
  const rows = labeledLines(data)
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value).replaceAll("\n", "<br>")}</td></tr>`,
    )
    .join("");
  const schedule = appointmentSchedule(data);
  const summary = schedule.summary
    ? `<p><strong>Please schedule this job for ${escapeHtml(schedule.summary)}.</strong></p>`
    : "<p>New ChimCrew website appointment</p>";
  return `${summary}<pre style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre><table>${rows}</table>`;
}
