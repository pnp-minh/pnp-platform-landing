import { SolutionDemo } from "@/components/demo/solution-demo";
import { SectionTag } from "@/components/ui/section-tag";

const benefits = [
  {
    id: 1,
    title: "Saves time on every brief",
    description:
      "Primer turns a 3-hour briefing process into 15 minutes. Your team focuses on strategy, not admin works.",
  },
  {
    id: 2,
    title: "New hires productive from day one",
    description:
      "Primer gives new team members instant access to your Brand Intelligence and past project insights. No training lag.",
  },
  {
    id: 3,
    title: "More clients without hiring",
    description:
      "Your current team can take on 3x more work when Primer handles brief gathering. Grow revenue, not headcount.",
  },
];

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="flex items-center justify-center px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:py-[60px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2.5">
            {/* Solution Tag */}
            <SectionTag>Benefits</SectionTag>

            {/* Title */}
            <h2
              className="max-w-[720px] text-center text-[32px] leading-[1.2] tracking-[-1.6px] text-text-primary md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              What Primer Does for Your Agency
            </h2>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex w-full flex-col items-center gap-8 xl:flex-row xl:items-stretch xl:gap-6">
          {/* Benefits Cards */}
          <div className="flex w-full flex-col gap-5 xl:w-[411px] xl:shrink-0">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.id}
                  className="flex flex-col gap-5 rounded-3xl bg-[#f9f9f9] p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-2 w-2 shrink-0 items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <h3
                      className="text-xl font-medium leading-tight tracking-[-0.8px] text-black md:text-[22px] md:tracking-[-0.88px]"
                      style={{ textWrap: "balance" } as React.CSSProperties}
                    >
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-[1.4] text-gray-11 md:text-base">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Demo Preview */}
          <div className="h-[400px] w-full md:h-[500px] xl:h-full xl:w-[845px]">
            <SolutionDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
