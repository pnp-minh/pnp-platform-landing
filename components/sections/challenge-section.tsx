"use client";

import { SectionTag } from "@/components/ui/section-tag";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import Image from "next/image";

export function ChallengeSection() {
  return (
    <section
      id="challenge"
      className="flex items-center justify-center bg-white px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:py-[60px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Content */}
        <AnimatedSection variant="fadeUp" threshold={0.2} className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-6">
        {/* Left Card - Perfect Brief Image */}
        <div className="relative w-full lg:w-[628px]">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/perfect-brief.png"
              alt="Perfect brief illustration"
              fill
              sizes="(max-width: 1024px) 100vw, 628px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Card - Text Content */}
        <div className="flex w-full flex-col gap-6 pl-0 lg:w-[628px] lg:pl-8">
          <div className="flex flex-col items-start gap-2.5">
            <SectionTag>The Challenge</SectionTag>
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-1.6px] text-gray-12 md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]">
              Your Best People Shouldn&apos;t Spend Hours on Briefs
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-base leading-[1.6] text-gray-11">
              When your senior strategist spends 3 hours on intake calls and another hour writing it up, that&apos;s half a day not doing strategy. When someone leaves, their client knowledge walks out the door. New hires struggle to match the brief quality of your veterans. Clients feel interrogated by repetitive questions.
            </p>
            <p className="text-base leading-[1.6] text-gray-11">
              Primer handles what&apos;s predictable—gathering context, maintaining Brand Intelligence, producing structured briefs—so your team focuses on what&apos;s not: strategy, creativity, and relationships.
            </p>
          </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
