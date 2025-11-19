export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-3 md:px-10 lg:px-20">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 p-2">
        <p className="text-2xl font-semibold leading-normal tracking-[-0.72px] text-black">
          LogoPlatform©
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-base font-medium leading-normal tracking-[-0.48px] text-black">
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
    </nav>
  )
}
