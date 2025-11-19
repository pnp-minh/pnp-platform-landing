"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, FileText } from "lucide-react";

const briefTemplates = [
  {
    id: 1,
    title: "Ebook Brief",
    description:
      "Educational ebook brief for agencies to gather client requirements for long-form content",
    sections: 9,
    time: "15 - 25 mins",
    keyAreas: [
      "Objectives & Audience",
      "Content Structure",
      "Technical Requirements",
      "Distribution Plan",
    ],
  },
  {
    id: 2,
    title: "Sales Deck Brief",
    description:
      "Sales Deck brief for agencies to gather client requirements for presentations and pitch decks",
    sections: 12,
    time: "10 - 20 mins",
    keyAreas: [
      "Objectives & Audience",
      "Content Structure",
      "Technical Requirements",
      "Distribution Plan",
    ],
  },
  {
    id: 3,
    title: "Social Brief",
    description:
      "Social media content brief for agencies to gather client for agencies to gather client requirements and campain objectives",
    sections: 10,
    time: "10 - 20 mins",
    keyAreas: [
      "Objectives & Audience",
      "Key Messages",
      "Platform & Format",
      "Platform & Format",
    ],
  },
];

// Staggered animation for cards - center card first, then sides
const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 60,
    scale: 0.95,
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as any,
      // Center card (index 1) appears first (0ms delay)
      // Side cards (index 0, 2) appear 200ms later
      delay: index === 1 ? 0 : 0.2,
    },
  }),
};

export function BriefTemplates() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden md:overflow-visible">
      {/* Cards Container */}
      <div className="relative flex w-full items-center justify-center gap-3 py-8 md:items-start md:gap-6 md:py-10 lg:gap-8">
        {briefTemplates.map((brief, index) => (
          <motion.div
            key={brief.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className={`flex w-full flex-shrink-0 flex-col gap-6 border border-gray-3 bg-white p-6 shadow-sm md:min-w-0 md:max-w-[340px] md:gap-9 md:p-9 lg:max-w-[370px] ${
              index === 1
                ? "relative z-10 min-w-[280px] max-w-[320px] rounded-3xl md:mx-0"
                : "relative min-w-[240px] max-w-[280px] opacity-60 md:min-w-0 md:max-w-[340px] md:opacity-100"
            } ${
              index === 0
                ? "mt-6 rounded-r-3xl rounded-bl-3xl rounded-tl-none md:mt-10 md:rounded-3xl md:opacity-90 lg:mt-8"
                : ""
            } ${
              index === 2
                ? "mt-6 rounded-l-3xl rounded-br-3xl rounded-tr-none md:mt-10 md:rounded-3xl md:opacity-90 lg:mt-8"
                : ""
            }`}
          >
            {/* Header */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {/* Icon */}
                <div className="inline-flex w-fit rounded-lg bg-primary-3 p-3">
                  <FileText
                    className="h-5 w-5 text-primary-1"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3 className="font-sans text-lg font-bold leading-normal tracking-[-0.4px] text-gray-12">
                  {brief.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed tracking-[-0.28px] text-gray-10">
                {brief.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-sm leading-relaxed tracking-[-0.28px] text-gray-9">
                  Section:
                </span>
                <div className="flex items-center justify-center rounded bg-gray-3 px-3 py-1">
                  <span className="text-sm font-medium leading-relaxed tracking-[-0.28px] text-gray-12">
                    {brief.sections}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-sm leading-relaxed tracking-[-0.28px] text-gray-9">
                  Time:
                </span>
                <div className="flex items-center justify-center rounded bg-gray-3 px-3 py-1">
                  <span className="text-sm font-medium leading-relaxed tracking-[-0.28px] text-gray-12">
                    {brief.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Areas */}
            <div className="flex flex-col gap-3.5">
              <h4 className="font-sans text-sm font-semibold leading-relaxed tracking-[-0.28px] text-gray-12">
                Key Areas:
              </h4>

              <div className="flex flex-col gap-1.5">
                {brief.keyAreas.map((area, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check
                      className="h-[18px] w-[18px] shrink-0 text-gray-9"
                      strokeWidth={2}
                    />
                    <span className="text-sm leading-relaxed tracking-[-0.28px] text-gray-10">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow Button */}
            <div className="mt-auto flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-1 transition-opacity hover:opacity-90"
              >
                <ArrowRight className="h-5 w-5 text-white" strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Gradient Fade */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent via-white/50 to-white"
      />
    </div>
  );
}
