import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "CreditPassport is a consulting and research practice focused on better credit, risk, data and decision systems.",
};

const principles = [
  ["01", "Decision before model", "Start with the institutional decision, incentives, constraints and evidence. A model is one possible component of the intervention, not the definition of the problem."],
  ["02", "Prediction is not policy", "Separate estimates of risk from the rules, economics and risk appetite that determine what an institution should actually do."],
  ["03", "Evidence over theatre", "Make claims traceable to data, definitions and measured outcomes. Internal targets and hypotheses are not presented as achieved client results."],
  ["04", "Explainability by design", "A consequential decision should have an intelligible chain from source evidence to features, policy, recommendation and outcome."],
  ["05", "Research into practice", "Use research to create better methods, test those methods against real institutional problems and preserve what survives contact with evidence."],
  ["06", "Productize repetition", "When a consulting method becomes repeatable, validated and operationally useful, it becomes a candidate for tooling and later product infrastructure."],
];

const flywheel = [
  ["Research", "Develop a clearer theory, method or analytical frame."],
  ["Consulting", "Apply it to a real credit, risk, data or decision problem."],
  ["Evidence", "Measure what changed and where the method fails."],
  ["Methodology", "Codify the repeatable parts into reusable institutional knowledge."],
  ["Productization", "Turn sufficiently stable methods into internal tools and, later, software."],
];

export default function AboutPage() {
  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <p className="kicker text-[color:var(--brand-blue)]">About CreditPassport</p>
          <h1 className="section-title mt-8 max-w-5xl">A consulting and research practice for better financial decisions.</h1>
          <div className="mt-14 grid gap-8 border-t hairline pt-8 md:grid-cols-2">
            <p className="max-w-xl text-lg leading-8">
              CreditPassport is being developed consultancy-first: work directly on credit, risk, data and decision problems, build evidence around what works, then productize the repeatable infrastructure later.
            </p>
            <p className="max-w-xl text-sm leading-7 text-[color:var(--muted)]">
              The long-term product thesis remains important, but it does not need to be the first commercial proposition. The consulting practice creates a tighter feedback loop between institutional problems, research, implementation and future software.
            </p>
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.5fr_1.5fr]">
          <div>
            <p className="kicker">Founders</p>
            <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">
              CreditPassport was founded by <span className="text-[color:var(--foreground)]">Michael Udeh</span> and <span className="text-[color:var(--foreground)]">Jeremiah Adepoju</span>.
            </p>
          </div>
          <div>
            <p className="kicker">Operating model</p>
            <h2 className="mt-5 max-w-4xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Research should change how the work is done. The work should change what gets built.
            </h2>
            <div className="mt-14 border-t hairline">
              {flywheel.map(([title, copy], index) => (
                <div key={title} className="grid gap-5 border-b hairline py-6 md:grid-cols-[70px_0.8fr_1.5fr]">
                  <span className="kicker text-[color:var(--brand-blue)]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container py-20 md:py-32">
          <div className="grid gap-10 md:grid-cols-[0.5fr_1.5fr]">
            <p className="kicker">Principles</p>
            <div>
              <h2 className="section-title max-w-4xl">Rigour should survive the handoff from research to operations.</h2>
              <div className="mt-16 grid gap-px bg-[color:var(--line-strong)] sm:grid-cols-2">
                {principles.map(([number, title, copy]) => (
                  <article key={number} className="min-h-72 bg-[color:var(--surface)] p-6">
                    <span className="kicker text-[color:var(--brand-blue)]">{number}</span>
                    <h3 className="mt-16 font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container py-20 md:flex md:items-end md:justify-between md:gap-12 md:py-28">
          <div>
            <p className="kicker text-white/50">Work with CreditPassport</p>
            <h2 className="mt-6 max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Start with a difficult decision, not a predetermined solution.
            </h2>
          </div>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-mint)] px-6 py-3 text-sm font-medium text-[#081a3a] md:mt-0">
            Start a conversation <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
