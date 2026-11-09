'use client';

import { FINISH_DETAILS } from '@/data/care-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Droplets, CheckCircle, ShieldAlert } from 'lucide-react';

interface FinishSelectorProps {
  activeFinish: string;
  onSelectFinish: (finish: string) => void;
}

const FINISH_KEYS = ['pvc_door', 'plywood_box', 'veneer', 'painted', 'hardware'];

export default function FinishSelector({
  activeFinish,
  onSelectFinish,
}: FinishSelectorProps) {
  const current = FINISH_DETAILS[activeFinish] || FINISH_DETAILS.pvc_door;

  return (
    <section id="material-care" className="scroll-mt-28 space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <div className="flex items-baseline gap-3">
          <Badge variant="copper">02</Badge>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1A17] tracking-tight">
            Material Care
          </h2>
        </div>
        <span className="text-xs text-[#73706B] tracking-wider uppercase font-mono">
          Finish Specification
        </span>
      </div>

      {/* Tabs with Realistic Material Swatches */}
      <Tabs value={activeFinish} onValueChange={onSelectFinish}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-mono uppercase tracking-wider text-[#6B665F] font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#9B7A4F]" />
            <span>Select Cabinetry Finish Surface:</span>
          </label>
          <span className="text-[11px] text-[#6B665F] font-mono">
            Active: <strong className="text-[#181715] font-bold">{current.name}</strong>
          </span>
        </div>

        <TabsList className="w-full flex flex-wrap h-auto gap-1.5 bg-[#EAE6DD] p-1.5 rounded-xl border border-[#D8D2C4]">
          {FINISH_KEYS.map((key) => {
            const finish = FINISH_DETAILS[key];
            const swatches: Record<string, string> = {
              pvc_door: 'bg-[#F2EFE9] border border-stone-400',
              plywood_box: 'bg-[#D4A373] border border-[#B38048]',
              veneer: 'bg-[#8C6239] border border-[#6B4725]',
              painted: 'bg-[#FFFFFF] border border-stone-300',
              hardware: 'bg-gradient-to-tr from-[#9B7A4F] to-[#D4AF37]',
            };

            const isSelected = activeFinish === key;

            return (
              <TabsTrigger
                key={key}
                value={key}
                className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-medium transition-all duration-200 rounded-lg flex items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#181715] text-[#F9F8F6] shadow-sm font-semibold'
                    : 'text-[#55524C] hover:text-[#181715] hover:bg-white/60'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${swatches[key] || 'bg-stone-300'}`} />
                <span>{finish.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Dynamic Material Care Specification Card with Rich Luxury Depth */}
      <Card className="border-[#DFD6C5] bg-gradient-to-b from-[#FFFFFF] to-[#FAF8F4] shadow-[0_4px_24px_-4px_rgba(28,26,23,0.07)] rounded-xl overflow-hidden">
        <CardHeader className="p-6 sm:p-7 space-y-3 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#181715] text-[#E8C78E] text-[10px] font-mono font-bold tracking-wider border border-[#C5A069]/30">
              MATERIAL SPEC
            </span>
            <span className="text-[#C4C0B6]">/</span>
            <span className="text-xs font-mono text-[#9B7A4F] font-semibold">
              {current.name} Protocol
            </span>
          </div>
          <CardTitle className="text-xl sm:text-2xl text-[#181715] font-medium font-serif-luxury">
            {current.subtitle}
          </CardTitle>
          <CardDescription className="text-sm text-[#55524C] leading-relaxed pt-1 font-normal">
            {current.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-7 pt-0 space-y-6">
          {/* 4-Column Specification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#EDE6D8]">
            {current.specNotes.map((spec, i) => (
              <div key={i} className="p-3 bg-[#FAF6EE] border border-[#E8DFC9] rounded-lg space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-bold block">
                  {spec.label}
                </span>
                <span className="text-xs font-semibold text-[#181715] block leading-snug">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Cleaning solution & technique callouts in structured rich tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white border border-[#DFD6C5] rounded-xl space-y-2 shadow-2xs hover:border-[#9B7A4F] transition-colors">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-bold">
                <Droplets className="w-3.5 h-3.5 text-[#9B7A4F]" />
                <span>Authorized Cleaning Solution</span>
              </div>
              <p className="text-[#181715] font-medium leading-relaxed">
                {current.recommendedSolution}
              </p>
              <div className="pt-2 border-t border-[#F0EFEA] flex items-center justify-between text-[11px] text-[#6B665F]">
                <span>Tolerated Chemistry:</span>
                <Badge variant="secondary" className="font-mono text-[10px] bg-[#FAF6EE] text-[#9B7A4F] border-[#E8DFC9]">
                  {current.phRange}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#D1E2D7] rounded-xl space-y-2 shadow-2xs hover:border-[#244A29] transition-colors">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#244A29] font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-[#244A29]" />
                <span>Application &amp; Buffing Technique</span>
              </div>
              <p className="text-[#181715] font-medium leading-relaxed">
                {current.wipeTechnique}
              </p>
              <div className="pt-2 border-t border-[#DFECE3] flex items-center justify-between text-[11px] text-[#4D6353]">
                <span>Moisture Exposure:</span>
                <Badge variant="secondary" className="font-mono text-[10px] bg-[#F2F7F4] text-[#244A29] border-[#D1E2D7]">
                  {current.moistureLimit}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
