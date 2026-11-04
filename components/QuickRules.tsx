'use client';

import { QUICK_RULES } from '@/data/care-data';

export default function QuickRules() {
  return (
    <section id="daily-rules" className="scroll-mt-28 space-y-4">
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#9B7A4F] font-semibold tabular-nums">
            01
          </span>
          <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1A17] tracking-tight">
            Daily Rules
          </h2>
        </div>
        <span className="text-xs text-[#73706B] tracking-wider uppercase font-sans">
          Baseline Maintenance
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {QUICK_RULES.map((rule, idx) => {
          return (
            <div
              key={rule.id}
              className="group bg-[#FFFFFF] border border-[#E7E5E0] p-5 rounded-sm hover:border-[#1C1A17]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Minimal outline icon */}
                <div className="w-9 h-9 flex items-center justify-center text-[#1C1A17] mb-4 stroke-1">
                  {idx === 0 && (
                    <svg
                      className="w-6 h-6 stroke-[1.25]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg
                      className="w-6 h-6 stroke-[1.25]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                      />
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg
                      className="w-6 h-6 stroke-[1.25]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5m4.75-11.396C10.5 3 11.25 3 12 3s1.5 0 2.25.104m-4.5 0A2.25 2.25 0 008.25 5.25v2.25m6-4.396v5.714a2.25 2.25 0 00.659 1.591L19 14.5M12 21a6.75 6.75 0 01-6.75-6.75c0-1.875.768-3.58 2-4.818M12 21a6.75 6.75 0 006.75-6.75c0-1.875-.768-3.58-2-4.818"
                      />
                    </svg>
                  )}
                </div>

                <div className="space-y-1 mb-3">
                  <h3 className="font-serif-luxury text-lg font-medium text-[#1C1A17] tracking-tight">
                    {rule.title}
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#9B7A4F]">
                    {rule.action}
                  </p>
                </div>

                <p className="text-xs text-[#73706B] leading-relaxed">
                  {rule.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0EFEA]">
                <p className="text-[11px] text-[#8C8880] italic">
                  {rule.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
