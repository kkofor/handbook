'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  AlertCircle,
  FileText,
  Search,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  Printer,
  ChevronRight,
  Info,
} from 'lucide-react';

interface WarrantyPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

export default function WarrantyPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: WarrantyPageProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Interactive 12-month policy calculator state
  const [purchaseDate, setPurchaseDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    return d.toISOString().split('T')[0];
  });
  const [serialNumber, setSerialNumber] = useState('');

  // Eligibility check
  const status = useMemo(() => {
    if (!purchaseDate) return null;
    const pDate = new Date(purchaseDate);
    if (isNaN(pDate.getTime())) return null;

    const expiryDate = new Date(pDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const today = new Date();
    const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isCovered = diffDays >= 0;

    return {
      expiryDate: expiryDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }),
      daysRemaining: diffDays,
      isCovered,
    };
  }, [purchaseDate]);

  return (
    <div className="min-h-screen bg-white text-[#10201d] font-sans antialiased selection:bg-[#f28a0b]/20 selection:text-[#003f3f]">
      <Navbar
        currentView="warranty"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateToContact={() => onNavigate?.('contact')}
        onOpenChecklist={onOpenChecklistModal}
      />

      {/* Hero */}
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
            <span className="text-[#003f3f] font-semibold">Warranty</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#003f3f]">
              <ShieldCheck className="w-4 h-4 text-[#003f3f]" />
              <span className="uppercase tracking-wider">Limited Warranty Policy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003f3f] tracking-tight leading-[1.1]">
              Limited 12-Month Warranty Policy
            </h1>

            <p className="text-base sm:text-xl text-[#315b60] leading-relaxed font-medium">
              Kitchen Cabinet &amp; Bathroom Vanity Products
            </p>

            <div className="p-4 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg text-xs sm:text-sm text-[#10201d]">
              <strong>Important:</strong> VanStro warrants only the cabinet products it supplies.
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Coverage Status Checker */}
      <section className="py-10 border-b border-[#d9e1df] bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="bg-white p-6 sm:p-8 border border-[#d9e1df] rounded-xl shadow-xs space-y-6">
            <div className="border-b border-[#d9e1df] pb-4">
              <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] block mb-1">
                Policy Verification
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
                Check Your 12-Month Coverage Window
              </h2>
              <p className="text-xs text-[#5f7376] mt-1">
                Enter your original purchase date and product Serial Number (SN) to check coverage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#10201d]">Date of Purchase *</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#10201d]">Product Serial Number (SN)</label>
                <input
                  type="text"
                  placeholder="e.g. SN-023621011-MB"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                />
              </div>

              <div>
                {status && (
                  <div className={`p-3 rounded-md text-xs border ${
                    status.isCovered
                      ? 'bg-[#edf4ee] border-[#0b7a4b]/30 text-[#0b7a4b]'
                      : 'bg-[#fff4f2] border-[#a33125]/30 text-[#a33125]'
                  }`}>
                    <p className="font-bold">
                      {status.isCovered
                        ? `Covered · ${status.daysRemaining} days remaining`
                        : '12-Month Coverage Period Expired'}
                    </p>
                    <p className="text-[11px] opacity-90">
                      Policy window through: {status.expiryDate}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Warranty Policy Terms (100% verbatim from vanstro.ca/warranty) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          
          {/* Section 1: Coverage */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
              Coverage
            </h2>
            <p className="text-sm sm:text-base text-[#10201d] leading-relaxed">
              VanStro warrants to the original end-customer purchaser that kitchen cabinets, bathroom vanities, hinges, and drawer slides shall be free from defects in materials and workmanship under normal residential use for a period of twelve (12) months from the date of original end-customer purchase. The warranty is non-transferable to the maximum extent permitted by applicable law, and proof of purchase is required.
            </p>
          </div>

          {/* Section 2: Exclusions */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
              Exclusions
            </h2>
            <p className="text-sm text-[#10201d]">This warranty does not cover:</p>
            <ul className="space-y-2 text-sm text-[#315b60] pl-5 list-disc">
              <li>Normal wear and tear</li>
              <li>Damage caused by misuse, abuse, or improper installation</li>
              <li>Environmental conditions, including but not limited to humidity, temperature, and light exposure</li>
              <li>Improper handling or storage</li>
              <li>Force majeure events</li>
              <li>Any labour costs, including removal and reinstallation</li>
            </ul>
          </div>

          {/* Section 3: Notification Period */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
              Notification Period
            </h2>
            <p className="text-sm sm:text-base text-[#10201d] leading-relaxed">
              The customer must provide written notice of any claimed defect to VanStro or the selling dealer within thirty (30) days of discovering such defect, and in any event before the expiration of the warranty period. Where applicable law provides for a longer reasonable period or does not permit a fixed notice period, the applicable law shall prevail.
            </p>
          </div>

          {/* Section 4: Warranty Remedy */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
              Warranty Remedy
            </h2>
            <p className="text-sm sm:text-base text-[#10201d] leading-relaxed">
              VanStro reserves the right, at its sole and absolute discretion, to repair or replace defective products with functionally equivalent products of equal or better quality. Replacement parts may differ from the original. VanStro covers the cost of replacement parts only; all other costs, including installation, removal, and transportation costs, shall be the responsibility of the selling dealer or the customer, as separately allocated. Repair or replacement under this warranty shall not extend or renew the warranty period. VanStro reserves the right to require inspection or verification of any claimed defective product prior to approving replacement.
            </p>
          </div>

          {/* Section 5: Serial Number Requirement */}
          <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
            <h2 className="text-xl font-bold text-[#003f3f]">
              Serial Number Requirement
            </h2>
            <p className="text-sm text-[#10201d] leading-relaxed font-medium">
              All warranty claims must include a valid product Serial Number (SN). Claims without valid product SN identification will be rejected.
            </p>
          </div>

          {/* Section 6: Statutory Rights */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
              Statutory Rights
            </h2>
            <p className="text-sm sm:text-base text-[#10201d] leading-relaxed">
              Nothing in this warranty shall affect or limit the customer’s statutory rights under any applicable Canadian provincial consumer protection laws, including but not limited to provincial Consumer Protection Acts, Sale of Goods Acts, and other mandatory consumer protection statutes. In particular, for customers in the Province of Québec, this includes (where applicable) the Consumer Protection Act of Québec and the hidden defect (vices cachés) provisions of the Civil Code of Québec. Where applicable law provides longer warranty periods or non-excludable rights, those rights shall prevail.
            </p>
          </div>

          {/* Section 7 & 8: Scope and Governing Law */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
              <h3 className="text-base font-bold text-[#003f3f]">Scope</h3>
              <p className="text-xs sm:text-sm text-[#315b60] leading-relaxed">
                This warranty is valid only within Canada.
              </p>
            </div>

            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
              <h3 className="text-base font-bold text-[#003f3f]">Governing Law</h3>
              <p className="text-xs sm:text-sm text-[#315b60] leading-relaxed">
                This warranty shall be governed by and construed in accordance with the laws of the Province of Manitoba, Canada, except where the customer’s province of residence requires the application of its own mandatory consumer protection laws that cannot be excluded by agreement.
              </p>
            </div>
          </div>

          {/* Section 9: Warranty Claim */}
          <div className="p-6 bg-[#edf4ee] border border-[#0b7a4b]/30 rounded-xl space-y-3">
            <h2 className="text-xl font-bold text-[#003f3f]">
              Warranty Claim
            </h2>
            <p className="text-sm text-[#10201d] leading-relaxed">
              To make a warranty claim, please contact your authorized VanStro dealer first, providing written notice, product SN, and proof of purchase. If the dealer is unavailable, contact VanStro directly. If the dealer provides its own extended warranty, the dealer’s written terms shall apply within the scope of such extension.
            </p>
          </div>

          {/* Section 10: Support */}
          <div className="pt-6 border-t border-[#d9e1df] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-[#5f7376]">
            <div>
              <p className="font-bold text-[#003f3f]">Full warranty document</p>
              <p>This page lists the key terms of the current warranty policy. Effective date: May 2, 2026.</p>
            </div>
            <a
              href="mailto:warranty@vanstro.ca"
              className="text-[#003f3f] font-semibold underline flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>warranty@vanstro.ca</span>
            </a>
          </div>

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
