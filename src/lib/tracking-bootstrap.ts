/**
 * Inline bootstrap for GA4 / Google Ads.
 *
 * This string is injected synchronously into <head>. It is deliberately tiny:
 * it installs the *queue and helpers* immediately, and defers only the gtag.js
 * download.
 *
 * Why:
 *   - Two separate gtag.js tags were being loaded (`G-QY2H753BK9` and
 *     `AW-18189794318`). gtag.js is a single library that reads every `config`
 *     command out of `dataLayer`, so one load serves both destinations. This
 *     halves ~521 KiB of transfer and ~431 ms of main-thread work with no
 *     change to either property.
 *   - That one remaining gtag.js tag used to be discoverable by the preload
 *     scanner and so competed with the LCP image and the stylesheet. It is now
 *     injected on the first user interaction, or on idle after `load`,
 *     whichever comes first.
 *
 * What is NOT deferred, on purpose:
 *   - `dataLayer`, `gtag()` and the three conversion helpers exist from the
 *     first byte. Every call made before gtag.js arrives is queued in
 *     `dataLayer` and replayed verbatim on load — that is gtag.js's documented
 *     queue-replay behaviour, and it is what keeps `page_view`, phone
 *     conversions and lead conversions intact.
 *   - Any conversion helper call force-loads gtag.js immediately rather than
 *     waiting for the idle fallback, so a queued conversion always has a
 *     library to flush into.
 *
 * Scope note: this bootstrap covers Google only. Hotjar and buzzfufighter keep
 * their original async-in-<head> loaders in src/routes/__root.tsx — they have
 * no documented pre-load event queue we can rely on, so gating them would
 * change their startup semantics (late session recording, dropped events).
 * CallRail's swap.js is likewise left as its own tag in the markup; it has to
 * rewrite phone numbers before the user can read them, so it is only `defer`,
 * never interaction-gated.
 *
 * Tracking IDs and the `send_to` conversion label are unchanged from the
 * original snippet.
 */

const GA4_ID = "G-QY2H753BK9";
const ADS_ID = "AW-18189794318";
const ADS_CONVERSION_LABEL = "AW-18189794318/GGRvCO3rmLwcEI74yOFD";

/** Milliseconds after `load` before gtag.js is injected without any interaction. */
const IDLE_FALLBACK_MS = 2500;

/** Matches Google's own snippet guidance: don't strand a navigation on a callback that never fires. */
const CONVERSION_NAV_TIMEOUT_MS = 2000;

export const TRACKING_BOOTSTRAP = `(function(w,d){
w.dataLayer=w.dataLayer||[];
function gtag(){w.dataLayer.push(arguments)}
w.gtag=gtag;
gtag('js',new Date());
gtag('config','${GA4_ID}');
gtag('config','${ADS_ID}');
var done=false;
var EV=['pointerdown','touchstart','keydown','scroll','wheel','mousemove'];
function load(){
if(done)return;done=true;
for(var i=0;i<EV.length;i++){w.removeEventListener(EV[i],load,true)}
var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA4_ID}';(d.head||d.documentElement).appendChild(s);
}
w.__chimcrewLoadTracking=load;
for(var i=0;i<EV.length;i++){w.addEventListener(EV[i],load,{capture:true,passive:true,once:true})}
function idle(){if(w.requestIdleCallback){w.requestIdleCallback(load,{timeout:${IDLE_FALLBACK_MS}})}else{w.setTimeout(load,${IDLE_FALLBACK_MS})}}
if(d.readyState==='complete'){idle()}else{w.addEventListener('load',idle,{once:true})}
w.gtag_report_conversion=function(url){
load();
var fired=false;
var cb=function(){if(fired)return;fired=true;if(typeof url!=='undefined'){w.location=url}};
gtag('event','conversion',{'send_to':'${ADS_CONVERSION_LABEL}','event_callback':cb,'event_timeout':${CONVERSION_NAV_TIMEOUT_MS}});
if(typeof url!=='undefined'){w.setTimeout(cb,${CONVERSION_NAV_TIMEOUT_MS})}
return false};
w.gtag_report_call=function(){load();gtag('event','conversion',{'send_to':'${ADS_CONVERSION_LABEL}'});return false};
w.gtag_report_lead=function(){load();gtag('event','conversion',{'send_to':'${ADS_CONVERSION_LABEL}'});return false};
})(window,document);`;

/**
 * Hotjar's stock async loader, verbatim from the pre-optimization snippet.
 *
 * Site ID 6728722, sv=6. It installs `hj`/`_hjSettings` and appends the vendor
 * script to <head> at parse time — no interaction gate, no idle gate — so
 * session recording starts exactly when it used to.
 */
export const HOTJAR_BOOTSTRAP = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:6728722,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
