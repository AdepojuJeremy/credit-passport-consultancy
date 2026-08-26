export type EngagementPattern = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  status: "Evidence pending";
  context: string;
  problem: ReadonlyArray<string>;
  work: ReadonlyArray<string>;
  evidenceRequired: ReadonlyArray<string>;
  publicNote: string;
};

export const engagementPatterns: ReadonlyArray<EngagementPattern> = [
  {
    slug: "decision-system-reconstruction",
    number: "01",
    title: "Decision-system reconstruction",
    summary:
      "Reconstruct how a lender actually makes decisions when policies, product rules and historical decision data are fragmented across systems and teams.",
    status: "Evidence pending",
    context:
      "This pattern comes from work around lenders with multiple credit products, separate policy layers and incomplete access to historical decision records.",
    problem: [
      "Eligibility, behavioural and product-specific rules are distributed across people, documents and software.",
      "Historical decisions cannot be reliably retrieved or joined to the data that produced them.",
      "The institution cannot easily explain which rule, signal or exception produced an outcome.",
    ],
    work: [
      "Map the end-to-end decision chain from eligibility through policy, review and final action.",
      "Inventory rules, thresholds, overrides and product-specific exceptions.",
      "Design the data lineage needed to connect applications, decisions, policy versions and later outcomes.",
      "Identify where policy logic should be formalized, versioned or moved out of tacit operational practice.",
    ],
    evidenceRequired: [
      "Historical decision records with timestamps and identifiers.",
      "Policy and product versions used at decision time.",
      "Repayment or performance outcomes linked back to the original application.",
      "Client approval before any identifying details or outcome metrics are published.",
    ],
    publicNote:
      "This is an anonymized engagement pattern, not a published client result. Outcome metrics remain intentionally absent until evidence and publication permission are available.",
  },
  {
    slug: "portfolio-policy-diagnostic",
    number: "02",
    title: "Portfolio policy diagnostic",
    summary:
      "Use portfolio behaviour and repayment outcomes to identify policy leakage, missed approvals and rules that need to be tested rather than assumed.",
    status: "Evidence pending",
    context:
      "The source work includes questions around contribution discipline, repayment behaviour, grading rules and the need to connect operational behaviour to later credit performance.",
    problem: [
      "Rules exist, but their relationship to repayment outcomes is not measured consistently.",
      "Operational behaviours are observed without a clear framework for whether they should change credit treatment.",
      "Good borrowers may be declined while risky borrowers pass because thresholds are inherited or heuristic.",
    ],
    work: [
      "Build decision and outcome cohorts around the rules currently in use.",
      "Measure approval, repayment and exception patterns by segment and product.",
      "Identify false-positive and false-negative decision patterns where the data supports them.",
      "Convert candidate policy changes into testable hypotheses before changing live rules.",
    ],
    evidenceRequired: [
      "Application-level policy decisions and exception records.",
      "Repayment histories and agreed default/performance definitions.",
      "Sufficient sample sizes for the segment being evaluated.",
      "A pre-agreed benchmark for what counts as an improved trade-off.",
    ],
    publicNote:
      "This page describes the analytical pattern and evidence standard. It does not claim that a particular approval or default improvement has already been achieved.",
  },
  {
    slug: "policy-formalization",
    number: "03",
    title: "Policy formalization",
    summary:
      "Turn operational heuristics and product-specific lending rules into explicit, testable and versioned decision policy.",
    status: "Evidence pending",
    context:
      "Credit operations often contain valid institutional knowledge that is encoded informally: recurring-income checks, contribution rules, collateral conditions, restructuring logic and product-specific limits.",
    problem: [
      "Policy logic is understandable to experienced operators but difficult to audit or reproduce.",
      "Different products apply similar concepts with inconsistent thresholds or exception paths.",
      "Changing one rule can have unmeasured effects elsewhere in the decision chain.",
    ],
    work: [
      "Express rules as machine- and human-readable policy objects.",
      "Separate model estimates from lender-specific policy and business constraints.",
      "Define evaluation order, override authority, reason codes and manual-review triggers.",
      "Create test fixtures so proposed policy changes can be replayed before deployment.",
    ],
    evidenceRequired: [
      "Canonical policy inventory agreed with the business owner.",
      "Examples of edge cases and historical exceptions.",
      "Decision replay or shadow evaluation before claiming improvement.",
      "Versioned documentation showing exactly what changed.",
    ],
    publicNote:
      "This is an anonymized description of a recurring consulting problem. Client-specific outcomes will only be published after validation and permission.",
  },
  {
    slug: "decision-data-infrastructure",
    number: "04",
    title: "Decision-data infrastructure",
    summary:
      "Repair the data path behind lending decisions so historical actions, evidence and outcomes can be retrieved, joined and audited reliably.",
    status: "Evidence pending",
    context:
      "The consulting material includes a client unable to retrieve past decision history, turning what first appeared to be an analytics problem into a data-pipeline and infrastructure problem.",
    problem: [
      "Past decisions are difficult or impossible to retrieve consistently.",
      "Applications, policy decisions and repayment outcomes do not share a reliable analytical key or lineage.",
      "Portfolio analysis becomes fragile because historical evidence cannot be reconstructed with confidence.",
    ],
    work: [
      "Map the decision-history lifecycle from source systems through storage, retrieval and analytical use.",
      "Define identifiers, event schemas and joins needed to connect applications, decisions and later performance.",
      "Separate raw operational records from analytical decision-history tables and derived features.",
      "Specify audit, versioning and data-quality checks required before model or policy evaluation.",
    ],
    evidenceRequired: [
      "Representative source-system extracts and current retrieval paths.",
      "Documented identifiers and timestamp semantics across systems.",
      "Successful reconstruction of historical decisions against known examples.",
      "Data-quality tests showing the rebuilt history is sufficiently complete for the intended analysis.",
    ],
    publicNote:
      "The underlying source material confirms the problem class and proposed infrastructure work, but does not provide a publishable client outcome or named-client permission.",
  },
  {
    slug: "behavioural-contribution-intelligence",
    number: "05",
    title: "Behavioural contribution intelligence",
    summary:
      "Translate savings and contribution behaviour into explicit analytical signals that can be tested against repayment outcomes instead of treated as intuition.",
    status: "Evidence pending",
    context:
      "Source discussions cover daily, weekly and monthly contribution plans, missed contributions, peer-circle rules, restructuring logic and the need to test whether those behaviours should affect later credit treatment.",
    problem: [
      "Contribution discipline is operationally visible but its predictive or policy value is not yet quantified.",
      "Different plan structures create behavioural signals that are not directly comparable.",
      "Missed contributions may reflect transient liquidity stress, persistent risk or simple product mechanics, and those cases need to be distinguished.",
    ],
    work: [
      "Define contribution events, missed-payment states, recovery behaviour and plan-normalized behavioural features.",
      "Link those features to subsequent repayment outcomes and existing policy decisions.",
      "Test whether behavioural signals add information beyond recurring income, product type and other known variables.",
      "Translate validated signals into policy hypotheses, review triggers or monitoring indicators rather than automatically into a score.",
    ],
    evidenceRequired: [
      "Time-stamped contribution histories with plan type and expected schedule.",
      "Loan awards, restructuring actions and repayment performance linked to the same customer history.",
      "Clear definitions for missed, late, recovered and completed contribution behaviour.",
      "Out-of-sample or temporal validation before any predictive claim is published.",
    ],
    publicNote:
      "This pattern is grounded in the documented client decision chain. It remains a research-and-consulting pattern until the behavioural signals are validated against outcome data.",
  },
  {
    slug: "simulation-intervention-design",
    number: "06",
    title: "Simulation & intervention design",
    summary:
      "Use simulation, causal reasoning and model comparison to understand system fragility and identify which interventions are worth testing before changing live credit policy.",
    status: "Evidence pending",
    context:
      "The internal consulting discussion proposed agent-based or network-contagion simulation, causal inference and intervention-sensitive default estimates to move beyond static score-first decisioning.",
    problem: [
      "Observed portfolio outcomes do not reveal how the system might behave under materially different policy choices.",
      "Credit models carry different inductive biases, making it risky to treat one model specification as the system itself.",
      "A lender may know who appears risky without knowing which intervention is likely to improve the outcome.",
    ],
    work: [
      "Model the decision system, borrower states and relevant interaction or contagion mechanisms at an appropriate level of abstraction.",
      "Run policy and stress scenarios to identify fragility, nonlinear effects and candidate intervention points.",
      "Compare predictive models and causal assumptions to isolate features or relationships that remain robust across specifications.",
      "Use simulation output to prioritize empirical tests rather than present simulated improvements as achieved business outcomes.",
    ],
    evidenceRequired: [
      "A documented simulator or structural model with explicit assumptions and calibration targets.",
      "Historical data adequate to test whether simulated behaviour resembles observed behaviour.",
      "Sensitivity analysis across key assumptions and model families.",
      "Prospective or quasi-experimental validation before causal or intervention-effect claims are published.",
    ],
    publicNote:
      "This is a documented modeling direction from the consulting work, not evidence that a particular intervention has already reduced defaults or increased approvals.",
  },
];

export function getEngagementPattern(slug: string) {
  return engagementPatterns.find((pattern) => pattern.slug === slug);
}
