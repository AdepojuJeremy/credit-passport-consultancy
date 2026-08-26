export type ResearchReference = {
  title: string;
  source: string;
  year: string;
  url: string;
  context: string;
};

export type ResearchPost = {
  slug: string;
  number: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  status: "Research note";
  thesis: string;
  keywords: ReadonlyArray<string>;
  sections: ReadonlyArray<{
    heading: string;
    paragraphs: ReadonlyArray<string>;
  }>;
  implications: ReadonlyArray<string>;
  sourceNote: string;
  references: ReadonlyArray<ResearchReference>;
  relatedSlugs: ReadonlyArray<string>;
  consultingSlugs: ReadonlyArray<string>;
};

export const researchPosts: ReadonlyArray<ResearchPost> = [
  {
    slug: "probability-is-not-a-decision",
    number: "01",
    title: "Probability Is Not a Decision",
    dek: "Why a risk estimate, a lending policy and an underwriting action should be treated as separate objects.",
    category: "Decision Theory / Credit Risk",
    date: "2026-08-26",
    status: "Research note",
    thesis:
      "A model estimates something about the borrower. A policy determines what a particular lender should do with that estimate. Collapsing those layers into one score hides the actual decision logic.",
    keywords: ["prediction", "credit policy", "decision intelligence", "underwriting", "risk appetite"],
    sections: [
      {
        heading: "The problem with score-first thinking",
        paragraphs: [
          "Credit systems often treat a score or probability of default as though it were the decision itself. But a probability describes an estimate. Approval, decline, review, pricing, limit and tenor are actions. They are not the same object.",
          "Two lenders can observe the same applicant, the same probability of default and the same affordability evidence and still make different rational decisions because their risk appetite, product economics, limits, confidence requirements and policy constraints differ.",
        ],
      },
      {
        heading: "A cleaner decision architecture",
        paragraphs: [
          "The CreditPassport architecture separates evidence, features, risk estimates, lender policy and the final decision package. In that structure, models do not decide. They produce estimates such as probability of default, risk tier or other predictive signals. Policy then maps those estimates and business constraints into an action.",
          "That separation creates an important governance boundary: a change to a model is not automatically a change to credit policy, and a change to lender appetite does not necessarily require retraining the model.",
        ],
      },
      {
        heading: "Why the separation matters operationally",
        paragraphs: [
          "When prediction and policy are fused, teams struggle to explain why a borrower was declined, compare policies across products, audit overrides or test whether a threshold is economically justified. Hard-coded business rules also make it difficult to reuse the same intelligence layer across lenders.",
          "A policy-aware architecture makes the decision inspectable. The institution can ask whether the estimate was wrong, whether the policy was too conservative, whether the evidence was incomplete, or whether the product economics made the action rational.",
        ],
      },
    ],
    implications: [
      "Store policy configuration separately from model outputs.",
      "Version the policy used for every decision.",
      "Evaluate risk quality and decision quality as related but distinct questions.",
      "Make reason codes traceable to evidence, policy and action.",
    ],
    sourceNote:
      "This is a CreditPassport practitioner research note derived from the internal Decision Intelligence, Policy Control and Decision Package architecture. It is a conceptual framework, not a claim of externally validated causal impact.",
    references: [
      {
        title: "Prediction Policy Problems",
        source: "American Economic Review — Jon Kleinberg, Jens Ludwig, Sendhil Mullainathan and Ziad Obermeyer",
        year: "2015",
        url: "https://www.aeaweb.org/articles?id=10.1257/aer.p20151023",
        context:
          "Provides an external economics reference for distinguishing predictive inference from the policy decision that uses a prediction. It does not validate CreditPassport's lending architecture.",
      },
      {
        title: "Algorithmic Fairness",
        source: "AEA Papers and Proceedings — Jon Kleinberg, Jens Ludwig, Sendhil Mullainathan and Ashesh Rambachan",
        year: "2018",
        url: "https://pubs.aeaweb.org/doi/10.1257/pandp.20181018",
        context:
          "Discusses how normative preferences can affect the use of an estimated prediction function, including decision thresholds, rather than being identical to the estimator itself.",
      },
    ],
    relatedSlugs: ["review-is-an-uncertainty-state", "validate-the-lending-system-not-just-the-model"],
    consultingSlugs: ["decision-intelligence", "credit-underwriting-strategy"],
  },
  {
    slug: "review-is-an-uncertainty-state",
    number: "02",
    title: "Review Is an Uncertainty State",
    dek: "Why manual review should represent insufficient evidence or confidence—not become a catch-all middle-risk bucket.",
    category: "Decision Theory / Operations",
    date: "2026-08-26",
    status: "Research note",
    thesis:
      "Risk answers what we currently estimate about an applicant. Confidence answers how much evidence we have to trust that estimate. Manual review is most coherent when it is triggered by the second problem, not used as a vague substitute for risk policy.",
    keywords: ["uncertainty", "manual review", "selective prediction", "confidence", "decision operations"],
    sections: [
      {
        heading: "Risk and confidence answer different questions",
        paragraphs: [
          "A probability of default can be high or low while the evidence supporting it can also be strong or weak. Combining those dimensions into one scale loses information that is operationally important.",
          "A high-risk borrower with strong evidence may be a confident decline. A seemingly low-risk borrower with incomplete statements, inconsistent account evidence or uncertain income may require review even though the preliminary risk estimate looks favourable.",
        ],
      },
      {
        heading: "The failure mode of a middle bucket",
        paragraphs: [
          "If REVIEW simply means medium risk, the manual queue becomes a mixture of uncertainty, policy exceptions and borderline credit appetite. That makes queue performance difficult to measure and gives reviewers an unclear mandate.",
          "The CreditPassport Decision Package schema instead defines review as an information and confidence state. Review reasons should therefore describe what is missing or uncertain, while decline reasons should describe the risk or policy basis for a negative action.",
        ],
      },
      {
        heading: "Design the queue around resolvable uncertainty",
        paragraphs: [
          "A useful review state should identify the evidence gap and the action required to resolve it: obtain another statement, verify income, reconcile identities, inspect suspicious records or request a missing document.",
          "This turns review from an ambiguous holding area into a controlled information-acquisition process whose latency, resolution rate and downstream decision quality can be measured.",
        ],
      },
    ],
    implications: [
      "Keep risk tier and confidence as separate fields.",
      "Require explicit review reasons and required actions.",
      "Measure review resolution rate and time-to-decision.",
      "Do not use manual review to hide undefined credit policy.",
    ],
    sourceNote:
      "This note is derived from the internal CreditPassport Decision Package schema and API design, where APPROVE, DECLINE and REVIEW are separate terminal actions and REVIEW is defined around insufficient confidence or missing information.",
    references: [
      {
        title: "Selective Classification for Deep Neural Networks",
        source: "NeurIPS — Yonatan Geifman and Ran El-Yaniv",
        year: "2017",
        url: "https://proceedings.neurips.cc/paper/2017/hash/4a8423d5e91fda00bb7e46540e2b0cf1-Abstract.html",
        context:
          "Places abstention or a reject option within the selective-prediction literature: a system can decline to make an automated prediction when confidence is insufficient. CreditPassport's REVIEW state is a lending-specific design choice, not a reproduction of this method.",
      },
      {
        title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0)",
        source: "U.S. National Institute of Standards and Technology",
        year: "2023",
        url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf",
        context:
          "Provides broader system-risk context for evaluating uncertainty, knowledge limits, safe failure and human-AI configurations. It is not lending-specific guidance.",
      },
    ],
    relatedSlugs: ["probability-is-not-a-decision", "validate-the-lending-system-not-just-the-model"],
    consultingSlugs: ["decision-intelligence", "ai-machine-learning"],
  },
  {
    slug: "from-transactions-to-economic-events",
    number: "03",
    title: "From Transactions to Economic Events",
    dek: "A bank statement becomes useful for underwriting only after banking records are translated into economic meaning.",
    category: "Financial Intelligence / Data",
    date: "2026-08-26",
    status: "Research note",
    thesis:
      "Raw credits, debits and narrations are not yet underwriting evidence. The critical representation layer is an event model that translates financial records into concepts such as salary, rent, debt service, business revenue and behavioural change.",
    keywords: ["financial events", "semantic data", "transaction data", "ontology", "feature lineage"],
    sections: [
      {
        heading: "Banking language is not economic language",
        paragraphs: [
          "A statement records transactions in the language of the payment system: dates, amounts, credits, debits and narrations. An underwriting process needs a different representation: what happened economically, who was involved and how confident we are in that interpretation.",
          "That means converting variants such as payroll narrations into a normalized salary event, identifying merchants and lenders, categorizing recurring obligations and distinguishing transfers from income where the evidence supports that distinction.",
        ],
      },
      {
        heading: "The event layer sits between parsing and features",
        paragraphs: [
          "In the CreditPassport architecture, Document Intelligence extracts and normalizes records. Financial Events then represent the economic timeline. Feature Intelligence asks what repeated events imply about capacity, stability, liquidity, behaviour, character and confidence.",
          "This is a useful separation because feature logic should not repeatedly solve the same parsing and semantic-resolution problems. If salary recognition changes, the corrected event can propagate consistently to downstream features rather than being reimplemented inside every model.",
        ],
      },
      {
        heading: "Event quality is model quality upstream",
        paragraphs: [
          "A downstream model can be statistically sophisticated and still fail if the event representation is wrong. Misclassifying transfers as income, missing debt repayments or treating one-off cash deposits as stable earnings silently corrupts the features that follow.",
          "For that reason, event taxonomies need explicit definitions, confidence, entity resolution, data-quality checks and traceability back to the source record.",
        ],
      },
    ],
    implications: [
      "Define a stable financial-event ontology before proliferating features.",
      "Attach confidence and provenance to inferred events.",
      "Separate normalization, categorization, entity resolution and behaviour detection.",
      "Make every high-impact feature traceable back to underlying events.",
    ],
    sourceNote:
      "This note is derived from the internal CreditPassport Financial Events and Terminologies documents. Event examples are architectural categories, not assertions that any single behaviour is independently predictive of default.",
    references: [
      {
        title: "ISO 20022 Business Model",
        source: "ISO 20022 Registration Authority",
        year: "Current repository",
        url: "https://www.iso20022.org/iso20022-repository/business-model",
        context:
          "An external example of defining common financial business concepts and their relationships separately from message syntax. CreditPassport's event ontology is narrower and underwriting-specific.",
      },
      {
        title: "Financial Industry Business Ontology (FIBO)",
        source: "EDM Council",
        year: "Current standard",
        url: "https://edmcouncil.org/financial-industry-business-ontology/",
        context:
          "Provides broader industry context for using formal, machine-readable financial concepts and relationships to make financial data semantically unambiguous.",
      },
    ],
    relatedSlugs: ["validate-the-lending-system-not-just-the-model", "probability-is-not-a-decision"],
    consultingSlugs: ["data-financial-intelligence", "decision-data-infrastructure"],
  },
  {
    slug: "validate-the-lending-system-not-just-the-model",
    number: "04",
    title: "Validate the Lending System, Not Just the Model",
    dek: "Model accuracy is only one part of whether an underwriting intervention improves the economics and quality of lending.",
    category: "Model Risk / Experimentation",
    date: "2026-08-26",
    status: "Research note",
    thesis:
      "The relevant question is not only whether a model predicts well. It is whether the complete decision system changes approval, default, calibration, explainability and operational performance in the intended direction.",
    keywords: ["model validation", "model risk", "shadow mode", "decision systems", "monitoring"],
    sections: [
      {
        heading: "Predictive performance is not business performance",
        paragraphs: [
          "A model can rank risk effectively without improving the lender's decisions. Policy may neutralize its signal, thresholds may be poorly chosen, the review process may introduce delay, or the system may reject good borrowers the lender could profitably serve.",
          "The internal CreditPassport validation framework therefore includes approval rate, default rate, approval lift, calibration, false positives, false negatives, decision latency and explainability coverage alongside conventional predictive measures.",
        ],
      },
      {
        heading: "Shadow mode creates a cleaner comparison",
        paragraphs: [
          "A practical early-stage method is to run a new decision system in shadow mode: produce recommendations without allowing them to affect the lender's live action, then compare the new recommendation, the lender's actual decision and the realized repayment outcome.",
          "Historical replay can extend that comparison when past inputs, decisions and outcomes are sufficiently complete. The quality of the benchmark depends on data lineage and on avoiding leakage from information that was not available at the original decision time.",
        ],
      },
      {
        heading: "Define the intervention before celebrating the metric",
        paragraphs: [
          "An approval increase is not automatically an improvement if default or loss rises beyond appetite. A lower default rate can be economically trivial if it is achieved by declining nearly everyone. The evaluation target must specify the trade-off the institution is trying to improve.",
          "CreditPassport's internal MVP planning used approval lift at a comparable default rate as a design target. That target is a validation criterion, not a public claim that the result has already been achieved.",
        ],
      },
    ],
    implications: [
      "Predefine business and risk metrics before changing policy or models.",
      "Preserve point-in-time inputs, decisions, policy versions and outcomes.",
      "Use shadow-mode or historical replay before live automation where appropriate.",
      "Report trade-offs, not isolated accuracy or approval metrics.",
    ],
    sourceNote:
      "This note is derived from the internal CreditPassport validation framework, MVP roadmap and shadow-mode API design. Internal lift targets are design goals, not achieved performance claims.",
    references: [
      {
        title: "Supervisory Guidance on Model Risk Management (SR 11-7)",
        source: "Board of Governors of the Federal Reserve System and Office of the Comptroller of the Currency",
        year: "2011",
        url: "https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107a1.pdf",
        context:
          "Provides banking model-risk context for conceptual soundness, outcomes analysis, ongoing monitoring, implementation verification, data quality and limits on model use.",
      },
      {
        title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0)",
        source: "U.S. National Institute of Standards and Technology",
        year: "2023",
        url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf",
        context:
          "Provides broader context for evaluating AI systems in their intended deployment context, tracking risks over time and documenting test, evaluation, validation and verification processes.",
      },
    ],
    relatedSlugs: ["probability-is-not-a-decision", "review-is-an-uncertainty-state"],
    consultingSlugs: ["portfolio-risk-analytics", "ai-machine-learning"],
  },
];

export function getResearchPost(slug: string) {
  return researchPosts.find((post) => post.slug === slug);
}
