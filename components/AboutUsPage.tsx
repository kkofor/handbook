'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Globe,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface AboutUsPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

export default function AboutUsPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: AboutUsPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#10201d] font-sans antialiased selection:bg-[#f28a0b]/20 selection:text-[#003f3f]">
      {/* Navbar */}
      <Navbar
        currentView="about"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
        onNavigateToContact={() => onNavigate?.('contact')}
        onOpenChecklist={onOpenChecklistModal}
      />

      {/* 1. Hero */}
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
            <span className="text-[#003f3f] font-semibold">About us</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
              More Than a Supplier
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003f3f] tracking-tight leading-[1.1]">
              A Better Way to Bring Building Materials to Canada.
            </h1>
            <p className="text-base sm:text-lg text-[#315b60] leading-relaxed font-normal">
              VanStro Global Supply Inc. is a Canadian company headquartered in Winnipeg, Manitoba, distributing building materials through authorized local dealers.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => onNavigate?.('dealers-map')}
                className="bg-[#003f3f] hover:bg-[#0f5554] text-white px-6 py-2.5 text-sm font-semibold rounded-md"
              >
                Find dealer locations
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate?.('contact')}
                className="border-[#d9e1df] text-[#003f3f] hover:bg-[#f5f8f7] px-6 py-2.5 text-sm font-medium rounded-md"
              >
                Contact VanStro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What We Do */}
      <section className="py-12 sm:py-16 border-b border-[#d9e1df] bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              What We Do
            </h2>
            <p className="text-sm sm:text-base text-[#315b60] leading-relaxed">
              We are a national supply chain and distribution platform specializing in building materials, including ready-to-assemble (RTA) kitchen cabinets, bathroom vanities, wall panels, baseboards and related products.
            </p>
            <p className="text-sm sm:text-base text-[#315b60] leading-relaxed">
              Through long-term partnerships with leading manufacturers, we provide consistent quality, reliable supply, competitive pricing and dependable local support. Our mission is to connect established manufacturing with local service.
            </p>
            <p className="text-xs sm:text-sm text-[#5f7376] italic">
              We believe that strong local businesses are the foundation of strong communities, and our platform is built to support their long-term growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg shadow-xs space-y-3">
              <Globe className="w-6 h-6 text-[#f28a0b]" />
              <h3 className="text-lg font-bold text-[#003f3f]">Global Sourcing &amp; Traceability</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                We source products from leading manufacturers around the world through a carefully managed supply chain. Products are subject to documented quality-control and traceability procedures throughout the distribution process.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg shadow-xs space-y-3">
              <Building2 className="w-6 h-6 text-[#f28a0b]" />
              <h3 className="text-lg font-bold text-[#003f3f]">National Platform Support</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                By centralizing branding, marketing, customer development, supply chain management and operational support, VanStro handles many of the functions that traditionally required significant time, capital and resources from independent dealers.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#d9e1df] rounded-lg shadow-xs space-y-3">
              <Truck className="w-6 h-6 text-[#f28a0b]" />
              <h3 className="text-lg font-bold text-[#003f3f]">Authorized Dealer Network</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Our products are distributed through a network of authorized local dealers who provide delivery coordination, customer support, installation assistance and after-sales service. Services vary by dealer, order and service area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What Sets Us Apart */}
      <section className="py-12 sm:py-16 border-b border-[#d9e1df] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              What Sets Us Apart
            </h2>
            <p className="text-sm text-[#315b60] leading-relaxed">
              Quality products, competitive pricing and dependable local support, delivered through our authorized dealers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
              <h3 className="text-base font-bold text-[#003f3f]">Consistent Standards</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Wherever our authorized dealers operate, customers can expect the same quality products, fair pricing and commitment to service.
              </p>
            </div>

            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
              <h3 className="text-base font-bold text-[#003f3f]">Global Sourcing, Competitive Pricing</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Through long-term manufacturing partnerships and supply chain optimization, we deliver quality products at competitive prices. Pricing varies by product, order size, location and dealer.
              </p>
            </div>

            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
              <h3 className="text-base font-bold text-[#003f3f]">Local Service, National Support</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Our dealer partners combine local market knowledge with the strength and resources of a national distribution platform.
              </p>
            </div>

            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
              <h3 className="text-base font-bold text-[#003f3f]">Quality You Can Trust</h3>
              <p className="text-xs text-[#5f7376] leading-relaxed">
                Products are inspected, quality-controlled, labelled and traceable through our distribution process. Warranty coverage, exclusions and claim procedures vary by product and order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. National Platform. Local Service. */}
      <section className="py-12 sm:py-16 border-b border-[#d9e1df] bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              National Platform. Local Service.
            </h2>
            <p className="text-sm text-[#315b60] leading-relaxed">
              VanStro handles branding, marketing, sourcing and supply chain management. The authorized local dealer handles customer communication, order execution and local service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* VanStro Platform */}
            <div className="bg-white p-7 border border-[#d9e1df] rounded-lg space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#003f3f] border-b border-[#d9e1df] pb-3">
                VanStro Platform
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#10201d]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003f3f] mt-2 shrink-0" />
                  <span>Centralized branding, marketing and national customer development</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003f3f] mt-2 shrink-0" />
                  <span>Long-term manufacturer partnerships and supply chain management</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003f3f] mt-2 shrink-0" />
                  <span>Inventory coordination and supply chain support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003f3f] mt-2 shrink-0" />
                  <span>Product inspection, quality control and ongoing customer support</span>
                </li>
              </ul>
            </div>

            {/* Your Authorized Local Dealer */}
            <div className="bg-white p-7 border border-[#d9e1df] rounded-lg space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#003f3f] border-b border-[#d9e1df] pb-3">
                Your Authorized Local Dealer
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#10201d]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f28a0b] mt-2 shrink-0" />
                  <span>Customer communication and local support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f28a0b] mt-2 shrink-0" />
                  <span>Order execution and delivery coordination</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f28a0b] mt-2 shrink-0" />
                  <span>Installation assistance, where offered</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f28a0b] mt-2 shrink-0" />
                  <span>After-sales service within the dealer&apos;s service area</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#d9e1df] text-xs text-[#5f7376] leading-relaxed rounded-md">
            <p>
              Authorized dealers are independently operated businesses, not VanStro employees, branches or agents. Unless expressly authorized in writing, a dealer cannot bind VanStro or make commitments on VanStro&apos;s behalf. Transportation, pickup, installation assistance, post-sale support and other services vary by dealer, product, order and service area.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Choose Your Next Step */}
      <section className="py-12 sm:py-16 border-b border-[#d9e1df] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              Choose Your Next Step
            </h2>
            <p className="text-sm text-[#315b60] leading-relaxed">
              Browse products, ask about a project or explore the independent dealer program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#003f3f]">Planning a home project?</h3>
                <p className="text-xs text-[#5f7376] leading-relaxed">
                  Compare cabinets, vanities, trim and hardware, then view dealer locations and contact information.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.('dealers-map')}
                className="text-xs font-semibold text-[#003f3f] hover:text-[#f28a0b] inline-flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>View dealer locations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#003f3f]">Buying as a contractor or builder?</h3>
                <p className="text-xs text-[#5f7376] leading-relaxed">
                  Contact VanStro with product codes, quantities, project location and timeline for a quote.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.('contact')}
                className="text-xs font-semibold text-[#003f3f] hover:text-[#f28a0b] inline-flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Contact VanStro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#003f3f]">Interested in becoming a dealer?</h3>
                <p className="text-xs text-[#5f7376] leading-relaxed">
                  Review the program, qualification criteria and application process for participating as an independent local dealer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.('dealer-program')}
                className="text-xs font-semibold text-[#003f3f] hover:text-[#f28a0b] inline-flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Explore the dealer program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Commitment */}
      <section className="py-12 sm:py-16 bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 text-center max-w-3xl space-y-4">
          <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
            Our Commitment
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003f3f] tracking-tight">
            High Quality. Competitive Pricing. Service Close to Home.
          </h2>
          <p className="text-sm sm:text-base text-[#315b60] leading-relaxed">
            We connect reliable supply with local service so homeowners, contractors, builders and our dealer partners can move projects forward. Our commitment is straightforward: quality building materials, competitive pricing and dependable support close to home.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Button
              onClick={() => onNavigate?.('contact')}
              className="bg-[#003f3f] hover:bg-[#0f5554] text-white px-6 py-2.5 text-sm font-semibold rounded-md"
            >
              Contact Us
            </Button>
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
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
