import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="flex items-center justify-center bg-primary-3 px-5 py-20 md:px-10 md:py-32 lg:px-20 lg:py-[255px]"
    >
      <div className="flex w-full max-w-[800px] flex-col items-center gap-6">
        {/* Title */}
        <h2 className="w-full text-center text-[32px] font-semibold leading-none tracking-[-1.6px] text-gray-12 md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]">
          Experience Primer with your brand
        </h2>

        {/* Description */}
        <p className="max-w-[507px] text-center text-base leading-[1.4] text-gray-11">
          We&apos;ll analyze your website and show you how a complete brief
          happens through conversation. Takes 3-4 minutes.
        </p>

        {/* CTA Button */}
        <div className="mt-2">
          <Button variant="default">Try it now</Button>
        </div>
      </div>
    </section>
  );
}
