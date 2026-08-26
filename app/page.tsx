import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DecisionSystem } from "@/components/decision-system";
import { researchTopics } from "@/data/research";
import { services } from "@/data/services";

const marqueeItems = [
  "Credit Strategy",
  "Decision Intelligence",
  "Risk Analytics",
  "Financial Data",
  "AI & Machine Learning",
  "Research",
];

export default function Home() {
  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container min-h-[calc(100svh-4rem)] py-12 md:py-20">
          <div className="flex items-center justify-between gap-5">
            <p className="kicker">CreditPassport / Consulting + Research</p>
            <p className="kicker hidden text-[color:var(--muted)] sm:block">Africa · Financial systems</p>
          </div>

          <div className="mt-[14vh] max-w-[1300px]">
            <h1 className="display">Better decisions.<br />Better credit systems.</h1>
          </div>

          <div className="mt-12 grid gap-8 border-t hairline pt-6 md:grid-cols-2">
            <p className="max-w-xl text-lg leading-7 text-[color:var(--muted)]">
              We help lenders, fintechs and financial institutions improve credit, risk, data and decision systems using rigorous analysis, AI and decision science.
            </p>
            <div className="flex items-start gap-3 md:justify-end">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm text-white">
                Start a conversation <ArrowUpRight size={15} />
              </Link>
              <Link href="/research" className="inline-flex items-center gap-2 rounded-full border hairline px-5 py-3 text-sm">
                Explore research
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b hairline py-5">
        <div className="marquee-track gap-12 pr-12">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="kicker whitespace-nowrap text-[color:var(--muted)]">
              {item} <span className="ml-12">↗</span>
            </span>
          ))}
        </div>
      </section>

      <section className="site-container py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-[0.7fr_2fr]">
          <p className="kicker">Capabilities</p>
          <div>
            <h2 className="section-title max-w-4xl">Everything required to improve a lending decision.</h2>
            <div className="mt-20 border-t hairline">
              {services.map((service) => (
                <article key={service.number} className="grid gap-4 border-b hairline py-7 md:grid-cols-[90px_1fr_1.4fr] md:items-start">
                  <span className="kicker text-[color:var(--muted)]">{service.number}</span>
                  <h3 className="text-2xl tracking-[-0.045em]">{service.title}</h3>
                  <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">{service.description}</p>
                </article>
              ))}
            </div>
            <Link href="/consulting" className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
              Explore consulting <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container py-24 md:py-36">
          <p className="kicker">Our approach</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            {[
              ["I", "Diagnose the system", "Map the existing decision chain, data, incentives, policies, constraints and failure modes before recommending change."],
              ["II", "Design the intervention", "Build the smallest rigorous change that can improve decisions: policy, analytics, model, workflow or infrastructure."],
              ["III", "Measure the outcome", "Validate against business outcomes such as approval lift, default performance, calibration, explainability and operational latency."],
            ].map(([number, title, copy]) => (
              <article key={number} className="min-h-72 border-t hairline pt-5">
                <span className="kicker text-[color:var(--muted)]">{number}</span>
                <h3 className="mt-16 text-3xl tracking-[-0.05em]">{title}</h3>
                <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container py-24 md:py-36">
          <div className="grid gap-10 md:grid-cols-[0.7fr_2fr]">
            <p className="kicker text-white/45">Decision intelligence</p>
            <div>
              <h2 className="section-title max-w-5xl">Models predict.<br />Policies decide.</h2>
              <p className="mt-8 max-w-2xl text-lg leading-7 text-white/55">
                A risk estimate is not a lending decision. We design systems that connect evidence, uncertainty, policy and outcomes so institutions can understand not only what a model predicts, but what they should do next.
              </p>
              <DecisionSystem />
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-[0.7fr_2fr]">
          <p className="kicker">Research</p>
          <div>
            <h2 className="section-title max-w-4xl">Research for consequential decisions.</h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[color:var(--muted)]">
              CreditPassport Research studies how institutions make high-stakes decisions under uncertainty, and how those systems can become more accurate, explainable and economically useful.
            </p>
            <div className="mt-16 grid sm:grid-cols-2">
              {researchTopics.map((topic, index) => (
                <div key={topic} className="flex min-h-28 items-end justify-between border-t hairline py-5 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                  <span className="text-xl tracking-[-0.04em]">{topic}</span>
                  <span className="kicker text-[color:var(--muted)]">0{index + 1}</span>
                </div>
              ))}
            </div>
            <Link href="/research" className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
              Enter CreditPassport Research <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container py-24 md:py-36">
          <div className="grid gap-10 md:grid-cols-[0.7fr_2fr]">
            <p className="kicker">Selected work</p>
            <div>
              <h2 className="section-title max-w-4xl">Work should be measured by what changed.</h2>
              <div className="mt-16 grid gap-px bg-black/15 md:grid-cols-3">
                {[
                  ["01", "Decision-system reconstruction", "Mapping fragmented decision histories, policy layers and operational data into an auditable decision chain."],
                  ["02", "Portfolio diagnostics", "Finding where approval, repayment and behavioural patterns reveal policy leakage or missed opportunity."],
                  ["03", "Credit policy redesign", "Turning heuristics and tacit risk appetite into explicit, testable and configurable policy logic."],
                ].map(([number, title, copy]) => (
                  <article key={number} className="min-h-80 bg-[color:var(--background)] p-7">
                    <span className="kicker text-[color:var(--muted)]">{number}</span>
                    <h3 className="mt-24 text-2xl tracking-[-0.045em]">{title}</h3>
                    <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-[color:var(--muted)]">
                Public case studies will only include reviewed engagements and substantiated outcomes. No client results are claimed in this scaffold.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-28 md:py-44">
        <p className="kicker">Start here</p>
        <div className="mt-8 flex flex-col gap-10 border-t hairline pt-8 md:flex-row md:items-end md:justify-between">
          <h2 className="section-title max-w-5xl">Have a difficult decision problem?</h2>
          <Link href="/contact" className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-black px-6 py-4 text-sm text-white">
            Let&apos;s examine it <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
