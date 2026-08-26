const stages = [
  ["01", "Observe", "Financial records, behaviour and context"],
  ["02", "Structure", "Events, entities and economic meaning"],
  ["03", "Measure", "Features, risk and uncertainty"],
  ["04", "Decide", "Policy, constraints and recommended action"],
  ["05", "Learn", "Outcomes, validation and policy improvement"],
];

export function DecisionSystem() {
  return (
    <div className="mt-16 border-y border-white/20">
      {stages.map(([number, title, description], index) => (
        <div
          key={number}
          className="group grid gap-4 border-b border-white/20 py-5 last:border-b-0 md:grid-cols-[80px_1fr_1.4fr] md:items-center"
        >
          <span className="kicker text-white/45">{number}</span>
          <span className="flex items-center gap-3 text-xl tracking-[-0.035em]">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ${index === 3 ? "bg-[color:var(--brand-mint)]" : "bg-white/25"}`}
            />
            {title}
          </span>
          <span className="text-sm leading-6 text-white/55 transition-colors group-hover:text-white/80">{description}</span>
        </div>
      ))}
    </div>
  );
}
