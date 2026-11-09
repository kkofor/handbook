'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Phone,
  Mail,
  ExternalLink,
  Clock,
  ArrowRight,
  Search,
  X,
  Printer,
  Building2,
  HelpCircle,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
  FileCheck2,
  Info,
} from 'lucide-react';

interface WarrantyPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

const POLICY_SECTIONS = [
  { id: 'sec-scope', num: '01', title: 'Scope & Eligibility' },
  { id: 'sec-components', num: '02', title: 'Covered Components' },
  { id: 'sec-environmental', num: '03', title: 'Environmental Standards' },
  { id: 'sec-exclusions', num: '04', title: 'Exclusions & Limits' },
  { id: 'sec-claim-process', num: '05', title: '30-Day Claim Procedure' },
  { id: 'sec-remedies', num: '06', title: 'Remedies & Replacements' },
  { id: 'sec-rights', num: '07', title: 'Provincial Consumer Rights' },
];

const FAQS = [
  {
    q: 'How long is the VanStro warranty period?',
    a: 'VanStro Global Supply Inc. provides a limited twelve (12) month warranty commencing on the date of original end-customer purchase from an authorized Canadian dealer or distributor.',
  },
  {
    q: 'Does installing the cabinets myself (DIY) void my warranty?',
    a: 'No. DIY installation does not automatically void your warranty. However, damage resulting from incorrect assembly, failure to shim/level cabinets, improper fasteners, or inadequate wall anchoring is excluded from coverage.',
  },
  {
    q: 'Where do I find my product Serial Number (SN)?',
    a: 'The Serial Number is stamped on the product barcode label affixed to the exterior carton packaging, as well as on a discrete identification sticker placed on the top underside or interior side panel of each cabinet box.',
  },
  {
    q: 'What if a door finish or color code has been discontinued?',
    a: 'Under our remedy terms, if an exact color match or profile is no longer in production, VanStro reserves the right to replace the defective component with a functionally equivalent part of equal or superior quality from our current catalog.',
  },
  {
    q: 'Are soft-close hinges and drawer runners covered?',
    a: 'Yes. All factory-supplied hardware components (including Blumotion hinges and undermount drawer slides) are covered under the 12-month policy against mechanical binding or failure under normal residential operation.',
  },
  {
    q: 'Does VanStro reimburse labour or contractor re-installation fees?',
    a: 'No. VanStro covers the supply of replacement parts and panels. Third-party removal, transport, plumbing, electrical, and installation labour costs are excluded from warranty coverage.',
  },
];

export default function WarrantyPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: WarrantyPageProps = {}) {
  const [activeSection, setActiveSection] = useState('sec-scope');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // Warranty Calculator State
  const [purchaseDate, setPurchaseDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 4);
    return d.toISOString().split('T')[0];
  });
  const [selectedProductType, setSelectedProductType] = useState('kitchen');
  const [serialNumberInput, setSerialNumberInput] = useState('');

  // Claim Form State
  const [claimData, setClaimData] = useState({
    name: '',
    email: '',
    phone: '',
    dealer: 'Winnipeg Central Warehouse (856 Century St)',
    orderNumber: '',
    serialNumber: '',
    category: 'kitchen',
    issueType: 'finish',
    description: '',
  });
  const [claimSubmittedTicket, setClaimSubmittedTicket] = useState<string | null>(null);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);

  // Eligibility Calculation
  const eligibility = useMemo(() => {
    if (!purchaseDate) return null;
    const pDate = new Date(purchaseDate);
    if (isNaN(pDate.getTime())) return null;

    const expirationDate = new Date(pDate);
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isCovered = daysRemaining >= 0;

    return {
      purchaseFormatted: pDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' }),
      expirationFormatted: expirationDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' }),
      isCovered,
      daysRemaining: Math.max(0, daysRemaining),
    };
  }, [purchaseDate]);

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      const topOffset = elem.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingClaim(true);
    setTimeout(() => {
      setIsSubmittingClaim(false);
      const ticketId = 'VS-WAR-' + Math.floor(100000 + Math.random() * 900000);
      setClaimSubmittedTicket(ticketId);
    }, 700);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1C1A17] font-sans antialiased selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      <Navbar
        currentView="warranty"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateToContact={() => onNavigate?.('contact')}
        onOpenChecklist={onOpenChecklistModal}
      />

      {/* Hero Header Section with Clean White Architectural Wash */}
      <section className="border-b border-[#EAE6DF] bg-gradient-to-b from-[#FAF8F5] via-[#FFFFFF] to-[#FFFFFF] pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#7A756D] mb-6 font-sans">
            <button
              type="button"
              onClick={onBackToGuides}
              className="hover:text-[#181715] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true" className="text-[#C4C0B6]">/</span>
            <span className="text-[#181715] font-semibold">Warranty</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#181715] text-[#E8C78E] text-[10px] font-bold border border-[#C5A069]/30 shadow-2xs">
                  LIMITED WARRANTY POLICY
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-[#9B7A4F] font-semibold">12-MONTH RESIDENTIAL COVERAGE</span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-[#7A756D]">VANSTRO GLOBAL SUPPLY INC.</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#181715] tracking-tight leading-[1.08]">
                Warranty &amp; <span className="italic font-light text-[#9B7A4F] font-serif">Product Guarantee</span>
              </h1>

              <p className="text-sm sm:text-base text-[#5A564F] leading-relaxed max-w-2xl font-normal">
                Authentic Canadian manufacturing standards. Every kitchen cabinet box, bathroom vanity, Blumotion soft-close hinge, and drawer runner is engineered to deliver enduring performance under normal residential conditions.
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectSection('sec-calculator')}
                className="font-mono text-xs uppercase tracking-wider text-[#181715] border-[#D5D0C5] hover:border-[#181715] bg-white h-9 shadow-xs"
              >
                <Search className="w-3.5 h-3.5 mr-1.5 text-[#9B7A4F]" />
                <span>Check Coverage</span>
              </Button>

              <Button
                variant="copper"
                size="sm"
                onClick={() => setIsClaimModalOpen(true)}
                className="font-mono text-xs uppercase tracking-wider font-semibold h-9 shadow-md active:scale-95 bg-gradient-to-r from-[#9B7A4F] to-[#B88E58] text-white"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                <span>File Warranty Claim</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Summary Grid with Rich Color Profiles */}
      <section className="border-b border-[#E3DDD1] bg-white py-10 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Kitchen Cabinets (Warm Amber/Cognac) */}
            <div className="p-5 border border-[#DFD6C5] rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#FAF6EE] space-y-3 shadow-xs hover:border-[#9B7A4F] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#9B7A4F] uppercase tracking-wider">
                  Kitchen Line
                </span>
                <span className="font-mono text-[10px] font-bold py-0.5 px-2 bg-[#9B7A4F] text-white rounded-md shadow-2xs">
                  12 Months
                </span>
              </div>
              <h3 className="font-serif-luxury text-xl font-medium text-[#181715]">
                Cabinet Boxes &amp; Shelving
              </h3>
              <p className="text-xs text-[#5A564F] leading-relaxed">
                Guaranteed against structural joint separation, core board warping, dowel/cam failure, and structural deflection under rated shelf load capacities.
              </p>
            </div>

            {/* Pillar 2: Bathroom Vanities (Deep Forest / Teal Moisture) */}
            <div className="p-5 border border-[#CCE0D8] rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#F2F8F5] space-y-3 shadow-xs hover:border-[#244A29] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#244A29] uppercase tracking-wider">
                  Vanities
                </span>
                <span className="font-mono text-[10px] font-bold py-0.5 px-2 bg-[#244A29] text-white rounded-md shadow-2xs">
                  12 Months
                </span>
              </div>
              <h3 className="font-serif-luxury text-xl font-medium text-[#181715]">
                Moisture-Resistant Frames
              </h3>
              <p className="text-xs text-[#4D6353] leading-relaxed">
                Full coverage on modular vanity carcases, shaker doors, toe-kicks, and factory-drilled plumbing cutouts under standard bathroom humidity.
              </p>
            </div>

            {/* Pillar 3: Hardware & Runners (Deep Obsidian / Satin Chrome) */}
            <div className="p-5 border border-[#DFDACF] rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#FAF8F5] space-y-3 shadow-xs hover:border-[#181715] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#181715] uppercase tracking-wider">
                  Hardware
                </span>
                <span className="font-mono text-[10px] font-bold py-0.5 px-2 bg-[#181715] text-[#E8C78E] border border-[#C5A069]/30 rounded-md shadow-2xs">
                  Blum / DTC
                </span>
              </div>
              <h3 className="font-serif-luxury text-xl font-medium text-[#181715]">
                Soft-Close Mechanisms
              </h3>
              <p className="text-xs text-[#5A564F] leading-relaxed">
                Covers silent hydraulic piston failure, 6-way hinge alignment stability, and smooth ball-bearing undermount drawer runner travel.
              </p>
            </div>

            {/* Pillar 4: Finishes & Laminates (Rose/Wine Surface Protection) */}
            <div className="p-5 border border-[#E8D4C8] rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#FAF5F2] space-y-3 shadow-xs hover:border-[#9E472A] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#9E472A] uppercase tracking-wider">
                  Finishes
                </span>
                <span className="font-mono text-[10px] font-bold py-0.5 px-2 bg-[#9E472A] text-white rounded-md shadow-2xs">
                  12 Months
                </span>
              </div>
              <h3 className="font-serif-luxury text-xl font-medium text-[#181715]">
                Soft-Touch PVC &amp; Melamine
              </h3>
              <p className="text-xs text-[#6B5047] leading-relaxed">
                Protection against edge-tape thermal debonding, factory finish delamination, bubbling, and premature color degradation under ambient interior conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
        {/* Interactive Eligibility & Date Calculator Section */}
        <section id="sec-calculator" className="mb-16 scroll-mt-28">
          <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E0]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#9B7A4F]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#9B7A4F] font-semibold">
                    Interactive Coverage Tool
                  </span>
                </div>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17]">
                  Verify Your Warranty Status
                </h2>
                <p className="text-xs sm:text-sm text-[#73706B]">
                  Select your purchase date to instantly verify your 12-month policy window and claim eligibility.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrintCertificate}
                  className="font-mono text-xs uppercase tracking-wider h-8"
                >
                  <Printer className="w-3.5 h-3.5 mr-1.5 text-[#73706B]" />
                  <span>Print Certificate</span>
                </Button>
              </div>
            </div>

            {/* Inputs & Calculation Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input Columns (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Purchase Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="purchase-date" className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                      Date of Purchase *
                    </label>
                    <input
                      id="purchase-date"
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md px-3.5 py-2.5 text-sm font-mono text-[#1C1A17] transition-colors outline-none"
                    />
                    <span className="text-[11px] text-[#8C8880] block">
                      Found on your authorized dealer invoice or sales receipt.
                    </span>
                  </div>

                  {/* Product Category */}
                  <div className="space-y-1.5">
                    <label htmlFor="product-category" className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                      Product Type
                    </label>
                    <select
                      id="product-category"
                      value={selectedProductType}
                      onChange={(e) => setSelectedProductType(e.target.value)}
                      className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md px-3.5 py-2.5 text-sm font-sans text-[#1C1A17] transition-colors outline-none cursor-pointer"
                    >
                      <option value="kitchen">Modular Kitchen Cabinetry</option>
                      <option value="vanity">Bathroom Vanity Cabinet</option>
                      <option value="hardware">Blum / DTC Soft-Close Hardware</option>
                      <option value="trim">Filler Strip, Toe-Kick or End Panel</option>
                    </select>
                    <span className="text-[11px] text-[#8C8880] block">
                      Select primary item requiring verification.
                    </span>
                  </div>
                </div>

                {/* Optional Serial Number check */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="serial-number" className="text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                      Product Serial Number (SN)
                    </label>
                    <span className="text-[11px] font-mono text-[#9B7A4F]">Optional Quick Check</span>
                  </div>
                  <div className="relative">
                    <input
                      id="serial-number"
                      type="text"
                      placeholder="e.g. VS-2025-W3021-04981"
                      value={serialNumberInput}
                      onChange={(e) => setSerialNumberInput(e.target.value)}
                      className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md pl-3.5 pr-24 py-2.5 text-sm font-mono text-[#1C1A17] transition-colors outline-none uppercase"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <span className="text-[11px] font-mono text-[#73706B] bg-stone-200/60 px-2 py-0.5 rounded">
                        Barcode SN
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#8C8880]">
                    Tip: The SN is stamped on the carton label and underneath the top frame rail of each cabinet box.
                  </p>
                </div>
              </div>

              {/* Status Certificate Card (5 cols) */}
              <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E7E5E0] rounded-xl p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#73706B]">
                    Status Assessment
                  </span>
                  {eligibility && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                        eligibility.isCovered
                          ? 'bg-[#EAF3EB] text-[#244A29] border border-[#CCE2CF]'
                          : 'bg-[#FBEBEB] text-[#8B2627] border border-[#F3C7C7]'
                      }`}
                    >
                      {eligibility.isCovered ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Policy</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5" />
                          <span>Standard 12M Ended</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                {eligibility ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[#8C8880] block text-[10px] uppercase">Purchased</span>
                        <strong className="text-[#1C1A17]">{eligibility.purchaseFormatted}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C8880] block text-[10px] uppercase">Warranty Valid Until</span>
                        <strong className="text-[#1C1A17]">{eligibility.expirationFormatted}</strong>
                      </div>
                    </div>

                    {eligibility.isCovered ? (
                      <div className="p-3.5 bg-white border border-[#D5E4D8] rounded-lg space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#244A29]">Full Replacement Parts Coverage</span>
                          <span className="font-mono font-bold text-[#244A29]">{eligibility.daysRemaining} days left</span>
                        </div>
                        <div className="w-full bg-[#E5EFE7] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#244A29] h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.max(5, (eligibility.daysRemaining / 365) * 100))}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-[#55524C] leading-snug pt-1">
                          You are fully entitled to free replacement components under VanStro&apos;s 12-month policy.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3.5 bg-white border border-[#E8C7C7] rounded-lg space-y-1">
                        <span className="font-medium text-[#8B2627] text-xs block">
                          Past 12-Month Factory Guarantee
                        </span>
                        <p className="text-[11px] text-[#66635C] leading-relaxed">
                          Your original 12-month window has concluded. However, replacement panels, doors, and hardware remain available for direct dealer re-order.
                        </p>
                      </div>
                    )}

                    <Button
                      variant={eligibility.isCovered ? 'copper' : 'outline'}
                      size="sm"
                      onClick={() => setIsClaimModalOpen(true)}
                      className="w-full font-mono text-xs uppercase tracking-wider font-semibold py-2.5"
                    >
                      <span>{eligibility.isCovered ? 'Initiate Claim with this Date' : 'Inquire with Technical Support'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-xs text-[#73706B]">Enter a valid date above to calculate your warranty window.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Asymmetric 3-Column Architectural Policy Section */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start w-full">
          {/* Left Column (18%): Sticky Minimalist TOC */}
          <aside className="w-full lg:w-[18%] lg:shrink-0 order-2 lg:order-1">
            <div className="sticky top-28 space-y-8 pr-2">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73706B] block mb-4">
                  Warranty Clauses
                </span>
                <div className="h-[1px] w-8 bg-[#1C1A17]/30 mb-6" />

                <nav aria-label="Table of policy contents" className="space-y-3.5">
                  {POLICY_SECTIONS.map((item) => {
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
                        <span className="text-xs font-sans tracking-tight">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Official Corporate Footnote */}
              <div className="pt-8 border-t border-[#E7E5E0] space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-[#9E9B94]">
                  Corporate Office
                </p>
                <p className="text-xs text-[#73706B] leading-relaxed">
                  VanStro Global Supply Inc.<br />
                  220-330 St. Mary Ave,<br />
                  Winnipeg, MB R3C 3Z5
                </p>
                <div className="pt-2 text-xs font-mono text-[#9B7A4F]">
                  <a href="mailto:support@vanstro.ca" className="hover:underline block">
                    support@vanstro.ca
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Middle Column (52%): Comprehensive Legal Clauses & Illustrated Cards */}
          <div className="w-full lg:w-[52%] lg:shrink-0 space-y-12 order-1 lg:order-2">
            {/* Section 01: Scope & Eligibility */}
            <article id="sec-scope" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#9B7A4F] uppercase tracking-widest font-semibold">
                  Clause 1.0
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-xs text-[#73706B]">Coverage Duration &amp; Ownership</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17]">
                Scope of Limited 12-Month Warranty
              </h2>

              <div className="prose text-xs sm:text-sm text-[#55524C] leading-relaxed space-y-3">
                <p>
                  VanStro Global Supply Inc. (&quot;VanStro&quot;) warrants solely to the original retail end-customer (&quot;Purchaser&quot;) that all modular kitchen cabinets, bathroom vanity cabinets, hinges, and drawer slides manufactured or supplied by VanStro shall be free from defects in materials and factory workmanship under normal residential use for a duration of <strong>twelve (12) consecutive months</strong> commencing on the date of original purchase.
                </p>
                <p>
                  This warranty applies exclusively to products purchased through authorized Canadian building material dealers, distributors, or certified showrooms. Proof of purchase (such as a formal merchant sales receipt or itemized dealer invoice) indicating the purchase date and product description is strictly required for all warranty evaluations.
                </p>
              </div>

              {/* Transferability Highlight Box */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] border-l-4 border-l-[#9B7A4F] rounded-xs space-y-1.5 shadow-2xs">
                <span className="font-mono text-xs uppercase tracking-wider text-[#1C1A17] font-semibold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#9B7A4F]" />
                  Non-Transferable Warranty Notice
                </span>
                <p className="text-xs text-[#66635C] leading-relaxed">
                  To the maximum extent permissible under applicable Canadian provincial laws, this warranty is strictly non-transferable and does not extend to subsequent homeowners, property buyers, or secondary purchasers after title conveyance.
                </p>
              </div>
            </article>

            {/* Section 02: Covered Components */}
            <article id="sec-components" className="scroll-mt-28 space-y-4 pt-8 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#9B7A4F] uppercase tracking-widest font-semibold">
                  Clause 2.0
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-xs text-[#73706B]">Mechanical &amp; Structural Parts</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17]">
                Covered Components &amp; Assembly Standards
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-[#55524C] leading-relaxed">
                <p>
                  VanStro warranties the following individual assemblies when stored, assembled, and maintained in strict accordance with VanStro technical literature:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-[#E7E5E0] rounded-lg space-y-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-[#1C1A17] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#244A29]" />
                    Cabinet Carcases &amp; Joinery
                  </h4>
                  <p className="text-xs text-[#66635C] leading-relaxed">
                    Dowel and screw structural integrity, backing grooving, horizontal shelf deflection under rated loads, and corner gusset strength.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E7E5E0] rounded-lg space-y-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-[#1C1A17] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#244A29]" />
                    Soft-Close Mechanisms
                  </h4>
                  <p className="text-xs text-[#66635C] leading-relaxed">
                    Hydraulic damping cylinders in Blumotion hinges, clip-on baseplates, and full-extension undermount drawer glide mechanisms.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E7E5E0] rounded-lg space-y-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-[#1C1A17] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#244A29]" />
                    Door &amp; Drawer Slab Substrates
                  </h4>
                  <p className="text-xs text-[#66635C] leading-relaxed">
                    Substrate delamination, structural edge debonding, and factory routing precision exceeding ±0.8 mm tolerance thresholds.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E7E5E0] rounded-lg space-y-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-[#1C1A17] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#244A29]" />
                    Vanity Moisture Resistance
                  </h4>
                  <p className="text-xs text-[#66635C] leading-relaxed">
                    Multi-ply plywood box integrity and factory sealed edges designed for standard domestic powder rooms and master ensuites.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 03: Environmental Standards */}
            <article id="sec-environmental" className="scroll-mt-28 space-y-4 pt-8 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#9B7A4F] uppercase tracking-widest font-semibold">
                  Clause 3.0
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-xs text-[#73706B]">HVAC &amp; Moisture Requirements</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17]">
                Environmental &amp; Climate Standards
              </h2>

              <p className="text-xs sm:text-sm text-[#55524C] leading-relaxed">
                Wood fiber, engineered core boards, and decorative polymer membranes react to ambient humidity and temperature swings. To keep warranty coverage intact, cabinets must reside in a year-round climate-controlled indoor residential environment adhering to the following thresholds:
              </p>

              {/* Climate Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] rounded-lg text-center space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#73706B] block">Relative Humidity</span>
                  <strong className="text-xl font-mono text-[#1C1A17] block">35% – 55%</strong>
                  <span className="text-[10px] text-[#8C8880] block">Avoid unconditioned dry winters or damp basements</span>
                </div>

                <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] rounded-lg text-center space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#73706B] block">Temperature</span>
                  <strong className="text-xl font-mono text-[#1C1A17] block">16°C – 27°C</strong>
                  <span className="text-[10px] text-[#8C8880] block">60°F – 80°F steady residential range</span>
                </div>

                <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] rounded-lg text-center space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#73706B] block">Heat Deflectors</span>
                  <strong className="text-xl font-mono text-[#9B7A4F] block">Mandatory</strong>
                  <span className="text-[10px] text-[#8C8880] block">Required on cabinets beside self-cleaning ranges</span>
                </div>
              </div>

              <div className="p-4 bg-[#FFFDF7] border border-[#F6E2B0] border-l-4 border-l-[#D97706] text-xs text-[#854D0E] rounded-xs space-y-1">
                <strong>Important Note on Self-Cleaning Ovens &amp; High Heat:</strong>
                <p>
                  High temperatures released during self-cleaning cycles or through boiling kettles placed directly beneath upper cabinet light valances can cause localized vinyl shrinkage or edge-banding failure. Heat shields must be installed beside ranges.
                </p>
              </div>
            </article>

            {/* Section 04: Exclusions & Limits */}
            <article id="sec-exclusions" className="scroll-mt-28 space-y-4 pt-8 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#8B2627] uppercase tracking-widest font-semibold">
                  Clause 4.0
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-xs text-[#73706B]">What is Not Covered</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17]">
                Exclusions &amp; Limitation of Liability
              </h2>

              <p className="text-xs sm:text-sm text-[#55524C] leading-relaxed">
                The VanStro Limited Warranty does not extend to, and VanStro shall not be liable for, defects or damages resulting from:
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    title: 'Normal Wear and Tear & Natural Aging',
                    desc: 'Gradual finish patina, minor scratch scuffs, natural wood grain variation, or subtle gloss changes caused by routine exposure to ambient light and contact.',
                  },
                  {
                    title: 'Improper Storage or Job Site Handling',
                    desc: 'Storage in unheated garages, outdoor job sites, damp basements, or environments with active drywall mudding/plaster drying prior to HVAC commissioning.',
                  },
                  {
                    title: 'Faulty Installation & Mechanical Abuse',
                    desc: 'Failure to properly level, plumb, or shim cabinets; use of improper wall fasteners; overtightening hinge mounting plates; or modification of factory carcase structures.',
                  },
                  {
                    title: 'Standing Water & Chemical Immersion',
                    desc: 'Plumbing leaks beneath sinks, soaking liquid spills left unwiped, steam cleaner application, or use of abrasive, bleach, acetone, or solvent-based cleaners.',
                  },
                  {
                    title: 'Labour, Freight & Incidental Expenses',
                    desc: 'All third-party contractor installation labour, tear-out costs, tile/countertop removal, plumbing re-connection fees, and express courier freight charges.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white border border-[#E7E5E0] rounded-md flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#FBEBEB] text-[#8B2627] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                      ✕
                    </span>
                    <div className="space-y-0.5">
                      <strong className="text-xs font-sans text-[#1C1A17] font-semibold block">
                        {item.title}
                      </strong>
                      <p className="text-xs text-[#66635C] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Section 05: Claim Process */}
            <article id="sec-claim-process" className="scroll-mt-28 space-y-4 pt-8 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#9B7A4F] uppercase tracking-widest font-semibold">
                  Clause 5.0
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-xs text-[#73706B]">30-Day Mandatory Notification</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17]">
                Claim Procedure &amp; Documentation
              </h2>

              <p className="text-xs sm:text-sm text-[#55524C] leading-relaxed">
                To submit a valid claim under this warranty, the Purchaser must furnish written notice to VanStro or the authorized selling dealer within <strong>thirty (30) calendar days</strong> of first discovering the defect, and strictly prior to the expiration of the 12-month warranty duration.
              </p>

              {/* Step Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 bg-white border border-[#E7E5E0] rounded-xl space-y-2">
                  <span className="font-mono text-xs font-bold text-[#9B7A4F]">STEP 01</span>
                  <h4 className="text-xs font-bold text-[#1C1A17]">Gather Proof &amp; SN</h4>
                  <p className="text-[11px] text-[#66635C] leading-relaxed">
                    Locate your dealer invoice and photograph the product barcode / serial number sticker.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E7E5E0] rounded-xl space-y-2">
                  <span className="font-mono text-xs font-bold text-[#9B7A4F]">STEP 02</span>
                  <h4 className="text-xs font-bold text-[#1C1A17]">Capture Photos</h4>
                  <p className="text-[11px] text-[#66635C] leading-relaxed">
                    Take 1 wide elevation context shot and 2 sharp close-up photos of the claimed defect.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E7E5E0] rounded-xl space-y-2">
                  <span className="font-mono text-xs font-bold text-[#9B7A4F]">STEP 03</span>
                  <h4 className="text-xs font-bold text-[#1C1A17]">Submit to Dealer</h4>
                  <p className="text-[11px] text-[#66635C] leading-relaxed">
                    Send to your dealer or use our online claim assistant for rapid technical review within 2 business days.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 06: Remedies & Replacements */}
            <article id="sec-remedies" className="scroll-mt-28 space-y-4 pt-8 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#9B7A4F] uppercase tracking-widest font-semibold">
                  Clause 6.0
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-xs text-[#73706B]">Sole Remedy Terms</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17]">
                Warranty Remedies &amp; Parts Replacement
              </h2>

              <div className="prose text-xs sm:text-sm text-[#55524C] leading-relaxed space-y-3">
                <p>
                  Upon verification of an approved defect by VanStro technical inspectors, VanStro holds the sole and exclusive discretion to either <strong>repair</strong> or <strong>replace</strong> the defective item or component part with a functionally equivalent product of equal or superior quality.
                </p>
                <p>
                  Because wood grains, foil runs, and dye lots vary across production runs, replacement parts may exhibit minor aesthetic variations from original components and are not guaranteed to be exact color matches. Fulfilling a replacement part does not restart, extend, or renew the original 12-month warranty duration.
                </p>
              </div>
            </article>

            {/* Section 07: Provincial Consumer Rights */}
            <article id="sec-rights" className="scroll-mt-28 space-y-4 pt-8 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#9B7A4F] uppercase tracking-widest font-semibold">
                  Clause 7.0
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-xs text-[#73706B]">Canadian Legal Framework</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17]">
                Provincial Statutory Consumer Rights
              </h2>

              <p className="text-xs sm:text-sm text-[#55524C] leading-relaxed">
                This limited warranty gives you specific legal rights, and you may also possess other rights that vary by province or territory across Canada:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white border border-[#E7E5E0] rounded-md space-y-1">
                  <strong className="text-[#1C1A17] font-semibold block">Quebec (Consumer Protection Act)</strong>
                  <p className="text-[#66635C]">
                    Legal warranties provided under sections 37, 38, and 53 apply fully, ensuring products serve their customary purpose for a reasonable term.
                  </p>
                </div>
                <div className="p-3.5 bg-white border border-[#E7E5E0] rounded-md space-y-1">
                  <strong className="text-[#1C1A17] font-semibold block">Ontario (Consumer Protection Act)</strong>
                  <p className="text-[#66635C]">
                    Deemed condition of merchantable quality remains in effect and cannot be contracted out under provincial statute.
                  </p>
                </div>
                <div className="p-3.5 bg-white border border-[#E7E5E0] rounded-md space-y-1">
                  <strong className="text-[#1C1A17] font-semibold block">Manitoba (Consumer Protection Act)</strong>
                  <p className="text-[#66635C]">
                    Governed under the laws of Manitoba where VanStro Global Supply Inc. is registered and headquartered.
                  </p>
                </div>
                <div className="p-3.5 bg-white border border-[#E7E5E0] rounded-md space-y-1">
                  <strong className="text-[#1C1A17] font-semibold block">BC &amp; Alberta (Sale of Goods Acts)</strong>
                  <p className="text-[#66635C]">
                    Implied statutory conditions regarding fitness for purpose and title remain protected by law.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column (30%): Fast Claim & Technical Support Side Cards */}
          <div className="w-full lg:w-[30%] lg:shrink-0 space-y-6 order-3">
            {/* Action Card: Submit Claim */}
            <div className="bg-[#181715] text-[#F9F8F6] border border-[#2E2B26] rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A069] font-bold block">
                  Expedited Service
                </span>
                <h3 className="font-serif-luxury text-2xl font-normal text-white">
                  Need to Submit a Warranty Claim?
                </h3>
                <p className="text-xs text-[#A09D96] leading-relaxed">
                  Our Winnipeg technical desk reviews residential cabinet claims within 1–2 business days.
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800 space-y-3">
                <Button
                  variant="copper"
                  onClick={() => setIsClaimModalOpen(true)}
                  className="w-full font-mono text-xs uppercase tracking-wider font-semibold py-2.5 shadow-md active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span>Start Digital Claim</span>
                </Button>

                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="w-full text-center text-xs font-mono text-[#C5A069] hover:underline pt-1 block cursor-pointer"
                >
                  Contact Technical Support Team →
                </button>
              </div>
            </div>

            {/* Dealer Dispatch Card */}
            <div className="bg-white border border-[#E7E5E0] rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E7E5E0]">
                <Building2 className="w-4 h-4 text-[#9B7A4F]" />
                <h4 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                  Authorized Dealer Centers
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#FAF8F5] rounded-lg space-y-1">
                  <span className="font-bold text-[#1C1A17] block">Winnipeg Central Hub (Yuan Construction)</span>
                  <span className="text-[#73706B] block">1605 St. James St · (204) 777-6668</span>
                  <span className="text-[#9B7A4F] font-mono text-[11px] block">Free Order Pickup &amp; Parts Replacement</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg space-y-1">
                  <span className="font-bold text-[#1C1A17] block">Calgary Partner Hub</span>
                  <span className="text-[#73706B] block">Dartmouth Road SE · 1-855-826-7876</span>
                  <span className="text-[#73706B] font-mono text-[11px] block">Mon – Fri: 9:00 AM – 4:30 PM MST</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg space-y-1">
                  <span className="font-bold text-[#1C1A17] block">Montreal / Pointe-Claire Hub</span>
                  <span className="text-[#73706B] block">Saint-Jean Boulevard · (514) 697-3928</span>
                  <span className="text-[#73706B] font-mono text-[11px] block">Mon – Fri: 9:00 AM – 5:00 PM EST</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate?.('contact')}
                  className="text-xs font-mono uppercase tracking-wider text-[#1C1A17] hover:text-[#9B7A4F] font-semibold underline cursor-pointer"
                >
                  View All Regional Dealers →
                </button>
              </div>
            </div>

            {/* Official Document Download Card */}
            <div className="p-5 bg-[#FAF8F5] border border-[#E7E5E0] rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#9B7A4F]" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#1C1A17]">
                  Official PDF Document
                </span>
              </div>
              <p className="text-xs text-[#66635C] leading-relaxed">
                Download the complete VanStro Global Supply Limited Warranty Policy document in printable PDF format for project binder submissions.
              </p>
              <a
                href="https://www.vanstro.ca/warranty/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9B7A4F] hover:text-[#1C1A17] font-semibold transition-colors"
              >
                <span>Official VanStro.ca Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Section: Frequently Asked Questions (Architectural 2-Column Luxury Grid) */}
        <section className="mt-20 pt-12 border-t border-[#E7E5E0] space-y-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B7A4F] font-semibold block mb-1">
              Common Questions
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#1C1A17]">
              Warranty Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FAQS.map((faq, idx) => {
              const numStr = (idx + 1 < 10 ? '0' : '') + (idx + 1);
              return (
                <article
                  key={idx}
                  className="bg-white border border-[#E7E5E0] hover:border-[#B8B3A8] p-6 rounded-xl shadow-xs transition-colors flex flex-col justify-start"
                >
                  <span className="font-mono text-xs font-semibold text-[#9B7A4F] tracking-widest uppercase mb-2 block">
                    FAQ {numStr}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-[#1C1A17] mb-2 leading-snug">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#55524C] leading-relaxed">
                    {faq.a}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* Interactive Warranty Claim Modal */}
      <AnimatePresence>
        {isClaimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#E7E5E0] sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#9B7A4F]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#9B7A4F] font-semibold">
                      VanStro Technical Desk
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-medium text-[#1C1A17]">
                    File a Warranty Claim
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg text-lg cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-7 space-y-6">
                {claimSubmittedTicket ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-14 h-14 bg-[#EAF3EB] text-[#244A29] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                      ✓
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-[#9B7A4F] tracking-widest uppercase">
                        Claim Successfully Logged
                      </span>
                      <h4 className="font-serif-luxury text-2xl font-medium text-[#1C1A17]">
                        Ticket ID: {claimSubmittedTicket}
                      </h4>
                      <p className="text-xs text-[#73706B] max-w-md mx-auto pt-2 leading-relaxed">
                        Thank you, {claimData.name || 'Valued Customer'}. Your warranty claim has been routed to the VanStro Claims Inspection Desk. A warranty technician will contact you at <strong>{claimData.email || 'your email'}</strong> within 1–2 business days.
                      </p>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E0] rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
                      <span className="font-mono font-bold text-[#1C1A17] block">Next Steps:</span>
                      <ul className="space-y-1.5 text-[#55524C] list-disc list-inside">
                        <li>Please keep the damaged component available for dealer inspection.</li>
                        <li>Have your original purchase receipt accessible for verification.</li>
                        <li>For urgent inquiries, reference ticket #{claimSubmittedTicket} at <span className="font-mono text-[#9B7A4F]">support@vanstro.ca</span>.</li>
                      </ul>
                    </div>

                    <Button
                      variant="copper"
                      onClick={() => {
                        setClaimSubmittedTicket(null);
                        setIsClaimModalOpen(false);
                      }}
                      className="font-mono text-xs uppercase tracking-wider font-semibold px-6 py-2"
                    >
                      Close &amp; Return
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitClaim} className="space-y-4">
                    <p className="text-xs text-[#73706B] leading-relaxed">
                      Please provide details regarding the affected cabinet or hardware. Notice must be filed within 30 days of discovery.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={claimData.name}
                          onChange={(e) => setClaimData({ ...claimData, name: e.target.value })}
                          placeholder="e.g. Thomas Vance"
                          className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md px-3 py-2 text-xs text-[#1C1A17] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          value={claimData.email}
                          onChange={(e) => setClaimData({ ...claimData, email: e.target.value })}
                          placeholder="e.g. customer@example.com"
                          className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md px-3 py-2 text-xs text-[#1C1A17] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                          Phone Number *
                        </label>
                        <input
                          required
                          type="tel"
                          value={claimData.phone}
                          onChange={(e) => setClaimData({ ...claimData, phone: e.target.value })}
                          placeholder="e.g. (204) 555-0192"
                          className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md px-3 py-2 text-xs text-[#1C1A17] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                          Selling Dealer Location *
                        </label>
                        <select
                          value={claimData.dealer}
                          onChange={(e) => setClaimData({ ...claimData, dealer: e.target.value })}
                          className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md px-3 py-2 text-xs text-[#1C1A17] outline-none"
                        >
                          <option value="Winnipeg - Yuan Construction Ltd.">Winnipeg - Yuan Construction Ltd.</option>
                          <option value="Calgary Partner Hub">Calgary Partner Hub</option>
                          <option value="Montreal / Pointe-Claire Hub">Montreal / Pointe-Claire Hub</option>
                          <option value="Saskatoon SK10 Prairie Hub">Saskatoon SK10 Prairie Hub</option>
                          <option value="Saanich / Victoria Hub">Saanich / Victoria Hub</option>
                          <option value="Other Canadian Dealer">Other Canadian Dealer</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                          Product Serial Number (SN) *
                        </label>
                        <input
                          required
                          type="text"
                          value={claimData.serialNumber}
                          onChange={(e) => setClaimData({ ...claimData, serialNumber: e.target.value })}
                          placeholder="Stamped on box label or cabinet"
                          className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md px-3 py-2 text-xs text-[#1C1A17] outline-none uppercase font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                          Issue Category *
                        </label>
                        <select
                          value={claimData.issueType}
                          onChange={(e) => setClaimData({ ...claimData, issueType: e.target.value })}
                          className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md px-3 py-2 text-xs text-[#1C1A17] outline-none"
                        >
                          <option value="finish">Surface Finish / Edge Delamination</option>
                          <option value="hardware">Hinge or Drawer Runner Hydraulic Failure</option>
                          <option value="structural">Carcase Box Joint / Shelf Structural Issue</option>
                          <option value="transit">Transit Damage Discovered at Unboxing</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] font-semibold">
                        Detailed Description of Defect *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={claimData.description}
                        onChange={(e) => setClaimData({ ...claimData, description: e.target.value })}
                        placeholder="Please describe how and when the issue occurred, room humidity conditions, and specific component affected..."
                        className="w-full bg-[#FAF9F7] border border-[#D5D1C7] focus:border-[#1C1A17] focus:bg-white rounded-md p-3 text-xs text-[#1C1A17] outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <div className="p-3 bg-[#FAF8F5] border border-dashed border-[#D5D1C7] rounded-lg text-center space-y-1">
                      <span className="text-xs font-mono font-medium text-[#1C1A17] block">
                        Photo Documentation Required
                      </span>
                      <p className="text-[11px] text-[#73706B]">
                        Please have photos ready for technical review when our claims officer responds to your ticket.
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsClaimModalOpen(false)}
                        className="text-xs font-mono"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="copper"
                        disabled={isSubmittingClaim}
                        className="font-mono text-xs uppercase tracking-wider font-semibold px-5"
                      >
                        {isSubmittingClaim ? 'Submitting...' : 'Submit Warranty Claim'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
