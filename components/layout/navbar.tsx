export function Navbar() {
  return (
    <nav className="relative flex items-center px-5 py-3 md:px-10 lg:grid lg:grid-cols-3 lg:px-20">
      {/* Logo - Left */}
      <div className="flex items-center justify-start gap-2 p-2">
        <p className="text-2xl font-semibold leading-normal tracking-[-0.72px] text-black">
          LogoPlatform©
        </p>
      </div>

      {/* Navigation Links - Center on Desktop */}
      <div className="ml-auto flex items-center gap-6 text-base font-medium leading-normal tracking-[-0.48px] text-black lg:col-start-2 lg:ml-0 lg:justify-center">
        <a href="#pain-points" className="transition-colors hover:text-[#646464]">
          Pain Points
        </a>
        <a href="#benefits" className="transition-colors hover:text-[#646464]">
          Benefits
        </a>
        <a href="#solution" className="transition-colors hover:text-[#646464]">
          Solution
        </a>
        <a href="#faqs" className="transition-colors hover:text-[#646464]">
          FAQs
        </a>
      </div>

      {/* Empty column for balance on desktop */}
      <div className="hidden lg:block" />
    </nav>
  )
}
