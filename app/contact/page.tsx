import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="site-container py-20 md:py-32">
      <p className="kicker">Contact</p>
      <h1 className="section-title mt-8 max-w-5xl">Bring us the decision problem.</h1>
      <p className="mt-8 max-w-2xl text-lg leading-7 text-[color:var(--muted)]">
        The production contact workflow will be connected before launch. It should capture the institution, the decision or portfolio problem, current data availability and the outcome the engagement needs to improve.
      </p>
      <div className="mt-20 grid gap-px bg-black/15 md:grid-cols-3">
        {[
          ["01", "Institution", "Who are you, what products do you offer, and who makes the decision today?"],
          ["02", "Problem", "What lending, risk, data or operational decision is currently failing or constrained?"],
          ["03", "Outcome", "What would materially improve: approval quality, defaults, speed, explainability, data or policy control?"],
        ].map(([number, title, copy]) => (
          <div key={number} className="min-h-64 bg-[color:var(--background)] p-6">
            <span className="kicker text-[color:var(--muted)]">{number}</span>
            <h2 className="mt-20 text-2xl tracking-[-0.045em]">{title}</h2>
            <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
