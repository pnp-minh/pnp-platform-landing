import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-60px)] items-center justify-center px-5 py-20 md:px-10 lg:px-20">
      <div className="flex w-full max-w-[1040px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Hero Text */}
        <div className="flex w-full flex-col items-center gap-6 text-center">
          <h1 className="text-[40px] leading-[1.1] tracking-[-2px] text-black md:text-[56px] md:tracking-[-2.8px] lg:text-[72px] lg:tracking-[-3.6px]">
            Handle 3x More Clients Without Hiring
          </h1>
          <p className="max-w-[800px] text-base leading-[1.5] tracking-[-0.32px] text-[#646464] md:text-lg md:tracking-[-0.36px]">
            Your team spends hours on brief gathering. What if it took 2 minutes instead? See how
            JAY turns conversations into professional briefs—instantly.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex w-full max-w-[600px] flex-col items-center gap-6">
          {/* Primary CTA Button */}
          <Link
            href="/demo"
            className="flex h-14 w-full items-center justify-center rounded-xl bg-black px-8 text-base font-semibold leading-normal tracking-[-0.32px] text-white transition-all hover:bg-[#2a2a2a] hover:shadow-lg md:h-16 md:text-lg"
          >
            See JAY in Action
            <span className="ml-2 text-sm font-normal text-[#a0a0a0]">(90 seconds)</span>
          </Link>

          {/* Benefits Checklist */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm leading-normal tracking-[-0.28px] text-[#646464]">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 4L6 11.3333L2.66667 8"
                  stroke="#646464"
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
              >
                <path
                  d="M13.3333 4L6 11.3333L2.66667 8"
                  stroke="#646464"
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
              >
                <path
                  d="M13.3333 4L6 11.3333L2.66667 8"
                  stroke="#646464"
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
    </section>
  )
}
