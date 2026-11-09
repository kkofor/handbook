'use client';

interface TOCProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

const TOC_ITEMS = [
  { id: 'daily-rules', num: '01', title: 'Daily Rules' },
  { id: 'material-care', num: '02', title: 'Material Care' },
  { id: 'dos-donts', num: '03', title: "Do's & Don'ts" },
  { id: 'hardware', num: '04', title: 'Hardware' },
];

export default function TableOfContents({
  activeSection,
  onSelectSection,
}: TOCProps) {
  return (
    <aside className="w-full">
      <div className="sticky top-28 space-y-8 pr-4">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73706B] block mb-4">
            Contents
          </span>
          <div className="h-[1px] w-8 bg-[#1C1A17]/30 mb-6" />

          <nav aria-label="Table of contents" className="space-y-4">
            {TOC_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSection(item.id)}
                  className={`group flex items-baseline gap-3 text-left w-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#1C1A17] font-medium translate-x-1'
                      : 'text-[#73706B] hover:text-[#1C1A17]'
                  }`}
                >
                  <span
                    className={`font-mono text-xs tabular-nums tracking-wider transition-colors ${
                      isActive ? 'text-[#9B7A4F] font-semibold' : 'text-[#A09D96]'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span className="text-sm font-sans tracking-tight">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Minimal metadata footnote */}
        <div className="pt-8 border-t border-[#d9e1df] space-y-2">
          <p className="text-[11px] uppercase tracking-wider text-[#5f7376] font-mono">
            Care Protocol
          </p>
          <p className="text-xs text-[#5f7376] leading-relaxed">
            VanStro Cabinetry Reference Standard
          </p>
        </div>
      </div>
    </aside>
  );
}
