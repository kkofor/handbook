export interface GuideTOCItem {
  id: string;
  num: string;
  title: string;
}

export interface GuideQuickRule {
  id: string;
  title: string;
  label: string;
  body: string;
  note: string;
  icon: string;
}

export interface GuideSpecItem {
  label: string;
  value: string;
}

export interface GuideTabItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  specs: GuideSpecItem[];
  primaryNote: {
    label: string;
    text: string;
  };
  techniqueNote: {
    label: string;
    text: string;
  };
}

export interface GuidePlateItem {
  figure: string;
  title: string;
  caption: string;
  image: string;
  material: string;
}

export interface GuideChecklistItem {
  id: string;
  period: string;
  task: string;
}

export interface VanStroGuideData {
  slug: string;
  category: string;
  readTime: string;
  standardRef: string;
  title: string;
  subtitle: string;
  heroImage: string;
  toc: GuideTOCItem[];
  quickRules: GuideQuickRule[];
  tabsLabel?: string;
  tabs?: GuideTabItem[];
  dosAndDonts: {
    doTitle: string;
    doIntro: string;
    dos: string[];
    doFooter: string;
    doImage: string;
    doBadge: string;
    dontTitle: string;
    dontIntro: string;
    donts: string[];
    dontFooter: string;
    dontImage: string;
    dontBadge: string;
  };
  technicalSection: {
    num: string;
    title: string;
    subtitle: string;
    description: string;
    tableHeaders: string[];
    tableRows: { col1: string; col2: string; col3: string; col4: string }[];
    calloutTitle: string;
    calloutText: string;
  };
  plates: GuidePlateItem[];
  banner: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
  };
  checklist: {
    title: string;
    docRef: string;
    tasks: GuideChecklistItem[];
    note: string;
  };
}

export const VANSTRO_GUIDES: Record<string, VanStroGuideData> = {
  // 1. Cabinet Care Handbook
  'cabinet-care': {
    slug: 'cabinet-care',
    category: 'CARE GUIDE',
    readTime: '4 MIN READ',
    standardRef: 'VANSTRO CARE §4.2',
    title: 'How to Clean Kitchen Cabinets',
    subtitle:
      'How to clean PVC soft-touch doors, melamine-faced cabinet boxes and paint-ready trim without treating them like wood furniture.',
    heroImage: '/assets/guides/guide-care.webp',
    toc: [
      { id: 'daily-rules', num: '01', title: 'Daily & Weekly Cleaning' },
      { id: 'material-care', num: '02', title: 'Material Care Specifications' },
      { id: 'dos-donts', num: '03', title: "What to Avoid (Do's & Don'ts)" },
      { id: 'hardware-care', num: '04', title: 'Hardware & Mechanical Standards' },
      { id: 'care-checklist', num: '05', title: 'On-Site Care Checklist' },
    ],
    quickRules: [
      {
        id: 'wipe',
        title: 'Wipe Lightly',
        label: 'Everyday Cleaning',
        body: 'Use a soft, slightly damp microfiber cloth on PVC soft-touch door faces and melamine-finished interiors.',
        note: 'Both finishes are factory heat-sealed.',
        icon: '💧',
      },
      {
        id: 'dry',
        title: 'Dry Immediately',
        label: 'Straight After',
        body: 'Dry the surface afterward with a second, clean dry microfiber cloth to prevent moisture penetration.',
        note: 'Never allow liquids to sit unattended.',
        icon: '✨',
      },
      {
        id: 'no-air-dry',
        title: 'Do Not Air-Dry',
        label: 'Edges & Seams',
        body: 'Do not let moisture air-dry along door edges, lower shaker rails, or drawer-box seams where finished panels meet.',
        note: 'Protect factory hot-melt edge seams.',
        icon: '🛡️',
      },
    ],
    tabsLabel: 'Select Cabinet Component',
    tabs: [
      {
        id: 'pvc-door',
        name: 'PVC Soft-Touch Door',
        subtitle: 'PVC Matte Soft-Touch over ¾" MDF Thermofoil in Shaker Style',
        description:
          'Factory-sealed non-porous exterior membrane wrapped continuously around precision-profiled MDF. Resistant to daily cooking moisture, but sensitive to solvent abrasives.',
        specs: [
          { label: 'Surface Finish', value: 'PVC Matte Soft-Touch' },
          { label: 'Core Base', value: '¾" High-Density MDF' },
          { label: 'Profile Style', value: 'Recessed Shaker' },
          { label: 'Surface Seal', value: 'Factory Heat-Sealed' },
        ],
        primaryNote: {
          label: 'Recommended Cleaning Solution',
          text: 'Lukewarm water with 2-3 drops mild neutral dish soap, applied to the cloth first.',
        },
        techniqueNote: {
          label: 'Application Vector',
          text: 'Wipe along shaker recessed rails. Immediately dry with a second clean microfiber cloth.',
        },
      },
      {
        id: 'cabinet-box',
        name: 'Cabinet Box',
        subtitle: '¾" Plywood Cabinet Box with Double-Sided Sealed Melamine',
        description:
          'Rigid European frameless cabinet box architecture. Melamine interiors provide durable scratch resistance and water repellency under heavy cookware.',
        specs: [
          { label: 'Box Construction', value: '¾" Multi-Ply Core' },
          { label: 'Panel Face', value: 'Double-Sided Melamine' },
          { label: 'Interior Shelves', value: 'Cabinet-Grade Plywood' },
          { label: 'Edge Protection', value: 'Factory Hot-Melt Sealing' },
        ],
        primaryNote: {
          label: 'Interior Care',
          text: 'A soft, barely damp cloth. A light wipe removes seasoning dust and oil residue.',
        },
        techniqueNote: {
          label: 'Seam Protection',
          text: 'Dry thoroughly along bottom corner joints and shelf support pins.',
        },
      },
      {
        id: 'drawer-box',
        name: 'Drawer Box',
        subtitle: '⅝" Plywood Drawer Box with Melamine Interior',
        description:
          'Heavy-duty ⅝" plywood side panels built to handle kitchen cutlery and pantry dry goods while gliding on concealed under-mount slides.',
        specs: [
          { label: 'Drawer Substrate', value: '⅝" Cabinet Plywood' },
          { label: 'Interior Finish', value: 'Wipeable Melamine' },
          { label: 'Joinery Type', value: 'Precision Interlocking' },
          { label: 'Slide Type', value: 'Under-Mount Soft-Close' },
        ],
        primaryNote: {
          label: 'Drawer Maintenance',
          text: 'Vacuum crumbs using a soft brush attachment, then wipe with damp microfiber.',
        },
        techniqueNote: {
          label: 'Slide Care',
          text: 'Keep crumbs and liquid seasonings out of the concealed under-mount steel tracks.',
        },
      },
      {
        id: 'hardware',
        name: 'DTC Hardware',
        subtitle: 'DTC 6-Way Adjustable Soft-Close Concealed Hinges & Slides',
        description:
          'Precision nickel-plated cold-rolled steel hinges featuring integrated hydraulic damping chambers for quiet, controlled cabinet door closure.',
        specs: [
          { label: 'Hinge Type', value: 'DTC Clip-On Concealed' },
          { label: 'Damping', value: 'Integrated Hydraulic Soft-Close' },
          { label: 'Adjustment', value: '3D Spiral Cam Screws' },
          { label: 'Lubrication', value: 'Permanently Sealed at Factory' },
        ],
        primaryNote: {
          label: 'Hardware Cleaning',
          text: 'Dry or barely damp cloth only. Never spray liquids directly into the hinge cup.',
        },
        techniqueNote: {
          label: 'Lubrication Warning',
          text: 'Never use WD-40 or silicone sprays. Household degreasers wash out factory silicone dampers.',
        },
      },
    ],
    dosAndDonts: {
      doTitle: 'Daily Care Routine',
      doIntro: 'Follow these verified practices to preserve finish depth and hinge longevity:',
      dos: [
        'Use a soft, slightly damp cloth on the PVC soft-touch door faces and melamine box interiors.',
        'Dry the surface afterward with a second, clean dry microfiber cloth.',
        'Apply cleaning liquid to the cloth first so liquid never pools in seams or toe kick channels.',
        'Wipe visible hinge arms and drawer slide steel with a dry or barely damp cloth only.',
      ],
      doFooter: 'Following the cleaning guidance above protects the finish day to day under normal residential use.',
      doImage: '/assets/guides/handbook/hb-do-wipe.webp',
      doBadge: 'DO',
      dontTitle: 'What to Avoid',
      dontIntro: 'Avoid these abrasive practices (refer to /warranty/ for coverage exclusions):',
      donts: [
        'Avoid abrasive scouring pads, magic erasers, and solvent-based chemical degreasers.',
        'Do not spray cleaner or water directly onto cabinet doors or joint seams.',
        'Avoid household cooking grease, aerosol cooking sprays, or degreasers on soft-close dampers.',
        'Do not wipe unfinished or primed trim pieces with a wet cloth before paint or primer is applied.',
      ],
      dontFooter: 'Abrasive cleaning will micro-scratch the matte soft-touch finish and create shiny polished patches.',
      dontImage: '/assets/guides/handbook/hb-dont-water.webp',
      dontBadge: 'DON’T',
    },
    technicalSection: {
      num: '04',
      title: 'Hardware & Mechanical Specifications',
      subtitle: 'DTC Clip-On Concealed Mechanical Standards',
      description:
        'VanStro cabinets use DTC hinges and drawer slides that feature 6-way adjustability (height, depth, and lateral reveal) to achieve uniform door spacing.',
      tableHeaders: ['Component', 'Adjustment Range', 'Recommended Tool', 'Maintenance Cycle'],
      tableRows: [
        { col1: 'Hinge Cup Cam (Side-to-Side)', col2: 'Lateral reveal alignment', col3: '#2 Pozi / Phillips Manual', col4: 'Every 12 Months' },
        { col1: 'Base Plate Screw (Vertical)', col2: 'Vertical height positioning', col3: '#2 Phillips Hand Driver', col4: 'At Final Installation' },
        { col1: 'Depth Cam (In/Out Reveal)', col2: 'In/out depth adjustment', col3: '#2 Phillips Hand Driver', col4: 'As Settling Occurs' },
        { col1: 'Drawer Front Tilt & Level', col2: 'Tilt and level adjustment', col3: 'Under-Mount Lever Wheel', col4: 'Quarterly Check' },
      ],
      calloutTitle: 'Why Proper Hinge Cleaning Matters:',
      calloutText:
        'Aerosol degreasers and vinegar sprays break down the internal silicone oil within the soft-close cylinder, resulting in loud door slamming. Wipe metal with dry microfiber only.',
    },
    plates: [
      {
        figure: 'FIG. 01',
        title: 'PVC Soft-Touch Door Face',
        caption: 'PVC Matte Soft-Touch over ¾" MDF thermofoil in recessed Shaker profile, in White.',
        image: '/assets/guides/handbook/hb-door-white.webp',
        material: 'PVC Soft-Touch',
      },
      {
        figure: 'FIG. 02',
        title: '¾" Plywood Melamine Box',
        caption: 'Rigid multi-ply cabinet box with factory hot-melt edgebanding and melamine surfaces.',
        image: '/assets/guides/handbook/hb-box-plywood.webp',
        material: 'Plywood & Melamine',
      },
      {
        figure: 'FIG. 03',
        title: 'DTC Concealed Soft-Close Hinge',
        caption: 'Clip-on cold-rolled steel hinge with integrated hydraulic deceleration piston.',
        image: '/assets/guides/handbook/hb-hinge.webp',
        material: 'DTC Hardware',
      },
    ],
    banner: {
      kicker: 'Printable Care Guide',
      title: 'The same care steps, on one printable checklist',
      body: 'Wipe, dry and avoid — the complete care routine for doors, cabinet boxes, and mechanical hardware.',
      cta: 'Download Care Checklist PDF',
    },
    checklist: {
      title: 'Cabinet & Vanity Care Checklist',
      docRef: 'VS-CARE-2026',
      tasks: [
        { id: 'c1', period: 'Daily', task: 'Wipe PVC soft-touch door faces with a soft, slightly damp cloth.' },
        { id: 'c2', period: 'Daily', task: 'Wipe melamine-finished box and drawer interiors.' },
        { id: 'c3', period: 'Every Wipe', task: 'Dry the surface immediately with a second, clean dry cloth.' },
        { id: 'c4', period: 'As Needed', task: 'Apply cleaner to cloth first, never directly onto cabinet faces.' },
        { id: 'c5', period: 'Hardware', task: 'Wipe visible hinge arms and drawer slides with dry microfiber.' },
        { id: 'c6', period: 'Before Paint', task: 'Keep paint-ready trim dry; do not wipe with wet cloth before primer.' },
      ],
      note: 'Following these cleaning practices protects your cabinet finish day-to-day. Refer to the VanStro 12-month limited warranty for full residential terms.',
    },
  },

  // 2. Measuring for Cabinets
  'how-to-measure-for-cabinets': {
    slug: 'how-to-measure-for-cabinets',
    category: 'PLANNING GUIDE',
    readTime: '6 MIN READ',
    standardRef: 'VANSTRO PLAN §2.4',
    title: 'Measuring for Cabinets',
    subtitle:
      'Cabinet widths, heights, clearances and fillers. Step-by-step VanStro guidance for planning, ordering and installing your cabinets.',
    heroImage: '/assets/guides/guide-measure.webp',
    toc: [
      { id: 'tools-prep', num: '01', title: 'Essential Tools & Preparation' },
      { id: 'wall-fillers', num: '02', title: 'Wall Measurements & Fillers' },
      { id: 'heights-ceilings', num: '03', title: 'Heights & Ceiling Leveling' },
      { id: 'doors-windows', num: '04', title: 'Doors, Windows & Trim Clearances' },
      { id: 'utilities-lines', num: '05', title: 'Utilities & Plumbing Centerlines' },
    ],
    quickRules: [
      {
        id: 'tape',
        title: '25ft+ Rigid Tape',
        label: 'Primary Measurement',
        body: 'Use a locking steel tape measure with a wide, non-sagging blade for true corner-to-corner accuracy.',
        note: 'Measure twice at base and eye levels.',
        icon: '📏',
      },
      {
        id: 'graph',
        title: 'Floor Plan Sketch',
        label: 'Bird’s-Eye Grid',
        body: 'Draw an outline of the entire room showing every corner, opening, and plumbing pipe chase.',
        note: 'Scale: ¼" = 1 foot recommended.',
        icon: '📐',
      },
      {
        id: 'fillers',
        title: 'Calculate Fillers',
        label: 'Fixed Sizing Rule',
        body: 'VanStro cabinets come in fixed published widths. Subtract total cabinet run from wall length to size fillers.',
        note: 'Standard 3" (WF330) & 6" (WF630) fillers.',
        icon: '🧩',
      },
    ],
    tabsLabel: 'Measurement Focus Areas',
    tabs: [
      {
        id: 'wall-runs',
        name: 'Wall Runs & Fillers',
        subtitle: 'Computing Wall Gaps and Scribing Allowances',
        description:
          'Because walls are never perfectly plumb or exact multiples of cabinet widths, standard architectural fillers are required to absorb dimensional variances.',
        specs: [
          { label: 'Modular Widths', value: '24", 27", 30", 36", 42", 48"' },
          { label: 'Standard Fillers', value: '3" (WF330), 6" (WF630)' },
          { label: 'Minimum Gap', value: '1½" per corner run' },
          { label: 'Scribing Line', value: 'Cut on-site to wall contour' },
        ],
        primaryNote: {
          label: 'Filler Formula',
          text: 'Remaining Gap = Total Wall Length − ∑(Cabinet Widths). Split evenly across both end walls.',
        },
        techniqueNote: {
          label: 'Corner Tolerance',
          text: 'Check if walls meet at true 90°. Use a 3-4-5 framing triangle to detect out-of-square walls.',
        },
      },
      {
        id: 'heights',
        name: 'Ceilings & Heights',
        subtitle: 'Rule of 3: Detecting Floor and Ceiling Slope',
        description:
          'Ceilings in Canadian homes settle over seasons. The lowest ceiling height establishes the maximum datum elevation for tall pantry towers and upper wall units.',
        specs: [
          { label: 'Base Cabinet Height', value: '34½" (36" with stone)' },
          { label: 'Upper Wall Heights', value: '30", 36", 42"' },
          { label: 'Countertop Clearance', value: '18" between base & upper' },
          { label: 'Crown Moulding Gap', value: 'Leave 2"–3" at ceiling' },
        ],
        primaryNote: {
          label: 'Benchmark Datum',
          text: 'Locate the highest spot on the floor along the cabinet run. Set your base cabinet level from this high point.',
        },
        techniqueNote: {
          label: 'Soffit Check',
          text: 'Measure underside of drywalled bulkheads in multiple spots to verify level clearance.',
        },
      },
      {
        id: 'casing-openings',
        name: 'Trim & Casings',
        subtitle: 'Door Swings and Window Sill Offsets',
        description:
          'Always measure to the outermost edge of window and door casings. Cabinet doors and pull handles require clearance to open 90° without striking trim.',
        specs: [
          { label: 'Window Sill Min', value: '38" above finished floor' },
          { label: 'Casing Offset', value: 'Minimum 3" filler clearance' },
          { label: 'Countertop Overhang', value: '1½" standard edge' },
          { label: 'Door Swing Radius', value: 'Check 90° handle clearance' },
        ],
        primaryNote: {
          label: 'Trim Measurement',
          text: 'Include the full profile of decorative mouldings. Never measure glass or jamb only.',
        },
        techniqueNote: {
          label: 'Appliance Path',
          text: 'Ensure doorway width allows 36" refrigerators and range units to pass through during delivery.',
        },
      },
    ],
    dosAndDonts: {
      doTitle: 'Measuring Best Practices',
      doIntro: 'Follow these verification steps before ordering cabinetry modules:',
      dos: [
        'Measure every wall corner-to-corner along the baseboard and at 36" countertop working height.',
        'Measure floor-to-ceiling in at least 3 distinct spots across the run to detect slope.',
        'Mark the exact centerline of plumbing drain and water shutoffs from the nearest corner.',
        'Provide high-resolution photos of all wall elevations to your VanStro dealer for layout review.',
      ],
      doFooter: 'Accurate field measurements eliminate on-site cabinet cutting delays.',
      doImage: '/assets/dealers/kitchen-scene.webp',
      doBadge: 'DO',
      dontTitle: 'Common Field Mistakes',
      dontIntro: 'Avoid these critical measuring oversights:',
      donts: [
        'Do not assume drywall corners are perfectly 90° square without checking with a square.',
        'Never measure only to the inside jamb of a doorway or window — always measure to outer trim edge.',
        'Do not forget to account for baseboard heaters, floor registers, or electrical outlet box heights.',
        'Avoid planning cabinets without at least 1½" to 3" of filler adjacent to intersecting walls.',
      ],
      dontFooter: 'Cabinets ordered without adequate filler clearance cannot open doors fully against walls.',
      dontImage: '/assets/guides/handbook/hb-dont-water.webp',
      dontBadge: 'DON’T',
    },
    technicalSection: {
      num: '05',
      title: 'Modular Dimension & Clearance Matrix',
      subtitle: 'Standard Architectural Kitchen Clearances',
      description:
        'Standard imperial modular increments used across all VanStro base, wall, and tall pantry cabinetry lines.',
      tableHeaders: ['Cabinet Category', 'Standard Widths', 'Standard Depth', 'Recommended Clearance'],
      tableRows: [
        { col1: 'Base Cabinets (B)', col2: '12", 15", 18", 21", 24", 27", 30", 36"', col3: '24" Box (24¾" with door)', col4: '36" minimum walkway aisle' },
        { col1: 'Sink Bases (SB)', col2: '30", 36", 42"', col3: '24" Deep', col4: 'Plumbing CL within middle 18"' },
        { col1: 'Wall Cabinets (W)', col2: '12", 15", 18", 24", 30", 36"', col3: '12" Deep Box', col4: '18" above finished countertop' },
        { col1: 'Tall Pantries (TP)', col2: '18", 24", 30"', col3: '24" Deep Box', col4: '2"–3" ceiling crown margin' },
      ],
      calloutTitle: 'VanStro Sizing Standard:',
      calloutText:
        'All VanStro cabinets are modular imperial units. When your wall run leaves an odd remainder, order a 3" (WF330) or 6" (WF630) filler strip to scribe on site.',
    },
    plates: [
      {
        figure: 'FIG. 01',
        title: 'Architectural Blueprint Layout',
        caption: 'Top-down plan view detailing wall runs, island clearances, and traffic pathways.',
        image: '/assets/guides/guide-measure.webp',
        material: 'Floor Plan Draft',
      },
      {
        figure: 'FIG. 02',
        title: 'Filler Strip Scribing',
        caption: '3" and 6" matching filler panels scribed flush against irregular wall framing.',
        image: '/assets/guides/handbook/hb-trim.webp',
        material: 'Modular Fillers',
      },
      {
        figure: 'FIG. 03',
        title: 'Installed Continuous Run',
        caption: 'Seamless horizontal reveal lines achieved with proper base leveling from high point.',
        image: '/assets/guides/handbook/hb-door-white.webp',
        material: 'Bespoke Millwork',
      },
    ],
    banner: {
      kicker: 'Field Measurement Worksheet',
      title: 'Download the Printable Room Measurement Grid & Worksheet',
      body: 'Step-by-step room sketch grid, filler scribing checklists, and appliance centerline worksheets ready for your job site.',
      cta: 'Download Measurement Grid PDF',
    },
    checklist: {
      title: 'Room Measurement & Clearance Sheet',
      docRef: 'VS-MEASURE-2026',
      tasks: [
        { id: 'm1', period: 'Phase 1', task: 'Measured total wall length along floor and at 36" countertop line.' },
        { id: 'm2', period: 'Phase 1', task: 'Checked floor-to-ceiling height in 3 distinct spots (left, center, right).' },
        { id: 'm3', period: 'Phase 2', task: 'Measured all window and door openings from outer edge of trim/casing.' },
        { id: 'm4', period: 'Phase 2', task: 'Marked exact centerline of sink drain and water supply lines from nearest corner.' },
        { id: 'm5', period: 'Phase 3', task: 'Marked 240V range outlet / gas pipe centerline and range hood exhaust duct location.' },
        { id: 'm6', period: 'Phase 3', task: 'Summed cabinet modular widths and calculated required 3" or 6" wall fillers.' },
      ],
      note: 'Provide your completed measurement worksheet to an authorized VanStro dealer for 3D layout verification.',
    },
  },

  // 3. Cabinet Adjustment Guide
  'cabinet-adjustment': {
    slug: 'cabinet-adjustment',
    category: 'HARDWARE & ADJUSTMENT',
    readTime: '4 MIN READ',
    standardRef: 'VANSTRO MECH §3.1',
    title: 'How to Adjust Cabinet Doors & Drawers',
    subtitle:
      'When to adjust a cabinet door or drawer, what to check first, and practical steps for DTC 6-way adjustable soft-close hinges and drawer slides.',
    heroImage: '/assets/guides/guide-adjustment.webp',
    toc: [
      { id: 'first-check', num: '01', title: 'What to Check Before Adjusting' },
      { id: 'hinge-cams', num: '02', title: 'DTC 6-Way Adjustable Hinge Tuning' },
      { id: 'dos-donts', num: '03', title: "Adjustment Do's & Don'ts" },
      { id: 'drawer-slides', num: '04', title: 'Under-Mount Drawer Slide Leveling' },
      { id: 'adjust-checklist', num: '05', title: 'Alignment Verification Checklist' },
    ],
    quickRules: [
      {
        id: 'level-first',
        title: 'Check Level First',
        label: 'Pre-Adjustment',
        body: 'A door that appears misaligned is often the result of the cabinet box racking, not the hinge. Confirm the box is plumb and level.',
        note: 'Loosening shims fixes 80% of door sag.',
        icon: '⚖️',
      },
      {
        id: 'manual-driver',
        title: 'Manual Tools Only',
        label: 'Tool Discipline',
        body: 'Always use a manual #2 Phillips or Pozidriv screwdriver. Never use high-RPM cordless impact drivers on adjustment cams.',
        note: 'Impact drivers strip adjustment threads.',
        icon: '🪛',
      },
      {
        id: 'quarter-turn',
        title: 'Quarter-Turn Shifts',
        label: 'Micro-Adjusting',
        body: 'Turn adjustment screws in small ¼-turn increments, then close the door to verify the visual reveal line before turning further.',
        note: 'Small turns create precise reveals.',
        icon: '🔄',
      },
    ],
    tabsLabel: 'Mechanism Adjustment Mode',
    tabs: [
      {
        id: 'side-cam',
        name: 'Side-to-Side (Lateral)',
        subtitle: 'Front Spiral Cam Screw — Door Margin Alignment',
        description:
          'Adjusts the horizontal reveal gap between two adjoining doors. Turning clockwise shifts the door inward; counter-clockwise shifts it outward.',
        specs: [
          { label: 'Target Reveal', value: 'Uniform door margin' },
          { label: 'Adjustment Feature', value: 'Lateral travel adjustment' },
          { label: 'Cam Location', value: 'Front screw on hinge arm' },
          { label: 'Screw Profile', value: '#2 Phillips / Pozidriv' },
        ],
        primaryNote: {
          label: 'Even Alignment',
          text: 'Adjust both top and bottom hinges equally to shift the entire door sideways without creating tilt.',
        },
        techniqueNote: {
          label: 'Symptom Resolved',
          text: 'Fixes doors that rub against each other when closing or have an uneven V-shaped center gap.',
        },
      },
      {
        id: 'depth-cam',
        name: 'In-and-Out (Depth)',
        subtitle: 'Rear Cam Screw — Door Face Flushness with Frame',
        description:
          'Controls how close the door sits against the cabinet box face. Eliminates door rattle and ensures the soft-close bumper contacts cleanly.',
        specs: [
          { label: 'Target Flushness', value: 'Flush reveal' },
          { label: 'Adjustment Feature', value: 'Depth in/out adjustment' },
          { label: 'Cam Location', value: 'Rear eccentric screw' },
          { label: 'Bumper Contact', value: 'Light contact on felt pad' },
        ],
        primaryNote: {
          label: 'Depth Equalization',
          text: 'Ensure the top and bottom corners of the door rest flush with the cabinet box when fully shut.',
        },
        techniqueNote: {
          label: 'Symptom Resolved',
          text: 'Fixes doors that stick out past adjacent drawer fronts or doors that pop open slightly.',
        },
      },
      {
        id: 'vertical-cam',
        name: 'Up-and-Down (Height)',
        subtitle: 'Mounting Plate Screws — Horizontal Reveal Alignment',
        description:
          'Loosen the two mounting plate screws slightly to slide the door vertically, aligning its top and bottom rails with adjacent cabinets.',
        specs: [
          { label: 'Vertical Feature', value: 'Vertical height adjustment' },
          { label: 'Screw Type', value: 'Top/bottom plate fasteners' },
          { label: 'Datum Alignment', value: 'Match horizontal shaker rail' },
          { label: 'Tightening', value: 'Firm hand torque' },
        ],
        primaryNote: {
          label: 'Weight Support',
          text: 'Support the bottom weight of the door with your knee or hand while adjusting vertical screws.',
        },
        techniqueNote: {
          label: 'Symptom Resolved',
          text: 'Fixes doors where the top edge sits lower or higher than the neighbouring cabinet.',
        },
      },
    ],
    dosAndDonts: {
      doTitle: 'Hinge Adjustment Rules',
      doIntro: 'Follow these proven steps for aligned cabinet reveal lines:',
      dos: [
        'Check that the cabinet box is anchored plumb and level to wall studs before touching hinges.',
        'Use a manual handheld #2 Phillips or Pozidriv screwdriver with a clean, unstripped bit.',
        'Adjust in small ¼-turn increments, testing the door swing after every micro-adjustment.',
        'Wipe any grease or sawdust off the hinge arm with a dry, clean microfiber cloth.',
      ],
      doFooter: 'Properly adjusted hinges prevent edge-rubbing and protect factory soft-touch door edges.',
      doImage: '/assets/guides/handbook/hb-hinge.webp',
      doBadge: 'DO',
      dontTitle: 'What Never to Do',
      dontIntro: 'Avoid these common mistakes that destroy hinge mechanisms:',
      donts: [
        'Never use a power drill or cordless impact driver to turn spiral adjustment cams.',
        'Do not force adjustment screws past their natural mechanical stop limits.',
        'Never spray aerosol lubricant (WD-40) into the soft-close piston chamber.',
        'Do not adjust hinges while children or helpers are leaning down on open doors.',
      ],
      dontFooter: 'Stripped adjustment cams cannot be re-threaded and require complete hinge replacement.',
      dontImage: '/assets/guides/handbook/hb-dont-water.webp',
      dontBadge: 'DON’T',
    },
    technicalSection: {
      num: '04',
      title: 'Under-Mount Drawer Slide Adjustment',
      subtitle: 'DTC Full-Extension Concealed Runner Calibration',
      description:
        'VanStro drawer bases use concealed under-mount slides equipped with front locking clips beneath the front corners of each drawer box.',
      tableHeaders: ['Adjustment Feature', 'Mechanism Location', 'Adjustment Range', 'Function'],
      tableRows: [
        { col1: 'Front Height Wheel', col2: 'Underside of drawer clip', col3: 'Vertical height adjustment', col4: 'Aligns horizontal drawer face gap' },
        { col1: 'Rear Tilt Lever', col2: 'Back of runner slide rail', col3: 'Tilt angle adjustment', col4: 'Levels drawer box from front to back' },
        { col1: 'Side Shift Lever', col2: 'Inside locking clip', col3: 'Lateral adjustment', col4: 'Centers drawer evenly in cabinet opening' },
        { col1: 'Quick Release Trigger', col2: 'Clips under box', col3: 'Instant release', col4: 'Pulls drawer completely off slides' },
      ],
      calloutTitle: 'Dealer Replacement Support:',
      calloutText:
        'If a DTC hinge or drawer slide requires service within the 12-month residential warranty period, contact your local VanStro dealer for replacement parts.',
    },
    plates: [
      {
        figure: 'FIG. 01',
        title: 'DTC Clip-On Hinge Architecture',
        caption: 'Concealed hinge featuring independent lateral, depth, and vertical adjustment points.',
        image: '/assets/guides/guide-adjustment.webp',
        material: 'Cold-Rolled Steel',
      },
      {
        figure: 'FIG. 02',
        title: '6-Way Alignment Reveal',
        caption: 'Uniform reveal spacing achieved between PVC soft-touch shaker doors and drawer fronts.',
        image: '/assets/guides/handbook/hb-drawer.webp',
        material: 'Cabinet Alignment',
      },
      {
        figure: 'FIG. 03',
        title: 'Under-Mount Slide Locking Clip',
        caption: 'Front release clip allowing rapid drawer box height and tilt calibration.',
        image: '/assets/dealers/hardware-scene.webp',
        material: 'Runner Mechanics',
      },
    ],
    banner: {
      kicker: 'Hinge Adjustment Guide',
      title: 'Download the Step-by-Step Hinge Calibration Diagram',
      body: 'Keep this 1-page visual diagram with your tool set for rapid door gap and drawer reveal alignment on site.',
      cta: 'Download Calibration Diagram PDF',
    },
    checklist: {
      title: 'Cabinet Alignment Verification Checklist',
      docRef: 'VS-ADJUST-2026',
      tasks: [
        { id: 'a1', period: 'Step 1', task: 'Verified cabinet box is plumb, level, and securely fastened to studs.' },
        { id: 'a2', period: 'Step 2', task: 'Checked that adjoining cabinet face frames are screwed together tightly.' },
        { id: 'a3', period: 'Step 3', task: 'Adjusted front lateral cam to create uniform parallel margin between doors.' },
        { id: 'a4', period: 'Step 4', task: 'Turned rear depth cam so door rests flush against bumpers when closed.' },
        { id: 'a5', period: 'Step 5', task: 'Adjusted drawer front height dials beneath drawer clips to level fronts.' },
        { id: 'a6', period: 'Step 6', task: 'Confirmed soft-close hydraulic dampers engage smoothly without slamming.' },
      ],
      note: 'All hardware adjustments should be made with a manual screwdriver. Do not force screws past mechanical travel limits.',
    },
  },

  // 4. What Finishes Are Available
  'what-finishes-are-available': {
    slug: 'what-finishes-are-available',
    category: 'MATERIALS & FINISHES',
    readTime: '4 MIN READ',
    standardRef: 'VANSTRO FINISH §1.2',
    title: 'Cabinet Finishes: White & Light Grey',
    subtitle:
      'VanStro cabinets come in White or Light Grey with a PVC matte soft-touch door finish. See what each surface is and how to compare samples before ordering.',
    heroImage: '/assets/guides/guide-finishes.webp',
    toc: [
      { id: 'two-colours', num: '01', title: 'The Two Architectural Colourways' },
      { id: 'door-construction', num: '02', title: 'Door Face: PVC Matte Soft-Touch' },
      { id: 'dos-donts', num: '03', title: 'Finish Selection Guidelines & Care' },
      { id: 'trim-mouldings', num: '04', title: 'Paint-Ready Trim & Mouldings' },
      { id: 'finish-checklist', num: '05', title: 'Finish Verification Checklist' },
    ],
    quickRules: [
      {
        id: 'two-shades',
        title: 'Two Timeless Tones',
        label: 'Architectural Selection',
        body: 'Available in crisp architectural White and soft neutral Light Grey. Both colors maintain identical price and lead times.',
        note: 'Sample swatches available through dealers.',
        icon: '🎨',
      },
      {
        id: 'soft-touch',
        title: 'Matte Soft-Touch',
        label: 'Tactile Finish',
        body: 'PVC thermofoil exterior delivers a velvety, ultra-matte texture that resists fingerprints and reflections.',
        note: 'Heat-sealed over ¾" MDF core.',
        icon: '✨',
      },
      {
        id: 'sealed-melamine',
        title: 'Double-Sided Melamine',
        label: 'Box Interior',
        body: '¾" plywood cabinet boxes feature factory-sealed melamine on both faces for durable surface wipeability.',
        note: 'Resists kitchen spices and spills.',
        icon: '📦',
      },
    ],
    tabsLabel: 'Explore VanStro Architectural Surfaces',
    tabs: [
      {
        id: 'white-finish',
        name: 'Architectural White',
        subtitle: 'Pure Matte Soft-Touch PVC — Refined Modern Cleanliness',
        description:
          'A luminous neutral white engineered with UV inhibitors. Designed to pair seamlessly with residential countertops and popular hardware finishes.',
        specs: [
          { label: 'Colorway', value: 'VanStro Matte White' },
          { label: 'Sheen Level', value: 'Matte Soft-Touch' },
          { label: 'Core Material', value: '¾" High-Density MDF Door' },
          { label: 'Surface Finish', value: 'UV-Protected PVC Membrane' },
        ],
        primaryNote: {
          label: 'Design Harmony',
          text: 'Maximizes natural daylight in compact kitchen footprints and basement suites without harsh reflections.',
        },
        techniqueNote: {
          label: 'Surface Maintenance',
          text: 'Fingerprints wipe away cleanly with a damp microfiber cloth and neutral soap.',
        },
      },
      {
        id: 'grey-finish',
        name: 'Light Grey Finish',
        subtitle: 'Subtle Earth-Toned Grey — Warm Scandinavian & Japandi Aesthetic',
        description:
          'A tranquil, stone-inspired light grey that grounds the cabinetry without darkening the room. Offers exceptional forgivingness against kitchen residue.',
        specs: [
          { label: 'Colorway', value: 'VanStro Light Grey' },
          { label: 'Sheen Level', value: 'Matte Soft-Touch' },
          { label: 'Core Material', value: '¾" High-Density MDF Door' },
          { label: 'Surface Finish', value: 'Stain-Resistant PVC Membrane' },
        ],
        primaryNote: {
          label: 'Design Harmony',
          text: 'Pairs effortlessly with white oak flooring, concrete countertops, and matte black plumbing fixtures.',
        },
        techniqueNote: {
          label: 'Uniform Consistency',
          text: 'Factory-controlled membrane pressing provides uniform color consistency across all cabinet orders.',
        },
      },
      {
        id: 'box-melamine',
        name: 'Plywood Box Melamine',
        subtitle: 'Heavy-Duty Melamine Interior Lining over Multi-Ply Plywood',
        description:
          'The interior of every VanStro cabinet box and drawer is finished in wipeable melamine, engineered to resist scratches from heavy cast iron pots and sauce bottles.',
        specs: [
          { label: 'Substrate', value: '¾" Cross-Grain Plywood' },
          { label: 'Surface', value: 'Factory Hot-Press Melamine' },
          { label: 'Shelves', value: '¾" Plywood with Finished Edges' },
          { label: 'Chemical Tolerance', value: 'Resistant to oils & mild acids' },
        ],
        primaryNote: {
          label: 'Box vs Door Notice',
          text: 'The box interior is smooth melamine — it is designed for durability rather than the soft-touch texture of the door.',
        },
        techniqueNote: {
          label: 'Edge Protection',
          text: 'All shelf and face edges are sealed with industrial hot-melt banding to lock out moisture.',
        },
      },
    ],
    dosAndDonts: {
      doTitle: 'Finish Selection Guidelines',
      doIntro: 'How to verify finish compatibility before placing your order:',
      dos: [
        'Examine a physical door sample in your room’s actual lighting morning and evening.',
        'Pair door samples against your chosen countertop material and flooring.',
        'Use matching trims and toe kicks to complete the installation.',
        'Rely on factory heat-sealed thermofoil for dependable moisture protection in humid zones.',
      ],
      doFooter: 'Physical samples are available for review at all authorized VanStro dealer showrooms.',
      doImage: '/assets/guides/handbook/hb-swatches.webp',
      doBadge: 'DO',
      dontTitle: 'Finishing Misconceptions',
      dontIntro: 'Critical facts about factory cabinet surfaces:',
      donts: [
        'Do not attempt to sand or paint over the PVC soft-touch door finish.',
        'Never use solvent cleaners like acetone or lacquer thinner on thermofoil surfaces.',
        'Do not expect melamine box interiors to match the soft-touch tactile feel of outer doors.',
        'Avoid installing cabinet doors adjacent to high-heat self-cleaning ovens without heat shields.',
      ],
      dontFooter: 'Heat deflector strips must be installed when cabinets border self-cleaning range ovens.',
      dontImage: '/assets/guides/handbook/hb-dont-water.webp',
      dontBadge: 'DON’T',
    },
    technicalSection: {
      num: '04',
      title: 'Architectural Moulding & Trim Catalog',
      subtitle: 'Matching Trim Profiles for Polished Crown-to-Floor Integration',
      description:
        'VanStro manufactures dedicated matching trim components in both White and Light Grey to complete your cabinet installation cleanly.',
      tableHeaders: ['Trim Component', 'Standard Length', 'Finish', 'Application'],
      tableRows: [
        { col1: 'Crown Moulding', col2: 'Standard 96" Length', col3: 'Matching Door Finish', col4: 'Upper cabinet top ceiling return' },
        { col1: 'Light Rail', col2: 'Standard 96" Length', col3: 'Matching Door Finish', col4: 'Under-cabinet lighting concealment' },
        { col1: 'Toe Kick', col2: 'Standard 96" Length', col3: 'Matching Melamine / PVC', col4: 'Base cabinet floor recess fascia' },
        { col1: 'Wall Fillers', col2: 'Standard 3" / 6" Widths', col3: 'Matching Door Finish', col4: 'Wall filler scribing panels' },
      ],
      calloutTitle: 'Trim Installation Guidance:',
      calloutText:
        'Order matching moulding and filler accessories along with your cabinet boxes to ensure uniform color and finish continuity across all runs.',
    },
    plates: [
      {
        figure: 'FIG. 01',
        title: 'Finish Colorway Swatches',
        caption: 'White and Light Grey matte soft-touch door swatches shown in natural window light.',
        image: '/assets/guides/handbook/hb-door-white.webp',
        material: 'PVC Soft-Touch',
      },
      {
        figure: 'FIG. 02',
        title: 'Shaker Door Profile Detail',
        caption: 'Recessed panel Shaker construction with seamless membrane wrapping over all edges.',
        image: '/assets/guides/handbook/hb-door-grey.webp',
        material: 'Thermofoil MDF',
      },
      {
        figure: 'FIG. 03',
        title: 'Melamine Box Edgebanding',
        caption: 'Factory edge-sealed ¾" plywood box showing rigid melamine surface integration.',
        image: '/assets/guides/handbook/hb-swatches.webp',
        material: 'Plywood Melamine',
      },
    ],
    banner: {
      kicker: 'Material Sample Kit',
      title: 'Request a Physical Finish Sample Swatch Kit',
      body: 'Inspect White and Light Grey soft-touch door blocks in your home before placing your full kitchen cabinet order.',
      cta: 'Request Finish Swatch Kit',
    },
    checklist: {
      title: 'Finish Verification Checklist',
      docRef: 'VS-FINISH-2026',
      tasks: [
        { id: 'f1', period: 'Pre-Order', task: 'Verified door color (White or Light Grey) against project countertop material.' },
        { id: 'f2', period: 'Pre-Order', task: 'Confirmed matching trim requirements: Crown Moulding & Light Rail.' },
        { id: 'f3', period: 'Pre-Order', task: 'Ordered sufficient fillers in matching finish.' },
        { id: 'f4', period: 'Pre-Order', task: 'Checked toe kick fascia linear footage for all base runs and islands.' },
        { id: 'f5', period: 'Pre-Order', task: 'Confirmed glass-door wall cabinet locations (if selected in kitchen design).' },
      ],
      note: 'All finish samples reflect factory production runs and standard production tolerances.',
    },
  },

  // 5. What Are RTA Cabinets
  'what-are-rta-cabinets': {
    slug: 'what-are-rta-cabinets',
    category: 'CONSTRUCTION SPEC',
    readTime: '5 MIN READ',
    standardRef: 'VANSTRO RTA §1.0',
    title: 'RTA Kitchen Cabinets: What Ready-to-Assemble Means',
    subtitle:
      'What ready-to-assemble (RTA) kitchen cabinets are, how VanStro RTA cabinets are built, and how to plan, order and pick them up in Canada.',
    heroImage: '/assets/guides/guide-rta.webp',
    toc: [
      { id: 'what-rta-means', num: '01', title: 'What RTA Means: Flat-Packed' },
      { id: 'parts-of-cabinet', num: '02', title: 'RTA Component Architecture' },
      { id: 'dos-donts', num: '03', title: 'RTA Assembly Best Practices' },
      { id: 'assembly-matrix', num: '04', title: 'Assembly Time & Tool Matrix' },
      { id: 'rta-checklist', num: '05', title: 'RTA Cabinet Assembly Checklist' },
    ],
    quickRules: [
      {
        id: 'flat-packed',
        title: 'Ships Flat-Packed',
        label: 'Logistics Protection',
        body: 'Each cabinet box, door, and drawer is individually packaged in heavy-gauge reinforced corrugated cartons.',
        note: 'Protects panels from transit damage.',
        icon: '📦',
      },
      {
        id: 'assembled-first',
        title: 'Assembled Before Hang',
        label: 'Installation Order',
        body: 'Cabinets are assembled on the floor into rigid square boxes, then positioned, leveled, and fastened to wall studs.',
        note: 'Requires only wood glue & screwdriver.',
        icon: '🔨',
      },
      {
        id: 'identical-cabinet',
        title: 'Equal Structural Rigidity',
        label: 'True Quality',
        body: 'Once built, a ¾" plywood RTA cabinet possesses the exact same structural strength and appearance as a pre-assembled box.',
        note: 'Built to carry heavy stone counters.',
        icon: '🏛️',
      },
    ],
    tabsLabel: 'RTA Component Architecture',
    tabs: [
      {
        id: 'frameless-box',
        name: '¾" Plywood Box',
        subtitle: 'European-Style Frameless Full-Access Construction',
        description:
          'Constructed from ¾" multi-ply cabinet plywood lined with double-sided melamine. Full-access frameless design maximizes interior drawer and shelf storage.',
        specs: [
          { label: 'Side Panels', value: '¾" Heavy Multi-Ply' },
          { label: 'Back Panel', value: '½" Plywood with Support Cleat' },
          { label: 'Joining System', value: 'Wood Dowels & Cam Fasteners' },
          { label: 'Shelf Thickness', value: '¾" Full-Span Plywood' },
        ],
        primaryNote: {
          label: 'Strength Advantage',
          text: 'Engineered multi-ply box structure supports standard residential countertops reliably.',
        },
        techniqueNote: {
          label: 'Water Barrier',
          text: 'Plywood core resists water damage significantly better than fiber particle board if a leak occurs.',
        },
      },
      {
        id: 'shaker-doors',
        name: '¾" MDF Shaker Doors',
        subtitle: 'PVC Matte Soft-Touch Over Precision-Routed MDF Core',
        description:
          'Shaker profile doors feature a seamless PVC wrap over engineered moisture-resistant MDF, eliminating the seasonal joint cracking typical of 5-piece painted wood.',
        specs: [
          { label: 'Door Thickness', value: '¾" Finished Caliper' },
          { label: 'Style Profile', value: 'Classic Shaker / Recessed' },
          { label: 'Wrap Sealing', value: 'Seamless Edge Transition' },
          { label: 'Glass Option', value: 'Mullion Glass Ready Available' },
        ],
        primaryNote: {
          label: 'Dimensional Stability',
          text: 'MDF core will not expand or shrink during harsh dry Canadian winters and humid summers.',
        },
        techniqueNote: {
          label: 'Hinge Cup Boring',
          text: 'Pre-drilled 35mm hinge cups ensure instant click-in connection with DTC hinges.',
        },
      },
      {
        id: 'drawer-system',
        name: 'Plywood Drawers',
        subtitle: '⅝" Plywood Drawer Box with Under-Mount DTC Slides',
        description:
          'Precision interlocking drawer boxes engineered to glide on heavy-duty concealed soft-close drawer slides with 100 lb dynamic load rating.',
        specs: [
          { label: 'Box Material', value: '⅝" Multi-Ply Plywood' },
          { label: 'Bottom Panel', value: '⅜" Fully Captured Bottom' },
          { label: 'Slide Type', value: 'DTC Full-Extension Concealed' },
          { label: 'Closing Motion', value: 'Integrated Hydraulic Damper' },
        ],
        primaryNote: {
          label: 'Weight Capacity',
          text: 'Engineered for full stacks of ceramic dinnerware and heavy cast iron cookware.',
        },
        techniqueNote: {
          label: 'Smooth Glide',
          text: 'Concealed runners sit beneath the drawer box, protected from crumbs and dust.',
        },
      },
    ],
    dosAndDonts: {
      doTitle: 'RTA Assembly Best Practices',
      doIntro: 'Follow these workflow steps for effortless on-site assembly:',
      dos: [
        'Organize an unboxed staging area lined with cardboard to prevent panel face scratches.',
        'Apply a continuous bead of quality PVA wood glue along all wood dowel and tongue-in-groove joints.',
        'Use a corner clamping square to verify the box is 90° square before tightening cam locks.',
        'Assemble all boxes first, then gang and level the entire run together along the wall.',
      ],
      doFooter: 'A square box ensures your doors will hang with consistent reveal lines.',
      doImage: '/assets/dealers/kitchen-life.jpg',
      doBadge: 'DO',
      dontTitle: 'Common Assembly Mistakes',
      dontIntro: 'Avoid these critical assembly pitfalls:',
      donts: [
        'Do not over-torque cam lock fasteners with high-powered impact guns.',
        'Never assemble cabinets directly on bare concrete or gritty unfinished subfloors.',
        'Do not hang wall cabinets using drywall anchors — always drive cabinet screws into wall studs.',
        'Avoid installing stone countertops before cabinets are verified level and shimmed.',
      ],
      dontFooter: 'Cabinets must be screwed directly into structural 2x4 wall framing studs.',
      dontImage: '/assets/guides/handbook/hb-dont-water.webp',
      dontBadge: 'DON’T',
    },
    technicalSection: {
      num: '04',
      title: 'Assembly Workflow & Tools',
      subtitle: 'Assembly Sequence by Cabinet Type',
      description:
        'Standard assembly recommendations using handheld manual screwdrivers and wood glue.',
      tableHeaders: ['Cabinet Module', 'Assembly Sequence', 'Recommended Tools', 'Key Verification'],
      tableRows: [
        { col1: 'Single Door Base (B15-B21)', col2: 'Dowel & cam box assembly', col3: '#2 Manual Screwdriver, Rubber Mallet', col4: 'Check box diagonal squareness' },
        { col1: 'Double Door Base (B24-B36)', col2: 'Box assembly & shelf staging', col3: '#2 Screwdriver, Wood Glue, Mallet', col4: 'Verify bottom panel flushness' },
        { col1: '3-Drawer Base (DB18-DB36)', col2: 'Runner clips & drawer boxes', col3: '#2 Screwdriver, Wood Glue', col4: 'Test slide engagement before alignment' },
        { col1: 'Tall Pantry Tower (TP18-TP30)', col2: '2-Person assembly & cleats', col3: 'Level, 2-Person Lift, Screwdriver', col4: 'Anchor to wall studs securely' },
      ],
      calloutTitle: 'Local Dealer Coordination:',
      calloutText:
        'VanStro products are stocked in Winnipeg and distributed through independent local dealers who coordinate pickup and order fulfillment.',
    },
    plates: [
      {
        figure: 'FIG. 01',
        title: 'Flat-Pack Packaging Architecture',
        caption: 'Corner-protected carton packaging designed for safe freight handling and job-site staging.',
        image: '/assets/products/kitchen-cabinets/3-drawer-base-3db30-012770130-3db30-pwms-wh-primary.jpg',
        material: 'Packaging Standard',
      },
      {
        figure: 'FIG. 02',
        title: 'Cam-Lock & Dowel Joint',
        caption: 'High-tensile cam fasteners and hardwood dowels forming a rigid mechanical corner joint.',
        image: '/assets/guides/handbook/hb-box-plywood.webp',
        material: 'Mechanical Joinery',
      },
      {
        figure: 'FIG. 03',
        title: 'Assembled Base Run Rigidity',
        caption: 'Fully assembled modular run anchored to wall studs, ready for countertop templating.',
        image: '/assets/products/kitchen-cabinets/sink-base-sb36-011970130-sb36-pwms-wh-primary.jpg',
        material: 'Modular Strength',
      },
    ],
    banner: {
      kicker: 'RTA Assembly Handbook',
      title: 'Download the Complete RTA Assembly Instruction Manual',
      body: 'Comprehensive step-by-step assembly diagrams for base, wall, drawer, and tall pantry cabinets.',
      cta: 'Download Assembly Manual PDF',
    },
    checklist: {
      title: 'RTA Cabinet Assembly Checklist',
      docRef: 'VS-RTA-2026',
      tasks: [
        { id: 'r1', period: 'Unboxing', task: 'Inspected carton boxes upon delivery; verified part numbers on labels.' },
        { id: 'r2', period: 'Assembly', task: 'Applied PVA wood glue along dowel holes and panel alignment grooves.' },
        { id: 'r3', period: 'Squaring', task: 'Measured diagonal corners with tape measure to verify 100% square box.' },
        { id: 'r4', period: 'Mounting', task: 'Fastened cabinets to wall studs using 2½" washer-head cabinet screws.' },
        { id: 'r5', period: 'Ganging', task: 'Clamped adjacent cabinet face frames and secured with 1¼" wood screws.' },
      ],
      note: 'Never use drywall anchors for upper wall cabinet installation. Fasten directly into wall studs.',
    },
  },

  // 6. Plywood vs Particle Board
  'plywood-vs-particle-board-cabinets': {
    slug: 'plywood-vs-particle-board-cabinets',
    category: 'CONSTRUCTION SPEC',
    readTime: '4 MIN READ',
    standardRef: 'VANSTRO MAT §2.1',
    title: 'Plywood vs Particle Board Cabinets',
    subtitle:
      'How plywood and particle board cabinet boxes differ in moisture resistance, screw holding and weight, and what VanStro cabinets use.',
    heroImage: '/assets/guides/guide-plywood.webp',
    toc: [
      { id: 'two-sheet-materials', num: '01', title: 'Cross-Ply vs Particle Board' },
      { id: 'moisture-resilience', num: '02', title: 'Material Performance Comparison' },
      { id: 'dos-donts', num: '03', title: 'Cabinet Box Material Rules' },
      { id: 'shelf-deflection', num: '04', title: 'Box Construction Standards' },
      { id: 'plywood-checklist', num: '05', title: 'Plywood Specification Sheet' },
    ],
    quickRules: [
      {
        id: 'plywood-core',
        title: 'Cross-Laminated Grain',
        label: 'Plywood Architecture',
        body: 'Plywood consists of thin solid wood veneers stacked with alternating grain directions for exceptional dimensional rigidity.',
        note: 'VanStro uses ¾" multi-ply cabinet boxes.',
        icon: '🪵',
      },
      {
        id: 'moisture-swelling',
        title: 'Zero Core Swelling',
        label: 'Water Resistance',
        body: 'Particle board swells permanently when exposed to water leaks. Plywood withstands occasional moisture with minimal expansion.',
        note: 'Essential under kitchen sinks & vanities.',
        icon: '💧',
      },
      {
        id: 'screw-holding',
        title: 'Tenacious Screw Grip',
        label: 'Hardware Longevity',
        body: 'Wood screws bite into continuous wood grain in plywood, preventing hinges and drawer slides from ripping loose over time.',
        note: 'Hinges remain firmly anchored.',
        icon: '🔩',
      },
    ],
    tabsLabel: 'Material Performance Comparison',
    tabs: [
      {
        id: 'plywood-spec',
        name: '¾" Cabinet Plywood (VanStro)',
        subtitle: 'Multi-Ply Cross-Laminated Hardwood Core with Sealed Melamine',
        description:
          'Alternating veneer layers distribute stress evenly, reducing warping risk and providing reliable fastener retention.',
        specs: [
          { label: 'Substrate', value: 'Multi-Ply Cross-Grain Plywood' },
          { label: 'Thickness', value: '¾" True Nominal' },
          { label: 'Water Tolerance', value: 'High (Minimal thickness swell)' },
          { label: 'Fastener Holding', value: 'High screw holding capacity' },
        ],
        primaryNote: {
          label: 'Structural Life',
          text: 'Built for long-term residential kitchen and bathroom service.',
        },
        techniqueNote: {
          label: 'Weight Ratio',
          text: 'Lighter than particle board yet structurally rigid, reducing strain on wall hanging studs.',
        },
      },
      {
        id: 'particle-spec',
        name: 'Particle Board / Chipboard',
        subtitle: 'Pressed Wood Chips & Synthetic Resin Core',
        description:
          'Commonly used in mass-market budget furniture. Composed of wood sawdust and resin pressed into flat sheets. Inexpensive, but vulnerable to humidity and water pooling.',
        specs: [
          { label: 'Substrate', value: 'Compressed Sawdust & Resin' },
          { label: 'Thickness', value: '⅝" to ¾"' },
          { label: 'Water Tolerance', value: 'Low (Swells permanently)' },
          { label: 'Fastener Holding', value: 'Lower holding capacity (chips easily)' },
        ],
        primaryNote: {
          label: 'Vulnerability',
          text: 'Once water penetrates edge banding, the core swells like a sponge and loses all structural integrity.',
        },
        techniqueNote: {
          label: 'Hinge Pull-Out',
          text: 'Heavy door use often strips hinge screws out of particle board cores, requiring repair plates.',
        },
      },
    ],
    dosAndDonts: {
      doTitle: 'Cabinet Box Material Rules',
      doIntro: 'Why specifying plywood boxes protects your millwork investment:',
      dos: [
        'Insist on ¾" plywood boxes for all kitchen base cabinets, islands, and bathroom vanities.',
        'Verify that shelves are ¾" plywood to eliminate unsightly bowing under heavy ceramic cookware.',
        'Check that cabinet box interiors feature factory-sealed melamine for effortless wipe-down cleaning.',
        'Use plywood construction for upper wall units to ensure secure hanging rail strength.',
      ],
      doFooter: 'Every VanStro cabinet box is manufactured from rigid ¾" multi-ply plywood.',
      doImage: '/assets/guides/handbook/hb-box-plywood.webp',
      doBadge: 'DO',
      dontTitle: 'Particle Board Risks',
      dontIntro: 'Hazards associated with budget particle board construction:',
      donts: [
        'Particle board cores are more vulnerable to moisture exposure and sag under heavy static loads.',
        'Avoid particle board in high-humidity bathroom vanity alcoves where showers generate steam.',
        'Never re-tighten stripped screws in particle board without wood glue filler plugs.',
        'Do not allow dishwasher steam or sink pipe leaks to pool on bare particle board edges.',
      ],
      dontFooter: 'Swollen particle board cannot be sanded back or repaired — the box must be replaced.',
      dontImage: '/assets/guides/handbook/hb-dont-water.webp',
      dontBadge: 'DON’T',
    },
    technicalSection: {
      num: '04',
      title: 'Box Construction Standards',
      subtitle: 'Plywood vs Particle Board Construction Characteristics',
      description:
        'Material performance differences between cross-laminated cabinet plywood and standard particle board.',
      tableHeaders: ['Construction Feature', '¾" Cabinet Plywood', 'Particle Board', 'Performance Impact'],
      tableRows: [
        { col1: 'Core Composition', col2: 'Cross-laminated wood veneers', col3: 'Compressed sawdust & resin', col4: 'Plywood resists sagging and warping' },
        { col1: 'Moisture Tolerance', col2: 'Resistant to occasional water', col3: 'Swells permanently with water', col4: 'Plywood critical near sinks & vanities' },
        { col1: 'Fastener Retention', col2: 'Screws bite into continuous grain', col3: 'Fasteners can chip and strip', col4: 'Keeps hinges and slides securely anchored' },
        { col1: 'Structural Support', col2: 'Supports heavy stone countertops', col3: 'Requires added perimeter bracing', col4: 'Rigid box maintains door alignment' },
      ],
      calloutTitle: 'VanStro Box Standard:',
      calloutText:
        'Every VanStro cabinet box and shelf is manufactured from ¾" multi-ply plywood with factory-applied interior melamine for durable, wipeable everyday use.',
    },
    plates: [
      {
        figure: 'FIG. 01',
        title: 'Cross-Laminated Plywood Core',
        caption: 'Alternating wood grain veneer layers providing structural integrity and water resistance.',
        image: '/assets/guides/handbook/hb-box-plywood.webp',
        material: '¾" Plywood Core',
      },
      {
        figure: 'FIG. 02',
        title: 'Melamine Sealed Surface',
        caption: 'Hot-pressed melamine surface shielding plywood interior from kitchen oil and spills.',
        image: '/assets/guides/guide-plywood.webp',
        material: 'Melamine Surface',
      },
      {
        figure: 'FIG. 03',
        title: 'Countertop Load Distribution',
        caption: 'Rigid plywood side panels supporting heavy stone vanity and kitchen countertops.',
        image: '/assets/products/kitchen-cabinets/sink-base-sb36-011970130-sb36-pwms-wh-primary.jpg',
        material: 'Structural Box',
      },
    ],
    banner: {
      kicker: 'Material Guide',
      title: 'Download the Plywood Box Specification Sheet',
      body: 'Review thickness specifications, box construction details, and hardware compatibility.',
      cta: 'Download Plywood Spec Sheet PDF',
    },
    checklist: {
      title: 'Cabinet Box Material Specification Sheet',
      docRef: 'VS-PLY-2026',
      tasks: [
        { id: 'p1', period: 'Spec 1', task: 'Verified cabinet side, top, and bottom panels are ¾" multi-ply plywood.' },
        { id: 'p2', period: 'Spec 2', task: 'Confirmed shelves are ¾" cabinet-grade plywood with sealed front edges.' },
        { id: 'p3', period: 'Spec 3', task: 'Confirmed melamine interior lining on both panel faces for moisture resistance.' },
        { id: 'p4', period: 'Spec 4', task: 'Verified European frameless construction for maximum storage clearance.' },
        { id: 'p5', period: 'Spec 5', task: 'Confirmed back panels feature integrated solid hanging cleats.' },
      ],
      note: 'VanStro cabinet boxes are constructed from multi-ply plywood with wipeable interior melamine.',
    },
  },

  // 7. Bathroom Vanity Sizes
  'bathroom-vanity-sizes': {
    slug: 'bathroom-vanity-sizes',
    category: 'SIZING & CLEARANCES',
    readTime: '4 MIN READ',
    standardRef: 'VANSTRO VANITY §2.0',
    title: 'Bathroom Vanity Sizes: Widths, Height & Depth',
    subtitle:
      'Standard bathroom vanity widths, heights and depths, how to measure your space, and the exact sizes of every VanStro vanity model.',
    heroImage: '/assets/guides/guide-vanity.webp',
    toc: [
      { id: 'standard-widths', num: '01', title: 'Modular Widths: 24" to 66"' },
      { id: 'height-comfort', num: '02', title: 'VanStro Vanity Models by Size' },
      { id: 'dos-donts', num: '03', title: 'Vanity Sizing & Clearance Rules' },
      { id: 'plumbing-channel', num: '04', title: 'Complete Vanity Specification Matrix' },
      { id: 'vanity-checklist', num: '05', title: 'Bathroom Vanity Pre-Order Sheet' },
    ],
    quickRules: [
      {
        id: 'standard-widths',
        title: '7 Modular Sizes',
        label: 'Width Selection',
        body: 'VanStro vanities come in 24", 27", 30", 36", 42", 48", and 66" (double-sink) standard imperial widths.',
        note: 'Fits compact powder rooms to master suites.',
        icon: '🛁',
      },
      {
        id: 'comfort-height',
        title: '34" Comfort Height',
        label: 'Ergonomic Elevation',
        body: 'Built to contemporary 34" comfort height (reaches 35" with countertop), reducing lumbar bending during use.',
        note: '66" master vanity is 35" box height.',
        icon: '📐',
      },
      {
        id: 'depth-spec',
        title: '21" Standard Depth',
        label: 'Bathroom Clearances',
        body: '21" deep box (22" for 66" model) provides generous storage while preserving comfortable 30"+ doorway walkways.',
        note: 'Fits standard Canadian plumbing traps.',
        icon: '🚪',
      },
    ],
    tabsLabel: 'VanStro Vanity Models by Size',
    tabs: [
      {
        id: 'powder-room',
        name: 'Compact 24"–27" Vanities',
        subtitle: 'VS24 & VS27 — Powder Rooms and Compact Ensuites',
        description:
          'Designed for narrow powder rooms and half-baths where floor clearance is precious. Features single double-door storage with full plumbing trap access.',
        specs: [
          { label: 'Models', value: 'VS24 (24" W), VS27 (27" W)' },
          { label: 'Height / Depth', value: '34" H × 21" D' },
          { label: 'Sink Setup', value: 'Single Centered Sink' },
          { label: 'Storage', value: 'Full-Access Double Door' },
        ],
        primaryNote: {
          label: 'Powder Room Ideal',
          text: 'Maximizes knee clearance and toilet clearance in tight 5ft × 8ft bathrooms.',
        },
        techniqueNote: {
          label: 'Countertop Option',
          text: 'Available as cabinet only or cabinet with vanity countertop.',
        },
      },
      {
        id: 'mid-size',
        name: 'Standard 30"–36" Vanities',
        subtitle: 'VS30, VS36 & Drawer Bank Models (V3021 / V3621)',
        description:
          'The most popular vanity sizes for family bathrooms. Available with centered doors or asymmetrical side drawer banks (left or right drawers) to accommodate offset plumbing.',
        specs: [
          { label: 'Models', value: 'VS30, VS36, V3021TDR/L, V3621TDR/L' },
          { label: 'Height / Depth', value: '34" H × 21" D' },
          { label: 'Drawer Options', value: 'Drawers Left or Right' },
          { label: 'Hinges', value: 'DTC Soft-Close Concealed' },
        ],
        primaryNote: {
          label: 'Plumbing Flexibility',
          text: 'Choose left-drawer or right-drawer models to avoid relocating existing wall water pipes.',
        },
        techniqueNote: {
          label: 'Top Compatibility',
          text: 'Standard 31" × 22" or 37" × 22" countertops provide ½" architectural drip overhang.',
        },
      },
      {
        id: 'master-suite',
        name: 'Master 42"–66" Vanities',
        subtitle: '42", 48" Single-Sink & V663522 (66") Double-Sink Master Ensuite Models',
        description:
          'Grand master ensuite cabinetry. The V663522 features a generous 66" width, 35" height, and 22" depth with dual sink capacity and central drawer organization for shared morning routines.',
        specs: [
          { label: 'Models', value: 'VS42 (42" W), VS48 (48" W), V663522 (66" W)' },
          { label: 'Height / Depth', value: '34" H × 21" D (VS42/48), 35" H × 22" D (V663522)' },
          { label: 'Sink Layout', value: 'Single Sink (42/48) / Dual Sink (V663522)' },
          { label: 'Storage Layout', value: 'Multiple Deep Drawers & Double Doors' },
        ],
        primaryNote: {
          label: 'Double Sink Standard',
          text: 'V663522 accommodates dual sink basins with plumbing rough-in bays spaced for double vanities.',
        },
        techniqueNote: {
          label: 'Master Presence',
          text: 'Delivers full architectural furniture presence with soft-close DTC drawer runners.',
        },
      },
    ],
    dosAndDonts: {
      doTitle: 'Vanity Sizing Rules',
      doIntro: 'Essential checks before selecting your vanity model:',
      dos: [
        'Measure the clear wall space between adjacent walls, shower glass panels, and door casings.',
        'Verify the location of wall water shutoffs to ensure they fall within the cabinet door bay, not drawers.',
        'Maintain at least 30" of open clearance in front of the vanity for comfortable standing room.',
        'Check toilet bowl clearance — National Plumbing Code of Canada (NPC 2.4.3) requires at least 15" clearance from center of toilet to vanity side panel.',
      ],
      doFooter: 'Correct vanity sizing preserves natural bathroom traffic flow and code compliance.',
      doImage: '/assets/dealers/vanity-scene.jpg',
      doBadge: 'DO',
      dontTitle: 'Common Bathroom Planning Errors',
      dontIntro: 'Avoid these critical vanity space errors:',
      donts: [
        'Do not place a vanity where open drawers will collide with the bathroom entry door.',
        'Never install a vanity where countertop overhang blocks shower door swing radii.',
        'Do not select drawer-side models without checking your existing plumbing trap centerline.',
        'Avoid forgetting side filler strips when vanities are tucked into a 3-wall alcove.',
      ],
      dontFooter: 'Use the VanStro Vanity Size Finder tool to compute exact remaining alcove clearances.',
      dontImage: '/assets/guides/handbook/hb-dont-water.webp',
      dontBadge: 'DON’T',
    },
    technicalSection: {
      num: '04',
      title: 'Complete VanStro Vanity Specification Matrix',
      subtitle: 'Dimensions, Sinks, and Drawer Configurations of all 13 Models',
      description:
        'Official VanStro bathroom vanity dimensions, door/drawer counts, and rough-in plumbing specifications.',
      tableHeaders: ['Model Code', 'Width × Height × Depth', 'Configuration', 'Plumbing Rough-In'],
      tableRows: [
        { col1: 'VS24', col2: '24" W × 34" H × 21" D', col3: '2 Doors, Open Interior', col4: 'Center 12"' },
        { col1: 'VS27', col2: '27" W × 34" H × 21" D', col3: '2 Doors, Open Interior', col4: 'Center 13½"' },
        { col1: 'VS30', col2: '30" W × 34" H × 21" D', col3: '2 Doors, Open Interior', col4: 'Center 15"' },
        { col1: 'V3021STDR/L', col2: '30" W × 34" H × 21" D', col3: '1 Door + 2 Drawers (Right/Left)', col4: 'Door Bay Offset' },
        { col1: 'V3021TDR/L', col2: '30" W × 34" H × 21" D', col3: '2 Doors + 3 Drawers (Right/Left)', col4: 'Door Bay Offset' },
        { col1: 'VS36 / V3621TDR/L', col2: '36" W × 34" H × 21" D', col3: '2 Doors / Side Drawers', col4: 'Center 18" / Offset' },
        { col1: 'VS42', col2: '42" W × 34" H × 21" D', col3: '2 Doors + 6 Drawers', col4: 'Center 21"' },
        { col1: 'VS48', col2: '48" W × 34" H × 21" D', col3: '2 Doors + 6 Drawers', col4: 'Center 24"' },
        { col1: 'V663522', col2: '66" W × 35" H × 22" D', col3: '4 Doors + Central Drawers', col4: 'Dual Sink Rough-In' },
      ],
      calloutTitle: 'Vanity Finder Interactive Tool:',
      calloutText:
        'Need to verify how many vanities fit your exact room width? Use the interactive VanStro Vanity Size Finder tool to compute all matching models with flush/clearance calculations.',
    },
    plates: [
      {
        figure: 'FIG. 01',
        title: 'V663522 Master Double Vanity Elevation',
        caption: 'V663522 master suite vanity (66" W × 35" H × 22" D) with dual sink configuration and central drawer organization.',
        image: '/assets/products/bathroom-vanities/vanity-cabinet-v663522-026621712-v663522-pwms-wh-primary.jpg',
        material: '66" Double Vanity',
      },
      {
        figure: 'FIG. 02',
        title: 'Asymmetrical Drawer Bank Detail',
        caption: 'V3621TDR layout showing side drawers clearing center plumbing trap lines.',
        image: '/assets/products/bathroom-vanities/vanity-cabinet-v4821-024821611-white-with-top-lifestyle-front-primary.jpg',
        material: 'Drawer Bank Mechanics',
      },
      {
        figure: 'FIG. 03',
        title: 'Powder Room Space Optimization',
        caption: 'VS24 compact vanity delivering full storage while maintaining code-compliant toilet clearance.',
        image: '/assets/products/bathroom-vanities/vanity-cabinet-v2421-022421011-white-with-top-lifestyle-front-primary.jpg',
        material: 'Compact Footprint',
      },
    ],
    banner: {
      kicker: 'Bathroom Planning Guide',
      title: 'Download the Bathroom Vanity Sizing & Clearance Guide',
      body: 'Complete dimension schematics, plumbing rough-in elevations, and countertop overhang dimensions.',
      cta: 'Download Vanity Sizing Guide PDF',
    },
    checklist: {
      title: 'Bathroom Vanity Pre-Order Checklist',
      docRef: 'VS-VANITY-2026',
      tasks: [
        { id: 'v1', period: 'Dimension', task: 'Measured exact wall-to-wall width at base and 34" vanity height.' },
        { id: 'v2', period: 'Clearance', task: 'Confirmed at least 30" standing aisle clearance in front of vanity.' },
        { id: 'v3', period: 'National Plumbing Code (NPC 2.4.3)', task: 'Verified at least 15" from toilet centerline to vanity side panel per Canadian plumbing standard.' },
        { id: 'v4', period: 'Plumbing', task: 'Checked hot/cold water pipe and drain outlet height (16"–18" above floor).' },
        { id: 'v5', period: 'Countertop', task: 'Confirmed countertop selection: sold as cabinet only or with integrated top.' },
      ],
      note: 'All VanStro vanities feature solid ¾" plywood box construction and DTC soft-close hinges and runners.',
    },
  },

  // 8. Pickup and Delivery Options
  'pickup-and-delivery-options': {
    slug: 'pickup-and-delivery-options',
    category: 'LOGISTICS & DISTRIBUTION',
    readTime: '3 MIN READ',
    standardRef: 'VANSTRO LOG §5.0',
    title: 'Delivery and Local Dealer Pickup Options',
    subtitle:
      'Availability, warehouse pickup and regional freight delivery depend on your dealer location and postal code. Step-by-step VanStro guidance across Canada.',
    heroImage: '/assets/guides/guide-pickup.webp',
    toc: [
      { id: 'warehouse-pickup', num: '01', title: 'Pickup & Delivery Protocol' },
      { id: 'freight-delivery', num: '02', title: 'Fulfillment Options & Logistics' },
      { id: 'dos-donts', num: '03', title: 'Receiving & Inspection Best Practices' },
      { id: 'dealer-locations', num: '04', title: 'Canadian Distribution Network' },
      { id: 'delivery-checklist', num: '05', title: 'Receiving Inspection Sheet' },
    ],
    quickRules: [
      {
        id: 'bring-confirmation',
        title: 'Order Confirmation',
        label: 'Pickup Protocol',
        body: 'Bring your official order confirmation invoice and government-issued photo ID when arriving at the warehouse dock.',
        note: 'Dock opens 8:00 AM – 4:30 PM local time.',
        icon: '📋',
      },
      {
        id: 'curbside-drop',
        title: 'Curbside Tailgate',
        label: 'Delivery Policy',
        body: 'Freight shipments are delivered curbside via liftgate truck. Drivers do not transport cartons upstairs or inside homes.',
        note: 'Have job-site help ready to carry boxes.',
        icon: '🚚',
      },
      {
        id: 'inspect-promptly',
        title: 'Prompt Inspection',
        label: 'Damage Protocol',
        body: 'Note any exterior carton damage on the delivery receipt before signing. Report issues promptly to your dealer for resolution.',
        note: 'Keep original packaging for claims.',
        icon: '🔍',
      },
    ],
    tabsLabel: 'Fulfillment Options',
    tabs: [
      {
        id: 'dealer-pickup',
        name: 'Dealer Warehouse Pickup',
        subtitle: 'Collect Direct from Regional VanStro Distribution Center',
        description:
          'Save freight costs by picking up cartons directly from your designated VanStro dealer warehouse in an enclosed van, pickup truck, or trailer.',
        specs: [
          { label: 'Vehicle Requirement', value: 'Enclosed Van or Covered Truck' },
          { label: 'Loading Assistance', value: 'Forklift pallet placement' },
          { label: 'Pickup Window', value: 'Monday–Friday, 8am–4:30pm' },
          { label: 'Notification', value: 'Email/SMS when order is staged' },
        ],
        primaryNote: {
          label: 'Vehicle Sizing',
          text: 'An average 10-cabinet kitchen requires an 8-foot pickup truck bed or cargo van with 150+ cubic feet.',
        },
        techniqueNote: {
          label: 'Weather Protection',
          text: 'Bring tie-down ratchet straps and waterproof tarps if transporting in an open pickup truck bed.',
        },
      },
      {
        id: 'jobsite-delivery',
        name: 'Regional Job-Site Freight',
        subtitle: 'Scheduled Curbside Liftgate Delivery to Your Address',
        description:
          'Heavy pallets delivered directly to your residential driveway or commercial job site using a scheduled 5-ton delivery truck with hydraulic liftgate.',
        specs: [
          { label: 'Delivery Type', value: 'Curbside / Driveway Threshold' },
          { label: 'Unloading Method', value: 'Pallet Jack & Hydraulic Liftgate' },
          { label: 'Scheduling', value: '4-Hour Delivery Window Call' },
          { label: 'Site Requirement', value: 'Paved street & clear driveway' },
        ],
        primaryNote: {
          label: 'Access Verification',
          text: 'Confirm that your residential street has clearance for commercial delivery trucks (no low tree branches).',
        },
        techniqueNote: {
          label: 'Receiving Team',
          text: 'Ensure at least two able-bodied individuals are on site to carry boxes indoors immediately after delivery.',
        },
      },
    ],
    dosAndDonts: {
      doTitle: 'Receiving & Inspection Best Practices',
      doIntro: 'Recommended inspection steps upon shipment arrival:',
      dos: [
        'Count all carton boxes against the packing slip manifest before signing.',
        'Photograph any crushed carton corners or punctured cardboard while on the pallet.',
        'Note "Damaged Carton" clearly on the delivery receipt if any packaging is compromised.',
        'Store flat-pack boxes indoors in a climate-controlled room.',
      ],
      doFooter: 'Documented transit damage is handled through your local VanStro dealer.',
      doImage: '/assets/dealers/kitchen-life.jpg',
      doBadge: 'DO',
      dontTitle: 'Logistics Mistakes to Avoid',
      dontIntro: 'Avoid these critical receiving errors:',
      donts: [
        'Never sign delivery receipts as "Clean and Intact" before inspecting box counts.',
        'Do not transport unboxed cabinet doors loose in open pickup beds where wind can scratch faces.',
        'Never store flat-pack cabinet boxes outdoors on damp ground or in unheated spaces.',
        'Do not discard damaged cartons before photographing serial labels for warranty records.',
      ],
      dontFooter: 'Transit damage must be noted on the delivery receipt to support freight claims.',
      dontImage: '/assets/guides/handbook/hb-dont-water.webp',
      dontBadge: 'DON’T',
    },
    technicalSection: {
      num: '04',
      title: 'Order Fulfillment & Distribution',
      subtitle: 'Winnipeg Central Facility & Independent Dealer Network',
      description:
        'VanStro maintains central inventory in Winnipeg, Manitoba. Orders are fulfilled through authorized independent dealers.',
      tableHeaders: ['Facility / Location', 'City / Province', 'Role', 'Access'],
      tableRows: [
        { col1: 'VanStro Global Supply HQ', col2: 'Winnipeg, MB (856 Century St)', col3: 'Central Inventory & Orders', col4: 'Mon–Fri 8:00–16:30' },
        { col1: 'Contractor\'s Corner', col2: 'Brandon, MB (Park Ave E)', col3: 'Independent Dealer Location', col4: 'Mon–Fri 8:30–17:00' },
        { col1: 'Dealer Partner Network', col2: 'Expansion Canadian Markets', col3: 'Dealer Opportunities Open', col4: 'Applications Open' },
      ],
      calloutTitle: 'Need Delivery Scheduling Assistance?',
      calloutText:
        'Your local dealer coordinates the delivery route and truck scheduling. Contact your dealer directly using the phone number on your order confirmation for ETA updates.',
    },
    plates: [
      {
        figure: 'FIG. 01',
        title: 'Reinforced Flat-Pack Palletizing',
        caption: 'Corner-strapped pallet packaging ready for forklift loading onto delivery trucks.',
        image: '/assets/guides/guide-pickup.webp',
        material: 'Logistics Freight',
      },
      {
        figure: 'FIG. 02',
        title: 'Curbside Liftgate Unloading',
        caption: 'Commercial hydraulic liftgate lowering palletized kitchen cartons to driveway level.',
        image: '/assets/guides/handbook/hb-box-plywood.webp',
        material: 'Job-Site Delivery',
      },
      {
        figure: 'FIG. 03',
        title: 'Indoor Staging Protocol',
        caption: 'Flat-pack cartons staged on cardboard in a dry, heated room prior to cabinet assembly.',
        image: '/assets/dealers/kitchen-scene.webp',
        material: 'Job-Site Staging',
      },
    ],
    banner: {
      kicker: 'Logistics Worksheet',
      title: 'Download the Job-Site Delivery & Receiving Inspection Checklist',
      body: 'Print this receiving sheet for your job-site foreman to verify box counts and inspect cartons upon arrival.',
      cta: 'Download Receiving Checklist PDF',
    },
    checklist: {
      title: 'Freight Receiving & Inspection Sheet',
      docRef: 'VS-LOG-2026',
      tasks: [
        { id: 'l1', period: 'Pre-Arrival', task: 'Cleared access path for commercial delivery truck.' },
        { id: 'l2', period: 'Arrival', task: 'Verified bill of lading (BOL) matches VanStro order number.' },
        { id: 'l3', period: 'Inspection', task: 'Counted all carton boxes against packing slip; noted any crushed corners.' },
        { id: 'l4', period: 'Receiving', task: 'Signed delivery receipt with specific damage notes if cartons were breached.' },
        { id: 'l5', period: 'Staging', task: 'Carried cartons indoors immediately into heated, dry staging area.' },
      ],
      note: 'Transit damage should be documented on the bill of lading upon arrival and reported to your dealer promptly.',
    },
  },
};
