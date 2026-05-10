"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  rotationFactor?: number;
};

export function TiltCard({
  children,
  className,
  rotationFactor = 7,
}: TiltCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(y, [0, 1], [rotationFactor, -rotationFactor]),
    { stiffness: 180, damping: 20, mass: 0.4 },
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-rotationFactor, rotationFactor]),
    { stiffness: 180, damping: 20, mass: 0.4 },
  );
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      style={{ transform, transformStyle: "preserve-3d" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
