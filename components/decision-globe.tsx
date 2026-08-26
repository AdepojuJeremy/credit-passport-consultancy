"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";

type DecisionGlobeProps = {
  activeStage: number;
};

type Point3D = {
  x: number;
  y: number;
  z: number;
};

type ProjectedPoint = Point3D & {
  screenX: number;
  screenY: number;
};

const stageNodes = [
  { lat: 10, lon: -4, label: "Evidence" },
  { lat: 2, lon: 16, label: "Structure" },
  { lat: -2, lon: 34, label: "Measure" },
  { lat: -24, lon: 27, label: "Policy" },
  { lat: 28, lon: 30, label: "Outcomes" },
] as const;

function fibonacciSphere(count: number) {
  const points: Point3D[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;

    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }

  return points;
}

function fromLatLon(lat: number, lon: number): Point3D {
  const latitude = (lat * Math.PI) / 180;
  const longitude = (lon * Math.PI) / 180;
  const cosLat = Math.cos(latitude);

  return {
    x: cosLat * Math.sin(longitude),
    y: -Math.sin(latitude),
    z: cosLat * Math.cos(longitude),
  };
}

function rotatePoint(point: Point3D, angle: number, tilt: number) {
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const rotatedX = point.x * cosAngle + point.z * sinAngle;
  const rotatedZ = -point.x * sinAngle + point.z * cosAngle;

  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);

  return {
    x: rotatedX,
    y: point.y * cosTilt - rotatedZ * sinTilt,
    z: point.y * sinTilt + rotatedZ * cosTilt,
  };
}

function project(point: Point3D, centerX: number, centerY: number, radius: number): ProjectedPoint {
  return {
    ...point,
    screenX: centerX + point.x * radius,
    screenY: centerY + point.y * radius,
  };
}

function drawArc(
  context: CanvasRenderingContext2D,
  from: ProjectedPoint,
  to: ProjectedPoint,
  radius: number,
  alpha: number,
) {
  if (from.z < -0.05 || to.z < -0.05) return;

  const midpointX = (from.screenX + to.screenX) / 2;
  const midpointY = (from.screenY + to.screenY) / 2 - radius * 0.12;

  context.beginPath();
  context.moveTo(from.screenX, from.screenY);
  context.quadraticCurveTo(midpointX, midpointY, to.screenX, to.screenY);
  context.strokeStyle = `rgba(0, 230, 177, ${alpha})`;
  context.lineWidth = 1;
  context.stroke();
}

export function DecisionGlobe({ activeStage }: DecisionGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useSpring(0, { stiffness: 100, damping: 22, mass: 0.45 });
  const pointerY = useSpring(0, { stiffness: 100, damping: 22, mass: 0.45 });
  const rotateY = useTransform(pointerX, [-1, 1], [-3.5, 3.5]);
  const rotateX = useTransform(pointerY, [-1, 1], [3, -3]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const spherePoints = fibonacciSphere(560);
    const nodePoints = stageNodes.map((node) => fromLatLon(node.lat, node.lon));
    let frame = 0;
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(90, Math.min(width, height) * 0.39);
      const drift = reduceMotion ? 0 : Math.sin(time / 9000) * 0.2;
      const angle = -0.08 + drift;
      const tilt = -0.18;

      const glow = context.createRadialGradient(
        centerX - radius * 0.25,
        centerY - radius * 0.3,
        radius * 0.05,
        centerX,
        centerY,
        radius * 1.15,
      );
      glow.addColorStop(0, "rgba(11, 95, 255, 0.15)");
      glow.addColorStop(0.55, "rgba(0, 230, 177, 0.055)");
      glow.addColorStop(1, "rgba(8, 26, 58, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(255, 255, 255, 0.18)";
      context.lineWidth = 1;
      context.stroke();

      for (const point of spherePoints) {
        const rotated = rotatePoint(point, angle, tilt);
        const projected = project(rotated, centerX, centerY, radius);
        const depth = Math.max(0, (rotated.z + 1) / 2);
        const alpha = 0.045 + depth * 0.35;
        const dotRadius = 0.45 + depth * 0.85;

        context.beginPath();
        context.arc(projected.screenX, projected.screenY, dotRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        context.fill();
      }

      const projectedNodes = nodePoints.map((point) =>
        project(rotatePoint(point, angle, tilt), centerX, centerY, radius),
      );

      for (let index = 0; index < projectedNodes.length - 1; index += 1) {
        const isActiveConnection = index === activeStage || index + 1 === activeStage;
        drawArc(context, projectedNodes[index], projectedNodes[index + 1], radius, isActiveConnection ? 0.58 : 0.17);
      }

      projectedNodes.forEach((node, index) => {
        if (node.z < -0.05) return;

        const isActive = index === activeStage;
        const pulse = reduceMotion ? 0 : (Math.sin(time / 420 + index) + 1) / 2;
        const ringRadius = isActive ? 8 + pulse * 5 : 5;

        if (isActive) {
          context.beginPath();
          context.arc(node.screenX, node.screenY, ringRadius, 0, Math.PI * 2);
          context.strokeStyle = `rgba(0, 230, 177, ${0.22 + pulse * 0.3})`;
          context.lineWidth = 1;
          context.stroke();
        }

        context.beginPath();
        context.arc(node.screenX, node.screenY, isActive ? 3.6 : 2.4, 0, Math.PI * 2);
        context.fillStyle = isActive ? "#00e6b1" : "rgba(11, 95, 255, 0.88)";
        context.fill();
      });

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [activeStage, reduceMotion]);

  return (
    <div className="[perspective:1000px]">
      <motion.figure
        className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-xl)] border border-white/15 bg-white/[0.025] md:min-h-[430px]"
        aria-label="Illustrative animated decision network focused on African financial systems"
        style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(event) => {
          if (reduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
          pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

        <figcaption className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <p className="kicker text-white/45">Decision network</p>
            <p className="mt-1 text-xs text-white/65">Illustrative system view · Africa</p>
          </div>
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/55">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[color:var(--brand-mint)] shadow-[0_0_16px_rgba(0,230,177,0.7)]" />
            Active trace
          </span>
        </figcaption>

        <div className="absolute inset-x-5 bottom-5 z-10 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.1em] text-white/50">
          <span className="border-t border-white/15 pt-3">Evidence</span>
          <span className="border-t border-white/15 pt-3 text-center">Policy</span>
          <span className="border-t border-white/15 pt-3 text-right">Outcomes</span>
        </div>
      </motion.figure>
    </div>
  );
}
