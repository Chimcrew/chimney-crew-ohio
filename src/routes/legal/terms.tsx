import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — ChimCrew" }, { name: "description", content: "Terms governing your use of the ChimCrew website and services." }] }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage kicker="// Legal" title="Terms of Service" updated="May 2026">
      <Section title="1. Acceptance">
        <p>By using this website or booking services with ChimCrew Chimney Services, you agree to these Terms of Service. If you do not agree, please do not use the site or our services.</p>
      </Section>
      <Section title="2. Service estimates">
        <p>Quotes provided online or by phone are estimates based on the information you supply. Final pricing is confirmed in writing before any work begins. We will never charge more than the agreed-upon flat rate without your written approval.</p>
      </Section>
      <Section title="3. Scheduling and cancellations">
        <p>Appointments may be rescheduled or cancelled up to 24 hours before the scheduled time at no charge. Same-day cancellations may be subject to a $75 trip fee.</p>
      </Section>
      <Section title="4. Workmanship warranty">
        <p>Our workmanship is warrantied for 12 months unless otherwise stated in your service agreement. Manufacturer warranties apply to parts and materials.</p>
      </Section>
      <Section title="5. Payment">
        <p>Payment is due upon completion of service unless other arrangements are made in writing. We accept major credit cards, ACH, and check.</p>
      </Section>
      <Section title="6. Limitation of liability">
        <p>ChimCrew's liability for any claim is limited to the amount paid for the service giving rise to the claim. We are not liable for pre-existing conditions or damage caused by structural deficiencies disclosed in our written reports.</p>
      </Section>
      <Section title="7. Governing law">
        <p>These terms are governed by the laws of the State of Ohio.</p>
      </Section>
    </LegalPage>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-3 text-2xl">{title}</h2>
      <div className="space-y-3 text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}
