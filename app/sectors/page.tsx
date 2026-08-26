import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sectors } from "@/data/sectors";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "CreditPassport consulting for banks and microfinance institutions, digital lenders, embedded-credit fintechs and credit-infrastructure teams.",
};

export default function SectorsPage() {
  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <p className="kicker text-[color:var(--brand-blue)]">Who we work with</p>
          <h1 className="section-title mt-8 max-w-5xl">Different operating models. The same need for defensible decisions.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            CreditPassport works where approval, risk, policy and data choices materially affect portfolio economics or customer access. The exact intervention changes by institution; the need to connect evidence to action does not.
          </p>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-px bg-[color:var(--line-strong)] sm:grid-cols-2">
          {sectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/sectors/${sector.slug}`}
              className="group flex min-h-[430px] flex-col bg-[color:var(--surface)] p-7 transition-colors hover:bg-white"
            >
              <div className="flex items-start justify-between">
                <span className="kicker text-[color:var(--brand-blue)]">{sector.number}</span>
                <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={17} aria-hidden="true" />
              </div>
              <div className="mt-auto">
                <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.05em]">{sector.title}</h2>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[color:var(--muted)]">{sector.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {sector.problems.map((problem) => (
                    <span key={problem} className="rounded-full border hairline bg-[color:var(--panel)] px-3 py-2 text-xs text-[color:var(--muted)]">
                      {problem}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t hairline bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container py-20 md:flex md:items-end md:justify-between md:gap-12 md:py-28">
          <div>
            <p className="kicker text-white/50">Unsure where to start?</p>
            <h2 className="mt-6 max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Start by diagnosing the decision system.
            </h2>
          </div>
          <Link href="/diagnostic" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-mint)] px-6 py-3 text-sm font-medium text-[#081a3a] md:mt-0">
            Explore the diagnostic <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
