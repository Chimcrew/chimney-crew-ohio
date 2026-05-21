import { ReactNode } from "react";

export function LegalPage({ kicker, title, updated, children }: { kicker: string; title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="relative border-b-2 border-primary/30 bg-card/40 py-16">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{kicker}</p>
          <h1 className="mt-3 text-5xl md:text-6xl">{title}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-16">
        <article className="prose-legal mx-auto max-w-3xl px-4 md:px-8">
          {children}
        </article>
      </section>
    </>
  );
}
