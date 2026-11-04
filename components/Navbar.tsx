'use client';

import Link from 'next/link';

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F9F8F6]/95 backdrop-blur-sm border-b border-[#E7E5E0] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          href="/"
          className="font-serif-luxury text-2xl tracking-[0.18em] font-medium text-[#1C1A17] uppercase hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
        >
          VANSTRO
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.14em] uppercase text-[#73706B] font-medium">
          <a
            href="#kitchens"
            className="hover:text-[#1C1A17] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#1C1A17] after:scale-x-0 hover:after:scale-x-100 after:transition-transform whitespace-nowrap shrink-0"
          >
            Kitchens
          </a>
          <a
            href="#vanities"
            className="hover:text-[#1C1A17] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#1C1A17] after:scale-x-0 hover:after:scale-x-100 after:transition-transform whitespace-nowrap shrink-0"
          >
            Vanities
          </a>
          <a
            href="#resources"
            className="text-[#1C1A17] font-semibold py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#1C1A17] whitespace-nowrap shrink-0"
          >
            Resources
          </a>
          <a
            href="#dealer"
            className="hover:text-[#1C1A17] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#1C1A17] after:scale-x-0 hover:after:scale-x-100 after:transition-transform whitespace-nowrap shrink-0"
          >
            Dealer
          </a>
        </nav>

        {/* Zone 3: Outlined Contact Action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenContact}
            className="px-5 py-2 text-xs uppercase tracking-[0.15em] font-medium text-[#1C1A17] border border-[#1C1A17] rounded-none hover:bg-[#1C1A17] hover:text-[#F9F8F6] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.98]"
          >
            [ Contact ]
          </button>
        </div>
      </div>
    </header>
  );
}
