import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import VanityComparisonModal from '@/components/VanityComparisonModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Scale, ArrowRight, Check, CheckSquare, Square, AlertCircle, Sparkles, Columns3 } from 'lucide-react';

interface VanityFinderAppProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
}

const PRODUCTS = [
  { id: 'VS24', nameEn: 'Vanity Cabinet VS24', nameFr: 'Meuble-lavabo VS24', w: 24, h: 34, d: 21, priceCab: 195, priceTop: 350, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-vs24-384/' },
  { id: 'VS27', nameEn: 'Vanity Cabinet VS27', nameFr: 'Meuble-lavabo VS27', w: 27, h: 34, d: 21, priceCab: 210, priceTop: 370, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-vs27-404/' },
  { id: 'VS30', nameEn: 'Vanity Cabinet VS30', nameFr: 'Meuble-lavabo VS30', w: 30, h: 34, d: 21, priceCab: 220, priceTop: 400, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-vs30-405/' },
  { id: 'V3021STDR', nameEn: '30" Vanity Cabinet – Single Door, Drawers Right (V3021STDR)', nameFr: 'Meuble-lavabo V3021STDR', w: 30, h: 34, d: 21, priceCab: 350, priceTop: 530, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v3021stdr-398/' },
  { id: 'V3021STDL', nameEn: '30" Vanity Cabinet – Single Door, Drawers Left (V3021STDL)', nameFr: 'Meuble-lavabo V3021STDL', w: 30, h: 34, d: 21, priceCab: 350, priceTop: 530, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v3021stdl-400/' },
  { id: 'V3021TDR', nameEn: '30" Vanity Cabinet – Two Doors, Drawers Right (V3021TDR)', nameFr: 'Meuble-lavabo V3021TDR', w: 30, h: 34, d: 21, priceCab: 360, priceTop: 535, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v3021tdr-414/' },
  { id: 'V3021TDL', nameEn: '30" Vanity Cabinet – Two Doors, Drawers Left (V3021TDL)', nameFr: 'Meuble-lavabo V3021TDL', w: 30, h: 34, d: 21, priceCab: 360, priceTop: 535, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v3021tdl-415/' },
  { id: 'VS36', nameEn: 'Vanity Cabinet VS36', nameFr: 'Meuble-lavabo VS36', w: 36, h: 34, d: 21, priceCab: 255, priceTop: 510, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-vs36-406/' },
  { id: 'V3621TDR', nameEn: 'Vanity Cabinet V3621TDR', nameFr: 'Meuble-lavabo V3621TDR', w: 36, h: 34, d: 21, priceCab: 400, priceTop: 655, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v3621tdr-413/' },
  { id: 'V3621TDL', nameEn: 'Vanity Cabinet V3621TDL', nameFr: 'Meuble-lavabo V3621TDL', w: 36, h: 34, d: 21, priceCab: 400, priceTop: 655, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v3621tdl-412/' },
  { id: 'V4221', nameEn: 'Vanity Cabinet V4221', nameFr: 'Meuble-lavabo V4221', w: 42, h: 34, d: 21, priceCab: 730, priceTop: 975, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v4221-401/' },
  { id: 'V4821', nameEn: 'Vanity Cabinet V4821', nameFr: 'Meuble-lavabo V4821', w: 48, h: 34, d: 21, priceCab: 790, priceTop: 1075, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v4821-402/' },
  { id: 'V663522', nameEn: 'Vanity Cabinet V663522', nameFr: 'Meuble-lavabo V663522', w: 66, h: 35, d: 22, priceCab: 925, priceTop: 1495, urlEn: 'https://www.vanstro.ca/products/vanity-cabinet-v663522-403/' }
];

const ACCESSORY_VEP2230 = {
  id: 'VEP2230',
  nameEn: 'Vanity End Panel VEP2230',
  nameFr: 'Panneau d’extrémité de meuble-lavabo VEP2230',
  w: 22, h: 30, d: 0.75,
  price: 57.54,
  urlEn: 'https://www.vanstro.ca/products/vanity-end-panel-vep2230-380/'
};

const I18N = {
  en: {
    pageTitle: 'Find a vanity that fits your space',
    pageDesc: 'Enter the width of your space to see every VanStro vanity that fits, with its exact size and price. No sign-up, and nothing you enter is saved.',
    labelWidth: 'Space width',
    hintWidth: 'Measure wall to wall, or from the wall to the tub or shower.',
    unitIn: 'in',
    unitCm: 'cm',
    labelSides: 'Sides',
    sideBothWalls: 'Walls on both sides',
    sideOneOpen: 'Wall on one side, open on the other',
    sideBothOpen: 'Open on both sides',
    labelFront: 'Space in front (optional)',
    hintFront: 'From the back wall to whatever is in front of the vanity, such as a door, the opposite wall or the edge of the tub.',
    labelConfig: 'Configuration',
    configCabinet: 'Vanity Cabinet',
    configCabinetTop: 'Vanity Cabinet + Top',
    configBoth: 'Show both',
    labelColour: 'Colour',
    colourWhite: 'White',
    colourGrey: 'Light Grey',
    colourBoth: 'Show both',
    btnSubmit: 'Show vanities that fit',
    viewProduct: 'View product',
    toSpare: 'to spare',
    measureAgain: 'Measure again at the back and the front of the space; walls are not always square.',
    fixedNote1: 'Prices are national prices in Canadian dollars, the same at every dealer. When the vanity is in stock at your dealer, pickup is usually ready the same day or the next day after you order.',
    fixedNote2: 'Before you order, mark where the drain and water lines come through the wall; the sink should line up with them.',
    errorIn: 'Enter a width between 1" and 200".',
    errorCm: 'Enter a width between 3 cm and 508 cm.',
    noResults: 'The narrowest VanStro vanity is 24" wide. Contact us if you have a question about your space.',
    contactLinkText: 'Contact us',
    contactUrl: 'https://www.vanstro.ca/contact/',
    faqTitle: 'Vanity size questions',
    faqs: [
      { q: '1. What is the standard width of a bathroom vanity?', a: 'Common single-sink widths are 24", 30", 36" and 48". VanStro vanities come in 24", 27", 30", 36", 42", 48" and 66".' },
      { q: '2. How tall are VanStro vanities?', a: 'They are 34" high, in the comfort-height range. The 66" model is 35" high.' },
      { q: '3. How deep are VanStro vanities?', a: 'They are 21" deep. The 66" model is 22" deep.' },
      { q: '4. What is the smallest VanStro vanity?', a: 'VS24, at 24" wide, 34" high and 21" deep.' },
      { q: '5. Does a VanStro vanity come with a countertop?', a: 'Every model is sold as cabinet only or with a top. Choose the configuration on the product page.' },
      { q: '6. What colours are available?', a: 'White and Light Grey, at the same price.' },
      { q: '7. Which 30" vanity should I choose?', a: 'VS30, or one of the 30" models with drawers on the left or right and one or two doors (V3021STDR, V3021STDL, V3021TDR, V3021TDL). Choose the drawer side that suits your room, then check the drain and water line positions in the installation instructions on the product page.' },
      { q: '8. What if one side of the vanity is exposed?', a: 'A vanity end panel (VEP2230, 22" × 30") can cover the exposed side.' },
      { q: '9. What are the cabinets made of?', a: 'The box is ¾" plywood with melamine on both sides. Doors are ¾" MDF Shaker doors with a PVC matte soft-touch finish.' },
      { q: '10. How fast can I pick up a vanity?', a: 'When it is in stock at your dealer, pickup is usually ready the same day or the next day after you order.' }
    ]
  },
  fr: {
    pageTitle: 'Trouvez un meuble-lavabo qui convient à votre espace',
    pageDesc: 'Indiquez la largeur de votre espace pour voir tous les meubles-lavabos VanStro qui conviennent, avec leurs dimensions exactes et leur prix. Sans inscription, et rien de ce que vous entrez n\'est enregistré.',
    labelWidth: 'Largeur de l\'espace',
    hintWidth: 'Mesurez d\'un mur à l\'autre, ou du mur jusqu\'à la baignoire ou à la douche.',
    unitIn: 'po',
    unitCm: 'cm',
    labelSides: 'Côtés',
    sideBothWalls: 'Murs des deux côtés',
    sideOneOpen: 'Mur d\'un côté, ouvert de l\'autre',
    sideBothOpen: 'Ouvert des deux côtés',
    labelFront: 'Espace à l\'avant (facultatif)',
    hintFront: 'Du mur arrière jusqu\'à ce qui se trouve devant le meuble, par exemple une porte, le mur opposé ou le bord de la baignoire.',
    labelConfig: 'Configuration',
    configCabinet: 'Meuble-lavabo',
    configCabinetTop: 'Meuble-lavabo avec comptoir',
    configBoth: 'Afficher les deux',
    labelColour: 'Couleur',
    colourWhite: 'Blanc',
    colourGrey: 'Gris pâle',
    colourBoth: 'Afficher les deux',
    btnSubmit: 'Afficher les meubles qui conviennent',
    viewProduct: 'Voir le produit',
    toSpare: 'de jeu',
    measureAgain: 'Mesurez de nouveau à l\'arrière et à l\'avant de l\'espace; les murs ne sont pas toujours d\'équerre.',
    fixedNote1: 'Les prix sont des prix nationaux en dollars canadiens, les mêmes chez tous les concessionnaires. Lorsque le meuble est en stock chez votre concessionnaire, le ramassage est habituellement prêt le jour même ou le lendemain de la commande.',
    fixedNote2: 'Avant de commander, repérez l\'endroit où le drain et les conduites d\'eau sortent du mur; le lavabo doit être aligné sur eux.',
    errorIn: 'Entrez une largeur entre 1 po et 200 po.',
    errorCm: 'Entrez une largeur entre 3 cm et 508 cm.',
    noResults: 'Le meuble-lavabo VanStro le plus étroit mesure 24 po de largeur. Communiquez avec nous si vous avez une question sur votre espace.',
    contactLinkText: 'Communiquez avec nous',
    contactUrl: 'https://www.vanstro.ca/fr/contact/',
    faqTitle: 'Questions sur les dimensions',
    faqs: [
      { q: '1. Quelle est la largeur standard d\'un meuble-lavabo?', a: 'Les largeurs courantes pour un lavabo simple sont 24, 30, 36 et 48 po. Les meubles-lavabos VanStro existent en 24, 27, 30, 36, 42, 48 et 66 po.' },
      { q: '2. Quelle est la hauteur des meubles-lavabos VanStro?', a: 'Ils mesurent 34 po de hauteur, dans la plage dite « hauteur confort ». Le modèle de 66 po mesure 35 po.' },
      { q: '3. Quelle est la profondeur des meubles-lavabos VanStro?', a: 'Ils ont 21 po de profondeur. Le modèle de 66 po a 22 po.' },
      { q: '4. Quel est le plus petit meuble-lavabo VanStro?', a: 'Le VS24 : 24 po de largeur, 34 po de hauteur et 21 po de profondeur.' },
      { q: '5. Le meuble-lavabo est-il vendu avec un comptoir?', a: 'Chaque modèle est offert en meuble seul ou avec comptoir. Choisissez la configuration sur la page du produit.' },
      { q: '6. Quelles couleurs sont offertes?', a: 'Blanc et Gris pâle, au même prix.' },
      { q: '7. Quel meuble de 30 po choisir?', a: 'Le VS30, ou l\'un des modèles de 30 po avec tiroirs à gauche ou à droite et une ou deux portes (V3021STDR, V3021STDL, V3021TDR, V3021TDL). Choisissez le côté des tiroirs qui convient à votre pièce, puis vérifiez l\'emplacement du drain et des conduites d\'eau dans les instructions d\'installation de la page du produit.' },
      { q: '8. Et si un côté du meuble reste apparent?', a: 'Un panneau de finition (VEP2230, 22 × 30 po) peut le couvrir.' },
      { q: '9. En quoi sont faits les meubles?', a: 'Le caisson est en contreplaqué de ¾ po avec mélamine des deux côtés. Les portes Shaker sont en MDF de ¾ po avec fini PVC mat doux au toucher.' },
      { q: '10. En combien de temps puis-je ramasser un meuble-lavabo?', a: 'Lorsqu\'il est en stock chez votre concessionnaire, le ramassage est habituellement prêt le jour même ou le lendemain de la commande.' }
    ]
  }
};

function formatPrice(amount: number, lang: 'en' | 'fr') {
  const isInt = Number.isInteger(amount);
  if (lang === 'fr') {
    const str = isInt ? amount.toString() : amount.toFixed(2);
    const parts = str.split('.');
    const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    if (parts.length > 1) {
      return `${intPart},${parts[1]} $`;
    }
    return `${intPart} $`;
  } else {
    const str = isInt ? amount.toString() : amount.toFixed(2);
    const parts = str.split('.');
    const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts.length > 1) {
      return `$${intPart}.${parts[1]}`;
    }
    return `$${intPart}`;
  }
}

function formatInchesFraction(valInches: number) {
  const eighths = Math.round(valInches * 8);
  const intPart = Math.floor(eighths / 8);
  const rem = eighths % 8;
  const fractions = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'];
  const frac = fractions[rem];

  if (intPart === 0 && rem === 0) return '0';
  if (intPart === 0) return frac;
  if (rem === 0) return String(intPart);
  return `${intPart}${frac}`;
}

function formatLength(valInches: number, unit: 'in' | 'cm', lang: 'en' | 'fr', withUnitSymbol = true) {
  if (unit === 'cm') {
    const cmVal = (valInches * 2.54).toFixed(1);
    if (!withUnitSymbol) return cmVal;
    return `${cmVal} cm`;
  } else {
    const frac = formatInchesFraction(valInches);
    if (!withUnitSymbol) return frac;
    return lang === 'fr' ? `${frac} po` : `${frac}"`;
  }
}

function formatDimension(w: number, h: number, d: number, unit: 'in' | 'cm', lang: 'en' | 'fr') {
  if (unit === 'cm') {
    return `${(w * 2.54).toFixed(1)} × ${(h * 2.54).toFixed(1)} × ${(d * 2.54).toFixed(1)} cm`;
  } else {
    const unitWord = lang === 'fr' ? 'po' : 'in';
    return `${w} × ${h} × ${d} ${unitWord}`;
  }
}

export default function VanityFinderApp({
  onBackToGuides,
  onNavigate,
}: VanityFinderAppProps = {}) {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [widthInput, setWidthInput] = useState('36');
  const [sides, setSides] = useState<'both_walls' | 'one_open' | 'both_open'>('both_walls');
  const [frontInput, setFrontInput] = useState('');
  const [configuration, setConfiguration] = useState<'cabinet' | 'cabinet_top' | 'both'>('both');
  const [colour, setColour] = useState<'white' | 'light_grey' | 'both'>('both');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Comparison State (Select up to 3 items)
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareLimitWarning, setCompareLimitWarning] = useState(false);

  const toggleCompareItem = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        setCompareLimitWarning(true);
        setTimeout(() => setCompareLimitWarning(false), 2800);
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeCompareItem = (id: string) => {
    setSelectedForCompare((prev) => prev.filter((item) => item !== id));
  };

  const dict = I18N[lang];

  // Calculation logic
  const rawW = parseFloat(widthInput);
  const minW = unit === 'in' ? 1 : 3;
  const maxW = unit === 'in' ? 200 : 508;

  const isInvalid = isNaN(rawW) || rawW < minW || rawW > maxW;
  const errorMsg = isInvalid
    ? unit === 'in' ? dict.errorIn : dict.errorCm
    : null;

  const spaceWidthInches = unit === 'in' ? rawW : rawW / 2.54;
  const hasNoResults = !isInvalid && spaceWidthInches < 24 - 0.0001;

  // Matching vanities
  const matching = !isInvalid && !hasNoResults
    ? PRODUCTS.filter(p => p.w <= spaceWidthInches + 0.0001).sort((a, b) => {
        if (b.w !== a.w) return b.w - a.w;
        return PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b);
      })
    : [];

  const rawFront = frontInput.trim() !== '' && !isNaN(parseFloat(frontInput))
    ? parseFloat(frontInput)
    : null;
  const frontInches = rawFront !== null && rawFront > 0
    ? (unit === 'in' ? rawFront : rawFront / 2.54)
    : null;

  const hasExactZeroSpare = matching.some(p => Math.abs(spaceWidthInches - p.w) < 0.001);

  const formattedW = formatLength(spaceWidthInches, unit, lang);
  const titleText = matching.length === 1
    ? (lang === 'fr' ? `1 meuble-lavabo convient à un espace de ${formattedW}` : `1 vanity fits a ${formattedW} space`)
    : (lang === 'fr' ? `${matching.length} meubles-lavabos conviennent à un espace de ${formattedW}` : `${matching.length} vanities fit a ${formattedW} space`);

  const vepPriceFormatted = formatPrice(ACCESSORY_VEP2230.price, lang);
  const vepUrl = lang === 'fr'
    ? ACCESSORY_VEP2230.urlEn.replace('https://www.vanstro.ca/', 'https://www.vanstro.ca/fr/')
    : ACCESSORY_VEP2230.urlEn;

  const handleUnitToggle = (newUnit: 'in' | 'cm') => {
    if (newUnit !== unit) {
      setUnit(newUnit);
      if (!isNaN(rawW) && rawW > 0) {
        if (newUnit === 'cm') {
          setWidthInput((rawW * 2.54).toFixed(1));
        } else {
          setWidthInput((rawW / 2.54).toFixed(1));
        }
      }
    }
  };

  const selectedProductsForCompare = PRODUCTS.filter((p) => selectedForCompare.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1A17] font-sans antialiased selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
      <Navbar
        currentView="vanity-finder"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateToContact={() => onNavigate?.('contact')}
      />

      <main className="max-w-[940px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Top bar with branding & language switcher */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E7E5E0]">
          <span className="font-serif-luxury text-xl tracking-[0.16em] uppercase text-[#1C1A17] font-medium">
            VANSTRO
          </span>
          <div className="inline-flex border border-[#D5D1C7] bg-[#FFFFFF] rounded-xs overflow-hidden" role="group" aria-label="Language selection">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3.5 py-1.5 text-xs font-mono font-semibold transition-colors cursor-pointer ${
                lang === 'en' ? 'bg-[#1C1A17] text-white' : 'text-[#73706B] hover:text-black'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('fr')}
              className={`px-3.5 py-1.5 text-xs font-mono font-semibold transition-colors cursor-pointer ${
                lang === 'fr' ? 'bg-[#1C1A17] text-white' : 'text-[#73706B] hover:text-black'
              }`}
            >
              FR
            </button>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <header className="mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B7A4F] font-semibold block mb-1">
            Architectural Millwork Fitting Guide
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#1C1A17] tracking-tight mb-3 leading-tight">
            {dict.pageTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#73706B] leading-relaxed max-w-2xl font-normal">
            {dict.pageDesc}
          </p>
        </header>

        {/* Error message */}
        {errorMsg && (
          <div role="alert" className="p-4 mb-6 bg-[#FFF5F5] border border-[#FED7D7] text-[#C53030] text-xs font-mono rounded-xs">
            {errorMsg}
          </div>
        )}

        {/* Input Form Card */}
        <form onSubmit={(e) => e.preventDefault()} className="border border-[#E7E5E0] bg-[#FFFFFF] p-6 sm:p-8 mb-12 shadow-xs rounded-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Space width & Units */}
            <div className="space-y-1">
              <label htmlFor="space-width-input" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                {dict.labelWidth}
              </label>
              <span className="block text-xs text-[#73706B] mb-2 leading-relaxed">
                {dict.hintWidth}
              </span>
              <div className="flex items-center gap-3">
                <input
                  id="space-width-input"
                  type="text"
                  required
                  inputMode="decimal"
                  value={widthInput}
                  onChange={(e) => setWidthInput(e.target.value)}
                  placeholder="e.g. 36"
                  className="w-48 px-3.5 py-2.5 text-sm border border-[#D5D1C7] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:border-[#1C1A17] rounded-xs transition-colors"
                />
                <div className="flex items-center gap-4 text-xs font-mono">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="units"
                      value="in"
                      checked={unit === 'in'}
                      onChange={() => handleUnitToggle('in')}
                      className="accent-[#1C1A17]"
                    />
                    <span>{dict.unitIn}</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="units"
                      value="cm"
                      checked={unit === 'cm'}
                      onChange={() => handleUnitToggle('cm')}
                      className="accent-[#1C1A17]"
                    />
                    <span>{dict.unitCm}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Space in front */}
            <div className="space-y-1">
              <label htmlFor="space-front-input" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                {dict.labelFront}
              </label>
              <span className="block text-xs text-[#73706B] mb-2 leading-relaxed">
                {dict.hintFront}
              </span>
              <input
                id="space-front-input"
                type="text"
                inputMode="decimal"
                placeholder=""
                value={frontInput}
                onChange={(e) => setFrontInput(e.target.value)}
                className="w-48 px-3.5 py-2.5 text-sm border border-[#D5D1C7] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:border-[#1C1A17] rounded-xs transition-colors"
              />
            </div>

            {/* Sides */}
            <div className="space-y-1 md:col-span-2 pt-2 border-t border-[#F0EFEA]">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                {dict.labelSides}
              </span>
              <div className="flex flex-wrap gap-5 pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sides"
                    value="both_walls"
                    checked={sides === 'both_walls'}
                    onChange={() => setSides('both_walls')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.sideBothWalls}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sides"
                    value="one_open"
                    checked={sides === 'one_open'}
                    onChange={() => setSides('one_open')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.sideOneOpen}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sides"
                    value="both_open"
                    checked={sides === 'both_open'}
                    onChange={() => setSides('both_open')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.sideBothOpen}</span>
                </label>
              </div>
            </div>

            {/* Configuration */}
            <div className="space-y-1 pt-1">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                {dict.labelConfig}
              </span>
              <div className="flex flex-wrap gap-4 pt-1 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="configuration"
                    value="cabinet"
                    checked={configuration === 'cabinet'}
                    onChange={() => setConfiguration('cabinet')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.configCabinet}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="configuration"
                    value="cabinet_top"
                    checked={configuration === 'cabinet_top'}
                    onChange={() => setConfiguration('cabinet_top')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.configCabinetTop}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="configuration"
                    value="both"
                    checked={configuration === 'both'}
                    onChange={() => setConfiguration('both')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.configBoth}</span>
                </label>
              </div>
            </div>

            {/* Colour */}
            <div className="space-y-1 pt-1">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                {dict.labelColour}
              </span>
              <div className="flex flex-wrap gap-4 pt-1 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="colour"
                    value="white"
                    checked={colour === 'white'}
                    onChange={() => setColour('white')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.colourWhite}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="colour"
                    value="light_grey"
                    checked={colour === 'light_grey'}
                    onChange={() => setColour('light_grey')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.colourGrey}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="colour"
                    value="both"
                    checked={colour === 'both'}
                    onChange={() => setColour('both')}
                    className="accent-[#1C1A17]"
                  />
                  <span>{dict.colourBoth}</span>
                </label>
              </div>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-[#F0EFEA]">
              <button
                type="submit"
                className="px-8 py-3.5 text-xs uppercase font-mono tracking-[0.14em] font-medium text-white bg-[#1C1A17] hover:bg-[#333333] transition-colors cursor-pointer rounded-xs"
              >
                {dict.btnSubmit}
              </button>
            </div>
          </div>
        </form>

        {/* Results with aria-live="polite" */}
        <section aria-live="polite" className="space-y-6">
          {hasNoResults && (
            <div className="p-4 bg-[#FFFFFF] border border-[#E7E5E0] border-l-4 border-l-[#9B7A4F] text-sm text-[#222222] rounded-xs shadow-xs">
              {dict.noResults.includes('Contact us') ? (
                <>
                  The narrowest VanStro vanity is 24&quot; wide.{' '}
                  <a href={dict.contactUrl} target="_blank" rel="noopener" className="underline font-semibold text-[#1C1A17]">
                    Contact us
                  </a>{' '}
                  if you have a question about your space.
                </>
              ) : (
                <>
                  Le meuble-lavabo VanStro le plus étroit mesure 24 po de largeur.{' '}
                  <a href={dict.contactUrl} target="_blank" rel="noopener" className="underline font-semibold text-[#1C1A17]">
                    Communiquez avec nous
                  </a>{' '}
                  si vous avez une question sur votre espace.
                </>
              )}
            </div>
          )}

          {!isInvalid && !hasNoResults && matching.length > 0 && (
            <div className="space-y-5">
              {/* Limit warning banner */}
              {compareLimitWarning && (
                <Alert variant="copper" className="animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-[#9B7A4F]" />
                  <AlertTitle>
                    {lang === 'fr' ? 'Limite de comparaison' : 'Comparison Limit'}
                  </AlertTitle>
                  <AlertDescription>
                    {lang === 'fr'
                      ? 'Vous pouvez comparer jusqu’à 3 modèles de meubles à la fois. Désélectionnez-en un pour en ajouter un autre.'
                      : 'You can compare up to 3 vanity models side-by-side. Deselect one item to add another.'}
                  </AlertDescription>
                </Alert>
              )}

              {/* Results Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-[#1C1A17]">
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#1C1A17] tracking-tight">
                    {titleText}
                  </h3>
                  <p className="text-xs text-[#73706B] font-mono">
                    {lang === 'fr'
                      ? 'Cochez jusqu’à 3 modèles pour comparer leurs dimensions et prix côte à côte.'
                      : 'Check up to 3 items to compare dimensions and prices side-by-side.'}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {selectedForCompare.length > 0 && (
                    <Button
                      variant="copper"
                      size="sm"
                      onClick={() => setIsCompareModalOpen(true)}
                      className="font-mono text-xs uppercase tracking-wider font-semibold h-8"
                    >
                      <Scale className="w-3.5 h-3.5 mr-1" />
                      <span>{lang === 'fr' ? `Comparer (${selectedForCompare.length}/3)` : `Compare (${selectedForCompare.length}/3)`}</span>
                    </Button>
                  )}
                  <span className="font-mono text-xs uppercase text-[#9B7A4F] tracking-widest font-semibold">
                    {matching.length} {lang === 'fr' ? 'Modèles' : 'Models'}
                  </span>
                </div>
              </div>

              {/* Redesigned Luxury Vanity Cards with Comparison Checkbox */}
              <div className="space-y-3.5">
                {matching.map((item) => {
                  const spareInches = Math.max(0, spaceWidthInches - item.w);
                  const isFlush = Math.abs(spareInches) < 0.001;
                  const spareFormatted = formatLength(spareInches, unit, lang);
                  const dimensionsFormatted = formatDimension(item.w, item.h, item.d, unit, lang);
                  const priceCabFormatted = formatPrice(item.priceCab, lang);
                  const priceTopFormatted = formatPrice(item.priceTop, lang);
                  const itemUrl = lang === 'fr'
                    ? item.urlEn.replace('https://www.vanstro.ca/', 'https://www.vanstro.ca/fr/')
                    : item.urlEn;

                  const isSelected = selectedForCompare.includes(item.id);
                  const isMaxSelected = selectedForCompare.length >= 3 && !isSelected;

                  let colourSuffix = '';
                  if (colour === 'white') {
                    colourSuffix = lang === 'fr' ? ' (Blanc)' : ' (White)';
                  } else if (colour === 'light_grey') {
                    colourSuffix = lang === 'fr' ? ' (Gris pâle)' : ' (Light Grey)';
                  }
                  const linkText = dict.viewProduct + colourSuffix;

                  let leavesText = null;
                  if (frontInches !== null) {
                    const clearanceInches = Math.max(0, frontInches - item.d);
                    const formattedClearance = formatLength(clearanceInches, unit, lang);
                    leavesText = lang === 'fr'
                      ? `Il reste ${formattedClearance} devant le meuble.`
                      : `Leaves ${formattedClearance} in front of the vanity.`;
                  }

                  return (
                    <article
                      key={item.id}
                      className={`border p-5 sm:p-6 rounded-xl shadow-xs transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#FAF8F4] border-[#9B7A4F] shadow-sm ring-1 ring-[#9B7A4F]/20'
                          : 'bg-white border-[#E7E5E0] hover:border-[#1C1A17]/40'
                      }`}
                    >
                      {/* Top Row: Model & Actions Slice */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3.5">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-[#9B7A4F] tracking-widest uppercase">
                              {item.id}
                            </span>
                            <span className="text-[#C4C0B6]">·</span>
                            <span className="font-mono text-[11px] text-[#73706B]">
                              {formatLength(item.w, unit, lang)} {lang === 'fr' ? 'Largeur' : 'Width'}
                            </span>
                          </div>
                          <h4 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#1C1A17] leading-snug">
                            {lang === 'fr' ? item.nameFr : item.nameEn}
                          </h4>
                        </div>

                        {/* Top Right Badges & Checkbox Slice */}
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          {/* Comparison Checkbox Button */}
                          <button
                            type="button"
                            onClick={() => toggleCompareItem(item.id)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#1C1A17] text-white border-[#1C1A17] shadow-xs font-semibold'
                                : isMaxSelected
                                ? 'bg-[#FAF9F6] text-[#A09D96] border-[#E7E5E0] opacity-50 cursor-not-allowed'
                                : 'bg-white text-[#5E5A54] border-[#DCD8CF] hover:border-[#1C1A17] hover:text-[#1C1A17]'
                            }`}
                            title={isMaxSelected ? (lang === 'fr' ? 'Maximum de 3 meubles' : 'Maximum 3 items') : ''}
                          >
                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[10px] ${
                              isSelected ? 'border-white bg-[#9B7A4F] text-white font-bold' : 'border-[#B8B3A8] bg-white'
                            }`}>
                              {isSelected && '✓'}
                            </span>
                            <span>
                              {isSelected
                                ? (lang === 'fr' ? 'Sélectionné' : 'Comparing')
                                : (lang === 'fr' ? 'Comparer' : 'Compare')}
                            </span>
                          </button>

                          {/* Room Fit Badge */}
                          <span
                            className={`font-mono text-xs px-3 py-1.5 rounded-lg shrink-0 tracking-wide border ${
                              isFlush
                                ? 'bg-[#EDF4EE] text-[#244A29] border-[#D3E4D5] font-semibold'
                                : 'bg-[#F4F2EE] text-[#55524C] border-[#E5E1D8]'
                            }`}
                          >
                            {spareFormatted} {dict.toSpare}
                          </span>
                        </div>
                      </div>

                      {/* Middle Row: Specs, Pricing, and Action Button */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3.5 border-t border-[#F2EFE9] text-xs sm:text-sm">
                        <div className="flex flex-wrap items-center gap-4 text-[#73706B]">
                          <span className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C8880]">Dim:</span>
                            <span className="font-medium text-[#1C1A17]">{dimensionsFormatted}</span>
                          </span>
                        </div>

                        {/* Pricing Blocks */}
                        <div className="flex flex-wrap items-center gap-5">
                          {(configuration === 'cabinet' || configuration === 'both') && (
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xs text-[#73706B]">{lang === 'fr' ? 'Meuble:' : 'Cabinet:'}</span>
                              <span className="font-mono font-semibold text-[#1C1A17] text-sm sm:text-base">{priceCabFormatted}</span>
                            </div>
                          )}
                          {(configuration === 'cabinet_top' || configuration === 'both') && (
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xs text-[#73706B]">{lang === 'fr' ? 'Avec comptoir:' : 'With Top:'}</span>
                              <span className="font-mono font-semibold text-[#1C1A17] text-sm sm:text-base">{priceTopFormatted}</span>
                            </div>
                          )}
                        </div>

                        {/* View Product Link Button */}
                        <div className="shrink-0">
                          <a
                            href={itemUrl}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase font-mono tracking-wider font-semibold border border-[#1C1A17] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white rounded-md transition-colors whitespace-nowrap"
                          >
                            <span>{linkText}</span>
                            <span>→</span>
                          </a>
                        </div>
                      </div>

                      {/* Front clearance if provided */}
                      {leavesText && (
                        <div className="mt-3 pt-2.5 border-t border-[#F5F3EE] text-xs font-mono text-[#73706B]">
                          <span className="text-[#9B7A4F] mr-1.5">↳</span>
                          {leavesText}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* Side panel hint */}
              {sides === 'one_open' && (
                <div className="p-4 bg-white border border-[#E7E5E0] border-l-4 border-l-[#9B7A4F] text-xs sm:text-sm text-[#222222] rounded-xs shadow-xs">
                  {lang === 'fr' ? (
                    <>
                      Un côté restera apparent. Un panneau de finition (VEP2230, {vepPriceFormatted}) peut le couvrir.{' '}
                      <a href={vepUrl} target="_blank" rel="noopener" className="underline font-semibold text-[#1C1A17]">
                        {dict.viewProduct}
                      </a>
                    </>
                  ) : (
                    <>
                      One side will be exposed. A vanity end panel (VEP2230, {vepPriceFormatted}) can cover it.{' '}
                      <a href={vepUrl} target="_blank" rel="noopener" className="underline font-semibold text-[#1C1A17]">
                        {dict.viewProduct}
                      </a>
                    </>
                  )}
                </div>
              )}

              {sides === 'both_open' && (
                <div className="p-4 bg-white border border-[#E7E5E0] border-l-4 border-l-[#9B7A4F] text-xs sm:text-sm text-[#222222] rounded-xs shadow-xs">
                  {lang === 'fr' ? (
                    <>
                      Les deux côtés resteront apparents. Deux panneaux de finition (VEP2230, {vepPriceFormatted} chacun) peuvent les couvrir.{' '}
                      <a href={vepUrl} target="_blank" rel="noopener" className="underline font-semibold text-[#1C1A17]">
                        {dict.viewProduct}
                      </a>
                    </>
                  ) : (
                    <>
                      Both sides will be exposed. Two vanity end panels (VEP2230, {vepPriceFormatted} each) can cover them.{' '}
                      <a href={vepUrl} target="_blank" rel="noopener" className="underline font-semibold text-[#1C1A17]">
                        {dict.viewProduct}
                      </a>
                    </>
                  )}
                </div>
              )}

              {/* Measure again hint */}
              {sides === 'both_walls' && hasExactZeroSpare && (
                <div className="p-4 bg-[#FFFDF7] border border-[#F6E2B0] border-l-4 border-l-[#D97706] text-xs sm:text-sm text-[#854D0E] rounded-xs shadow-xs">
                  {dict.measureAgain}
                </div>
              )}

              {/* Fixed Notes */}
              <div className="mt-8 p-5 bg-[#F4F2EE] border border-[#E8E5DF] rounded-xs space-y-2 text-xs text-[#5C5852] leading-relaxed">
                <p>{dict.fixedNote1}</p>
                <p>{dict.fixedNote2}</p>
              </div>
            </div>
          )}
        </section>

        {/* 10 Vanity size questions (FAQ) - Architectural 2-Column Luxury Grid */}
        <section className="mt-20 pt-12 border-t border-[#E7E5E0] space-y-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B7A4F] font-semibold block mb-1">
              Knowledge Base
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#1C1A17]">
              {dict.faqTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dict.faqs.map((faq, idx) => {
              const numStr = (idx + 1 < 10 ? '0' : '') + (idx + 1);
              return (
                <article
                  key={idx}
                  className="bg-white border border-[#E7E5E0] hover:border-[#B8B3A8] p-6 rounded-xs shadow-xs transition-colors flex flex-col justify-start"
                >
                  <span className="font-mono text-xs font-semibold text-[#9B7A4F] tracking-widest uppercase mb-2 block">
                    FAQ {numStr}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-[#1C1A17] mb-2 leading-snug">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {faq.a}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* Floating Comparison Drawer / Docked Action Bar */}
      {selectedForCompare.length > 0 && (
        <div
          role="region"
          aria-label="Vanity Comparison Drawer"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl bg-[#181715]/95 backdrop-blur-md text-[#F9F8F6] p-4 rounded-2xl shadow-2xl border border-stone-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300 ring-1 ring-white/10"
        >
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#9B7A4F] text-white tracking-wide shadow-xs shrink-0">
              <Scale className="w-3.5 h-3.5" />
              <span>{selectedForCompare.length} / 3 {lang === 'fr' ? 'Sélectionnés' : 'Selected'}</span>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {selectedForCompare.map((id) => {
                const prod = PRODUCTS.find((p) => p.id === id);
                if (!prod) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-800/90 border border-stone-700 rounded-lg text-xs font-mono text-white shadow-2xs group"
                  >
                    <strong className="text-[#C5A069]">{prod.id}</strong>
                    <span className="text-stone-300">({prod.w}&quot;)</span>
                    <button
                      type="button"
                      onClick={() => removeCompareItem(id)}
                      className="text-stone-400 hover:text-white ml-0.5 cursor-pointer text-xs p-0.5 transition-colors"
                      title={lang === 'fr' ? 'Retirer' : 'Remove'}
                      aria-label={`Remove ${prod.id} from comparison`}
                    >
                      ✕
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedForCompare([])}
              className="text-stone-400 hover:text-white hover:bg-stone-800 text-xs font-mono"
            >
              {lang === 'fr' ? 'Effacer tout' : 'Clear all'}
            </Button>
            <Button
              variant="copper"
              size="sm"
              onClick={() => setIsCompareModalOpen(true)}
              className="font-mono text-xs uppercase tracking-wider font-semibold py-2 px-4 shadow-md active:scale-95 transition-transform"
            >
              <span>{lang === 'fr' ? 'Comparer côte à côte' : 'Compare Side-by-Side'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Side-by-side Vanity Comparison Modal */}
      <VanityComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        items={selectedProductsForCompare}
        unit={unit}
        spaceWidthInches={spaceWidthInches}
        frontInches={frontInches}
        onRemoveItem={removeCompareItem}
        lang={lang}
        configuration={configuration}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

