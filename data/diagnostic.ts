export const creditDecisionDiagnostic = {
  title: "Credit Decision Diagnostic",
  description:
    "A structured review of the system behind a lending decision: policy, data, workflow, models, infrastructure and the evidence connecting decisions to outcomes.",
  fitSignals: [
    "Approval growth and credit losses are moving in the wrong direction—or the trade-off is not well understood.",
    "Underwriting rules have accumulated across products, teams or systems and are difficult to explain or test.",
    "Historical decisions cannot be reconstructed reliably from the data available today.",
    "Transaction, contribution, bureau or behavioural data exists but its decision value is unclear.",
    "A model or automation project is being considered before the decision problem and validation standard are explicit.",
  ],
  reviewAreas: [
    ["01", "Decision chain", "Map eligibility, evidence, risk assessment, policy, review, overrides and final action across the relevant product or workflow."],
    ["02", "Policy", "Inventory thresholds, rules, exceptions, product constraints and risk-appetite choices that determine what the institution actually does."],
    ["03", "Data & lineage", "Assess whether applications, decisions, policy versions and later repayment outcomes can be joined and reproduced point in time."],
    ["04", "Portfolio evidence", "Define the cohorts, outcome measures and approval/default trade-offs required to evaluate the current system and candidate changes."],
    ["05", "Models & uncertainty", "Separate predictions from policy, review calibration and confidence where models exist, and identify where model complexity is or is not justified."],
    ["06", "Infrastructure", "Identify the data contracts, audit trail, versioning and observability required to make the decision system reliable and testable."],
  ] as const,
  typicalInputs: [
    "Current credit or underwriting policy documents and product rules",
    "Decision-process or operations documentation, where available",
    "Representative application, decision and repayment data extracts",
    "Available decision-history, override and manual-review records",
    "Definitions currently used for approval, default, delinquency or other performance outcomes",
  ],
  outputs: [
    "Current-state decision map",
    "Policy and rule inventory with ambiguity or inconsistency findings",
    "Decision-data and lineage gap map",
    "Portfolio measurement and validation plan",
    "Prioritized intervention backlog across policy, analytics, data, models and infrastructure",
    "Evidence requirements for determining whether each proposed intervention works",
  ],
  boundary:
    "The public consultation form is for scoping only. Borrower PII, credentials and confidential datasets should not be submitted through the website. Any deeper data review should use an agreed secure channel after scope and authorization are established.",
} as const;
