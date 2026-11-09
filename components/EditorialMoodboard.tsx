'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MoodboardItem {
  id: string;
  title: string;
  figure: string;
  caption: string;
  src: string;
  alt: string;
  material: string;
}

const MOODBOARD_ITEMS: MoodboardItem[] = [
  {
    id: 'plywood-box',
    figure: 'FIG. 01',
    title: '¾" Birch Plywood Box',
    caption: 'Multi-ply cabinet box core with dual-side melamine facing and factory-sealed hot-melt edge seams.',
    src: '/assets/guides/handbook/hb-box-plywood.webp',
    alt: 'VanStro ¾" Birch Plywood cabinet box cross section and edge banding',
    material: '¾" Plywood & Melamine',
  },
  {
    id: 'dtc-hinge',
    figure: 'FIG. 02',
    title: 'DTC 6-Way Cam Hinge',
    caption: 'Cold-rolled nickel-plated steel hinge with integrated hydraulic deceleration damper and 3D spiral cam adjustment.',
    src: '/assets/guides/handbook/hb-hinge.webp',
    alt: 'VanStro DTC 6-way spiral cam soft-close concealed hinge',
    material: 'Precision Hardware',
  },
  {
    id: 'microfiber-cloth',
    figure: 'FIG. 03',
    title: 'Optical Microfiber Care Cloth',
    caption: 'Dual-surface optical-grade microfiber weave formulated specifically for matte PVC soft-touch surfaces.',
    src: '/assets/guides/handbook/hb-cloth.webp',
    alt: 'VanStro recommended lint-free microfiber cleaning cloth',
    material: 'Care Textile',
  },
];

export default function EditorialMoodboard() {
  const [selectedPhoto, setSelectedPhoto] = useState<MoodboardItem | null>(null);

  return (
    <aside className="w-full space-y-6">
      {/* Moodboard Header */}
      <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-3">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73706B]">
          Material Study
        </span>
        <span className="text-[11px] font-mono text-[#A09D96]">
          Archive 03/03
        </span>
      </div>

      {/* Stacked 3 Architectural Detail Photos */}
      <div className="space-y-6">
        {MOODBOARD_ITEMS.map((item) => (
          <article
            key={item.id}
            className="group bg-gradient-to-b from-white to-[#FAF7F2] border border-[#DFD7C7] rounded-xl overflow-hidden hover:border-[#9B7A4F] shadow-sm transition-all duration-300"
          >
            {/* Interactive Image Frame */}
            <div
              onClick={() => setSelectedPhoto(item)}
              className="relative aspect-[4/3] w-full bg-[#EAE7E0] overflow-hidden cursor-zoom-in"
              title="Click to inspect high-resolution detail"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 group-hover:scale-104"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/70 backdrop-blur-xs text-[10px] font-mono text-[#E8C78E] font-bold tracking-widest uppercase rounded-sm border border-[#C5A069]/30">
                {item.figure}
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 bg-[#181715]/90 backdrop-blur-xs text-[10px] text-white tracking-wider uppercase font-mono rounded-md flex items-center gap-1.5 shadow-md">
                <svg className="w-3 h-3 text-[#C5A069]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                Inspect Detail
              </div>
            </div>

            {/* Editorial Caption */}
            <div className="p-4 space-y-1.5 bg-white/90 border-t border-[#EDE6D8]">
              <div className="flex items-center justify-between text-[11px]">
                <h4 className="font-serif-luxury text-base font-medium text-[#181715]">
                  {item.title}
                </h4>
                <span className="font-mono text-[10px] text-[#9B7A4F] font-bold uppercase tracking-wider">
                  {item.material}
                </span>
              </div>
              <p className="text-xs text-[#5A564F] leading-relaxed">
                {item.caption}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Editorial Footnote with Rich Obsidian Contrast */}
      <div className="p-4 bg-[#181715] text-[#F9F8F6] border border-[#2E2B26] rounded-xl space-y-1.5 shadow-md">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A069] font-bold block">
          Editorial Specimen Note
        </span>
        <p className="text-[11px] text-[#A09D96] leading-relaxed font-sans">
          Specimens harvested and machined according to VanStro Architectural Joinery standards. Natural batch grain variances and micro-pores are authentic characteristics of European Baltic birch and rift-cut oak.
        </p>
      </div>

      {/* Image Inspection Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1C1A17]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-[#F9F8F6] border border-[#E7E5E0] max-w-3xl w-full rounded-sm overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#E7E5E0] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#9B7A4F] uppercase tracking-wider block">
                  {selectedPhoto.figure} · High-Resolution Detail
                </span>
                <h3 className="font-serif-luxury text-xl font-medium text-[#1C1A17]">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full border border-[#D5D1C7] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white transition-colors flex items-center justify-center cursor-pointer text-xs"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full bg-[#E5E1D8]">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 bg-white space-y-2">
              <p className="text-xs text-[#1C1A17] font-medium">
                {selectedPhoto.caption}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#F0EFEA] text-[11px] text-[#8C8880] font-mono">
                <span>Material: {selectedPhoto.material}</span>
                <span>VanStro Architectural Digest Standard</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
