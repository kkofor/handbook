'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  ArrowRight,
  Building2,
  Users,
} from 'lucide-react';

interface CareersPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

export default function CareersPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: CareersPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>('boc');

  const roles = [
    {
      id: 'boc',
      title: 'Business Operations Coordinator',
      location: 'Winnipeg, Manitoba · In person · Full-time or part-time',
      summary:
        'Support daily operations, cross-team coordination and the systems that connect management, suppliers, service providers, dealers and internal departments.',
      required: [
        'Fluent English and Chinese communication skills, written and verbal.',
        'Strong organization, coordination, problem-solving and multi-priority management skills.',
        'Proficiency with Excel, Word, Outlook, Teams, SharePoint and OneDrive.',
        'Professional judgment, attention to detail, accountability and discretion with confidential information.',
      ],
      whatYoullDo: [
        'Coordinate communication among management, business development teams, suppliers, service providers and internal departments.',
        'Track operational tasks, project progress, action items and business reporting.',
        'Support office services, vendor relationships, records, meetings, procurement and facility coordination.',
        'Maintain accurate operational data across POS, CRM, Microsoft 365, product coding and SKU records.',
        'Assist with supplier follow-up, logistics, order tracking, dealer onboarding and customer records.',
      ],
      preferred: [
        'French language proficiency.',
        'Experience in operations, administration, project coordination, office management or business support.',
        'Experience with CRM, POS, ERP, inventory or related business systems.',
        'Experience in building materials, construction, distribution, wholesale or supply chain environments.',
      ],
    },
    {
      id: 'hrc',
      title: 'Human Resources Coordinator / Recruitment Specialist',
      location: 'Winnipeg, Manitoba · In person',
      summary:
        'Support hiring and team development through organized candidate communication, interview coordination, recruitment tracking and onboarding administration.',
      required: [
        'Experience in recruitment, human resources or a related administrative role.',
        'Strong communication, organization and time-management skills.',
        'Ability to manage multiple tasks and recruiting timelines.',
        'A proactive, detail-oriented approach in a fast-moving work environment.',
      ],
      whatYoullDo: [
        'Manage job postings across recruitment platforms.',
        'Screen résumés and prepare candidate shortlists.',
        'Coordinate interviews and follow up with candidates.',
        'Maintain recruitment tracking and documentation.',
        'Assist with onboarding and HR-related administrative tasks.',
      ],
      preferred: [
        'Experience recruiting for sales or business development roles.',
        'Familiarity with Canadian hiring practices.',
        'Experience using recruitment platforms such as Indeed or LinkedIn.',
      ],
    },
    {
      id: 'bdr',
      title: 'Business Development Representative',
      location: 'Winnipeg and surrounding areas · Office and field-based · Full-time or part-time, permanent',
      summary:
        'Develop dealer and trade-client relationships across the Prairie Provinces, support onboarding and maintain disciplined follow-up as accounts progress.',
      required: [
        'Legal entitlement to work in Canada.',
        'Ability to conduct field-based client visits and travel within assigned regions.',
        'A valid Canadian driver’s licence and reliable transportation.',
        'Self-motivation, professional communication and consistent follow-through.',
      ],
      whatYoullDo: [
        'Identify and develop dealership and trade-account opportunities.',
        'Visit building-material suppliers, cabinet showrooms and construction firms.',
        'Support dealer onboarding and ongoing account development.',
        'Maintain long-term business relationships and submit activity and market-observation reports.',
        'Handle client and dealer information in accordance with company confidentiality requirements.',
      ],
      preferred: [
        'Experience in B2B sales, channel development or trade-account management.',
        'Experience working with contractors, retailers, showrooms or building-material customers.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#10201d] font-sans antialiased selection:bg-[#f28a0b]/20 selection:text-[#003f3f]">
      <Navbar
        currentView="careers"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
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
            <span className="text-[#003f3f] font-semibold">Careers</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
              Team Growth
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003f3f] tracking-tight leading-[1.1]">
              Careers at VanStro
            </h1>
            <p className="text-base sm:text-lg text-[#315b60] leading-relaxed font-normal">
              Join our Winnipeg team connecting kitchen and home building products with dealers and customers across Canada.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#5f7376]">
              <span className="px-3 py-1 bg-[#f5f8f7] border border-[#d9e1df] rounded-full text-[#003f3f] font-bold">
                3 open roles
              </span>
              <span>·</span>
              <a href="mailto:hr@vanstro.ca" className="text-[#003f3f] hover:underline flex items-center gap-1 font-semibold">
                <Mail className="w-3.5 h-3.5 text-[#f28a0b]" />
                <span>hr@vanstro.ca</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-12 sm:py-16 border-b border-[#d9e1df] bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
              Open Roles
            </h2>
            <p className="text-sm text-[#5f7376]">
              3 positions available at our Winnipeg operations.
            </p>
          </div>

          <div className="space-y-6">
            {roles.map((role) => {
              const isExpanded = expandedId === role.id;
              return (
                <div
                  key={role.id}
                  className="bg-white border border-[#d9e1df] rounded-xl shadow-xs overflow-hidden transition-all"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : role.id)}
                    className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#fafbfb] transition-colors"
                  >
                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
                        {role.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5f7376] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#f28a0b]" />
                        <span>{role.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#003f3f] hidden sm:inline">
                        {isExpanded ? 'Hide details' : 'View details'}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#f5f8f7] flex items-center justify-center text-[#003f3f]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 sm:p-8 border-t border-[#d9e1df] bg-[#fafbfb] space-y-6 text-xs sm:text-sm text-[#10201d]">
                      <div>
                        <h4 className="font-bold text-[#003f3f] mb-1">Summary</h4>
                        <p className="text-[#315b60] leading-relaxed">{role.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#003f3f] mb-2">Required</h4>
                        <ul className="space-y-1.5 text-[#315b60]">
                          {role.required.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#003f3f] mt-1.5 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#003f3f] mb-2">What you’ll do</h4>
                        <ul className="space-y-1.5 text-[#315b60]">
                          {role.whatYoullDo.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f28a0b] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#003f3f] mb-2">Preferred</h4>
                        <ul className="space-y-1.5 text-[#5f7376]">
                          {role.preferred.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#5f7376] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-[#d9e1df] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-[#003f3f]">Apply for this role</h4>
                          <p className="text-xs text-[#5f7376]">
                            Email your current résumé and a brief introduction to hr@vanstro.ca.
                          </p>
                        </div>
                        <a
                          href={`mailto:hr@vanstro.ca?subject=Application:%20${encodeURIComponent(role.title)}`}
                          className="px-5 py-2.5 bg-[#003f3f] hover:bg-[#0f5554] text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Start email</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
            <a href="mailto:hr@vanstro.ca" className="hover:text-[#003f3f]">hr@vanstro.ca</a>
            <a href="tel:18558267876" className="hover:text-[#003f3f]">1-855-VANSTRO</a>
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
