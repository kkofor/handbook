'use client';

import { QUICK_RULES } from '@/data/care-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, SunMedium, AlertCircle } from 'lucide-react';

export default function QuickRules() {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Sparkles className="w-4 h-4 text-[#9B7A4F]" />;
      case 1:
        return <SunMedium className="w-4 h-4 text-[#9B7A4F]" />;
      case 2:
      default:
        return <AlertCircle className="w-4 h-4 text-[#9B7A4F]" />;
    }
  };

  return (
    <section id="daily-rules" className="scroll-mt-28 space-y-4">
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <div className="flex items-baseline gap-3">
          <Badge variant="copper">01</Badge>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
            Daily Rules
          </h2>
        </div>
        <span className="text-xs text-[#73706B] tracking-wider uppercase font-mono">
          Baseline Protocol
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {QUICK_RULES.map((rule, idx) => {
          return (
            <Card
              key={rule.id}
              className="border-[#E7E5E0] hover:border-[#1C1A17]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <CardHeader className="p-5 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center">
                    {getIcon(idx)}
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    Rule 0{idx + 1}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B7A4F] font-semibold block">
                    {rule.action}
                  </span>
                  <CardTitle className="text-lg leading-snug">
                    {rule.title}
                  </CardTitle>
                </div>

                <CardDescription className="text-xs text-[#73706B] leading-relaxed pt-1">
                  {rule.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 pt-3">
                <div className="pt-3 border-t border-[#F0EFEA] text-[11px] text-[#8C8880] font-sans italic">
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
