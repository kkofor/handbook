'use client';

import { QUICK_RULES } from '@/data/care-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sparkles, SunMedium, AlertCircle } from 'lucide-react';

export default function QuickRules() {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Sparkles className="w-4 h-4 text-[#003f3f]" />;
      case 1:
        return <SunMedium className="w-4 h-4 text-[#003f3f]" />;
      case 2:
      default:
        return <AlertCircle className="w-4 h-4 text-[#003f3f]" />;
    }
  };

  return (
    <section id="daily-rules" className="scroll-mt-28 space-y-4">
      <div className="flex items-baseline justify-between border-b border-[#d9e1df] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#003f3f] font-bold">01</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f] tracking-tight">
            Daily Rules
          </h2>
        </div>
        <span className="text-xs text-[#5f7376] tracking-wider uppercase font-mono">
          Baseline Protocol
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
        {QUICK_RULES.map((rule, idx) => {
          return (
            <Card
              key={rule.id}
              className="bg-white border border-[#d9e1df] hover:border-[#003f3f] transition-all duration-300 flex flex-col justify-between rounded-lg overflow-hidden"
            >
              <CardHeader className="p-5 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-[#f5f8f7] border border-[#d9e1df] flex items-center justify-center text-[#003f3f]">
                    {getIcon(idx)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#003f3f] tracking-wider uppercase">
                    0{idx + 1} / RULE
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest font-bold block text-[#f28a0b]">
                    {rule.action}
                  </span>
                  <CardTitle className="text-lg font-bold text-[#003f3f] leading-snug">
                    {rule.title}
                  </CardTitle>
                </div>

                <CardDescription className="text-xs text-[#315b60] leading-relaxed pt-1 font-normal">
                  {rule.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 pt-3">
                <div className="pt-3 border-t border-[#d9e1df] text-[11px] text-[#5f7376] leading-snug">
                  <span className="font-semibold text-[#10201d] mr-1">Standard:</span>
                  {rule.detail}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
