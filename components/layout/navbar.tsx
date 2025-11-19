"use client";

import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "#platform", label: "Platform" },
  { href: "#feature", label: "How It Works" },
  { href: "#benefits", label: "Benefits" },
  { href: "#solution", label: "Solution" },
  { href: "#faqs", label: "FAQs" },
];

export function Navbar() {
  return (
    <nav className="relative flex items-center justify-between bg-[#FFFAF6] px-5 py-4 md:px-10 lg:grid lg:grid-cols-3 lg:px-20">
      {/* Logo - Left */}
      <div className="flex items-center justify-start gap-2">
        <p className="text-2xl font-semibold leading-normal tracking-[-0.72px] text-black">
          Primer
        </p>
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden items-center gap-6 text-base font-medium leading-normal tracking-[-0.48px] text-black lg:flex lg:justify-center">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-gray-11"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Menu Dropdown */}
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-3"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-black" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[calc(100vw-40px)] border border-gray-3 bg-white p-0 shadow-lg"
            sideOffset={8}
          >
            {navLinks.map((link, index) => (
              <DropdownMenuItem
                key={link.href}
                className="p-0 focus:bg-gray-2 focus:text-gray-12"
                onSelect={(e) => {
                  e.preventDefault();
                  window.location.href = link.href;
                }}
              >
                <a
                  href={link.href}
                  className={`block w-full cursor-pointer px-6 py-4 text-lg font-medium text-black transition-colors hover:text-gray-12 ${
                    index !== navLinks.length - 1 ? "border-b border-gray-3" : ""
                  }`}
                >
                  {link.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Empty column for balance on desktop */}
      <div className="hidden lg:block" />
    </nav>
  );
}
