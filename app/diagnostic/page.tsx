import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { creditDecisionDiagnostic } from "@/data/diagnostic";
import { getSector } from "@/data/sectors";

export const metadata: Metadata = {
  title: "Credit Decision Diagnostic",
  description:
    "A structured review of credit policy, decision data, portfolio evidence, models and infrastructure before a lender changes its underwriting system.",
};

function NumberedList({ items }: { items: ReadonlyArray<string> }) {
  return (
    <div className="border-t hairline">
      {items.map((item, index) => (
        <div key={item} className="grid gap-4 border-b hairline py-5 md:grid-cols-[56px_1fr]">
          <span className="kicker text-[color:var(--brand-blue)]">{String(index + 1).padStart(2, "0")}</span>
          <p className="max-w-3xl leading-7">{item}</p>
        </div>
      ))}
    </div>
  );
}

type DiagnosticPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DiagnosticPage({ searchParams }: DiagnosticPageProps) {
  const params = await searchParams;
  const sectorParam = Array.isArray(params.sector) ? params.sector[0] : params.sector;
  const sector = sectorParam ? getSector(sectorParam) : undefined;
  const contactHref = sector
    ? `/contact?from=diagnostic&sector=${sector.slug}`
    : "/contact?from=diagnostic";

  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <p className="kicker text-[color:var(--brand-blue)]">Flagship engagement</p>
          <h1 className="section-title mt-8 max-w-5xl">{creditDecisionDiagnostic.title}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            {creditDecisionDiagnostic.description}
          </p>
          {sector ? (
            <p className="mt-6 w-fit rounded-full border hairline bg-[color:var(--panel)] px-4 py-2 text-sm text-[color:var(--muted)]">
              Context: {sector.title}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-6 py-3 text-sm font-medium text-white"
            >
              Request a diagnostic <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/case-studies" className="inline-flex items-center rounded-full border hairline bg-white/60 px-6 py-3 text-sm">
              See selected work
            </Link>
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.5fr_1.5fr]">
          <div>
            <p className="kicker">When it is useful</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">
              The diagnostic is designed for teams that know something in the lending system needs to improve, but do not yet have enough evidence to prescribe the right intervention.
            </p>
          </div>
          <NumberedList items={creditDecisionDiagnostic.fitSignals} />
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container py-20 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr]">
            <div>
              <p className="kicker text-white/45">What we examine</p>
              <h2 className="mt-6 max-w-md font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em]">
                Diagnose the system, not just the model.
              </h2>
            </div>
            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              {creditDecisionDiagnostic.reviewAreas.map(([number, title, copy]) => (
                <article key={number} className="min-h-72 bg-[color:var(--inverse)] p-7">
                  <span className="kicker text-[color:var(--brand-mint)]">{number}</span>
                  <h3 className="mt-16 font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="kicker">Typical inputs</p>
            <h2 className="mt-6 max-w-xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
              Enough evidence to reconstruct how the institution currently decides.
            </h2>
            <div className="mt-10 space-y-4">
              {creditDecisionDiagnostic.typicalInputs.map((item) => (
                <div key={item} className="flex gap-3 border-t hairline pt-4 text-sm leading-6">
                  <Check className="mt-0.5 shrink-0 text-[color:var(--brand-blue)]" size={16} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="kicker">Typical outputs</p>
            <h2 className="mt-6 max-w-xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
              A prioritized evidence plan, not a generic transformation deck.
            </h2>
            <div className="mt-10 space-y-4">
              {creditDecisionDiagnostic.outputs.map((item) => (
                <div key={item} className="flex gap-3 border-t hairline pt-4 text-sm leading-6">
                  <Check className="mt-0.5 shrink-0 text-[color:var(--brand-blue)]" size={16} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container py-16 md:py-20">
          <p className="kicker">Data boundary</p>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-[color:var(--muted)]">{creditDecisionDiagnostic.boundary}</p>
        </div>
      </section>

      <section className="bg-[color:var(--brand-blue)] text-white">
        <div className="site-container py-24 md:flex md:items-end md:justify-between md:gap-12 md:py-32">
          <div>
            <p className="kicker text-white/60">Start with evidence</p>
            <h2 className="mt-6 max-w-4xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Before replacing policy, adding AI or rebuilding the stack, find the actual constraint.
            </h2>
          </div>
          <Link
            href={contactHref}
            className="mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[color:var(--brand-indigo)] md:mt-0"
          >
            Request a diagnostic <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
