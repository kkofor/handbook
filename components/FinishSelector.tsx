'use client';

import { FINISH_DETAILS } from '@/data/care-data';

interface FinishSelectorProps {
  activeFinish: string;
  onSelectFinish: (finish: string) => void;
}

const FINISH_KEYS = ['veneer', 'painted', 'thermofoil', 'hardware'];

export default function FinishSelector({
  activeFinish,
  onSelectFinish,
}: FinishSelectorProps) {
  const current = FINISH_DETAILS[activeFinish] || FINISH_DETAILS.veneer;

  return (
    <section id="material-care" className="scroll-mt-28 space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
            02
          </span>
          <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
            Material Care
          </h2>
        </div>
        <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
          Finish Specification
        </span>
      </div>

      {/* Horizontal row of rounded pill-shaped tabs per prompt requirement */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-[#8C8880] block mb-2">
          Select Cabinetry Finish:
        </label>
        <div className="flex flex-wrap items-center gap-2 p-1 bg-[#EFECE6]/80 rounded-full w-fit max-w-full">
          {FINISH_KEYS.map((key) => {
            const finish = FINISH_DETAILS[key];
            const isActive = activeFinish === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectFinish(key)}
                className={`px-5 py-2 text-xs font-medium tracking-wide rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1C1A17] text-[#F9F8F6] shadow-sm font-semibold'
                    : 'text-[#73706B] hover:text-[#1C1A17] hover:bg-[#E5E1D8]/60'
                }`}
              >
                {finish.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Material Care Specification Card */}
      <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm p-6 sm:p-7 space-y-6 transition-all duration-300">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9B7A4F]">
              Finish Profile
            </span>
            <span className="text-[#C4C0B6]">/</span>
            <span className="text-xs text-[#73706B]">{current.name} Care Protocol</span>
          </div>
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium text-[#1C1A17]">
            {current.subtitle}
          </h3>
          <p className="text-sm text-[#73706B] leading-relaxed pt-1">
            {current.description}
          </p>
        </div>

        {/* 4-Column Specification Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#F0EFEA]">
          {current.specNotes.map((spec, i) => (
            <div key={i} className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880] block">
                {spec.label}
              </span>
              <span className="text-xs font-medium text-[#1C1A17] block leading-snug">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Cleaning solution & technique callout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="p-4 bg-[#F9F8F6] border border-[#EBE8E1] rounded-sm space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">
              Authorized Cleaning Agent
            </span>
            <p className="text-[#1C1A17] font-medium leading-relaxed">
              {current.recommendedSolution}
            </p>
            <p className="text-[#73706B] text-[11px]">
              Tolerated Acidity: <span className="font-mono">{current.phRange}</span>
            </p>
          </div>

          <div className="p-4 bg-[#F9F8F6] border border-[#EBE8E1] rounded-sm space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B7A4F] font-semibold block">
              Application & Buffing Technique
            </span>
            <p className="text-[#1C1A17] font-medium leading-relaxed">
              {current.wipeTechnique}
            </p>
            <p className="text-[#73706B] text-[11px]">
              Drying Threshold: <span className="font-mono">{current.moistureLimit}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
