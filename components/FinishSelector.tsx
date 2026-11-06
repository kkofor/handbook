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

      {/* shadcn Tabs Component */}
      <Tabs value={activeFinish} onValueChange={onSelectFinish}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-mono uppercase tracking-wider text-[#8C8880] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#9B7A4F]" />
            <span>Select Cabinetry Finish Surface:</span>
          </label>
          <span className="text-[11px] text-[#73706B] font-mono">
            Active: <strong className="text-[#1C1A17]">{current.name}</strong>
          </span>
        </div>

        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-[#EFECE6] p-1.5 rounded-lg border border-[#E5E2DA]">
          {FINISH_KEYS.map((key) => {
            const finish = FINISH_DETAILS[key];
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="flex-1 min-w-[110px] py-2 text-xs"
              >
                {finish.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Dynamic Material Care Specification Card using shadcn Card */}
      <Card className="border-[#E7E5E0] shadow-sm">
        <CardHeader className="p-6 sm:p-7 space-y-3 pb-4">
          <div className="flex items-center gap-2">
            <Badge variant="copper" className="text-[9px]">
              Profile
            </Badge>
            <span className="text-[#C4C0B6]">/</span>
            <span className="text-xs font-mono text-[#73706B]">
              {current.name} Protocol
            </span>
          </div>
          <CardTitle className="text-xl sm:text-2xl text-[#1C1A17]">
            {current.subtitle}
          </CardTitle>
          <CardDescription className="text-sm text-[#5E5A54] leading-relaxed pt-1">
            {current.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-7 pt-0 space-y-6">
          {/* 4-Column Specification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#F0EFEA] bg-[#FAF9F6]/50 rounded-md p-3">
            {current.specNotes.map((spec, i) => (
              <div key={i} className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880] block">
                  {spec.label}
                </span>
                <span className="text-xs font-semibold text-[#1C1A17] block leading-snug">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Cleaning solution & technique callouts in structured shadcn tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] rounded-md space-y-2 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-semibold">
                <Droplets className="w-3.5 h-3.5" />
                <span>Authorized Cleaning Solution</span>
              </div>
              <p className="text-[#1C1A17] font-medium leading-relaxed">
                {current.recommendedSolution}
              </p>
              <div className="pt-2 border-t border-[#F0EFEA] flex items-center justify-between text-[11px] text-[#73706B]">
                <span>Tolerated Chemistry:</span>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {current.phRange}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] rounded-md space-y-2 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-[#244A29]" />
                <span>Application &amp; Buffing Technique</span>
              </div>
              <p className="text-[#1C1A17] font-medium leading-relaxed">
                {current.wipeTechnique}
              </p>
              <div className="pt-2 border-t border-[#F0EFEA] flex items-center justify-between text-[11px] text-[#73706B]">
                <span>Moisture Exposure:</span>
                <Badge variant="secondary" className="font-mono text-[10px]">
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
