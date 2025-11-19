import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[#FFFAF6] px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:py-[60px]">
      <div className="relative flex w-full max-w-[1280px] items-center justify-center py-8 md:py-14 lg:py-20">
        {/* Decorative Elements - Left Side */}
        <div className="absolute left-0 top-0 z-0 flex h-full flex-col items-center justify-between">
          {/* Top Square */}
          <div className="h-4 w-4 bg-[#FFBAA2] md:h-5 md:w-5 lg:h-6 lg:w-6" />
          {/* Dashed Line */}
          <svg className="flex-1" width="2" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#FFBAA2"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="md:stroke-2"
            />
          </svg>
          {/* Bottom Square */}
          <div className="h-4 w-4 bg-[#FFBAA2] md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </div>

        {/* Decorative Elements - Right Side */}
        <div className="absolute right-0 top-0 z-0 flex h-full flex-col items-center justify-between">
          {/* Top Square */}
          <div className="h-4 w-4 bg-[#FFBAA2] md:h-5 md:w-5 lg:h-6 lg:w-6" />
          {/* Dashed Line */}
          <svg className="flex-1" width="2" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#FFBAA2"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="md:stroke-2"
            />
          </svg>
          {/* Bottom Square */}
          <div className="h-4 w-4 bg-[#FFBAA2] md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </div>

        <div className="relative z-10 flex w-full max-w-[1040px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
          {/* Hero Text */}
          <div className="flex w-full flex-col items-center gap-6 text-center">
            <h1 className="text-[40px] leading-tight tracking-[-2px] text-black md:text-[56px] md:tracking-[-2.8px] lg:text-[72px] lg:tracking-[-3.6px]">
              ABC — The Fastest Way to Create Agency-Ready Briefs
            </h1>
            <p className="max-w-[800px] text-base leading-normal tracking-[-0.32px] text-gray-11 md:text-lg md:tracking-[-0.36px]">
              Create better briefs in minutes, not hours — giving your team
              clarity, your workflow speed, and your clients&apos; results. Just plug
              in, brief out.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex w-full max-w-[600px] flex-col items-center gap-6">
            {/* Primary CTA Button */}
            <Button asChild size="lg" className="h-14 w-full rounded-xl px-8 md:h-16 md:text-lg">
              <Link href="/demo">
                See ABC in Action
                <span className="ml-2 text-sm font-normal opacity-70">
                  (90 seconds)
                </span>
              </Link>
            </Button>

            {/* Benefits Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm leading-normal tracking-[-0.28px] text-gray-11">
              <div className="flex items-center gap-2">
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
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
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
                <span>Personalized for your agency</span>
              </div>
              <div className="flex items-center gap-2">
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
                <span>Takes 90 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
