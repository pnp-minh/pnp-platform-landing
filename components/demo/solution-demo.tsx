"use client";

import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import { motion } from "framer-motion";

// Different animation for each section card - creates organic, premium feel
const sectionVariants = [
  // Section 1 (top): Fade down from above
  {
    hidden: { opacity: 0, y: -20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] as any, delay: 0 },
    },
  },
  // Section 2 (expanded/highlighted): Scale up (premium hero moment)
  {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] as any, delay: 0.2 },
    },
  },
  // Section 3: Fade left (from right side)
  {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] as any, delay: 0.4 },
    },
  },
  // Section 4 (bottom): Fade up from below with opacity
  {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 0.6, // matches the original opacity-60 styling
      y: 0,
      transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] as any, delay: 0.6 },
    },
  },
];

export function SolutionDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-primary-3">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(100, 35, 29, 0.08)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative flex h-full w-full items-center justify-center p-4 md:p-6 lg:items-center lg:justify-center lg:p-8">
        <div className="relative w-full max-w-[540px] scale-75 md:scale-90 lg:scale-100">
          {/* Section 1: About the Client - Collapsed */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants[0]}
            className="mb-3 ml-[8%] mr-[-2%] rounded-2xl bg-white px-6 py-4 shadow-sm md:mb-4 md:ml-[15%] md:mr-[-4%] md:rounded-[26px] md:px-9 md:py-[26px] lg:ml-[18%] lg:mr-[-8%]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="h-[15px] w-[15px] rounded-full bg-gray-7" />
                <p className="text-[17px] font-semibold leading-normal tracking-[-0.38px] text-gray-8">
                  About the Client
                </p>
              </div>
              <ChevronDown className="h-[17px] w-[17px] text-gray-8" />
            </div>
          </motion.div>

          {/* Section 2: About the Brand - Expanded */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants[1]}
            className="mb-3 ml-[4%] mr-[-1%] rounded-2xl bg-gray-1 px-6 py-6 shadow-lg md:mb-4 md:ml-[10%] md:mr-[-3%] md:rounded-[26px] md:px-9 md:py-9 lg:ml-[12%] lg:mr-[-4%]"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="h-[15px] w-[15px] rounded-full bg-primary-2" />
                <p className="text-[17px] font-semibold leading-normal tracking-[-0.38px] text-gray-12">
                  About the Brand
                </p>
              </div>
              <ChevronUp className="h-[17px] w-[17px] text-gray-12" />
            </div>

            {/* Badges */}
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded bg-gray-3 px-[6px] py-[2px]">
                <p className="text-[11px] font-medium leading-normal tracking-[-0.24px] text-gray-9">
                  Optional
                </p>
              </div>
              <p className="text-[11px] font-medium leading-normal tracking-[-0.24px] text-gray-9">
                1 item extracted
              </p>
            </div>

            {/* Input Field */}
            <div className="mb-4 rounded bg-gray-3 px-[6px] py-1">
              <p className="text-[11px] font-medium leading-normal tracking-[-0.24px] text-gray-9">
                Brand story and background
              </p>
            </div>

            {/* Extracted Content Section */}
            <div className="space-y-2">
              {/* Title */}
              <div className="flex items-center gap-2">
                <FileText className="h-[26px] w-[26px] text-gray-12" />
                <p className="text-[17px] font-semibold leading-normal tracking-[-0.38px] text-gray-12">
                  Extracted Content
                </p>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <p className="text-[13px] font-medium leading-normal tracking-[-0.28px] text-gray-12">
                  The Brand focus on...
                </p>
                <div className="flex items-center justify-between text-[11px] font-medium leading-normal tracking-[-0.24px] text-gray-9">
                  <p>90% confidence</p>
                  <p>09:00:00 AM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Project Overview - Collapsed */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants[2]}
            className="mb-3 ml-[8%] mr-[-2%] rounded-2xl bg-white px-6 py-4 shadow-sm md:mb-4 md:ml-[15%] md:mr-[-4%] md:rounded-[26px] md:px-9 md:py-[26px] lg:ml-[18%] lg:mr-[-6%]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="h-[15px] w-[15px] rounded-full bg-gray-7" />
                <p className="text-[17px] font-semibold leading-normal tracking-[-0.38px] text-gray-8">
                  Project Overview
                </p>
              </div>
              <ChevronDown className="h-[17px] w-[17px] text-gray-8" />
            </div>
          </motion.div>

          {/* Section 4: Video Details - Collapsed (Partially visible) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants[3]}
            className="ml-[10%] mr-[-3%] rounded-2xl bg-white px-6 py-4 shadow-sm md:ml-[18%] md:mr-[-6%] md:rounded-[26px] md:px-9 md:py-[26px] lg:ml-[22%] lg:mr-[-10%]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="h-[15px] w-[15px] rounded-full bg-gray-7" />
                <p className="text-[17px] font-semibold leading-normal tracking-[-0.38px] text-gray-11">
                  Video Details
                </p>
              </div>
              <ChevronDown className="h-[17px] w-[17px] text-gray-11" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
