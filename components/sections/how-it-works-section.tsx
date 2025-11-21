import { SectionTag } from "@/components/ui/section-tag";
import Image from "next/image";

const features = [
  {
    id: 1,
    number: "01",
    title: "Eats Your Entire Brand for Breakfast",
    description:
      "Reads everything you provide — text, websites, files, and past conversations — and turns it into Brand Intelligence you can actually use.",
  },
  {
    id: 2,
    number: "02",
    title: "Conducts the Perfect Brief Interview",
    description:
      "The AI Brief Consultant handles every brief—creative, content, campaign—and generates a structured, on-brand draft in seconds.",
  },
  {
    id: 3,
    number: "03",
    title: "Drops the Brief Into Your Workflow",
    description:
      "Workflow integration lets you export to PDF or push into Notion, email, and more. Your team gets ready-to-use briefs without manual work.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="flex items-center justify-center px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:pb-[60px] lg:pt-[120px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-2.5">
          {/* Section Tag */}
          <SectionTag>How Primer Works</SectionTag>

          {/* Title */}
          <h2 className="text-center text-[32px] font-semibold leading-[1.2] tracking-[-1.6px] text-gray-12 md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]">
            Ingest. Interview. Integrate.
          </h2>
        </div>

        {/* Content */}
        <div className="flex w-full flex-col gap-6">
          {/* UI Preview Card */}
          <div className="flex relative w-full flex-col rounded-3xl bg-primary-3 md:min-h-[500px] lg:h-[500px] lg:flex-row lg:items-center lg:justify-center lg:gap-[182px] lg:overflow-hidden">
            <Image
              src="/images/how-it-work.png"
              alt="How it work"
              fill
              sizes="(max-width: 1024px) 100vw, 628px"
              className="object-contain"
              priority
            />
          </div>

          {/* Feature Cards */}
          <div className="flex w-full flex-col gap-5 md:gap-6 lg:flex-row lg:gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex w-full flex-col rounded-3xl bg-gray-2 p-6 lg:w-[411px]"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2">
                    <h3 className="text-xl font-medium leading-tight tracking-[-0.8px] text-text-secondary md:text-[22px] md:tracking-[-0.88px]">
                      {feature.number}
                    </h3>
                    <h3
                      className="text-xl font-medium leading-tight tracking-[-0.8px] text-text-primary md:text-[22px] md:tracking-[-0.88px]"
                      style={{ textWrap: "balance" } as React.CSSProperties}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-[1.4] text-gray-11 md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
