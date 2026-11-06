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
import { Ruler, Calculator, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Layers, Sliders } from 'lucide-react';

interface HowToMeasureGuideProps {
  onBackToGuides: () => void;
  onNavigate?: (view: string) => void;
}

const MEASURE_TOC = [
  { id: 'tools-prep', num: '01', title: 'Essential Tools' },
  { id: 'wall-fillers', num: '02', title: 'Wall Runs & Fillers' },
  { id: 'heights-ceilings', num: '03', title: 'Heights & Ceilings' },
  { id: 'doors-windows', num: '04', title: 'Doors & Windows' },
  { id: 'utilities-lines', num: '05', title: 'Utilities & Centerlines' },
  { id: 'filler-calc', num: '06', title: 'Interactive Calculator' },
];

export default function HowToMeasureGuide({ onBackToGuides, onNavigate }: HowToMeasureGuideProps) {
  const [activeSection, setActiveSection] = useState('tools-prep');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string; caption: string } | null>(null);

  // Interactive Filler Calculator State
  const [wallWidth, setWallWidth] = useState<number>(132); // 132 inches (11 ft)
  const [cabinetRun, setCabinetRun] = useState<number[]>([36, 30, 24, 36]); // 126 inches

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

  return (
    <div className="guides-hb min-h-screen bg-[#F9F8F6] text-[#1C1A17] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
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
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
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
                <span>KITCHENS &amp; BATHROOM VANITIES</span>
              </div>

              {/* Large Serif Title */}
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1A17] tracking-tight leading-[1.08]">
                Measuring for Cabinets
              </h1>

              {/* Elegant Subtitle */}
              <p className="text-sm sm:text-base text-[#73706B] leading-relaxed max-w-2xl font-normal">
                Cabinet widths, heights, clearances and fillers. Step-by-step VanStro guidance for planning, ordering and installing your bespoke modular cabinetry.
              </p>
            </div>

            {/* Quick Action Link */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1C1A17] border-b border-[#1C1A17] pb-1 hover:text-[#9B7A4F] hover:border-[#9B7A4F] transition-all cursor-pointer"
              >
                <span>Download Measurement Grid PDF</span>
                <span>→</span>
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

                <nav aria-label="Table of contents" className="space-y-4">
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
                        <span className="text-sm font-sans tracking-tight">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Minimal metadata footnote */}
              <div className="pt-8 border-t border-[#E7E5E0] space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-[#9E9B94]">
                  Engineering Standard
                </p>
                <p className="text-xs text-[#73706B] leading-relaxed">
                  VanStro Architectural Joinery Standard §2.4 (Clearance &amp; Scribing)
                </p>
              </div>
            </div>
          </motion.aside>

          {/* Middle Column (52% width): Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[52%] space-y-14 order-1 lg:order-2"
          >
            {/* Section 01: Essential Tools & Prep */}
            <section id="tools-prep" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    01
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    Essential Tools &amp; Preparation
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Field Readiness
                </span>
              </div>

              <p className="text-sm text-[#5E5A54] leading-relaxed">
                Before measuring your kitchen or vanity alcove, gather dedicated precision tools. Accuracy at the eighth-of-an-inch level avoids costly layout misalignments during installation.
              </p>

              {/* 3 Sliced Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <Card className="border-[#E7E5E0] bg-white hover:border-[#1C1A17] hover:shadow-xs transition-all duration-300 rounded-xl flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center text-sm font-semibold text-[#9B7A4F]">
                        <Ruler className="w-4 h-4" />
                      </div>
                      <Badge variant="copper" className="text-[9px] font-mono">
                        Primary Tool
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-serif-luxury font-normal text-[#1C1A17]">
                      25ft+ Locking Tape
                    </CardTitle>
                    <CardDescription className="text-xs text-[#5E5A54] leading-relaxed pt-1">
                      Use a steel locking tape measure with a rigid blade. Avoid soft cloth tailor tapes which stretch over long runs.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="px-5 py-3 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono">
                    Accurate to 1/16&quot;
                  </CardFooter>
                </Card>

                <Card className="border-[#E7E5E0] bg-white hover:border-[#1C1A17] hover:shadow-xs transition-all duration-300 rounded-xl flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center text-sm font-semibold text-[#9B7A4F]">
                        <Layers className="w-4 h-4" />
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-mono">
                        Documentation
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-serif-luxury font-normal text-[#1C1A17]">
                      Grid Graph Paper
                    </CardTitle>
                    <CardDescription className="text-xs text-[#5E5A54] leading-relaxed pt-1">
                      Sketch a bird’s-eye floor plan view. Note all permanent architectural elements, doorways, and radiator covers.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="px-5 py-3 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono">
                    Scale: ¼&quot; = 1 foot
                  </CardFooter>
                </Card>

                <Card className="border-[#E7E5E0] bg-white hover:border-[#1C1A17] hover:shadow-xs transition-all duration-300 rounded-xl flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center text-sm font-semibold text-[#9B7A4F]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-mono">
                        Visual Context
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-serif-luxury font-normal text-[#1C1A17]">
                      Multi-Angle Photos
                    </CardTitle>
                    <CardDescription className="text-xs text-[#5E5A54] leading-relaxed pt-1">
                      Capture wide-angle photos of each wall run, floor transitions, exposed ductwork bulkheads, and ceiling soffits.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="px-5 py-3 bg-[#FAF9F6] border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono">
                    Provide to Designer
                  </CardFooter>
                </Card>
              </div>
            </section>

            {/* Section 02: Wall Runs, Gaps & Fillers */}
            <section id="wall-fillers" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    02
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    Wall Measurements, Gaps &amp; Fillers
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Modular Run Formula
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-4">
                <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                  The Fixed-Width Cabinet Principle
                </h3>
                <p className="text-sm text-[#5E5A54] leading-relaxed">
                  VanStro cabinetry is precision-manufactured in standard imperial modular widths: <strong>24&quot;, 27&quot;, 30&quot;, 36&quot;, 42&quot;, and 48&quot;</strong>. Because custom cabinet widths are not produced, real residential walls are rarely an exact multiple of these sizes.
                </p>

                {/* Mathematical Formula Callout */}
                <div className="p-4 bg-[#F9F8F6] border border-[#E7E5E0] rounded-xs font-mono text-xs space-y-2">
                  <span className="text-[#9B7A4F] font-semibold uppercase tracking-wider block">
                    Filler Calculation Formula:
                  </span>
                  <div className="text-base text-[#1C1A17] font-semibold">
                    Remaining Gap = Total Wall Length − ∑(Cabinet Widths)
                  </div>
                  <p className="text-[11px] text-[#73706B] font-sans">
                    Divide the remaining gap evenly across both ends (left and right wall runs) using standard <strong>3&quot; (WF330)</strong> or <strong>6&quot; (WF630)</strong> architectural fillers, scribed to the wall on site.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 03: Heights & Ceiling Variations */}
            <section id="heights-ceilings" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    03
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    Ceiling &amp; Height Variations
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  The Rule of 3
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F]">
                    Ceiling Leveling
                  </span>
                  <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                    Measure 3 Distinct Spots
                  </h3>
                  <p className="text-xs text-[#5E5A54] leading-relaxed">
                    Floors and ceilings in Canadian homes settle over seasons. Always measure the height from the subfloor/finished floor to the ceiling at the left corner, center of the wall run, and right corner.
                  </p>
                  <div className="p-3 bg-[#F9F8F6] border-l-2 border-[#9B7A4F] text-[11px] text-[#73706B]">
                    <strong>Golden Rule:</strong> The <em>lowest</em> ceiling measurement establishes the top datum line for tall pantry units and upper wall cabinets.
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F]">
                    Trim &amp; Soffit Allowance
                  </span>
                  <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                    Crown Moulding &amp; Light Rails
                  </h3>
                  <p className="text-xs text-[#5E5A54] leading-relaxed">
                    Leave a minimum 2&quot; to 3&quot; gap between upper cabinets and the ceiling if you intend to install VanStro crown moulding (CM3). Under-cabinet LED light rails (LR3) require 1¼&quot; bottom clearance.
                  </p>
                  <div className="p-3 bg-[#F9F8F6] border-l-2 border-[#1C1A17] text-[11px] text-[#73706B]">
                    <strong>Standard Height:</strong> Standard base cabinet height is 34½&quot; without countertop, reaching 36&quot; with 1½&quot; stone countertop installed.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 04: Doors & Windows Clearances */}
            <section id="doors-windows" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    04
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    Window, Door &amp; Trim Clearances
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Casings &amp; Swings
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-4">
                <p className="text-sm text-[#5E5A54] leading-relaxed">
                  Never measure only the window glass or interior door frame. <strong>Always measure from the outermost edge of the decorative casing/trim</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#F9F8F6] border border-[#E7E5E0] rounded-xs space-y-2">
                    <span className="font-mono text-[10px] text-[#9B7A4F] uppercase font-semibold">
                      Window Sills
                    </span>
                    <h4 className="font-serif-luxury text-base font-medium text-[#1C1A17]">
                      Sill Height vs Countertop
                    </h4>
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      Window sills behind kitchen sinks must sit at least 38&quot; above finished floor level to comfortably clear the standard 36&quot; countertop plus 1½&quot; backsplash lip.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F9F8F6] border border-[#E7E5E0] rounded-xs space-y-2">
                    <span className="font-mono text-[10px] text-[#9B7A4F] uppercase font-semibold">
                      Door Swing Radii
                    </span>
                    <h4 className="font-serif-luxury text-base font-medium text-[#1C1A17]">
                      Handle Collision Clearance
                    </h4>
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      Allow at least 3&quot; of filler between a cabinet run and an adjacent wall opening so door hardware or deep handles do not bang into door casings when pulled open 90°.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 05: Utilities & Plumbing Centerlines */}
            <section id="utilities-lines" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    05
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    Utilities &amp; Plumbing Centerlines
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Mechanical Mapping
                </span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E5E0] p-6 rounded-sm space-y-4">
                <p className="text-sm text-[#5E5A54] leading-relaxed">
                  Locating services early prevents expensive plumbing or electrical relocations. Measure from the nearest corner wall to the exact <strong>centerline (CL)</strong> of:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 border border-[#E7E5E0] rounded-xs space-y-1">
                    <span className="font-mono text-[10px] text-[#9B7A4F] font-semibold uppercase">01 / Sink Plumbing</span>
                    <div className="font-medium text-[#1C1A17]">Drain Outlet &amp; Shutoffs</div>
                    <div className="text-[#73706B] text-[11px]">Center of 1½&quot; or 2&quot; drain pipe. Confirm height is 16&quot;–18&quot; above floor.</div>
                  </div>

                  <div className="p-3.5 border border-[#E7E5E0] rounded-xs space-y-1">
                    <span className="font-mono text-[10px] text-[#9B7A4F] font-semibold uppercase">02 / Range / Cooktop</span>
                    <div className="font-medium text-[#1C1A17]">240V Outlet or Gas Line</div>
                    <div className="text-[#73706B] text-[11px]">Mark exact center. Must align within back appliance recess channel.</div>
                  </div>

                  <div className="p-3.5 border border-[#E7E5E0] rounded-xs space-y-1">
                    <span className="font-mono text-[10px] text-[#9B7A4F] font-semibold uppercase">03 / Range Hood Duct</span>
                    <div className="font-medium text-[#1C1A17]">Exhaust Vent Centerline</div>
                    <div className="text-[#73706B] text-[11px]">Mark ceiling or wall penetration (typically 6&quot; round or 3¼&quot;×10&quot; duct).</div>
                  </div>

                  <div className="p-3.5 border border-[#E7E5E0] rounded-xs space-y-1">
                    <span className="font-mono text-[10px] text-[#9B7A4F] font-semibold uppercase">04 / Dishwasher Run</span>
                    <div className="font-medium text-[#1C1A17]">Water Inlet &amp; Drain Loop</div>
                    <div className="text-[#73706B] text-[11px]">Dishwashers install directly on the floor with no cabinet box. Standard width is 24&quot;.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 06: Interactive VanStro Room & Filler Calculator */}
            <section id="filler-calc" className="scroll-mt-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
                    06
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
                    Interactive Wall Run &amp; Filler Calculator
                  </h2>
                </div>
                <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
                  Scribing Tool
                </span>
              </div>

              <Card className="border-[#E7E5E0] bg-white rounded-xl shadow-xs overflow-hidden">
                <CardHeader className="p-6 sm:p-7 pb-4 space-y-1.5 border-b border-[#F0EFEA] bg-[#FAF9F6]">
                  <div className="flex items-center gap-2">
                    <Badge variant="copper" className="text-[9px]">
                      Live Sizing Engine
                    </Badge>
                    <span className="text-[#C4C0B6]">/</span>
                    <span className="text-xs font-mono text-[#73706B]">
                      Field Scribing &amp; Filler Analysis
                    </span>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-serif-luxury text-[#1C1A17]">
                    Calculate Cabinet Combinations &amp; Scribe Fillers
                  </CardTitle>
                  <CardDescription className="text-xs text-[#5E5A54] leading-relaxed pt-0.5">
                    Enter your total wall measurement in inches, select VanStro standard modular cabinets, and compute the exact filler split for each side.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 sm:p-7 space-y-6">
                  {/* Wall Width Input Slice */}
                  <div className="p-4 bg-[#FAF9F6] border border-[#E7E5E0] rounded-lg space-y-3">
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
                          className="text-center font-mono font-semibold pr-6 text-xs h-9"
                        />
                        <span className="absolute right-2 top-2.5 text-[10px] text-[#8C8880] font-mono pointer-events-none">in</span>
                      </div>
                    </div>
                  </div>

                  {/* Cabinet Sequence Chips */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#8C8880]">
                        Cabinet Sequence in this Run:
                      </span>
                      <span className="text-xs font-mono text-[#1C1A17]">
                        Run Sum: <strong className="font-semibold text-sm">{totalCabinetWidth}&quot;</strong>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 min-h-12 p-3 bg-[#FAF9F6]/60 border border-[#E7E5E0] rounded-lg">
                      {cabinetRun.map((width, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E7E5E0] text-xs font-mono rounded-md shadow-2xs group hover:border-[#1C1A17] transition-colors"
                        >
                          <span className="font-semibold text-[#1C1A17]">{width}&quot; Cabinet</span>
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

                    {/* Add Standard Modules Slices */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[11px] font-mono text-[#8C8880] mr-1">Add Standard Module:</span>
                      {[24, 27, 30, 36, 42, 48].map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addCabinet(size)}
                          className="h-7 text-xs font-mono px-2.5"
                        >
                          + {size}&quot;
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Result Display Slice */}
                  {totalCabinetWidth > wallWidth ? (
                    <Alert variant="destructive" className="rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-[#8B2627]" />
                      <AlertTitle>Overrun: Cabinets Exceed Wall Space</AlertTitle>
                      <AlertDescription>
                        Cabinet sum ({totalCabinetWidth}&quot;) is larger than total wall width ({wallWidth}&quot;) by {(totalCabinetWidth - wallWidth).toFixed(1)}&quot;. Remove or downsize modules to fit within the room boundary.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert variant="success" className="rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-[#244A29]" />
                      <div className="flex items-baseline justify-between w-full border-b border-[#244A29]/20 pb-2 mb-2">
                        <AlertTitle className="mb-0 text-[#244A29]">Recommended Wall Filler Split</AlertTitle>
                        <span className="text-xs font-mono font-semibold text-[#244A29]">
                          Remaining Gap: {remainingGap.toFixed(2)}&quot;
                        </span>
                      </div>
                      <AlertDescription>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                          <div className="p-3 bg-white border border-[#244A29]/20 rounded-md">
                            <span className="text-[10px] font-mono uppercase text-[#73706B] block">Left Wall Scribe:</span>
                            <span className="text-base font-semibold text-[#1C1A17] font-mono block">
                              {fillerPerSide.toFixed(2)}&quot;
                            </span>
                            <span className="text-[10px] text-[#73706B] block">
                              (Cut from {fillerPerSide <= 3 ? '3" WF330' : '6" WF630'} filler)
                            </span>
                          </div>
                          <div className="p-3 bg-white border border-[#244A29]/20 rounded-md">
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

              {/* Photo 1: Kitchen Blueprint */}
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
                </div>
                <div className="pt-2.5 pb-1 px-1">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#9B7A4F] block">
                    Figure 01 — Floor Plan Clearance
                  </span>
                  <p className="text-xs text-[#73706B] mt-0.5 leading-snug">
                    Bird’s-eye elevation mapping showing 36&quot; traffic pathways and 42&quot; island working aisles.
                  </p>
                </div>
              </div>

              {/* Photo 2: Cabinet Finish Swatches & Fillers */}
              <div
                className="group relative bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden p-2.5 transition-all duration-300 hover:border-[#1C1A17]/40 cursor-pointer"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/guides/handbook/hb-trim.webp',
                    title: 'Figure 02 — Finish Swatches & Filler Material Scribing',
                    caption: 'Matching filler strips in Matte White and Natural Rift-Cut Oak, scribed seamlessly to irregular walls.',
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
                </div>
                <div className="pt-2.5 pb-1 px-1">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#9B7A4F] block">
                    Figure 02 — Scribe &amp; Filler Material
                  </span>
                  <p className="text-xs text-[#73706B] mt-0.5 leading-snug">
                    Standard 3&quot; and 6&quot; fillers matched to PVC Matte Soft-Touch or Natural Veneer door runs.
                  </p>
                </div>
              </div>

              {/* Photo 3: Installed Scandinavian Kitchen Run */}
              <div
                className="group relative bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden p-2.5 transition-all duration-300 hover:border-[#1C1A17]/40 cursor-pointer"
                onClick={() =>
                  setZoomImage({
                    src: '/assets/dealers/kitchen-scene.webp',
                    title: 'Figure 03 — Finished Modular Cabinet Installation',
                    caption: 'Continuous modular alignment featuring soft-close DTC hardware and flush wall filler transitions.',
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
                </div>
                <div className="pt-2.5 pb-1 px-1">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#9B7A4F] block">
                    FIG. 03 — INSTALLED RUN ALIGNMENT
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
            className="px-6 py-3.5 bg-[#9B7A4F] text-[#F9F8F6] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#85653E] transition-colors rounded-xs shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            [ Download Measurement Grid PDF ]
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
