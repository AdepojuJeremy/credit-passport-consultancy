import type { Metadata } from "next";
import { services } from "@/data/services";

export const metadata: Metadata = { title: "Consulting" };

export default function ConsultingPage() {
  return (
    <section className="site-container py-20 md:py-32">
      <p className="kicker">Consulting</p>
      <h1 className="section-title mt-8 max-w-5xl">Improve the system behind the decision.</h1>
      <p className="mt-8 max-w-2xl text-lg leading-7 text-[color:var(--muted)]">
        Engagements begin with the business decision, not with a predetermined model or technology stack. We diagnose the system, design an intervention and measure whether it changes outcomes.
      </p>
      <div className="mt-20 border-t hairline">
        {services.map((service) => (
          <article key={service.number} className="grid gap-5 border-b hairline py-8 md:grid-cols-[90px_1fr_1.2fr]">
            <span className="kicker text-[color:var(--muted)]">{service.number}</span>
            <h2 className="text-3xl tracking-[-0.05em]">{service.title}</h2>
            <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
