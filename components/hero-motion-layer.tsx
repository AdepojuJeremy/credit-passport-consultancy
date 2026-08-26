"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";

type Point3D = { x: number; y: number; z: number };

function fibonacciSphere(count: number) {
  const points: Point3D[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }

  return points;
}

function rotatePoint(point: Point3D, angle: number, tilt: number) {
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const x = point.x * cosAngle + point.z * sinAngle;
  const z = -point.x * sinAngle + point.z * cosAngle;

  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);

  return {
    x,
    y: point.y * cosTilt - z * sinTilt,
    z: point.y * sinTilt + z * cosTilt,
  };
}

function HeroDecisionGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useSpring(0, { stiffness: 95, damping: 20, mass: 0.4 });
  const pointerY = useSpring(0, { stiffness: 95, damping: 20, mass: 0.4 });
  const rotateY = useTransform(pointerX, [-1, 1], [-5, 5]);
  const rotateX = useTransform(pointerY, [-1, 1], [4, -4]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const points = fibonacciSphere(780);
    let frame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const centerX = width * 0.52;
      const centerY = height * 0.49;
      const radius = Math.min(width, height) * 0.43;
      const rotation = reduceMotion ? 0.18 : 0.18 + time / 26000;
      const tilt = -0.2;

      const glow = context.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.32,
        radius * 0.08,
        centerX,
        centerY,
        radius * 1.08,
      );
      glow.addColorStop(0, "rgba(11, 95, 255, 0.11)");
      glow.addColorStop(0.62, "rgba(11, 95, 255, 0.035)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(11, 59, 138, 0.08)";
      context.lineWidth = 1;
      context.stroke();

      for (const point of points) {
        const rotated = rotatePoint(point, rotation, tilt);
        const depth = Math.max(0, (rotated.z + 1) / 2);
        const x = centerX + rotated.x * radius;
        const y = centerY + rotated.y * radius;
        const alpha = 0.025 + depth * 0.18;
        const size = 0.4 + depth * 1.1;

        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fillStyle = `rgba(26, 32, 44, ${alpha})`;
        context.fill();
      }

      const pulse = reduceMotion ? 0.4 : (Math.sin(time / 900) + 1) / 2;
      const accents = [
        [-0.31, -0.18],
        [0.12, -0.35],
        [0.35, 0.08],
        [-0.02, 0.28],
      ] as const;
      const activeIndex = reduceMotion ? 0 : Math.floor((time / 1900) % accents.length);

      accents.forEach(([dx, dy], index) => {
        const x = centerX + dx * radius;
        const y = centerY + dy * radius;
        const active = index === activeIndex;

        if (active && !reduceMotion) {
          context.beginPath();
          context.arc(x, y, 7 + pulse * 5, 0, Math.PI * 2);
          context.strokeStyle = `rgba(0, 230, 177, ${0.12 + pulse * 0.2})`;
          context.lineWidth = 1;
          context.stroke();
        }

        context.beginPath();
        context.arc(x, y, active ? 2.8 : 2, 0, Math.PI * 2);
        context.fillStyle = active ? "rgba(0, 230, 177, 0.78)" : "rgba(11, 95, 255, 0.32)";
        context.fill();
      });

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div className="hero-globe-perspective">
      <motion.div
        className="hero-globe-shell"
        style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}
        onPointerMove={(event) => {
          if (reduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
          pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
          setHovered(true);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
          setHovered(false);
        }}
        animate={reduceMotion ? undefined : { scale: hovered ? 1.012 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </motion.div>
    </div>
  );
}

export function HeroMotionLayer() {
  const pathname = usePathname();
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setTarget(null);
      return;
    }

    const host = document.querySelector("#main-content > section.section-grid:first-child");
    if (!host) return;

    host.classList.add("hero-globe-host");
    setTarget(host);

    return () => {
      host.classList.remove("hero-globe-host");
    };
  }, [pathname]);

  if (pathname !== "/" || !target) return null;

  return createPortal(<HeroDecisionGlobe />, target);
}
