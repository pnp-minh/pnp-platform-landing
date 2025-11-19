"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Hook to detect if element is in viewport
 * Returns true once and stays true (for scroll-triggered animations)
 */
export function useScrollAnimation(options?: {
  threshold?: number;
  triggerOnce?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: options?.triggerOnce ?? true,
    amount: options?.threshold ?? 0.2, // 20% of element in view
  });

  return { ref, isInView };
}

/**
 * Hook to check if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mediaQuery.matches;

    const handleChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion.current = event.matches;
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion.current;
}

/**
 * Hook to get responsive animation duration
 * Reduces duration by 30% on mobile for performance
 */
export function useResponsiveDuration(baseDuration: number): number {
  const isMobile = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile.current ? baseDuration * 0.7 : baseDuration;
}
