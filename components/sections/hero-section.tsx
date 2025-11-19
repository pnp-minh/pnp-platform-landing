export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-60px)] items-center justify-center px-5 py-20 md:px-10 lg:px-20">
      <div className="flex w-full max-w-[1040px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Hero Text */}
        <div className="flex w-full flex-col items-center gap-6 text-center">
          <h1 className="text-[40px] leading-[1.1] tracking-[-2px] text-black md:text-[56px] md:tracking-[-2.8px] lg:text-[72px] lg:tracking-[-3.6px]">
            ABC — The Fastest Way to Create Agency-Ready Briefs
          </h1>
          <p className="max-w-[800px] text-base leading-[1.5] tracking-[-0.32px] text-[#646464] md:text-lg md:tracking-[-0.36px]">
            Create better briefs in minutes, not hours — giving your team clarity, your workflow
            speed, and your clients' results. Just plug in, brief out.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex w-full max-w-[800px] flex-col gap-4">
          <div className="flex w-full items-center gap-3 rounded-2xl bg-[#f5f5f5] px-6 py-4 md:px-8 md:py-5">
            <input
              type="text"
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-base leading-normal tracking-[-0.32px] text-black placeholder:text-[#a0a0a0] focus:outline-none"
            />
            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black transition-colors hover:bg-[#2a2a2a] md:h-12 md:w-12">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-6 md:w-6"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-full bg-[#f0f0f0] px-4 py-2 text-sm leading-normal tracking-[-0.28px] text-[#646464] transition-colors hover:bg-[#e5e5e5]">
              <div className="h-2 w-2 rounded-full bg-[#646464]" />
              <span>Deep Search</span>
            </button>
            <button className="flex items-center gap-2 rounded-full bg-[#f0f0f0] px-4 py-2 text-sm leading-normal tracking-[-0.28px] text-[#646464] transition-colors hover:bg-[#e5e5e5]">
              <div className="h-2 w-2 rounded-full bg-[#646464]" />
              <span>Think</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
