import { createFileRoute } from "@tanstack/react-router";
import sweep from "@/assets/sweep-rooftop.jpg";
import fireplace from "@/assets/fireplace-cozy.jpg";
import before from "@/assets/before-chimney.jpg";
import after from "@/assets/after-chimney.jpg";
import truck from "@/assets/chimcrew-truck-original.jpeg";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ChimCrew on the job in Ohio" },
      { name: "description", content: "Photos of ChimCrew at work — trucks, technicians, fireplaces, and finished jobs across Columbus, Cincinnati, and Dayton." },
    ],
  }),
  component: GalleryPage,
});

const photos = [
  { src: truck, alt: "ChimCrew flame-wrapped pickup truck", tall: true },
  { src: sweep, alt: "Technician on a rooftop", tall: false },
  { src: fireplace, alt: "Cozy fireplace after service", tall: false },
  { src: after, alt: "Clean chimney flue interior", tall: true },
  { src: before, alt: "Soot-caked flue interior", tall: false },
  { src: sweep, alt: "Tech with chimney brushes at golden hour", tall: false },
  { src: fireplace, alt: "Living room fireplace", tall: true },
  { src: truck, alt: "Truck parked at job site", tall: false },
];

function GalleryPage() {
  return (
    <>
      <section className="relative border-b-2 border-primary/30 bg-card/40 py-20">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// Gallery</p>
          <h1 className="mt-3 text-6xl md:text-7xl">On the <span className="text-flame">job.</span></h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The trucks, the crew, the fireplaces — straight from our work in
            Ohio neighborhoods.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((p, i) => (
              <figure key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-sm border-2 border-border transition hover:border-primary">
                <img
                  src={p.src}
                  alt={p.alt}
                  className={`w-full object-cover ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <LeadForm />
    </>
  );
}
