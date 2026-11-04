'use client';

interface DownloadBannerProps {
  onOpenChecklist: () => void;
}

export default function DownloadBanner({ onOpenChecklist }: DownloadBannerProps) {
  return (
    <footer className="w-full bg-[#181715] text-[#F9F8F6] border-t border-[#292621] py-14 sm:py-18 transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9B7A4F]">
                VanStro Architectural Resource
              </span>
              <span className="text-[#4A463F]">·</span>
              <span className="text-xs text-[#A09D96]">PDF Edition 2026</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F9F8F6] tracking-tight">
              Download the Printable Care Checklist PDF
            </h2>
            <p className="text-xs sm:text-sm text-[#A09D96] leading-relaxed max-w-xl">
              An architectural single-page maintenance reference designed to mount inside your pantry or service cabinet. Complete with cleaner dilution ratios, humidity tolerances, and Blumotion hinge maintenance.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onOpenChecklist}
              className="px-8 py-4 text-xs uppercase font-mono tracking-[0.18em] font-medium text-white bg-[#9B7A4F] hover:bg-[#85663F] border border-[#B38D5C]/30 transition-all duration-200 cursor-pointer flex items-center gap-3 shadow-lg active:scale-[0.98] whitespace-nowrap"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>[ Download Free Guide ]</span>
            </button>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#292621] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#73706B]">
          <div className="flex items-center gap-6">
            <span className="font-serif-luxury text-base tracking-widest text-[#F9F8F6]">
              VANSTRO
            </span>
            <span className="text-[11px] text-[#A09D96]">
              Bespoke Cabinetry &amp; Architectural Joinery
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>© 2026 VanStro Atelier</span>
            <span>·</span>
            <span>Architectural Digest Certified Specification</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
