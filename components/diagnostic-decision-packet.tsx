"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const packetStages = [
  {
    number: "01",
    label: "Decision chain",
    action: "Reconstructing how the lending decision currently moves from evidence to action.",
    short: "Map",
  },
  {
    number: "02",
    label: "Policy",
    action: "Inventorying rules, thresholds, overrides and unresolved policy ambiguity.",
    short: "Rules",
  },
  {
    number: "03",
    label: "Data & lineage",
    action: "Tracing which evidence was available, transformed and retained at decision time.",
    short: "Lineage",
  },
  {
    number: "04",
    label: "Portfolio evidence",
    action: "Connecting historical decisions to repayment and portfolio outcomes.",
    short: "Evidence",
  },
  {
    number: "05",
    label: "Models & uncertainty",
    action: "Separating predictive signal, confidence limits and policy consequences.",
    short: "Validate",
  },
  {
    number: "06",
    label: "Infrastructure",
    action: "Prioritizing the smallest system changes required to make decisions reproducible.",
    short: "Intervene",
  },
] as const;

export function DiagnosticDecisionPacket() {
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % packetStages.length);
    }, 1900);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const active = packetStages[activeStage];

  return (
    <div className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-white/15 bg-white/[0.035]">
      <div className="flex items-center justify-between gap-4 border-b border-white/15 px-5 py-4">
        <div>
          <p className="kicker text-white/45">Illustrative diagnostic trace</p>
          <p className="mt-1 text-xs text-white/60">System packet / evidence before intervention</p>
        </div>
        <span className="tabular text-xs text-[color:var(--brand-mint)]">{active.number}/06</span>
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/10 sm:grid-cols-6">
        {packetStages.map((stage, index) => {
          const activeOrComplete = index <= activeStage;
          const isActive = index === activeStage;

          return (
            <button
              key={stage.number}
              type="button"
              onClick={() => setActiveStage(index)}
              className="relative min-h-20 bg-[color:var(--inverse)] px-3 py-4 text-left"
              aria-pressed={isActive}
            >
              <span className={`kicker transition-colors ${isActive ? "text-[color:var(--brand-mint)]" : "text-white/35"}`}>
                {stage.short}
              </span>
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-3 h-[2px] origin-left bg-[color:var(--brand-mint)]"
                animate={{ scaleX: activeOrComplete ? 1 : 0.12, opacity: isActive ? 1 : activeOrComplete ? 0.38 : 0.16 }}
                transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          );
        })}
      </div>

      <div className="relative min-h-48 overflow-hidden px-5 py-6">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(11,95,255,0.14),transparent_68%)]" />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.number}
            initial={reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: "blur(5px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--brand-mint)]/45 text-xs text-[color:var(--brand-mint)]">
                {active.number}
              </span>
              <p className="font-[family-name:var(--font-manrope)] text-xl font-semibold tracking-[-0.035em]">{active.label}</p>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/62">{active.action}</p>

            <div className="mt-7 grid grid-cols-[1fr_auto] items-center gap-4 border-t border-white/12 pt-4">
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-[color:var(--brand-blue)] to-[color:var(--brand-mint)]"
                  animate={{ scaleX: (activeStage + 1) / packetStages.length }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="kicker text-white/35">Review sequence</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
