'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  onNavigate?: (view: string) => void;
}

export default function CabinetCareHandbook({
  onBackToGuides,
  onOpenChecklistModal,
  onNavigate,
}: CabinetCareHandbookProps) {
  const [activeSection, setActiveSection] = useState('daily-rules');
  const [activeFinish, setActiveFinish] = useState('pvc_door');
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
    <div className="guides-hb min-h-screen bg-[#FFFFFF] text-[#1C1A17] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      {/* Top Navbar with Clean Navigation */}
      <Navbar
        currentView="cabinet-care"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenChecklist={() => {
          if (onOpenChecklistModal) onOpenChecklistModal();
          else setIsChecklistOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-12">
        {/* Top Header Section with Clean White & Subtle Architectural Wash */}
        <section className="mb-12 lg:mb-16 -mx-6 sm:-mx-10 lg:-mx-14 px-6 sm:px-10 lg:px-14 pt-4 pb-10 border-b border-[#EAE6DF] bg-gradient-to-b from-[#FAF8F5] via-[#FFFFFF] to-[#FFFFFF]">
          {/* Subtle Back to Guides link */}
          <div className="mb-6">
            <button
              type="button"
              onClick={onBackToGuides}
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#7A756D] hover:text-[#181715] transition-colors cursor-pointer"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              <span>Back to Guides</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3.5 max-w-3xl">
              {/* Care Guide Tag / Metadata */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono uppercase tracking-[0.18em]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#181715] text-[#E8C78E] text-[10px] font-bold border border-[#C5A069]/30 shadow-2xs">
                  CARE PROTOCOL
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-[#9B7A4F] font-semibold">4 MIN READ</span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-[#7A756D]">KITCHEN CABINETS &amp; BATHROOM VANITIES</span>
              </div>

              {/* Large Serif Title with Dual-Tone Architectural Richness */}
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#181715] tracking-tight leading-[1.08]">
                Cabinet Care <span className="italic font-light text-[#9B7A4F] font-serif">Handbook</span>
              </h1>

              {/* Elegant Subtitle */}
              <p className="text-sm sm:text-base text-[#5A564F] leading-relaxed max-w-2xl font-normal">
                Professional engineering protocols for PVC soft-touch doors, moisture-resistant melamine cabinet boxes, and solid architectural trim. Designed to preserve pristine factory finishes for decades.
              </p>
            </div>

            {/* Quick Action Link */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={() => {
                  if (onOpenChecklistModal) onOpenChecklistModal();
                  else setIsChecklistOpen(true);
                }}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#181715] bg-white border border-[#D5D0C5] hover:border-[#181715] hover:bg-[#181715] hover:text-[#FAF8F5] px-4 py-2.5 rounded-lg shadow-xs transition-all duration-200 cursor-pointer"
              >
                <span>View Printable Checklist</span>
                <span className="text-[#9B7A4F]">→</span>
              </button>
            </div>
          </div>

          {/* Architectural Joinery Specification Bar */}
          <div className="mt-8 pt-6 border-t border-[#E5DFD3] grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-white/80 border border-[#E0D9CC] rounded-lg space-y-0.5 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">Climate Baseline</span>
              <span className="text-sm font-mono font-bold text-[#181715] block">35% – 55% RH</span>
              <span className="text-[10px] text-[#7A756D] block">Controlled Residential Range</span>
            </div>

            <div className="p-3 bg-white/80 border border-[#E0D9CC] rounded-lg space-y-0.5 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">Allowed Chemistry</span>
              <span className="text-sm font-mono font-bold text-[#181715] block">Neutral pH 7.0</span>
              <span className="text-[10px] text-[#7A756D] block">Mild Diluted Dish Soap Only</span>
            </div>

            <div className="p-3 bg-white/80 border border-[#E0D9CC] rounded-lg space-y-0.5 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B2627] font-semibold block">Prohibited Reagent</span>
              <span className="text-sm font-mono font-bold text-[#8B2627] block">Zero Solvent</span>
              <span className="text-[10px] text-[#7A756D] block">No Acetone, Bleach or Abrasives</span>
            </div>

            <div className="p-3 bg-white/80 border border-[#E0D9CC] rounded-lg space-y-0.5 shadow-2xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#244A29] font-semibold block">Warranty Status</span>
              <span className="text-sm font-mono font-bold text-[#244A29] block">12 Months</span>
              <span className="text-[10px] text-[#7A756D] block">Full Factory Joinery Guarantee</span>
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
