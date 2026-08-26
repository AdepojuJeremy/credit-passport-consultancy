import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { engagementPatterns } from "@/data/engagement-patterns";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Selected CreditPassport consulting work and engagement patterns, published with explicit evidence and claims standards.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <p className="kicker">Selected work</p>
          <h1 className="section-title mt-8 max-w-5xl">Evidence before claims.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-7 text-[color:var(--muted)]">
            The current public portfolio shows anonymized engagement patterns and the evidence standard behind them. Named client case studies and numerical outcomes will only be added after context, data and publication permission are reviewed.
          </p>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.45fr_1.55fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Engagement patterns</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">
              These pages describe real problem classes present in the consulting material, but they intentionally stop short of unverified result claims.
            </p>
          </aside>

          <div className="grid gap-px bg-[color:var(--line)] md:grid-cols-3">
            {engagementPatterns.map((pattern) => (
              <Link
                key={pattern.slug}
                href={`/case-studies/${pattern.slug}`}
                className="group flex min-h-[340px] flex-col bg-[color:var(--background)] p-7 transition-colors hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="kicker text-[color:var(--muted)]">{pattern.number}</span>
                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={17} />
                </div>
                <div className="mt-auto">
                  <p className="kicker text-[color:var(--brand-blue)]">{pattern.status}</p>
                  <h2 className="mt-4 text-2xl tracking-[-0.045em]">{pattern.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{pattern.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container grid gap-10 py-20 md:grid-cols-[0.45fr_1.55fr] md:py-28">
          <p className="kicker text-white/50">Publication standard</p>
          <div>
            <h2 className="max-w-4xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              A case study is an evidence object, not a sales anecdote.
            </h2>
            <p className="mt-7 max-w-3xl text-base leading-7 text-white/60">
              A published case study should make the original decision problem, intervention, evidence, outcome definition and limitations inspectable. If the evidence is not ready, the claim is not ready.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
