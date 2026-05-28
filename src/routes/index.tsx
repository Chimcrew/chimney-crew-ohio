import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Phone,
  CalendarCheck,
  Wrench,
  Search,
  Sparkles,
  ShieldCheck,
  Flame,
  Star,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/chimcrew-logo.png";
import sweep from "@/assets/sweep-rooftop.jpg";
import fireplace from "@/assets/fireplace-cozy.jpg";
import beforeImg from "@/assets/before-chimney.jpg";
import afterImg from "@/assets/after-chimney.jpg";
import van from "@/assets/chimcrew-van.png";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChimCrew — Chimney Sweep in Columbus, Cincinnati & Dayton" },
      {
        name: "description",
        content:
          "Local Ohio chimney experts. Sweeps, inspections, repair and masonry in Columbus, Cincinnati and Dayton. Same-day callback, 24/7.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ReviewBanner />
      <Testimonial />
      <EmergencyCall />
      <ServicesGrid />
      <PeaceOfMind />
      <Pillars />
      <PromoStrip />
      <ServiceDetails />
      <Steps />
      <FaqSection />
      <ContactSection />
      <ServicesList />
      <RelatedArticles />
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-foreground/5 blur-3xl" aria-hidden />
      <div className="absolute right-10 bottom-10 h-40 w-40 rounded-full bg-flame/10 blur-2xl" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-12 md:px-8 md:py-24">
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="ChimCrew Chimney Sweep logo"
            className="w-full max-w-md drop-shadow-[0_20px_40px_oklch(0.18_0.02_250/0.25)]"
          />
        </div>

        <div>
          <h1 className="font-display text-3xl leading-tight text-primary md:text-5xl">
            The Chimney Experts You've Trusted for Over 50 Years In Your Area
          </h1>
          <p className="mt-5 text-lg text-foreground md:text-xl">
            Servicing Your Area And Surrounding Areas • Chimney Inspections, Repair And Cleaning Near Me
          </p>

          <ul className="mt-6 space-y-3 text-lg font-semibold text-primary">
            {[
              "Locally Owned & Operated",
              "Certified | Licensed | Insured",
              "Satisfaction Guaranteed",
            ].map((line) => (
              <li key={line} className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-flame" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <p className="font-display text-2xl text-flame">Call Us Now!</p>
            <a
              href="tel:5551234567"
              className="font-display text-3xl tracking-wider text-primary hover:text-flame md:text-4xl"
            >
              555-123-4567
            </a>
          </div>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 font-display text-base uppercase tracking-wider text-primary-foreground shadow-hard transition hover:brightness-110"
          >
            Schedule Online <CalendarCheck className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- REVIEW BANNER ---------- */
function ReviewBanner() {
  const platforms = ["Yelp", "Angi", "HomeAdvisor", "Google", "Porch", "BBB"];
  return (
    <section className="bg-primary py-10 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-display text-base uppercase tracking-widest">
          5 STAR — Based On 1,836 Reviews
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-6">
          {platforms.map((p) => (
            <div
              key={p}
              className="flex flex-col items-center justify-center gap-1 rounded-sm bg-background px-3 py-4 text-foreground shadow-flame"
            >
              <span className="font-display text-base uppercase tracking-wider">{p}</span>
              <div className="flex gap-0.5 text-flame">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIAL ---------- */
function Testimonial() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <h2 className="font-display text-3xl text-primary md:text-4xl">Customer Testimonials</h2>
        <div className="mt-4 flex justify-center gap-1 text-flame">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-6 w-6 fill-current" />
          ))}
        </div>
        <p className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
          I've used ChimCrew for maintenance and other repairs &amp; cleaning, and I'm always
          impressed with their level of service. They use top-quality materials and are very
          detail-oriented. My chimney has never been in better shape, and I appreciate their
          commitment to safety and customer satisfaction.
        </p>
        <Link
          to="/reviews"
          className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-flame hover:underline"
        >
          More From Our Customers <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ---------- EMERGENCY CALL ---------- */
function EmergencyCall() {
  return (
    <section className="bg-flame py-6 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center md:flex-row md:gap-6 md:px-8">
        <Flame className="h-6 w-6" />
        <p className="font-display text-lg uppercase tracking-wider md:text-xl">
          For emergency service Call:
        </p>
        <a href="tel:5551234567" className="font-display text-2xl tracking-wider hover:underline">
          555-123-4567
        </a>
      </div>
    </section>
  );
}

/* ---------- SERVICES GRID (4 cards) ---------- */
function ServicesGrid() {
  const items = [
    {
      icon: Sparkles,
      title: "Chimney Cleaning",
      sub: "and Fireplace Cleaning",
      body: "Remove creosote buildup and debris for a safer, more efficient fireplace and improved indoor air quality.",
    },
    {
      icon: Search,
      title: "Chimney Inspection",
      sub: "and Fireplace Inspection",
      body: "Ensure your chimney's structural integrity and functionality with a thorough inspection to prevent hazards and issues.",
    },
    {
      icon: ShieldCheck,
      title: "Chimney Maintenance",
      sub: "and Fireplace Maintenance",
      body: "Regular maintenance prolongs chimney life, ensuring safety, efficiency, and preventing costly future repairs.",
    },
    {
      icon: Wrench,
      title: "Chimney Repair",
      sub: "and Fireplace Repair",
      body: "Fix cracks, leaks, Gas Fireplace Repair and structural issues to restore your chimney's safety, functionality, and aesthetic appeal.",
    },
  ];
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="text-center font-display text-3xl uppercase tracking-wider text-primary md:text-4xl">
          Our Chimney Services
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, sub, body }) => (
            <div
              key={title}
              className="group flex flex-col items-center rounded-sm border-2 border-border bg-card p-6 text-center transition hover:-translate-y-1 hover:border-flame hover:shadow-flame"
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-flame">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-lg text-primary">{title}</h3>
              <p className="text-sm font-semibold text-flame">{sub}</p>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PEACE OF MIND (image + headline) ---------- */
function PeaceOfMind() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
        <div className="overflow-hidden rounded-sm border-4 border-flame shadow-flame">
          <img src={sweep} alt="Chimney sweep on a rooftop" className="h-full w-full object-cover" />
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase tracking-wider text-flame md:text-3xl">
            Leave Chimney to the Pros
          </h3>
          <p className="mt-4 font-display text-xl leading-snug md:text-2xl">
            Because with ChimCrew, you get more than just a service — you get peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4 PILLARS ---------- */
function Pillars() {
  const items = [
    {
      title: "Reputation",
      body:
        "Trusted chimney experts since 1975 in Your Area. Delivering exceptional service and craftsmanship with decades of proven expertise.",
    },
    {
      title: "Transparency",
      body:
        "No hidden fees — our honest pricing covers chimney services any time, including holidays.",
    },
    {
      title: "Efficiency",
      body:
        "Prompt same-day and emergency chimney services, available 365 days a year to meet your needs.",
    },
    {
      title: "Quality",
      body:
        "Comprehensive chimney work, from cleaning to repair, using advanced techniques and the latest equipment.",
    },
  ];
  return (
    <section className="bg-background py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 lg:grid-cols-4 md:px-8">
        {items.map((p) => (
          <div key={p.title} className="border-l-4 border-flame pl-5">
            <h3 className="font-display text-2xl uppercase tracking-wider text-primary">{p.title}</h3>
            <p className="mt-3 text-base text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- PROMO STRIP ---------- */
function PromoStrip() {
  return (
    <section className="relative bg-flame py-16 text-white">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
        <p className="font-display text-sm uppercase tracking-widest opacity-90">
          Limited Time Offer
        </p>
        <h2 className="mt-2 font-display text-4xl uppercase tracking-wider md:text-6xl">
          $69 Chimney Inspection Service
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed md:text-lg">
          Chimney cleaning in Your Area is not merely about appearances; it's a crucial step in
          safeguarding your home's air quality and overall safety. Regular cleaning reduces the
          buildup of harmful contaminants and ensures that your chimney operates efficiently,
          minimizing potential fire hazards.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 md:flex-row">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-display text-base uppercase tracking-wider text-primary-foreground shadow-hard"
          >
            Schedule Online <CalendarCheck className="h-5 w-5" />
          </Link>
          <a
            href="tel:5551234567"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-white bg-transparent px-6 py-3 font-display text-base uppercase tracking-wider text-white hover:bg-white hover:text-flame"
          >
            Call Now 555-123-4567 <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- DETAILED SERVICE SECTIONS ---------- */
function ServiceDetails() {
  const sections = [
    {
      title: "Chimney Cleaning",
      sub: "Exceptional Chimney Cleaning Services in Your Area",
      body:
        "Chimney cleaning services. Maintaining a clean chimney is essential for the safety and efficiency of your fireplace or stove. Over time, soot, creosote, and other debris accumulate inside your chimney, posing fire hazards and reducing efficiency. Our expert technicians are committed to ensuring your chimney remains clean and safe for use.",
      image: fireplace,
    },
    {
      title: "Chimney Inspection",
      sub: "Exceptional Chimney Inspection",
      body:
        "Regular chimney inspections are crucial for the safety and efficiency of your fireplace or stove. Over time, issues such as soot buildup, creosote accumulation, and structural concerns pose significant fire hazards and reduce efficiency. Our expert technicians are dedicated to thoroughly inspecting your chimney to ensure it remains safe and in optimal condition for use.",
      image: beforeImg,
    },
    {
      title: "Chimney Repair",
      sub: "Professional Chimney Repair Services",
      body:
        "At ChimCrew, we offer expert chimney repair services to homeowners. A well-maintained chimney is essential for the safety and efficiency of your fireplace or stove. Over time, your chimney can suffer from wear and tear, weather damage, and other issues that compromise its integrity. Our skilled technicians are here to provide comprehensive chimney repairs, ensuring your chimney remains safe and functional.",
      image: afterImg,
    },
    {
      title: "Gas Fireplace Service",
      sub: "Fireplace Installation, Repair, and Maintenance",
      body:
        "At ChimCrew Fireplace Services, we offer expert solutions for all your fireplace needs. From gas fireplace repairs and installation to inspections, maintenance, and pilot light fixes, our skilled technicians ensure safe and efficient operation year-round. Whether it's a new installation or troubleshooting why your pilot light won't stay lit, we've got you covered!",
      image: fireplace,
    },
    {
      title: "Chimney Masonry",
      sub: "Quality Chimney Rebuilding Experts",
      body:
        "Chimney masonry involves building and maintaining brick, stone, or concrete chimneys. Weather, moisture, and heat can cause cracks, spalling, and deterioration over time. ChimCrew offers expert chimney rebuilding, tuckpointing, waterproofing, and crown repairs to ensure safety and durability. Trust ChimCrew for reliable service and lasting chimney solutions.",
      image: sweep,
    },
    {
      title: "Chimney Maintenance",
      sub: "Top-Notch Chimney Maintenance Services",
      body:
        "At ChimCrew, we specialize in providing comprehensive chimney maintenance services to homeowners. Regular chimney maintenance is essential for the safety, efficiency, and longevity of your fireplace or stove. Our skilled technicians are dedicated to keeping your chimney in optimal condition, ensuring that it operates safely and efficiently year-round.",
      image: afterImg,
    },
  ];

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl space-y-16 px-4 md:px-8">
        {sections.map((s, i) => (
          <div
            key={s.title}
            className={`grid items-center gap-10 md:grid-cols-2 ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div>
              <h3 className="font-display text-3xl uppercase tracking-wider text-primary md:text-4xl">
                {s.title}
              </h3>
              <p className="mt-3 font-display text-lg text-flame">{s.sub}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
            <div className="overflow-hidden rounded-sm border-4 border-primary shadow-flame">
              <img src={s.image} alt={s.title} className="h-72 w-full object-cover md:h-96" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 4 STEPS ---------- */
function Steps() {
  const steps = [
    {
      n: "1",
      title: "Reach Out to Us",
      body:
        "Contact our expert team by phone or visit our book an appointment page to schedule your Chimney Sweep service.",
    },
    {
      n: "2",
      title: "Provide Your Details",
      body:
        "Share your address and any specific details about your home that could impact the service, ensuring our team is well-prepared.",
    },
    {
      n: "3",
      title: "Schedule Your Service",
      body:
        "Discuss the urgency of your needs, and we'll arrange a convenient date and time for our team to visit.",
    },
    {
      n: "4",
      title: "Receive a Customized Quote",
      body:
        "Our local service technician will assess your requirements and provide a quote based on your chimney.",
    },
  ];

  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="text-center font-display text-3xl uppercase tracking-wider md:text-4xl">
          How To Get In Touch With ChimCrew?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-sm border-2 border-flame/40 bg-primary/40 p-6">
              <div className="font-display text-6xl text-flame">{s.n}</div>
              <h3 className="mt-3 font-display text-xl uppercase tracking-wider">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-90">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 md:flex-row">
          <a
            href="tel:5551234567"
            className="inline-flex items-center gap-2 rounded-sm bg-flame px-6 py-3 font-display text-base uppercase tracking-wider text-white shadow-flame hover:brightness-110"
          >
            Call Now 555-123-4567 <Phone className="h-5 w-5" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-white bg-transparent px-6 py-3 font-display text-base uppercase tracking-wider text-white hover:bg-white hover:text-primary"
          >
            Schedule Online <CalendarCheck className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FaqSection() {
  const faqs = [
    {
      q: "Why choose ChimCrew?",
      a: "With 50 years of expertise, we provide professional, reliable chimney services, ensuring safety and efficiency in every home.",
    },
    {
      q: "What does ChimCrew stand for?",
      a: "ChimCrew is the crew of certified chimney technicians who built the company with a focus on quality chimney services, reflecting decades of trusted service to homes across Ohio.",
    },
    {
      q: "What services do you offer?",
      a: "We offer chimney cleaning, inspection, repairs, maintenance, creosote removal, waterproofing, and more for optimal performance.",
    },
    {
      q: "How much is a chimney inspection?",
      a: "Our chimney inspection costs $69. It includes a comprehensive check to identify potential issues.",
    },
    {
      q: "Can you clean and repair together?",
      a: "Yes, we offer same-day cleaning and repair services during your appointment if needed.",
    },
    {
      q: "How do I book an appointment?",
      a: "Call us at 555-123-4567 or fill out the online form to schedule your visit.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[1fr_1.2fr] md:px-8">
        <div>
          <h2 className="font-display text-3xl uppercase tracking-wider text-primary md:text-4xl">
            Got Questions? We've Got Answers.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Feel free to reach out to us by phone. For the fastest response, we are available by
            phone 24/7 and ready to provide you with a complimentary consultation.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-display text-sm uppercase tracking-wider text-primary-foreground"
          >
            Contact Us <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <button
              key={f.q}
              onClick={() => setOpen(open === i ? null : i)}
              className="block w-full py-5 text-left"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-base uppercase tracking-wider text-primary">
                  {f.q}
                </span>
                <ChevronRight
                  className={`h-5 w-5 shrink-0 text-flame transition-transform ${
                    open === i ? "rotate-90" : ""
                  }`}
                />
              </div>
              {open === i && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function ContactSection() {
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl uppercase tracking-wider text-primary md:text-5xl">
            Get In Touch
          </h2>
          <p className="mt-3 font-display text-xl text-flame">
            Is there anything else you'd like to know?
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground">
            We are available via phone or by this form. However if you would like a quick response
            we are by our phones 24/7 to give you a phone consultation free of charge.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
            <a
              href="tel:5551234567"
              className="inline-flex items-center gap-2 rounded-sm bg-flame px-6 py-3 font-display text-base uppercase tracking-wider text-white shadow-flame"
            >
              Click To Call Us Now! <Phone className="h-5 w-5" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-display text-base uppercase tracking-wider text-primary-foreground"
            >
              Schedule Online <CalendarCheck className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="font-display text-2xl uppercase tracking-wider text-primary">
              Don't Hesitate To Reach Out!
            </h3>
            <p className="mt-3 text-base text-muted-foreground">
              If you need help with a new service or have questions about an existing one, please
              reach out via phone or by this form. Our team is here to assist you!
            </p>
          </div>
          <div className="mt-8">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FULL SERVICES LIST ---------- */
const allServices = [
  "Chimney Cleaning", "Chimney Sweep", "Chimney Inspection", "Chimney Repair",
  "Chimney Maintenance", "Creosote Removal", "Fireplace Cleaning",
  "Chimney Liner Installation", "Chimney Cap Installation", "Chimney Waterproofing",
  "Smoke Chamber Repair", "Chimney Relining", "Masonry Repair",
  "Chimney Crown Repair", "Chimney Repointing", "Chimney Leak Detection",
  "Chimney Animal Removal", "Chimney Odor Elimination", "Chimney Draft Issues",
  "Fireplace Damper Repair", "Chimney Safety Inspections", "Chimney Cap Replacement",
  "Chimney Flashing Repair", "Damper Installation", "Wood Stove Installation",
  "Gas Fireplace Installation", "Fireplace Insert Installation", "Chimney Tuckpointing",
  "Video Chimney Inspection", "Chimney Crown Replacement", "Pellet Stove Cleaning",
  "Gas Fireplace Repair",
];

function ServicesList() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-3xl uppercase tracking-wider text-primary md:text-4xl">
          Our Chimney Services
        </h2>
        <p className="mt-4 max-w-4xl text-base text-muted-foreground">
          At ChimCrew, we provide a full range of chimney services, including cleaning, inspection,
          repair, and maintenance. Our certified technicians are dedicated to ensuring your chimney
          is safe, efficient, and in optimal condition. We use only high-quality materials and
          cutting-edge equipment to deliver outstanding results, enhancing both the safety and
          comfort of your home while giving you peace of mind.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {allServices.map((s) => (
            <Link
              key={s}
              to="/services"
              className="rounded-sm border border-border bg-card px-3 py-2 font-mono text-xs text-foreground transition hover:border-flame hover:bg-flame hover:text-white"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RELATED ARTICLES ---------- */
function RelatedArticles() {
  const faqLinks = [
    { q: "How much do chimney repairs typically cost", tag: "Chimney Repair" },
    { q: "How long does chimney repair take", tag: "Chimney Repair" },
    { q: "Can chimney repairs be done year-round", tag: "Chimney Repair" },
    { q: "What does a chimney sweep do", tag: "Chimney Sweep" },
    { q: "How often should I schedule a chimney sweep", tag: "Chimney Sweep" },
  ];
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl uppercase tracking-wider text-primary md:text-4xl">
            Frequently Asked Questions
          </h2>
          <Link to="/blog" className="font-display text-sm uppercase tracking-widest text-flame hover:underline">
            View All
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faqLinks.map((f) => (
            <Link
              key={f.q}
              to="/blog"
              className="block rounded-sm border-2 border-border bg-card p-5 transition hover:border-flame"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-flame">{f.tag}</p>
              <p className="mt-2 font-display text-base text-primary">{f.q}</p>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex items-end justify-between">
          <h2 className="font-display text-3xl uppercase tracking-wider text-primary md:text-4xl">
            Related Articles
          </h2>
          <Link to="/blog" className="font-display text-sm uppercase tracking-widest text-flame hover:underline">
            View All
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "Why Annual Chimney Inspections Matter", img: sweep },
            { title: "Signs You Need Chimney Repair Now", img: beforeImg },
            { title: "How to Prepare Your Fireplace for Winter", img: fireplace },
          ].map((a) => (
            <Link
              key={a.title}
              to="/blog"
              className="group overflow-hidden rounded-sm border-2 border-border bg-card transition hover:border-flame hover:shadow-flame"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-flame">Blog</p>
                <p className="mt-2 font-display text-lg text-primary">{a.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
