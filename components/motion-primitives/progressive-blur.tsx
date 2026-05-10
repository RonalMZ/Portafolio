"use client";

import { cn } from "@/lib/utils";

type ProgressiveBlurProps = {
  className?: string;
  direction?: "top" | "right" | "bottom" | "left";
  layers?: number;
};

const masks = {
  top: "linear-gradient(to top, black, transparent)",
  right: "linear-gradient(to right, black, transparent)",
  bottom: "linear-gradient(to bottom, black, transparent)",
  left: "linear-gradient(to left, black, transparent)",
};

export function ProgressiveBlur({
  className,
  direction = "bottom",
  layers = 6,
}: ProgressiveBlurProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const blur = (index + 1) * 2;
        const opacity = 0.16 + index * 0.08;

        return (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: masks[direction],
              WebkitMaskImage: masks[direction],
              opacity,
            }}
          />
        );
      })}
    </div>
  );
}
