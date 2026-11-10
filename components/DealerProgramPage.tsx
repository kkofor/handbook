'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  ShieldCheck,
  Truck,
  Layers,
  MapPin,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  ArrowRight,
  ExternalLink,
  Store,
  FileText,
  Boxes,
  HelpCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
  Users,
  Check,
  Compass,
  Monitor,
  Database,
  Users2,
} from 'lucide-react';

interface DealerProgramPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

export default function DealerProgramPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: DealerProgramPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'erp' | 'crm'>('3d');

  // Application form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('VS-DLR-829140');
  const [formData, setFormData] = useState({
    companyName: '',
    operatingName: '',
    contactName: '',
    businessType: '',
    email: '',
    phone: '',
    city: '',
    province: 'MB',
    postalCode: '',
    yearsInBusiness: '',
    hasShowroom: '',
    hasWarehousePickup: '',
    hasInstallationTeam: '',
    proposedServiceArea: '',
    currentMonthlyVolume: '',
    notes: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `VS-DLR-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionRef(refCode);
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#10201d] font-sans antialiased selection:bg-[#f28a0b]/20 selection:text-[#003f3f]">
      {/* Navigation */}
      <Navbar
        currentView="dealer-program"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
        onNavigateToContact={() => onNavigate?.('contact')}
        onOpenChecklist={onOpenChecklistModal}
      />

      {/* 1. Hero Section */}
      <section className="border-b border-[#d9e1df] bg-white pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5f7376] mb-6">
            <button
              type="button"
              onClick={onBackToGuides}
              className="hover:text-[#003f3f] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true" className="text-[#d9e1df]">/</span>
            <span className="text-[#003f3f] font-semibold">Dealer Program</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#003f3f]">
              <Store className="w-4 h-4 text-[#003f3f]" />
              <span className="uppercase tracking-wider">B2B Partner Network</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003f3f] tracking-tight leading-[1.1]">
              Dealer Program
            </h1>

            <p className="text-base sm:text-xl text-[#315b60] leading-relaxed max-w-3xl font-normal">
              For qualified local building-materials operators who can support customer communication, order execution and local service within VanStro&apos;s platform-backed supply model.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => scrollToSection('apply-form')}
                className="bg-[#003f3f] hover:bg-[#0f5554] text-white px-6 py-2.5 text-sm font-semibold rounded-md transition-colors"
              >
                Start dealer application
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('qualification')}
                className="border-[#d9e1df] text-[#003f3f] hover:bg-[#f5f8f7] px-6 py-2.5 text-sm font-medium rounded-md"
              >
                Review fit first
              </Button>
            </div>

            {/* Jump Navigation Anchor Bar */}
            <div className="pt-6 border-t border-[#d9e1df]/60 flex flex-wrap gap-2 text-xs font-mono text-[#5f7376]">
              <span className="self-center text-[#10201d] font-bold mr-1">Jump to:</span>
              {[
                { label: 'Qualification', id: 'qualification' },
                { label: 'Operating model', id: 'operating-model' },
                { label: 'Tools', id: 'tools' },
                { label: 'Review', id: 'review' },
                { label: 'Rules', id: 'rules' },
                { label: 'Application', id: 'apply-form' },
              ].map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="px-2.5 py-1 bg-[#f5f8f7] hover:bg-[#d9e1df] text-[#003f3f] rounded-sm transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Program at a Glance */}
      <section className="py-12 sm:py-16 border-b border-[#d9e1df] bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-2xl mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              Program at a Glance
            </h2>
            <p className="text-sm text-[#315b60] leading-relaxed">
              The dealer program is structured around a platform-backed product supply model and local dealer responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
                01 · Supply Platform
              </span>
              <h3 className="text-lg font-bold text-[#003f3f]">VanStro role</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Product supply platform, catalogue, checkout, product information, dealer network support, and dealer operating tools after written approval.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
                02 · Local Execution
              </span>
              <h3 className="text-lg font-bold text-[#003f3f]">Dealer role</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Independent local customer contact, order execution, delivery coordination and services where offered.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
                03 · Case by Case
              </span>
              <h3 className="text-lg font-bold text-[#003f3f]">Application status</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Reviewed case by case. Submission does not guarantee approval, a dealer service area assignment, pricing or customer referrals.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
                04 · Written Terms
              </span>
              <h3 className="text-lg font-bold text-[#003f3f]">Final terms</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Commercial terms, launch timing and obligations require written approval or agreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Partner Qualification */}
      <section id="qualification" className="py-12 sm:py-16 border-b border-[#d9e1df] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              Partner Qualification
            </h2>
            <p className="text-sm sm:text-base text-[#315b60] leading-relaxed">
              This page is intended for B2B operators who can take local responsibility for customer contact and service coordination. It is not a general consumer support page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Good fit */}
            <div className="bg-[#f5f8f7] border border-[#d9e1df] p-6 sm:p-8 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0b7a4b]">
                <CheckCircle2 className="w-5 h-5 text-[#0b7a4b] shrink-0" />
                <span>Good fit</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#10201d]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b7a4b] mt-2 shrink-0" />
                  <span>Showroom, contractor or local building-materials business</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b7a4b] mt-2 shrink-0" />
                  <span>Defined dealer service area and customer-facing team</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b7a4b] mt-2 shrink-0" />
                  <span>Ability to coordinate pickup, delivery or after-sales support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b7a4b] mt-2 shrink-0" />
                  <span>Willingness to follow applicable VanStro product and disclosure policies while operating independently</span>
                </li>
              </ul>
            </div>

            {/* Not a fit yet */}
            <div className="bg-[#fff4f2] border border-[#d9e1df] p-6 sm:p-8 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#a33125]">
                <XCircle className="w-5 h-5 text-[#a33125] shrink-0" />
                <span>Not a fit yet</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#10201d]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a33125] mt-2 shrink-0" />
                  <span>No local service or customer support capacity</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a33125] mt-2 shrink-0" />
                  <span>No clear owner for dealer-provided services</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a33125] mt-2 shrink-0" />
                  <span>Expectation that VanStro will absorb dealer service liability</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a33125] mt-2 shrink-0" />
                  <span>Requirement for guaranteed referrals, customers, orders, revenue or profit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Operating Model */}
      <section id="operating-model" className="py-12 sm:py-16 border-b border-[#d9e1df] bg-[#f5f8f7] scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              Operating Model
            </h2>
            <p className="text-sm sm:text-base text-[#315b60] leading-relaxed">
              VanStro separates platform product supply from dealer-provided local services. The distinction should be clear to applicants, customers and dealer teams before work begins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Product order */}
            <div className="bg-white p-6 sm:p-7 border border-[#d9e1df] rounded-lg shadow-xs space-y-4">
              <div className="border-b border-[#d9e1df] pb-3">
                <span className="text-xs font-mono font-bold text-[#f28a0b] uppercase">Step 01</span>
                <h3 className="text-xl font-bold text-[#003f3f]">Product order</h3>
                <p className="text-xs text-[#5f7376]">Catalogue and checkout on the platform. Local handoff with the dealer.</p>
              </div>
              <div className="space-y-2 text-xs text-[#10201d]">
                <p><strong>VanStro platform:</strong> Catalogue, product supply, product information, platform checkout and product policy review.</p>
                <p><strong>Dealer partner:</strong> Local order execution, customer communication and product handoff.</p>
                <p className="text-[#5f7376] italic"><strong>Customer path:</strong> Browses products online and may select a participating independent local dealer for the applicable order.</p>
              </div>
            </div>

            {/* 2. Dealer services */}
            <div className="bg-white p-6 sm:p-7 border border-[#d9e1df] rounded-lg shadow-xs space-y-4">
              <div className="border-b border-[#d9e1df] pb-3">
                <span className="text-xs font-mono font-bold text-[#f28a0b] uppercase">Step 02</span>
                <h3 className="text-xl font-bold text-[#003f3f]">Dealer services</h3>
                <p className="text-xs text-[#5f7376]">Extended services stay with the dealer unless VanStro states otherwise in writing.</p>
              </div>
              <div className="space-y-2 text-xs text-[#10201d]">
                <p><strong>VanStro platform:</strong> Does not provide delivery, installation, measurement or renovation services unless stated in writing.</p>
                <p><strong>Dealer partner:</strong> Sets service scope, price, schedule, payment collection, workmanship and service warranty.</p>
                <p className="text-[#5f7376] italic"><strong>Customer path:</strong> Contracts directly with the dealer for extended services where offered.</p>
              </div>
            </div>

            {/* 3. Returns and support */}
            <div className="bg-white p-6 sm:p-7 border border-[#d9e1df] rounded-lg shadow-xs space-y-4">
              <div className="border-b border-[#d9e1df] pb-3">
                <span className="text-xs font-mono font-bold text-[#f28a0b] uppercase">Step 03</span>
                <h3 className="text-xl font-bold text-[#003f3f]">Returns and support</h3>
                <p className="text-xs text-[#5f7376]">The selling local dealer is the first point of contact.</p>
              </div>
              <div className="space-y-2 text-xs text-[#10201d]">
                <p><strong>VanStro platform:</strong> Reviews product-policy escalations and RMA matters where appropriate.</p>
                <p><strong>Dealer partner:</strong> First point of contact for delivery, returns, exchanges and after-sales support.</p>
                <p className="text-[#5f7376] italic"><strong>Customer path:</strong> Starts routine support and return questions with the selling local dealer.</p>
              </div>
            </div>

            {/* 4. Dealer tools */}
            <div className="bg-white p-6 sm:p-7 border border-[#d9e1df] rounded-lg shadow-xs space-y-4">
              <div className="border-b border-[#d9e1df] pb-3">
                <span className="text-xs font-mono font-bold text-[#f28a0b] uppercase">Step 04</span>
                <h3 className="text-xl font-bold text-[#003f3f]">Dealer tools</h3>
                <p className="text-xs text-[#5f7376]">3D design, ERP and CRM tools are provided after written approval. Using them doesn’t change who sets or collects dealer service fees.</p>
              </div>
              <div className="space-y-2 text-xs text-[#10201d]">
                <p><strong>VanStro platform:</strong> Provides 3D design with the VanStro product library, plus dedicated ERP and CRM, after written approval.</p>
                <p><strong>Dealer partner:</strong> Uses the tools for local selling, order follow-through and customer records.</p>
                <p className="text-[#5f7376] italic"><strong>Customer path:</strong> Interacts with the dealer during design and service coordination.</p>
              </div>
            </div>
          </div>

          {/* Responsibility boundary callout */}
          <div className="p-5 bg-white border border-[#d9e1df] rounded-lg text-xs sm:text-sm text-[#10201d]">
            <p>
              <strong>Responsibility boundary:</strong> Product orders do not include dealer extended services unless VanStro states otherwise in writing. Dealer service fees are separate from VanStro product pricing and are collected directly by the dealer.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dealer Operating Tools */}
      <section id="tools" className="py-12 sm:py-16 border-b border-[#d9e1df] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              Dealer Operating Tools
            </h2>
            <p className="text-sm sm:text-base text-[#315b60] leading-relaxed">
              After written approval or agreement, VanStro may make three systems available to participating dealers: a 3D design workspace with the VanStro product library, a dedicated ERP for orders, inventory and sales, and a CRM for local customer work. The tools support the dealer&apos;s own operation. They do not guarantee customers, orders, revenue or profit, and they do not move dealer-service liability onto VanStro.
            </p>
          </div>

          {/* Tool selector buttons */}
          <div className="flex flex-wrap gap-2 border-b border-[#d9e1df] pb-4">
            <button
              type="button"
              onClick={() => setActiveTab('3d')}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === '3d'
                  ? 'bg-[#003f3f] text-white'
                  : 'bg-[#f5f8f7] text-[#003f3f] hover:bg-[#d9e1df]'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>3D design · Product library plus AI render</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('erp')}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'erp'
                  ? 'bg-[#003f3f] text-white'
                  : 'bg-[#f5f8f7] text-[#003f3f] hover:bg-[#d9e1df]'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Dealer ERP · Orders, inventory and sales</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('crm')}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'crm'
                  ? 'bg-[#003f3f] text-white'
                  : 'bg-[#f5f8f7] text-[#003f3f] hover:bg-[#d9e1df]'
              }`}
            >
              <Users2 className="w-4 h-4" />
              <span>Dealer CRM · Accounts through after-sales</span>
            </button>
          </div>

          {/* Tab 1: 3D design */}
          {activeTab === '3d' && (
            <div className="bg-[#f5f8f7] p-6 sm:p-8 border border-[#d9e1df] rounded-xl space-y-4">
              <h3 className="text-xl font-bold text-[#003f3f]">
                3D design with the VanStro product library
              </h3>
              <p className="text-xs sm:text-sm text-[#315b60] leading-relaxed">
                The workspace includes the VanStro product library (cabinets, vanities, trim and hardware). The dealer builds a room, then the tool can produce a render the showroom team reviews with the customer.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#10201d]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>The VanStro product library is available in the workspace.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Place products in a room layout and adjust doors, finishes and hardware while the customer is present.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>The tool can generate a rendering of the current scene for review with the customer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>A layout can be turned into a product list for a later VanStro order.</span>
                </li>
              </ul>
              <p className="text-xs text-[#5f7376] italic pt-2">
                The render and product list stay with the dealer. They do not change VanStro product pricing or dealer-service fees.
              </p>
            </div>
          )}

          {/* Tab 2: ERP */}
          {activeTab === 'erp' && (
            <div className="bg-[#f5f8f7] p-6 sm:p-8 border border-[#d9e1df] rounded-xl space-y-4">
              <h3 className="text-xl font-bold text-[#003f3f]">
                Dedicated ERP for orders, inventory and sales
              </h3>
              <p className="text-xs sm:text-sm text-[#315b60] leading-relaxed">
                Participating dealers get a VanStro ERP console so the same team can follow a product order from draft through warehouse movement, sales posting and after-sales without leaving the dealer login.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#10201d]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Track sales orders, purchase orders and draft quotes in one console.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Monitor inventory, warehouse requests and product/SKU movement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Read sales amount and order-count trends, plus order-status mix such as pending, outbound and installed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Keep commission, deposit, after-sales refund and tax records next to the order, not in a separate spreadsheet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Filter by date range and dealer or product view when the written approval opens those records.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Tab 3: CRM */}
          {activeTab === 'crm' && (
            <div className="bg-[#f5f8f7] p-6 sm:p-8 border border-[#d9e1df] rounded-xl space-y-4">
              <h3 className="text-xl font-bold text-[#003f3f]">
                CRM for the dealer&apos;s local book of business
              </h3>
              <p className="text-xs sm:text-sm text-[#315b60] leading-relaxed">
                The CRM sits beside the ERP so the same dealer team can keep the customer conversation, the project calendar and the after-sales case in one place. VanStro supplies the system. The dealer owns the local records and the customer relationship.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#10201d]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Accounts and contacts for showroom, contractor and repeat buyers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Leads and opportunities so a kitchen or millwork inquiry has a named owner and a next step.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Sales and purchases tied back to VanStro product orders, without mixing dealer-service invoices into VanStro product pricing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Tasks, calendar, meetings, calls and email threads on the same account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0b7a4b] mt-0.5 shrink-0" />
                  <span>Support cases and a knowledge base for delivery, return and product questions the dealer handles first.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 6. Application Review */}
      <section id="review" className="py-12 sm:py-16 border-b border-[#d9e1df] bg-[#f5f8f7] scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              Application Review
            </h2>
            <p className="text-sm text-[#315b60] leading-relaxed">
              VanStro reviews dealer applications for local coverage, operating readiness and fit with the existing dealer network. Submission is not approval.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg space-y-2">
              <span className="text-xs font-mono font-bold text-[#f28a0b]">Step 1</span>
              <h3 className="text-base font-bold text-[#003f3f]">Company profile</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Business details, proposed dealer service area, product focus and operating capabilities.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg space-y-2">
              <span className="text-xs font-mono font-bold text-[#f28a0b]">Step 2</span>
              <h3 className="text-base font-bold text-[#003f3f]">Participation review</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                VanStro reviews the applicant&apos;s customer support capacity in its proposed dealer service area.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg space-y-2">
              <span className="text-xs font-mono font-bold text-[#f28a0b]">Step 3</span>
              <h3 className="text-base font-bold text-[#003f3f]">Review rules</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Candidates review the rules that apply to VanStro orders, returns, privacy and independent-dealer disclosure.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg space-y-2">
              <span className="text-xs font-mono font-bold text-[#f28a0b]">Step 4</span>
              <h3 className="text-base font-bold text-[#003f3f]">Activation</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Launch timing and commercial terms are confirmed only through written approval or agreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Operating Rules Before Applying */}
      <section id="rules" className="py-12 sm:py-16 border-b border-[#d9e1df] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              Operating Rules Before Applying
            </h2>
            <p className="text-sm text-[#315b60] leading-relaxed">
              These pages explain the rules that prospective dealers should understand before applying. They are part of the operating context, not marketing material.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              {
                title: 'VanStro & Local Dealer Responsibilities',
                desc: 'Service liability, service pricing, customer handoff and platform boundary.',
              },
              {
                title: 'Return Policy',
                desc: 'Return routing, RMA review, distributor handling and escalation path.',
              },
              {
                title: 'Privacy Policy',
                desc: 'Application information, customer referrals and dealer data sharing.',
              },
              {
                title: 'Terms and Conditions',
                desc: 'Website use, ordering terms, permitted use and governing law.',
              },
              {
                title: 'Legal Disclaimer',
                desc: 'Product information, images, pricing references and non-binding website content.',
              },
              {
                title: 'Careers',
                desc: 'Team growth and future regional opportunities.',
              },
            ].map((rule, idx) => (
              <div key={idx} className="p-4 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-1">
                <span className="font-bold text-[#003f3f] block">{rule.title}</span>
                <span className="text-[#5f7376]">{rule.desc}</span>
              </div>
            ))}
          </div>

          {/* Important Application Notes */}
          <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-xl space-y-3 mt-6">
            <h3 className="text-base font-bold text-[#003f3f]">Important Application Notes</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#315b60]">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#003f3f]">•</span>
                <span>Each dealer independently manages its business operations, marketing, customers, personnel, resale and service pricing, and any services it offers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#003f3f]">•</span>
                <span>Submitting an application does not guarantee approval, a dealer service area arrangement, pricing terms, customer referrals, orders, revenue, profit, launch timing or a dealer relationship. Final terms require written approval or agreement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#003f3f]">•</span>
                <span>We use your application information to assess your application, set up your dealer account, review local coverage and follow up with you. Review the Privacy Policy and Cookie Preferences before submitting information.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Application Form */}
      <section id="apply-form" className="py-12 sm:py-16 border-b border-[#d9e1df] bg-[#f5f8f7] scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 border border-[#d9e1df] rounded-xl shadow-xs space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block mb-1">
                Dealer Onboarding
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f]">
                Discuss Your Market and Local Coverage
              </h2>
              <p className="text-xs sm:text-sm text-[#5f7376] mt-1">
                Share your company profile, proposed dealer service area and local support capabilities. VanStro will review fit and follow up with the right team.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#0b7a4b] mx-auto" />
                <h3 className="text-xl font-bold text-[#003f3f]">Application Submitted</h3>
                <p className="text-xs sm:text-sm text-[#5f7376] max-w-md mx-auto">
                  Thank you for your interest in the VanStro Dealer Program. Your submission reference is{' '}
                  <strong className="text-[#003f3f] font-mono">{submissionRef}</strong>. Our business development team reviews applications case by case and will contact you within one business day.
                </p>
                <Button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-[#003f3f] hover:bg-[#0f5554] text-white text-xs font-mono uppercase"
                >
                  Submit Another Inflow
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Legal Company Name *</label>
                    <input
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Prairie Cabinet Works Inc."
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Trade / Operating Name</label>
                    <input
                      name="operatingName"
                      value={formData.operatingName}
                      onChange={handleInputChange}
                      placeholder="e.g. Prairie Cabinet Studio"
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Primary Contact Name *</label>
                    <input
                      required
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Business Type *</label>
                    <select
                      required
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    >
                      <option value="">Select business type...</option>
                      <option value="Kitchen & Bath Showroom">Kitchen &amp; Bath Showroom</option>
                      <option value="General Contractor / Builder">General Contractor / Builder</option>
                      <option value="Millwork / Cabinet Shop">Millwork / Cabinet Shop</option>
                      <option value="Building Materials Retailer">Building Materials Retailer</option>
                      <option value="Interior Design Studio">Interior Design Studio</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Business Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contact@company.ca"
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="204-555-0192"
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">City *</label>
                    <input
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Brandon"
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Province *</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    >
                      <option value="MB">Manitoba (MB)</option>
                      <option value="SK">Saskatchewan (SK)</option>
                      <option value="AB">Alberta (AB)</option>
                      <option value="BC">British Columbia (BC)</option>
                      <option value="ON">Ontario (ON)</option>
                      <option value="QC">Quebec (QC)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Postal Code *</label>
                    <input
                      required
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="R7A 7A8"
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Years in Business</label>
                    <select
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    >
                      <option value="">Select years in business...</option>
                      <option value="Under 1 year">Under 1 year</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Estimated Monthly Cabinet Volume</label>
                    <select
                      name="currentMonthlyVolume"
                      value={formData.currentMonthlyVolume}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    >
                      <option value="">Select estimated volume...</option>
                      <option value="Under $25,000">Under $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                      <option value="$100,000+">$100,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#10201d]">Proposed Dealer Service Area &amp; Capabilities *</label>
                  <textarea
                    required
                    rows={3}
                    name="proposedServiceArea"
                    value={formData.proposedServiceArea}
                    onChange={handleInputChange}
                    placeholder="Describe your geographic territory, showroom facilities, pickup bay, and customer-facing team capacity."
                    className="w-full p-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                  />
                </div>

                <p className="text-[11px] text-[#5f7376] leading-relaxed">
                  By submitting this form, you acknowledge that submissions are reviewed on a case-by-case basis and do not constitute an agreement or territorial guarantee.
                </p>

                <Button
                  type="submit"
                  className="w-full bg-[#003f3f] hover:bg-[#0f5554] text-white py-3 text-sm font-semibold rounded-md"
                >
                  Submit Dealer Application
                </Button>
              </form>
            )}

            <div className="pt-6 border-t border-[#d9e1df] flex flex-col sm:flex-row items-center justify-between text-xs text-[#5f7376] gap-3">
              <div>
                <strong>Dealer program team:</strong>{' '}
                <a href="mailto:dealer@vanstro.ca" className="text-[#003f3f] underline">dealer@vanstro.ca</a>
              </div>
              <div>
                <strong>Direct phone:</strong>{' '}
                <a href="tel:18558267876" className="text-[#003f3f] underline">1-855-VANSTRO (1-855-826-7876)</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d9e1df] bg-white py-10 text-xs text-[#5f7376]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 VanStro Global Supply Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <button type="button" onClick={() => onNavigate?.('warranty')} className="hover:text-[#003f3f]">Warranty</button>
            <button type="button" onClick={() => onNavigate?.('contact')} className="hover:text-[#003f3f]">Contact Us</button>
            <button type="button" onClick={() => onNavigate?.('dealers-map')} className="hover:text-[#003f3f]">Dealer Map</button>
          </div>
        </div>
      </footer>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
