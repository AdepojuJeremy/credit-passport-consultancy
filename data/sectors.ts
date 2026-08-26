export type Sector = {
  number: string;
  slug: string;
  title: string;
  description: string;
  buyer: string;
  problems: ReadonlyArray<string>;
  questions: ReadonlyArray<string>;
  serviceSlugs: ReadonlyArray<string>;
};

export const sectors: ReadonlyArray<Sector> = [
  {
    number: "01",
    slug: "banks-microfinance",
    title: "Banks & Microfinance",
    description:
      "Teams redesigning underwriting policy, portfolio controls, risk analytics or the data infrastructure behind lending decisions.",
    buyer: "Credit, risk, lending, analytics and transformation leaders managing established products, policies and operating constraints.",
    problems: ["Policy complexity", "Manual review", "Portfolio leakage", "Legacy decision systems"],
    questions: [
      "Which inherited rules still improve portfolio outcomes, and which only add friction?",
      "Can historical approvals, declines, overrides and later repayment outcomes be reconstructed reliably?",
      "Where should manual review remain a control, and where is it compensating for weak data or unclear policy?",
      "How should policy, models and infrastructure change without losing auditability?",
    ],
    serviceSlugs: ["credit-underwriting-strategy", "portfolio-risk-analytics", "decision-data-infrastructure"],
  },
  {
    number: "02",
    slug: "digital-lenders-bnpl",
    title: "Digital Lenders & BNPL",
    description:
      "Credit businesses balancing growth, approval quality, fraud, affordability and fast decisioning under incomplete information.",
    buyer: "Founders, credit leaders, risk teams and data teams responsible for approval growth, losses and automated decision quality.",
    problems: ["Approval quality", "Pricing & limits", "Behavioural signals", "Decision latency"],
    questions: [
      "Where can approvals grow without weakening the portfolio beyond the institution's risk appetite?",
      "Which behavioural or transaction signals add evidence beyond existing application rules?",
      "How should confidence and missing information change automated APPROVE, DECLINE or REVIEW actions?",
      "Are pricing, limits and tenor aligned with risk evidence and product economics?",
    ],
    serviceSlugs: ["credit-underwriting-strategy", "decision-intelligence", "ai-machine-learning"],
  },
  {
    number: "03",
    slug: "fintech-embedded-credit",
    title: "Fintech & Embedded Credit",
    description:
      "Platforms introducing credit into an existing product and needing a defensible decision framework rather than isolated scoring logic.",
    buyer: "Product, operations, risk and data leaders introducing or scaling credit inside a broader customer platform.",
    problems: ["Credit product design", "Risk appetite", "Data strategy", "Decision architecture"],
    questions: [
      "What decision system is required before credit can be automated responsibly inside the product?",
      "Which platform data is legitimate decision evidence, and how should its uncertainty be represented?",
      "What belongs in lender policy versus a reusable intelligence or model layer?",
      "How should decisions, reasons and policy versions be exposed to downstream product and operations teams?",
    ],
    serviceSlugs: ["decision-intelligence", "data-financial-intelligence", "decision-data-infrastructure"],
  },
  {
    number: "04",
    slug: "credit-infrastructure",
    title: "Credit Infrastructure Teams",
    description:
      "Data, risk and product teams building reusable financial-event, feature, policy and decision layers across products or institutions.",
    buyer: "Engineering, data, ML, product and risk teams responsible for the reusable infrastructure behind consequential financial decisions.",
    problems: ["Feature systems", "Auditability", "Model governance", "API architecture"],
    questions: [
      "Can a past decision be reproduced from the evidence, features, model and policy versions available at the time?",
      "Which business objects need stable data contracts across ingestion, features, models, policy and APIs?",
      "How should provenance, confidence and data quality propagate through the decision stack?",
      "Which model, policy and data changes require versioning, monitoring and replay before release?",
    ],
    serviceSlugs: ["data-financial-intelligence", "ai-machine-learning", "decision-data-infrastructure"],
  },
];

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}
