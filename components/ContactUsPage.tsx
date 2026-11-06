'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import PrintableChecklistModal from './PrintableChecklistModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileText,
  UploadCloud,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface ContactUsPageProps {
  onBackToGuides?: () => void;
  onOpenChecklistModal?: () => void;
  onNavigate?: (view: string) => void;
}

interface DealerHub {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  mapsUrl: string;
}

const CANADIAN_DEALERS: DealerHub[] = [
  {
    id: 'mb01',
    code: 'MB01',
    name: 'Yuan Construction Ltd.',
    address: '856 Century Street',
    city: 'Winnipeg',
    province: 'MB',
    postalCode: 'R3H 0M5',
    phone: '204 221 8288',
    email: 'MB01@VANSTRO.CA',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM CST',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=856+Century+Street+Winnipeg+MB+R3H0M5',
  },
  {
    id: 'mb02',
    code: 'MB02',
    name: "Contractor's Corner",
    address: '408 Park Ave E',
    city: 'Brandon',
    province: 'MB',
    postalCode: 'R7A 7A2',
    phone: '(204) 727-3799',
    email: 'contactus@contractorscorner.ca',
    hours: 'Mon – Fri: 8:00 AM – 5:00 PM CST',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=408+Park+Ave+E+Brandon+MB+R7A7A2',
  },
  {
    id: 'on10',
    code: 'ON10',
    name: 'ON10 Distribution Hub',
    address: 'Regina Street South',
    city: 'Waterloo',
    province: 'ON',
    postalCode: 'N2J 4P9',
    phone: '431-877-2658',
    email: 'dealer@vanstro.ca',
    hours: 'Mon – Fri: 9:00 AM – 4:30 PM EST',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Regina+Street+South+Waterloo+ON+N2J4P9',
  },
  {
    id: 'qc10',
    code: 'QC10',
    name: 'QC10 Montreal West Depot',
    address: 'Saint-Jean Boulevard',
    city: 'Pointe-Claire',
    province: 'QC',
    postalCode: 'H9R 3J3',
    phone: '431-877-2658',
    email: 'dealer@vanstro.ca',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM EST',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Saint-Jean+Boulevard+Pointe-Claire+QC+H9R3J3',
  },
  {
    id: 'sk10',
    code: 'SK10',
    name: 'SK10 Prairie Hub',
    address: '3rd Avenue North',
    city: 'Saskatoon',
    province: 'SK',
    postalCode: 'S7K 0J5',
    phone: '431-877-2658',
    email: 'dealer@vanstro.ca',
    hours: 'Mon – Fri: 8:30 AM – 4:30 PM CST',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=3rd+Avenue+North+Saskatoon+SK+S7K0J5',
  },
  {
    id: 'ab01',
    code: 'AB01',
    name: 'Calgary Partner Hub',
    address: 'Dartmouth Road SE',
    city: 'Calgary',
    province: 'AB',
    postalCode: 'T2G 2M3',
    phone: '1-855-826-7876',
    email: 'support@vanstro.ca',
    hours: 'Mon – Fri: 9:00 AM – 4:30 PM MST',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dartmouth+Road+SE+Calgary+AB+T2G2M3',
  },
  {
    id: 'bc01',
    code: 'BC01',
    name: 'Saanich Partner Hub',
    address: 'Boleskine Road',
    city: 'Saanich',
    province: 'BC',
    postalCode: 'V8X 2W7',
    phone: '1-855-826-7876',
    email: 'support@vanstro.ca',
    hours: 'Mon – Fri: 9:00 AM – 4:30 PM PST',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Boleskine+Road+Saanich+BC+V8X2W7',
  },
];

const FAQS = [
  {
    q: 'How fast will I receive a reply to my inquiry?',
    a: 'We reply to most inquiries within one business day (Monday through Friday, 9:00 a.m. to 5:00 p.m. CST).',
  },
  {
    q: 'Does VanStro provide measuring or installation services?',
    a: 'No. VanStro does not provide installation or other on-site work. Those services are not included in the product price: your authorized local dealer provides them and bills you separately.',
  },
  {
    q: 'Can I pick up my cabinets directly from a dealer warehouse?',
    a: 'Yes. Free pickup is available at participating dealer locations (such as Yuan Construction Ltd. in Winnipeg). Your chosen dealer will contact you as soon as your order is ready for loading dock collection.',
  },
  {
    q: 'How do I apply to become an authorized VanStro dealer?',
    a: 'Select "Dealer program" in the topic dropdown or email dealer@vanstro.ca with your company registration, showroom details, and target regional territories.',
  },
  {
    q: 'Where can I inspect physical finish swatches and hinge samples?',
    a: 'Finish swatches (White and Light Grey matte soft-touch PVC) and working DTC 6-way hinge displays are maintained at our Winnipeg Head Office and authorized showroom dealers across Canada.',
  },
];

export default function ContactUsPage({
  onBackToGuides,
  onOpenChecklistModal,
  onNavigate,
}: ContactUsPageProps) {
  // Form State
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

  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>('ALL');
  const [copiedDealerId, setCopiedDealerId] = useState<string | null>(null);

  const handleSelectDealer = (dealerString: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDealer: dealerString,
    }));
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ticketNum = `VS-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmitting(false);
      setSubmittedTicket(ticketNum);
    }, 600);
  };

  const resetForm = () => {
    setSubmittedTicket(null);
    setFormData({
      name: '',
      email: '',
      topic: 'Product question',
      phone: '',
      cityProvince: '',
      preferredDealer: 'Not sure / route by location',
      orderNumber: '',
      message: '',
    });
    setAttachedFiles([]);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1A17] font-sans antialiased selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      {/* Authentic VanStro Clean Navigation */}
      <Navbar
        currentView="contact"
        onNavigate={onNavigate}
        onOpenChecklist={onOpenChecklistModal}
      />

      {/* Page Header / Hero: Quiet, Spacious, Uncluttered */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-[#E7E5E0] bg-[#F9F8F6] pt-12 pb-14 sm:pb-20"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#73706B] mb-8 font-sans">
            <button
              type="button"
              onClick={onBackToGuides}
              className="hover:text-[#1C1A17] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true" className="text-[#C4C0B6]">/</span>
            <span className="text-[#1C1A17]">Contact us</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#9B7A4F] font-mono block">
              Direct Inquiries
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C1A17] leading-[1.08]">
              Contact VanStro
            </h1>
            <p className="text-base sm:text-lg text-[#5E5A54] leading-relaxed max-w-2xl font-normal">
              Contact VanStro about products, orders, local dealers or becoming an authorized dealer.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider">
              <a
                href="#contact-form"
                className="px-6 py-3 bg-[#1C1A17] text-[#F9F8F6] hover:bg-[#333] transition-colors inline-flex items-center gap-2"
              >
                <span>Send a message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#dealer-hubs"
                className="px-6 py-3 border border-[#D5D1C7] text-[#1C1A17] hover:border-[#1C1A17] bg-white transition-colors"
              >
                Find dealer contact
              </a>
              <a
                href="tel:18558267876"
                className="px-4 py-3 text-[#5E5A54] hover:text-[#1C1A17] transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#9B7A4F]" />
                <span>1-855-VANSTRO</span>
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main 2-Column Working Area */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form (7 cols / 58%) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#E7E5E0]"
          >
            <div className="border-b border-[#E7E5E0] pb-6 mb-8">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9B7A4F] block mb-2">
                General Inquiry
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1A17] font-normal tracking-tight mb-2">
                Tell Us What You Need — We’ll Get It to the Right Person
              </h2>
              <p className="text-xs sm:text-sm text-[#73706B] leading-relaxed">
                Include your order number, product category, city, and preferred dealer if you have one.
              </p>
            </div>

            {submittedTicket ? (
              <div className="py-12 px-6 text-center space-y-5 bg-[#FAF9F6]">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#EAF3EB] text-[#244A29] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#9B7A4F] block mb-1">
                    Transmission Received
                  </span>
                  <p className="font-mono text-xl font-bold text-[#1C1A17]">
                    Reference {submittedTicket}
                  </p>
                </div>
                <p className="text-sm text-[#5E5A54] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-[#1C1A17]">{formData.name}</strong>. Your inquiry regarding{' '}
                  <span className="font-medium text-[#1C1A17]">{formData.topic}</span> has been logged. We reply to most inquiries within one business day at{' '}
                  <strong className="text-[#1C1A17]">{formData.email}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-mono text-white bg-[#1C1A17] hover:bg-[#333] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs text-[#5E5A54] block">
                      Name <span className="text-[#8B2627]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#D5D1C7] focus:outline-none focus:border-[#1C1A17] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs text-[#5E5A54] block">
                      Email <span className="text-[#8B2627]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#D5D1C7] focus:outline-none focus:border-[#1C1A17] transition-colors"
                    />
                  </div>
                </div>

                {/* Topic */}
                <div className="space-y-1.5">
                  <label htmlFor="topic" className="text-xs text-[#5E5A54] block">
                    Topic <span className="text-[#8B2627]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full h-11 px-3.5 pr-10 text-sm bg-white border border-[#D5D1C7] appearance-none focus:outline-none focus:border-[#1C1A17] transition-colors cursor-pointer"
                    >
                      <option value="Product question">Product question</option>
                      <option value="Order support">Order support</option>
                      <option value="Local dealer services">Local dealer services</option>
                      <option value="Dealer program">Dealer program</option>
                      <option value="Careers">Careers</option>
                      <option value="Website support">Website support</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#73706B] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Careers Disclosure if selected */}
                {formData.topic === 'Careers' && (
                  <p className="text-xs text-[#73706B] leading-relaxed p-3.5 bg-[#FAF9F6] border-l border-[#9B7A4F]">
                    For a careers inquiry, VanStro uses the information you submit to evaluate your inquiry, communicate with you, and make recruitment decisions.
                  </p>
                )}

                {/* Phone & City/Province */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs text-[#5E5A54] block">
                      Phone <span className="text-[#8C8880]">(Optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#D5D1C7] focus:outline-none focus:border-[#1C1A17] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="cityProvince" className="text-xs text-[#5E5A54] block">
                      City / province <span className="text-[#8C8880]">(Optional)</span>
                    </label>
                    <input
                      id="cityProvince"
                      type="text"
                      value={formData.cityProvince}
                      onChange={(e) => setFormData({ ...formData, cityProvince: e.target.value })}
                      placeholder="e.g. Winnipeg, MB"
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#D5D1C7] focus:outline-none focus:border-[#1C1A17] transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Dealer & Order Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="preferredDealer" className="text-xs text-[#5E5A54] block">
                      Preferred dealer
                    </label>
                    <div className="relative">
                      <select
                        id="preferredDealer"
                        value={formData.preferredDealer}
                        onChange={(e) => setFormData({ ...formData, preferredDealer: e.target.value })}
                        className="w-full h-11 px-3.5 pr-10 text-sm bg-white border border-[#D5D1C7] appearance-none focus:outline-none focus:border-[#1C1A17] transition-colors cursor-pointer"
                      >
                        <option value="Not sure / route by location">Not sure / route by location</option>
                        <option value="Winnipeg, MB (MB01 - Yuan Construction Ltd.)">Winnipeg, MB (856 Century St)</option>
                        <option value="Brandon, MB (MB02 - Contractor's Corner)">Brandon, MB (408 Park Ave E)</option>
                        <option value="Waterloo, ON (ON10)">Waterloo, ON (Regina St S)</option>
                        <option value="Pointe-Claire, QC (QC10)">Pointe-Claire, QC (Saint-Jean Blvd)</option>
                        <option value="Saskatoon, SK (SK10)">Saskatoon, SK (3rd Ave N)</option>
                        <option value="Calgary, AB (AB01)">Calgary, AB (T2G 2M3)</option>
                        <option value="Saanich, BC (BC01)">Saanich, BC (V8X 2W7)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#73706B] absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="orderNumber" className="text-xs text-[#5E5A54] block">
                      Order number <span className="text-[#8C8880]">(Optional)</span>
                    </label>
                    <input
                      id="orderNumber"
                      type="text"
                      placeholder="e.g. VS-49201"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#D5D1C7] focus:outline-none focus:border-[#1C1A17] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs text-[#5E5A54] block">
                    Message <span className="text-[#8B2627]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Include dimensions, product names, dealer location, or timing details."
                    className="w-full p-3.5 text-sm bg-white border border-[#D5D1C7] focus:outline-none focus:border-[#1C1A17] transition-colors leading-relaxed"
                  />
                </div>

                {/* File Attachment Dropzone */}
                <div className="space-y-2">
                  <span className="text-xs text-[#5E5A54] block">
                    Attach layout drawings or photos <span className="text-[#8C8880]">(Optional)</span>
                  </span>
                  <label className="border border-dashed border-[#D5D1C7] bg-[#FAF9F6] p-4 text-center cursor-pointer hover:bg-[#F0EDE6] transition-colors block">
                    <UploadCloud className="w-5 h-5 mx-auto text-[#9B7A4F] mb-1" />
                    <span className="text-xs text-[#1C1A17] font-medium block">
                      Click to browse or drop files
                    </span>
                    <span className="text-[11px] text-[#73706B] block">
                      PDF, DWG, PNG, JPEG up to 25MB
                    </span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileAttach}
                      accept=".pdf,.png,.jpg,.jpeg,.dwg"
                    />
                  </label>

                  {attachedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {attachedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white border border-[#D5D1C7] text-[#1C1A17]"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#9B7A4F]" />
                          <span className="truncate max-w-[180px]">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-[#8B2627] hover:font-bold ml-1 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#73706B] leading-relaxed pt-2">
                  This form sends your inquiry and contact details to VanStro. If you select a dealer or request local coordination, VanStro may share information reasonably necessary for that dealer to respond to your request.
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 text-xs uppercase tracking-[0.16em] font-mono font-medium text-white bg-[#1C1A17] hover:bg-[#333] transition-colors cursor-pointer"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Contact Details (5 cols / 42%) */}
          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
            aria-label="Contact details"
          >
            {/* Note banner */}
            <div className="border border-[#E7E5E0] bg-white p-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#9B7A4F] block mb-1">
                Best For
              </span>
              <p className="text-sm text-[#5E5A54] leading-relaxed">
                Quotes, order documents, warranty questions, dealer program questions and website help.
              </p>
            </div>

            {/* Quick channels */}
            <div className="border border-[#E7E5E0] bg-white divide-y divide-[#E7E5E0]">
              <a
                href="mailto:support@vanstro.ca"
                className="p-5 flex items-start gap-4 hover:bg-[#FAF9F6] transition-colors group"
              >
                <Mail className="w-5 h-5 text-[#9B7A4F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-medium text-[#1C1A17] block">Email support</strong>
                  <span className="text-xs text-[#73706B] group-hover:text-[#1C1A17]">support@vanstro.ca</span>
                </div>
              </a>

              <a
                href="tel:18558267876"
                className="p-5 flex items-start gap-4 hover:bg-[#FAF9F6] transition-colors group"
              >
                <Phone className="w-5 h-5 text-[#9B7A4F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-medium text-[#1C1A17] block">Phone support</strong>
                  <span className="text-xs text-[#73706B] group-hover:text-[#1C1A17]">
                    1-855-VANSTRO (1-855-826-7876)
                  </span>
                </div>
              </a>

              <a
                href="#dealer-hubs"
                className="p-5 flex items-start gap-4 hover:bg-[#FAF9F6] transition-colors group"
              >
                <MapPin className="w-5 h-5 text-[#9B7A4F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-medium text-[#1C1A17] block">Dealer routing</strong>
                  <span className="text-xs text-[#73706B] group-hover:text-[#1C1A17]">View dealer map</span>
                </div>
              </a>
            </div>

            {/* Service disclaimers */}
            <div className="space-y-4">
              <div className="border border-[#E7E5E0] bg-white p-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1C1A17] font-semibold">
                  <Clock className="w-4 h-4 text-[#9B7A4F]" />
                  <span>Business-day follow-up</span>
                </div>
                <p className="text-xs text-[#73706B] leading-relaxed">
                  We reply to most inquiries within one business day.
                </p>
              </div>

              <div className="border border-[#E7E5E0] bg-white p-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1C1A17] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#9B7A4F]" />
                  <span>Installation and local services</span>
                </div>
                <p className="text-xs text-[#73706B] leading-relaxed">
                  VanStro does not provide installation or other on-site work. Those services are not included in the product price: your local dealer provides them and bills you separately.
                </p>
              </div>

              <div className="border border-[#E7E5E0] bg-white p-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1C1A17] font-semibold">
                  <Building2 className="w-4 h-4 text-[#9B7A4F]" />
                  <span>Head office</span>
                </div>
                <p className="text-xs text-[#73706B] leading-relaxed">
                  VanStro Global Supply Inc. is headquartered in Winnipeg, Manitoba.<br />
                  856 Century Street, Winnipeg, MB R3H 0M5
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Canadian Dealer Locations Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        id="dealer-hubs"
        className="bg-[#F4F1EA] border-t border-b border-[#E0DCCE] py-16"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E0DCCE] pb-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9B7A4F] block">
                National Distribution Network
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1A17] font-normal tracking-tight">
                Authorized Canadian Dealer Hubs
              </h2>
              <p className="text-xs sm:text-sm text-[#5E5A54] leading-relaxed">
                VanStro products are stocked and distributed through our regional partner hubs for scheduled pickup or contractor freight delivery.
              </p>
            </div>

            {/* Province Filter Tabs Slice */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/70 rounded-lg border border-[#E0DCCE]">
              {['ALL', 'MB', 'ON', 'BC', 'AB'].map((prov) => {
                const isSelected = selectedProvince === prov;
                const count = prov === 'ALL'
                  ? CANADIAN_DEALERS.length
                  : CANADIAN_DEALERS.filter((d) => d.province === prov).length;
                return (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setSelectedProvince(prov)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#1C1A17] text-white font-semibold shadow-xs'
                        : 'text-[#73706B] hover:text-[#1C1A17] hover:bg-white/60'
                    }`}
                  >
                    <span>{prov}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[#EAE6DF] text-[#73706B]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CANADIAN_DEALERS
              .filter((d) => selectedProvince === 'ALL' || d.province === selectedProvince)
              .map((hub) => {
                const isCopied = copiedDealerId === hub.id;
                return (
                  <Card
                    key={hub.id}
                    className="border-[#E7E5E0] bg-white rounded-xl shadow-xs hover:border-[#1C1A17] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <CardHeader className="p-6 pb-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="copper" className="text-[10px] font-mono">
                          {hub.code}
                        </Badge>
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          {hub.province} · Official Hub
                        </Badge>
                      </div>

                      <CardTitle className="text-xl font-serif-luxury font-normal text-[#1C1A17]">
                        {hub.name}
                      </CardTitle>

                      <div className="text-xs text-[#5E5A54] space-y-1.5 pt-1 font-sans leading-relaxed">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#9B7A4F] shrink-0 mt-0.5" />
                          <span>{hub.address}, {hub.city}, {hub.province} {hub.postalCode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#9B7A4F] shrink-0" />
                          <span className="font-mono text-[11px] font-medium text-[#1C1A17]">{hub.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#8C8880]">
                          <Clock className="w-3.5 h-3.5 text-[#8C8880] shrink-0" />
                          <span>{hub.hours}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardFooter className="px-6 py-3.5 bg-[#FAF9F6] border-t border-[#F0EFEA] flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <a
                          href={hub.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#73706B] hover:text-[#1C1A17] flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span>Directions</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(`${hub.name}, ${hub.address}, ${hub.city}, ${hub.province}`);
                            setCopiedDealerId(hub.id);
                            setTimeout(() => setCopiedDealerId(null), 1800);
                          }}
                          className="text-[#73706B] hover:text-[#1C1A17] flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-[#244A29]" />
                              <span className="text-[#244A29]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelectDealer(`${hub.city}, ${hub.province} (${hub.code} - ${hub.name})`)}
                        className="text-[11px] font-mono h-7 px-2.5"
                      >
                        Route Order →
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </div>
      </motion.section>

      {/* FAQ Accordion */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[800px] mx-auto px-6 sm:px-10 py-16"
      >
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9B7A4F] block">
            Questions
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1A17] font-normal tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" defaultValue="item-0" className="w-full">
          {FAQS.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="px-1">
              <AccordionTrigger className="text-left font-serif-luxury text-lg hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-[#5E5A54] leading-relaxed pr-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>

      {/* Minimal Editorial Footer Strip */}
      <footer className="bg-[#181715] text-[#F9F8F6] border-t border-[#2A2722] py-12">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-serif-luxury text-xl font-normal text-white">VanStro Global Supply</p>
            <p className="text-xs text-[#A09D96]">856 Century Street, Winnipeg, MB R3H 0M5 · Canada</p>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#A09D96]">
            <a href="tel:18558267876" className="hover:text-white transition-colors">1-855-VANSTRO</a>
            <span>·</span>
            <a href="mailto:support@vanstro.ca" className="hover:text-white transition-colors">support@vanstro.ca</a>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                if (onOpenChecklistModal) onOpenChecklistModal();
                else setIsLocalModalOpen(true);
              }}
              className="text-[#C5A069] hover:underline cursor-pointer"
            >
              Checklist PDF
            </button>
          </div>
        </div>
      </footer>

      <PrintableChecklistModal
        isOpen={isLocalModalOpen}
        onClose={() => setIsLocalModalOpen(false)}
      />
    </div>
  );
}
