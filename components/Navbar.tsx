'use client';

import Link from 'next/link';

interface NavbarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
  onOpenContact?: () => void;
  onNavigateToContact?: () => void;
  onOpenChecklist?: () => void;
}

export default function Navbar({
  currentView,
  onNavigate,
  onOpenContact,
  onNavigateToContact,
  onOpenChecklist,
}: NavbarProps) {
  const handleNav = (viewKey: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(viewKey);
    }
  };

  const handleContact = (e: React.MouseEvent) => {
    if (onNavigateToContact) {
      e.preventDefault();
      onNavigateToContact();
    } else if (onNavigate) {
      e.preventDefault();
      onNavigate('contact');
    } else if (onOpenContact) {
      e.preventDefault();
      onOpenContact();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E7E5E0] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-6 shrink-0">
          <Link
            href="/#cabinet-care"
            onClick={(e) => handleNav('cabinet-care', e)}
            className="font-serif-luxury text-2xl tracking-[0.18em] font-medium text-[#1C1A17] uppercase hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            VANSTRO
          </Link>
          <span className="hidden lg:inline-block h-4 w-[1px] bg-[#D5D1C7]" />
          <span className="hidden lg:inline-block text-[11px] font-mono tracking-widest uppercase text-[#8C8880]">
            Joinery &amp; Care
          </span>
        </div>

        {/* Zone 2: Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.14em] uppercase text-[#73706B] font-medium font-sans">
          <button
            type="button"
            onClick={(e) => handleNav('cabinet-care', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'cabinet-care'
                ? 'text-[#1C1A17] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9B7A4F]'
                : 'hover:text-[#1C1A17]'
            }`}
          >
            Care Handbook
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('how-to-measure-for-cabinets', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'how-to-measure-for-cabinets'
                ? 'text-[#1C1A17] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9B7A4F]'
                : 'hover:text-[#1C1A17]'
            }`}
          >
            Measuring Guide
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('vanity-finder', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'vanity-finder'
                ? 'text-[#1C1A17] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9B7A4F]'
                : 'hover:text-[#1C1A17]'
            }`}
          >
            Vanity Finder
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('guides', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'guides'
                ? 'text-[#1C1A17] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9B7A4F]'
                : 'hover:text-[#1C1A17]'
            }`}
          >
            All Guides
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('contact', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'contact'
                ? 'text-[#1C1A17] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9B7A4F]'
                : 'hover:text-[#1C1A17]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Direct Action */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenChecklist && (
            <button
              type="button"
              onClick={onOpenChecklist}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider text-[#73706B] hover:text-[#1C1A17] border border-transparent hover:border-[#E7E5E0] transition-colors cursor-pointer"
            >
              <span>Worksheet PDF</span>
              <span>↓</span>
            </button>
          )}

          <Link
            href="/contact"
            onClick={handleContact}
            className="px-5 py-2 text-xs uppercase tracking-[0.14em] font-medium text-[#1C1A17] border border-[#1C1A17] hover:bg-[#1C1A17] hover:text-[#F9F8F6] transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            Contact VanStro
          </Link>
        </div>
      </div>
    </header>
  );
}
