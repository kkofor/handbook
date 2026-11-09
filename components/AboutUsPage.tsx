'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Building2,
  ShieldCheck,
  Truck,
  Layers,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  ExternalLink,
  Award,
  Users,
  Compass,
  Hammer,
  Clock,
  Sparkles,
  TreePine,
  Sliders,
  ChevronRight,
} from 'lucide-react';

interface AboutUsPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

const REGIONAL_HUBS = [
  {
    city: 'Winnipeg, Manitoba',
    badge: 'Central Headquarters & Distribution (Open)',
    partner: 'VanStro Central Warehouse',
    address: '856 Century Street (Distribution & Order Pickup)',
    postal: 'Winnipeg, MB R3H 0M5',
    phone: '204-777-6668',
    email: 'dealer@vanstro.ca',
    role: 'Central inventory reserve, Canadian logistics operations, dealer order staging.',
    hours: 'Mon – Fri: 8:30 AM – 5:00 PM CST',
  },
  {
    city: 'Brandon, Manitoba',
    badge: 'Authorized Dealer (Open)',
    partner: "Contractor's Corner",
    address: '408 Park Ave E',
    postal: 'Brandon, MB R7A 7A8',
    phone: '204-728-2233',
    email: 'support@vanstro.ca',
    role: 'Local dealer partner handling Westman regional order pickup, contractor fulfillment, and localized services.',
    hours: 'Mon – Fri: 8:00 AM – 5:00 PM CST',
  },
  {
    city: 'Saanich / Victoria, British Columbia',
    badge: 'Pacific Footprint (Expansion)',
    partner: 'Saanich Partner Location',
    address: 'Vernon Avenue Corridor',
    postal: 'Saanich, BC V8X 2W7',
    phone: '1-855-826-7876',
    email: 'dealer@vanstro.ca',
    role: 'Vancouver Island network partner providing local order execution and showroom sample displays.',
    hours: 'Scheduled Opening 2026',
  },
  {
    city: 'Calgary, Alberta',
    badge: 'Alberta Footprint (Expansion)',
    partner: 'Calgary Commercial Partner',
    address: 'Dartmouth Road SE Area',
    postal: 'Calgary, AB T2G 2M3',
    phone: '1-855-826-7876',
    email: 'dealer@vanstro.ca',
    role: 'Regional staging partner facilitating local contractor pickups and multi-family supply across Calgary.',
    hours: 'Scheduled Opening 2026',
  },
  {
    city: 'Pointe-Claire / Montreal, Quebec',
    badge: 'Eastern Canada Footprint (Expansion)',
    partner: 'Pointe-Claire Commercial Partner',
    address: 'Saint-Jean Boulevard Corridor',
    postal: 'Pointe-Claire, QC H9R 3J3',
    phone: '514-697-3928',
    email: 'dealer@vanstro.ca',
    role: 'Quebec bilingual technical support, showroom sample point, and dealer routing.',
    hours: 'Scheduled Opening 2026',
  },
  {
    city: 'Saskatoon, Saskatchewan',
    badge: 'Prairie Footprint (Expansion)',
    partner: 'Saskatoon Partner Hub',
    address: '3rd Avenue North Corridor',
    postal: 'Saskatoon, SK S7K 0J5',
    phone: '1-855-826-7876',
    email: 'dealer@vanstro.ca',
    role: 'Saskatchewan residential cabinetry distribution and local contractor supply.',
    hours: 'Scheduled Opening 2026',
  },
  {
    city: 'Waterloo, Ontario',
    badge: 'Ontario Footprint (Expansion)',
    partner: 'Waterloo Regional Partner',
    address: 'Northfield Drive Area',
    postal: 'Waterloo, ON N2L 4E4',
    phone: '1-855-826-7876',
    email: 'dealer@vanstro.ca',
    role: 'Southern Ontario dealer partner for local order preparation and showroom consultations.',
    hours: 'Scheduled Opening 2026',
  },
];

const CORE_PILLARS = [
  {
    num: '01',
    title: 'Connecting Global Scale with Local Craft',
    desc: 'We bridge established, high-precision international manufacturing with trusted local Canadian cabinet shops, showrooms, and general contractors.',
    details: 'Rather than competing with local trades, VanStro serves as the supply engine that powers independent Canadian millwork businesses.',
    icon: <Building2 className="w-5 h-5 text-[#9B7A4F]" />,
  },
  {
    num: '02',
    title: 'Architectural Joinery Standard',
    desc: 'Zero particleboard or hollow fill. Every VanStro cabinet box is crafted from 100% solid multi-ply birch plywood with factory-sealed hot-melt melamine edges.',
    details: 'Equipped with DTC and Blumotion 6-way adjustable hydraulic soft-close hinges and full-extension under-mount glides.',
    icon: <Hammer className="w-5 h-5 text-[#9B7A4F]" />,
  },
  {
    num: '03',
    title: 'Direct Supply Chain Transparency',
    desc: 'By eliminating redundant retail markups, importer surcharges, and multi-tier brokerages, we provide commercial-grade cabinetry at accessible pricing.',
    details: 'Transparent online catalog, honest component dimensions, and traceable serial numbers for effortless re-ordering and warranty claims.',
    icon: <Layers className="w-5 h-5 text-[#9B7A4F]" />,
  },
  {
    num: '04',
    title: 'Canadian Climate Resilience',
    desc: 'Engineered specifically to withstand dry winter indoor heating cycles and humid summer swings without seasonal seam cracking or door warping.',
    details: 'All materials formulated for stable residential indoor performance between 35% and 55% relative humidity.',
    icon: <TreePine className="w-5 h-5 text-[#9B7A4F]" />,
  },
];

const PRODUCT_CATEGORIES = [
  {
    name: 'Modular Kitchen Cabinets',
    tag: 'RTA & Staged Assembly',
    desc: 'Full range of upper wall cabinets, sink bases, 3-drawer stacks, and tall pantry towers in classic White and Light Grey Shaker doors with soft-touch finishes.',
    spec: '¾" Plywood Carcase · Dowel & Cam Joinery · 12M Warranty',
  },
  {
    name: 'Bathroom Vanities',
    tag: '24" to 66" Single & Double Sink',
    desc: 'Moisture-resistant bathroom vanities available as cabinet-only or paired with pre-cut engineered stone countertops and undermount ceramic basins.',
    spec: 'Multi-Ply Plywood · Plumbing Cavity · Soft-Close Drawers',
  },
  {
    name: 'Architectural Mouldings & Trim',
    tag: 'Crown, Scribe & Fillers',
    desc: 'Matching light valances, crown mouldings, scribe fillers, and decorative toe-kicks milled with high precision for seamless wall-to-wall cabinetry flush fits.',
    spec: 'Primed & Finish-Matched · Solid Core · Ready to Scribe',
  },
  {
    name: 'Soft-Close Hardware & Mechanics',
    tag: 'DTC & Blumotion Systems',
    desc: 'Factory-tested hydraulic damping hinges and full-extension undermount drawer runners tested for 50,000+ opening and closing cycles.',
    spec: '3D Spiral Cam Adjustment · Tool-less Clip-On · Silent Close',
  },
];

export default function AboutUsPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: AboutUsPageProps = {}) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1C1A17] font-sans antialiased selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      {/* Navigation */}
      <Navbar
        currentView="about"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateToContact={() => onNavigate?.('contact')}
        onOpenChecklist={onOpenChecklistModal}
      />

      {/* Hero Section with Clean White & Subtle Architectural Wash */}
      <section className="border-b border-[#EAE6DF] bg-gradient-to-b from-[#FAF8F5] via-[#FFFFFF] to-[#FFFFFF] pt-12 sm:pt-16 pb-14 sm:pb-20">
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
            <span className="text-[#181715] font-semibold">About us</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#181715] text-[#E8C78E] text-[10px] font-bold border border-[#C5A069]/30 shadow-2xs">
                  WHO WE ARE
                </span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-[#9B7A4F] font-semibold">VANSTRO GLOBAL SUPPLY INC.</span>
                <span className="text-[#C4C0B6]">·</span>
                <span className="text-[#7A756D]">WINNIPEG, MANITOBA</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#181715] tracking-tight leading-[1.08]">
                Connecting Global Scale with <span className="italic font-light text-[#9B7A4F] font-serif">Local Craft</span>
              </h1>

              <p className="text-sm sm:text-base text-[#5A564F] leading-relaxed max-w-2xl font-normal">
                Headquartered in Winnipeg, VanStro operates as a national supply chain and distribution platform for modular cabinetry and building materials. We empower independent Canadian dealers, contractors, and builders with architectural-grade joinery at transparent pricing.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate?.('vanity-finder')}
                className="font-mono text-xs uppercase tracking-wider text-[#181715] border-[#D5D0C5] hover:border-[#181715] bg-white h-9 shadow-xs"
              >
                <span>Browse Vanity Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#9B7A4F]" />
              </Button>

              <Button
                variant="copper"
                size="sm"
                onClick={() => onNavigate?.('contact')}
                className="font-mono text-xs uppercase tracking-wider font-semibold h-9 shadow-md active:scale-95 bg-gradient-to-r from-[#9B7A4F] to-[#B88E58] text-white"
              >
                <Users className="w-3.5 h-3.5 mr-1.5" />
                <span>Become a Dealer</span>
              </Button>
            </div>
          </div>

          {/* 4 Architectural Statistics Bar */}
          <div className="mt-12 pt-8 border-t border-[#EDE6D8] grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#FAF7F0] border border-[#E8DFC9] rounded-xl space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-bold block">
                Box Material Standard
              </span>
              <strong className="text-xl sm:text-2xl font-serif-luxury font-medium text-[#181715] block">
                100% Plywood
              </strong>
              <span className="text-[11px] text-[#6B665F] block">Zero particleboard, core dowel integrity</span>
            </div>

            <div className="p-4 bg-[#FAF7F0] border border-[#E8DFC9] rounded-xl space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-bold block">
                National Distribution
              </span>
              <strong className="text-xl sm:text-2xl font-serif-luxury font-medium text-[#181715] block">
                Coast-to-Coast
              </strong>
              <span className="text-[11px] text-[#6B665F] block">Hubs in MB, AB, QC, SK, BC, and ON</span>
            </div>

            <div className="p-4 bg-[#FAF7F0] border border-[#E8DFC9] rounded-xl space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-bold block">
                Hardware Mechanics
              </span>
              <strong className="text-xl sm:text-2xl font-serif-luxury font-medium text-[#181715] block">
                DTC &amp; Blum
              </strong>
              <span className="text-[11px] text-[#6B665F] block">6-way hydraulic soft-close damping</span>
            </div>

            <div className="p-4 bg-[#FAF7F0] border border-[#E8DFC9] rounded-xl space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-bold block">
                Residential Warranty
              </span>
              <strong className="text-xl sm:text-2xl font-serif-luxury font-medium text-[#181715] block">
                12 Months
              </strong>
              <span className="text-[11px] text-[#6B665F] block">Full replacement parts coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative & Philosophy */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-16 space-y-20">
        {/* Section: Who We Are & What We Do (Editorial Two-Column Story) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9B7A4F] font-semibold block">
              The VanStro Model
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#181715] leading-snug">
              A Platform Engineered for Independent Builders
            </h2>
            <div className="h-[2px] w-12 bg-[#9B7A4F]" />
            <p className="text-sm text-[#5A564F] leading-relaxed">
              VanStro was founded on a simple realization: independent Canadian kitchen showrooms, renovators, and contractors face rising supply volatility, opaque import pricing, and inconsistent manufacturing quality.
            </p>
            <p className="text-sm text-[#5A564F] leading-relaxed">
              We centralized global manufacturing relationships, architectural quality audits, and national inventory staging in Winnipeg. This gives our local dealer partners the purchasing power and reliability of a multinational corporation—while preserving their community autonomy.
            </p>

            <div className="p-4 bg-[#181715] text-[#F9F8F6] rounded-xl border border-stone-800 space-y-2 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A069] font-bold block">
                Our Official Mission Statement
              </span>
              <blockquote className="font-serif-luxury text-lg italic text-[#F9F8F6] leading-relaxed">
                &ldquo;To connect established global manufacturing with local service, supporting the long-term growth of strong local businesses as the foundation of strong communities.&rdquo;
              </blockquote>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRODUCT_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-b from-white to-[#FAF7F2] border border-[#DFD6C5] rounded-xl space-y-3 shadow-xs hover:border-[#9B7A4F] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#9B7A4F] uppercase tracking-wider">
                      Line 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-[#7A756D] bg-white border border-[#E5E0D5] px-2 py-0.5 rounded">
                      {cat.tag}
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-xl font-medium text-[#181715]">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#5A564F] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EDE6D8] font-mono text-[10px] text-[#9B7A4F] font-semibold">
                  {cat.spec}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: 4 Core Guiding Pillars */}
        <section className="space-y-8 pt-8 border-t border-[#EAE6DF]">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9B7A4F] font-semibold">
              Guiding Principles
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#181715]">
              How We Build &amp; Distribute
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665F]">
              Every cabinet box, fastener, and dealer agreement is guided by four immutable operating pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="p-7 bg-white border border-[#DFD6C5] rounded-2xl space-y-4 shadow-xs hover:border-[#9B7A4F] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9] flex items-center justify-center shadow-2xs group-hover:bg-[#181715] group-hover:text-white transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#9B7A4F] tracking-widest uppercase">
                    Pillar {pillar.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl font-medium text-[#181715]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                  <p className="text-xs text-[#7A756D] leading-relaxed pt-1 border-t border-[#F0ECE4]">
                    {pillar.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Canadian Regional Distribution Hubs */}
        <section className="space-y-8 pt-8 border-t border-[#EAE6DF]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#9B7A4F] font-semibold">
                National Logistics Network
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#181715]">
                Regional Hubs &amp; Fulfillment Centers
              </h2>
            </div>
            <p className="text-xs text-[#7A756D] font-mono">
              Fulfillment via authorized independent partners across Canada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONAL_HUBS.map((hub, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-b from-white to-[#FAF7F2] border border-[#DFD6C5] rounded-xl space-y-4 shadow-xs hover:border-[#9B7A4F] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-luxury text-xl font-medium text-[#181715]">
                      {hub.city}
                    </span>
                    <Badge variant="copper" className="font-mono text-[9px] py-0.5 px-2">
                      Hub {idx + 1}
                    </Badge>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-bold block">
                    {hub.badge}
                  </span>

                  <div className="space-y-1 text-xs text-[#5A564F] pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#9B7A4F] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#181715] font-semibold block">{hub.partner}</strong>
                        <span>{hub.address}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B665F] leading-relaxed pt-2 border-t border-[#EDE6D8]">
                    {hub.role}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EDE6D8] space-y-1.5 font-mono text-[11px] text-[#6B665F]">
                  <div className="flex items-center justify-between">
                    <span>Phone:</span>
                    <a href={`tel:${hub.phone}`} className="text-[#181715] font-semibold hover:text-[#9B7A4F]">
                      {hub.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hours:</span>
                    <span className="text-[10px] text-[#7A756D]">{hub.hours}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Extra Partner Callout Card */}
            <div className="p-6 bg-[#181715] text-[#F9F8F6] border border-stone-800 rounded-xl space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A069] font-bold block">
                  Expand Your Territory
                </span>
                <h3 className="font-serif-luxury text-2xl font-normal text-white">
                  Join the VanStro Authorized Dealer Network
                </h3>
                <p className="text-xs text-[#A09D96] leading-relaxed">
                  We are actively partnering with kitchen showrooms, building supply merchants, and general contractors in Ontario, Atlantic Canada, and northern territories.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800">
                <Button
                  variant="copper"
                  onClick={() => onNavigate?.('dealer-program')}
                  className="w-full font-mono text-xs uppercase tracking-wider font-semibold py-2.5 shadow-md active:scale-95"
                >
                  <span>Apply for Dealer Status</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Corporate Governance & Transparency */}
        <section className="bg-[#FAF8F5] border border-[#DFD6C5] rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5DFD3]">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#9B7A4F] font-bold">
                Corporate Governance
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#181715]">
                VanStro Global Supply Inc.
              </h3>
              <p className="text-xs text-[#6B665F]">
                Incorporated under the laws of Canada and the Province of Manitoba.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.vanstro.ca/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#181715] border border-[#181715] hover:bg-[#181715] hover:text-white px-4 py-2 rounded-md transition-colors"
              >
                <span>Official vanstro.ca Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#5A564F]">
            <div className="space-y-1.5">
              <strong className="text-[#181715] font-semibold block text-sm">Headquarters</strong>
              <p>VanStro Global Supply Inc.</p>
              <p>220-330 St. Mary Ave</p>
              <p>Winnipeg, MB R3C 3Z5</p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-[#181715] font-semibold block text-sm">Distribution Warehouse</strong>
              <p>856 Century Street</p>
              <p>Winnipeg, MB R3H 0M5</p>
              <p>Staging &amp; Commercial Freight Dock</p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-[#181715] font-semibold block text-sm">Direct Inquiries</strong>
              <p>Toll-Free: 1-855-826-7876</p>
              <p>Technical: support@vanstro.ca</p>
              <p>Dealer Desk: dealer@vanstro.ca</p>
            </div>
          </div>
        </section>
      </main>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
