'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface ContactUsPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

export default function ContactUsPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Product question',
    phone: '',
    cityProvince: '',
    preferredDealer: 'Not sure / route by location',
    orderNumber: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#10201d] font-sans antialiased selection:bg-[#f28a0b]/20 selection:text-[#003f3f]">
      <Navbar
        currentView="contact"
        onNavigate={onNavigate}
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
            <span className="text-[#003f3f] font-semibold">Contact us</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
              Inquiries &amp; Support
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003f3f] tracking-tight leading-[1.1]">
              Contact VanStro
            </h1>
            <p className="text-base sm:text-lg text-[#315b60] leading-relaxed font-normal">
              Contact VanStro about products, orders, local dealers or becoming a dealer.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={scrollToForm}
                className="bg-[#003f3f] hover:bg-[#0f5554] text-white px-6 py-2.5 text-sm font-semibold rounded-md"
              >
                Send a message
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate?.('dealers-map')}
                className="border-[#d9e1df] text-[#003f3f] hover:bg-[#f5f8f7] px-6 py-2.5 text-sm font-medium rounded-md"
              >
                Find dealer contact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Main Form & Details */}
      <section className="py-12 sm:py-16 bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Form (7 cols) */}
            <div id="contact-form" className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#d9e1df] rounded-xl shadow-xs space-y-6 scroll-mt-24">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] block mb-1">
                  General inquiry
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
                  Tell Us What You Need — We’ll Get It to the Right Person
                </h2>
                <p className="text-xs sm:text-sm text-[#5f7376] mt-1">
                  Include your order number, product category, city, and preferred dealer if you have one.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-[#edf4ee] border border-[#0b7a4b]/30 rounded-lg text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-[#0b7a4b] mx-auto" />
                  <h3 className="text-lg font-bold text-[#003f3f]">Message Received</h3>
                  <p className="text-xs sm:text-sm text-[#315b60]">
                    Thank you, <strong>{formData.name}</strong>. We reply to most inquiries within one business day at <strong>{formData.email}</strong>.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#003f3f] text-white text-xs font-mono"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#10201d]">Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#10201d]">Email *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Topic *</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    >
                      <option value="Product question">Product question</option>
                      <option value="Order support">Order support</option>
                      <option value="Local dealer services">Local dealer services</option>
                      <option value="Dealer program">Dealer program</option>
                      <option value="Careers">Careers</option>
                      <option value="Website support">Website support</option>
                    </select>
                  </div>

                  {formData.topic === 'Careers' && (
                    <div className="p-3.5 bg-[#f5f8f7] border border-[#d9e1df] rounded-md text-xs text-[#5f7376] leading-relaxed">
                      For a careers inquiry, VanStro uses the information you submit to evaluate your inquiry, communicate with you, and make recruitment or engagement decisions. We retain it during that process and afterward only as necessary for the purposes for which it was collected, to meet legal and contractual obligations, and to resolve disputes. Read the Privacy Policy.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#10201d]">Phone (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#10201d]">City / province (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Winnipeg, MB"
                        value={formData.cityProvince}
                        onChange={(e) => setFormData({ ...formData, cityProvince: e.target.value })}
                        className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#10201d]">Preferred dealer</label>
                      <select
                        value={formData.preferredDealer}
                        onChange={(e) => setFormData({ ...formData, preferredDealer: e.target.value })}
                        className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                      >
                        <option value="Not sure / route by location">Not sure / route by location</option>
                        <option value="Calgary, AB">Calgary, AB</option>
                        <option value="Saanich, BC">Saanich, BC</option>
                        <option value="Brandon, MB">Brandon, MB</option>
                        <option value="Waterloo, ON">Waterloo, ON</option>
                        <option value="Pointe-Claire, QC">Pointe-Claire, QC</option>
                        <option value="Saskatoon, SK">Saskatoon, SK</option>
                        <option value="Winnipeg, MB">Winnipeg, MB</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#10201d]">Order number (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. VS-49201"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className="w-full h-10 px-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#10201d]">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 text-sm bg-white border border-[#d9e1df] rounded-md focus:outline-none focus:border-[#003f3f]"
                    />
                  </div>

                  <p className="text-[11px] text-[#5f7376] leading-relaxed">
                    This form sends your inquiry and contact details to VanStro. If you select a dealer or request local coordination, VanStro may share information reasonably necessary for that dealer to respond to your request. Read the Privacy Policy.
                  </p>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#003f3f] hover:bg-[#0f5554] text-white py-3 text-sm font-semibold rounded-md"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 border border-[#d9e1df] rounded-xl shadow-xs space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] block">
                  Use for
                </span>
                <p className="text-xs sm:text-sm text-[#315b60] leading-relaxed">
                  Quotes, order documents, warranty questions, dealer program questions and website help.
                </p>
              </div>

              <div className="bg-white border border-[#d9e1df] rounded-xl shadow-xs divide-y divide-[#d9e1df] overflow-hidden">
                <a
                  href="mailto:support@vanstro.ca"
                  className="p-5 flex items-start gap-4 hover:bg-[#f5f8f7] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#f28a0b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-[#003f3f] block">Email support</strong>
                    <span className="text-xs text-[#5f7376]">support@vanstro.ca</span>
                  </div>
                </a>

                <a
                  href="tel:18558267876"
                  className="p-5 flex items-start gap-4 hover:bg-[#f5f8f7] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#f28a0b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-[#003f3f] block">Phone support</strong>
                    <span className="text-xs text-[#5f7376]">1-855-VANSTRO (1-855-826-7876)</span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate?.('dealers-map')}
                  className="w-full text-left p-5 flex items-start gap-4 hover:bg-[#f5f8f7] transition-colors cursor-pointer"
                >
                  <MapPin className="w-5 h-5 text-[#f28a0b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-[#003f3f] block">Dealer routing</strong>
                    <span className="text-xs text-[#5f7376]">View dealer map</span>
                  </div>
                </button>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <div className="p-4 bg-white border border-[#d9e1df] rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#003f3f]">
                    <Clock className="w-4 h-4 text-[#f28a0b]" />
                    <span>Business-day follow-up</span>
                  </div>
                  <p className="text-[#5f7376]">We reply to most inquiries within one business day.</p>
                </div>

                <div className="p-4 bg-white border border-[#d9e1df] rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#003f3f]">
                    <ShieldCheck className="w-4 h-4 text-[#f28a0b]" />
                    <span>Installation and local services</span>
                  </div>
                  <p className="text-[#5f7376]">VanStro does not provide installation or other on-site work. Those services are not included in the product price: your local dealer provides them and bills you separately.</p>
                </div>

                <div className="p-4 bg-white border border-[#d9e1df] rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#003f3f]">
                    <Building2 className="w-4 h-4 text-[#f28a0b]" />
                    <span>Head office</span>
                  </div>
                  <p className="text-[#5f7376]">VanStro Global Supply Inc. is headquartered in Winnipeg, Manitoba.<br />856 Century Street, Winnipeg, MB R3H 0M5</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 FAQ Blocks */}
      <section className="py-12 border-b border-[#d9e1df] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
            <h3 className="font-bold text-[#003f3f]">Product and Order Questions</h3>
            <p className="text-xs text-[#5f7376]">Ask about stocked materials, order documents, pickup coordination, or after-sales help.</p>
          </div>
          <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
            <h3 className="font-bold text-[#003f3f]">Help from a local dealer</h3>
            <p className="text-xs text-[#5f7376]">For installation or other local services, contact the dealer you chose.</p>
          </div>
          <div className="p-6 bg-[#f5f8f7] border border-[#d9e1df] rounded-lg space-y-2">
            <h3 className="font-bold text-[#003f3f]">Dealer Program Inquiries</h3>
            <p className="text-xs text-[#5f7376]">Interested in joining the VanStro network? Send your company details and proposed dealer service area for review.</p>
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
    </div>
  );
}
