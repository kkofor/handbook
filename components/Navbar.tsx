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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EAE6DF] shadow-[0_2px_12px_-4px_rgba(28,26,23,0.04)] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-6 shrink-0">
          <Link
            href="/#cabinet-care"
            onClick={(e) => handleNav('cabinet-care', e)}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#9B7A4F] to-[#D4AF37] shadow-[0_0_8px_rgba(201,151,87,0.5)] transition-transform group-hover:scale-125" />
            <span className="font-serif-luxury text-2xl tracking-[0.2em] font-medium text-[#181715] uppercase transition-opacity whitespace-nowrap">
              VANSTRO
            </span>
          </Link>
          <span className="hidden lg:inline-block h-4 w-[1px] bg-[#D5D1C7]" />
          <span className="hidden lg:inline-block text-[11px] font-mono tracking-widest uppercase text-[#9B7A4F] font-semibold">
            Joinery &amp; Care
          </span>
        </div>

        {/* Zone 2: Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.14em] uppercase text-[#6B665F] font-medium font-sans">
          <button
            type="button"
            onClick={(e) => handleNav('cabinet-care', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'cabinet-care'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715] hover:text-[#9B7A4F]'
            }`}
          >
            Care Handbook
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('how-to-measure-for-cabinets', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'how-to-measure-for-cabinets'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715]'
            }`}
          >
            Measuring Guide
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('vanity-finder', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'vanity-finder'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715]'
            }`}
          >
            Vanity Finder
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('dealer-program', e)}
            className={`py-1 relative transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentView === 'dealer-program'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'text-[#9B7A4F] hover:text-[#181715] font-semibold'
            }`}
          >
            <span>Dealer Program</span>
            <span className="text-[9px] font-mono tracking-tighter uppercase px-1.5 py-0.2 bg-[#FAF5EE] border border-[#DFD6C5] text-[#9B7A4F] font-bold">
              B2B
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('dealers-map', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'dealers-map'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715]'
            }`}
          >
            Dealers Map
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('warranty', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'warranty'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715]'
            }`}
          >
            Warranty
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('about', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'about'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715]'
            }`}
          >
            About
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('careers', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'careers'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715]'
            }`}
          >
            Careers
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('guides', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'guides'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715]'
            }`}
          >
            All Guides
          </button>

          <button
            type="button"
            onClick={(e) => handleNav('contact', e)}
            className={`py-1 relative transition-colors cursor-pointer ${
              currentView === 'contact'
                ? 'text-[#181715] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#9B7A4F]'
                : 'hover:text-[#181715]'
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider text-[#6B665F] hover:text-[#181715] border border-transparent hover:border-[#D5D0C5] transition-colors cursor-pointer"
            >
              <span>Worksheet PDF</span>
              <span className="text-[#9B7A4F]">↓</span>
            </button>
          )}

          <Link
            href="/contact"
            onClick={handleContact}
            className="px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#F9F8F6] bg-[#181715] hover:bg-[#9B7A4F] border border-[#2E2B26] hover:border-[#9B7A4F] shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            Contact VanStro
          </Link>
        </div>
      </div>
    </header>
  );
}
