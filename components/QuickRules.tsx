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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
        {QUICK_RULES.map((rule, idx) => {
          // Dynamic luxury color profiles for the 3 rules
          const profiles = [
            {
              cardBg: 'bg-gradient-to-b from-[#FFFFFF] to-[#FAF6EE] border-[#DFD6C5] hover:border-[#9B7A4F] shadow-[0_4px_20px_-4px_rgba(155,122,79,0.12)]',
              iconBg: 'bg-[#9B7A4F]/10 border-[#C5A069]/40 text-[#9B7A4F]',
              badgeClass: 'bg-[#9B7A4F] text-white border-transparent',
              actionClass: 'text-[#9B7A4F]',
              footerBorder: 'border-[#EDE6D8]',
              detailColor: 'text-[#6B6355]',
            },
            {
              cardBg: 'bg-gradient-to-b from-[#FFFFFF] to-[#F3F8F5] border-[#D1E2D7] hover:border-[#244A29] shadow-[0_4px_20px_-4px_rgba(36,74,41,0.1)]',
              iconBg: 'bg-[#244A29]/10 border-[#244A29]/30 text-[#244A29]',
              badgeClass: 'bg-[#244A29] text-white border-transparent',
              actionClass: 'text-[#244A29]',
              footerBorder: 'border-[#DFECE3]',
              detailColor: 'text-[#4D6353]',
            },
            {
              cardBg: 'bg-gradient-to-b from-[#FFFFFF] to-[#FAF1F1] border-[#E8CACA] hover:border-[#8B2627] shadow-[0_4px_20px_-4px_rgba(139,38,39,0.1)]',
              iconBg: 'bg-[#8B2627]/10 border-[#8B2627]/30 text-[#8B2627]',
              badgeClass: 'bg-[#8B2627] text-white border-transparent',
              actionClass: 'text-[#8B2627]',
              footerBorder: 'border-[#F2DCDC]',
              detailColor: 'text-[#6D4949]',
            },
          ];

          const p = profiles[idx] || profiles[0];

          return (
            <Card
              key={rule.id}
              className={`${p.cardBg} transition-all duration-300 flex flex-col justify-between rounded-xl overflow-hidden`}
            >
              <CardHeader className="p-5 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shadow-xs ${p.iconBg}`}>
                    {getIcon(idx)}
                  </div>
                  <Badge className={`text-[10px] font-mono tracking-wider font-semibold py-0.5 px-2.5 shadow-2xs ${p.badgeClass}`}>
                    Rule 0{idx + 1}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className={`text-[11px] font-mono uppercase tracking-widest font-bold block ${p.actionClass}`}>
                    {rule.action}
                  </span>
                  <CardTitle className="text-lg font-medium text-[#181715] leading-snug">
                    {rule.title}
                  </CardTitle>
                </div>

                <CardDescription className="text-xs text-[#55524C] leading-relaxed pt-1 font-normal">
                  {rule.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 pt-3">
                <div className={`pt-3 border-t text-[11px] font-sans ${p.footerBorder} ${p.detailColor} leading-snug`}>
                  <span className="font-semibold mr-1">Standard:</span>
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
