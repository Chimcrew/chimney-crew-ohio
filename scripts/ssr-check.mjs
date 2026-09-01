// Dev-only: render a route through the production SSR bundle and report on the
// invariants we must not regress (tracking, schema, meta, lead form, media).
import { writeFileSync } from "node:fs";

const route = process.argv[2] || "/";
const mod = await import("../dist/server/server.js");
const handler = mod.default?.fetch ?? mod.fetch;
if (typeof handler !== "function") throw new Error("no fetch handler on SSR bundle");

const res = await handler(new Request("https://chimcrew.com" + route));
const html = await res.text();
writeFileSync("ssr-output.html", html);

const has = (label, needle) =>
  console.log((html.includes(needle) ? "  OK   " : "  MISS ") + label);
/** For things whose *absence* is the win. */
const absent = (label, needle) =>
  console.log((html.includes(needle) ? "  FAIL " : "  OK   ") + label);
const count = (label, re) =>
  console.log(`  ${String((html.match(re) || []).length).padStart(3)}  ${label}`);

console.log(`\n${route} -> ${res.status}, ${(html.length / 1024).toFixed(0)} KB HTML\n`);

console.log("TRACKING");
has("GA4 id G-QY2H753BK9", "G-QY2H753BK9");
has("Google Ads id AW-18189794318", "AW-18189794318");
has("Ads conversion label", "AW-18189794318/GGRvCO3rmLwcEI74yOFD");
has("gtag_report_conversion", "gtag_report_conversion");
has("gtag_report_call", "gtag_report_call");
has("gtag_report_lead", "gtag_report_lead");
has("dataLayer bootstrap", "w.dataLayer=w.dataLayer||[]");
has("Hotjar id 6728722", "hjid:6728722");
has("Hotjar sv 6", "hjsv:6");
has("Hotjar stock async loader (ungated)", "static.hotjar.com/c/hotjar-");
has("buzzfufighter script src", "ob.buzzfufighter.com/i/ecc955025644afe9ccafc17374332bd9.js");
has("buzzfufighter noscript iframe", "ob.buzzfufighter.com/ns/");
has("CallRail swap.js (defer)", "cdn.callrail.com/companies/575995871/0fa6a86aa27bec0d3aee/12/swap.js");

console.log("\nSEO");
has("LocalBusiness schema", '"@type":"LocalBusiness"');
has("telephone in schema", "+1-614-683-5763");
has("canonical", 'rel="canonical"');
has("og:image", "og-cover.jpg");
has("google-site-verification", "A01V3-IeHdvZeFDITROkW10YpnYkVN54hH0CMBbKU6");
if (route === "/") has("FAQPage schema", '"@type":"FAQPage"');

console.log("\nLEAD / BOOKING");
has("Netlify lead form", 'name="chimcrew-lead"');
has("netlify honeypot", 'data-netlify-honeypot="bot-field"');
has("smsConsent field", 'name="smsConsent"');
has("tel: links", 'href="tel:6146835763"');

console.log("\nFONTS / MEDIA");
absent("render-blocking fonts.googleapis.com gone", "fonts.googleapis.com");
has("Manrope 700 preload", "/fonts/manrope-700-normal-latin.woff2");
has("hero LCP webp", "/optimized/chimcrew-team-hero-1024.webp");
count("optimized WebP derivative refs", /\/optimized\/l5e\/[0-9a-f]{10}-\d+\.webp/g);
absent("desktop hero video absent from SSR (mobile never fetches it)", "hero-bg-desktop");
// Google is the only vendor we gate. Its URL still appears as a *string*
// inside the inline loader; what must be gone is a parser-visible
// <script src=...> for it.
console.log(
  (/<script[^>]+src="https:\/\/www\.googletagmanager\.com/.test(html) ? "  FAIL " : "  OK   ") +
    "no eager <script src> for googletagmanager",
);
// Hotjar and buzzfufighter are deliberately NOT gated — these two assert their
// original async-in-<head> semantics are still intact.
console.log(
  (/r\.async=1;r\.src=t\+h\._hjSettings\.hjid/.test(html) ? "  OK   " : "  FAIL ") +
    "Hotjar loads async at parse time (not interaction-gated)",
);
console.log(
  // React serializes the boolean attribute as async="".
  (/<script async=""[^>]*src="https:\/\/ob\.buzzfufighter\.com\/i\/ecc955025644afe9ccafc17374332bd9\.js"[^>]*class="ct_clicktrue"/.test(
    html,
  )
    ? "  OK   "
    : "  FAIL ") + "buzzfufighter async <script> with ct_clicktrue class",
);

// Initial JS the document actually asks for, before any interaction.
const { statSync, existsSync } = await import("node:fs");
const refs = [...new Set([...html.matchAll(/\/assets\/([\w.-]+\.js)/g)].map((m) => m[1]))];
let js = 0;
for (const f of refs) {
  const p = "dist/client/assets/" + f;
  if (existsSync(p)) js += statSync(p).size;
}
console.log(`\nINITIAL JS: ${refs.length} files, ${(js / 1024).toFixed(0)} KB uncompressed`);
count("<img> tags", /<img/g);
count("elements (approx)", /<[a-zA-Z]/g);
