import type { Metadata } from "next";
import { ConsultationForm } from "@/components/consultation-form";
import { resolveConsultationContext } from "@/lib/consultation-context";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bring CreditPassport a credit, risk, data or decision problem for an initial consulting review.",
};

const intake = [
  ["01", "Institution", "Who are you, what credit products or decision systems do you operate, and who owns the decision today?"],
  ["02", "Decision problem", "Where is the current lending, risk, data or operational process constrained, inconsistent or poorly understood?"],
  ["03", "Evidence", "What data, policy rules, historical outcomes, models or decision logs are available to diagnose the system?"],
  ["04", "Outcome", "What needs to improve: approval quality, defaults, review rate, explainability, speed, policy control or data reliability?"],
];

const fitGuidance = [
  {
    title: "Good fit",
    items: [
      "A consequential lending or credit decision has a clear institutional owner.",
      "The current process, evidence or policy can be described well enough to diagnose.",
      "The team is willing to measure proposed changes against explicit business and risk outcomes.",
      "The real constraint may cross policy, data, analytics, models, workflow or infrastructure.",
    ],
  },
  {
    title: "Less likely to fit",
    items: [
      "Generic AI transformation work with no defined credit or decision problem.",
      "Requests for a model or score before the decision, evidence and policy context are understood.",
      "Individual consumer credit advice or borrower-level dispute support.",
      "Projects that require unverified performance guarantees or unsupported public claims.",
    ],
  },
] as const;

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const context = resolveConsultationContext(await searchParams);

  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <p className="kicker text-[color:var(--brand-blue)]">Contact / Consultation</p>
          <h1 className="section-title mt-8 max-w-5xl">Bring us the decision problem.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-7 text-[color:var(--muted)]">
            A useful first conversation is specific. Tell us which decision matters, what evidence exists today and what business outcome needs to change. We can then determine whether the problem calls for strategy, analysis, modelling, policy redesign or infrastructure work.
          </p>
        </div>
      </section>

      <section className="site-container py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">What to expect</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">
              The initial intake is diagnostic, not a data-transfer channel. Share enough context to define the problem; sensitive borrower data and confidential datasets should move only through an agreed secure process after scope is established.
            </p>
          </aside>
          <div>
            <div className="grid gap-px bg-[color:var(--line-strong)] sm:grid-cols-2">
              {intake.map(([number, title, copy]) => (
                <article key={number} className="min-h-60 bg-[color:var(--surface)] p-6">
                  <span className="kicker text-[color:var(--brand-blue)]">{number}</span>
                  <h2 className="mt-16 font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{title}</h2>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-20 border-t hairline pt-8">
              <p className="kicker">Fit</p>
              <h2 className="mt-5 max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                The best engagements start with an institutional decision and an evidence problem.
              </h2>
              <div className="mt-10 grid gap-px bg-[color:var(--line-strong)] md:grid-cols-2">
                {fitGuidance.map((group) => (
                  <section key={group.title} className="bg-[color:var(--surface)] p-6">
                    <h3 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{group.title}</h3>
                    <div className="mt-6 border-t hairline">
                      {group.items.map((item) => (
                        <p key={item} className="border-b hairline py-4 text-sm leading-6 text-[color:var(--muted)]">{item}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <p className="kicker">Consultation intake</p>
              <h2 className="mt-5 max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                Give us enough context to understand the system behind the problem.
              </h2>
              <div className="mt-10">
                <ConsultationForm {...context} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
