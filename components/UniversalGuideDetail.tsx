'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Check,
  X,
  Sparkles,
  Layers,
  CheckCircle2,
  Printer,
  Download,
  Maximize2,
  CheckSquare,
  Square,
  Info,
  Sliders,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  RotateCw,
  MapPin,
  Clock,
  Building,
} from 'lucide-react';
import { VanStroGuideData } from '@/data/all-vanstro-guides';

interface UniversalGuideDetailProps {
  guide: VanStroGuideData;
  onBackToGuides: () => void;
  onNavigate?: (view: string) => void;
}

export default function UniversalGuideDetail({
  guide,
  onBackToGuides,
  onNavigate,
}: UniversalGuideDetailProps) {
  const [activeSection, setActiveSection] = useState(guide.toc[0]?.id || '');
  const [activeTabId, setActiveTabId] = useState(guide.tabs?.[0]?.id || '');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    [guide.checklist?.tasks[0]?.id || 't0']: true,
    [guide.checklist?.tasks[1]?.id || 't1']: true,
  });
  const [zoomPlate, setZoomPlate] = useState<{
    figure: string;
    title: string;
    caption: string;
    image: string;
  } | null>(null);

  // Guide-Specific Interactive States
  // 1. For cabinet-adjustment: 3-way cam direction simulator
  const [camMode, setCamMode] = useState<'lateral' | 'depth' | 'vertical'>('lateral');

  // 2. For bathroom-vanity-sizes: alcove width calculator
  const [alcoveWidth, setAlcoveWidth] = useState<number>(36);

  // 3. For pickup-and-delivery-options: active hub selection
  const [activeHub, setActiveHub] = useState<string>('MB01');

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

  const completedCount = Object.values(checkedTasks).filter(Boolean).length;
  const totalTasks = guide.checklist?.tasks?.length || 0;

  const activeTab = guide.tabs?.find((t) => t.id === activeTabId) || guide.tabs?.[0];

  return (
    <div className="guides-hb min-h-screen bg-[#FFFFFF] text-[#1C1A17] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      {/* Top Navbar */}
      <Navbar
        currentView={guide.slug}
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateToContact={() => onNavigate?.('contact')}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-12">
        {/* Top Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:mb-16 border-b border-[#E7E5E0] pb-10"
        >
          {/* Back Link */}
          <div className="mb-6">
            <button
              type="button"
              onClick={onBackToGuides}
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#73706B] hover:text-[#1C1A17] transition-colors cursor-pointer"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
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
            <div className="shrink-0 flex items-center gap-3 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={() => setIsChecklistOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#181715] text-[#F9F8F6] text-xs font-mono uppercase tracking-widest hover:bg-[#9B7A4F] transition-all rounded-xs shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Printable PDF</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* Asymmetric 3-Column Layout (18% : 52% : 30%) */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start w-full">
          {/* Left Column (18%): Sticky Minimalist TOC */}
          <motion.aside
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[18%] lg:shrink-0 order-2 lg:order-1"
          >
            <div className="sticky top-28 space-y-8 pr-4">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73706B] block mb-4">
                  Contents
                </span>
                <div className="h-[1px] w-8 bg-[#1C1A17]/30 mb-6" />

                <nav aria-label="Table of contents" className="space-y-3.5">
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
                        <span className="text-xs sm:text-sm font-sans tracking-tight">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Minimalist Footnote */}
              <div className="pt-6 border-t border-[#E7E5E0] space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-[#9E9B94] font-mono">
                  Archival Document
                </p>
                <p className="text-xs text-[#73706B] leading-relaxed">
                  {guide.standardRef} — VanStro Technical Library
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9B7A4F]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A4F]" />
                    Factory Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Middle Column (52%): Primary Content Stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[52%] space-y-16 order-1 lg:order-2"
          >
            {/* Slice 01: Core Principles (id: guide.toc[0].id) */}
            <section
              id={guide.toc[0]?.id || 'section-01'}
              className="scroll-mt-28 space-y-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    01
                  </span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    {guide.toc[0]?.title || 'Core Principles'}
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  The Short Version
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {guide.quickRules.map((card, idx) => (
                  <Card
                    key={card.id}
                    className="border-[#E7E5E0] bg-white hover:border-[#1C1A17] hover:shadow-xs transition-all duration-300 rounded-lg flex flex-col justify-between"
                  >
                    <CardHeader className="p-5 pb-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="copper" className="text-[9px] font-mono">
                          Rule 0{idx + 1}
                        </Badge>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880]">
                          {card.label}
                        </span>
                      </div>

                      <CardTitle className="text-base font-serif-luxury font-medium text-[#1C1A17] leading-snug">
                        {card.title}
                      </CardTitle>

                      <CardDescription className="text-xs text-[#5E5A54] leading-relaxed pt-1">
                        {card.body}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="px-5 py-2.5 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono">
                      {card.note}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            {/* Slice 02: Interactive Component Specifications (id: guide.toc[1].id) */}
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
                    <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                      {guide.toc[1]?.title || 'Component Drill-Down'}
                    </h2>
                  </div>
                  <span className="text-xs text-[#73706B] tracking-wider uppercase font-mono">
                    {guide.tabsLabel || 'Specification'}
                  </span>
                </div>

                {/* Tabs Component */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 border-b border-[#E7E5E0] pb-2">
                    {guide.tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabId(tab.id)}
                        className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                          activeTabId === tab.id
                            ? 'bg-[#181715] text-white font-medium'
                            : 'bg-[#FAF9F6] text-[#73706B] hover:text-[#1C1A17] border border-[#E7E5E0]'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>

                  {/* Active Tab Detail Card */}
                  {activeTab && (
                    <Card className="border-[#E7E5E0] bg-white shadow-xs rounded-lg">
                      <CardHeader className="p-6 sm:p-7 space-y-1.5 pb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="copper" className="text-[9px] font-mono">
                            Specification
                          </Badge>
                          <span className="text-[#C4C0B6]">/</span>
                          <span className="text-xs font-mono text-[#73706B]">
                            {activeTab.name}
                          </span>
                        </div>
                        <CardTitle className="text-xl sm:text-2xl font-serif-luxury text-[#1C1A17]">
                          {activeTab.subtitle}
                        </CardTitle>
                        <CardDescription className="text-xs text-[#5E5A54] leading-relaxed pt-0.5">
                          {activeTab.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-6 sm:p-7 pt-0 space-y-6">
                        {/* Spec Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#F0EFEA] bg-[#FAF9F6]/60 rounded-sm p-3">
                          {activeTab.specs.map((spec, i) => (
                            <div key={i} className="space-y-0.5">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880] block">
                                {spec.label}
                              </span>
                              <span className="text-xs font-semibold text-[#1C1A17] block leading-snug">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Notes Callouts */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 bg-white border border-[#E7E5E0] rounded-sm space-y-1 shadow-2xs border-l-2 border-l-[#9B7A4F]">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                              {activeTab.primaryNote.label}
                            </span>
                            <p className="text-[#1C1A17] text-xs leading-relaxed">
                              {activeTab.primaryNote.text}
                            </p>
                          </div>

                          <div className="p-4 bg-white border border-[#E7E5E0] rounded-sm space-y-1 shadow-2xs border-l-2 border-l-[#181715]">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#1C1A17] font-semibold block">
                              {activeTab.techniqueNote.label}
                            </span>
                            <p className="text-[#1C1A17] text-xs leading-relaxed">
                              {activeTab.techniqueNote.text}
                            </p>
                          </div>
                        </div>

                        {/* GUIDE-SPECIFIC INTERACTIVE FEATURE SLICES */}
                        {/* Case A: cabinet-adjustment -> 3-Way Cam Directional Guide */}
                        {guide.slug === 'cabinet-adjustment' && (
                          <div className="p-5 bg-[#FAF9F6] border border-[#E7E5E0] rounded-sm space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1A17] font-semibold flex items-center gap-1.5">
                                <RotateCw className="w-3.5 h-3.5 text-[#9B7A4F]" />
                                <span>Interactive DTC Cam Direction Selector:</span>
                              </span>
                              <Badge variant="secondary" className="font-mono text-[10px]">
                                Manual #2 Driver Only
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {[
                                { id: 'lateral', label: '1. Side-to-Side (Lateral)' },
                                { id: 'depth', label: '2. In-and-Out (Depth)' },
                                { id: 'vertical', label: '3. Up-and-Down (Height)' },
                              ].map((m) => (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => setCamMode(m.id as any)}
                                  className={`px-3 py-1.5 text-xs font-mono rounded-xs cursor-pointer transition-colors ${
                                    camMode === m.id
                                      ? 'bg-[#181715] text-white font-medium'
                                      : 'bg-white border border-[#E7E5E0] text-[#73706B] hover:text-[#1C1A17]'
                                  }`}
                                >
                                  {m.label}
                                </button>
                              ))}
                            </div>

                            <div className="p-3.5 bg-white border border-[#E7E5E0] rounded-xs text-xs space-y-1.5">
                              {camMode === 'lateral' && (
                                <>
                                  <div className="font-semibold text-[#1C1A17] font-mono">
                                    Turn Front Hinge Arm Cam Screw:
                                  </div>
                                  <p className="text-[#5E5A54] leading-relaxed">
                                    • <strong>Clockwise:</strong> Moves the door edge further to the right / away from the side frame.
                                    <br />
                                    • <strong>Counter-Clockwise:</strong> Moves the door edge to the left / closer to the frame.
                                    <br />
                                    • <em>Tip:</em> Adjust top and bottom cams equally to avoid diagonal door skew.
                                  </p>
                                </>
                              )}
                              {camMode === 'depth' && (
                                <>
                                  <div className="font-semibold text-[#1C1A17] font-mono">
                                    Turn Rear Eccentric Cam Screw:
                                  </div>
                                  <p className="text-[#5E5A54] leading-relaxed">
                                    • <strong>Clockwise:</strong> Draws the door face tighter against the cabinet box bumpers.
                                    <br />
                                    • <strong>Counter-Clockwise:</strong> Pushes the door outward to clear protruding adjacent drawers.
                                    <br />
                                    • <em>Target:</em> Consistent 1.5mm–2.0mm reveal gap around all face perimeters.
                                  </p>
                                </>
                              )}
                              {camMode === 'vertical' && (
                                <>
                                  <div className="font-semibold text-[#1C1A17] font-mono">
                                    Loosen Top &amp; Bottom Mounting Plate Screws:
                                  </div>
                                  <p className="text-[#5E5A54] leading-relaxed">
                                    • Loosen both plate screws ½ turn, support the door weight by hand, and slide vertically within slotted holes (±2mm travel).
                                    <br />
                                    • Re-tighten firmly with hand torque once the horizontal shaker rail aligns with neighboring doors.
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Case B: bathroom-vanity-sizes -> Alcove Width Estimator */}
                        {guide.slug === 'bathroom-vanity-sizes' && (
                          <div className="p-5 bg-[#FAF9F6] border border-[#E7E5E0] rounded-sm space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1A17] font-semibold flex items-center gap-1.5">
                                <Sliders className="w-3.5 h-3.5 text-[#9B7A4F]" />
                                <span>Alcove Width Sizing Estimator:</span>
                              </span>
                              <Badge variant="secondary" className="font-mono text-xs font-semibold text-[#9B7A4F]">
                                Room Space: {alcoveWidth}&quot;
                              </Badge>
                            </div>

                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min="24"
                                max="72"
                                step="1"
                                value={alcoveWidth}
                                onChange={(e) => setAlcoveWidth(Number(e.target.value))}
                                className="w-full accent-[#181715] cursor-pointer"
                              />
                              <span className="font-mono text-xs font-semibold w-14 text-right">{alcoveWidth}&quot;</span>
                            </div>

                            <div className="p-3.5 bg-white border border-[#E7E5E0] rounded-xs text-xs space-y-1">
                              {alcoveWidth < 24 && (
                                <p className="text-[#8B2627]">Narrower than minimum 24&quot; VanStro vanity size.</p>
                              )}
                              {alcoveWidth >= 24 && alcoveWidth < 30 && (
                                <p className="text-[#1C1A17]">
                                  Best Fit: <strong>VS24 (24&quot; W)</strong> or <strong>VS27 (27&quot; W)</strong>. Remaining gap: {(alcoveWidth - (alcoveWidth >= 27 ? 27 : 24)).toFixed(1)}&quot; for side filler strips.
                                </p>
                              )}
                              {alcoveWidth >= 30 && alcoveWidth < 36 && (
                                <p className="text-[#1C1A17]">
                                  Best Fit: <strong>VS30 (30&quot; W)</strong> or <strong>V3021STDR/L</strong> drawer models. Remaining gap: {(alcoveWidth - 30).toFixed(1)}&quot;.
                                </p>
                              )}
                              {alcoveWidth >= 36 && alcoveWidth < 42 && (
                                <p className="text-[#1C1A17]">
                                  Best Fit: <strong>VS36 (36&quot; W)</strong> or <strong>V3621TDR/L</strong> drawer models. Remaining gap: {(alcoveWidth - 36).toFixed(1)}&quot;.
                                </p>
                              )}
                              {alcoveWidth >= 42 && alcoveWidth < 48 && (
                                <p className="text-[#1C1A17]">
                                  Best Fit: <strong>VS42 (42&quot; W)</strong> with 6 deep drawers. Remaining gap: {(alcoveWidth - 42).toFixed(1)}&quot;.
                                </p>
                              )}
                              {alcoveWidth >= 48 && alcoveWidth < 66 && (
                                <p className="text-[#1C1A17]">
                                  Best Fit: <strong>VS48 (48&quot; W)</strong> single-sink luxury vanity. Remaining gap: {(alcoveWidth - 48).toFixed(1)}&quot;.
                                </p>
                              )}
                              {alcoveWidth >= 66 && (
                                <p className="text-[#1C1A17]">
                                  Best Fit: <strong>VS66 (66&quot; W)</strong> dual-sink master suite vanity. Remaining gap: {(alcoveWidth - 66).toFixed(1)}&quot;.
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Case C: pickup-and-delivery-options -> Canadian Regional Hubs */}
                        {guide.slug === 'pickup-and-delivery-options' && (
                          <div className="p-5 bg-[#FAF9F6] border border-[#E7E5E0] rounded-sm space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1A17] font-semibold flex items-center gap-1.5">
                                <Building className="w-3.5 h-3.5 text-[#9B7A4F]" />
                                <span>Canadian Distribution Hub Staging:</span>
                              </span>
                              <Badge variant="secondary" className="font-mono text-[10px]">
                                5 Regional Hubs
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {[
                                { id: 'MB01', city: 'Winnipeg MB (HQ)' },
                                { id: 'MB02', city: 'Brandon MB' },
                                { id: 'ON10', city: 'Waterloo ON' },
                                { id: 'QC10', city: 'Pointe-Claire QC' },
                                { id: 'SK10', city: 'Saskatoon SK' },
                              ].map((hub) => (
                                <button
                                  key={hub.id}
                                  type="button"
                                  onClick={() => setActiveHub(hub.id)}
                                  className={`px-3 py-1.5 text-xs font-mono rounded-xs cursor-pointer transition-colors ${
                                    activeHub === hub.id
                                      ? 'bg-[#181715] text-white font-medium'
                                      : 'bg-white border border-[#E7E5E0] text-[#73706B] hover:text-[#1C1A17]'
                                  }`}
                                >
                                  {hub.city}
                                </button>
                              ))}
                            </div>

                            <div className="p-3.5 bg-white border border-[#E7E5E0] rounded-xs text-xs space-y-1">
                              {activeHub === 'MB01' && (
                                <p className="text-[#5E5A54]">
                                  <strong className="text-[#1C1A17]">MB01 (Winnipeg Central HQ):</strong> Century St Distribution Center. Serving Manitoba and Western Ontario. Warehouse dock open Mon–Fri 8:00 AM – 4:30 PM CST.
                                </p>
                              )}
                              {activeHub === 'MB02' && (
                                <p className="text-[#5E5A54]">
                                  <strong className="text-[#1C1A17]">MB02 (Brandon Regional):</strong> Park Ave E Warehouse. Serving Parkland &amp; Western Manitoba. Dock open Mon–Fri 8:30 AM – 5:00 PM CST.
                                </p>
                              )}
                              {activeHub === 'ON10' && (
                                <p className="text-[#5E5A54]">
                                  <strong className="text-[#1C1A17]">ON10 (Waterloo Regional):</strong> Regina St S Hub. Serving Greater Toronto Area (GTA) &amp; Southwestern Ontario. Dock open Mon–Fri 8:00 AM – 4:30 PM EST.
                                </p>
                              )}
                              {activeHub === 'QC10' && (
                                <p className="text-[#5E5A54]">
                                  <strong className="text-[#1C1A17]">QC10 (Pointe-Claire Regional):</strong> Boul. Saint-Jean Hub. Serving Greater Montreal &amp; Quebec. Dock open Mon–Fri 8:00 AM – 4:30 PM EST.
                                </p>
                              )}
                              {activeHub === 'SK10' && (
                                <p className="text-[#5E5A54]">
                                  <strong className="text-[#1C1A17]">SK10 (Saskatoon Regional):</strong> 3rd Ave N Hub. Serving Saskatchewan &amp; Eastern Alberta. Dock open Mon–Fri 8:30 AM – 5:00 PM CST.
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </section>
            )}

            {/* Slice 03: Side-by-Side DO & DON'T Comparison (id: guide.toc[2].id) */}
            <section
              id={guide.toc[2]?.id || 'section-03'}
              className="scroll-mt-28 space-y-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    03
                  </span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    {guide.dosAndDonts.doTitle} &amp; {guide.dosAndDonts.dontTitle}
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Field Discipline
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DO Card */}
                <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="success" className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                        {guide.dosAndDonts.doBadge} — RECOMMENDED PRACTICES
                      </Badge>
                      <Check className="w-4 h-4 text-[#244A29]" />
                    </div>

                    <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                      {guide.dosAndDonts.doTitle}
                    </h3>
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      {guide.dosAndDonts.doIntro}
                    </p>

                    <ul className="space-y-2.5 text-xs text-[#5E5A54]">
                      {guide.dosAndDonts.dos.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#244A29] font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[11px] text-[#244A29] font-mono">
                    {guide.dosAndDonts.doFooter}
                  </div>
                </div>

                {/* DON'T Card */}
                <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="destructive" className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                        {guide.dosAndDonts.dontBadge} — COMMON MISTAKES
                      </Badge>
                      <X className="w-4 h-4 text-[#8B2627]" />
                    </div>

                    <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                      {guide.dosAndDonts.dontTitle}
                    </h3>
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      {guide.dosAndDonts.dontIntro}
                    </p>

                    <ul className="space-y-2.5 text-xs text-[#5E5A54]">
                      {guide.dosAndDonts.donts.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#8B2627] font-bold mt-0.5">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[11px] text-[#8B2627] font-mono">
                    {guide.dosAndDonts.dontFooter}
                  </div>
                </div>
              </div>
            </section>

            {/* Slice 04: Technical Engineering Matrix & Table (id: guide.toc[3].id) */}
            <section
              id={guide.toc[3]?.id || 'section-04'}
              className="scroll-mt-28 space-y-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    04
                  </span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    {guide.technicalSection.title}
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  {guide.technicalSection.subtitle}
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden">
                <div className="p-6 border-b border-[#E7E5E0] bg-[#FAF9F6] space-y-1">
                  <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                    {guide.technicalSection.title}
                  </h3>
                  <p className="text-xs text-[#73706B] leading-relaxed">
                    {guide.technicalSection.description}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF9F6] border-b border-[#E7E5E0] text-[#73706B] uppercase font-mono text-[10px] tracking-wider">
                        {guide.technicalSection.tableHeaders.map((head, idx) => (
                          <th key={idx} className="py-3 px-4 font-semibold">
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E5E0]">
                      {guide.technicalSection.tableRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF9F6]/50 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-[#1C1A17]">
                            {row.col1}
                          </td>
                          <td className="py-3.5 px-4 text-[#5E5A54] font-mono">
                            {row.col2}
                          </td>
                          <td className="py-3.5 px-4 text-[#5E5A54]">
                            {row.col3}
                          </td>
                          <td className="py-3.5 px-4 text-[#73706B]">
                            {row.col4}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-[#FAF9F6] border-t border-[#E7E5E0] text-xs space-y-1">
                  <div className="font-mono text-[11px] font-semibold text-[#9B7A4F] uppercase">
                    {guide.technicalSection.calloutTitle}
                  </div>
                  <p className="text-[#5E5A54] leading-relaxed">
                    {guide.technicalSection.calloutText}
                  </p>
                </div>
              </div>
            </section>

            {/* Slice 05: On-Site Interactive Field Checklist (id: guide.toc[4].id) */}
            <section
              id={guide.toc[4]?.id || 'section-05'}
              className="scroll-mt-28 space-y-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    05
                  </span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    {guide.checklist.title}
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Job-Site Verification
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#F0EFEA] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#9B7A4F] uppercase tracking-wider block">
                      ARCHITECTURAL FIELD SHEET · {guide.checklist.docRef}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                      {guide.checklist.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#73706B]">
                      Progress: <strong className="text-[#1C1A17]">{completedCount}</strong> of {totalTasks} Completed
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#EAE6DF] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#9B7A4F] h-full transition-all duration-300"
                    style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
                  />
                </div>

                {/* Interactive Task Rows */}
                <div className="space-y-3 pt-1">
                  {guide.checklist.tasks.map((task) => {
                    const isChecked = !!checkedTasks[task.id];
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-start gap-3 p-3 rounded-xs border cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#FAF8F5] border-[#9B7A4F]/40 text-[#1C1A17]'
                            : 'bg-white border-[#E7E5E0] text-[#5E5A54] hover:border-[#1C1A17]/30'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 text-[#9B7A4F] focus:outline-hidden"
                          aria-label={isChecked ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#9B7A4F]" />
                          ) : (
                            <Square className="w-4 h-4 text-[#C4C0B6]" />
                          )}
                        </button>
                        <div className="flex-1 text-xs">
                          <span className="font-mono text-[10px] text-[#8C8880] uppercase tracking-wider block">
                            [{task.period}]
                          </span>
                          <span className={isChecked ? 'line-through text-[#8C8880]' : 'text-[#1C1A17]'}>
                            {task.task}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#9B7A4F] text-[11px] text-[#73706B] flex items-center justify-between">
                  <span>{guide.checklist.note}</span>
                  <button
                    type="button"
                    onClick={() => setIsChecklistOpen(true)}
                    className="text-[#9B7A4F] font-mono text-[10px] uppercase font-semibold hover:underline shrink-0 ml-3"
                  >
                    Open Printable Worksheet →
                  </button>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Right Column (30%): Architectural Plates Moodboard Collage */}
          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[30%] space-y-8 order-3"
          >
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
                      className="object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="pt-2.5 pb-1 px-1">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#9B7A4F] block font-semibold">
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
          </motion.aside>
        </div>
      </main>

      {/* Full-Width Dark Charcoal Bottom Banner */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#181715] text-[#F9F8F6] py-12 px-6 sm:px-12 mt-16 border-t border-[#292621]"
      >
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
            className="px-6 py-3.5 bg-[#9B7A4F] text-[#F9F8F6] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#85653E] transition-colors rounded-xs shadow-sm cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>[ {guide.banner.cta} ]</span>
          </button>
        </div>
      </motion.section>

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
                    Status: {completedCount} of {totalTasks} Completed
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
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Worksheet</span>
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
