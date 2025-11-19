"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, scaleUp, buttonHover } from "@/lib/animations/variants";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="flex items-center justify-center bg-primary-3 px-5 py-20 md:px-10 md:py-32 lg:px-20 lg:py-[255px]"
    >
      <div className="flex w-full max-w-[800px] flex-col items-center gap-6">
        {/* Title */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="w-full text-center text-[32px] font-semibold leading-none tracking-[-1.6px] text-gray-12 md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]"
        >
          Your Feedback Matters
        </motion.h2>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            ...fadeUp,
            visible: {
              ...fadeUp.visible,
              transition: {
                ...(typeof fadeUp.visible === "object" && "transition" in fadeUp.visible
                  ? fadeUp.visible.transition
                  : {}),
                delay: 0.2,
              },
            },
          }}
          className="max-w-[507px] text-center text-base leading-[1.4] text-gray-11 md:text-lg"
        >
          Create your first brief in seconds, and share your feedback to make
          it even better.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            ...scaleUp,
            visible: {
              ...scaleUp.visible,
              transition: {
                ...(typeof scaleUp.visible === "object" && "transition" in scaleUp.visible
                  ? scaleUp.visible.transition
                  : {}),
                delay: 0.4,
              },
            },
          }}
          className="mt-2"
        >
          <motion.div
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonHover}
          >
            <Button variant="default">Experience Our Platform</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
