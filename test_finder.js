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

function getProductUrl(urlEn, lang) {
  if (lang === 'fr') {
    return urlEn.replace('https://www.vanstro.ca/', 'https://www.vanstro.ca/fr/');
  }
  return urlEn;
}

function formatPrice(amount, lang) {
  if (lang === 'fr') {
    // 195 $, 1 075 $, 57,54 $
    const isInt = Number.isInteger(amount);
    let str = isInt ? amount.toString() : amount.toFixed(2);
    let parts = str.split('.');
    let intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    if (parts.length > 1) {
      return `${intPart},${parts[1]} $`;
    }
    return `${intPart} $`;
  } else {
    // $195, $1,075, $57.54
    const isInt = Number.isInteger(amount);
    let str = isInt ? amount.toString() : amount.toFixed(2);
    let parts = str.split('.');
    let intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts.length > 1) {
      return `$${intPart}.${parts[1]}`;
    }
    return `$${intPart}`;
  }
}

function formatInchesFraction(valInches) {
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

function formatLength(valInches, unit, lang, withUnitSymbol = true) {
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

function formatDimension(w, h, d, unit, lang) {
  if (unit === 'cm') {
    return `${(w * 2.54).toFixed(1)} × ${(h * 2.54).toFixed(1)} × ${(d * 2.54).toFixed(1)} cm`;
  } else {
    const unitWord = lang === 'fr' ? 'po' : 'in';
    return `${w} × ${h} × ${d} ${unitWord}`;
  }
}

function calculateVanities({
  spaceWidthInput,
  unit = 'in',
  sides = 'both_walls',
  spaceInFrontInput = '',
  configuration = 'both',
  colour = 'both',
  lang = 'en'
}) {
  const rawW = typeof spaceWidthInput === 'number' ? spaceWidthInput : parseFloat(spaceWidthInput);
  
  // Validation
  const minW = unit === 'in' ? 1 : 3;
  const maxW = unit === 'in' ? 200 : 508;

  if (isNaN(rawW) || rawW < minW || rawW > maxW) {
    let errorMsg = '';
    if (unit === 'in') {
      errorMsg = lang === 'fr' ? 'Entrez une largeur entre 1 po et 200 po.' : 'Enter a width between 1" and 200".';
    } else {
      errorMsg = lang === 'fr' ? 'Entrez une largeur entre 3 cm et 508 cm.' : 'Enter a width between 3 cm and 508 cm.';
    }
    return {
      isValid: false,
      errorMsg,
      results: []
    };
  }

  // Convert to inches for calculation
  const spaceWidthInches = unit === 'in' ? rawW : rawW / 2.54;

  // Check if any vanity fits (minimum width is 24")
  // Note: precision tolerance for floating point
  if (spaceWidthInches < 24 - 0.0001) {
    return {
      isValid: true,
      hasResults: false,
      spaceWidthFormatted: formatLength(spaceWidthInches, unit, lang),
      noResultsMsg: lang === 'fr'
        ? 'Le meuble-lavabo VanStro le plus étroit mesure 24 po de largeur. Communiquez avec nous si vous avez une question sur votre espace.'
        : 'The narrowest VanStro vanity is 24" wide. Contact us if you have a question about your space.',
      contactUrl: lang === 'fr' ? 'https://www.vanstro.ca/fr/contact/': 'https://www.vanstro.ca/contact/',
      results: []
    };
  }

  // Filter products
  // Listed in order: wide to narrow. Identical widths in table order.
  const matching = PRODUCTS.filter(p => p.w <= spaceWidthInches + 0.0001);
  matching.sort((a, b) => {
    if (b.w !== a.w) {
      return b.w - a.w; // descending
    }
    return PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b);
  });

  // Check front depth
  const rawFront = spaceInFrontInput !== '' && spaceInFrontInput !== null && !isNaN(parseFloat(spaceInFrontInput))
    ? parseFloat(spaceInFrontInput)
    : null;
  const frontInches = rawFront !== null && rawFront > 0
    ? (unit === 'in' ? rawFront : rawFront / 2.54)
    : null;

  let hasExactZeroSpare = false;

  const results = matching.map(p => {
    const spareInches = Math.max(0, spaceWidthInches - p.w);
    // Tolerance for exactly 0
    if (Math.abs(spareInches) < 0.001) {
      hasExactZeroSpare = true;
    }

    let leavesText = null;
    if (frontInches !== null) {
      const clearanceInches = Math.max(0, frontInches - p.d);
      const formattedClearance = formatLength(clearanceInches, unit, lang);
      leavesText = lang === 'fr'
        ? `Il reste ${formattedClearance} devant le meuble.`
        : `Leaves ${formattedClearance} in front of the vanity.`;
    }

    return {
      model: p.id,
      name: lang === 'fr' ? p.nameFr : p.nameEn,
      w: p.w,
      h: p.h,
      d: p.d,
      dimensionsFormatted: formatDimension(p.w, p.h, p.d, unit, lang),
      spareFormatted: formatLength(spareInches, unit, lang),
      spareRaw: spareInches,
      priceCab: p.priceCab,
      priceTop: p.priceTop,
      priceCabFormatted: formatPrice(p.priceCab, lang),
      priceTopFormatted: formatPrice(p.priceTop, lang),
      url: getProductUrl(p.urlEn, lang),
      leavesText
    };
  });

  // Side panel hints
  let sidePanelHint = null;
  const vepPriceFormatted = formatPrice(ACCESSORY_VEP2230.price, lang);
  const vepUrl = getProductUrl(ACCESSORY_VEP2230.urlEn, lang);
  if (sides === 'one_open') {
    sidePanelHint = {
      count: 1,
      text: lang === 'fr'
        ? `Un côté restera apparent. Un panneau de finition (VEP2230, ${vepPriceFormatted}) peut le couvrir.`
        : `One side will be exposed. A vanity end panel (VEP2230, ${vepPriceFormatted}) can cover it.`,
      url: vepUrl
    };
  } else if (sides === 'both_open') {
    sidePanelHint = {
      count: 2,
      text: lang === 'fr'
        ? `Les deux côtés resteront apparents. Deux panneaux de finition (VEP2230, ${vepPriceFormatted} chacun) peuvent les couvrir.`
        : `Both sides will be exposed. Two vanity end panels (VEP2230, ${vepPriceFormatted} each) can cover them.`,
      url: vepUrl
    };
  }

  // Measure again hint
  let measureAgainHint = null;
  if (sides === 'both_walls' && hasExactZeroSpare) {
    measureAgainHint = lang === 'fr'
      ? 'Mesurez de nouveau à l\'arrière et à l\'avant de l\'espace; les murs ne sont pas toujours d\'équerre.'
      : 'Measure again at the back and the front of the space; walls are not always square.';
  }

  // Header text
  const count = results.length;
  const formattedW = formatLength(spaceWidthInches, unit, lang);
  let title = '';
  if (count === 1) {
    title = lang === 'fr'
      ? `1 meuble-lavabo convient à un espace de ${formattedW}`
      : `1 vanity fits a ${formattedW} space`;
  } else {
    title = lang === 'fr'
      ? `${count} meubles-lavabos conviennent à un espace de ${formattedW}`
      : `${count} vanities fit a ${formattedW} space`;
  }

  return {
    isValid: true,
    hasResults: true,
    count,
    title,
    spaceWidthFormatted: formattedW,
    results,
    sidePanelHint,
    measureAgainHint,
    fixedNote1: lang === 'fr'
      ? 'Les prix sont des prix nationaux en dollars canadiens, les mêmes chez tous les concessionnaires. Lorsque le meuble est en stock chez votre concessionnaire, le ramassage est habituellement prêt le jour même ou le lendemain de la commande.'
      : 'Prices are national prices in Canadian dollars, the same at every dealer. When the vanity is in stock at your dealer, pickup is usually ready the same day or the next day after you order.',
    fixedNote2: lang === 'fr'
      ? 'Avant de commander, repérez l\'endroit où le drain et les conduites d\'eau sortent du mur; le lavabo doit être aligné sur eux.'
      : 'Before you order, mark where the drain and water lines come through the wall; the sink should line up with them.'
  };
}

function runSelfTests() {
  const tests = [];

  // Test 1: 输入 30 in、两边都是墙：显示 7 款，顺序是 30" 组（VS30、V3021STDR、V3021STDL、V3021TDR、V3021TDL）、VS27、VS24。剩余宽度依次是 0、0、0、0、0、3、6，并显示"再量一次"的提示。
  const t1 = calculateVanities({ spaceWidthInput: 30, unit: 'in', sides: 'both_walls', lang: 'en' });
  const t1Models = t1.results.map(r => r.model);
  const t1ExpectedModels = ['VS30', 'V3021STDR', 'V3021STDL', 'V3021TDR', 'V3021TDL', 'VS27', 'VS24'];
  const t1Spares = t1.results.map(r => Math.round(r.spareRaw));
  const t1Pass = t1.results.length === 7 &&
    JSON.stringify(t1Models) === JSON.stringify(t1ExpectedModels) &&
    JSON.stringify(t1Spares) === JSON.stringify([0, 0, 0, 0, 0, 3, 6]) &&
    t1.measureAgainHint !== null;
  tests.push({ id: 1, desc: 'Input 30 in, walls on both sides: 7 models, correct order, spares 0,0,0,0,0,3,6, measure again hint', pass: t1Pass });

  // Test 2: 输入 66 in：显示全部 13 款，V663522 的尺寸显示为 66 × 35 × 22。
  const t2 = calculateVanities({ spaceWidthInput: 66, unit: 'in', lang: 'en' });
  const v66 = t2.results.find(r => r.model === 'V663522');
  const t2Pass = t2.results.length === 13 && v66 && v66.dimensionsFormatted.includes('66 × 35 × 22');
  tests.push({ id: 2, desc: 'Input 66 in: all 13 models, V663522 dimensions 66 × 35 × 22', pass: t2Pass });

  // Test 3: 输入 23 in：显示"最窄是 24""的提示，不显示列表。
  const t3 = calculateVanities({ spaceWidthInput: 23, unit: 'in', lang: 'en' });
  const t3Pass = t3.isValid === true && t3.hasResults === false && t3.results.length === 0 && t3.noResultsMsg.includes('24"');
  tests.push({ id: 3, desc: 'Input 23 in: narrowest is 24" message, no list shown', pass: t3Pass });

  // Test 4: 输入 36 in、一边空着：显示 1 块 VEP2230 的提示，价格是 $57.54。
  const t4 = calculateVanities({ spaceWidthInput: 36, unit: 'in', sides: 'one_open', lang: 'en' });
  const t4Pass = t4.sidePanelHint && t4.sidePanelHint.count === 1 && t4.sidePanelHint.text.includes('$57.54') && t4.sidePanelHint.text.includes('VEP2230');
  tests.push({ id: 4, desc: 'Input 36 in, one side open: 1 panel VEP2230 hint, price $57.54', pass: t4Pass });

  // Test 5: 输入 66 in、前方深度 40 in：深 21" 的款式显示 "Leaves 19" in front of the vanity."，V663522 显示 "Leaves 18" in front of the vanity."。
  const t5 = calculateVanities({ spaceWidthInput: 66, spaceInFrontInput: 40, unit: 'in', lang: 'en' });
  const d21 = t5.results.find(r => r.d === 21);
  const d22 = t5.results.find(r => r.model === 'V663522');
  const t5Pass = d21 && d21.leavesText === 'Leaves 19" in front of the vanity.' &&
                 d22 && d22.leavesText === 'Leaves 18" in front of the vanity.';
  tests.push({ id: 5, desc: 'Input 66 in, front depth 40 in: Leaves 19" and Leaves 18"', pass: t5Pass });

  // Test 6: 单位选 cm、输入 91.44：结果和输入 36 in 相同，共 10 款，顺序是 VS36、V3621TDR、V3621TDL、VS30、V3021STDR、V3021STDL、V3021TDR、V3021TDL、VS27、VS24。
  const t6 = calculateVanities({ spaceWidthInput: 91.44, unit: 'cm', lang: 'en' });
  const t6Expected = ['VS36', 'V3621TDR', 'V3621TDL', 'VS30', 'V3021STDR', 'V3021STDL', 'V3021TDR', 'V3021TDL', 'VS27', 'VS24'];
  const t6Models = t6.results.map(r => r.model);
  const t6Pass = t6.results.length === 10 && JSON.stringify(t6Models) === JSON.stringify(t6Expected);
  tests.push({ id: 6, desc: 'Unit cm, input 91.44: 10 models, matches 36 in exactly in order', pass: t6Pass });

  // Test 7: 输入 0、250 或 abc：显示错误提示，不显示结果。
  const t7a = calculateVanities({ spaceWidthInput: 0, unit: 'in', lang: 'en' });
  const t7b = calculateVanities({ spaceWidthInput: 250, unit: 'in', lang: 'en' });
  const t7c = calculateVanities({ spaceWidthInput: 'abc', unit: 'in', lang: 'en' });
  const t7Pass = !t7a.isValid && t7a.results.length === 0 &&
                 !t7b.isValid && t7b.results.length === 0 &&
                 !t7c.isValid && t7c.results.length === 0;
  tests.push({ id: 7, desc: 'Input 0, 250, or abc: error displayed, no results', pass: t7Pass });

  // Test 8: 输入 31.5 in：VS30 的剩余宽度显示为 1½"。
  const t8 = calculateVanities({ spaceWidthInput: 31.5, unit: 'in', lang: 'en' });
  const vs30 = t8.results.find(r => r.model === 'VS30');
  const t8Pass = vs30 && vs30.spareFormatted === '1½"';
  tests.push({ id: 8, desc: 'Input 31.5 in: VS30 spare width is 1½"', pass: t8Pass });

  // Test 9: 切换到 FR：所有文字变成法文，价格 1075 显示为 "1 075 $"，57.54 显示为 "57,54 $"。
  const p1075Fr = formatPrice(1075, 'fr');
  const p57Fr = formatPrice(57.54, 'fr');
  const t9 = calculateVanities({ spaceWidthInput: 48, unit: 'in', sides: 'one_open', lang: 'fr' });
  const t9Pass = p1075Fr === '1 075 $' && p57Fr === '57,54 $' && t9.title.includes('conviennent') && t9.sidePanelHint.text.includes('57,54 $');
  tests.push({ id: 9, desc: 'Switch to FR: all French text, prices 1 075 $ and 57,54 $', pass: t9Pass });

  // Test 10: 只有 1 款放得下时（输入 24 in）：标题用单数 "1 vanity fits a 24" space"。
  const t10 = calculateVanities({ spaceWidthInput: 24, unit: 'in', lang: 'en' });
  const t10Pass = t10.results.length === 1 && t10.title === '1 vanity fits a 24" space';
  tests.push({ id: 10, desc: 'Only 1 fits (input 24 in): singular title "1 vanity fits a 24\\" space"', pass: t10Pass });

  // Test 11: 前方深度留空或填 0：不显示 "Leaves…" 这一行，也没有错误提示。
  const t11a = calculateVanities({ spaceWidthInput: 30, spaceInFrontInput: '', unit: 'in', lang: 'en' });
  const t11b = calculateVanities({ spaceWidthInput: 30, spaceInFrontInput: 0, unit: 'in', lang: 'en' });
  const t11Pass = t11a.isValid && t11a.results.every(r => r.leavesText === null) &&
                  t11b.isValid && t11b.results.every(r => r.leavesText === null);
  tests.push({ id: 11, desc: 'Space in front empty or 0: no leaves line, no error', pass: t11Pass });

  let allPass = true;
  tests.forEach(t => {
    console.log(`Test ${t.id}: ${t.pass ? 'PASS' : 'FAIL'} - ${t.desc}`);
    if (!t.pass) allPass = false;
  });
  console.log(`Overall: ${allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
  return allPass;
}

runSelfTests();
