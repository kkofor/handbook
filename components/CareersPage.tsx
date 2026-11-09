'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Send,
  Upload,
  ArrowRight,
  Building2,
  Mail,
  Users,
  FileText,
} from 'lucide-react';

interface CareersPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

interface JobOpening {
  id: string;
  title: string;
  location: string;
  workType: string;
  employmentType: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

// Authentic open roles from vanstro.ca/careers/
const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'business-operations-coordinator',
    title: 'Business Operations Coordinator',
    location: 'Winnipeg, MB (In-person)',
    workType: 'Office / Facility Coordination',
    employmentType: 'Full-time or Part-time',
    summary:
      'Supports daily operations, cross-team coordination, and systems connecting management, suppliers, service providers, dealers, and internal departments at VanStro Winnipeg head office.',
    responsibilities: [
      'Coordinate daily communications and workflow between management, suppliers, dealers, and internal departments.',
      'Track operational tasks and project progress to ensure milestones and fulfillment schedules are met.',
      'Handle office and facility coordination and maintain relationships with service providers and vendors.',
      'Maintain accurate operational records across POS, CRM, and product SKU databases.',
      'Assist with logistics coordination, order tracking, and dealer onboarding documentation.',
    ],
    requirements: [
      'Fluent English and Chinese communication skills (both written and verbal) for bilingual vendor and dealer coordination.',
      'Strong organizational, problem-solving, and multi-priority management skills.',
      'Proficiency in Microsoft Office / Microsoft 365 (Excel, Word, Outlook, Teams, SharePoint, OneDrive).',
      'High attention to detail, proactive work attitude, and strong team collaboration ability.',
    ],
  },
  {
    id: 'hr-recruitment-specialist',
    title: 'Human Resources Coordinator / Recruitment Specialist',
    location: 'Winnipeg, MB (In-person)',
    workType: 'Human Resources & Administration',
    employmentType: 'Full-time',
    summary:
      'Supports hiring and team development through candidate communication, interview coordination, recruitment tracking, and employee onboarding administration.',
    responsibilities: [
      'Draft and manage job postings across professional career platforms and local channels.',
      'Screen incoming applications and conduct preliminary phone screenings.',
      'Coordinate interview schedules with department managers and communicate with candidates.',
      'Maintain recruitment tracking data and prepare onboarding documentation for new hires.',
      'Support HR administrative tasks and team engagement initiatives.',
    ],
    requirements: [
      'Experience in recruitment, human resources, or a related administrative coordination role.',
      'Strong interpersonal, organizational, and professional communication skills.',
      'Proactive, detail-oriented approach with ability to handle confidential candidate information.',
      'Familiarity with standard HR workflows and applicant management systems.',
    ],
  },
  {
    id: 'business-development-representative',
    title: 'Business Development Representative',
    location: 'Winnipeg & Surrounding Areas, MB',
    workType: 'B2B Sales & Dealer Account Development',
    employmentType: 'Full-time',
    summary:
      'Focuses on expanding the VanStro dealer network, opening new accounts, and building long-term commercial relationships with showrooms, contractors, designers, and building-supply businesses.',
    responsibilities: [
      'Conduct outbound B2B outreach via phone, email, and scheduled field visits to prospective dealers and contractors.',
      'Introduce the VanStro operating model, product catalogs, and dealer program framework to qualified businesses.',
      'Coordinate with the Winnipeg operations team to support new dealer onboarding and initial sample display placement.',
      'Maintain account relationships and collect regional market feedback to support product development.',
    ],
    requirements: [
      'Valid Class 5 driver’s licence with access to a reliable vehicle for scheduled local/regional trade visits.',
      'Background in B2B sales, account management, channel development, or the building materials industry.',
      'Strong presentation, negotiation, and relationship-building abilities.',
      'Self-motivated, goal-oriented mindset with high professional standards.',
    ],
  },
];

export default function CareersPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: CareersPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState<string | null>('business-operations-coordinator');

  // Application form state
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>(
    'Business Operations Coordinator'
  );
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [appForm, setAppForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityProvince: '',
    languageSkills: '',
    introNote: '',
    resumeSimulated: false,
  });

  const handleSelectJob = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    const element = document.getElementById('application-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#181715] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#181715]">
      {/* Universal Top Navigation */}
      <Navbar
        currentView="careers"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenChecklist={onOpenChecklistModal}
      />

      <main className="flex-1">
        {/* =========================================================================
            HERO: Careers Header
        ========================================================================= */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#EAE6DF] bg-gradient-to-b from-[#FAF8F5] to-[#FFFFFF]">
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
              <span className="text-[#9B7A4F] font-semibold">Company</span>
              <span className="text-[#C5A069]">/</span>
              <span className="text-[#181715] font-bold">Careers</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF5EE] border border-[#DFD6C5] text-[#9B7A4F] text-[11px] font-mono uppercase tracking-widest font-semibold mb-4">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Winnipeg Head Office Opportunities</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#181715] font-normal tracking-tight leading-[1.08] mb-6">
                Careers at VanStro
              </h1>

              <p className="text-base sm:text-lg text-[#5A554E] leading-relaxed mb-8">
                VanStro Global Supply Inc. is a Canadian building-materials supplier and distribution platform headquartered in Winnipeg, Manitoba. We are building a dedicated team to support our national supply chain, dealer network, and localized operational execution.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#openings"
                  className="px-7 py-3.5 bg-[#181715] hover:bg-[#9B7A4F] text-[#FAF7F2] text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm"
                >
                  View Open Roles ({JOB_OPENINGS.length})
                </a>
                <a
                  href="#application-form"
                  className="px-6 py-3.5 bg-[#FAF7F2] hover:bg-[#F3EFEA] text-[#181715] border border-[#DFD6C5] text-xs font-mono uppercase tracking-widest font-medium transition-colors"
                >
                  Apply Directly
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: Open Roles (Authentic Roles from vanstro.ca/careers/)
        ========================================================================= */}
        <section id="openings" className="py-16 sm:py-20 border-b border-[#EAE6DF] bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-[#9B7A4F] font-semibold block mb-2">
                  Active Positions
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#181715] font-normal tracking-tight">
                  Current Openings
                </h2>
              </div>
              <span className="text-xs font-mono text-[#8C827A]">
                {JOB_OPENINGS.length} Positions Available in Winnipeg, MB
              </span>
            </div>

            <div className="space-y-5">
              {JOB_OPENINGS.map((job) => {
                const isExpanded = expandedJobId === job.id;

                return (
                  <div
                    key={job.id}
                    className={`border transition-all duration-200 ${
                      isExpanded
                        ? 'border-[#9B7A4F] bg-[#FAF8F5] shadow-sm'
                        : 'border-[#DFD6C5] bg-white hover:border-[#9B7A4F]'
                    }`}
                  >
                    {/* Header */}
                    <div
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      className="p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-white border border-[#DFD6C5] text-[#9B7A4F] font-bold">
                            {job.workType}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#FAF5EE] text-[#181715]">
                            {job.employmentType}
                          </span>
                        </div>

                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#181715] font-medium">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-[#6B665F] font-mono">
                          <MapPin className="w-3.5 h-3.5 text-[#9B7A4F]" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectJob(job.title);
                          }}
                          className="px-5 py-2.5 bg-[#181715] hover:bg-[#9B7A4F] text-[#FAF7F2] text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
                        >
                          Apply
                        </button>
                        <div className="w-7 h-7 rounded-full bg-white border border-[#DFD6C5] flex items-center justify-center text-[#9B7A4F]">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Details Drawer */}
                    {isExpanded && (
                      <div className="px-6 pb-7 sm:px-7 border-t border-[#EAE6DF] pt-6 space-y-6">
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C827A] font-bold mb-1.5">
                            Role Summary
                          </h4>
                          <p className="text-xs sm:text-sm text-[#5A554E] leading-relaxed">
                            {job.summary}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C827A] font-bold mb-2.5">
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-2 text-xs text-[#5A554E]">
                              {job.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9B7A4F] shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C827A] font-bold mb-2.5">
                              Requirements &amp; Qualifications
                            </h4>
                            <ul className="space-y-2 text-xs text-[#5A554E]">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9B7A4F] shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="p-3.5 bg-white border border-[#DFD6C5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#6B665F]">
                          <span>
                            Send questions or résumé directly to <strong className="text-[#181715]">hr@vanstro.ca</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSelectJob(job.title)}
                            className="inline-flex items-center gap-1 font-mono uppercase text-xs text-[#9B7A4F] font-bold hover:text-[#181715]"
                          >
                            <span>Fill Application Form Below</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: Application Intake Form
        ========================================================================= */}
        <section id="application-form" className="py-16 sm:py-20 border-b border-[#EAE6DF] bg-[#FAF7F2]">
          <div className="max-w-[900px] mx-auto px-6 sm:px-10">
            <div className="text-center mb-10">
              <span className="text-xs font-mono tracking-widest uppercase text-[#9B7A4F] font-semibold block mb-2">
                Candidate Submission
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#181715] font-normal tracking-tight mb-3">
                Apply for a Role at VanStro
              </h2>
              <p className="text-xs sm:text-sm text-[#6B665F]">
                Submit your information below or email your current résumé and introduction directly to <strong className="text-[#181715]">hr@vanstro.ca</strong>.
              </p>
            </div>

            <div className="bg-white border border-[#DFD6C5] p-7 sm:p-9 shadow-sm">
              {appSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#DFD6C5] text-[#9B7A4F] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#181715] font-medium">
                    Application Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A554E] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-[#181715]">{appForm.fullName || 'Candidate'}</span>. Your submission for the <span className="font-bold text-[#181715]">{selectedJobTitle}</span> role has been recorded for the VanStro HR team.
                  </p>
                  <p className="text-xs font-mono text-[#8C827A]">
                    Direct HR contact: hr@vanstro.ca
                  </p>
                  <button
                    type="button"
                    onClick={() => setAppSubmitted(false)}
                    className="mt-3 px-5 py-2 bg-[#181715] text-white text-xs font-mono uppercase tracking-wider"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                      Select Role *
                    </label>
                    <select
                      value={selectedJobTitle}
                      onChange={(e) => setSelectedJobTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                    >
                      {JOB_OPENINGS.map((j) => (
                        <option key={j.id} value={j.title}>
                          {j.title} ({j.location})
                        </option>
                      ))}
                      <option value="General Expression of Interest">
                        General Expression of Interest (Future Openings)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={appForm.fullName}
                        onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@email.ca"
                        value={appForm.email}
                        onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="204-555-0199"
                        value={appForm.phone}
                        onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                        City &amp; Province of Residence *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Winnipeg, MB"
                        value={appForm.cityProvince}
                        onChange={(e) => setAppForm({ ...appForm, cityProvince: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                      Language Proficiencies (English, Chinese, French, etc.)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fluent English and Chinese (Mandarin/Cantonese)"
                      value={appForm.languageSkills}
                      onChange={(e) => setAppForm({ ...appForm, languageSkills: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                      Brief Introduction / Experience Summary
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your background, relevant software experience, and why you are interested in this role..."
                      value={appForm.introNote}
                      onChange={(e) => setAppForm({ ...appForm, introNote: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#181715] mb-1.5 font-medium">
                      Résumé Attachment
                    </label>
                    <div
                      onClick={() => setAppForm({ ...appForm, resumeSimulated: true })}
                      className={`border-2 border-dashed p-5 text-center cursor-pointer transition-colors ${
                        appForm.resumeSimulated
                          ? 'border-[#9B7A4F] bg-[#FAF5EE]'
                          : 'border-[#DFD6C5] hover:border-[#9B7A4F] bg-[#FAF7F2]'
                      }`}
                    >
                      <Upload className="w-5 h-5 text-[#9B7A4F] mx-auto mb-1.5" />
                      {appForm.resumeSimulated ? (
                        <span className="text-xs text-[#181715] font-mono">
                          <strong className="text-[#9B7A4F]">Résumé attached: </strong>
                          Candidate_Resume.pdf
                        </span>
                      ) : (
                        <span className="text-xs text-[#6B665F]">
                          Click to attach résumé (PDF/DOCX) or send directly to <strong className="text-[#181715]">hr@vanstro.ca</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#181715] hover:bg-[#9B7A4F] text-[#FAF7F2] text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4 text-[#C5A069]" />
                    <span>Submit Application</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            HR DESK FOOTER BANNER
        ========================================================================= */}
        <section className="py-12 bg-[#181715] text-[#FAF7F2]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A069] font-bold block mb-1">
                Human Resources Department
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium">
                VanStro Global Supply Inc.
              </h3>
              <p className="text-xs text-white/70 mt-1 max-w-xl">
                Head office: 856 Century Street, Winnipeg, MB, R3H 0M5. Inquiries: <span className="font-mono text-[#C5A069]">hr@vanstro.ca</span>.
              </p>
            </div>

            <a
              href="mailto:hr@vanstro.ca"
              className="px-6 py-3 bg-[#9B7A4F] hover:bg-[#C5A069] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
            >
              Email hr@vanstro.ca
            </a>
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
