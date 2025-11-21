"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="flex h-[500px] items-center justify-center bg-primary-3 px-5 py-10 md:h-[600px] md:px-10 md:py-12 lg:h-[720px] lg:px-20 lg:py-[60px]"
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        {/* Bottom Left Decoration */}
        <div className="absolute bottom-0 left-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="185"
            height="185"
            viewBox="-10 -20 205 215"
            fill="none"
          >
            {/* White squares - stay still */}
            <rect y="107" width="78" height="78" rx="8" fill="#FFFAF6" />
            <rect x="82" y="107" width="78" height="78" rx="8" fill="#FFFAF6" />
            <rect y="25" width="78" height="78" rx="8" fill="#FFFAF6" />

            {/* Orange squares - animated with CSS transforms */}
            <g style={{ transformOrigin: "center", transformBox: "fill-box" }}>
              <motion.rect
                x="82"
                y="82"
                width="21"
                height="21"
                rx="3"
                fill="#FFBAA2"
                animate={{ translateY: [0, -8, 0], translateX: [0, 3, 0] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
            </g>
            <g style={{ transformOrigin: "center", transformBox: "fill-box" }}>
              <motion.rect
                x="0"
                y="0"
                width="21"
                height="21"
                rx="3"
                fill="#FFBAA2"
                animate={{ translateY: [0, -12, 0], translateX: [0, -2, 0] }}
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.5,
                }}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
            </g>
            <g style={{ transformOrigin: "center", transformBox: "fill-box" }}>
              <motion.rect
                x="164"
                y="164"
                width="21"
                height="21"
                rx="3"
                fill="#FFBAA2"
                animate={{ translateY: [0, -6, 0], translateX: [0, 2, 0] }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 1,
                }}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
            </g>
          </svg>
        </div>

        {/* Top Right Decoration */}
        <div className="absolute right-0 top-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="185"
            height="185"
            viewBox="-10 -20 205 215"
            fill="none"
          >
            {/* White squares - stay still */}
            <rect
              x="185"
              y="78"
              width="78"
              height="78"
              rx="8"
              transform="rotate(180 185 78)"
              fill="#FFFAF6"
            />
            <rect
              x="103"
              y="78.002"
              width="78"
              height="78"
              rx="8"
              transform="rotate(180 103 78.002)"
              fill="#FFFAF6"
            />
            <rect
              x="185"
              y="160"
              width="78"
              height="78"
              rx="8"
              transform="rotate(180 185 160)"
              fill="#FFFAF6"
            />

            {/* Orange squares - animated with CSS transforms */}
            <g style={{ transformOrigin: "center", transformBox: "fill-box" }}>
              <motion.rect
                x="102.998"
                y="103"
                width="21"
                height="21"
                rx="3"
                transform="rotate(180 102.998 103)"
                fill="#FFBAA2"
                animate={{ translateY: [0, 10, 0], translateX: [0, -3, 0] }}
                transition={{
                  duration: 4.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.3,
                }}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
            </g>

            <g style={{ transformOrigin: "center", transformBox: "fill-box" }}>
              <motion.rect
                x="21"
                y="21.0005"
                width="21"
                height="21"
                rx="3"
                transform="rotate(180 21 21.0005)"
                fill="#FFBAA2"
                animate={{ translateY: [0, 12, 0], translateX: [0, -4, 0] }}
                transition={{
                  duration: 4.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 1.2,
                }}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
            </g>
          </svg>
        </div>

        <div className="relative z-10 flex w-full max-w-[800px] flex-col items-center gap-6">
          {/* Title */}
          <h2 className="w-full text-center text-[32px] font-semibold leading-[1.2] tracking-[-1.6px] text-gray-12 md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]">
            Experience Primer With Your Brand
          </h2>

          {/* Description */}
          <p className="max-w-[507px] text-center text-base leading-[1.4] text-gray-11">
            We&apos;ll analyze your website and show you how a complete brief
            happens through conversation. Takes 3-4 minutes.
          </p>

          {/* CTA Button */}
          <div className="mt-2">
            <Button variant="default">Try it now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
