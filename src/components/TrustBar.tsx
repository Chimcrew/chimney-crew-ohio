import { HomeIcon, Clock, Tag, Wrench, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: HomeIcon, label: "Family Owned & Operated" },
  { icon: Clock, label: "Fast Response Times" },
  { icon: Tag, label: "Upfront Pricing" },
  { icon: Wrench, label: "Experienced Technicians" },
  { icon: ShieldCheck, label: "Fully Insured" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Why Ohio homeowners trust ChimCrew"
      className="relative z-10 border-b border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition hover:border-flame/50"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-flame/10 text-flame transition group-hover:bg-flame/20">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-display text-xs font-bold uppercase leading-tight tracking-wider text-foreground sm:text-[0.8rem]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}