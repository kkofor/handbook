'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings2, Sliders, Disc, ShieldCheck } from 'lucide-react';

export default function HardwareSection() {
  const hardwareCards = [
    {
      icon: <Disc className="w-4 h-4 text-[#003f3f]" />,
      badge: "Living Brass Finish",
      title: "Solid Pulls & Handles",
      desc: "Living and satin brass hardware naturally develops character with daily touch. Wipe clean with a dry microfiber cloth. Avoid acidic chemicals, brass abrasive pastes, or solvents that strip factory protective coats.",
      border: "border-[#d9e1df] hover:border-[#003f3f]",
      badgeClass: "bg-[#f5f8f7] text-[#003f3f] border border-[#d9e1df]",
    },
    {
      icon: <Settings2 className="w-4 h-4 text-[#003f3f]" />,
      badge: "Hydraulic Damping",
      title: "DTC Soft-Close Mechanics",
      desc: "Engineered with integrated hydraulic fluid dampers. Never force doors or drawers closed manually against resistance. Never spray penetrating oils (such as WD-40), which dissolve internal fluid seals.",
      border: "border-[#d9e1df] hover:border-[#003f3f]",
      badgeClass: "bg-[#f5f8f7] text-[#003f3f] border border-[#d9e1df]",
    },
    {
      icon: <Sliders className="w-4 h-4 text-[#003f3f]" />,
      badge: "6-Way Precision",
      title: "DTC 6-Way Alignment",
      desc: "Doors settle naturally with house temperature and humidity cycles. Adjust the 6-way screws (depth, lateral reveal, and vertical height) using a manual #2 Pozi or Phillips screwdriver to maintain consistent reveals.",
      border: "border-[#d9e1df] hover:border-[#003f3f]",
      badgeClass: "bg-[#f5f8f7] text-[#003f3f] border border-[#d9e1df]",
    },
  ];

  return (
    <section id="hardware" className="scroll-mt-28 space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#d9e1df] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-mono font-bold text-[#003f3f] bg-[#f5f8f7] px-2 py-0.5 border border-[#d9e1df] rounded">04</span>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#10201d] tracking-tight">
            Hardware &amp; Mechanics
          </h2>
        </div>
        <span className="text-xs text-[#526360] tracking-wider uppercase font-mono">
          Mechanical Maintenance
        </span>
      </div>

      <Card className="border-[#d9e1df] bg-white shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-6 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {hardwareCards.map((item, idx) => (
              <div key={idx} className={`p-4 bg-white border rounded-xl space-y-3 transition-colors ${item.border}`}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#f5f8f7] border border-[#d9e1df] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-mono tracking-wider font-semibold py-0.5 px-2 rounded-md ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-[#10201d] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#526360] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#d9e1df] flex flex-wrap items-center justify-between gap-3 text-xs bg-[#f5f8f7] p-3.5 rounded-lg border border-[#d9e1df]">
            <div className="flex items-center gap-2 text-[#003f3f] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#003f3f] shrink-0" />
              <span>Torque handle and pull screws by hand. Power impact drivers risk stripping fastener threads.</span>
            </div>
            <span className="text-[10px] font-mono text-[#526360] uppercase font-bold tracking-wider">VanStro Factory Assembly Standard</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
