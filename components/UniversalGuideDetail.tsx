'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { VanStroGuideData } from '@/data/all-vanstro-guides';

interface UniversalGuideDetailProps {
  guide: VanStroGuideData;
  onBackToGuides: () => void;
}

export default function UniversalGuideDetail({
  guide,
  onBackToGuides,
}: UniversalGuideDetailProps) {
  const [activeSection, setActiveSection] = useState(guide.toc[0]?.id || '');
  const [activeTabId, setActiveTabId] = useState(guide.tabs?.[0]?.id || '');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [zoomPlate, setZoomPlate] = useState<{
    figure: string;
    title: string;
    caption: string;
    image: string;
  } | null>(null);

  // Scroll spy for TOC
  useEffect(() => {
    const sectionIds = guide.toc.map((t) => t.id);
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
  }, [guide.toc]);

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeTab =
    guide.tabs?.find((t) => t.id === activeTabId) || guide.tabs?.[0];

  return (
    <div className="guides-hb min-h-screen bg-[#F9F8F6] text-[#1C1A17] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      {/* Top Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-12">
        {/* Top Header Section */}
        <section className="mb-12 lg:mb-16 border-b border-[#E7E5E0] pb-10">
          {/* Back Link */}
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
              {/* Metadata Eyebrow */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono uppercase tracking-[0.16em] text-[#9B7A4F]">
                <span>{guide.category}</span>
                <span className="text-[#C4C0B6]">·</span>
                <span>{guide.readTime}</span>
                <span className="text-[#C4C0B6]">·</span>
                <span>{guide.standardRef}</span>
              </div>

              {/* Large Serif Title */}
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1A17] tracking-tight leading-[1.08]">
                {guide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#73706B] leading-relaxed max-w-2xl font-normal">
                {guide.subtitle}
              </p>
            </div>

            {/* Quick Trigger Button */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={() => setIsChecklistOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1C1A17] border-b border-[#1C1A17] pb-1 hover:text-[#9B7A4F] hover:border-[#9B7A4F] transition-all cursor-pointer"
              >
                <span>View Printable Worksheet</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Asymmetric 3-Column Layout (18% : 52% : 30%) */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start w-full">
          {/* Left Column (18%): Sticky Minimalist TOC */}
          <aside className="w-full lg:w-[18%] lg:shrink-0 order-2 lg:order-1">
            <div className="sticky top-28 space-y-8 pr-4">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73706B] block mb-4">
                  Contents
                </span>
                <div className="h-[1px] w-8 bg-[#1C1A17]/30 mb-6" />

                <nav aria-label="Table of contents" className="space-y-4">
                  {guide.toc.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectSection(item.id)}
                        className={`group flex items-baseline gap-3 text-left w-full transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'text-[#1C1A17] font-medium translate-x-1'
                            : 'text-[#73706B] hover:text-[#1C1A17]'
                        }`}
                      >
                        <span
                          className={`font-mono text-xs tabular-nums tracking-wider transition-colors ${
                            isActive
                              ? 'text-[#9B7A4F] font-semibold'
                              : 'text-[#A09D96]'
                          }`}
                        >
                          {item.num}
                        </span>
                        <span className="text-sm font-sans tracking-tight">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Minimalist Footnote */}
              <div className="pt-8 border-t border-[#E7E5E0] space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-[#9E9B94]">
                  Archival Document
                </p>
                <p className="text-xs text-[#73706B] leading-relaxed">
                  {guide.standardRef} — VanStro Technical Library
                </p>
              </div>
            </div>
          </aside>

          {/* Middle Column (52%): Primary Content Stack */}
          <div className="w-full lg:w-[52%] space-y-14 order-1 lg:order-2">
            {/* Section 01: Three Horizontal Quick-Rule Cards */}
            <section
              id={guide.toc[0]?.id || 'section-01'}
              className="scroll-mt-28 space-y-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    01
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    {guide.toc[0]?.title || 'Core Principles'}
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  The Short Version
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {guide.quickRules.map((card) => (
                  <div
                    key={card.id}
                    className="group bg-[#FFFFFF] border border-[#E7E5E0] p-5 rounded-sm hover:border-[#1C1A17]/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 flex items-center justify-center text-lg mb-4 bg-[#F9F8F6] rounded-xs border border-[#E7E5E0]">
                        {card.icon}
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F] block mb-1">
                        {card.label}
                      </span>
                      <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17] mb-2 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#73706B] leading-relaxed">
                        {card.body}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono">
                      {card.note}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 02: Interactive Tabbed Selector (if tabs exist) */}
            {guide.tabs && guide.tabs.length > 0 && (
              <section
                id={guide.toc[1]?.id || 'section-02'}
                className="scroll-mt-28 space-y-6"
              >
                <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                      02
                    </span>
                    <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                      {guide.toc[1]?.title || 'Component Drill-Down'}
                    </h2>
                  </div>
                  <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                    {guide.tabsLabel || 'Specification'}
                  </span>
                </div>

                {/* Pill Tabs */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 p-1 bg-[#EFECE6]/80 rounded-full w-fit max-w-full">
                    {guide.tabs.map((tab) => {
                      const isActive = activeTabId === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTabId(tab.id)}
                          className={`px-4 py-2 text-xs font-medium tracking-wide rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                            isActive
                              ? 'bg-[#1C1A17] text-[#F9F8F6] shadow-sm font-semibold'
                              : 'text-[#73706B] hover:text-[#1C1A17] hover:bg-[#E5E1D8]/60'
                          }`}
                        >
                          {tab.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Detail Card */}
                {activeTab && (
                  <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm p-6 sm:p-7 space-y-6 transition-all duration-300">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F]">
                          Component Profile
                        </span>
                        <span className="text-[#C4C0B6]">/</span>
                        <span className="text-xs text-[#73706B]">
                          {activeTab.name}
                        </span>
                      </div>
                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium text-[#1C1A17]">
                        {activeTab.subtitle}
                      </h3>
                      <p className="text-sm text-[#73706B] leading-relaxed pt-1">
                        {activeTab.description}
                      </p>
                    </div>

                    {/* Spec Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#F0EFEA]">
                      {activeTab.specs.map((spec, i) => (
                        <div key={i} className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880] block">
                            {spec.label}
                          </span>
                          <span className="text-xs font-medium text-[#1C1A17] block leading-snug">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Notes Callouts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                      <div className="p-4 bg-[#F9F8F6] border border-[#EBE8E1] rounded-sm space-y-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                          {activeTab.primaryNote.label}
                        </span>
                        <p className="text-[#1C1A17] font-medium leading-relaxed">
                          {activeTab.primaryNote.text}
                        </p>
                      </div>

                      <div className="p-4 bg-[#F9F8F6] border border-[#EBE8E1] rounded-sm space-y-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                          {activeTab.techniqueNote.label}
                        </span>
                        <p className="text-[#1C1A17] font-medium leading-relaxed">
                          {activeTab.techniqueNote.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Section 03: Side-by-Side DO & DON'T Comparison Cards */}
            <section
              id={guide.toc[2]?.id || 'section-03'}
              className="scroll-mt-28 space-y-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    03
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    {guide.dosAndDonts.doTitle} &amp; {guide.dosAndDonts.dontTitle}
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Comparative Discipline
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DO Card */}
                <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-xl overflow-hidden shadow-xs hover:border-[#244A29]/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden">
                      <Image
                        src={guide.dosAndDonts.doImage}
                        alt="Verified practice"
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-500 hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#244A29] text-white text-[11px] font-mono font-bold tracking-widest uppercase rounded-sm shadow-md">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {guide.dosAndDonts.doBadge}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/55 backdrop-blur-xs text-[10px] text-white/90 font-mono tracking-wider rounded-xs">
                        Verified Technique
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="space-y-1">
                        <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                          {guide.dosAndDonts.doTitle}
                        </h3>
                        <p className="text-xs text-[#73706B]">
                          {guide.dosAndDonts.doIntro}
                        </p>
                      </div>

                      <ul className="space-y-3">
                        {guide.dosAndDonts.dos.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-xs leading-relaxed text-[#2C2925]"
                          >
                            <span className="w-4 h-4 rounded-full bg-[#EAF3EB] text-[#244A29] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-[#F9FAF8] border-t border-[#EAEFEA] text-[11px] text-[#244A29] font-medium flex items-center justify-between">
                    <span>{guide.dosAndDonts.doFooter}</span>
                    <span className="font-mono text-[10px]">VanStro Verified</span>
                  </div>
                </div>

                {/* DON'T Card */}
                <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-xl overflow-hidden shadow-xs hover:border-[#8B2627]/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden">
                      <Image
                        src={guide.dosAndDonts.dontImage}
                        alt="Unverified or damaging practice"
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-500 hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B2627] text-white text-[11px] font-mono font-bold tracking-widest uppercase rounded-sm shadow-md">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          {guide.dosAndDonts.dontBadge}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/55 backdrop-blur-xs text-[10px] text-white/90 font-mono tracking-wider rounded-xs">
                        High Risk
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="space-y-1">
                        <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                          {guide.dosAndDonts.dontTitle}
                        </h3>
                        <p className="text-xs text-[#73706B]">
                          {guide.dosAndDonts.dontIntro}
                        </p>
                      </div>

                      <ul className="space-y-3">
                        {guide.dosAndDonts.donts.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-xs leading-relaxed text-[#2C2925]"
                          >
                            <span className="w-4 h-4 rounded-full bg-[#FBEBEB] text-[#8B2627] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                              ✕
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-[#FCF8F8] border-t border-[#F5EAEA] text-[11px] text-[#8B2627] font-medium flex items-center justify-between">
                    <span>{guide.dosAndDonts.dontFooter}</span>
                    <span className="font-mono text-[10px]">Warranty Exclusion</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 04: Technical Matrix & Table */}
            <section
              id={guide.technicalSection.num ? `section-${guide.technicalSection.num}` : 'technical-section'}
              className="scroll-mt-28 space-y-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    {guide.technicalSection.num}
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    {guide.technicalSection.title}
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  {guide.technicalSection.subtitle}
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm p-6 sm:p-7 space-y-6">
                <p className="text-sm text-[#5E5A54] leading-relaxed">
                  {guide.technicalSection.description}
                </p>

                {/* Responsive Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#1C1A17] text-[#73706B] uppercase font-mono text-[10px] tracking-wider">
                        {guide.technicalSection.tableHeaders.map((head, idx) => (
                          <th key={idx} className="pb-3 pr-4 font-semibold">
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EFEA]">
                      {guide.technicalSection.tableRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#F9F8F6]/60 transition-colors">
                          <td className="py-3.5 pr-4 font-medium text-[#1C1A17]">
                            {row.col1}
                          </td>
                          <td className="py-3.5 pr-4 text-[#5E5A54] font-mono">
                            {row.col2}
                          </td>
                          <td className="py-3.5 pr-4 text-[#5E5A54]">
                            {row.col3}
                          </td>
                          <td className="py-3.5 pr-4 text-[#73706B]">
                            {row.col4}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Callout Box */}
                <div className="p-4 bg-[#F9F8F6] border-l-2 border-[#9B7A4F] rounded-xs space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                    {guide.technicalSection.calloutTitle}
                  </span>
                  <p className="text-xs text-[#5E5A54] leading-relaxed">
                    {guide.technicalSection.calloutText}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (30%): Architectural Plates Moodboard Collage */}
          <aside className="w-full lg:w-[30%] space-y-8 order-3">
            <div className="sticky top-28 space-y-6">
              <div className="border-b border-[#E7E5E0] pb-3 flex items-baseline justify-between">
                <span className="text-xs font-serif-luxury uppercase tracking-widest text-[#1C1A17] font-medium">
                  Technical Plates
                </span>
                <span className="font-mono text-xs text-[#9B7A4F]">03 / 03</span>
              </div>

              {guide.plates.map((plate, index) => (
                <div
                  key={index}
                  className="group relative bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden p-2.5 transition-all duration-300 hover:border-[#1C1A17]/40 cursor-pointer"
                  onClick={() => setZoomPlate(plate)}
                >
                  <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden rounded-xs">
                    <Image
                      src={plate.image}
                      alt={plate.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white font-mono text-[9px] tracking-wider rounded-xs backdrop-blur-xs">
                      CLICK TO ZOOM
                    </div>
                  </div>
                  <div className="pt-2.5 pb-1 px-1">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#9B7A4F] block">
                      {plate.figure} — {plate.material}
                    </span>
                    <h4 className="font-serif-luxury text-base font-medium text-[#1C1A17] mt-0.5">
                      {plate.title}
                    </h4>
                    <p className="text-xs text-[#73706B] mt-0.5 leading-snug">
                      {plate.caption}
                    </p>
                  </div>
                </div>
              ))}

              {/* Archival Note */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm text-xs space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                  VanStro Engineering Warranty Notice
                </span>
                <p className="text-[#5E5A54] text-[11px] leading-relaxed">
                  VanStro 12-month residential warranty covers materials, joinery, hinges, and drawer runners under normal residential conditions. Refer to your dealer bill of sale for full warranty terms.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Full-Width Dark Charcoal Bottom Banner */}
      <section className="w-full bg-[#181715] text-[#F9F8F6] py-12 px-6 sm:px-12 mt-16 border-t border-[#292621]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#C5A069]">
              {guide.banner.kicker}
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium tracking-tight text-white">
              {guide.banner.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#A09D96] leading-relaxed">
              {guide.banner.body}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsChecklistOpen(true)}
            className="px-6 py-3.5 bg-[#9B7A4F] text-[#F9F8F6] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#85653E] transition-colors rounded-xs shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            [ {guide.banner.cta} ]
          </button>
        </div>
      </section>

      {/* Printable Sheet Modal */}
      {isChecklistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl bg-[#F9F8F6] text-[#1C1A17] rounded-sm border border-[#E7E5E0] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#E7E5E0] bg-[#FFFFFF] flex items-center justify-between no-print">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#9B7A4F]">
                  <span>VANSTRO ARCHITECTURAL ARCHIVE</span>
                  <span>·</span>
                  <span>DOC REF: {guide.checklist.docRef}</span>
                </div>
                <h2 className="font-serif-luxury text-xl sm:text-2xl font-medium text-[#1C1A17] mt-0.5">
                  {guide.checklist.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsChecklistOpen(false)}
                className="w-8 h-8 rounded-full border border-[#E7E5E0] flex items-center justify-center text-[#73706B] hover:text-[#1C1A17] hover:border-[#1C1A17] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs">
              <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-5 rounded-sm space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#F0EFEA] pb-3">
                  <span className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                    Job Site Verification Sheet
                  </span>
                  <span className="font-mono text-[10px] text-[#73706B]">
                    Status: {Object.values(checkedTasks).filter(Boolean).length} of{' '}
                    {guide.checklist.tasks.length} Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C8880] block">
                      Client / Project Name:
                    </span>
                    <div className="h-6 border-b border-dashed border-[#C4C0B6]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C8880] block">
                      Location / Unit:
                    </span>
                    <div className="h-6 border-b border-dashed border-[#C4C0B6]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C8880] block">
                      Authorized Installer / Date:
                    </span>
                    <div className="h-6 border-b border-dashed border-[#C4C0B6]" />
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-base font-medium text-[#1C1A17]">
                  Actionable Checklist Items
                </h3>
                <div className="space-y-2">
                  {guide.checklist.tasks.map((task) => {
                    const isChecked = !!checkedTasks[task.id];
                    return (
                      <label
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-all duration-150 ${
                          isChecked
                            ? 'bg-[#F2F7F2] border-[#244A29]/30 text-[#1C1A17]'
                            : 'bg-[#FFFFFF] border-[#E7E5E0] text-[#5E5A54] hover:border-[#1C1A17]/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleTask(task.id)}
                          className="mt-0.5 accent-[#244A29] w-4 h-4 cursor-pointer"
                        />
                        <div className="leading-relaxed select-none">
                          <span className="font-mono text-[10px] text-[#9B7A4F] uppercase mr-2 font-semibold">
                            [{task.period}]
                          </span>
                          <span>{task.task}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Note */}
              <div className="p-4 bg-[#FFFFFF] border-l-2 border-[#9B7A4F] text-[11px] text-[#73706B] leading-relaxed">
                <strong className="text-[#1C1A17] font-semibold block mb-0.5">
                  VanStro Engineering Directive:
                </strong>
                {guide.checklist.note}
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-[#FFFFFF] border-t border-[#E7E5E0] flex flex-wrap items-center justify-between gap-3 no-print">
              <span className="text-[11px] text-[#73706B] font-mono">
                Direct Print / Save as PDF
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsChecklistOpen(false)}
                  className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-[#73706B] hover:text-[#1C1A17] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2 text-xs font-mono font-medium tracking-wider uppercase bg-[#181715] text-[#F9F8F6] hover:bg-[#9B7A4F] transition-colors rounded-xs shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <span>Print Worksheet</span>
                  <span>🖨️</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Zoom Modal */}
      {zoomPlate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setZoomPlate(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181715] p-4 rounded-sm border border-[#2E2B26] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2B26] mb-3">
              <div>
                <span className="font-mono text-[10px] text-[#C5A069] uppercase tracking-wider block">
                  {zoomPlate.figure} — VanStro Technical Inspection
                </span>
                <h3 className="font-serif-luxury text-lg text-white font-medium">
                  {zoomPlate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomPlate(null)}
                className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs bg-black">
              <Image
                src={zoomPlate.image}
                alt={zoomPlate.title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-[#A09D96] pt-3 leading-relaxed">
              {zoomPlate.caption}
            </p>
          </div>
        </div>
      )}

      {/* Contact Concierge Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
