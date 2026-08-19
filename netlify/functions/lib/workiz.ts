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

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (ten.length === 10) {
    return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
  }
  return raw.trim();
}

function jobSource() {
  return process.env.WORKIZ_JOB_SOURCE?.trim() || "Website";
}

function jobType(service: string) {
  const override = process.env.WORKIZ_LEAD_TYPE?.trim();
  if (override) return override;
  const lower = service.toLowerCase();
  if (lower.includes("dryer")) return "Dryer Vent Cleaning";
  if (lower.includes("sweep")) return "Chimney Sweep";
  if (lower.includes("gas")) return "Gas Fireplace Inspection";
  if (lower.includes("inspection")) return "Inspection";
  const cleaned = service
    .replace(/[^\p{L}\p{N}\s/()-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "Inspection";
}

function parseCityZip(data: LeadFields) {
  const cityRaw = val(data, "city");
  const address = val(data, "address");
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  const street = parts[0] || address;
  if (/^\d{5}(-\d{4})?$/.test(cityRaw)) {
    return { City: "", PostalCode: cityRaw, Address: street };
  }
  const zipFromAddress = address.match(/\b(\d{5})(?:-\d{4})?\b/);
  return {
    City: cityRaw.replace(/,?\s*\d{5}(?:-\d{4})?$/, "").trim(),
    PostalCode: zipFromAddress?.[1] ?? "",
    Address: street,
  };
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
      dateLabel: dateRaw,
      start: "",
      end: "",
      startTime: "",
      endTime: "",
      summary: [dateRaw, windowRaw].filter(Boolean).join(" · "),
    };
  }
  return {
    dateLabel: `${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}/${date.getFullYear()}`,
    start: workizDateTime(date, window.start),
    end: workizDateTime(date, window.end),
    startTime: window.startLabel,
    endTime: window.endLabel,
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
  const place = parseCityZip(data);
  const phone = formatPhone(val(data, "phone"));
  return [
    schedule.summary && `Requested arrival: ${schedule.summary}`,
    val(data, "service") && `Service: ${val(data, "service")}`,
    phone && `Phone: ${phone}`,
    place.Address && `Address: ${place.Address}`,
    place.City && `City: ${place.City}`,
    place.PostalCode && `ZIP: ${place.PostalCode}`,
    `Job source: ${jobSource()}`,
    val(data, "source") && `Website form: ${val(data, "source")}`,
    val(data, "smsConsent") && `SMS consent: ${val(data, "smsConsent")}`,
    val(data, "notes") && `Customer notes: ${val(data, "notes")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function workizLeadBody(data: LeadFields) {
  const name = splitName(val(data, "name"));
  const place = parseCityZip(data);
  const schedule = appointmentSchedule(data);
  const service = val(data, "service") || "Website booking";
  return {
    LeadType: jobType(service),
    LeadSource: jobSource(),
    JobSource: jobSource(),
    ...name,
    Phone: formatPhone(val(data, "phone")),
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

export function workizSubject(data: LeadFields) {
  const name = val(data, "name") || "Website lead";
  const phone = formatPhone(val(data, "phone"));
  const schedule = appointmentSchedule(data);
  return ["Website lead", name, phone, schedule.summary].filter(Boolean).join(" | ").slice(0, 180);
}

export function workizInboundText(data: LeadFields) {
  const name = splitName(val(data, "name"));
  const place = parseCityZip(data);
  const schedule = appointmentSchedule(data);
  const phone = formatPhone(val(data, "phone"));
  const service = val(data, "service");
  const type = jobType(service || "Inspection");
  const source = jobSource();

  const lines = [
    "NEW WEBSITE LEAD",
    "",
    `First name: ${name.FirstName}`,
    `Last name: ${name.LastName}`,
    phone && `Phone: ${phone}`,
    phone && `Phone number: ${phone}`,
    val(data, "email") && `Email: ${val(data, "email")}`,
    place.Address && `Address: ${place.Address}`,
    place.Address && `Service address: ${place.Address}`,
    place.City && `City: ${place.City}`,
    `State: ${process.env.WORKIZ_STATE || "OH"}`,
    place.PostalCode && `Zip: ${place.PostalCode}`,
    place.PostalCode && `Postal code: ${place.PostalCode}`,
    "",
    `Job type: ${type}`,
    `Job source: ${source}`,
    `Lead source: ${source}`,
    `Ad source: ${source}`,
    `Source: ${source}`,
    "",
    schedule.dateLabel && `Date: ${schedule.dateLabel}`,
    schedule.startTime && `Time: ${schedule.startTime}`,
    schedule.startTime && `Start time: ${schedule.startTime}`,
    schedule.endTime && `End time: ${schedule.endTime}`,
    schedule.start && `Job start date: ${schedule.start}`,
    schedule.end && `Job end date: ${schedule.end}`,
    schedule.summary && `Preferred appointment: ${schedule.summary}`,
    "",
    "Description:",
    comments(data),
  ].filter((line) => line !== false) as string[];

  return lines.join("\n").trim() + "\n";
}

export function workizInboundHtml(data: LeadFields) {
  const text = workizInboundText(data)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `<pre style="font-family:Arial,Helvetica,sans-serif;font-size:14px;white-space:pre-wrap">${text}</pre>`;
}
