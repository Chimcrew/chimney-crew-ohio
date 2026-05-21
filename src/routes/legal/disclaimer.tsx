import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/disclaimer")({
  head: () => ({ meta: [{ title: "Disclaimer — ChimCrew" }, { name: "description", content: "General disclaimer regarding ChimCrew website content and chimney service recommendations." }] }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <LegalPage kicker="// Legal" title="Disclaimer" updated="May 2026">
      <Section title="General information">
        <p>The information on this website is provided for general informational purposes only. It is not a substitute for a professional in-person inspection or service. Chimney conditions vary widely between homes and any safety decisions should be made based on a written report from a qualified inspector.</p>
      </Section>
      <Section title="No fire-safety guarantee">
        <p>Chimney sweeping and inspection reduce, but do not eliminate, the risk of chimney fire or carbon-monoxide exposure. Customers are responsible for installing and maintaining working smoke and CO detectors on every floor of their home.</p>
      </Section>
      <Section title="Pricing examples">
        <p>Any pricing shown on this website is a starting estimate. Final pricing is provided in writing before service begins and may vary based on chimney type, condition, and access.</p>
      </Section>
      <Section title="External links">
        <p>This site may link to third-party websites. ChimCrew is not responsible for the content or practices of those sites.</p>
      </Section>
      <Section title="Photography">
        <p>Before-and-after photography may be representative of typical results and is not a guarantee of outcome for any specific chimney.</p>
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
