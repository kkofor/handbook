'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { Button } from '@/components/ui/button';
import {
  Search,
  BookOpen,
  ArrowRight,
  Download,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

interface GuidesHubProps {
  onNavigateToCareGuide: () => void;
  onNavigateToMeasureGuide?: () => void;
  onSelectGuideSlug?: (slug: string) => void;
  onOpenChecklistModal: () => void;
  onNavigateToContact?: () => void;
  onNavigate?: (view: string) => void;
}

interface GuideItem {
  id: string;
  slug: string;
  category: 'Planning & Measuring' | 'Materials & Finishes' | 'Care & Adjustment' | 'Delivery & Pickup';
  readTime: string;
  title: string;
  description: string;
}

const ALL_GUIDES: GuideItem[] = [
  {
    id: 'how-to-measure-for-cabinets',
    slug: 'how-to-measure-for-cabinets',
    category: 'Planning & Measuring',
    readTime: '4 min read',
    title: 'Measuring for Cabinets',
    description: 'Cabinet widths, heights, clearances and fillers.',
  },
  {
    id: 'what-finishes-are-available',
    slug: 'what-finishes-are-available',
    category: 'Materials & Finishes',
    readTime: '2 min read',
    title: 'What Finishes Are Available',
    description: 'White and Light Grey cabinet finishes, paint-ready trim materials and care notes.',
  },
  {
    id: 'what-are-rta-cabinets',
    slug: 'what-are-rta-cabinets',
    category: 'Materials & Finishes',
    readTime: '4 min read',
    title: 'What are RTA kitchen cabinets?',
    description: 'What ready-to-assemble cabinets are, how VanStro builds them, and how to plan, order and pick them up in Canada.',
  },
  {
    id: 'plywood-vs-particle-board-cabinets',
    slug: 'plywood-vs-particle-board-cabinets',
    category: 'Materials & Finishes',
    readTime: '2 min read',
    title: 'Plywood or particle board cabinets?',
    description: 'How plywood and particle board boxes differ where it matters, and what to check inside a cabinet.',
  },
  {
    id: 'bathroom-vanity-sizes',
    slug: 'bathroom-vanity-sizes',
    category: 'Planning & Measuring',
    readTime: '2 min read',
    title: 'Bathroom vanity sizes',
    description: 'Common widths, heights and depths, plus the exact size of every VanStro vanity.',
  },
  {
    id: 'pickup-and-delivery-options',
    slug: 'pickup-and-delivery-options',
    category: 'Delivery & Pickup',
    readTime: '2 min read',
    title: 'Delivery and Local Dealer Pickup Options',
    description: 'Availability, pickup and delivery depend on your dealer and postal code.',
  },
  {
    id: 'cabinet-care',
    slug: 'cabinet-care',
    category: 'Care & Adjustment',
    readTime: '2 min read',
    title: 'Cabinet Care',
    description: 'How to clean PVC soft-touch doors, melamine boxes and paint-ready trim without treating them like wood furniture.',
  },
  {
    id: 'cabinet-adjustment',
    slug: 'cabinet-adjustment',
    category: 'Care & Adjustment',
    readTime: '2 min read',
    title: 'Cabinet Adjustment',
    description: 'When to adjust a door or drawer, what to check first, and when to contact your local dealer.',
  },
];

export default function GuidesHub({
  onNavigateToCareGuide,
  onNavigateToMeasureGuide,
  onSelectGuideSlug,
  onOpenChecklistModal,
  onNavigateToContact,
  onNavigate,
}: GuidesHubProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = useMemo(() => {
    return ALL_GUIDES.filter((g) => {
      const matchesCat = activeCategory === 'All' || g.category === activeCategory;
      const matchesQuery =
        !searchQuery ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const handleCardClick = (guide: GuideItem) => {
    if (guide.slug === 'cabinet-care') {
      onNavigateToCareGuide();
    } else if (guide.slug === 'how-to-measure-for-cabinets' && onNavigateToMeasureGuide) {
      onNavigateToMeasureGuide();
    } else if (onSelectGuideSlug) {
      onSelectGuideSlug(guide.slug);
    } else if (onNavigate) {
      onNavigate(guide.slug);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#10201d] font-sans antialiased selection:bg-[#f28a0b]/20 selection:text-[#003f3f]">
      <Navbar
        currentView="guides"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateToContact={onNavigateToContact}
        onOpenChecklist={onOpenChecklistModal}
      />

      {/* Hero */}
      <section className="border-b border-[#d9e1df] bg-white pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5f7376] mb-6">
            <button
              type="button"
              onClick={onNavigateToCareGuide}
              className="hover:text-[#003f3f] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true" className="text-[#d9e1df]">/</span>
            <span className="text-[#003f3f] font-semibold">Guides</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
              Resource Centre
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003f3f] tracking-tight leading-[1.1]">
              Guides
            </h1>
            <p className="text-base sm:text-lg text-[#315b60] leading-relaxed font-normal">
              Measuring, finishes, care, adjustment, pickup and delivery.
            </p>

            {/* Search Input */}
            <div className="pt-2 max-w-md">
              <div className="relative">
                <Search className="w-4 h-4 text-[#5f7376] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guides..."
                  className="w-full h-11 pl-10 pr-4 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="pt-4 flex flex-wrap gap-2 text-xs font-medium">
              {[
                'All (8)',
                'Planning & Measuring',
                'Materials & Finishes',
                'Care & Adjustment',
                'Delivery & Pickup',
              ].map((label) => {
                const value = label.startsWith('All') ? 'All' : label;
                const isSelected = activeCategory === value;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveCategory(value)}
                    className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#003f3f] text-white font-semibold'
                        : 'bg-[#f5f8f7] text-[#5f7376] hover:bg-[#d9e1df] hover:text-[#003f3f]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guide Banner (Cabinet Care) */}
      <section className="py-10 border-b border-[#d9e1df] bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="bg-white p-6 sm:p-10 border border-[#d9e1df] rounded-xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5f7376]">
                <span className="px-2 py-0.5 bg-[#edf4ee] text-[#0b7a4b] font-bold rounded">
                  Featured guide
                </span>
                <span>·</span>
                <span>2 min read</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f]">
                Cabinet Care
              </h2>
              <p className="text-xs sm:text-sm text-[#315b60] leading-relaxed">
                How to clean PVC soft-touch doors, melamine boxes and paint-ready trim without treating them like wood furniture.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#5f7376]">
                <span className="px-2.5 py-1 bg-[#f5f8f7] border border-[#d9e1df] rounded">PVC soft-touch doors</span>
                <span className="px-2.5 py-1 bg-[#f5f8f7] border border-[#d9e1df] rounded">Melamine boxes</span>
                <span className="px-2.5 py-1 bg-[#f5f8f7] border border-[#d9e1df] rounded">Paint-ready trim</span>
              </div>
            </div>

            <Button
              onClick={onNavigateToCareGuide}
              className="bg-[#003f3f] hover:bg-[#0f5554] text-white px-6 py-3 text-xs sm:text-sm font-semibold rounded-md flex items-center gap-2 shrink-0"
            >
              <span>Read Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* All Guides Grid (8 of 8) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="flex items-center justify-between border-b border-[#d9e1df] pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] block mb-1">
                Guide library
              </span>
              <h2 className="text-2xl font-bold text-[#003f3f]">All guides</h2>
            </div>
            <span className="text-xs font-mono text-[#5f7376]">
              {filteredGuides.length} of 8 guides
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => handleCardClick(guide)}
                className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-xl hover:border-[#003f3f] hover:bg-white hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#5f7376]">
                    <span className="font-semibold text-[#003f3f]">{guide.category}</span>
                    <span className="font-mono text-[11px]">{guide.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#003f3f] group-hover:text-[#f28a0b] transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#5f7376] leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#d9e1df] flex items-center gap-1 text-xs font-semibold text-[#003f3f] group-hover:translate-x-0.5 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Centre Banner */}
      <section className="py-12 border-t border-[#d9e1df] bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#003f3f]">
              <Download className="w-4 h-4 text-[#f28a0b]" />
              <span>Download Centre</span>
            </div>
            <h3 className="text-xl font-bold text-[#003f3f]">
              Catalogues, installation guides and warranty information
            </h3>
            <p className="text-xs text-[#5f7376] leading-relaxed">
              Download current VanStro catalogues, product-specific installation guides and warranty information. Use the SKU on your product page or order to select the right document.
            </p>
          </div>

          <Button
            onClick={onOpenChecklistModal}
            className="bg-[#003f3f] hover:bg-[#0f5554] text-white text-xs font-semibold px-5 py-2.5 rounded-md"
          >
            Checklist PDF
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d9e1df] bg-white py-10 text-xs text-[#5f7376]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-semibold text-[#003f3f]">VanStro Global Supply Inc.</p>
            <p>856 Century Street, Winnipeg, MB R3H 0M5 · Canada</p>
          </div>
          <div className="flex gap-4">
            <a href="tel:18558267876" className="hover:text-[#003f3f]">1-855-VANSTRO</a>
            <a href="mailto:support@vanstro.ca" className="hover:text-[#003f3f]">support@vanstro.ca</a>
          </div>
        </div>
      </footer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
