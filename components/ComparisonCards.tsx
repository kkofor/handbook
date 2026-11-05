'use client';

import Image from 'next/image';
import { FINISH_DETAILS } from '@/data/care-data';

interface ComparisonCardsProps {
  activeFinish: string;
}

export default function ComparisonCards({ activeFinish }: ComparisonCardsProps) {
  const current = FINISH_DETAILS[activeFinish] || FINISH_DETAILS.pvc_door || FINISH_DETAILS.veneer;

  return (
    <section id="dos-donts" className="scroll-mt-28 space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
            03
          </span>
          <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
            Do&apos;s &amp; Don&apos;ts
          </h2>
        </div>
        <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
          Comparative Discipline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO Card */}
        <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-xl overflow-hidden shadow-xs hover:border-[#2E5E35]/40 transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Image Header with Badge */}
            <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden">
              <Image
                src="/images/wiping_wood_do_1793828383149.jpg"
                alt="Proper technique: Gentle wood wiping with soft microfiber cloth along the grain"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#244A29] text-white text-[11px] font-mono font-bold tracking-widest uppercase rounded-sm shadow-md">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  DO
                </span>
              </div>
              <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/55 backdrop-blur-xs text-[10px] text-white/90 font-mono tracking-wider rounded-xs">
                Verified Technique
              </div>
            </div>

            {/* Content List */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                  Preservation Protocol ({current.name})
                </h3>
                <p className="text-xs text-[#73706B]">
                  Follow these essential practices to maintain pristine finish depth:
                </p>
              </div>

              <ul className="space-y-3">
                {current.tailoredDos.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs leading-relaxed text-[#2C2925]">
                    <span className="w-4 h-4 rounded-full bg-[#EAF3EB] text-[#244A29] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-6 py-3 bg-[#F9FAF8] border-t border-[#EAEFEA] text-[11px] text-[#244A29] font-medium flex items-center justify-between">
            <span>Result: Lifetime grain vibrancy</span>
            <span className="font-mono text-[10px]">VanStro Verified</span>
          </div>
        </div>

        {/* DON'T Card */}
        <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-xl overflow-hidden shadow-xs hover:border-[#9E2A2B]/40 transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Image Header with Badge */}
            <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden">
              <Image
                src="/images/water_damage_dont_1793828382594.jpg"
                alt="Water splash pooling damage along cabinetry joint seam"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B2627] text-white text-[11px] font-mono font-bold tracking-widest uppercase rounded-sm shadow-md">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  DON&apos;T
                </span>
              </div>
              <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/55 backdrop-blur-xs text-[10px] text-white/90 font-mono tracking-wider rounded-xs">
                Irreversible Risk
              </div>
            </div>

            {/* Content List */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                  Critical Hazards ({current.name})
                </h3>
                <p className="text-xs text-[#73706B]">
                  Avoid common cleaning misconceptions that cause veneer debonding:
                </p>
              </div>

              <ul className="space-y-3">
                {current.tailoredDonts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs leading-relaxed text-[#2C2925]">
                    <span className="w-4 h-4 rounded-full bg-[#FDF0EE] text-[#8B2627] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-6 py-3 bg-[#FCF7F6] border-t border-[#F8ECE9] text-[11px] text-[#8B2627] font-medium flex items-center justify-between">
            <span>Risk: Edge swelling &amp; delamination</span>
            <span className="font-mono text-[10px]">Voids Warranty</span>
          </div>
        </div>
      </div>
    </section>
  );
}
