'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings2, Sliders, Disc, ShieldCheck } from 'lucide-react';

export default function HardwareSection() {
  const hardwareCards = [
    {
      icon: <Disc className="w-4 h-4 text-[#9B7A4F]" />,
      badge: "Surface Living Finish",
      title: "Solid Pulls & Handles",
      desc: "Living and satin brass hardware naturally develops character with daily touch. Wipe clean with a dry microfiber cloth. Avoid acidic chemicals, brass abrasive pastes, or solvents that strip factory protective coats.",
    },
    {
      icon: <Settings2 className="w-4 h-4 text-[#9B7A4F]" />,
      badge: "Hydraulic Damping",
      title: "DTC Soft-Close Mechanics",
      desc: "Engineered with integrated hydraulic fluid dampers. Never force doors or drawers closed manually against resistance. Never spray penetrating oils (such as WD-40), which dissolve internal fluid seals.",
    },
    {
      icon: <Sliders className="w-4 h-4 text-[#9B7A4F]" />,
      badge: "6-Way Precision",
      title: "Spiral Cam Alignment",
      desc: "Doors settle naturally with house temperature and humidity cycles. Adjust the 3 spiral cam screws (depth, lateral reveal, and vertical height) using a manual #2 Pozi or Phillips screwdriver to maintain consistent 3mm reveals.",
    },
  ];

  return (
    <section id="hardware" className="scroll-mt-28 space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <div className="flex items-baseline gap-3">
          <Badge variant="copper">04</Badge>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
            Hardware &amp; Mechanics
          </h2>
        </div>
        <span className="text-xs text-[#73706B] tracking-wider uppercase font-mono">
          Mechanical Longevity
        </span>
      </div>

      <Card className="border-[#E7E5E0] shadow-sm">
        <CardContent className="p-6 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hardwareCards.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <Badge variant="secondary" className="text-[9px]">
                    {item.badge}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif-luxury text-lg font-medium text-[#1C1A17] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#73706B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F0EFEA] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#5E5A54]">
              <ShieldCheck className="w-4 h-4 text-[#244A29]" />
              <span>Torque handle and pull screws by hand. Power impact drivers risk stripping fastener threads.</span>
            </div>
            <span className="text-[10px] font-mono text-[#8C8880]">VanStro Factory Joinery Standard</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
