'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings2, Sliders, Disc, ShieldCheck } from 'lucide-react';

export default function HardwareSection() {
  const hardwareCards = [
    {
      icon: <Disc className="w-4 h-4 text-[#C5A069]" />,
      badge: "Living Brass Finish",
      title: "Solid Pulls & Handles",
      desc: "Living and satin brass hardware naturally develops character with daily touch. Wipe clean with a dry microfiber cloth. Avoid acidic chemicals, brass abrasive pastes, or solvents that strip factory protective coats.",
      border: "border-[#E5DDD0] hover:border-[#9B7A4F]",
      badgeClass: "bg-[#181715] text-[#E8C78E] border border-[#C5A069]/30",
    },
    {
      icon: <Settings2 className="w-4 h-4 text-[#244A29]" />,
      badge: "Hydraulic Damping",
      title: "DTC Soft-Close Mechanics",
      desc: "Engineered with integrated hydraulic fluid dampers. Never force doors or drawers closed manually against resistance. Never spray penetrating oils (such as WD-40), which dissolve internal fluid seals.",
      border: "border-[#D1E2D7] hover:border-[#244A29]",
      badgeClass: "bg-[#244A29] text-white border-transparent",
    },
    {
      icon: <Sliders className="w-4 h-4 text-[#9B7A4F]" />,
      badge: "6-Way Precision",
      title: "Spiral Cam Alignment",
      desc: "Doors settle naturally with house temperature and humidity cycles. Adjust the 3 spiral cam screws (depth, lateral reveal, and vertical height) using a manual #2 Pozi or Phillips screwdriver to maintain consistent 3mm reveals.",
      border: "border-[#E5DDD0] hover:border-[#9B7A4F]",
      badgeClass: "bg-[#FAF6EE] text-[#9B7A4F] border border-[#E8DFC9]",
    },
  ];

  return (
    <section id="hardware" className="scroll-mt-28 space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#E3DDD1] pb-3">
        <div className="flex items-baseline gap-3">
          <Badge variant="copper">04</Badge>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#181715] tracking-tight">
            Hardware &amp; Mechanics
          </h2>
        </div>
        <span className="text-xs text-[#7A756D] tracking-wider uppercase font-mono">
          Mechanical Longevity
        </span>
      </div>

      <Card className="border-[#DFD6C5] bg-gradient-to-b from-[#FFFFFF] to-[#FAF8F4] shadow-[0_4px_24px_-4px_rgba(28,26,23,0.07)] rounded-xl overflow-hidden">
        <CardContent className="p-6 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {hardwareCards.map((item, idx) => (
              <div key={idx} className={`p-4 bg-white/90 border rounded-xl space-y-3 transition-colors shadow-2xs ${item.border}`}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF7F0] border border-[#EAE3D5] flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-mono tracking-wider font-semibold py-0.5 px-2 rounded-md ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif-luxury text-lg font-medium text-[#181715] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#5A564F] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EDE6D8] flex flex-wrap items-center justify-between gap-3 text-xs bg-[#FAF7F0] p-3.5 rounded-lg border border-[#E8DFC9]">
            <div className="flex items-center gap-2 text-[#244A29] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#244A29] shrink-0" />
              <span>Torque handle and pull screws by hand. Power impact drivers risk stripping fastener threads.</span>
            </div>
            <span className="text-[10px] font-mono text-[#9B7A4F] uppercase font-bold tracking-wider">VanStro Factory Joinery Standard</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
