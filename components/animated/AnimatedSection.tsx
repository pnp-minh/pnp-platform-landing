"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { useScrollAnimation } from "@/lib/animations/hooks";
import * as variants from "@/lib/animations/variants";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  threshold = 0.2,
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation({ threshold });

  const animationVariant = variants[variant] as Variants;

  // Add custom delay if specified
  const customVariant = delay
    ? {
        ...animationVariant,
        visible: {
          ...animationVariant.visible,
          transition: {
            ...(typeof animationVariant.visible === "object" &&
            "transition" in animationVariant.visible
              ? animationVariant.visible.transition
              : {}),
            delay,
          },
        },
      }
    : animationVariant;

  return (
    <motion.div
      ref={ref as any}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}
