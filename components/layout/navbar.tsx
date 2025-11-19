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
        <a href="#platform" className="transition-colors hover:text-gray-11">
          Platform
        </a>
        <a href="#feature" className="transition-colors hover:text-gray-11">
          How It Works
        </a>
        <a href="#benefits" className="transition-colors hover:text-gray-11">
          Benefits
        </a>
        <a href="#solution" className="transition-colors hover:text-gray-11">
          Solution
        </a>
        <a href="#faqs" className="transition-colors hover:text-gray-11">
          FAQs
        </a>
      </div>

      {/* Empty column for balance on desktop */}
      <div className="hidden lg:block" />
    </nav>
  )
}
