"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DecisionGlobe } from "@/components/decision-globe";

const stages = [
  {
    number: "01",
    title: "Observe",
    description: "Financial records, behaviour and context",
    signal: "Evidence collected",
  },
  {
    number: "02",
    title: "Structure",
    description: "Events, entities and economic meaning",
    signal: "Evidence structured",
  },
  {
    number: "03",
    title: "Measure",
    description: "Features, risk and uncertainty",
    signal: "Risk and confidence measured",
  },
  {
    number: "04",
    title: "Decide",
    description: "Policy, constraints and recommended action",
    signal: "Policy applied",
  },
  {
    number: "05",
    title: "Learn",
    description: "Outcomes, validation and policy improvement",
    signal: "Outcome fed back",
  },
] as const;

export function DecisionSystem() {
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const active = stages[activeStage];

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % stages.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="mt-16 grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-stretch">
      <DecisionGlobe activeStage={activeStage} />

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-white/15 bg-white/[0.025]">
        <div className="flex items-center justify-between gap-4 border-b border-white/15 px-5 py-4">
          <div>
            <p className="kicker text-white/45">System trace</p>
            <p className="mt-1 text-xs text-white/65">Observe → Structure → Measure → Decide → Learn</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/50">
            <span className="tabular">{active.number}</span>
            <span aria-hidden="true" className="h-px w-7 bg-white/20" />
            <span>{active.title}</span>
          </div>
        </div>

        <div>
          {stages.map((stage, index) => {
            const isActive = activeStage === index;

            return (
              <motion.div
                key={stage.number}
                onMouseEnter={() => setActiveStage(index)}
                className="relative grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[64px_0.8fr_1.25fr] md:items-center"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        backgroundColor: isActive ? "rgba(11, 95, 255, 0.10)" : "rgba(255, 255, 255, 0)",
                      }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[2px] origin-top bg-[color:var(--brand-mint)]"
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                />

                <span className={`kicker transition-colors ${isActive ? "text-[color:var(--brand-mint)]" : "text-white/35"}`}>
                  {stage.number}
                </span>

                <span className="flex items-center gap-3 text-xl tracking-[-0.035em]">
                  <motion.span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full"
                    animate={{
                      backgroundColor: isActive ? "#00e6b1" : "rgba(255,255,255,0.22)",
                      boxShadow: isActive ? "0 0 18px rgba(0,230,177,0.52)" : "0 0 0 rgba(0,0,0,0)",
                      scale: isActive && !reduceMotion ? [1, 1.28, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.25 },
                      boxShadow: { duration: 0.25 },
                      scale: { duration: 1.25, repeat: isActive && !reduceMotion ? Infinity : 0 },
                    }}
                  />
                  {stage.title}
                </span>

                <span className={`text-sm leading-6 transition-colors ${isActive ? "text-white/85" : "text-white/50"}`}>
                  {stage.description}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="grid min-h-24 gap-3 border-t border-white/15 bg-black/10 px-5 py-5 sm:grid-cols-[110px_1fr] sm:items-center">
          <span className="kicker text-white/35">Current state</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.signal}
              initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-sm text-white/80"
            >
              <span aria-hidden="true" className="h-px w-10 bg-[color:var(--brand-blue)]" />
              {active.signal}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
