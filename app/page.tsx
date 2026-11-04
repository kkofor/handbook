'use client';

import { useState, useEffect } from 'react';
import GuidesHub from '@/components/GuidesHub';
import CabinetCareHandbook from '@/components/CabinetCareHandbook';
import VanityFinderApp from '@/components/VanityFinderApp';
import PrintableChecklistModal from '@/components/PrintableChecklistModal';

export default function Page() {
  const [currentView, setCurrentView] = useState<'guides' | 'handbook' | 'vanity-finder'>('guides');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  // Sync with browser URL hash if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('vanity-finder') || hash.includes('size-finder')) {
        setCurrentView('vanity-finder');
      } else if (hash.includes('cabinet-care') || hash.includes('handbook')) {
        setCurrentView('handbook');
      } else if (hash.includes('guides')) {
        setCurrentView('guides');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToHandbook = () => {
    setCurrentView('handbook');
    window.location.hash = 'cabinet-care';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToGuides = () => {
    setCurrentView('guides');
    window.location.hash = 'guides';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToVanityFinder = () => {
    setCurrentView('vanity-finder');
    window.location.hash = 'vanity-finder';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#F9F8F6]">
      {/* Editorial View Switcher Bar for Reviewers & Users */}
      <div className="sticky top-0 z-50 bg-[#181715] text-white text-[11px] font-mono py-1.5 px-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#2E2B26] shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-[#C5A069] tracking-widest uppercase font-semibold">
            VANSTRO FIGMA PROTOTYPE
          </span>
          <span className="text-[#595349]">/</span>
          <span className="text-[#A09D96]">
            Active Screen:{' '}
            <strong className="text-white font-normal uppercase">
              {currentView === 'guides' && '1. Guides & Insights Hub'}
              {currentView === 'handbook' && '2. Cabinet Care Handbook Detail'}
              {currentView === 'vanity-finder' && '3. Vanity Size Finder Tool'}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={navigateToGuides}
            className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              currentView === 'guides'
                ? 'bg-[#C5A069] text-black font-semibold'
                : 'text-[#A09D96] hover:text-white'
            }`}
          >
            Guides Hub
          </button>
          <span className="text-[#4A463F]">·</span>
          <button
            type="button"
            onClick={navigateToHandbook}
            className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              currentView === 'handbook'
                ? 'bg-[#C5A069] text-black font-semibold'
                : 'text-[#A09D96] hover:text-white'
            }`}
          >
            Care Handbook
          </button>
          <span className="text-[#4A463F]">·</span>
          <button
            type="button"
            onClick={navigateToVanityFinder}
            className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              currentView === 'vanity-finder'
                ? 'bg-[#C5A069] text-black font-semibold'
                : 'text-[#A09D96] hover:text-white'
            }`}
          >
            Vanity Size Finder
          </button>
        </div>
      </div>

      {/* Dynamic Screen View */}
      {currentView === 'guides' && (
        <GuidesHub
          onNavigateToCareGuide={navigateToHandbook}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
        />
      )}

      {currentView === 'handbook' && (
        <CabinetCareHandbook
          onBackToGuides={navigateToGuides}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
        />
      )}

      {currentView === 'vanity-finder' && (
        <VanityFinderApp />
      )}

      {/* Global Printable Checklist Modal */}
      <PrintableChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
}
