"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const animationVariant = variants[variant] as Variants;

  // Use instant transition if user prefers reduced motion
  const reducedMotionVariant = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.01 },
    },
  };

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

  // Use appropriate variant based on user preference
  const finalVariant = prefersReducedMotion ? reducedMotionVariant : customVariant;

  return (
    <motion.div
      ref={ref as any}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={finalVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}
