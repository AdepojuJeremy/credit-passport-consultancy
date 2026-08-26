export const sectors = [
  {
    number: "01",
    title: "Banks & Microfinance",
    description:
      "Teams redesigning underwriting policy, portfolio controls, risk analytics or the data infrastructure behind lending decisions.",
    problems: ["Policy complexity", "Manual review", "Portfolio leakage", "Legacy decision systems"],
  },
  {
    number: "02",
    title: "Digital Lenders & BNPL",
    description:
      "Credit businesses balancing growth, approval quality, fraud, affordability and fast decisioning under incomplete information.",
    problems: ["Approval quality", "Pricing & limits", "Behavioural signals", "Decision latency"],
  },
  {
    number: "03",
    title: "Fintech & Embedded Credit",
    description:
      "Platforms introducing credit into an existing product and needing a defensible decision framework rather than isolated scoring logic.",
    problems: ["Credit product design", "Risk appetite", "Data strategy", "Decision architecture"],
  },
  {
    number: "04",
    title: "Credit Infrastructure Teams",
    description:
      "Data, risk and product teams building reusable financial-event, feature, policy and decision layers across products or institutions.",
    problems: ["Feature systems", "Auditability", "Model governance", "API architecture"],
  },
] as const;
