'use client';

export default function HardwareSection() {
  return (
    <section id="hardware" className="scroll-mt-28 space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
            04
          </span>
          <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
            Hardware &amp; Mechanics
          </h2>
        </div>
        <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
          Pulls, Hinges &amp; Runners
        </span>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm p-6 sm:p-7 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 flex items-center justify-center text-[#1C1A17] stroke-1">
              <svg className="w-6 h-6 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </div>
            <h4 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
              Unlacquered Living Brass
            </h4>
            <p className="text-xs text-[#73706B] leading-relaxed">
              Living finishes are intended to oxidize gracefully with hand contact. Clean exclusively with a dry microfiber cloth. Avoid chemical brass polishes that strip authentic age patina.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 flex items-center justify-center text-[#1C1A17] stroke-1">
              <svg className="w-6 h-6 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </div>
            <h4 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
              Blumotion Soft-Close Hinges
            </h4>
            <p className="text-xs text-[#73706B] leading-relaxed">
              Equipped with sealed hydraulic fluid dampers. Never force cabinet doors closed against resistance. Never apply spray lubricants like WD-40, which dissolves internal damper seals.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 flex items-center justify-center text-[#1C1A17] stroke-1">
              <svg className="w-6 h-6 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </div>
            <h4 className="font-serif-luxury text-lg font-medium text-[#1C1A17]">
              3D Cam Alignment
            </h4>
            <p className="text-xs text-[#73706B] leading-relaxed">
              Cabinet doors naturally settle over the first heating season. Turn the integrated spiral cam screws (depth, lateral, and height) with a hand screwdriver to restore 3mm reveal gaps.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#F0EFEA] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#73706B]">
            <span className="font-mono text-[#9B7A4F] font-semibold">Fastener Note:</span>
            <span>Always torque handle fasteners by hand; pneumatic impact drivers can strip hardwood threads.</span>
          </div>
          <span className="text-[11px] font-mono text-[#A09D96]">DIN EN 15570 Specification</span>
        </div>
      </div>
    </section>
  );
}
