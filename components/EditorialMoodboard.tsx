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
    id: 'oak-grain',
    figure: 'FIG. 01',
    title: 'Natural Oak Wood Grain',
    caption: 'Quarter-sawn White Oak Veneer with open radial pores under ultra-matte 5% polyurethane topcoat.',
    src: '/images/oak_wood_grain_1793828381387.jpg',
    alt: 'Close-up macro of natural oak wood grain cabinetry veneer',
    material: 'Natural Timber',
  },
  {
    id: 'brass-hardware',
    figure: 'FIG. 02',
    title: 'Brushed Brass Pull Hardware',
    caption: 'Satin unlacquered living brass pull handle mounted flush against custom fluted millwork.',
    src: '/images/brushed_brass_handle_1793828381577.jpg',
    alt: 'Brushed satin brass cabinetry handle hardware',
    material: 'Solid Forged Brass',
  },
  {
    id: 'linen-cloths',
    figure: 'FIG. 03',
    title: 'Organic Linen & Microfiber',
    caption: 'Dual-sided Belgian waffle-weave linen and optical microfiber cloths formulated for zero lint.',
    src: '/images/folded_linen_cloths_1793828382675.jpg',
    alt: 'Folded organic linen cleaning cloths on limestone surface',
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
            className="group bg-[#FFFFFF] border border-[#E7E5E0] rounded-sm overflow-hidden hover:border-[#1C1A17]/30 transition-all duration-300"
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
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 tracking-widest uppercase">
                {item.figure}
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 bg-[#1C1A17]/85 backdrop-blur-xs text-[10px] text-white tracking-wider uppercase font-mono rounded-xs flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                Inspect Detail
              </div>
            </div>

            {/* Editorial Caption */}
            <div className="p-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <h4 className="font-serif-luxury text-base font-medium text-[#1C1A17]">
                  {item.title}
                </h4>
                <span className="font-mono text-[10px] text-[#9B7A4F] uppercase tracking-wider">
                  {item.material}
                </span>
              </div>
              <p className="text-xs text-[#73706B] leading-relaxed">
                {item.caption}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Editorial Footnote */}
      <div className="p-4 bg-[#F4F2ED] border border-[#EBE7DF] rounded-sm space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#73706B] font-semibold block">
          Editorial Specimen Note
        </span>
        <p className="text-[11px] text-[#5E5A54] leading-relaxed">
          Samples sourced from VanStro Custom Millwork Atelier in Copenhagen. Natural batch grain variances are authentic characteristics of sustainably harvested European timber.
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
