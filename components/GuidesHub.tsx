'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';

interface GuidesHubProps {
  onNavigateToCareGuide: () => void;
  onNavigateToMeasureGuide?: () => void;
  onSelectGuideSlug?: (slug: string) => void;
  onOpenChecklistModal: () => void;
}

interface GuideCardItem {
  id: string;
  category: string;
  label: string;
  title: string;
  readTime: string;
  image: string;
  description: string;
  slug: string;
}

const ALL_GUIDES: GuideCardItem[] = [
  {
    id: 'how-to-measure-for-cabinets',
    slug: 'how-to-measure-for-cabinets',
    category: 'Planning Guide',
    label: 'SIZING & MEASURING',
    title: 'Measuring for Cabinets',
    readTime: '6 min read',
    image: '/images/kitchen_blueprint_plan_1793829048195.jpg',
    description:
      'Cabinet widths, heights, clearances and fillers. Step-by-step VanStro guidance for planning, ordering and installing your cabinets.',
  },
  {
    id: 'cabinet-care',
    slug: 'cabinet-care',
    category: 'Cabinet Care',
    label: 'MAINTENANCE',
    title: 'How to Clean Kitchen Cabinets',
    readTime: '4 min read',
    image: '/images/scandinavian_kitchen_oak_1793829046784.jpg',
    description:
      'How to clean PVC soft-touch doors, melamine-faced cabinet boxes and paint-ready trim without treating them like wood furniture.',
  },
  {
    id: 'cabinet-adjustment',
    slug: 'cabinet-adjustment',
    category: 'Hardware & Hinges',
    label: 'HARDWARE & HINGES',
    title: 'How to Adjust Cabinet Doors & Drawers',
    readTime: '4 min read',
    image: '/images/soft_close_hinge_detail_1793829047892.jpg',
    description:
      'When to adjust a cabinet door or drawer, what to check first, and practical steps for DTC 3-way spiral cam soft-close hinges.',
  },
  {
    id: 'what-finishes-are-available',
    slug: 'what-finishes-are-available',
    category: 'Materials & Finishes',
    label: 'MATERIAL GUIDE',
    title: 'Cabinet Finishes: White & Light Grey',
    readTime: '4 min read',
    image: '/images/cabinet_finish_swatches_1793829048007.jpg',
    description:
      'VanStro cabinets come in White or Light Grey with a PVC matte soft-touch door finish. See what each surface is and how to compare samples.',
  },
  {
    id: 'what-are-rta-cabinets',
    slug: 'what-are-rta-cabinets',
    category: 'Construction Spec',
    label: 'CONSTRUCTION SPEC',
    title: 'RTA Kitchen Cabinets: What Ready-to-Assemble Means',
    readTime: '5 min read',
    image: '/images/kitchen_blueprint_plan_1793829048195.jpg',
    description:
      'What ready-to-assemble (RTA) kitchen cabinets are, how VanStro RTA cabinets are built, and how to plan, order and pick them up in Canada.',
  },
  {
    id: 'plywood-vs-particle-board-cabinets',
    slug: 'plywood-vs-particle-board-cabinets',
    category: 'Materials & Finishes',
    label: 'MATERIAL GUIDE',
    title: 'Plywood vs Particle Board Cabinets: What to Check',
    readTime: '4 min read',
    image: '/images/oak_wood_grain_1793828381387.jpg',
    description:
      'How plywood and particle board cabinet boxes differ in moisture, screw holding and weight, and what VanStro cabinets and vanities use.',
  },
  {
    id: 'bathroom-vanity-sizes',
    slug: 'bathroom-vanity-sizes',
    category: 'Planning Guide',
    label: 'SIZING & MEASURING',
    title: 'Bathroom Vanity Sizes: Widths, Height and Depth',
    readTime: '4 min read',
    image: '/images/scandinavian_kitchen_oak_1793829046784.jpg',
    description:
      'Standard bathroom vanity widths, heights and depths, how to measure your space, and the exact sizes of every VanStro vanity model.',
  },
  {
    id: 'pickup-and-delivery-options',
    slug: 'pickup-and-delivery-options',
    category: 'Logistics',
    label: 'DISTRIBUTION & LOGISTICS',
    title: 'Delivery and Local Dealer Pickup Options',
    readTime: '3 min read',
    image: '/images/scandinavian_kitchen_oak_1793829046784.jpg',
    description:
      'Availability, warehouse pickup and regional freight delivery depend on your dealer location and postal code across Canada.',
  },
];

const FILTER_TAGS = [
  { label: 'All (8)', value: 'All' },
  { label: 'Cabinet Care', value: 'Cabinet Care' },
  { label: 'Planning Guide', value: 'Planning Guide' },
  { label: 'Materials & Finishes', value: 'Materials & Finishes' },
  { label: 'Hardware & Hinges', value: 'Hardware & Hinges' },
  { label: 'Construction Spec', value: 'Construction Spec' },
  { label: 'Logistics', value: 'Logistics' },
];

export default function GuidesHub({
  onNavigateToCareGuide,
  onNavigateToMeasureGuide,
  onSelectGuideSlug,
  onOpenChecklistModal,
}: GuidesHubProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeCardModal, setActiveCardModal] = useState<GuideCardItem | null>(null);

  const filteredGuides = useMemo(() => {
    return ALL_GUIDES.filter((guide) => {
      const matchesFilter =
        activeFilter === 'All' || guide.category === activeFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.label.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const handleLeadMagnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setDownloadSuccess(true);
    setTimeout(() => {
      onOpenChecklistModal();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1F1F1F] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#1F1F1F]">
      {/* 1. Top Navigation Bar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-10 lg:py-16 space-y-16 lg:space-y-24">
        {/* 2. Centered Hero Header */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#9B7A4F] font-semibold">
              VanStro Knowledge Hub
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1F1F1F] tracking-tight uppercase">
              Guides &amp; Insights
            </h1>
            <p className="text-sm sm:text-base text-[#73706B] leading-relaxed max-w-xl mx-auto font-normal">
              Expert advice, maintenance manuals, and bespoke kitchen planning.
            </p>
          </div>

          {/* Clean Centered Rounded Search Bar */}
          <div className="relative max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <svg
                className="w-4 h-4 text-[#8C8880] absolute left-4.5 pointer-events-none stroke-[1.75]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, materials, care tips..."
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E7E5E0] rounded-full text-xs text-[#1F1F1F] placeholder:text-[#9E9B94] focus:outline-none focus:border-[#1F1F1F] shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs text-[#9E9B94] hover:text-[#1F1F1F] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Centered Row of Rounded Pill Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {FILTER_TAGS.map((tag) => {
              const isActive = activeFilter === tag.value;
              return (
                <button
                  key={tag.value}
                  type="button"
                  onClick={() => setActiveFilter(tag.value)}
                  className={`px-5 py-2 text-xs font-medium tracking-wide rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#1F1F1F] text-[#F9F8F6] shadow-xs font-semibold'
                      : 'bg-white text-[#73706B] border border-[#E7E5E0] hover:text-[#1F1F1F] hover:border-[#1F1F1F]/40'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Featured Editorial Card */}
        <section>
          <div className="w-full bg-[#181715] text-[#F9F8F6] rounded-2xl overflow-hidden border border-[#2E2B26] shadow-xl grid grid-cols-1 lg:grid-cols-2">
            {/* Left 50%: High-resolution Scandinavian kitchen photo */}
            <div className="relative aspect-[4/3] lg:aspect-auto min-h-[340px] lg:min-h-[460px] w-full bg-[#24221E] overflow-hidden">
              <Image
                src="/images/scandinavian_kitchen_oak_1793829046784.jpg"
                alt="Bespoke Scandinavian kitchen with rift-cut white oak and matte white cabinetry"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-xs text-[10px] font-mono tracking-widest uppercase text-white/90">
                  Featured Case Study
                </span>
              </div>
            </div>

            {/* Right 50%: Solid dark charcoal block with gold/white typography */}
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-[#181715] space-y-6">
              <div className="space-y-4">
                {/* Gold / White Kicker */}
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.18em] text-[#C5A069]">
                  <span>ESSENTIAL GUIDE</span>
                  <span className="text-[#595349]">·</span>
                  <span className="text-[#A09D96]">6 MIN READ</span>
                </div>

                {/* Large Serif Headline */}
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#F9F8F6] tracking-tight leading-[1.12]">
                  The Complete Cabinet Care &amp; Longevity Handbook
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A09D96] leading-relaxed max-w-lg">
                  An architectural guide to preserving custom bespoke cabinetry, natural wood grain depth, hand-applied lacquer, and precision German mechanical hardware. Divided into material care specifications, daily wiping rules, and comparative Do&apos;s &amp; Don&apos;ts.
                </p>

                {/* Micro Meta Specs */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#73706B] font-mono">
                  <span>Quarter-Sawn Oak</span>
                  <span>·</span>
                  <span>Blumotion Mechanics</span>
                  <span>·</span>
                  <span>Printable Checklist</span>
                </div>
              </div>

              {/* Text Link [ Read Guide → ] */}
              <div className="pt-4 border-t border-[#292621]">
                <button
                  type="button"
                  onClick={onNavigateToCareGuide}
                  className="group inline-flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-[#C5A069] hover:text-white transition-colors cursor-pointer"
                >
                  <span className="font-medium underline underline-offset-4 decoration-[#C5A069]/40 group-hover:decoration-white">
                    [ Read Guide → ]
                  </span>
                  <span className="text-[11px] text-[#8C8880] font-sans lowercase tracking-normal">
                    (opens handbook detail view)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Curated 3-Column Topic Grid */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#E7E5E0] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F] block mb-1">
                Curated Knowledge Base
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#1F1F1F] tracking-tight">
                Explore By Topic
              </h2>
            </div>
            <p className="text-xs text-[#73706B] font-mono">
              Showing {filteredGuides.length} curated {filteredGuides.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {/* Airy, Spacious 3-Column Grid */}
          {filteredGuides.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E7E5E0] rounded-sm space-y-3">
              <p className="text-sm text-[#73706B]">
                No guides matching &quot;{searchQuery}&quot; in category &quot;{activeFilter}&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                }}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#1F1F1F] border border-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {filteredGuides.map((guide) => (
                <article
                  key={guide.id}
                    onClick={() => {
                      if (onSelectGuideSlug) {
                        onSelectGuideSlug(guide.slug);
                      } else if (guide.slug === 'how-to-measure-for-cabinets' && onNavigateToMeasureGuide) {
                        onNavigateToMeasureGuide();
                      } else if (guide.slug === 'cabinet-care') {
                        onNavigateToCareGuide();
                      } else {
                        setActiveCardModal(guide);
                      }
                    }}
                    className="group bg-white border border-[#E7E5E0] rounded-sm overflow-hidden hover:border-[#1F1F1F]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Image slot */}
                      <div className="relative aspect-[4/3] w-full bg-[#EAE7E0] overflow-hidden">
                        <Image
                          src={guide.image}
                          alt={guide.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-104"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 tracking-widest uppercase">
                          {guide.label}
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-[#73706B] font-mono">
                          <span className="uppercase tracking-wider">{guide.category}</span>
                          <span>{guide.readTime}</span>
                        </div>

                        <h3 className="font-serif-luxury text-2xl font-medium text-[#1F1F1F] group-hover:text-[#9B7A4F] transition-colors leading-tight">
                          {guide.title}
                        </h3>

                        <p className="text-xs text-[#73706B] leading-relaxed line-clamp-2">
                          {guide.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-3.5 border-t border-[#F0EFEA] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#1F1F1F] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium">
                        Read Article →
                      </span>
                      <span className="text-[11px] text-[#A09D96]">VanStro Archive</span>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </section>
      </main>

      {/* 5. Lead Magnet Footer Strip */}
      <footer className="w-full bg-[#181715] text-[#F9F8F6] border-t border-[#292621] py-14 sm:py-16 mt-16 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5A069]">
                Printable Architectural Checklist
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#F9F8F6] tracking-tight">
                Keep your cabinets pristine. Download our Cabinet Maintenance Checklist PDF.
              </h3>
              <p className="text-xs text-[#A09D96] leading-relaxed">
                Includes daily wipe rules, seasonal moisture tolerances, and authorized cleaner dilution ratios formulated for high-end residential cabinetry.
              </p>
            </div>

            {/* Email input + Bronze button */}
            <div className="w-full max-w-md shrink-0">
              {downloadSuccess ? (
                <div className="p-4 bg-[#244A29]/30 border border-[#244A29]/50 text-white rounded-none flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#8CD194]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Checklist unlocked! Opening modal...</span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenChecklistModal}
                    className="font-mono underline text-[#8CD194] uppercase tracking-wider"
                  >
                    View PDF
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadMagnetSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    required
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3 bg-[#24221E] border border-[#3E3A33] rounded-none text-xs text-white placeholder:text-[#8C8880] focus:outline-none focus:border-[#C5A069]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-xs uppercase font-mono tracking-[0.16em] font-medium text-white bg-[#9B7A4F] hover:bg-[#85663F] transition-colors cursor-pointer shrink-0 whitespace-nowrap active:scale-[0.98]"
                  >
                    [ Download Free Guide ]
                  </button>
                </form>
              )}
              <span className="text-[10px] text-[#73706B] font-mono block mt-2">
                Instant PDF download. No promotional spam. Unsubscribe anytime.
              </span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#292621] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#73706B]">
            <div className="flex items-center gap-4">
              <span className="font-serif-luxury text-base tracking-widest text-[#F9F8F6]">
                VANSTRO
              </span>
              <span className="text-[11px] text-[#A09D96]">
                Architectural Joinery Standard §2026
              </span>
            </div>
            <div className="text-[11px] flex items-center gap-4">
              <span>Copenhagen</span>
              <span>·</span>
              <span>Stockholm</span>
              <span>·</span>
              <span>Tokyo</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Guide Card Quick View Modal */}
      {activeCardModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1C1A17]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveCardModal(null)}
        >
          <div
            className="bg-[#F9F8F6] border border-[#E7E5E0] max-w-xl w-full rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-[#EAE7E0]">
              <Image
                src={activeCardModal.image}
                alt={activeCardModal.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 text-white text-[10px] font-mono tracking-widest">
                {activeCardModal.label}
              </div>
            </div>
            <div className="p-6 space-y-4 bg-white">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#9B7A4F] uppercase tracking-wider">
                  {activeCardModal.category} · {activeCardModal.readTime}
                </span>
                <h3 className="font-serif-luxury text-2xl font-medium text-[#1F1F1F]">
                  {activeCardModal.title}
                </h3>
              </div>
              <p className="text-xs text-[#73706B] leading-relaxed">
                {activeCardModal.description}
              </p>
              <div className="pt-4 border-t border-[#F0EFEA] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveCardModal(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#73706B] hover:text-[#1F1F1F] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCardModal(null);
                    onNavigateToCareGuide();
                  }}
                  className="px-5 py-2 text-xs uppercase font-mono tracking-wider font-medium text-white bg-[#1F1F1F] hover:bg-[#333] transition-colors cursor-pointer"
                >
                  Explore Cabinet Care Handbook →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Concierge Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
