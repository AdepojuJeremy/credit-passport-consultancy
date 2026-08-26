import type { Metadata } from "next";
import { researchTopics } from "@/data/research";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <section className="site-container py-20 md:py-32">
      <p className="kicker">CreditPassport Research</p>
      <h1 className="section-title mt-8 max-w-5xl">Research for consequential decisions.</h1>
      <p className="mt-8 max-w-3xl text-lg leading-7 text-[color:var(--muted)]">
        The research practice studies decision-making under uncertainty across credit, risk, causal inference, machine learning and economic systems. Publications will be added as reviewed research notes and papers are prepared for release.
      </p>
      <div className="mt-20 grid gap-px bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
        {researchTopics.map((topic, index) => (
          <article key={topic} className="min-h-52 bg-[color:var(--background)] p-6">
            <span className="kicker text-[color:var(--muted)]">0{index + 1}</span>
            <h2 className="mt-24 text-2xl tracking-[-0.045em]">{topic}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}
