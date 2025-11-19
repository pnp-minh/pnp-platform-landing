import { Variants } from "framer-motion";

// Brand easing: Confident but not aggressive
const brandEasing = [0.4, 0, 0.2, 1] as any; // cubic-bezier(0.4, 0, 0.2, 1)

// Animation variants for consistent motion across components
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: brandEasing,
    },
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: brandEasing,
    },
  },
};

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: brandEasing,
    },
  },
};

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: brandEasing,
    },
  },
};

export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: brandEasing,
    },
  },
};

export const drawLine: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: brandEasing,
    },
  },
};

// Hero-specific variants with blur reduction for premium feel
export const heroHeading: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: brandEasing,
      delay: 0.2,
    },
  },
};

export const heroSubheading: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: brandEasing,
      delay: 0.4,
    },
  },
};

export const heroCTA: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: brandEasing,
      delay: 0.6,
    },
  },
};

// Container variant for staggered children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Variant for staggered grid items
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: brandEasing,
    },
  },
};

// Card hover animation
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: {
      duration: 0.3,
      ease: brandEasing as any,
    },
  },
  hover: {
    y: -8,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: brandEasing as any,
    },
  },
};

// Button hover animation
export const buttonHover: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.2,
      ease: brandEasing as any,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: brandEasing as any,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: brandEasing as any,
    },
  },
};
