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
        {/* DO Card using shadcn Card */}
        <Card className="border-[#E7E5E0] overflow-hidden hover:border-[#244A29]/40 hover:shadow-md transition-all flex flex-col justify-between">
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
                <Badge variant="success" className="bg-[#244A29] text-white border-transparent shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>DO</span>
                </Badge>
              </div>
              <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] text-white font-mono tracking-wider rounded-sm">
                Verified Technique
              </div>
            </div>

            {/* Content List */}
            <CardHeader className="p-5 sm:p-6 pb-2 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#244A29] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Recommended Care Protocol</span>
              </div>
              <CardTitle className="text-xl">
                Preservation Guidelines ({current.name})
              </CardTitle>
              <CardDescription className="text-xs text-[#73706B] pt-0.5">
                Standard practices to maintain original factory sheen and surface protection:
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 pt-2">
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
            </CardContent>
          </div>

          <CardFooter className="px-6 py-3 bg-[#F9FAF8] border-t border-[#EAEFEA] text-[11px] text-[#244A29] font-medium justify-between">
            <span>Result: Sustained surface integrity</span>
            <span className="font-mono text-[10px]">VanStro Verified</span>
          </CardFooter>
        </Card>

        {/* DON'T Card using shadcn Card */}
        <Card className="border-[#E7E5E0] overflow-hidden hover:border-[#8B2627]/40 hover:shadow-md transition-all flex flex-col justify-between">
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
                <Badge variant="danger" className="bg-[#8B2627] text-white border-transparent shadow-md">
                  <X className="w-3 h-3 stroke-[3]" />
                  <span>DON&apos;T</span>
                </Badge>
              </div>
              <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] text-white font-mono tracking-wider rounded-sm">
                High Risk Failure
              </div>
            </div>

            {/* Content List */}
            <CardHeader className="p-5 sm:p-6 pb-2 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8B2627] font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Damage Avoidance Directives</span>
              </div>
              <CardTitle className="text-xl">
                Prohibited Actions ({current.name})
              </CardTitle>
              <CardDescription className="text-xs text-[#73706B] pt-0.5">
                Habits that accelerate joint delamination, swelling, and chemical degradation:
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 pt-2">
              <ul className="space-y-3">
                {current.tailoredDonts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs leading-relaxed text-[#2C2925]">
                    <span className="w-4 h-4 rounded-full bg-[#FBEBEB] text-[#8B2627] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>

          <CardFooter className="px-6 py-3 bg-[#FCF8F8] border-t border-[#F5EAEA] text-[11px] text-[#8B2627] font-medium justify-between">
            <span>Risk: Excluded from factory warranty</span>
            <span className="font-mono text-[10px]">Warranty Voidance</span>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
