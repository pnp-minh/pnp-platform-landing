import {
  DemoHeader,
  DemoMessages,
  DemoProvider,
} from "@/components/demo/animated-chat-demo";

const features = [
  {
    id: 1,
    number: "01",
    title: "Eats Your Entire Brand for Breakfast",
    description:
      "Reads everything you provide — text, websites, files, and past conversations — and turns it into instant brand intelligence.",
  },
  {
    id: 2,
    number: "02",
    title: "Help Your Team Write a Perfect Brief",
    description:
      "Whether it's a creative brief, content brief, or campaign brief, this generates a complete, structured, on-brand draft in seconds.",
  },
  {
    id: 3,
    number: "03",
    title: "Drops the Brief Into Workflow",
    description:
      "Export your brief to PDF or push it directly into Notion, email, and more. Your team gets a ready-to-use brief without any manual work.",
  },
];

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="flex items-center justify-center px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:pb-[60px] lg:pt-[120px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-2.5">
          {/* Benefits Badge */}
          <div className="rounded-lg bg-[#ededed] px-4 py-3">
            <p className="text-sm font-medium leading-[1.6] tracking-[-0.28px] text-[#adadad]">
              Benefits
            </p>
          </div>

          {/* Title */}
          <h2 className="text-center text-[32px] leading-none tracking-[-1.6px] text-text-primary md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]">
            Three Actions. Three Seconds. Zero Friction.
          </h2>
        </div>

        {/* Content */}
        <div className="flex w-full flex-col gap-6">
          {/* UI Preview Card */}
          <DemoProvider>
            <div className="flex w-full flex-col rounded-3xl bg-[#f9f9f9] md:min-h-[500px] lg:h-[500px] lg:flex-row lg:items-center lg:justify-center lg:gap-[182px] lg:overflow-hidden">
              {/* Left Side - Demo Header and Container */}
              <div className="flex h-full w-full flex-col gap-6 p-6 md:gap-8 md:p-10 lg:w-[521px] lg:shrink-0 lg:justify-center lg:p-0">
                <DemoHeader />
              </div>

              {/* Right Side - Animated Chat Messages */}
              <div className="flex w-full flex-col items-end justify-center gap-6 p-6 md:gap-8 md:p-8 lg:w-[457px] lg:shrink-0 lg:p-0">
                <DemoMessages />
              </div>
            </div>
          </DemoProvider>

          {/* Feature Cards */}
          <div className="flex w-full flex-col gap-5 md:gap-6 lg:flex-row lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="flex w-full flex-col rounded-3xl bg-[#f9f9f9] p-6 lg:w-[411px]"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex gap-2">
                    <h3
                      className={`font-medium leading-[1.1] text-text-secondary ${
                        index === 0
                          ? "text-xl tracking-[-0.8px] md:text-2xl md:tracking-[-0.96px]"
                          : "text-xl tracking-[-0.8px] md:text-[22px] md:tracking-[-0.88px]"
                      }`}
                    >
                      {feature.number}
                    </h3>
                    <h3
                      className={`font-medium leading-[1.1] text-text-primary ${
                        index === 0
                          ? "text-xl tracking-[-0.8px] md:text-2xl md:tracking-[-0.96px]"
                          : "text-xl tracking-[-0.8px] md:text-[22px] md:tracking-[-0.88px]"
                      }`}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-[1.4] text-[#646464] md:text-base">
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
