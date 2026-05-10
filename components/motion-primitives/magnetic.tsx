"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  range?: number;
};

export function Magnetic({
  children,
  className,
  intensity = 0.22,
  range = 140,
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.25 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.25 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance > range) {
      x.set(0);
      y.set(0);
      return;
    }

    x.set(distanceX * intensity);
    y.set(distanceY * intensity);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn("inline-flex will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
