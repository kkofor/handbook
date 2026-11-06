'use client';

import { useState, useEffect } from 'react';
import GuidesHub from '@/components/GuidesHub';
import CabinetCareHandbook from '@/components/CabinetCareHandbook';
import HowToMeasureGuide from '@/components/HowToMeasureGuide';
import UniversalGuideDetail from '@/components/UniversalGuideDetail';
import VanityFinderApp from '@/components/VanityFinderApp';
import PrintableChecklistModal from '@/components/PrintableChecklistModal';
import ContactUsPage from '@/components/ContactUsPage';
import { VANSTRO_GUIDES } from '@/data/all-vanstro-guides';

export default function Page() {
  // Default to user's core request: 橱柜保养手册详情页 (Cabinet Care Handbook)
  const [currentView, setCurrentView] = useState<string>('cabinet-care');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace(/^#/, '');
      if (hash.includes('vanity-finder') || hash.includes('size-finder')) {
        setCurrentView('vanity-finder');
      } else if (hash === 'contact' || hash.includes('contact-us')) {
        setCurrentView('contact');
      } else if (hash === 'guides' || hash === 'hub') {
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
      {/* 1. Dedicated Interactive Cabinet Care Handbook (Primary Showcase) */}
      {currentView === 'cabinet-care' && (
        <CabinetCareHandbook
          onBackToGuides={() => navigateToView('guides')}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
          onNavigate={(view) => navigateToView(view)}
        />
      )}

      {/* 2. Guides Hub */}
      {currentView === 'guides' && (
        <GuidesHub
          onNavigateToCareGuide={() => navigateToView('cabinet-care')}
          onNavigateToMeasureGuide={() => navigateToView('how-to-measure-for-cabinets')}
          onSelectGuideSlug={(slug) => navigateToView(slug)}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
          onNavigateToContact={() => navigateToView('contact')}
          onNavigate={(view) => navigateToView(view)}
        />
      )}

      {/* 3. Dedicated Interactive Measuring Guide with Wall/Filler Calculator */}
      {currentView === 'how-to-measure-for-cabinets' && (
        <HowToMeasureGuide
          onBackToGuides={() => navigateToView('guides')}
          onNavigate={(view) => navigateToView(view)}
        />
      )}

      {/* 4. Dedicated Contact Us Page (vanstro.ca/contact Rebuild) */}
      {currentView === 'contact' && (
        <ContactUsPage
          onBackToGuides={() => navigateToView('guides')}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
          onNavigate={(view) => navigateToView(view)}
        />
      )}

      {/* 5. Rebuilt Guide Subpages using Universal Architectural Layout */}
      {isGuideSlug &&
        currentView !== 'cabinet-care' &&
        currentView !== 'how-to-measure-for-cabinets' &&
        activeGuideData && (
          <UniversalGuideDetail
            guide={activeGuideData}
            onBackToGuides={() => navigateToView('guides')}
            onNavigate={(view) => navigateToView(view)}
          />
        )}

      {/* 6. Vanity Size Finder Tool */}
      {currentView === 'vanity-finder' && (
        <VanityFinderApp
          onNavigate={(view) => navigateToView(view)}
          onBackToGuides={() => navigateToView('guides')}
        />
      )}

      {/* Global Printable Checklist Modal */}
      <PrintableChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
}
