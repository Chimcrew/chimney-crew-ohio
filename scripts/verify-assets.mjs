// Dev-only: render several routes through the production SSR bundle and assert
// that every asset URL they emit resolves to a real file in dist/client.
// Catches a broken <Photo> derivative or a missing font before it ships.
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

const ROUTES = ["/", "/schedule", "/contact", "/blog", "/services", "/reviews", "/before-after"];

const mod = await import("../dist/server/server.js");
const handler = mod.default?.fetch ?? mod.fetch;

let missing = 0;
let checked = 0;
const seen = new Set();

for (const route of ROUTES) {
  const res = await handler(new Request("https://chimcrew.com" + route));
  const html = await res.text();
  const urls = [
    ...html.matchAll(/["'\s(](\/(?:optimized|fonts|assets|photos|__l5e|videos)\/[^"'\s),]+)/g),
  ].map((m) => m[1]);

  let routeMissing = 0;
  for (const u of urls) {
    if (seen.has(u)) continue;
    seen.add(u);
    checked++;
    const clean = decodeURI(u.split("?")[0]);
    if (!existsSync("dist/client" + clean)) {
      routeMissing++;
      missing++;
      if (missing <= 15) console.log("  MISSING  " + clean);
    }
  }
  console.log(
    `${route.padEnd(16)} ${String(res.status)}  ${String(urls.length).padStart(4)} asset refs` +
      (routeMissing ? `  <-- ${routeMissing} MISSING` : ""),
  );
}

console.log(`\n${checked} unique asset URLs checked, ${missing} missing`);

// The inline tracking bootstrap is a hand-written string; make sure it parses
// and that the queue/helper surface exists after it runs.
// Node can't `import` a .ts file, and the module is plain JS (const strings +
// template literals) with no type syntax — so evaluate its source directly
// rather than silently skipping the most important assertions in this file.
const bootstrapSrc = readFileSync("src/lib/tracking-bootstrap.ts", "utf8");
const { TRACKING_BOOTSTRAP, HOTJAR_BOOTSTRAP } = vm.runInNewContext(
  bootstrapSrc.replace(/^export /gm, "") +
    "\n;({ TRACKING_BOOTSTRAP: TRACKING_BOOTSTRAP, HOTJAR_BOOTSTRAP: HOTJAR_BOOTSTRAP })",
);
if (TRACKING_BOOTSTRAP) {
  const listeners = [];
  const win = {
    addEventListener: (t) => listeners.push(t),
    removeEventListener: () => {},
    setTimeout: () => 0,
    requestIdleCallback: undefined,
    location: {},
  };
  const injected = [];
  const doc = {
    readyState: "loading",
    createElement: () => ({}),
    head: { appendChild: (s) => injected.push(s) },
    documentElement: {},
  };
  const ctx = vm.createContext({ window: win, document: doc });
  ctx.window.window = win;
  vm.runInContext(`(function(){ ${TRACKING_BOOTSTRAP} })()`, ctx);
  const ok = (label, cond) => console.log((cond ? "  OK   " : "  FAIL ") + label);
  console.log("\nTRACKING BOOTSTRAP (executed in a sandbox)");
  ok("parses and runs", true);
  ok("dataLayer created", Array.isArray(win.dataLayer));
  ok("gtag('js') + 2 configs queued before any script load", win.dataLayer?.length === 3);
  ok("config GA4 queued", JSON.stringify(win.dataLayer).includes("G-QY2H753BK9"));
  ok("config Ads queued", JSON.stringify(win.dataLayer).includes("AW-18189794318"));
  ok("gtag_report_conversion defined", typeof win.gtag_report_conversion === "function");
  ok("gtag_report_call defined", typeof win.gtag_report_call === "function");
  ok("gtag_report_lead defined", typeof win.gtag_report_lead === "function");
  ok("interaction listeners registered", listeners.length >= 5);

  // A conversion fired before the vendor script arrives must still queue.
  const before = win.dataLayer.length;
  win.gtag_report_call();
  ok("phone conversion queues pre-load", win.dataLayer.length === before + 1);
  ok(
    "queued conversion carries the unchanged send_to label",
    JSON.stringify(win.dataLayer).includes("AW-18189794318/GGRvCO3rmLwcEI74yOFD"),
  );

  // The conversion helper above should already have force-loaded gtag.js.
  const srcs = injected.map((s) => s.src);
  console.log("\nDEFERRED LOADER (fired by the conversion helper)");
  ok("Google is the only gated vendor — exactly 1 script injected", injected.length === 1);
  ok(
    "one gtag.js load, not two",
    srcs.filter((s) => s?.includes("googletagmanager.com/gtag/js")).length === 1,
  );
  ok("gtag.js carries the GA4 id", srcs.some((s) => s?.endsWith("gtag/js?id=G-QY2H753BK9")));
  ok("injected async", injected.every((s) => s.async === true));
  ok(
    "bootstrap does not touch Hotjar or buzzfufighter",
    win.hj === undefined &&
      win._hjSettings === undefined &&
      !srcs.some((s) => /hotjar|buzzfufighter/.test(s || "")),
  );

  const countBefore = injected.length;
  win.__chimcrewLoadTracking();
  win.gtag_report_lead();
  ok("loader is idempotent (no duplicate tags)", injected.length === countBefore);
}

// Hotjar keeps its stock loader: it must inject at parse time, with no
// interaction/idle gate in front of it.
if (HOTJAR_BOOTSTRAP) {
  const hjInjected = [];
  const hjWin = { addEventListener: () => {}, setTimeout: () => 0 };
  const hjDoc = {
    getElementsByTagName: () => [{ appendChild: (s) => hjInjected.push(s) }],
    createElement: () => ({}),
  };
  const hjCtx = vm.createContext({ window: hjWin, document: hjDoc });
  hjCtx.window.window = hjWin;
  vm.runInContext(`(function(){ ${HOTJAR_BOOTSTRAP} })()`, hjCtx);
  const ok = (label, cond) => console.log((cond ? "  OK   " : "  FAIL ") + label);
  console.log("\nHOTJAR BOOTSTRAP (executed in a sandbox)");
  ok("hj queue stub installed", typeof hjWin.hj === "function");
  ok("_hjSettings site id 6728722", hjWin._hjSettings?.hjid === 6728722);
  ok("_hjSettings sv 6", hjWin._hjSettings?.hjsv === 6);
  ok("vendor script injected immediately, ungated", hjInjected.length === 1);
  ok(
    "correct Hotjar URL",
    hjInjected[0]?.src === "https://static.hotjar.com/c/hotjar-6728722.js?sv=6",
  );
  ok("injected async", hjInjected[0]?.async === 1);
}
