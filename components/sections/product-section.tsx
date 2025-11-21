"use client";

import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { SectionTag } from "@/components/ui/section-tag";
import Image from "next/image";

export function ProductSection() {
  return (
    <section
      id="product"
      className="flex items-center justify-center bg-white px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:py-[60px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center">
        <div className="flex w-full flex-col gap-10 rounded-[48px] border border-border-default py-8 md:gap-0 md:py-12 lg:py-[60px]">
          {/* Content */}
          <AnimatedSection variant="fadeUp" threshold={0.2}>
            <div className="flex w-full flex-col items-start gap-2.5 px-8 md:px-12 lg:px-[60px]">
              {/* Section Tag */}
              <SectionTag>The Product</SectionTag>

              {/* Text Content */}
              <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:gap-8">
                {/* Left: Title */}
                <h2
                  className="w-full text-[32px] font-semibold leading-[1.2] tracking-[-1.6px] text-gray-12 md:text-[40px] md:tracking-[-2px] lg:w-[528px] lg:text-[48px] lg:tracking-[-2.4px]"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  AI brief consultant for agencies
                </h2>

                {/* Right: Description */}
                <div className="flex w-full flex-col gap-6 pt-0 lg:w-[459px] lg:pt-3">
                  <p
                    className="text-lg font-semibold leading-relaxed text-gray-12"
                    style={{ textWrap: "balance" } as React.CSSProperties}
                  >
                    Your clients chat with Primer. You receive complete briefs.
                  </p>
                  <p
                    className="text-base leading-[1.6] text-gray-11"
                    style={{ textWrap: "balance" } as React.CSSProperties}
                  >
                    Set up your template and Brand Intelligence once. Share the
                    brief link with your client. They chat with the AI Brief
                    Consultant, answering questions and adding context at their
                    own pace. Primer delivers a structured brief into your
                    Workflow. You skip the intake, keep the intelligence.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Platform Image */}
          <AnimatedSection
            variant="scaleUp"
            delay={0.2}
            threshold={0.15}
            className="relative w-full px-8 md:px-12 lg:px-[60px]"
          >
            <div className="relative w-full aspect-1160/680">
              <Image
                src="/images/pnp-platform.png"
                alt="Primer platform overview"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1160px"
                className="rounded-3xl object-contain"
                priority
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
