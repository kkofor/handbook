export interface FinishDetail {
  id: 'veneer' | 'painted' | 'thermofoil' | 'hardware';
  name: string;
  subtitle: string;
  description: string;
  recommendedSolution: string;
  spongeType: string;
  phRange: string;
  wipeTechnique: string;
  moistureLimit: string;
  specNotes: { label: string; value: string }[];
  tailoredDos: string[];
  tailoredDonts: string[];
}

export const FINISH_DETAILS: Record<string, FinishDetail> = {
  veneer: {
    id: 'veneer',
    name: 'Veneer',
    subtitle: 'Quarter-Sawn Natural Oak & Walnut Architectural Veneer',
    description:
      'Natural timber veneer possesses active wood fibers beneath an ultra-matte polyurethane barrier. It requires grain-directional wiping and strict moisture limits to preserve grain clarity.',
    recommendedSolution: '5 drops mild organic Castile soap per 500ml warm demineralized water',
    spongeType: '350+ GSM plush split-microfiber cloth (dampened, never dripping)',
    phRange: 'pH 6.5 – 7.2 (Neutral only)',
    wipeTechnique: 'Follow natural wood grain vectors linearly; never use circular abrasive motions',
    moistureLimit: 'Dry immediately within 30 seconds of surface contact',
    specNotes: [
      { label: 'Surface Sheen', value: '5% Ultra-Matte Dead Flat' },
      { label: 'Core Base', value: 'FSC-Certified Euro Multi-Ply' },
      { label: 'Heat Tolerance', value: 'Max 55°C (131°F) ambient' },
      { label: 'Relative Humidity', value: 'Target 40% – 50% interior RH' },
    ],
    tailoredDos: [
      'Wipe strictly in the direction of the timber grain lines to avoid micro-scratches.',
      'Buff with a secondary bone-dry microfiber cloth immediately after wiping.',
      'Maintain stable indoor humidity (40–50%) to prevent seasonal veneer shifting.',
    ],
    tailoredDonts: [
      'Never allow standing water or dish-towel drips to pool along cabinet bottom edges.',
      'Never apply furniture paste wax, orange oil, silicone polish, or ammonia cleaners.',
      'Avoid placing steam-venting appliances (kettles, rice cookers) directly beneath upper cabinet light rails.',
    ],
  },
  painted: {
    id: 'painted',
    name: 'Painted',
    subtitle: 'Multi-Coat Satin Lacquer & Polyurethane Enamel',
    description:
      'Factory-cured solvent lacquer finish offering a silky, non-porous skin. Highly resilient against daily oil transference but sensitive to solvent abrasives and acidic citrus residues.',
    recommendedSolution: 'Dilute 1 tsp mild surfactant dish wash in 1L warm distilled water',
    spongeType: 'Ultra-soft waffle-weave microfiber or cellulose sponge',
    phRange: 'pH 7.0 – 7.5',
    wipeTechnique: 'Gentle horizontal strokes followed by light dry buffing',
    moistureLimit: 'Absorb standing drips within 60 seconds',
    specNotes: [
      { label: 'Coating Type', value: '2K Catalyzed Polyurethane' },
      { label: 'Pencil Hardness', value: '2H Scratch Resistance' },
      { label: 'UV Resistance', value: 'Non-yellowing UV inhibitor primed' },
      { label: 'Stain Resistance', value: 'Coffee, wine, mustard tested 24h' },
    ],
    tailoredDos: [
      'Clean grease splatters near stovetops immediately using lukewarm soapy water.',
      'Use light, featherweight pressure when wiping dark or matte satin pigments.',
      'Test any specialized spot cleaner on the interior edge of a lower base drawer first.',
    ],
    tailoredDonts: [
      'Never use melamine foam magic erasers; they act as 3000-grit micro-sandpaper on lacquer.',
      'Do not use alcohol-based glass cleaners, bleach, or degreasers with caustic solvents.',
      'Avoid hanging wet fabric dish towels over painted shaker rails or drawer fronts.',
    ],
  },
  thermofoil: {
    id: 'thermofoil',
    name: 'Thermofoil',
    subtitle: 'Seamless Vacuum-Formed Architectural Engineered Polymer',
    description:
      'A continuous, impervious membrane wrapped over precision-machined MDF cores. Extreme moisture resistance, but requires thermal shields near ovens and dishwashers.',
    recommendedSolution: 'Mild neutral soap and warm water or 50/50 water & white distilled vinegar',
    spongeType: 'Soft non-abrasive microfiber towel or damp chamois',
    phRange: 'pH 6.0 – 8.0',
    wipeTechnique: 'Broad smooth wiping passes; dry with lint-free cotton cloth',
    moistureLimit: 'High surface moisture tolerance, but protect substrate rear edges',
    specNotes: [
      { label: 'Membrane Core', value: 'High-Density Medite II MDF' },
      { label: 'Bond Type', value: 'Heat-Activated Polyurethane PUR Glue' },
      { label: 'Heat Deflector', value: 'Required within 50mm of self-clean ovens' },
      { label: 'Antimicrobial', value: 'Sealed non-porous bacterial barrier' },
    ],
    tailoredDos: [
      'Install heat deflector strips along cabinet doors adjacent to high-heat ovens.',
      'Rinse with clear water and dry thoroughly if vinegar solution is used.',
      'Keep dishwasher steam vents shielded during high-temperature drying cycles.',
    ],
    tailoredDonts: [
      'Never place countertop toaster ovens or air fryers directly touching cabinet sides.',
      'Do not clean with acetone, mineral spirits, nail polish remover, or paint thinner.',
      'Avoid stiff scrub brushes or scouring pads that can dull the matte polymer finish.',
    ],
  },
  hardware: {
    id: 'hardware',
    name: 'Hardware',
    subtitle: 'Solid Satin Brass, Bronze Pulls & Concealed Soft-Close Hinges',
    description:
      'Precision machined architectural hardware including solid unlacquered living brass, blackened bronze, and German-engineered soft-close hinges with integrated hydraulic dampers.',
    recommendedSolution: 'Warm damp microfiber followed immediately by dry polishing cloth',
    spongeType: 'Optical-grade microfiber cloth or soft jeweler chamois',
    phRange: 'pH 7.0 (Pure water only)',
    wipeTechnique: 'Light circular motion on pulls; do not spray liquids into hinge arms',
    moistureLimit: 'Immediate dry wiping — zero liquid intrusion into moving hinge parts',
    specNotes: [
      { label: 'Pull Material', value: 'Solid Machined Forged Brass' },
      { label: 'Hinge Mechanism', value: 'Clip-top 110° Blumotion Integrated' },
      { label: 'Living Finish', value: 'Develops authentic antique patina over time' },
      { label: 'Adjustment', value: '3-Way cam eccentric screw leveling' },
    ],
    tailoredDos: [
      'Dust pulls regularly with a dry plush microfiber cloth to remove skin acidity.',
      'Let unlacquered living brass develop its natural warm bronze patina gracefully.',
      'Re-tighten mounting machine screws with a manual #2 Pozidriv screwdriver annually.',
    ],
    tailoredDonts: [
      'Never spray household glass cleaners or aerosols directly onto cabinet handles.',
      'Never use brass chemical polishes (Brasso, Bar Keepers Friend) on living brass finishes.',
      'Do not lubricate soft-close hinges with WD-40 or silicone sprays (ruins internal silicone dampers).',
    ],
  },
};

export const QUICK_RULES = [
  {
    id: 'wipe-spills',
    title: 'Wipe Spills',
    action: 'Within 30 Seconds',
    description:
      'Liquids must be blotted immediately along natural wood grain before capillary pooling can penetrate joinery seams.',
    detail: 'Never let grease, coffee, or citrus juices sit overnight.',
  },
  {
    id: 'soft-microfiber',
    title: 'Soft Microfiber',
    action: '300+ GSM Cloths Only',
    description:
      'Use clean, dedicated split-fiber cloths. Discard cloths that touched countertops to avoid grit scratches.',
    detail: 'Never use paper towels, scourers, or terrycloth.',
  },
  {
    id: 'mild-ph-soap',
    title: 'Mild pH Soap',
    action: 'Neutral pH 7 Dilution',
    description:
      'Dilute 5 drops of gentle plant-derived soap into warm water. Avoid ammonia, bleach, and abrasive cream cleansers.',
    detail: 'Rinse with damp cloth, then buff dry with clean linen.',
  },
];

export const CHECKLIST_ITEMS = [
  { id: '1', period: 'Daily', task: 'Blot water splashes around sink base and dishwasher door frames immediately' },
  { id: '2', period: 'Daily', task: 'Wipe grease mist from rangehood cabinet returns using warm water & castile soap' },
  { id: '3', period: 'Weekly', task: 'Inspect lower kickboards and base cabinet edges for unnoticed standing moisture' },
  { id: '4', period: 'Weekly', task: 'Dust cabinet crown moldings and open shelving with an electro-static microfiber duster' },
  { id: '5', period: 'Monthly', task: 'Gently buff cabinet hardware pulls with a dry microfiber cloth to remove finger oils' },
  { id: '6', period: 'Quarterly', task: 'Verify Blum soft-close hinges are closing smoothly; re-align drawer fronts with cam screws' },
  { id: '7', period: 'Seasonal', task: 'Check indoor relative humidity gauge (aim for stable 40%–50% to prevent wood movement)' },
  { id: '8', period: 'Annual', task: 'Hand-tighten handle fasteners using a manual screwdriver (never use power drills)' },
];
