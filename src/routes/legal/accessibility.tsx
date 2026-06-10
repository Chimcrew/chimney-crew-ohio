import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility — ChimCrew" }, { name: "description", content: "ChimCrew's commitment to website accessibility for all visitors." }] }),
  component: Accessibility,
});

function Accessibility() {
  return (
    <LegalPage kicker="// Legal" title="Accessibility Statement" updated="May 2026">
      <Section title="Our commitment">
        <p>ChimCrew is committed to making this website accessible to everyone, including people with disabilities. We design and build with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as our target.</p>
      </Section>
      <Section title="What we do">
        <ul className="list-disc space-y-2 pl-6">
          <li>Use semantic HTML and ARIA where appropriate</li>
          <li>Provide alternative text for meaningful images</li>
          <li>Ensure keyboard navigability across all interactive elements</li>
          <li>Maintain readable color contrast across the site</li>
          <li>Test with screen readers and keyboard-only navigation</li>
        </ul>
      </Section>
      <Section title="Need help?">
        <p>If you have trouble using any part of this website, please call us at (614) 549-1954 or email <a href="mailto:access@chimcrew.com" className="text-primary">access@chimcrew.com</a> and a real person on our crew will help you book service over the phone.</p>
      </Section>
      <Section title="Feedback">
        <p>We welcome feedback on accessibility. Please tell us where we can do better.</p>
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
