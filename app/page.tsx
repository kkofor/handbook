'use client';

import { useState, useEffect } from 'react';
import GuidesHub from '@/components/GuidesHub';
import CabinetCareHandbook from '@/components/CabinetCareHandbook';
import HowToMeasureGuide from '@/components/HowToMeasureGuide';
import UniversalGuideDetail from '@/components/UniversalGuideDetail';
import VanityFinderApp from '@/components/VanityFinderApp';
import PrintableChecklistModal from '@/components/PrintableChecklistModal';
import { VANSTRO_GUIDES } from '@/data/all-vanstro-guides';

const GUIDE_SLUGS = [
  { slug: 'cabinet-care', label: '1. Care Handbook' },
  { slug: 'how-to-measure-for-cabinets', label: '2. Measuring for Cabinets' },
  { slug: 'cabinet-adjustment', label: '3. Door & Drawer Adjustment' },
  { slug: 'what-finishes-are-available', label: '4. White & Light Grey Finishes' },
  { slug: 'what-are-rta-cabinets', label: '5. RTA Cabinets Explained' },
  { slug: 'plywood-vs-particle-board-cabinets', label: '6. Plywood vs Particle Board' },
  { slug: 'bathroom-vanity-sizes', label: '7. Bathroom Vanity Sizes' },
  { slug: 'pickup-and-delivery-options', label: '8. Pickup & Delivery Options' },
];

export default function Page() {
  const [currentView, setCurrentView] = useState<string>('guides');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace(/^#/, '');
      if (hash.includes('vanity-finder') || hash.includes('size-finder')) {
        setCurrentView('vanity-finder');
      } else if (hash === 'guides' || hash === '') {
        setCurrentView('guides');
      } else if (hash.includes('measure')) {
        setCurrentView('how-to-measure-for-cabinets');
      } else if (hash.includes('care') || hash.includes('handbook')) {
        setCurrentView('cabinet-care');
      } else if (VANSTRO_GUIDES[hash]) {
        setCurrentView(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToView = (viewKey: string) => {
    setCurrentView(viewKey);
    window.location.hash = viewKey;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isGuideSlug = !!VANSTRO_GUIDES[currentView];
  const activeGuideData = VANSTRO_GUIDES[currentView];

  return (
    <div className="relative min-h-screen bg-[#F9F8F6]">
      {/* Editorial View Switcher Bar for Reviewers & Users */}
      <div className="sticky top-0 z-50 bg-[#181715] text-white text-[11px] font-mono py-2 px-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#2E2B26] shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="text-[#C5A069] tracking-widest uppercase font-semibold">
            VANSTRO FIGMA ARCHIVE
          </span>
          <span className="text-[#595349]">/</span>
          <span className="text-[#A09D96] hidden sm:inline">
            Active Screen:{' '}
            <strong className="text-white font-normal uppercase">
              {currentView === 'guides' && 'Guides & Insights Hub (8 Guides)'}
              {currentView === 'vanity-finder' && 'Vanity Size Finder Tool'}
              {isGuideSlug && `Guide: ${activeGuideData?.title}`}
            </strong>
          </span>
        </div>

        {/* Navigation Selector Row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => navigateToView('guides')}
            className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              currentView === 'guides'
                ? 'bg-[#C5A069] text-black font-semibold'
                : 'text-[#A09D96] hover:text-white'
            }`}
          >
            Guides Hub
          </button>

          <span className="text-[#4A463F]">·</span>

          {/* Quick Select for All 8 Guides */}
          <div className="relative inline-flex items-center">
            <select
              value={isGuideSlug ? currentView : ''}
              onChange={(e) => {
                if (e.target.value) navigateToView(e.target.value);
              }}
              className="bg-[#24221E] text-white border border-[#3E3A33] px-2.5 py-1 rounded-xs text-[11px] font-mono cursor-pointer focus:outline-[#C5A069]"
              aria-label="Select guide subpage"
            >
              <option value="" disabled>
                Select Guide Subpage (8 Available)...
              </option>
              {GUIDE_SLUGS.map((g) => (
                <option key={g.slug} value={g.slug}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <span className="text-[#4A463F]">·</span>

          <button
            type="button"
            onClick={() => navigateToView('vanity-finder')}
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

      {/* 1. Guides Hub */}
      {currentView === 'guides' && (
        <GuidesHub
          onNavigateToCareGuide={() => navigateToView('cabinet-care')}
          onNavigateToMeasureGuide={() => navigateToView('how-to-measure-for-cabinets')}
          onSelectGuideSlug={(slug) => navigateToView(slug)}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
        />
      )}

      {/* 2. Dedicated Interactive Cabinet Care Handbook */}
      {currentView === 'cabinet-care' && (
        <CabinetCareHandbook
          onBackToGuides={() => navigateToView('guides')}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
        />
      )}

      {/* 3. Dedicated Interactive Measuring Guide with Wall/Filler Calculator */}
      {currentView === 'how-to-measure-for-cabinets' && (
        <HowToMeasureGuide
          onBackToGuides={() => navigateToView('guides')}
        />
      )}

      {/* 4. Other 6 Rebuilt Guide Subpages using Universal Architectural Layout */}
      {isGuideSlug &&
        currentView !== 'cabinet-care' &&
        currentView !== 'how-to-measure-for-cabinets' &&
        activeGuideData && (
          <UniversalGuideDetail
            guide={activeGuideData}
            onBackToGuides={() => navigateToView('guides')}
          />
        )}

      {/* 5. Vanity Size Finder Tool */}
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
