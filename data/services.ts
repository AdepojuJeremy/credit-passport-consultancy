export type Service = {
  number: string;
  slug: string;
  title: string;
  description: string;
  questions: ReadonlyArray<string>;
  work: ReadonlyArray<string>;
  outputs: ReadonlyArray<string>;
  measures: ReadonlyArray<string>;
};

export const services: ReadonlyArray<Service> = [
  {
    number: "01",
    slug: "credit-underwriting-strategy",
    title: "Credit & Underwriting Strategy",
    description:
      "Design underwriting frameworks, borrower segmentation, eligibility logic, risk appetite, pricing and limit strategies around the economics of the portfolio.",
    questions: [
      "Which borrowers should this product serve—and which should it avoid?",
      "Where are current eligibility rules too conservative, too permissive or internally inconsistent?",
      "How should risk appetite translate into limits, pricing, tenor and review policy?",
      "Which parts of underwriting are policy choices rather than model questions?",
    ],
    work: [
      "Map the current underwriting and approval chain across products.",
      "Separate eligibility, credit policy, affordability, risk and operational constraints.",
      "Review segmentation, thresholds, exceptions and escalation logic.",
      "Design testable policy changes tied to explicit business and risk hypotheses.",
    ],
    outputs: [
      "Underwriting decision map",
      "Credit-policy inventory",
      "Risk-appetite and threshold framework",
      "Borrower/product segmentation",
      "Policy experiment and validation plan",
    ],
    measures: [
      "Approval rate and approval quality",
      "Default or agreed performance rate",
      "Exception and override frequency",
      "Policy coverage and explainability",
    ],
  },
  {
    number: "02",
    slug: "decision-intelligence",
    title: "Decision Intelligence",
    description:
      "Separate prediction from policy. Build decision architectures that combine risk, uncertainty, business constraints, reason codes and measurable outcomes.",
    questions: [
      "What is the system predicting, and what is the institution actually deciding?",
      "How should confidence, missing information and uncertainty affect automated action?",
      "Can every approval, decline and review be traced to evidence and policy?",
      "How should the same intelligence layer support different lender or product appetites?",
    ],
    work: [
      "Decompose the decision into evidence, features, estimates, policy and action.",
      "Define APPROVE, DECLINE and REVIEW semantics and their reason codes.",
      "Design policy-trigger and override structures that are machine- and human-readable.",
      "Specify the decision package required for audit, operations and downstream systems.",
    ],
    outputs: [
      "Decision architecture",
      "Decision-state definitions",
      "Reason-code taxonomy",
      "Policy-trigger schema",
      "Decision-package specification",
    ],
    measures: [
      "Decision reproducibility",
      "Explainability coverage",
      "Manual-review resolution rate",
      "Decision latency",
    ],
  },
  {
    number: "03",
    slug: "portfolio-risk-analytics",
    title: "Portfolio & Risk Analytics",
    description:
      "Diagnose approval quality, defaults, cohorts, false positives, false negatives and policy leakage to identify where value is being lost.",
    questions: [
      "Which current rules are associated with better or worse repayment outcomes?",
      "Where are good borrowers being declined or weak borrowers being approved?",
      "Which segments, products or cohorts behave differently from policy assumptions?",
      "Can historical decisions be reconstructed well enough to evaluate policy changes?",
    ],
    work: [
      "Audit decision, application and repayment data for joinability and point-in-time integrity.",
      "Build cohorts by product, segment, rule, exception and outcome.",
      "Measure approval/default trade-offs and candidate false-positive/false-negative patterns.",
      "Frame policy changes as hypotheses that can be replayed or shadow-tested.",
    ],
    outputs: [
      "Portfolio diagnostic",
      "Decision/outcome data audit",
      "Cohort and segment analysis",
      "Policy leakage findings",
      "Experiment backlog",
    ],
    measures: [
      "Approval and default trade-offs",
      "Calibration where probabilities exist",
      "False-positive / false-negative patterns",
      "Historical decision coverage",
    ],
  },
  {
    number: "04",
    slug: "data-financial-intelligence",
    title: "Data & Financial Intelligence",
    description:
      "Turn transaction and financial records into structured economic events, interpretable features and reliable evidence for underwriting.",
    questions: [
      "What economic events can be inferred reliably from the available financial records?",
      "Which features are derived from evidence rather than narration heuristics alone?",
      "How should missing, contradictory or low-confidence data propagate downstream?",
      "Which financial behaviours need a formal ontology before they become model inputs?",
    ],
    work: [
      "Define financial-event and entity taxonomies.",
      "Design normalization, categorization and confidence rules for raw records.",
      "Specify feature definitions, formulas, provenance and data-quality requirements.",
      "Create traceability from source record to event to feature to decision evidence.",
    ],
    outputs: [
      "Financial-event ontology",
      "Transaction categorization rules",
      "Feature dictionary",
      "Data-quality and confidence framework",
      "Lineage and evidence map",
    ],
    measures: [
      "Event classification coverage",
      "Feature completeness and freshness",
      "Data-quality exception rate",
      "Traceability of high-impact features",
    ],
  },
  {
    number: "05",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    description:
      "Evaluate and build models with attention to calibration, explainability, causal structure, inductive bias, monitoring and operational usefulness.",
    questions: [
      "Is a model actually necessary for this decision, or would policy/analytics solve the problem first?",
      "Are predictions calibrated and stable across the segments that matter?",
      "What assumptions or inductive biases does the chosen model introduce?",
      "How should model uncertainty and drift affect automated decisions?",
    ],
    work: [
      "Establish baselines before introducing model complexity.",
      "Evaluate discrimination, calibration, stability and explainability.",
      "Review feature leakage, bias, point-in-time correctness and monitoring requirements.",
      "Design shadow-mode or replay evaluation before production automation where appropriate.",
    ],
    outputs: [
      "Model-readiness assessment",
      "Baseline and benchmark plan",
      "Calibration and validation report",
      "Explainability framework",
      "Monitoring and model-governance requirements",
    ],
    measures: [
      "Calibration and predictive performance",
      "Segment stability",
      "Business decision impact",
      "Monitoring and explainability coverage",
    ],
  },
  {
    number: "06",
    slug: "decision-data-infrastructure",
    title: "Decision & Data Infrastructure",
    description:
      "Architect the pipelines, feature systems, audit trails, APIs and governance needed to make decisions reproducible and scalable.",
    questions: [
      "Can the institution reproduce a past decision from the data and policy available at that time?",
      "Where are decision histories, features or policy versions being lost?",
      "What should be stored as data rather than hard-coded into application logic?",
      "Which interfaces are required between ingestion, features, models, policy and lender systems?",
    ],
    work: [
      "Design decision and data lineage across the full underwriting path.",
      "Specify feature-store, policy-versioning and audit-log requirements.",
      "Define APIs and data contracts around stable business objects rather than implementation details.",
      "Design observability for data freshness, decision errors, policy changes and model versions.",
    ],
    outputs: [
      "Target decision architecture",
      "Data and API contracts",
      "Feature/policy versioning design",
      "Audit and observability requirements",
      "Implementation roadmap",
    ],
    measures: [
      "Decision reproducibility",
      "Data lineage coverage",
      "Feature freshness and pipeline reliability",
      "Auditability of policy and model versions",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
