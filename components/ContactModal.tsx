'use client';

import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cabinetFinish: 'Veneer',
    requestType: 'Care Kit Request',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#1C1A17]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#F9F8F6] text-[#1C1A17] border border-[#E7E5E0] max-w-lg w-full rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-white border-b border-[#E7E5E0] flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B7A4F] block mb-1">
              VanStro Client Concierge
            </span>
            <h3 className="font-serif-luxury text-2xl font-medium text-[#1C1A17]">
              Cabinetry Care &amp; Service Inquiries
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#D5D1C7] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white transition-colors flex items-center justify-center cursor-pointer text-xs"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EAF3EB] text-[#244A29] flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-[#003f3f]">
              Inquiry Received
            </h4>
            <p className="text-xs text-[#5f7376] leading-relaxed max-w-sm mx-auto">
              We will review your request and reply to <span className="font-medium text-[#10201d]">{formData.email}</span> within one business day.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 text-xs uppercase tracking-wider font-mono font-medium text-white bg-[#1C1A17] hover:bg-[#333] transition-colors cursor-pointer"
            >
              Return to Handbook
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#73706B] block">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Eleanor Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D5D1C7] rounded-none focus:outline-none focus:border-[#1C1A17]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#73706B] block">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="eleanor@vancestudio.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D5D1C7] rounded-none focus:outline-none focus:border-[#1C1A17]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#73706B] block">
                  Installed Finish
                </label>
                <select
                  value={formData.cabinetFinish}
                  onChange={(e) => setFormData({ ...formData, cabinetFinish: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#D5D1C7] rounded-none focus:outline-none focus:border-[#1C1A17]"
                >
                  <option value="Veneer">Natural Timber Veneer</option>
                  <option value="Painted">Painted Satin Lacquer</option>
                  <option value="Thermofoil">Thermofoil Engineered</option>
                  <option value="Hardware">Solid Brass Hardware</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#73706B] block">
                  Service Request
                </label>
                <select
                  value={formData.requestType}
                  onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#D5D1C7] rounded-none focus:outline-none focus:border-[#1C1A17]"
                >
                  <option value="Care Kit Request">Complimentary Care Kit</option>
                  <option value="Technical Inspection">Atelier Inspection</option>
                  <option value="Warranty Verification">Warranty Query</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#73706B] block">
                Cabinetry Details / Inquiries (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Describe your kitchen installation date or specific cleaning inquiry..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D5D1C7] rounded-none focus:outline-none focus:border-[#1C1A17]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#73706B] hover:text-[#1C1A17] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-mono font-medium text-white bg-[#1C1A17] hover:bg-[#333] transition-colors cursor-pointer"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
