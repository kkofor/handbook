'use client';

import Image from 'next/image';
import { FINISH_DETAILS } from '@/data/care-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ComparisonCardsProps {
  activeFinish: string;
}

export default function ComparisonCards({ activeFinish }: ComparisonCardsProps) {
  const current = FINISH_DETAILS[activeFinish] || FINISH_DETAILS.pvc_door || FINISH_DETAILS.veneer;

  return (
    <section id="dos-donts" className="scroll-mt-28 space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <div className="flex items-baseline gap-3">
          <Badge variant="copper">03</Badge>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
            Do&apos;s &amp; Don&apos;ts
          </h2>
        </div>
        <span className="text-xs text-[#73706B] tracking-wider uppercase font-mono">
          Comparative Discipline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO Card with Emerald Luxury Craft Profile */}
        <Card className="border-[#C4DCBE] bg-gradient-to-b from-[#FFFFFF] to-[#F5F9F6] overflow-hidden hover:border-[#244A29] shadow-[0_4px_24px_-4px_rgba(36,74,41,0.12)] transition-all flex flex-col justify-between rounded-xl">
          <div>
            {/* Image Header with Badge */}
            <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden">
              <Image
                src="/assets/guides/handbook/hb-do-wipe.webp"
                alt="Proper technique: Gentle wiping with soft microfiber cloth along the grain"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#244A29] text-white text-[11px] font-mono font-bold tracking-widest uppercase rounded-md shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>DO</span>
                </span>
              </div>
              <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/65 backdrop-blur-xs text-[10px] text-white font-mono tracking-wider rounded-sm">
                Recommended
              </div>
            </div>

            {/* Content List */}
            <CardHeader className="p-5 sm:p-6 pb-2 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#244A29] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Recommended Care Protocol</span>
              </div>
              <CardTitle className="text-xl font-serif-luxury font-medium text-[#181715]">
                Preservation Guidelines ({current.name})
              </CardTitle>
              <CardDescription className="text-xs text-[#55524C] pt-0.5">
                Standard practices to maintain original factory sheen and surface protection:
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 pt-2">
              <ul className="space-y-3">
                {current.tailoredDos.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs leading-relaxed text-[#2C2925]">
                    <span className="w-4 h-4 rounded-full bg-[#244A29] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] shadow-xs">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>

          <CardFooter className="px-6 py-3 bg-[#EAF3EB] border-t border-[#D5E6D8] text-[11px] text-[#244A29] font-semibold justify-between">
            <span>Result: Sustained surface integrity</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">Recommended Practice</span>
          </CardFooter>
        </Card>

        {/* DON'T Card with Deep Wine Warning Contrast */}
        <Card className="border-[#EBC2C2] bg-gradient-to-b from-[#FFFFFF] to-[#FAF2F2] overflow-hidden hover:border-[#8B2627] shadow-[0_4px_24px_-4px_rgba(139,38,39,0.12)] transition-all flex flex-col justify-between rounded-xl">
          <div>
            {/* Image Header with Badge */}
            <div className="relative aspect-[4/3] w-full bg-[#EAE6DF] overflow-hidden">
              <Image
                src="/assets/guides/handbook/hb-dont-water.webp"
                alt="Water splash pooling damage along cabinetry joint seam"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B2627] text-white text-[11px] font-mono font-bold tracking-widest uppercase rounded-md shadow-md">
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                  <span>DON&apos;T</span>
                </span>
              </div>
              <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/65 backdrop-blur-xs text-[10px] text-white font-mono tracking-wider rounded-sm">
                High Risk Failure
              </div>
            </div>

            {/* Content List */}
            <CardHeader className="p-5 sm:p-6 pb-2 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8B2627] font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Damage Avoidance Directives</span>
              </div>
              <CardTitle className="text-xl font-serif-luxury font-medium text-[#181715]">
                Prohibited Actions ({current.name})
              </CardTitle>
              <CardDescription className="text-xs text-[#55524C] pt-0.5">
                Habits that accelerate joint delamination, swelling, and chemical degradation:
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 pt-2">
              <ul className="space-y-3">
                {current.tailoredDonts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs leading-relaxed text-[#2C2925]">
                    <span className="w-4 h-4 rounded-full bg-[#8B2627] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] shadow-xs">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>

          <CardFooter className="px-6 py-3 bg-[#FBEBEB] border-t border-[#F2D6D6] text-[11px] text-[#8B2627] font-semibold justify-between">
            <span>Risk: Excluded from warranty coverage</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">Subject to /warranty/</span>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
