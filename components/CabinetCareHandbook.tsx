'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TableOfContents from '@/components/TableOfContents';
import QuickRules from '@/components/QuickRules';
import FinishSelector from '@/components/FinishSelector';
import ComparisonCards from '@/components/ComparisonCards';
import HardwareSection from '@/components/HardwareSection';
import EditorialMoodboard from '@/components/EditorialMoodboard';
import DownloadBanner from '@/components/DownloadBanner';
import PrintableChecklistModal from '@/components/PrintableChecklistModal';
import ContactModal from '@/components/ContactModal';

interface CabinetCareHandbookProps {
  onBackToGuides: () => void;
  onOpenChecklistModal?: () => void;
}

export default function CabinetCareHandbook({
  onBackToGuides,
}: CabinetCareHandbookProps) {
  const [activeSection, setActiveSection] = useState('daily-rules');
  const [activeFinish, setActiveFinish] = useState('veneer');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Scroll spy to highlight active TOC item
  useEffect(() => {
    const sectionIds = ['daily-rules', 'material-care', 'dos-donts', 'hardware'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1A17] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      {/* Top Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-12">
        {/* Top Header Section */}
        <section className="mb-12 lg:mb-16 border-b border-[#E7E5E0] pb-10">
          {/* Subtle Back to Guides link */}
          <div className="mb-6">
            <button
              type="button"
              onClick={onBackToGuides}
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#73706B] hover:text-[#1C1A17] transition-colors cursor-pointer"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              <span>Back to Guides</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              {/* Care Guide Tag / Metadata */}
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.16em] text-[#9B7A4F]">
                <span>4 MIN READ</span>
                <span className="text-[#C4C0B6]">·</span>
                <span>CARE GUIDE</span>
                <span className="text-[#C4C0B6]">·</span>
                <span>ARCHITECTURAL MILLWORK</span>
              </div>

              {/* Large Serif Title */}
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1A17] tracking-tight leading-[1.08]">
                Cabinet Care Handbook
              </h1>

              {/* Elegant Subtitle */}
              <p className="text-sm sm:text-base text-[#73706B] leading-relaxed max-w-2xl font-normal">
                An architectural guide to preserving custom bespoke cabinetry, natural wood grain depth, hand-applied lacquer, and precision German mechanical hardware.
              </p>
            </div>

            {/* Quick Action Link */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={() => setIsChecklistOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1C1A17] border-b border-[#1C1A17] pb-1 hover:text-[#9B7A4F] hover:border-[#9B7A4F] transition-all cursor-pointer"
              >
                <span>View Printable Checklist</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Strictly Divided 3-Column Asymmetric Layout (18% : 52% : 30%) */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start w-full">
          {/* Left Column (18% width): Sticky minimalist table of contents */}
          <div className="w-full lg:w-[18%] lg:shrink-0 order-2 lg:order-1">
            <TableOfContents
              activeSection={activeSection}
              onSelectSection={handleSelectSection}
            />
          </div>

          {/* Middle Column (52% width): Main content with 3 stacked UI modules + Hardware */}
          <div className="w-full lg:w-[52%] lg:shrink-0 space-y-14 order-1 lg:order-2">
            {/* Module 1: Three Horizontal Quick-Rule Cards */}
            <QuickRules />

            {/* Module 2: Rounded Pill-Shaped Tabs for Finish Selection */}
            <FinishSelector
              activeFinish={activeFinish}
              onSelectFinish={setActiveFinish}
            />

            {/* Module 3: Side-by-side Do's and Don'ts Comparison Cards */}
            <ComparisonCards activeFinish={activeFinish} />

            {/* Module 4: Hardware and Blumotion Mechanics */}
            <HardwareSection />
          </div>

          {/* Right Column (30% width): Vertical editorial moodboard collage */}
          <div className="w-full lg:w-[30%] lg:shrink-0 order-3">
            <EditorialMoodboard />
          </div>
        </div>
      </main>

      {/* Full-Width Dark Charcoal Horizontal Banner */}
      <DownloadBanner onOpenChecklist={() => setIsChecklistOpen(true)} />

      {/* Printable Care Checklist Modal */}
      <PrintableChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      {/* Contact & Concierge Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
