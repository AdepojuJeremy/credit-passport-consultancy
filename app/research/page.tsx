import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { researchPosts } from "@/data/research-posts";

export const metadata: Metadata = {
  title: "Research",
  description:
    "CreditPassport Research: practitioner research on decision theory, credit risk, financial intelligence, model risk and decision systems.",
};

export default function ResearchPage() {
  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <p className="kicker">CreditPassport Research</p>
          <h1 className="section-title mt-8 max-w-5xl">Research for consequential decisions.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-7 text-[color:var(--muted)]">
            We study how lenders and financial institutions make high-stakes decisions under uncertainty: how evidence becomes features, predictions become policy, uncertainty becomes review, and interventions are validated against real outcomes.
          </p>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.45fr_1.55fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Current notes</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">
              These are practitioner research notes grounded in the CreditPassport decision architecture. They are frameworks and hypotheses—not claims of external empirical validation. Where external literature, standards or supervisory guidance are relevant, the notes cite them as context rather than as proof of CreditPassport outcomes.
            </p>
          </div>

          <div className="border-t hairline">
            {researchPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/research/${post.slug}`}
                className="group grid gap-5 border-b hairline py-8 md:grid-cols-[70px_1.2fr_1fr_24px] md:items-start"
              >
                <span className="kicker text-[color:var(--muted)]">{post.number}</span>
                <div>
                  <p className="kicker text-[color:var(--brand-blue)]">{post.category}</p>
                  <h2 className="mt-3 text-3xl tracking-[-0.05em]">{post.title}</h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">{post.dek}</p>
                <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container grid gap-10 py-20 md:grid-cols-[0.45fr_1.55fr] md:py-28">
          <p className="kicker">Research standard</p>
          <div>
            <h2 className="max-w-4xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Separate the framework from the evidence.
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Framework", "A structured way to think about a decision problem."],
                ["Hypothesis", "A proposition that should be tested against relevant data and outcomes."],
                ["External context", "Literature, standards or guidance that situate an adjacent concept without validating CreditPassport itself."],
                ["Finding", "A claim supported by reviewed evidence, with limitations stated."],
              ].map(([title, copy]) => (
                <div key={title} className="border-t hairline pt-5">
                  <h3 className="text-xl tracking-[-0.04em]">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
