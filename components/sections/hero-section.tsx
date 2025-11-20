"use client";

import { Button } from "@/components/ui/button";
import {
  buttonHover,
  drawLine,
  heroCTA,
  heroHeading,
  heroSubheading,
  staggerContainer,
  staggerItem,
} from "@/lib/animations/variants";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[#FFFAF6] px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:py-[60px]">
      <div className="relative flex w-full max-w-[1280px] items-center justify-center py-8 md:py-14 lg:py-28 xl:py-40">
        {/* Decorative Elements - Left Side */}
        <motion.div
          className="absolute left-0 top-0 z-0 flex h-full flex-col items-center justify-between"
          initial="hidden"
          animate="visible"
          variants={drawLine}
        >
          {/* Top Square */}
          <div className="h-4 w-4 bg-[#FFBAA2] md:h-5 md:w-5 opacity-50" />
          {/* Dashed Line */}
          <svg className="flex-1" width="2" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#FFBAA2"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </svg>
          {/* Bottom Square */}
          <div className="h-4 w-4 bg-[#FFBAA2] md:h-5 md:w-5 opacity-50" />
        </motion.div>

        {/* Decorative Elements - Right Side */}
        <motion.div
          className="absolute right-0 top-0 z-0 flex h-full flex-col items-center justify-between"
          initial="hidden"
          animate="visible"
          variants={drawLine}
        >
          {/* Top Square */}
          <div className="h-4 w-4 bg-[#FFBAA2] md:h-5 md:w-5 opacity-50" />
          {/* Dashed Line */}
          <svg className="flex-1" width="2" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#FFBAA2"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </svg>
          {/* Bottom Square */}
          <div className="h-4 w-4 bg-[#FFBAA2] md:h-5 md:w-5 opacity-50" />
        </motion.div>

        <div className="relative z-10 flex w-full max-w-[1040px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
          {/* Hero Text */}
          <div className="flex w-full flex-col items-center gap-6 text-center">
            <motion.h1
              className="text-[40px] leading-tight tracking-[-2px] text-black md:text-[56px] md:tracking-[-2.8px] lg:text-[72px] lg:tracking-[-3.6px]"
              initial="hidden"
              animate="visible"
              variants={heroHeading}
            >
              Better Briefs.
              <br />
              Less Time. Same Team.
            </motion.h1>
            <motion.p
              className="max-w-[800px] text-base leading-normal tracking-[-0.32px] text-gray-11 md:text-lg md:tracking-[-0.36px]"
              initial="hidden"
              animate="visible"
              variants={heroSubheading}
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Primer is an AI brief consultant that handles client intake
              through chat. Your team receives complete, structured
              briefs—without the hours of calls and documentation.
            </motion.p>
          </div>

          {/* CTA Section */}
          <div className="flex w-full max-w-[600px] flex-col items-center gap-6">
            {/* Primary CTA Button */}
            <motion.div
              className="w-full"
              initial="hidden"
              animate="visible"
              variants={heroCTA}
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHover}
                className="w-full"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-full rounded-xl px-8 md:h-16 md:text-lg"
                >
                  <Link href="/demo">Experience Primer</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Benefits Checklist */}
            <motion.div
              className="mx-auto flex w-fit flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm leading-normal tracking-[-0.28px] text-gray-11"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {[
                "No signup required",
                "See it with your brand",
                "Takes 3-4 minutes",
              ].map((text) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-2"
                  variants={staggerItem}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-11"
                  >
                    <path
                      d="M13.3333 4L6 11.3333L2.66667 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
