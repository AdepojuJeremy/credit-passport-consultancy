"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 140,
    damping: reduceMotion ? 100 : 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--brand-blue), var(--brand-mint))",
        boxShadow: reduceMotion ? "none" : "0 0 12px rgba(0, 230, 177, 0.32)",
      }}
    />
  );
}
