'use client';

import { useState, useEffect } from 'react';
import GuidesHub from '@/components/GuidesHub';
import HowToMeasureGuide from '@/components/HowToMeasureGuide';
import UniversalGuideDetail from '@/components/UniversalGuideDetail';
import VanityFinderApp from '@/components/VanityFinderApp';
import PrintableChecklistModal from '@/components/PrintableChecklistModal';
import ContactUsPage from '@/components/ContactUsPage';
import WarrantyPage from '@/components/WarrantyPage';
import AboutUsPage from '@/components/AboutUsPage';
import DealerProgramPage from '@/components/DealerProgramPage';
import DealersMapPage from '@/components/DealersMapPage';
import CareersPage from '@/components/CareersPage';
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
      } else if (hash === 'dealer-program' || hash.includes('dealer-program')) {
        setCurrentView('dealer-program');
      } else if (hash.includes('dealers') || hash.includes('map')) {
        setCurrentView('dealers-map');
      } else if (hash === 'careers' || hash.includes('career') || hash.includes('jobs')) {
        setCurrentView('careers');
      } else if (hash === 'warranty' || hash.includes('warrant')) {
        setCurrentView('warranty');
      } else if (hash === 'about' || hash.includes('about')) {
        setCurrentView('about');
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
    <div className="relative min-h-screen bg-[#FFFFFF]">
      {/* 1. Dedicated Interactive Cabinet Care Handbook */}
      {currentView === 'cabinet-care' && (
        <UniversalGuideDetail
          guide={VANSTRO_GUIDES['cabinet-care']}
          onBackToGuides={() => navigateToView('guides')}
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

      {/* 7. Dedicated Warranty Page (vanstro.ca/warranty Rebuild) */}
      {currentView === 'warranty' && (
        <WarrantyPage
          onBackToGuides={() => navigateToView('guides')}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
          onNavigate={(view) => navigateToView(view)}
        />
      )}

      {/* 8. Dedicated About Us Page (vanstro.ca/about Rebuild) */}
      {currentView === 'about' && (
        <AboutUsPage
          onBackToGuides={() => navigateToView('guides')}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
          onNavigate={(view) => navigateToView(view)}
        />
      )}

      {/* 9. Dedicated Dealer Program (vanstro.ca/dealer-program Rebuild - High-Conversion B2B Commercial) */}
      {currentView === 'dealer-program' && (
        <DealerProgramPage
          onBackToGuides={() => navigateToView('guides')}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
          onNavigate={(view) => navigateToView(view)}
        />
      )}

      {/* 10. Dedicated Dealers Map (vanstro.ca/dealers/map Rebuild - Interactive Canada Locator) */}
      {currentView === 'dealers-map' && (
        <DealersMapPage
          onBackToGuides={() => navigateToView('guides')}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
          onNavigate={(view) => navigateToView(view)}
        />
      )}

      {/* 11. Dedicated Careers Page (vanstro.ca/careers Rebuild) */}
      {currentView === 'careers' && (
        <CareersPage
          onBackToGuides={() => navigateToView('guides')}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
          onNavigate={(view) => navigateToView(view)}
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
