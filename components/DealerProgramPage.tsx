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
} from 'lucide-react';

interface DealerProgramPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

// Authentic Division of Responsibilities from vanstro.ca/dealer-program
const RESPONSIBILITIES_MATRIX = [
  {
    area: 'Product & Inventory',
    platformRole:
      'Sources products globally, manages manufacturing supply chains, maintains national inventory, and sets standardized product catalogs.',
    dealerRole:
      'Maintains local display/showroom samples, handles physical product handoff, and manages local floor inventory where applicable.',
  },
  {
    area: 'Pricing & Commerce',
    platformRole:
      'Provides standardized national platform pricing, product disclosures, and platform-level digital checkout.',
    dealerRole:
      'Operates independently; quotes, sets, and bills any dealer-provided local services (such as installation, assembly, or specialized delivery) separately.',
  },
  {
    area: 'Fulfillment & Logistics',
    platformRole:
      'Oversees overall national supply chain infrastructure, central warehouse inventory at 856 Century St (Winnipeg), and digital order processing.',
    dealerRole:
      'Coordinates local order execution, customer pickup scheduling, and localized regional delivery logistics.',
  },
  {
    area: 'Customer Support & Service',
    platformRole:
      'Handles platform inquiries, website support, general product information, specifications, and manufacturer policy guidelines.',
    dealerRole:
      'Provides direct on-site customer communication, face-to-face assistance, after-sales support, and local service coordination.',
  },
];

// Authentic "Who is a Good Fit" guidelines from vanstro.ca/dealer-program
const GOOD_FIT_CRITERIA = [
  {
    title: 'Showrooms, Contractors & Trade Operators',
    desc: 'Existing kitchen and bath showrooms, general contractors, millwork shops, interior design studios, or building-materials retailers.',
  },
  {
    title: 'Defined Service Area & Local Team',
    desc: 'Businesses with an established local presence, a defined geographic service territory, and a customer-facing team.',
  },
  {
    title: 'Pickup & Delivery Execution Capacity',
    desc: 'Operational capability to coordinate local order pickups, warehouse handoffs, and customer job-site delivery.',
  },
  {
    title: 'Brand & Policy Alignment',
    desc: 'Commitment to operating independently while upholding VanStro standardized product specifications, quality standards, and customer disclosure policies.',
  },
];

const NOT_FIT_CRITERIA = [
  {
    title: 'No Local Customer Service Capacity',
    desc: 'Operators without dedicated staff or facilities to handle customer inquiries, pickups, or localized support.',
  },
  {
    title: 'Expecting Platform to Absorb Local Labor Liability',
    desc: 'Businesses expecting VanStro to perform on-site installations, measure visits, or absorb localized service liabilities.',
  },
  {
    title: 'Expecting Guaranteed Customer Referrals Without Local Commitment',
    desc: 'Applicants expecting guaranteed sales quotas, territorial lockouts, or financial subsidies without active local operational investment.',
  },
];

const FAQS = [
  {
    q: 'How does the VanStro Dealer Program operating model work?',
    a: 'VanStro operates a hybrid model separating the centralized supply platform from localized dealer services. VanStro handles global sourcing, catalog management, national inventory, and digital checkout. Independent authorized dealers handle local customer communication, showroom displays, order execution, pickup coordination, and value-added services like installation.',
  },
  {
    q: 'How are dealer-provided services (such as installation) billed?',
    a: 'VanStro provides national standardized platform pricing for the products themselves. Any local services provided by the dealer — including on-site measuring, kitchen assembly, installation, or custom millwork adjustments — are priced, contracted, and billed directly and independently by the authorized dealer.',
  },
  {
    q: 'Does submitting a dealer application guarantee territory exclusivity or approval?',
    a: 'No. All dealer applications are reviewed on a case-by-case basis. Submitting an application does not automatically guarantee acceptance, exclusive service area rights, pricing tiers, inventory access, or customer referrals. Final terms require written approval and a formal agreement from VanStro Global Supply Inc.',
  },
  {
    q: 'Where are VanStro products fulfilled and distributed from?',
    a: 'Central supply operations and inventory are managed from VanStro central warehouse at 856 Century Street in Winnipeg, Manitoba, coordinating with regional staging and pickup partners across Canadian provinces.',
  },
  {
    q: 'What products are included in the VanStro supply catalog?',
    a: 'The core product catalog includes ready-to-assemble (RTA) modular kitchen cabinets (FSC birch plywood box construction), bathroom vanities, quartz vanity tops, wall panels, architectural mouldings, baseboards, and soft-close cabinet hardware.',
  },
];

export default function DealerProgramPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: DealerProgramPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('VS-DLR-829140');
  const [formData, setFormData] = useState({
    companyLegalName: '',
    dbaName: '',
    businessType: 'Kitchen & Bath Showroom',
    yearsOperating: '3-5 Years',
    address: '',
    city: '',
    province: 'Manitoba',
    postalCode: '',
    serviceArea: '',
    hasCustomerTeam: 'Yes',
    hasPickupFacility: 'Yes',
    offersInstallation: 'Yes',
    contactName: '',
    contactTitle: '',
    email: '',
    phone: '',
    businessOverview: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionRef(`VS-DLR-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#181715] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#181715]">
      {/* Universal Top Navigation */}
      <Navbar
        currentView="dealer-program"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenChecklist={onOpenChecklistModal}
      />

      <main className="flex-1">
        {/* =========================================================================
            HERO: Authentic VanStro Dealer Program Header
        ========================================================================= */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#EAE6DF] bg-gradient-to-b from-[#FAF8F5] via-[#FFFFFF] to-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase mb-8">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('about')}
                className="text-[#8C827A] hover:text-[#181715] transition-colors"
              >
                VanStro Canada
              </button>
              <span className="text-[#C5A069]">/</span>
              <span className="text-[#9B7A4F] font-semibold">Dealer Network</span>
              <span className="text-[#C5A069]">/</span>
              <span className="text-[#181715] font-bold">Dealer Program</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAF5EE] border border-[#DFD6C5] text-[#9B7A4F] text-[11px] font-mono uppercase tracking-widest font-semibold mb-6">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Authorized Dealer Partnership</span>
                </div>

                <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#181715] leading-[1.08] font-normal tracking-tight mb-6">
                  VanStro Dealer Program
                </h1>

                <p className="text-base sm:text-lg text-[#5A554E] leading-relaxed max-w-2xl mb-8">
                  VanStro connects established global manufacturing with local Canadian businesses. Our dealer program separates the centralized digital supply platform from localized customer-facing operations — enabling independent showrooms, contractors, and building-material businesses to deliver quality cabinetry with dedicated local execution.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#application"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#181715] hover:bg-[#9B7A4F] text-[#FAF7F2] text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm"
                  >
                    <span>Submit Dealer Profile</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A069]" />
                  </a>

                  <a
                    href="#model"
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#FAF7F2] hover:bg-[#F3EFEA] text-[#181715] border border-[#DFD6C5] text-xs font-mono uppercase tracking-widest font-medium transition-colors"
                  >
                    <span>Review Operating Model</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('dealers-map')}
                    className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-mono uppercase tracking-wider text-[#6B665F] hover:text-[#181715] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#9B7A4F]" />
                    <span>View Dealer Map</span>
                  </button>
                </div>
              </div>

              {/* Operating Summary Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#FAF7F2] border border-[#DFD6C5] p-8 relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#9B7A4F]" />
                  
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#9B7A4F] font-bold block mb-2">
                    Operating Principle
                  </span>
                  <h3 className="text-xl font-serif-luxury font-medium text-[#181715] mb-4">
                    Platform Scale + Local Execution
                  </h3>
                  <p className="text-xs text-[#5A554E] leading-relaxed mb-6">
                    VanStro provides the national supply infrastructure, digital product catalog, and centralized logistics. Independent local dealers manage the customer relationship, physical product handoff, and localized services.
                  </p>

                  <div className="space-y-3 border-t border-[#EAE6DF] pt-6 text-xs text-[#5A554E]">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9B7A4F] shrink-0 mt-0.5" />
                      <span><strong>National Product Catalog:</strong> Standardized specifications and transparent platform pricing.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9B7A4F] shrink-0 mt-0.5" />
                      <span><strong>Independent Service Pricing:</strong> Dealers price and bill local installation and services separately.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9B7A4F] shrink-0 mt-0.5" />
                      <span><strong>Case-by-Case Review:</strong> Applications are evaluated on operational capacity and local market fit.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: The Operating Model & Division of Responsibilities
        ========================================================================= */}
        <section id="model" className="py-16 sm:py-20 border-b border-[#EAE6DF] bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono tracking-widest uppercase text-[#9B7A4F] font-semibold block mb-2">
                Operational Framework
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#181715] font-normal tracking-tight mb-4">
                The Operating Model &amp; Division of Responsibilities
              </h2>
              <p className="text-sm sm:text-base text-[#6B665F] leading-relaxed">
                A clear division of roles between the VanStro centralized platform and the independent authorized local dealer ensures operational accountability, transparent customer expectations, and sustainable local business growth.
              </p>
            </div>

            {/* Division of Responsibilities Table */}
            <div className="border border-[#DFD6C5] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 bg-[#FAF7F2] border-b border-[#DFD6C5] text-xs font-mono uppercase tracking-wider text-[#181715] font-bold p-4 sm:px-6">
                <div className="md:col-span-3">Functional Area</div>
                <div className="md:col-span-5 text-[#9B7A4F]">VanStro Platform Role</div>
                <div className="md:col-span-4 text-[#181715]">Local Dealer Partner Role</div>
              </div>

              {RESPONSIBILITIES_MATRIX.map((item, index) => (
                <div
                  key={item.area}
                  className={`grid grid-cols-1 md:grid-cols-12 p-5 sm:px-6 gap-4 items-start text-xs border-b border-[#EAE6DF] last:border-b-0 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]/60'
                  }`}
                >
                  <div className="md:col-span-3 font-serif-luxury text-sm font-semibold text-[#181715]">
                    {item.area}
                  </div>
                  <div className="md:col-span-5 text-[#5A554E] leading-relaxed">
                    <span className="md:hidden font-mono font-bold text-[#9B7A4F] block mb-1">
                      VanStro Platform:
                    </span>
                    {item.platformRole}
                  </div>
                  <div className="md:col-span-4 text-[#5A554E] leading-relaxed">
                    <span className="md:hidden font-mono font-bold text-[#181715] block mb-1">
                      Local Dealer Partner:
                    </span>
                    {item.dealerRole}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: Who is a Good Fit? (Qualifications & Expectations)
        ========================================================================= */}
        <section className="py-16 sm:py-20 border-b border-[#EAE6DF] bg-[#FAF7F2]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono tracking-widest uppercase text-[#9B7A4F] font-semibold block mb-2">
                Partner Profile
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#181715] font-normal tracking-tight mb-4">
                Who Is a Good Fit for the Dealer Network?
              </h2>
              <p className="text-sm sm:text-base text-[#6B665F] leading-relaxed">
                We partner with established local operators who take pride in customer service, physical order execution, and long-term community presence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Positive Alignment */}
              <div className="bg-white border border-[#DFD6C5] p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#EAE6DF]">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#DFD6C5] flex items-center justify-center text-[#9B7A4F]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-xl font-medium text-[#181715]">
                      A Strong Fit For Partnership
                    </h3>
                    <span className="text-xs text-[#8C827A] font-mono">
                      Core partner competencies
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {GOOD_FIT_CRITERIA.map((crit) => (
                    <div key={crit.title} className="space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#181715] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#9B7A4F] rounded-full" />
                        {crit.title}
                      </h4>
                      <p className="text-xs text-[#5A554E] leading-relaxed pl-3.5">
                        {crit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Not a Fit Yet */}
              <div className="bg-white border border-[#DFD6C5] p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#EAE6DF]">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#DFD6C5] flex items-center justify-center text-[#8C827A]">
                    <XCircle className="w-5 h-5 text-[#8C827A]" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-xl font-medium text-[#181715]">
                      Not a Fit at This Stage
                    </h3>
                    <span className="text-xs text-[#8C827A] font-mono">
                      Operating misalignments
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {NOT_FIT_CRITERIA.map((crit) => (
                    <div key={crit.title} className="space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#6B665F] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#8C827A] rounded-full" />
                        {crit.title}
                      </h4>
                      <p className="text-xs text-[#6B665F] leading-relaxed pl-3.5">
                        {crit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: Authentic Application Intake Form & Disclosures
        ========================================================================= */}
        <section id="application" className="py-16 sm:py-20 border-b border-[#EAE6DF] bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Form Disclosures */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-6">
                  <div>
                    <span className="text-xs font-mono tracking-widest uppercase text-[#9B7A4F] font-semibold block mb-2">
                      Application &amp; Review Policy
                    </span>
                    <h2 className="font-serif-luxury text-3xl text-[#181715] font-normal tracking-tight mb-4">
                      Submit Your Company Profile
                    </h2>
                    <p className="text-sm text-[#5A554E] leading-relaxed">
                      All dealer applications are evaluated individually on a case-by-case basis by VanStro Global Supply Inc. in Winnipeg.
                    </p>
                  </div>

                  {/* Authentic Legal Disclosures */}
                  <div className="p-5 bg-[#FAF7F2] border border-[#DFD6C5] space-y-3 text-xs text-[#5A554E]">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-[#9B7A4F] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#181715] block">No Automatic Guarantees:</strong>
                        <span>
                          Submitting an application form does not automatically guarantee approval, exclusive service area rights, pricing tiers, inventory access, or customer referrals.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <FileText className="w-4 h-4 text-[#9B7A4F] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#181715] block">Formal Agreement Required:</strong>
                        <span>
                          Final commercial terms, operational responsibilities, and onboarding schedules require written approval and formal agreement from VanStro.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-[#9B7A4F] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#181715] block">Head Office Review:</strong>
                        <span>
                          Central team in Winnipeg reviews submissions and reaches out to qualified candidates for preliminary operational discussions.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-[#EAE6DF] text-xs text-[#6B665F]">
                    <span className="font-mono text-[#181715] font-semibold block mb-1">
                      Direct Inquiries:
                    </span>
                    <p>Dealer Desk: <a href="mailto:dealer@vanstro.ca" className="text-[#9B7A4F] hover:underline">dealer@vanstro.ca</a></p>
                    <p>Phone: 204-777-6668 | Toll-Free: 1-855-826-7876</p>
                  </div>
                </div>
              </div>

              {/* Form Input Container */}
              <div className="lg:col-span-7">
                <div className="bg-[#FAF7F2] border border-[#DFD6C5] p-8 sm:p-10 shadow-sm">
                  {formSubmitted ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#DFD6C5] text-[#9B7A4F] flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="font-serif-luxury text-2xl text-[#181715] font-medium">
                        Dealer Application Received
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5A554E] max-w-md mx-auto leading-relaxed">
                        Thank you for submitting your company profile for <span className="font-bold text-[#181715]">{formData.companyLegalName || 'your business'}</span>. The VanStro dealer review desk will review your submission on a case-by-case basis.
                      </p>
                      <div className="p-4 bg-white border border-[#DFD6C5] max-w-sm mx-auto text-left text-xs font-mono text-[#6B665F] space-y-1">
                        <div><strong>Submission Ref:</strong> {submissionRef}</div>
                        <div><strong>Review Desk:</strong> VanStro Central (Winnipeg)</div>
                        <div><strong>Follow-up Contact:</strong> dealer@vanstro.ca</div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="bg-[#181715] hover:bg-[#9B7A4F] text-[#FAF7F2] text-xs font-mono uppercase tracking-widest px-6 py-2.5 rounded-none"
                      >
                        Submit Another Profile
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="border-b border-[#EAE6DF] pb-3 mb-4">
                        <span className="text-xs font-mono tracking-widest uppercase text-[#9B7A4F] font-bold block mb-1">
                          Dealer Profile Intake
                        </span>
                        <h3 className="text-base font-serif-luxury text-[#181715]">
                          Business Information &amp; Operational Capacity
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Company Legal Name *
                          </label>
                          <input
                            type="text"
                            name="companyLegalName"
                            required
                            placeholder="e.g. Prairie Cabinet Works Ltd."
                            value={formData.companyLegalName}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            DBA / Trade Name (If Different)
                          </label>
                          <input
                            type="text"
                            name="dbaName"
                            placeholder="Trade name or storefront name"
                            value={formData.dbaName}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Primary Business Type *
                          </label>
                          <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          >
                            <option>Kitchen &amp; Bath Showroom / Design Studio</option>
                            <option>General Contractor / Renovation Business</option>
                            <option>Building Materials Retailer / Supply Yard</option>
                            <option>Independent Cabinet Maker / Millwork Shop</option>
                            <option>Local Distributor / Commercial Operator</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Years In Operation *
                          </label>
                          <select
                            name="yearsOperating"
                            value={formData.yearsOperating}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          >
                            <option>Under 1 Year (New Business)</option>
                            <option>1 - 3 Years</option>
                            <option>3 - 5 Years</option>
                            <option>5 - 10 Years</option>
                            <option>10+ Years Established</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Business Address / Facility Location *
                          </label>
                          <input
                            type="text"
                            name="address"
                            required
                            placeholder="Street address & unit #"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Province *
                          </label>
                          <select
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          >
                            <option>Manitoba</option>
                            <option>Alberta</option>
                            <option>Quebec</option>
                            <option>Saskatchewan</option>
                            <option>British Columbia</option>
                            <option>Ontario</option>
                            <option>Other / Atlantic Canada</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                          Proposed Dealer Service Area (City / Regions Covered) *
                        </label>
                        <input
                          type="text"
                          name="serviceArea"
                          required
                          placeholder="e.g. Greater Winnipeg, Brandon & Westman, Southern Alberta corridor..."
                          value={formData.serviceArea}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Customer-Facing Team?
                          </label>
                          <select
                            name="hasCustomerTeam"
                            value={formData.hasCustomerTeam}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          >
                            <option>Yes, dedicated staff</option>
                            <option>Owner-operated team</option>
                            <option>Currently staffing up</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Pickup / Warehouse Facility?
                          </label>
                          <select
                            name="hasPickupFacility"
                            value={formData.hasPickupFacility}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          >
                            <option>Yes, commercial warehouse / dock</option>
                            <option>Showroom with back storage</option>
                            <option>Job-site direct delivery setup</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Offer Installation Services?
                          </label>
                          <select
                            name="offersInstallation"
                            value={formData.offersInstallation}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          >
                            <option>Yes, in-house installation</option>
                            <option>Yes, partner subcontractor network</option>
                            <option>Product supply only (No install)</option>
                          </select>
                        </div>
                      </div>

                      <div className="border-t border-[#EAE6DF] pt-4">
                        <span className="text-xs font-mono tracking-widest uppercase text-[#9B7A4F] font-bold block mb-1">
                          Primary Contact
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="contactName"
                            required
                            placeholder="Primary contact name"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Position / Title *
                          </label>
                          <input
                            type="text"
                            name="contactTitle"
                            required
                            placeholder="e.g. Owner, Managing Director"
                            value={formData.contactTitle}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="name@business.ca"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Business telephone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                          Brief Business Overview &amp; Operating Capabilities
                        </label>
                        <textarea
                          name="businessOverview"
                          rows={3}
                          placeholder="Provide a brief summary of your showroom space, current supplier relationships, customer segments, or fulfillment capacity..."
                          value={formData.businessOverview}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#181715] hover:bg-[#9B7A4F] text-[#FAF7F2] text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Send className="w-4 h-4 text-[#C5A069]" />
                        <span>Submit Application for Case-by-Case Review</span>
                      </button>

                      <p className="text-[11px] text-[#8C827A] text-center font-mono">
                        Submitting this form signifies application interest only. Final dealer authorization requires formal written agreement with VanStro Global Supply Inc.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: Authentic Program FAQs
        ========================================================================= */}
        <section className="py-16 sm:py-20 border-b border-[#EAE6DF] bg-[#FAF7F2]">
          <div className="max-w-[900px] mx-auto px-6 sm:px-10">
            <div className="text-center mb-12">
              <span className="text-xs font-mono tracking-widest uppercase text-[#9B7A4F] font-semibold block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#181715] font-normal tracking-tight mb-4">
                Dealer Program FAQs
              </h2>
              <p className="text-sm text-[#6B665F]">
                Authentic operational and policy guidance for prospective Canadian dealer partners.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="border border-[#DFD6C5] bg-white transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-serif-luxury text-base sm:text-lg text-[#181715] font-medium">
                        {faq.q}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#DFD6C5] flex items-center justify-center shrink-0 text-[#9B7A4F]">
                        {isOpen ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-[#5A554E] leading-relaxed border-t border-[#EAE6DF]/60 mt-1">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CTA BANNER: Head Office Contact
        ========================================================================= */}
        <section className="py-14 bg-[#181715] text-[#FAF7F2]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A069] font-bold block mb-1">
                VanStro Head Office
              </span>
              <h3 className="font-serif-luxury text-2xl text-white font-medium">
                Have questions before submitting your company profile?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl">
                Contact our dealer desk at 856 Century Street, Winnipeg, MB R3H 0M5 or email <span className="font-mono text-[#C5A069]">dealer@vanstro.ca</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="mailto:dealer@vanstro.ca"
                className="px-6 py-3 bg-[#9B7A4F] hover:bg-[#C5A069] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
              >
                Email Dealer Desk
              </a>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('dealers-map')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono uppercase tracking-widest font-medium transition-colors"
              >
                View Dealer Map
              </button>
            </div>
          </div>
        </section>
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
