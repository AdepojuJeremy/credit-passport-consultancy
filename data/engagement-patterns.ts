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
];

export function getEngagementPattern(slug: string) {
  return engagementPatterns.find((pattern) => pattern.slug === slug);
}
