import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DecisionSystem } from "@/components/decision-system";
import { Reveal } from "@/components/reveal";
import { engagementPatterns } from "@/data/engagement-patterns";
import { researchPosts } from "@/data/research-posts";
import { sectors } from "@/data/sectors";
import { services } from "@/data/services";

const marqueeItems = [
  "Credit Strategy",
  "Decision Intelligence",
  "Risk Analytics",
  "Financial Data",
  "AI & Machine Learning",
  "Research",
];

const approach = [
  ["I", "Diagnose the system", "Map the existing decision chain, data, incentives, policies, constraints and failure modes before recommending change."],
  ["II", "Design the intervention", "Build the smallest rigorous change that can improve decisions: policy, analytics, model, workflow or infrastructure."],
  ["III", "Measure the outcome", "Validate against business outcomes such as approval lift, default performance, calibration, explainability and operational latency."],
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

          <Reveal className="mt-[13vh] max-w-[1150px]" y={36}>
            <div className="mb-8 brand-rule" />
            <h1 className="display">Better decisions.<br />Better credit systems.</h1>
          </Reveal>

          <Reveal delay={0.08} className="mt-12 grid gap-8 border-t hairline pt-6 md:grid-cols-2">
            <p className="max-w-xl text-lg leading-7 text-[color:var(--muted)]">
              We help lenders, fintechs and financial institutions improve credit, risk, data and decision systems using rigorous analysis, AI and decision science.
            </p>
            <div className="flex flex-wrap items-start gap-3 md:justify-end">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-5 py-3 text-sm text-white transition-transform hover:-translate-y-0.5">
                Start a conversation <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/research" className="inline-flex items-center gap-2 rounded-full border hairline bg-white/50 px-5 py-3 text-sm transition-colors hover:bg-white">
                Explore research
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Capabilities overview" className="overflow-hidden border-b hairline bg-[color:var(--surface)] py-5">
        <div className="marquee-track gap-12 pr-12">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="kicker whitespace-nowrap text-[color:var(--muted)]">
              {item} <span className="ml-12 text-[color:var(--brand-blue)]">↗</span>
            </span>
          ))}
        </div>
      </section>

      <section className="site-container py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-[0.65fr_2fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="kicker">01 / Capabilities</p>
            <p className="mt-5 max-w-52 text-sm leading-6 text-[color:var(--muted)]">
              Advisory and implementation across the full lending-decision lifecycle.
            </p>
          </div>
          <div>
            <Reveal>
              <h2 className="section-title max-w-4xl">Everything required to improve a lending decision.</h2>
            </Reveal>
            <div className="mt-20 border-t hairline">
              {services.map((service) => (
                <Link
                  key={service.number}
                  href={`/consulting/${service.slug}`}
                  className="capability-row grid gap-4 border-b hairline py-7 md:grid-cols-[90px_1fr_1.4fr_24px] md:items-start"
                >
                  <span className="kicker text-[color:var(--brand-blue)]">{service.number}</span>
                  <h3 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{service.title}</h3>
                  <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">{service.description}</p>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <Link href="/consulting" className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--brand-blue)]">
              Explore consulting <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container py-24 md:py-36">
          <p className="kicker">02 / Our approach</p>
          <Reveal className="mt-8 max-w-4xl">
            <h2 className="section-title">Research first. Intervention second. Measurement always.</h2>
          </Reveal>
          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {approach.map(([number, title, copy], index) => (
              <Reveal key={number} delay={index * 0.07}>
                <article className="min-h-80 border-t hairline pt-5">
                  <div className="flex items-center justify-between">
                    <span className="kicker text-[color:var(--brand-blue)]">{number}</span>
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[color:var(--brand-mint)]" />
                  </div>
                  <h3 className="mt-20 font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.05em]">{title}</h3>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="inverse-grid bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container py-24 md:py-40">
          <div className="grid gap-10 md:grid-cols-[0.65fr_2fr]">
            <p className="kicker text-white/45">03 / Decision intelligence</p>
            <div>
              <Reveal>
                <h2 className="section-title max-w-5xl">Models predict.<br />Policies decide.</h2>
              </Reveal>
              <p className="mt-8 max-w-2xl text-lg leading-7 text-white/60">
                A risk estimate is not a lending decision. We design systems that connect evidence, uncertainty, policy and outcomes so institutions can understand not only what a model predicts, but what they should do next.
              </p>
              <DecisionSystem />
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-[0.65fr_2fr]">
          <div>
            <p className="kicker">04 / Who we work with</p>
            <p className="mt-5 max-w-56 text-sm leading-6 text-[color:var(--muted)]">
              Institutions where credit decisions materially affect growth, losses, customer access or operational risk.
            </p>
          </div>
          <div>
            <Reveal>
              <h2 className="section-title max-w-4xl">Different institutions. The same underlying question: how should we decide?</h2>
            </Reveal>
            <div className="mt-16 grid gap-px bg-[color:var(--line-strong)] sm:grid-cols-2">
              {sectors.map((sector) => (
                <article key={sector.number} className="min-h-80 bg-[color:var(--surface)] p-6">
                  <span className="kicker text-[color:var(--brand-blue)]">{sector.number}</span>
                  <h3 className="mt-14 font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{sector.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-6 text-[color:var(--muted)]">{sector.description}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {sector.problems.map((problem) => (
                      <span key={problem} className="rounded-full border hairline bg-[color:var(--panel)] px-3 py-2 text-xs text-[color:var(--muted)]">
                        {problem}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--brand-blue)]">
              Discuss your institution <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container py-24 md:py-36">
          <div className="grid gap-10 md:grid-cols-[0.65fr_2fr]">
            <div>
              <p className="kicker">05 / Research</p>
              <p className="mt-5 max-w-52 text-sm leading-6 text-[color:var(--muted)]">
                Practitioner research on the architecture and evaluation of consequential decisions.
              </p>
            </div>
            <div>
              <Reveal>
                <h2 className="section-title max-w-4xl">Research for consequential decisions.</h2>
              </Reveal>
              <p className="mt-7 max-w-2xl text-lg leading-7 text-[color:var(--muted)]">
                CreditPassport Research studies how institutions make high-stakes decisions under uncertainty, and how those systems can become more accurate, explainable and economically useful.
              </p>
              <div className="mt-16 border-t hairline">
                {researchPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/research/${post.slug}`}
                    className="research-cell grid gap-4 border-b hairline p-5 md:grid-cols-[64px_1fr_1fr_24px] md:items-center"
                  >
                    <span className="kicker opacity-60">{post.number}</span>
                    <span className="font-[family-name:var(--font-manrope)] text-xl font-semibold tracking-[-0.04em]">{post.title}</span>
                    <span className="text-sm leading-6 opacity-60">{post.dek}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <Link href="/research" className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--brand-blue)]">
                Enter CreditPassport Research <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-[0.65fr_2fr]">
          <div>
            <p className="kicker">06 / Selected work</p>
            <p className="mt-5 max-w-52 text-sm leading-6 text-[color:var(--muted)]">
              Engagement patterns published with explicit evidence status.
            </p>
          </div>
          <div>
            <Reveal>
              <h2 className="section-title max-w-4xl">Work should be measured by what changed.</h2>
            </Reveal>
            <div className="mt-16 grid gap-px bg-[color:var(--line-strong)] md:grid-cols-3">
              {engagementPatterns.map((pattern) => (
                <Link
                  key={pattern.slug}
                  href={`/case-studies/${pattern.slug}`}
                  className="group flex min-h-80 flex-col bg-[color:var(--surface)] p-7 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="kicker text-[color:var(--brand-blue)]">{pattern.number}</span>
                    <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={16} aria-hidden="true" />
                  </div>
                  <div className="mt-auto">
                    <p className="kicker text-[color:var(--muted)]">{pattern.status}</p>
                    <h3 className="mt-4 font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{pattern.title}</h3>
                    <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">{pattern.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-3xl text-xs leading-5 text-[color:var(--muted)]">
                Public outcome claims are withheld until underlying evidence and publication permission are reviewed.
              </p>
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--brand-blue)]">
                View selected work <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--brand-blue)] text-white">
        <div className="site-container py-28 md:py-44">
          <p className="kicker text-white/65">07 / Start here</p>
          <div className="mt-8 flex flex-col gap-10 border-t border-white/30 pt-8 md:flex-row md:items-end md:justify-between">
            <Reveal className="max-w-5xl">
              <h2 className="section-title">Have a difficult decision problem?</h2>
            </Reveal>
            <Link href="/contact" className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-medium text-[color:var(--brand-indigo)] transition-transform hover:-translate-y-0.5">
              Let&apos;s examine it <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
