'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, ExternalLink, Printer, Scale, Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface VanityProductItem {
  id: string;
  nameEn: string;
  nameFr: string;
  w: number;
  h: number;
  d: number;
  priceCab: number;
  priceTop: number;
  urlEn: string;
}

interface VanityComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: VanityProductItem[];
  unit: 'in' | 'cm';
  spaceWidthInches: number;
  frontInches: number | null;
  onRemoveItem: (id: string) => void;
  lang: 'en' | 'fr';
  configuration: 'cabinet' | 'cabinet_top' | 'both';
}

function getDoorDrawerDescription(id: string, lang: 'en' | 'fr'): { doors: string; drawers: string; layout: string } {
  if (id === 'VS24' || id === 'VS27' || id === 'VS30' || id === 'VS36') {
    return {
      doors: lang === 'fr' ? '2 Portes Shaker' : '2 Shaker Doors',
      drawers: lang === 'fr' ? 'Aucun tiroir (espace plomberie max)' : '0 Drawers (Open plumbing cavity)',
      layout: lang === 'fr' ? 'Double porte, dégagement ouvert' : 'Double door, central open plumbing',
    };
  }
  if (id === 'V3021STDR') {
    return {
      doors: lang === 'fr' ? '1 Porte (gauche)' : '1 Door (Left)',
      drawers: lang === 'fr' ? '3 Tiroirs étagés (droite)' : '3 Stacked Drawers (Right)',
      layout: lang === 'fr' ? '1 porte gauche, tiroirs à droite' : 'Single door left, drawers right',
    };
  }
  if (id === 'V3021STDL') {
    return {
      doors: lang === 'fr' ? '1 Porte (droite)' : '1 Door (Right)',
      drawers: lang === 'fr' ? '3 Tiroirs étagés (gauche)' : '3 Stacked Drawers (Left)',
      layout: lang === 'fr' ? '1 porte droite, tiroirs à gauche' : 'Single door right, drawers left',
    };
  }
  if (id === 'V3021TDR' || id === 'V3621TDR') {
    return {
      doors: lang === 'fr' ? '2 Portes' : '2 Doors',
      drawers: lang === 'fr' ? '3 Tiroirs étagés (droite)' : '3 Stacked Drawers (Right)',
      layout: lang === 'fr' ? '2 portes, tiroirs à droite' : 'Two doors, drawers right',
    };
  }
  if (id === 'V3021TDL' || id === 'V3621TDL') {
    return {
      doors: lang === 'fr' ? '2 Portes' : '2 Doors',
      drawers: lang === 'fr' ? '3 Tiroirs étagés (gauche)' : '3 Stacked Drawers (Left)',
      layout: lang === 'fr' ? '2 portes, tiroirs à gauche' : 'Two doors, drawers left',
    };
  }
  if (id === 'V4221') {
    return {
      doors: lang === 'fr' ? '2 Portes (centre lavabo)' : '2 Doors (Sink Center)',
      drawers: lang === 'fr' ? '4 Tiroirs utilitaires' : '4 Utility Drawers',
      layout: lang === 'fr' ? 'Lavabo central + 4 tiroirs latéraux' : 'Center sink base + 4 side drawers',
    };
  }
  if (id === 'V4821') {
    return {
      doors: lang === 'fr' ? '2 Portes (centre lavabo)' : '2 Doors (Sink Center)',
      drawers: lang === 'fr' ? '6 Tiroirs utilitaires' : '6 Utility Drawers',
      layout: lang === 'fr' ? 'Lavabo central + 6 tiroirs latéraux' : 'Center sink base + 6 side drawers',
    };
  }
  if (id === 'V663522') {
    return {
      doors: lang === 'fr' ? '4 Portes (double lavabo)' : '4 Doors (Double Sink)',
      drawers: lang === 'fr' ? '3 Tiroirs centraux étagés' : '3 Center Stacked Drawers',
      layout: lang === 'fr' ? 'Meuble maître double lavabo' : 'Master double sink vanity',
    };
  }
  return {
    doors: lang === 'fr' ? 'Standard' : 'Standard',
    drawers: lang === 'fr' ? 'Standard' : 'Standard',
    layout: lang === 'fr' ? 'Configuration VanStro' : 'VanStro Configuration',
  };
}

export default function VanityComparisonModal({
  isOpen,
  onClose,
  items,
  unit,
  spaceWidthInches,
  frontInches,
  onRemoveItem,
  lang,
  configuration,
}: VanityComparisonModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Identify lowest prices for highlighting
  const minPriceCab = Math.min(...items.map((i) => i.priceCab));
  const minPriceTop = Math.min(...items.map((i) => i.priceTop));
  const minWidth = Math.min(...items.map((i) => i.w));
  const maxWidth = Math.max(...items.map((i) => i.w));

  const formatLen = (valInches: number) => {
    if (unit === 'cm') {
      return `${(valInches * 2.54).toFixed(1)} cm`;
    }
    return `${valInches}"`;
  };

  const formatMoney = (val: number) => {
    return lang === 'fr' ? `${val.toFixed(2)} $` : `$${val.toFixed(2)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#181715]/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#FAF9F6] border border-[#E7E5E0] rounded-2xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header Slice */}
          <div className="px-6 py-5 bg-white border-b border-[#E7E5E0] flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center text-[#9B7A4F]">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#1C1A17]">
                    {lang === 'fr' ? 'Comparaison des meubles-lavabos' : 'Vanity Specification Comparison'}
                  </h3>
                  <Badge variant="copper" className="font-mono text-[10px]">
                    {items.length} / 3 {lang === 'fr' ? 'modèles' : 'models'}
                  </Badge>
                </div>
                <p className="text-xs text-[#73706B] font-sans mt-0.5">
                  {lang === 'fr'
                    ? 'Comparaison côte à côte des dimensions, des prix et de l’espace restant.'
                    : 'Side-by-side comparison of dimensions, prices, and room clearances.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono h-8"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Imprimer' : 'Print Spec'}</span>
              </Button>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#E7E5E0] bg-white flex items-center justify-center text-[#73706B] hover:text-[#1C1A17] hover:border-[#1C1A17] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body - Side by Side Comparison Grid */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-sm text-[#73706B]">
                  {lang === 'fr'
                    ? 'Aucun meuble sélectionné pour la comparaison.'
                    : 'No vanity selected for comparison.'}
                </p>
                <Button variant="outline" size="sm" onClick={onClose}>
                  {lang === 'fr' ? 'Fermer et sélectionner' : 'Close and select vanities'}
                </Button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${items.length === 2 ? 'md:grid-cols-2' : items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-1'} gap-6`}>
                {items.map((prod) => {
                  const spareInches = Math.max(0, spaceWidthInches - prod.w);
                  const isFlush = Math.abs(spareInches) < 0.001;
                  const itemUrl = lang === 'fr'
                    ? prod.urlEn.replace('https://www.vanstro.ca/', 'https://www.vanstro.ca/fr/')
                    : prod.urlEn;
                  const details = getDoorDrawerDescription(prod.id, lang);
                  const isLowestCabPrice = prod.priceCab === minPriceCab && items.length > 1;
                  const widthDelta = prod.w - minWidth;
                  const priceCabDelta = prod.priceCab - minPriceCab;

                  return (
                    <Card
                      key={prod.id}
                      className="border-[#E7E5E0] bg-white rounded-xl shadow-xs overflow-hidden flex flex-col justify-between"
                    >
                      {/* Card Header Slice */}
                      <CardHeader className="p-5 pb-3 border-b border-[#F0EFEA] bg-[#FAF9F6] space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="copper" className="font-mono text-[10px] font-bold">
                            {prod.id}
                          </Badge>
                          <div className="flex items-center gap-1.5">
                            {isLowestCabPrice && (
                              <Badge variant="success" className="text-[9px] font-mono">
                                {lang === 'fr' ? 'Plus économique' : 'Best Value'}
                              </Badge>
                            )}
                            <button
                              type="button"
                              onClick={() => onRemoveItem(prod.id)}
                              className="text-[11px] font-mono text-[#8C8880] hover:text-[#8B2627] ml-1 p-0.5 transition-colors cursor-pointer"
                              title="Remove"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        <CardTitle className="text-xl font-serif-luxury font-normal text-[#1C1A17] leading-snug">
                          {lang === 'fr' ? prod.nameFr : prod.nameEn}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-5 space-y-5 text-xs">
                        {/* 1. Dimensions Section */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                            {lang === 'fr' ? 'Dimensions & Échelle' : 'Dimensions & Scale'}
                          </span>
                          <div className="grid grid-cols-3 gap-2 bg-[#FAF9F6] p-2.5 rounded-lg border border-[#F0EFEA] text-center font-mono">
                            <div>
                              <span className="text-[10px] text-[#8C8880] block">{lang === 'fr' ? 'Largeur' : 'Width'}</span>
                              <strong className="text-sm text-[#1C1A17]">{formatLen(prod.w)}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#8C8880] block">{lang === 'fr' ? 'Hauteur' : 'Height'}</span>
                              <strong className="text-sm text-[#1C1A17]">{formatLen(prod.h)}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#8C8880] block">{lang === 'fr' ? 'Prof.' : 'Depth'}</span>
                              <strong className="text-sm text-[#1C1A17]">{formatLen(prod.d)}</strong>
                            </div>
                          </div>

                          {/* Relative Width Visualizer Bar */}
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8880]">
                              <span>{lang === 'fr' ? 'Largeur relative:' : 'Relative Width:'}</span>
                              {items.length > 1 && widthDelta > 0 && (
                                <span className="text-[#9B7A4F] font-semibold">+{formatLen(widthDelta)}</span>
                              )}
                            </div>
                            <div className="w-full bg-[#EFECE6] h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-[#9B7A4F] h-full rounded-full transition-all duration-300"
                                style={{ width: `${Math.max(25, (prod.w / maxWidth) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* 2. Room Clearance & Fit Section */}
                        <div className="space-y-2 pt-2 border-t border-[#F0EFEA]">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                            {lang === 'fr' ? 'Ajustement dans votre espace' : 'Room Fit & Clearance'}
                          </span>
                          <div className="p-3 bg-white border border-[#E7E5E0] rounded-lg space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[#73706B]">{lang === 'fr' ? 'Espace restant (côtés):' : 'Wall space remaining:'}</span>
                              <Badge
                                variant={isFlush ? 'success' : 'secondary'}
                                className="font-mono text-[10px]"
                              >
                                {isFlush
                                  ? lang === 'fr' ? 'Ajustement parfait (0 po)' : 'Exact Flush Fit (0")'
                                  : `${formatLen(spareInches)} ${lang === 'fr' ? 'de jeu' : 'to spare'}`}
                              </Badge>
                            </div>
                            {frontInches !== null && (
                              <div className="flex items-center justify-between text-[11px] text-[#73706B] pt-1 border-t border-[#F5F3EE]">
                                <span>{lang === 'fr' ? 'Espace avant restant:' : 'Front clearance left:'}</span>
                                <span className="font-mono text-[#1C1A17] font-semibold">
                                  {formatLen(Math.max(0, frontInches - prod.d))}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 3. Pricing Section */}
                        <div className="space-y-2 pt-2 border-t border-[#F0EFEA]">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                            {lang === 'fr' ? 'Prix National Canadien' : 'National Canadian Pricing'}
                          </span>
                          <div className="p-3 bg-[#FAF9F6] border border-[#E7E5E0] rounded-lg space-y-2">
                            {(configuration === 'cabinet' || configuration === 'both') && (
                              <div className="flex items-baseline justify-between">
                                <span className="text-[#73706B]">{lang === 'fr' ? 'Meuble seul:' : 'Cabinet only:'}</span>
                                <div className="text-right">
                                  <span className="font-mono font-bold text-sm text-[#1C1A17]">
                                    {formatMoney(prod.priceCab)}
                                  </span>
                                  {items.length > 1 && priceCabDelta > 0 && (
                                    <span className="text-[10px] font-mono text-[#8C8880] block">
                                      (+{formatMoney(priceCabDelta)})
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {(configuration === 'cabinet_top' || configuration === 'both') && (
                              <div className="flex items-baseline justify-between pt-1 border-t border-[#F0EFEA]">
                                <span className="text-[#73706B]">{lang === 'fr' ? 'Avec comptoir:' : 'With Top:'}</span>
                                <span className="font-mono font-bold text-sm text-[#1C1A17]">
                                  {formatMoney(prod.priceTop)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 4. Configuration & Hardware Details */}
                        <div className="space-y-2 pt-2 border-t border-[#F0EFEA]">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#9B7A4F] font-semibold block">
                            {lang === 'fr' ? 'Agencement & Portes / Tiroirs' : 'Door & Drawer Layout'}
                          </span>
                          <div className="space-y-1.5 text-[11px] text-[#5E5A54] leading-relaxed">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#244A29] shrink-0" />
                              <span>{details.doors}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#244A29] shrink-0" />
                              <span>{details.drawers}</span>
                            </div>
                            <div className="text-[10px] text-[#8C8880] italic pl-5">
                              {details.layout}
                            </div>
                          </div>
                        </div>

                        {/* 5. Construction Highlights */}
                        <div className="space-y-1 pt-2 border-t border-[#F0EFEA] text-[10px] text-[#8C8880] font-mono">
                          <p>✓ ¾&quot; Melamine-faced plywood box</p>
                          <p>✓ DTC 6-way soft-close mechanics</p>
                          <p>✓ PVC soft-touch matte shaker doors</p>
                        </div>
                      </CardContent>

                      {/* Card Footer: Official Product Page Link */}
                      <div className="p-4 bg-[#FAF9F6] border-t border-[#EFECE6] flex items-center justify-between">
                        <a
                          href={itemUrl}
                          target="_blank"
                          rel="noopener"
                          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono uppercase tracking-wider font-semibold bg-[#1C1A17] text-white hover:bg-[#33302B] rounded-md transition-colors"
                        >
                          <span>{lang === 'fr' ? 'Voir sur VanStro.ca' : 'View on VanStro.ca'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="px-6 py-4 bg-white border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#73706B]">
            <p className="font-mono text-[11px]">
              {lang === 'fr'
                ? 'Prix nationaux uniformes chez tous les concessionnaires canadiens agréés.'
                : 'National uniform prices across all authorized Canadian dealer hubs.'}
            </p>
            <Button variant="outline" size="sm" onClick={onClose} className="font-mono text-xs">
              {lang === 'fr' ? 'Fermer la comparaison' : 'Close Comparison'}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
