'use client';

import { useState } from 'react';
import { CHECKLIST_ITEMS } from '@/data/care-data';

interface PrintableChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrintableChecklistModal({
  isOpen,
  onClose,
}: PrintableChecklistModalProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
  });

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#1C1A17]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#F9F8F6] text-[#1C1A17] border border-[#E7E5E0] max-w-2xl w-full rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#E7E5E0] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-serif-luxury text-sm font-semibold tracking-widest uppercase text-[#9B7A4F]">
                VANSTRO
              </span>
              <span className="text-[#A09D96]">/</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#73706B]">
                Millwork Protocol
              </span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-medium text-[#1C1A17]">
              Cabinet Care &amp; Maintenance Checklist
            </h3>
            <p className="text-xs text-[#73706B] mt-1">
              Single-page reference sheet formatted for inside pantry or vanity cabinet mounting.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#D5D1C7] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white transition-colors flex items-center justify-center cursor-pointer text-xs shrink-0"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body / Printable Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Quick Metrics Bar */}
          <div className="flex items-center justify-between p-3.5 bg-[#EFECE6] border border-[#E5E1D8] rounded-sm text-xs">
            <span className="text-[#1C1A17] font-medium">
              Maintenance Tasks: <span className="font-mono">{completedCount}</span> / {CHECKLIST_ITEMS.length} Completed
            </span>
            <span className="font-mono text-[11px] text-[#73706B]">
              Ref: VS-CARE-2026
            </span>
          </div>

          {/* Interactive Checklist Items */}
          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item) => {
              const isChecked = !!checkedIds[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3.5 border rounded-sm transition-all duration-200 cursor-pointer flex items-start gap-3.5 select-none ${
                    isChecked
                      ? 'bg-white border-[#244A29]/30 text-[#1C1A17]'
                      : 'bg-white/70 border-[#E7E5E0] text-[#73706B] hover:border-[#1C1A17]/30'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-xs border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? 'bg-[#244A29] border-[#244A29] text-white'
                        : 'border-[#C4C0B6] bg-white'
                    }`}
                  >
                    {isChecked && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.2 bg-[#F3EFE9] text-[#73706B] rounded-xs font-semibold">
                        {item.period}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isChecked ? 'text-[#1C1A17] font-medium' : 'text-[#5C5852]'}`}>
                      {item.task}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergency Spill Quick Note */}
          <div className="p-4 bg-[#F8ECE9] border border-[#F1D1CA] rounded-sm text-xs text-[#8B2627] space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider block">
              Emergency Water Spill Protocol
            </span>
            <p className="leading-relaxed">
              In case of dishwasher leaks or sink overflow, cut water valve immediately, blot cabinet edges dry within 2 minutes, and position a room dehumidifier running at &lt;45% RH for 48 hours.
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 bg-white border-t border-[#E7E5E0] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#73706B]">
            Formatted for 8.5&quot; × 11&quot; letter or A4 architectural binder.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#73706B] hover:text-[#1C1A17] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-mono font-medium text-white bg-[#9B7A4F] hover:bg-[#85663F] rounded-none transition-colors cursor-pointer flex items-center gap-2 active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
