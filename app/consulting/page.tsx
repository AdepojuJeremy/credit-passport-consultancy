import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { creditDecisionDiagnostic } from "@/data/diagnostic";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Credit strategy, decision intelligence, portfolio analytics, financial intelligence, AI/ML and decision infrastructure for lenders and fintechs.",
};

const engagementModes = [
  ["01", "Diagnostic", "Find the actual failure mode before prescribing technology: policy, data, workflow, model or infrastructure."],
  ["02", "Design", "Translate the diagnosis into an explicit decision framework, intervention and evidence plan."],
  ["03", "Build", "Implement the analytical, policy, data or system layer required to operationalize the change."],
  ["04", "Validate", "Measure the decision system against agreed business, risk, explainability and operational outcomes."],
] as const;

export default function ConsultingPage() {
  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <p className="kicker">Consulting</p>
          <h1 className="section-title mt-8 max-w-5xl">Improve the system behind the decision.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-7 text-[color:var(--muted)]">
            We work with lenders, fintechs and financial institutions on credit policy, risk, data, models and the infrastructure connecting them. Engagements begin with the decision problem—not a predetermined model or technology stack.
          </p>
        </div>
      </section>

      <section className="border-b hairline bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container grid gap-10 py-20 lg:grid-cols-[0.55fr_1.45fr] md:py-28">
          <div>
            <p className="kicker text-[color:var(--brand-mint)]">Flagship first engagement</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
              Use this when the institution knows the decision system needs to improve but the right intervention is not yet obvious.
            </p>
          </div>
          <div>
            <h2 className="max-w-4xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              {creditDecisionDiagnostic.title}
            </h2>
            <p className="mt-7 max-w-3xl text-base leading-7 text-white/60">{creditDecisionDiagnostic.description}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/diagnostic" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-mint)] px-6 py-3 text-sm font-medium text-[#081a3a]">
                See the diagnostic <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/contact?from=consulting" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-white">
                Discuss a specific brief
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Capabilities</p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[color:var(--muted)]">
              Each capability can stand alone or combine into a larger underwriting and decision-system engagement.
            </p>
          </div>
          <div className="border-t hairline">
            {services.map((service) => (
              <Link
                key={service.number}
                href={`/consulting/${service.slug}`}
                className="capability-row grid gap-5 border-b hairline py-8 md:grid-cols-[80px_1fr_1.2fr_24px] md:items-start"
              >
                <span className="kicker text-[color:var(--muted)]">{service.number}</span>
                <h2 className="text-3xl tracking-[-0.05em]">{service.title}</h2>
                <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">{service.description}</p>
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="kicker">Engagement model</p>
              <h2 className="mt-6 max-w-md font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em]">
                Diagnose before we automate.
              </h2>
            </div>
            <div className="grid gap-px bg-[color:var(--line)] sm:grid-cols-2">
              {engagementModes.map(([number, title, copy]) => (
                <article key={number} className="min-h-64 bg-[color:var(--background)] p-7">
                  <span className="kicker text-[color:var(--muted)]">{number}</span>
                  <h3 className="mt-16 text-2xl tracking-[-0.045em]">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-24 md:py-36">
        <div className="border-t hairline pt-8 md:flex md:items-end md:justify-between md:gap-12">
          <div>
            <p className="kicker">Start an engagement</p>
            <h2 className="mt-6 max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Bring us the decision problem.
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-0 md:justify-end">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-6 py-3 text-sm font-medium text-white"
            >
              Start with a diagnostic <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/sectors" className="inline-flex items-center gap-2 rounded-full border hairline px-6 py-3 text-sm font-medium">
              Browse by sector <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
