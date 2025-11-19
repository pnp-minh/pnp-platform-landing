"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cardHover } from "@/lib/animations/variants";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
}

export function AnimatedCard({
  children,
  className,
  enableHover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover={enableHover ? "hover" : undefined}
      variants={cardHover}
    >
      {children}
    </motion.div>
  );
}
