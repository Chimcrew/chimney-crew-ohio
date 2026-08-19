import { useEffect, useRef } from "react";

const REVIEW_WIDGET_HTML = String.raw`<!-- Begin Review Link Generator Widget -->
<!-- Review Button -->
<div style="text-align: center;">
<button type="button" id="rlgOpenPopup" class="rlg-review-button">Leave Us A Review</button>
</div>
<!-- Popup Overlay -->
<div id="rlgPopup" class="rlg-popup-overlay" role="dialog" aria-modal="true"
aria-labelledby="rlgTitle" aria-hidden="true">
<div class="rlg-popup-content">
<button type="button" id="rlgClosePopup" class="rlg-close"
aria-label="Close">&times;</button>
<div class="rlg-review-container">
<h2 class="rlg-title" id="rlgTitle">Chimcrew - Chimney Sweep &amp; Repair</h2>
<p class="rlg-subtitle">We value your feedback! Please rate our service.</p>
<div class="rlg-star-rating-wrapper">
<div class="rlg-star-rating">
<input type="radio" id="rlgStar5" name="rlgRating" value="5"/>
<label for="rlgStar5" title="5 stars" aria-label="5 stars">★</label>
<input type="radio" id="rlgStar4" name="rlgRating" value="4"/>
<label for="rlgStar4" title="4 stars" aria-label="4 stars">★</label>
<input type="radio" id="rlgStar3" name="rlgRating" value="3"/>
<label for="rlgStar3" title="3 stars" aria-label="3 stars">★</label>
<input type="radio" id="rlgStar2" name="rlgRating" value="2"/>
<label for="rlgStar2" title="2 stars" aria-label="2 stars">★</label>
<input type="radio" id="rlgStar1" name="rlgRating" value="1"/>
<label for="rlgStar1" title="1 star" aria-label="1 star">★</label>
</div>
<p class="rlg-error" id="rlgRatingError" role="alert">Select a star rating first.</p>
<button type="button" class="rlg-submit-btn" onclick="rlgSubmitReview()">Submit review</button>
</div>
<div class="rlg-feedback-form" id="rlgFeedbackForm">
<p class="rlg-form-heading">Your feedback</p>
<textarea id="rlgFeedbackText" placeholder="Tell us what went wrong and how we can fix it..."></textarea>
<p class="rlg-error" id="rlgFeedbackError" role="alert"></p>
<button type="button" class="rlg-submit-btn" id="rlgFeedbackBtn"
onclick="rlgSubmitFeedback()">Send feedback</button>
</div>
<div class="rlg-thank-you" id="rlgThankYou">
<p class="rlg-thank-you-mark">✓</p>
<p>Thank you for your feedback!</p>
</div>
<div class="rlg-positive-reviews">
<p class="rlg-reviews-heading">Our most recent online review</p>
<div class="rlg-review">
<div class="rlg-review-avatar rlg-review-avatar-fallback">
<span>A</span>
<img
class="rlg-review-avatar-img"
src="https://cdn.jsdelivr.net/gh/yamos28/ReviewWidget26@main/public/reviewer-images/reviewer1.jpg"
alt="Avery Morgan"
loading="lazy"
referrerpolicy="no-referrer"
onerror="this.remove();"
/>
</div>
<div class="rlg-review-content">
<strong>Avery Morgan</strong>
<div class="rlg-stars" aria-label="5 out of 5 stars">★★★★★</div>
<span class="rlg-time">2 days ago</span>
<p>I had a great experience with Chimcrew - Chimney Sweep &amp; Repair. Clear communication and a smooth process.</p>
</div>
</div>
</div>
</div>
</div>
</div>
<style>
/* Review Link Generator Styles - Scoped with rlg- prefix */
.rlg-popup-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.6);
backdrop-filter: blur(4px);
z-index: 999999;
display: none;
overflow-y: auto;
animation: rlgFadeIn 0.2s ease;
}
.rlg-popup-overlay.rlg-is-open { display: block; }
@keyframes rlgFadeIn {
from { opacity: 0; }
to { opacity: 1; }
}
.rlg-popup-content {
background: #fff;
margin: 5% auto;
padding: 32px;
width: 90%;
max-width: 480px;
border-radius: 16px;
position: relative;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
animation: rlgSlideUp 0.3s ease;
}
@keyframes rlgSlideUp {
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
}
.rlg-close {
position: absolute;
top: 12px;
right: 14px;
background: none;
border: none;
padding: 4px 8px;
font-size: 28px;
color: #9ca3af;
cursor: pointer;
line-height: 1;
transition: color 0.2s;
}
.rlg-close:hover { color: #374151; }
.rlg-review-container { text-align: center; }
.rlg-review-container .rlg-title {
font-size: 24px;
font-weight: 600;
color: #111827;
margin: 0 0 12px 0;
}
.rlg-review-container .rlg-subtitle {
font-size: 15px;
color: #6b7280;
margin: 0 0 24px 0;
}
.rlg-star-rating-wrapper {
display: flex;
flex-direction: column;
align-items: center;
gap: 16px;
margin-bottom: 24px;
}
.rlg-star-rating {
display: inline-flex;
flex-direction: row-reverse;
font-size: 36px;
position: relative;
}
.rlg-star-rating input {
position: absolute;
opacity: 0;
width: 1px;
height: 1px;
}
.rlg-star-rating label {
color: #e5e7eb;
cursor: pointer;
margin: 0 2px;
line-height: 1;
transition: color 0.15s, transform 0.15s;
}
.rlg-star-rating label:hover { transform: scale(1.1); }
.rlg-star-rating input:checked ~ label,
.rlg-star-rating label:hover,
.rlg-star-rating label:hover ~ label {
color: #fbbf24;
}
.rlg-star-rating input:focus-visible + label {
outline: 2px solid #7366f1;
outline-offset: 2px;
border-radius: 4px;
}
.rlg-review-button, .rlg-submit-btn {
background: #7366f1;
color: #fff;
border: none;
border-radius: 8px;
padding: 12px 24px;
font-size: 15px;
font-weight: 500;
font-family: inherit;
cursor: pointer;
transition: transform 0.15s, box-shadow 0.15s;
}
.rlg-review-button:hover, .rlg-submit-btn:hover {
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.rlg-submit-btn[disabled] {
opacity: 0.6;
cursor: default;
transform: none;
box-shadow: none;
}
.rlg-error {
display: none;
font-size: 13px;
color: #b91c1c;
margin: 0;
}
.rlg-error.rlg-is-visible { display: block; }
.rlg-feedback-form {
display: none;
margin-top: 24px;
text-align: left;
animation: rlgFadeIn 0.3s ease;
}
.rlg-feedback-form.rlg-is-visible { display: block; }
.rlg-feedback-form .rlg-form-heading {
font-size: 18px;
font-weight: 600;
color: #111827;
margin: 0 0 12px 0;
}
.rlg-feedback-form textarea {
width: 100%;
box-sizing: border-box;
height: 100px;
padding: 12px;
border: 1px solid #e5e7eb;
border-radius: 8px;
font-size: 14px;
font-family: inherit;
resize: vertical;
margin-bottom: 12px;
}
.rlg-feedback-form textarea:focus {
outline: none;
border-color: #7366f1;
box-shadow: 0 0 0 3px rgba(115, 102, 241, 0.15);
}
.rlg-thank-you {
display: none;
text-align: center;
padding: 24px;
}
.rlg-thank-you.rlg-is-visible { display: block; }
.rlg-thank-you .rlg-thank-you-mark {
font-size: 48px;
line-height: 1;
color: #10b981;
margin: 0 0 8px 0;
}
.rlg-thank-you p {
font-size: 16px;
color: #374151;
margin: 0;
}
.rlg-positive-reviews {
margin-top: 32px;
text-align: left;
border-top: 1px solid #f3f4f6;
padding-top: 24px;
}
.rlg-positive-reviews.rlg-is-hidden { display: none; }
.rlg-positive-reviews .rlg-reviews-heading {
font-size: 12px;
font-weight: 600;
color: #6b7280;
margin: 0 0 16px 0;
text-transform: uppercase;
letter-spacing: 0.05em;
}
.rlg-review {
display: flex;
gap: 12px;
padding: 16px;
background: #f9fafb;
border-radius: 12px;
}
.rlg-review-avatar {
width: 40px;
height: 40px;
background: linear-gradient(135deg, #7366f1, #7366f1cc);
color: #fff;
border-radius: 50%;
flex-shrink: 0;
position: relative;
overflow: hidden;
}
.rlg-review-avatar-img {
width: 100%;
height: 100%;
display: block;
object-fit: cover;
border-radius: 50%;
position: relative;
z-index: 1;
}
.rlg-review-avatar-fallback span {
position: absolute;
inset: 0;
display: flex;
align-items: center;
justify-content: center;
font-weight: 600;
font-size: 16px;
color: #fff;
z-index: 0;
}
.rlg-review-content { flex: 1; }
.rlg-review-content strong {
display: block;
font-size: 14px;
color: #111827;
margin-bottom: 4px;
}
.rlg-review-content .rlg-stars {
color: #fbbf24;
font-size: 14px;
margin-bottom: 4px;
}
.rlg-review-content .rlg-time {
font-size: 12px;
color: #9ca3af;
display: block;
margin-bottom: 8px;
}
.rlg-review-content p {
font-size: 13px;
color: #4b5563;
margin: 0;
line-height: 1.5;
}
@media (prefers-reduced-motion: reduce) {
.rlg-popup-overlay, .rlg-popup-content { animation: none; }
.rlg-review-button, .rlg-submit-btn, .rlg-star-rating label { transition: none; }
}
</style>
<script>
(function() {
var rlgReviewLink =
"https://search.google.com/local/writereview?placeid=ChIJGcXcLZ6LiiARssW1BDgLtBc";
var rlgEmail = "office@chimcrew.com";
var rlgBusinessName = "Chimcrew - Chimney Sweep & Repair";
var rlgPlatform = "google";
var rlgMinRating = 4;
var platformHash = '#review';
var rlgFeedbackEndpoint = "https://reviewtool.gsmarketingroup.com/api/send-feedback";
var rlgTrackEndpoint = "https://reviewtool.gsmarketingroup.com/api/track-event";
var rlgLastRating = 0;
var rlgPreviousOverflow = '';
var rlgLastFocused = null;
var rlgSending = false;
function rlgResolveEndpoint(url) {
if (!url) return '';
try {
return new URL(url, window.location.origin).toString();
} catch (e) {
return url;
}
}
var rlgFeedbackEndpointResolved = rlgResolveEndpoint(rlgFeedbackEndpoint);
var rlgTrackEndpointResolved = rlgResolveEndpoint(rlgTrackEndpoint);
function rlgNormalizeHash(hash) {
if (!hash) return '';
return hash.toLowerCase().split('?')[0];
}
function rlgMaybeOpenFromHash() {
if (rlgNormalizeHash(window.location.hash) === platformHash) {
rlgOpenPopup('hash');
}
}
function rlgGetWidgetUrl() {
return window.location.origin + window.location.pathname + platformHash;
}
function rlgTrackEvent(eventType, extra) {
if (!rlgTrackEndpointResolved) return;
var payload = {
businessEmail: rlgEmail,
businessName: rlgBusinessName,
platform: rlgPlatform,
eventType: eventType,
timestamp: new Date().toISOString(),
pageUrl: window.location.href,
referrer: document.referrer || '',
reviewLink: rlgReviewLink,
widgetUrl: rlgGetWidgetUrl()
};
if (extra) {
for (var key in extra) { payload[key] = extra[key]; }
}
try {
var body = JSON.stringify(payload);
if (navigator.sendBeacon) {
navigator.sendBeacon(rlgTrackEndpointResolved, new Blob([body], { type:
'application/json' }));
return;
}
fetch(rlgTrackEndpointResolved, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: body,
keepalive: true
}).catch(function() {});
} catch (err) {
// ignore tracking errors
}
}
function rlgShowError(id, message) {
var el = document.getElementById(id);
if (!el) return;
if (message) el.textContent = message;
el.classList.add('rlg-is-visible');
}
function rlgHideError(id) {
var el = document.getElementById(id);
if (el) el.classList.remove('rlg-is-visible');
}
function rlgTrapFocus(e) {
var popup = document.getElementById('rlgPopup');
if (e.key !== 'Tab' || !popup.classList.contains('rlg-is-open')) return;
var items = popup.querySelectorAll('button, textarea, input[name="rlgRating"], [href]');
var focusable = [];
for (var i = 0; i < items.length; i++) {
if (items[i].offsetParent !== null || items[i].name === 'rlgRating') focusable.push(items[i]);
}
if (!focusable.length) return;
var first = focusable[0];
var last = focusable[focusable.length - 1];
if (e.shiftKey && document.activeElement === first) {
e.preventDefault();
last.focus();
} else if (!e.shiftKey && document.activeElement === last) {
e.preventDefault();
first.focus();
}
}
function rlgResetState() {
var checked = document.querySelector('#rlgPopup input[name="rlgRating"]:checked');
if (checked) checked.checked = false;
rlgLastRating = 0;
rlgSending = false;
document.getElementById('rlgFeedbackText').value = '';
var btn = document.getElementById('rlgFeedbackBtn');
btn.disabled = false;
btn.textContent = 'Send feedback';
rlgHideError('rlgRatingError');
rlgHideError('rlgFeedbackError');
document.getElementById('rlgFeedbackForm').classList.remove('rlg-is-visible');
document.getElementById('rlgThankYou').classList.remove('rlg-is-visible');
document.querySelector('#rlgPopup .rlg-star-rating-wrapper').style.display = '';
var reviews = document.querySelector('#rlgPopup .rlg-positive-reviews');
if (reviews) reviews.classList.remove('rlg-is-hidden');
}
function rlgOpenPopup(source) {
var popup = document.getElementById('rlgPopup');
if (popup.classList.contains('rlg-is-open')) return;
rlgLastFocused = document.activeElement;
rlgResetState();
popup.classList.add('rlg-is-open');
popup.setAttribute('aria-hidden', 'false');
rlgPreviousOverflow = document.body.style.overflow;
document.body.style.overflow = 'hidden';
document.getElementById('rlgClosePopup').focus();
rlgTrackEvent('widget_open', { source: source || 'button' });
}
function rlgClosePopup() {
var popup = document.getElementById('rlgPopup');
popup.classList.remove('rlg-is-open');
popup.setAttribute('aria-hidden', 'true');
document.body.style.overflow = rlgPreviousOverflow;
if (rlgLastFocused && rlgLastFocused.focus) rlgLastFocused.focus();
}
window.rlgSubmitReview = function() {
var rating = document.querySelector('#rlgPopup input[name="rlgRating"]:checked');
if (!rating) {
rlgShowError('rlgRatingError');
return;
}
rlgHideError('rlgRatingError');
rlgLastRating = parseInt(rating.value, 10);
if (rlgLastRating >= rlgMinRating) {
rlgTrackEvent('review_redirect', { rating: rlgLastRating });
window.location.href = rlgReviewLink;
} else {
document.getElementById('rlgFeedbackForm').classList.add('rlg-is-visible');
document.querySelector('#rlgPopup .rlg-star-rating-wrapper').style.display = 'none';
var reviews = document.querySelector('#rlgPopup .rlg-positive-reviews');
if (reviews) reviews.classList.add('rlg-is-hidden');
document.getElementById('rlgFeedbackText').focus();
}
};
window.rlgSubmitFeedback = function() {
if (rlgSending) return;
var btn = document.getElementById('rlgFeedbackBtn');
var feedback = document.getElementById('rlgFeedbackText').value;
if (feedback.trim() === '') {
rlgShowError('rlgFeedbackError', 'Add a few words so we know what to fix.');
return;
}
if (!rlgFeedbackEndpointResolved) {
rlgShowError('rlgFeedbackError', 'Feedback isn\'t set up right now. Please call us instead.');
return;
}
rlgHideError('rlgFeedbackError');
rlgSending = true;
btn.disabled = true;
btn.textContent = 'Sending...';
fetch(rlgFeedbackEndpointResolved, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
businessName: rlgBusinessName,
businessEmail: rlgEmail,
customerRating: rlgLastRating || 0,
customerFeedback: feedback,
platform: rlgPlatform,
timestamp: new Date().toISOString()
})
})
.then(function(res) {
if (!res.ok) throw new Error('Failed to send feedback');
return res.json().catch(function() { return {}; });
})
.then(function() {
rlgTrackEvent('feedback_submit', { rating: rlgLastRating || 0 });
document.getElementById('rlgFeedbackForm').classList.remove('rlg-is-visible');
document.getElementById('rlgThankYou').classList.add('rlg-is-visible');
})
.catch(function() {
rlgSending = false;
btn.disabled = false;
btn.textContent = 'Send feedback';
rlgShowError('rlgFeedbackError', 'That didn\'t send. Check your connection and try again.');
});
};
function rlgInit() {
var popup = document.getElementById('rlgPopup');
if (!popup || popup.dataset.rlgInit === '1') return;
popup.dataset.rlgInit = '1';
// Move the overlay to <body> so ancestor transform/filter/overflow
// rules can't break position: fixed.
if (popup.parentNode !== document.body) {
document.body.appendChild(popup);
}
document.getElementById('rlgOpenPopup').addEventListener('click', function() {
rlgOpenPopup('button');
});
document.getElementById('rlgClosePopup').addEventListener('click', rlgClosePopup);
popup.addEventListener('click', function(e) {
if (e.target === this) rlgClosePopup();
});
document.addEventListener('keydown', function(e) {
if (e.key === 'Escape' && popup.classList.contains('rlg-is-open')) rlgClosePopup();
rlgTrapFocus(e);
});
// Support #review for Google, platform-specific hashes for others
platformHash = platformHash.toLowerCase();
rlgMaybeOpenFromHash();
window.addEventListener('hashchange', rlgMaybeOpenFromHash);
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', rlgInit);
} else {
rlgInit();
}
})();
</script>
<!-- End Review Link Generator Widget -->`;

type CapturedListener = [
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
];

export function ReviewLinkGeneratorWidget() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const previousBodyOverflow = document.body.style.overflow;
    host.innerHTML = REVIEW_WIDGET_HTML;

    const sourceScript = host.querySelector("script");
    const scriptText = sourceScript?.textContent ?? "";
    if (!scriptText) return;

    const documentListeners: CapturedListener[] = [];
    const windowListeners: CapturedListener[] = [];
    const originalDocumentAddEventListener = document.addEventListener;
    const originalWindowAddEventListener = window.addEventListener;

    document.addEventListener = ((
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ) => {
      documentListeners.push([type, listener, options]);
      originalDocumentAddEventListener.call(document, type, listener, options);
    }) as typeof document.addEventListener;

    window.addEventListener = ((
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ) => {
      windowListeners.push([type, listener, options]);
      originalWindowAddEventListener.call(window, type, listener, options);
    }) as typeof window.addEventListener;

    try {
      const executableScript = document.createElement("script");
      executableScript.textContent = scriptText;
      document.body.appendChild(executableScript);
      executableScript.remove();
    } finally {
      document.addEventListener = originalDocumentAddEventListener;
      window.addEventListener = originalWindowAddEventListener;
    }

    const openFromReviewsHash = () => {
      const hash = window.location.hash.toLowerCase().split("?")[0];
      if (hash === "#reviews") {
        document.getElementById("rlgOpenPopup")?.click();
      }
    };

    openFromReviewsHash();
    window.addEventListener("hashchange", openFromReviewsHash);

    return () => {
      window.removeEventListener("hashchange", openFromReviewsHash);
      for (const [type, listener, options] of documentListeners) {
        document.removeEventListener(type, listener, options);
      }
      for (const [type, listener, options] of windowListeners) {
        window.removeEventListener(type, listener, options);
      }

      document.getElementById("rlgPopup")?.remove();
      document.body.style.overflow = previousBodyOverflow;
      host.innerHTML = "";
    };
  }, []);

  return (
    <div className="w-full py-8 md:py-10">
      <style>{`
        #rlgOpenPopup.rlg-review-button {
          min-width: 220px;
          background: #0b1118;
          color: #f4c400;
          border: 1px solid #f4c400;
          border-radius: 2px;
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.10);
        }

        #rlgOpenPopup.rlg-review-button:hover {
          background: #f4c400;
          color: #0b1118;
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
        }
      `}</style>
      <div ref={hostRef} />
    </div>
  );
}
