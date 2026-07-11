import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — ChimCrew" }, { name: "description", content: "How ChimCrew collects, uses, and protects your personal information." }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage kicker="// Legal" title="Privacy Policy" updated="May 2026">
      <Section title="1. Who we are">
        <p>ChimCrew Chimney Services ("ChimCrew", "we", "us") is a locally-owned chimney service company operating in Columbus, Cincinnati, and Dayton, Ohio. This policy explains what data we collect when you use this website or request our services, and what we do with it.</p>
      </Section>
      <Section title="2. What we collect">
        <p>When you submit our quote form, we collect your name, phone number, email (if provided), service address, and any notes you choose to share. We also log basic technical information (IP, browser, referrer) for security and analytics.</p>
      </Section>
      <Section title="3. How we use it">
        <p>We use your information to: (a) respond to your quote request and schedule service; (b) send service-related communications (appointment reminders, photo reports, invoices); (c) improve our website and service quality. We do not sell your data.</p>
      </Section>
      <Section title="4. Who we share it with">
        <p>We share information only with service providers that help us operate (e.g., scheduling, payment processing, email delivery, analytics), and only as needed. We may also disclose information if required by law.</p>
      </Section>
      <Section title="5. Your rights">
        <p>You may request a copy of the personal data we hold about you, ask us to correct it, or request deletion. Email <a href="mailto:privacy@chimcrew.com" className="text-primary">privacy@chimcrew.com</a>.</p>
      </Section>
      <Section title="6. Cookies">
        <p>This site uses minimal cookies for analytics and basic functionality. You can disable cookies in your browser, but parts of the site may not work as expected.</p>
      </Section>
      <Section title="7. Contact">
        <p>Questions? Email <a href="mailto:privacy@chimcrew.com" className="text-primary">privacy@chimcrew.com</a> or call (614) 683-5763.</p>
      </Section>
      <Section title="8. SMS/Text Messaging">
        <p>ChimCrew sends text message updates and responses to customers about pricing and products offered at https://chimcrew.com/.</p>
        <p>Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.</p>
        <p>At ChimCrew, we respect your privacy. We use information you provide to send and respond to your mobile messages. This includes sharing it with platform providers, phone companies, and other vendors who help us deliver messages. We won't share mobile information with third parties for marketing. Text messaging originator opt-in data and consent are exempt from this. We may disclose information to satisfy legal, regulatory, or governmental requests, avoid liability, or protect our rights or property. This policy applies to your use of the Text Message Service and doesn't modify our general Privacy Policy, which may govern our relationship with you in other contexts.</p>
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
