'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import MeasurementModal from '@/components/MeasurementModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Ruler,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  Sliders,
  CheckSquare,
  Square,
  Compass,
  Printer,
  Maximize2,
  Download,
  Info,
  Check,
  X,
  FileText,
} from 'lucide-react';

interface HowToMeasureGuideProps {
  onBackToGuides: () => void;
  onNavigate?: (view: string) => void;
}

const MEASURE_TOC = [
  { id: 'tools-prep', num: '01', title: 'Essential Tools' },
  { id: 'wall-fillers', num: '02', title: 'Wall Runs & Fillers' },
  { id: 'heights-ceilings', num: '03', title: 'Heights & Ceilings' },
  { id: 'doors-windows', num: '04', title: 'Doors, Windows & Trim' },
  { id: 'utilities-lines', num: '05', title: 'Utilities & Centerlines' },
  { id: 'filler-calc', num: '06', title: 'Interactive Calculator' },
  { id: 'focus-tabs', num: '07', title: 'Engineering Tabs' },
  { id: 'dos-donts', num: '08', title: "Field Do's & Don'ts" },
  { id: 'clearance-matrix', num: '09', title: 'Clearance Matrix' },
  { id: 'field-checklist', num: '10', title: 'On-Site Checklist' },
];

export default function HowToMeasureGuide({ onBackToGuides, onNavigate }: HowToMeasureGuideProps) {
  const [activeSection, setActiveSection] = useState('tools-prep');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string; caption: string } | null>(null);

  // Active Focus Tab State
  const [activeTab, setActiveTab] = useState<'wall-runs' | 'heights' | 'casing-openings' | 'utilities'>('wall-runs');

  // Interactive Filler Calculator State
  const [wallWidth, setWallWidth] = useState<number>(132); // 132 inches (11 ft)
  const [cabinetRun, setCabinetRun] = useState<number[]>([36, 30, 24, 36]); // 126 inches

  // On-Site Interactive Checklist State
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    task1: true,
    task2: true,
    task3: false,
    task4: false,
    task5: false,
    task6: false,
  });

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const totalTaskCount = Object.keys(completedTasks).length;

  // Scroll spy
  useEffect(() => {
    const sectionIds = MEASURE_TOC.map((t) => t.id);
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

  const totalCabinetWidth = cabinetRun.reduce((acc, curr) => acc + curr, 0);
  const remainingGap = Math.max(0, wallWidth - totalCabinetWidth);
  const fillerPerSide = remainingGap / 2;

  const addCabinet = (width: number) => {
    setCabinetRun((prev) => [...prev, width]);
  };

  const removeCabinet = (index: number) => {
    setCabinetRun((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCabinets = () => {
    setCabinetRun([]);
  };

  return (
    <div className="guides-hb min-h-screen bg-[#FFFFFF] text-[#1C1A17] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      {/* Top Navbar */}
      <Navbar
        currentView="how-to-measure-for-cabinets"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateToContact={() => onNavigate?.('contact')}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-12">
        {/* Top Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:mb-16 border-b border-[#E7E5E0] pb-10"
        >
          {/* Subtle Back to Guides link */}
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
              {/* Planning Guide Tag */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono uppercase tracking-[0.16em] text-[#9B7A4F]">
                <span>PLANNING GUIDE</span>
                <span className="text-[#C4C0B6]">·</span>
                <span>6 MIN READ</span>
                <span className="text-[#C4C0B6]">·</span>
                <span>VANSTRO PLAN §2.4</span>
              </div>

              {/* Large Serif Title */}
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1A17] tracking-tight leading-[1.08]">
                Measuring for Cabinets
              </h1>

              {/* Authentic Subtitle */}
              <p className="text-sm sm:text-base text-[#73706B] leading-relaxed max-w-2xl font-normal">
                Cabinet widths, heights, clearances and fillers. Step-by-step VanStro guidance for planning, ordering and installing your bespoke modular cabinetry.
              </p>
            </div>

            {/* Quick Action Link */}
            <div className="shrink-0 flex items-center gap-3 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#181715] text-[#F9F8F6] text-xs font-mono uppercase tracking-widest hover:bg-[#9B7A4F] transition-all rounded-xs shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Measurement Grid PDF</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* 3-Column Asymmetric Layout (18% : 52% : 30%) */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start w-full">
          {/* Left Column (18% width): Sticky Table of Contents */}
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
                  {MEASURE_TOC.map((item) => {
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
                            isActive ? 'text-[#9B7A4F] font-semibold' : 'text-[#A09D96]'
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

              {/* Minimal metadata footnote */}
              <div className="pt-6 border-t border-[#E7E5E0] space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-[#9E9B94] font-mono">
                  Engineering Standard
                </p>
                <p className="text-xs text-[#73706B] leading-relaxed">
                  VanStro Architectural Joinery Standard §2.4 (Clearance &amp; Scribing)
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9B7A4F]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B7A4F]" />
                    Field Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Middle Column (52% width): Main Content Slices */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[52%] space-y-16 order-1 lg:order-2"
          >
            {/* Slice 01: Essential Tools & Preparation */}
            <section id="tools-prep" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">01</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Essential Tools &amp; Preparation
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Field Readiness
                </span>
              </div>

              <p className="text-sm text-[#5E5A54] leading-relaxed">
                Before measuring your kitchen or vanity alcove, gather dedicated precision tools. Accuracy at the 1/16&quot; or 1/8&quot; level prevents costly layout misalignments during installation and ensures seamless filler scribing.
              </p>

              {/* 4 Sliced Tool Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <Card className="border-[#E7E5E0] bg-white hover:border-[#1C1A17] hover:shadow-xs transition-all duration-300 rounded-lg flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center text-sm font-semibold text-[#9B7A4F]">
                        <Ruler className="w-4 h-4" />
                      </div>
                      <Badge variant="copper" className="text-[9px] font-mono">
                        Primary
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-serif-luxury font-medium text-[#1C1A17]">
                      25ft+ Rigid Steel Tape
                    </CardTitle>
                    <CardDescription className="text-xs text-[#5E5A54] leading-relaxed">
                      Use a locking steel tape with a wide, non-sagging blade. Avoid flexible cloth tapes which stretch and sag over long wall runs.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="px-5 py-2.5 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono flex items-center justify-between">
                    <span>Precision: ±1/16&quot;</span>
                    <span className="text-[#9B7A4F]">Base &amp; Eye Level</span>
                  </CardFooter>
                </Card>

                <Card className="border-[#E7E5E0] bg-white hover:border-[#1C1A17] hover:shadow-xs transition-all duration-300 rounded-lg flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center text-sm font-semibold text-[#9B7A4F]">
                        <Compass className="w-4 h-4" />
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-mono">
                        Alignment
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-serif-luxury font-medium text-[#1C1A17]">
                      Spirit Level or 360° Laser
                    </CardTitle>
                    <CardDescription className="text-xs text-[#5E5A54] leading-relaxed">
                      A 2ft or 4ft spirit level (or cross-line laser) identifies floor high spots and verifies wall plumbness before placing runs.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="px-5 py-2.5 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono flex items-center justify-between">
                    <span>Datum Check</span>
                    <span className="text-[#9B7A4F]">Detects Slope</span>
                  </CardFooter>
                </Card>

                <Card className="border-[#E7E5E0] bg-white hover:border-[#1C1A17] hover:shadow-xs transition-all duration-300 rounded-lg flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center text-sm font-semibold text-[#9B7A4F]">
                        <Layers className="w-4 h-4" />
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-mono">
                        Documentation
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-serif-luxury font-medium text-[#1C1A17]">
                      Grid Graph Paper &amp; Legend
                    </CardTitle>
                    <CardDescription className="text-xs text-[#5E5A54] leading-relaxed">
                      Sketch a top-down floor plan view. Mark every wall opening, pipe chase, HVAC register, and electrical switch box.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="px-5 py-2.5 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono flex items-center justify-between">
                    <span>Scale: ¼&quot; = 1 Foot</span>
                    <span className="text-[#9B7A4F]">Top-Down Plan</span>
                  </CardFooter>
                </Card>

                <Card className="border-[#E7E5E0] bg-white hover:border-[#1C1A17] hover:shadow-xs transition-all duration-300 rounded-lg flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center text-sm font-semibold text-[#9B7A4F]">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-mono">
                        Verification
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-serif-luxury font-medium text-[#1C1A17]">
                      Multi-Angle Field Photos
                    </CardTitle>
                    <CardDescription className="text-xs text-[#5E5A54] leading-relaxed">
                      Capture wide-angle photographs of every wall run, ceiling soffits, floor vents, and exposed pipework for dealer CAD checks.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="px-5 py-2.5 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono flex items-center justify-between">
                    <span>Clearance Review</span>
                    <span className="text-[#9B7A4F]">Visual Archive</span>
                  </CardFooter>
                </Card>
              </div>
            </section>

            {/* Slice 02: Wall Runs, Fixed-Width Principle & Fillers */}
            <section id="wall-fillers" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">02</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Wall Runs, Gaps &amp; Fillers
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  The Modular Formula
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 sm:p-7 rounded-sm space-y-5">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F] block font-semibold">
                    The Fixed-Width Cabinet Principle
                  </span>
                  <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                    Why Cabinets Don&apos;t Stretch to Every Wall
                  </h3>
                  <p className="text-sm text-[#5E5A54] leading-relaxed">
                    VanStro cabinetry is precision-engineered in standard modular imperial increments: <strong>12&quot;, 15&quot;, 18&quot;, 21&quot;, 24&quot;, 27&quot;, 30&quot;, 36&quot;, 42&quot;, and 48&quot;</strong>. Because custom cabinet box widths are not fabricated on a one-off basis, residential walls rarely equal an exact multiple of cabinet sizes.
                  </p>
                </div>

                {/* Mathematical Formula Callout */}
                <div className="p-5 bg-[#FAF9F6] border border-[#E7E5E0] rounded-sm space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F] font-semibold block">
                    Field Scribing Formula:
                  </span>
                  <div className="text-lg sm:text-xl text-[#1C1A17] font-mono font-semibold tracking-tight">
                    Remaining Gap = Total Wall Length − ∑(Cabinet Widths)
                  </div>
                  <p className="text-xs text-[#73706B] leading-relaxed">
                    Divide the remaining gap evenly across both ends (left and right wall runs) using standard <strong>3&quot; (WF330)</strong> or <strong>6&quot; (WF630)</strong> architectural fillers, scribed to the wall contour on site.
                  </p>
                </div>

                {/* Corner Squaring Test: 3-4-5 Rule */}
                <div className="p-4 border-l-2 border-[#9B7A4F] bg-[#FAF8F5] text-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#9B7A4F]">
                      Pro Carpenter Tip
                    </span>
                    <span className="text-[#C4C0B6]">·</span>
                    <span className="font-medium text-[#1C1A17]">The 3-4-5 Squaring Method</span>
                  </div>
                  <p className="text-[#5E5A54] leading-relaxed">
                    Drywall corners in homes are rarely an exact 90°. Measure 3 feet along one wall and 4 feet along the perpendicular wall. The diagonal across the marks must equal exactly 5 feet. If it varies by more than ¼&quot;, plan for a wider 3&quot; or 6&quot; filler so cabinet doors do not bind against out-of-square walls.
                  </p>
                </div>
              </div>
            </section>

            {/* Slice 03: Heights & Ceiling Variations: The Rule of 3 */}
            <section id="heights-ceilings" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">03</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Ceiling &amp; Height Variations
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  The Rule of 3
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F] font-semibold block">
                      Ceiling Leveling
                    </span>
                    <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                      Measure 3 Distinct Spots Across Wall
                    </h3>
                    <p className="text-xs text-[#5E5A54] leading-relaxed">
                      Floors and ceilings in Canadian homes settle over seasons. Always measure the height from the subfloor/finished floor to the ceiling at the <strong>left corner</strong>, <strong>center of the wall run</strong>, and <strong>right corner</strong>.
                    </p>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#9B7A4F] text-[11px] text-[#73706B] mt-2">
                    <strong className="text-[#1C1A17]">Golden Rule:</strong> The <em>lowest</em> ceiling measurement establishes the top datum line for tall pantry units and upper wall cabinets.
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F] font-semibold block">
                      Trim &amp; Soffit Allowance
                    </span>
                    <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                      Crown Moulding &amp; Light Rails
                    </h3>
                    <p className="text-xs text-[#5E5A54] leading-relaxed">
                      Leave a minimum <strong>2&quot; to 3&quot; gap</strong> between upper wall cabinets and the ceiling if you intend to install VanStro crown moulding (CM3). Under-cabinet LED light rails (LR3) require <strong>1¼&quot;</strong> bottom clearance.
                    </p>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#1C1A17] text-[11px] text-[#73706B] mt-2">
                    <strong className="text-[#1C1A17]">Standard Height:</strong> Standard base cabinet height is 34½&quot; without countertop, reaching 36&quot; with 1½&quot; stone countertop installed.
                  </div>
                </div>
              </div>
            </section>

            {/* Slice 04: Windows, Doors & Trim Clearances */}
            <section id="doors-windows" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">04</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Window, Door &amp; Trim Clearances
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Casings &amp; Swings
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 sm:p-7 rounded-sm space-y-5">
                <p className="text-sm text-[#5E5A54] leading-relaxed">
                  Never measure only the window glass or interior door frame. <strong>Always measure from the outermost edge of the decorative casing/trim</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF9F6] border border-[#E7E5E0] rounded-sm space-y-2">
                    <span className="font-mono text-[10px] text-[#9B7A4F] uppercase font-semibold">
                      Window Sills
                    </span>
                    <h4 className="font-serif-luxury text-base font-medium text-[#1C1A17]">
                      Sill Height vs Countertop
                    </h4>
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      Window sills behind kitchen sinks must sit at least <strong>38&quot; above finished floor level (AFF)</strong> to comfortably clear the standard 36&quot; countertop plus 1½&quot; backsplash lip.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF9F6] border border-[#E7E5E0] rounded-sm space-y-2">
                    <span className="font-mono text-[10px] text-[#9B7A4F] uppercase font-semibold">
                      Door Swing Radii
                    </span>
                    <h4 className="font-serif-luxury text-base font-medium text-[#1C1A17]">
                      Handle Collision Clearance
                    </h4>
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      Allow at least <strong>3&quot; of filler</strong> between a cabinet run and an adjacent wall opening so door hardware or deep handles do not bang into door casings when pulled open 90°.
                    </p>
                  </div>
                </div>

                {/* Delivery clearance note */}
                <div className="p-3.5 bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#9B7A4F] shrink-0 mt-0.5" />
                  <p className="text-[#5E5A54] leading-relaxed">
                    <strong>Delivery Pathway Note:</strong> Ensure all hallways and entry doorways along the delivery route are at least 36&quot; wide to safely pass fully assembled pantry cabinets, refrigerators, and large island pieces.
                  </p>
                </div>
              </div>
            </section>

            {/* Slice 05: Utilities & Plumbing Centerlines */}
            <section id="utilities-lines" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">05</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Utilities &amp; Plumbing Centerlines
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Mechanical Mapping
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 sm:p-7 rounded-sm space-y-5">
                <p className="text-sm text-[#5E5A54] leading-relaxed">
                  Locating services early prevents expensive plumbing or electrical relocations. Measure from the nearest corner wall to the exact <strong>centerline (CL)</strong> of each rough-in:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 border border-[#E7E5E0] bg-[#FAF9F6] rounded-sm space-y-1.5">
                    <span className="font-mono text-[10px] text-[#9B7A4F] font-semibold uppercase">
                      01 / Sink Plumbing
                    </span>
                    <div className="font-medium text-[#1C1A17] text-sm">Drain Outlet &amp; Shutoffs</div>
                    <div className="text-[#73706B] text-xs leading-relaxed">
                      Center of 1½&quot; or 2&quot; drain pipe. Confirm height is 16&quot;–18&quot; above floor. Plumbing must fall within middle 18&quot; of sink base.
                    </div>
                  </div>

                  <div className="p-4 border border-[#E7E5E0] bg-[#FAF9F6] rounded-sm space-y-1.5">
                    <span className="font-mono text-[10px] text-[#9B7A4F] font-semibold uppercase">
                      02 / Range / Cooktop
                    </span>
                    <div className="font-medium text-[#1C1A17] text-sm">240V Outlet or Gas Line</div>
                    <div className="text-[#73706B] text-xs leading-relaxed">
                      Mark exact center from corner. Outlets and gas valves must seat within the recessed cavity at the rear base of the range.
                    </div>
                  </div>

                  <div className="p-4 border border-[#E7E5E0] bg-[#FAF9F6] rounded-sm space-y-1.5">
                    <span className="font-mono text-[10px] text-[#9B7A4F] font-semibold uppercase">
                      03 / Range Hood Duct
                    </span>
                    <div className="font-medium text-[#1C1A17] text-sm">Exhaust Vent Centerline</div>
                    <div className="text-[#73706B] text-xs leading-relaxed">
                      Mark ceiling or wall penetration (typically 6&quot; round or 3¼&quot;×10&quot; duct) aligned directly above the cooktop centerline.
                    </div>
                  </div>

                  <div className="p-4 border border-[#E7E5E0] bg-[#FAF9F6] rounded-sm space-y-1.5">
                    <span className="font-mono text-[10px] text-[#9B7A4F] font-semibold uppercase">
                      04 / Dishwasher Cavity
                    </span>
                    <div className="font-medium text-[#1C1A17] text-sm">Water Inlet &amp; Drain Loop</div>
                    <div className="text-[#73706B] text-xs leading-relaxed">
                      Dishwashers slide directly on the subfloor with no cabinet box. Standard opening is 24&quot; wide, placed immediately adjacent to the sink base.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Slice 06: Interactive Modular Wall Run & Filler Calculator */}
            <section id="filler-calc" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">06</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Interactive Wall Run &amp; Filler Calculator
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Live Scribing Engine
                </span>
              </div>

              <Card className="border-[#E7E5E0] bg-white rounded-lg shadow-xs overflow-hidden">
                <CardHeader className="p-6 sm:p-7 pb-4 space-y-1.5 border-b border-[#F0EFEA] bg-[#FAF9F6]">
                  <div className="flex items-center gap-2">
                    <Badge variant="copper" className="text-[9px] font-mono">
                      Field Scribing Engine
                    </Badge>
                    <span className="text-[#C4C0B6]">/</span>
                    <span className="text-xs font-mono text-[#73706B]">
                      VanStro Modular Imperial Sizing
                    </span>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-serif-luxury text-[#1C1A17]">
                    Calculate Cabinet Combinations &amp; Scribe Fillers
                  </CardTitle>
                  <CardDescription className="text-xs text-[#5E5A54] leading-relaxed pt-0.5">
                    Enter your total wall measurement in inches, pick VanStro standard modular cabinets, and compute the exact filler split for each side.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 sm:p-7 space-y-6">
                  {/* Wall Width Input Slice */}
                  <div className="p-4 bg-[#FAF9F6] border border-[#E7E5E0] rounded-sm space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#1C1A17] font-semibold flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#9B7A4F]" />
                        <span>Total Wall Length (Corner to Corner):</span>
                      </label>
                      <Badge variant="secondary" className="font-mono text-xs font-semibold text-[#9B7A4F]">
                        {(wallWidth / 12).toFixed(2)} feet / {wallWidth}&quot;
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="60"
                        max="240"
                        step="1"
                        value={wallWidth}
                        onChange={(e) => setWallWidth(Number(e.target.value))}
                        className="w-full accent-[#181715] cursor-pointer"
                      />
                      <div className="relative shrink-0 w-24">
                        <Input
                          type="number"
                          min="48"
                          max="300"
                          value={wallWidth}
                          onChange={(e) => setWallWidth(Math.max(24, Number(e.target.value)))}
                          className="text-center font-mono font-semibold pr-6 text-xs h-9 bg-white"
                        />
                        <span className="absolute right-2 top-2.5 text-[10px] text-[#8C8880] font-mono pointer-events-none">in</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Wall Simulation Block */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#73706B]">
                      <span>Wall Run Visual Elevation</span>
                      <span>Total: {wallWidth}&quot;</span>
                    </div>

                    <div className="w-full h-12 bg-[#EAE6DF] rounded-xs border border-[#D5D0C5] p-1 flex items-stretch gap-1 overflow-hidden relative">
                      {/* Left Scribe Filler */}
                      {totalCabinetWidth <= wallWidth && fillerPerSide > 0 && (
                        <div
                          style={{ width: `${(fillerPerSide / wallWidth) * 100}%` }}
                          className="bg-[#C5A069] h-full flex items-center justify-center text-[10px] font-mono text-white font-semibold truncate px-1 rounded-2xs"
                          title={`Left Filler: ${fillerPerSide.toFixed(1)}"`}
                        >
                          {fillerPerSide >= 1.5 ? `${fillerPerSide.toFixed(1)}"` : ''}
                        </div>
                      )}

                      {/* Cabinets */}
                      {cabinetRun.map((width, idx) => (
                        <div
                          key={idx}
                          style={{ width: `${(width / wallWidth) * 100}%` }}
                          className="bg-[#181715] text-[#F9F8F6] h-full flex items-center justify-center text-[11px] font-mono font-medium truncate px-1 rounded-2xs border border-white/10"
                          title={`Cabinet ${idx + 1}: ${width}"`}
                        >
                          {width}&quot;
                        </div>
                      ))}

                      {/* Right Scribe Filler */}
                      {totalCabinetWidth <= wallWidth && fillerPerSide > 0 && (
                        <div
                          style={{ width: `${(fillerPerSide / wallWidth) * 100}%` }}
                          className="bg-[#C5A069] h-full flex items-center justify-center text-[10px] font-mono text-white font-semibold truncate px-1 rounded-2xs ml-auto"
                          title={`Right Filler: ${fillerPerSide.toFixed(1)}"`}
                        >
                          {fillerPerSide >= 1.5 ? `${fillerPerSide.toFixed(1)}"` : ''}
                        </div>
                      )}

                      {/* Overrun indicator */}
                      {totalCabinetWidth > wallWidth && (
                        <div className="w-full bg-[#8B2627] text-white h-full flex items-center justify-center text-xs font-mono font-semibold">
                          OVERRUN: Exceeds Wall by {(totalCabinetWidth - wallWidth).toFixed(1)}&quot;
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cabinet Sequence Chips */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#8C8880]">
                        Cabinet Sequence in this Run:
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#1C1A17]">
                          Run Sum: <strong className="font-semibold text-sm">{totalCabinetWidth}&quot;</strong>
                        </span>
                        {cabinetRun.length > 0 && (
                          <button
                            type="button"
                            onClick={clearCabinets}
                            className="text-[11px] font-mono text-[#8B2627] hover:underline cursor-pointer"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 min-h-12 p-3 bg-[#FAF9F6]/80 border border-[#E7E5E0] rounded-sm">
                      {cabinetRun.map((width, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E7E5E0] text-xs font-mono rounded-xs shadow-2xs group hover:border-[#1C1A17] transition-colors"
                        >
                          <span className="font-semibold text-[#1C1A17]">{width}&quot; Module</span>
                          <button
                            type="button"
                            onClick={() => removeCabinet(idx)}
                            className="text-[#A09D96] hover:text-[#8B2627] text-xs cursor-pointer ml-1 transition-colors"
                            title="Remove cabinet"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {cabinetRun.length === 0 && (
                        <span className="text-xs text-[#A09D96] italic">
                          Click below to add standard cabinet modules to this wall run.
                        </span>
                      )}
                    </div>

                    {/* Add Standard Modules Buttons */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#8C8880]">Add VanStro Standard Module:</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {[12, 15, 18, 21, 24, 27, 30, 36, 42, 48].map((size) => (
                          <Button
                            key={size}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addCabinet(size)}
                            className="h-7 text-xs font-mono px-2.5 bg-white hover:bg-[#181715] hover:text-white transition-colors"
                          >
                            + {size}&quot;
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Result Display Slice */}
                  {totalCabinetWidth > wallWidth ? (
                    <Alert variant="destructive" className="rounded-sm">
                      <AlertTriangle className="w-4 h-4 text-[#8B2627]" />
                      <AlertTitle>Overrun: Cabinets Exceed Wall Space</AlertTitle>
                      <AlertDescription>
                        Cabinet sum ({totalCabinetWidth}&quot;) is larger than total wall width ({wallWidth}&quot;) by {(totalCabinetWidth - wallWidth).toFixed(1)}&quot;. Remove or downsize modules to fit within the room boundary.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert variant="success" className="rounded-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#244A29]" />
                      <div className="flex items-baseline justify-between w-full border-b border-[#244A29]/20 pb-2 mb-2">
                        <AlertTitle className="mb-0 text-[#244A29]">Recommended Wall Filler Split</AlertTitle>
                        <span className="text-xs font-mono font-semibold text-[#244A29]">
                          Remaining Gap: {remainingGap.toFixed(2)}&quot;
                        </span>
                      </div>
                      <AlertDescription>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                          <div className="p-3 bg-white border border-[#244A29]/20 rounded-xs">
                            <span className="text-[10px] font-mono uppercase text-[#73706B] block">Left Wall Scribe:</span>
                            <span className="text-base font-semibold text-[#1C1A17] font-mono block">
                              {fillerPerSide.toFixed(2)}&quot;
                            </span>
                            <span className="text-[10px] text-[#73706B] block">
                              (Cut from {fillerPerSide <= 3 ? '3" WF330' : '6" WF630'} filler)
                            </span>
                          </div>
                          <div className="p-3 bg-white border border-[#244A29]/20 rounded-xs">
                            <span className="text-[10px] font-mono uppercase text-[#73706B] block">Right Wall Scribe:</span>
                            <span className="text-base font-semibold text-[#1C1A17] font-mono block">
                              {fillerPerSide.toFixed(2)}&quot;
                            </span>
                            <span className="text-[10px] text-[#73706B] block">
                              (Cut from {fillerPerSide <= 3 ? '3" WF330' : '6" WF630'} filler)
                            </span>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Slice 07: Engineering Focus Tabs */}
            <section id="focus-tabs" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">07</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Measurement Focus Areas
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Deep Dive Slices
                </span>
              </div>

              {/* Tab Selector Buttons */}
              <div className="flex flex-wrap gap-2 border-b border-[#E7E5E0] pb-2">
                {[
                  { id: 'wall-runs', label: 'Wall Runs & Fillers' },
                  { id: 'heights', label: 'Ceilings & Heights' },
                  { id: 'casing-openings', label: 'Trim & Casings' },
                  { id: 'utilities', label: 'Utilities & Mechanical' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                      activeTab === t.id
                        ? 'bg-[#181715] text-white font-medium'
                        : 'bg-[#FAF9F6] text-[#73706B] hover:text-[#1C1A17] border border-[#E7E5E0]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Wall Runs & Fillers */}
              {activeTab === 'wall-runs' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B7A4F]">
                      Module Scribing Specifications
                    </span>
                    <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                      Computing Wall Gaps and Scribing Allowances
                    </h3>
                    <p className="text-xs text-[#5E5A54] leading-relaxed">
                      Because walls are never perfectly plumb or exact multiples of cabinet widths, standard architectural fillers are required to absorb dimensional variances.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-[#F0EFEA]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Modular Widths</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">12&quot; to 48&quot;</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Standard Fillers</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">3&quot; &amp; 6&quot;</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Minimum Gap</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">1½&quot; per corner</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Scribing Line</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">Cut on-site</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#9B7A4F] rounded-xs space-y-1">
                      <strong className="text-[#1C1A17] block font-mono text-[11px] uppercase">Filler Formula:</strong>
                      <p className="text-[#5E5A54]">Remaining Gap = Total Wall Length − ∑(Cabinet Widths). Split evenly across both end walls.</p>
                    </div>
                    <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#181715] rounded-xs space-y-1">
                      <strong className="text-[#1C1A17] block font-mono text-[11px] uppercase">Corner Tolerance:</strong>
                      <p className="text-[#5E5A54]">Check if walls meet at true 90°. Use a 3-4-5 framing triangle to detect out-of-square walls.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Ceilings & Heights */}
              {activeTab === 'heights' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B7A4F]">
                      Vertical Datum Specifications
                    </span>
                    <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                      Rule of 3: Detecting Floor and Ceiling Slope
                    </h3>
                    <p className="text-xs text-[#5E5A54] leading-relaxed">
                      Ceilings in Canadian homes settle over seasons. The lowest ceiling height establishes the maximum datum elevation for tall pantry towers and upper wall units.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-[#F0EFEA]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Base Cabinet Height</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">34½&quot; (36&quot; w/ stone)</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Upper Wall Heights</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">30&quot;, 36&quot;, 42&quot;</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Countertop Clearance</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">18&quot; Standard</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Crown Moulding Gap</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">Leave 2&quot;–3&quot;</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#9B7A4F] rounded-xs space-y-1">
                      <strong className="text-[#1C1A17] block font-mono text-[11px] uppercase">Benchmark Datum:</strong>
                      <p className="text-[#5E5A54]">Locate the highest spot on the floor along the cabinet run. Set your base cabinet level from this high point.</p>
                    </div>
                    <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#181715] rounded-xs space-y-1">
                      <strong className="text-[#1C1A17] block font-mono text-[11px] uppercase">Soffit Check:</strong>
                      <p className="text-[#5E5A54]">Measure underside of drywalled bulkheads in multiple spots to verify level clearance before ordering tall units.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Trim & Casings */}
              {activeTab === 'casing-openings' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B7A4F]">
                      Openings &amp; Clearances
                    </span>
                    <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                      Door Swings and Window Sill Offsets
                    </h3>
                    <p className="text-xs text-[#5E5A54] leading-relaxed">
                      Always measure to the outermost edge of window and door casings. Cabinet doors and pull handles require clearance to open 90° without striking trim.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-[#F0EFEA]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Window Sill Min</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">38&quot; AFF</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Casing Offset</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">Min 3&quot; Filler</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Countertop Overhang</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">1½&quot; Standard</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Door Swing Radius</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">Check 90° clearance</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#9B7A4F] rounded-xs space-y-1">
                      <strong className="text-[#1C1A17] block font-mono text-[11px] uppercase">Trim Measurement:</strong>
                      <p className="text-[#5E5A54]">Include the full profile of decorative mouldings. Never measure glass or jamb only.</p>
                    </div>
                    <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#181715] rounded-xs space-y-1">
                      <strong className="text-[#1C1A17] block font-mono text-[11px] uppercase">Appliance Path:</strong>
                      <p className="text-[#5E5A54]">Ensure doorway width allows 36&quot; refrigerators and range units to pass through during delivery.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Utilities & Mechanical */}
              {activeTab === 'utilities' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B7A4F]">
                      Rough-In Coordinates
                    </span>
                    <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                      Centerlines &amp; Service Openings
                    </h3>
                    <p className="text-xs text-[#5E5A54] leading-relaxed">
                      Rough-in plumbing, gas, and power lines must align with the specific internal service openings of your modular cabinets and appliances.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-[#F0EFEA]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Sink Drain Height</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">16&quot;–18&quot; AFF</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Plumbing Zone</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">Middle 18&quot; of SB</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Dishwasher Opening</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">24&quot; Cavity</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#8C8880] block">Hood Vent Duct</span>
                      <span className="text-xs font-mono font-medium text-[#1C1A17]">6&quot; Round / 3¼×10&quot;</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#9B7A4F] rounded-xs space-y-1">
                      <strong className="text-[#1C1A17] block font-mono text-[11px] uppercase">Service Chases:</strong>
                      <p className="text-[#5E5A54]">Mark the locations of any protruding stack pipes or HVAC bulkheads that require scribing cabinet backs.</p>
                    </div>
                    <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#181715] rounded-xs space-y-1">
                      <strong className="text-[#1C1A17] block font-mono text-[11px] uppercase">Shutoff Accessibility:</strong>
                      <p className="text-[#5E5A54]">Ensure quarter-turn shutoff valves are mounted within comfortable reach inside the sink cabinet box.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </section>

            {/* Slice 08: Do's and Don'ts Best Practices */}
            <section id="dos-donts" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">08</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Field Measuring Best Practices
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Do&apos;s &amp; Don&apos;ts
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DO Card */}
                <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="success" className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                        DO — RECOMMENDED PRACTICES
                      </Badge>
                      <Check className="w-4 h-4 text-[#244A29]" />
                    </div>

                    <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                      Measuring Best Practices
                    </h3>
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      Follow these verification steps before ordering cabinetry modules:
                    </p>

                    <ul className="space-y-2.5 text-xs text-[#5E5A54]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#244A29] font-bold mt-0.5">✓</span>
                        <span>Measure every wall corner-to-corner along the baseboard and at 36&quot; countertop working height.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#244A29] font-bold mt-0.5">✓</span>
                        <span>Measure floor-to-ceiling in at least 3 distinct spots across the run to detect slope.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#244A29] font-bold mt-0.5">✓</span>
                        <span>Mark the exact centerline of plumbing drain and water shutoffs from the nearest corner.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#244A29] font-bold mt-0.5">✓</span>
                        <span>Provide high-resolution photos of all wall elevations to your VanStro dealer for layout review.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[11px] text-[#244A29] font-mono">
                    Accurate field measurements eliminate on-site cabinet cutting delays.
                  </div>
                </div>

                {/* DON'T Card */}
                <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="destructive" className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                        DON&apos;T — COMMON MISTAKES
                      </Badge>
                      <X className="w-4 h-4 text-[#8B2627]" />
                    </div>

                    <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                      Common Field Mistakes
                    </h3>
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      Avoid these critical measuring oversights:
                    </p>

                    <ul className="space-y-2.5 text-xs text-[#5E5A54]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#8B2627] font-bold mt-0.5">✕</span>
                        <span>Do not assume drywall corners are perfectly 90° square without checking with a square.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8B2627] font-bold mt-0.5">✕</span>
                        <span>Never measure only to the inside jamb of a doorway or window — always measure to outer trim edge.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8B2627] font-bold mt-0.5">✕</span>
                        <span>Do not forget to account for baseboard heaters, floor registers, or electrical outlet box heights.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8B2627] font-bold mt-0.5">✕</span>
                        <span>Avoid planning cabinets without at least 1½&quot; to 3&quot; of filler adjacent to intersecting walls.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[11px] text-[#8B2627] font-mono">
                    Cabinets ordered without adequate filler clearance cannot open doors fully against walls.
                  </div>
                </div>
              </div>
            </section>

            {/* Slice 09: Standard Modular Dimension & Clearance Matrix Table */}
            <section id="clearance-matrix" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">09</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    Modular Dimension &amp; Clearance Matrix
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Standard Specifications
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden">
                <div className="p-6 border-b border-[#E7E5E0] bg-[#FAF9F6] space-y-1">
                  <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                    Standard Architectural Kitchen Clearances
                  </h3>
                  <p className="text-xs text-[#73706B] leading-relaxed">
                    Standard imperial modular increments used across all VanStro base, wall, and tall pantry cabinetry lines.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF9F6] border-b border-[#E7E5E0] text-[10px] font-mono uppercase tracking-wider text-[#73706B]">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Cabinet Category</th>
                        <th className="py-3 px-4 font-semibold">Standard Widths</th>
                        <th className="py-3 px-4 font-semibold">Standard Depth</th>
                        <th className="py-3 px-4 font-semibold">Recommended Clearance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E5E0]">
                      <tr className="hover:bg-[#FAF9F6]/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-[#1C1A17]">Base Cabinets (B)</td>
                        <td className="py-3.5 px-4 font-mono text-[#5E5A54]">12&quot;, 15&quot;, 18&quot;, 21&quot;, 24&quot;, 27&quot;, 30&quot;, 36&quot;</td>
                        <td className="py-3.5 px-4 font-mono text-[#5E5A54]">24&quot; Box (24¾&quot; with door)</td>
                        <td className="py-3.5 px-4 text-[#73706B]">36&quot; minimum walkway aisle</td>
                      </tr>
                      <tr className="hover:bg-[#FAF9F6]/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-[#1C1A17]">Sink Bases (SB)</td>
                        <td className="py-3.5 px-4 font-mono text-[#5E5A54]">30&quot;, 36&quot;, 42&quot;</td>
                        <td className="py-3.5 px-4 font-mono text-[#5E5A54]">24&quot; Deep</td>
                        <td className="py-3.5 px-4 text-[#73706B]">Plumbing CL within middle 18&quot;</td>
                      </tr>
                      <tr className="hover:bg-[#FAF9F6]/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-[#1C1A17]">Wall Cabinets (W)</td>
                        <td className="py-3.5 px-4 font-mono text-[#5E5A54]">12&quot;, 15&quot;, 18&quot;, 24&quot;, 30&quot;, 36&quot;</td>
                        <td className="py-3.5 px-4 font-mono text-[#5E5A54]">12&quot; Deep Box (12¾&quot; with door)</td>
                        <td className="py-3.5 px-4 text-[#73706B]">18&quot; above finished countertop</td>
                      </tr>
                      <tr className="hover:bg-[#FAF9F6]/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-[#1C1A17]">Tall Pantries (TP)</td>
                        <td className="py-3.5 px-4 font-mono text-[#5E5A54]">18&quot;, 24&quot;, 30&quot;</td>
                        <td className="py-3.5 px-4 font-mono text-[#5E5A54]">24&quot; Deep Box</td>
                        <td className="py-3.5 px-4 text-[#73706B]">2&quot;–3&quot; ceiling crown margin</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-[#FAF9F6] border-t border-[#E7E5E0] text-xs space-y-1">
                  <div className="font-mono text-[11px] font-semibold text-[#9B7A4F] uppercase">
                    VanStro Sizing Guarantee:
                  </div>
                  <p className="text-[#5E5A54] leading-relaxed">
                    All VanStro cabinets are modular imperial units. When your wall run leaves an odd remainder, order a 3&quot; (WF330) or 6&quot; (WF630) filler strip to scribe on site.
                  </p>
                </div>
              </div>
            </section>

            {/* Slice 10: On-Site Interactive Checklist */}
            <section id="field-checklist" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">10</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
                    On-Site Field Measurement Checklist
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
                      ARCHITECTURAL FIELD SHEET · VS-MEASURE-2026
                    </span>
                    <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                      Room Measurement &amp; Clearance Verification
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#73706B]">
                      Progress: <strong className="text-[#1C1A17]">{completedCount}</strong> of {totalTaskCount} Completed
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#EAE6DF] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#9B7A4F] h-full transition-all duration-300"
                    style={{ width: `${(completedCount / totalTaskCount) * 100}%` }}
                  />
                </div>

                {/* Phased Checklist Items */}
                <div className="space-y-3 pt-1">
                  {[
                    { id: 'task1', phase: 'Phase 1', text: 'Measured total wall length along floor and at 36" countertop line.' },
                    { id: 'task2', phase: 'Phase 1', text: 'Checked floor-to-ceiling height in 3 distinct spots (left, center, right).' },
                    { id: 'task3', phase: 'Phase 2', text: 'Measured all window and door openings from outer edge of trim/casing.' },
                    { id: 'task4', phase: 'Phase 2', text: 'Marked exact centerline of sink drain and water supply lines from nearest corner.' },
                    { id: 'task5', phase: 'Phase 3', text: 'Marked 240V range outlet / gas pipe centerline and range hood exhaust duct location.' },
                    { id: 'task6', phase: 'Phase 3', text: 'Summed cabinet modular widths and calculated required 3" or 6" wall fillers.' },
                  ].map((task) => {
                    const isChecked = completedTasks[task.id];
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
                            {task.phase}
                          </span>
                          <span className={isChecked ? 'line-through text-[#8C8880]' : 'text-[#1C1A17]'}>
                            {task.text}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-[#FAF9F6] border-l-2 border-[#9B7A4F] text-[11px] text-[#73706B] flex items-center justify-between">
                  <span>Provide your completed measurement worksheet to an authorized VanStro dealer for 3D layout verification.</span>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#9B7A4F] font-mono text-[10px] uppercase font-semibold hover:underline shrink-0 ml-3"
                  >
                    Open Printable Worksheet →
                  </button>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Right Column (30% width): Architectural Plates Moodboard Collage */}
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

              {/* Plate 1: Kitchen Blueprint */}
              <div
                className="group relative bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden p-2.5 transition-all duration-300 hover:border-[#1C1A17]/40 cursor-pointer"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/guides/guide-measure.webp',
                    title: 'FIG. 01 — Architectural Blueprint & Floor Plan',
                    caption: 'Precise dimensioning with wall run lengths, door clearances, and appliance centerlines.',
                  })
                }
              >
                <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden rounded-xs">
                  <Image
                    src="/assets/guides/guide-measure.webp"
                    alt="Architectural kitchen blueprint plan and clearance markers"
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
                    FIG. 01 — Architectural Blueprint
                  </span>
                  <p className="text-xs text-[#73706B] mt-0.5 leading-snug">
                    Top-down plan view detailing wall runs, island clearances, and 36&quot; traffic pathways.
                  </p>
                </div>
              </div>

              {/* Plate 2: Cabinet Finish Swatches & Fillers */}
              <div
                className="group relative bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden p-2.5 transition-all duration-300 hover:border-[#1C1A17]/40 cursor-pointer"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/guides/handbook/hb-trim.webp',
                    title: 'FIG. 02 — Scribed Filler Strip & Trim Integration',
                    caption: 'Matching 3" and 6" filler strips in Matte White and Natural Oak scribed flush against irregular wall framing.',
                  })
                }
              >
                <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden rounded-xs">
                  <Image
                    src="/assets/guides/handbook/hb-trim.webp"
                    alt="Cabinet finish swatches and filler strips"
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
                    FIG. 02 — Filler Strip Scribing
                  </span>
                  <p className="text-xs text-[#73706B] mt-0.5 leading-snug">
                    Standard 3&quot; (WF330) and 6&quot; (WF630) fillers matched to soft-touch or wood veneer door runs.
                  </p>
                </div>
              </div>

              {/* Plate 3: Installed Scandinavian Kitchen Run */}
              <div
                className="group relative bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden p-2.5 transition-all duration-300 hover:border-[#1C1A17]/40 cursor-pointer"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/dealers/kitchen-scene.webp',
                    title: 'FIG. 03 — Installed Continuous Run Alignment',
                    caption: 'Seamless horizontal reveal lines achieved with proper base leveling from floor high point.',
                  })
                }
              >
                <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden rounded-xs">
                  <Image
                    src="/assets/dealers/kitchen-scene.webp"
                    alt="Bespoke installed kitchen cabinetry with precision fillers"
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
                    FIG. 03 — Installed Run Alignment
                  </span>
                  <p className="text-xs text-[#73706B] mt-0.5 leading-snug">
                    Finished run showing perfect datum line continuity across wall units and tall pantries.
                  </p>
                </div>
              </div>

              {/* Architecture Dealer Footnote */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm text-xs space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                  VanStro Dealer Network Notice
                </span>
                <p className="text-[#5E5A54] text-[11px] leading-relaxed">
                  Have an irregular alcove or corner pipe chase? VanStro certified dealers across Canada provide 3D CAD layout reviews to guarantee clean clearance before order submission.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>

      {/* Bottom Horizontal Charcoal Banner */}
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
              Project Planning Worksheet
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Download the Printable Kitchen Measurement Grid &amp; Worksheet
            </h2>
            <p className="text-xs sm:text-sm text-[#A09D96] leading-relaxed">
              Step-by-step room sketch grid, filler scribing checklists, and appliance centerline worksheets ready for your job site.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-[#9B7A4F] text-[#F9F8F6] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#85653E] transition-colors rounded-xs shadow-sm cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>[ Download Measurement Grid PDF ]</span>
          </button>
        </div>
      </motion.section>

      {/* High-Resolution Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181715] p-4 rounded-sm border border-[#2E2B26] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2B26] mb-3">
              <div>
                <span className="font-mono text-[10px] text-[#C5A069] uppercase tracking-wider block">
                  VanStro Technical Archive
                </span>
                <h3 className="font-serif-luxury text-lg text-white font-medium">
                  {zoomImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs bg-black">
              <Image
                src={zoomImage.src}
                alt={zoomImage.title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-[#A09D96] pt-3 leading-relaxed">
              {zoomImage.caption}
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      <MeasurementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
