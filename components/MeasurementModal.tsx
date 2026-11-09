'use client';

import { useState } from 'react';

interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MEASUREMENT_CHECKLIST = [
  { id: 'm1', label: 'Measured total wall length corner-to-corner along floor and at 36" base cabinet line' },
  { id: 'm2', label: 'Checked floor-to-ceiling height in 3 distinct spots (left, center, right)' },
  { id: 'm3', label: 'Measured all window and door openings from outer edge of trim/casing' },
  { id: 'm4', label: 'Marked exact centerline of sink drain and water supply lines from nearest corner' },
  { id: 'm5', label: 'Marked 240V range outlet / gas pipe centerline and range hood exhaust duct location' },
  { id: 'm6', label: 'Summed cabinet modular widths and calculated required 3" or 6" wall fillers' },
  { id: 'm7', label: 'Confirmed minimum 3" clearance between corner cabinets and protruding door trims' },
  { id: 'm8', label: 'Verified appliance specifications (fridge depth, dishwasher width, microwave height)' },
];

export default function MeasurementModal({ isOpen, onClose }: MeasurementModalProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#F9F8F6] text-[#1C1A17] rounded-sm border border-[#E7E5E0] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="measure-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E7E5E0] bg-[#FFFFFF] flex items-center justify-between no-print">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#003f3f]">
              <span>VANSTRO MEASUREMENT WORKSHEET</span>
              <span>·</span>
              <span>DOC REF: VS-PL-2026</span>
            </div>
            <h2 id="measure-modal-title" className="text-xl sm:text-2xl font-bold text-[#003f3f] mt-0.5">
              Kitchen Cabinet Measurement Grid &amp; Worksheet
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#E7E5E0] flex items-center justify-center text-[#73706B] hover:text-[#1C1A17] hover:border-[#1C1A17] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Printable Header Info (Visible on Print) */}
          <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-5 rounded-sm space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#F0EFEA] pb-3">
              <span className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
                Project Measurement Sheet
              </span>
              <span className="font-mono text-[10px] text-[#73706B]">
                Progress: {completedCount} of {MEASUREMENT_CHECKLIST.length} Checked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8C8880] block">Customer / Job Name:</span>
                <div className="h-6 border-b border-dashed border-[#C4C0B6]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8C8880] block">Room Dimensions (L × W × H):</span>
                <div className="h-6 border-b border-dashed border-[#C4C0B6]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8C8880] block">Dealer / Date:</span>
                <div className="h-6 border-b border-dashed border-[#C4C0B6]" />
              </div>
            </div>
          </div>

          {/* Dimension Grid Simulation for Sketching */}
          <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-5 rounded-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-base font-medium text-[#1C1A17]">
                Wall Run Sketch Grid (¼&quot; = 1&apos;-0&quot; Scale)
              </h3>
              <span className="text-[10px] font-mono text-[#8C8880] uppercase">
                Grid: 20ft × 10ft Elevation Space
              </span>
            </div>
            
            {/* Grid Canvas Background */}
            <div
              className="h-44 w-full border border-[#E7E5E0] rounded-xs relative flex items-center justify-center text-center p-4"
              style={{
                backgroundImage: 'radial-gradient(#D5D1C7 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                backgroundColor: '#FAFAF8'
              }}
            >
              <div className="bg-[#FFFFFF]/90 backdrop-blur-xs p-3 rounded-xs border border-[#E7E5E0] max-w-sm">
                <p className="font-serif-luxury text-sm font-medium text-[#1C1A17]">
                  Draw room elevation from left corner to right
                </p>
                <p className="text-[10px] text-[#73706B] mt-1">
                  Mark: [ Wall End ] → [ Base Cabinets ] → [ Range / Sink CL ] → [ Wall Fillers ]
                </p>
              </div>
            </div>
          </div>

          {/* Checklist Tasks */}
          <div className="space-y-3">
            <h3 className="font-serif-luxury text-base font-medium text-[#1C1A17]">
              Pre-Order Verification Checklist
            </h3>
            <div className="space-y-2">
              {MEASUREMENT_CHECKLIST.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <label
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-all duration-150 ${
                      isChecked
                        ? 'bg-[#F2F7F2] border-[#244A29]/30 text-[#1C1A17]'
                        : 'bg-[#FFFFFF] border-[#E7E5E0] text-[#5E5A54] hover:border-[#1C1A17]/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(item.id)}
                      className="mt-0.5 accent-[#244A29] w-4 h-4 cursor-pointer"
                    />
                    <span className="leading-relaxed select-none">
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* VanStro Sizing Note */}
          <div className="p-4 bg-[#f5f8f7] border border-[#d9e1df] rounded-md text-[11px] text-[#5f7376] leading-relaxed">
            <strong className="text-[#003f3f] font-semibold block mb-0.5">
              VanStro Sizing Notice:
            </strong>
            VanStro modular cabinetry is manufactured in standard nominal widths (e.g., 24&quot;, 27&quot;, 30&quot;, 36&quot;, 42&quot;, 48&quot;). All remaining wall space is resolved via standard 3&quot; (WF330/WF342) or 6&quot; (WF630/WF642) fillers scribed on-site.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FFFFFF] border-t border-[#E7E5E0] flex flex-wrap items-center justify-between gap-3 no-print">
          <span className="text-[11px] text-[#73706B] font-mono">
            Direct Print / Save as PDF
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-[#73706B] hover:text-[#1C1A17] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2 text-xs font-mono font-medium tracking-wider uppercase bg-[#181715] text-[#F9F8F6] hover:bg-[#9B7A4F] transition-colors rounded-xs shadow-sm cursor-pointer flex items-center gap-2"
            >
              <span>Print Worksheet</span>
              <span>🖨️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
