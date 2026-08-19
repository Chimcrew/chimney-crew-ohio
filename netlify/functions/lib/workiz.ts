const DEFAULT_INBOUND_EMAIL = "chimcrew@msg.workiz.com";

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
    City: cityRaw,
    PostalCode: zipFromAddress?.[1] ?? "",
    Address: address,
  };
}

function comments(data: LeadFields) {
  const lines = [
    val(data, "service") && `Service: ${val(data, "service")}`,
    val(data, "date") && `Requested date: ${val(data, "date")}`,
    val(data, "timeWindow") && `Time window: ${val(data, "timeWindow")}`,
    val(data, "source") && `Source: ${val(data, "source")}`,
    val(data, "smsConsent") && `SMS consent: ${val(data, "smsConsent")}`,
    val(data, "notes") && `Notes: ${val(data, "notes")}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function workizLeadBody(data: LeadFields) {
  const name = splitName(val(data, "name"));
  const place = parseCityZip(data);
  const service = val(data, "service") || "Website booking";
  return {
    LeadType: process.env.WORKIZ_LEAD_TYPE || service,
    LeadSource: "Website",
    ...name,
    Phone: val(data, "phone"),
    Email: val(data, "email"),
    Address: place.Address,
    City: place.City,
    State: process.env.WORKIZ_STATE || "OH",
    PostalCode: place.PostalCode,
    Comments: comments(data),
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

export function workizInboundHtml(data: LeadFields) {
  const rows = [
    ["Name", val(data, "name")],
    ["Phone", val(data, "phone")],
    ["Email", val(data, "email")],
    ["Service", val(data, "service")],
    ["Address", val(data, "address")],
    ["City / ZIP", val(data, "city")],
    ["Date", val(data, "date")],
    ["Time window", val(data, "timeWindow")],
    ["Source", val(data, "source")],
    ["SMS consent", val(data, "smsConsent")],
    ["Notes", val(data, "notes")],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</td></tr>`)
    .join("");

  return `<p>New ChimCrew website appointment</p><table>${rows}</table>`;
}
