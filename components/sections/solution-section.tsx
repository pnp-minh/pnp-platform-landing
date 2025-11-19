import { Clock, User, Zap } from "lucide-react";

const benefits = [
  {
    id: 1,
    icon: Clock,
    title: "It Saves Serious Time",
    description:
      "Turns a 3-hour briefing process into 15 minutes, freeing your team to focus on revenue-generating work.",
  },
  {
    id: 2,
    icon: Zap,
    title: "It Speeds Up Onboarding",
    description:
      'New hires become "brand experts" in 24 hours, with full context and brand understanding—no hand-holding needed.',
  },
  {
    id: 3,
    icon: User,
    title: "It Lifts Revenue Per Employee",
    description:
      "Get more work done without extra hires, keep PMs out of busywork, help creatives avoid rework, making projects smoother & profitable.",
  },
];

export function SolutionSection() {
  return (
    <section
      id="solution"
      className="flex items-center justify-center px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:py-[60px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2.5">
            {/* Solution Badge */}
            <div className="rounded-lg bg-[#ededed] px-4 py-3">
              <p className="text-sm font-medium leading-[1.6] tracking-[-0.28px] text-[#adadad]">
                Solution
              </p>
            </div>

            {/* Title */}
            <h2 className="max-w-[568px] text-center text-[32px] leading-none tracking-[-1.6px] text-text-primary md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]">
              Agencies Run Better When Nothing Gets Stuck.
            </h2>
          </div>

          {/* CTA Button */}
          <button className="rounded-lg bg-[#161617] px-4 py-2.5 text-base font-medium text-white transition-colors hover:bg-black">
            Test & Help Shape Us
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
          {/* Benefits Cards */}
          <div className="flex w-full flex-col gap-5 lg:w-[411px]">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  className="flex flex-col gap-3 rounded-3xl bg-[#f9f9f9] p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <Icon className="h-6 w-6 text-black" strokeWidth={2} />
                    </div>
                    <h3 className="text-[18px] font-semibold leading-[1.5] tracking-[-0.342px] text-black">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-base font-normal leading-[1.4] text-black">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Demo Preview */}
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl bg-[#cdcdcd] md:h-[400px] lg:h-[499px] lg:w-[845px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center text-sm text-gray-600">
                Demo Preview Image
                <br />
                <span className="text-xs">(Replace with actual image)</span>
              </p>
            </div>
            {/* TODO: Replace with actual demo image */}
          </div>
        </div>
      </div>
    </section>
  );
}
