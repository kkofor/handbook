请帮我做一个网页小工具的可运行原型：浴室柜尺寸选择器（Vanity Size Finder）。
下面是完整的背景、产品数据、功能规则和界面文案。请严格按照这份说明来做，不要自己补充产品、价格或功能。

==================================================
一、背景和目的
==================================================

公司：VanStro Global Supply，加拿大的建材供应商，总部在 Winnipeg（Manitoba）。卖无框橱柜、浴室柜、踢脚线和线条。网站 www.vanstro.ca，提供英文和法文两种语言。商品在网上下单，由本地经销商负责提货或送货，全国统一价，单位是加元（CAD）。

这个工具要放在网站的"浴室柜尺寸指南"页面里。用途：访客输入卫生间里可以放浴室柜的空间宽度，工具列出所有放得下的 VanStro 浴室柜，以及每款的准确尺寸和价格。

目的：
1. 帮访客避免买错尺寸。
2. 让搜索引擎和 AI 助手（ChatGPT、Gemini 等）能读到一个直接回答"这个空间放得下哪款浴室柜"的页面。所以页面上的文字要清楚、具体，不要写营销口号。

==================================================
二、交付物和技术要求
==================================================

1. 一个独立的 HTML 文件。HTML、CSS、JavaScript 全部写在这一个文件里，用原生 JavaScript。
2. 不引用任何外部资源：不用 CDN、外部字体、外部图片、统计代码或第三方库。
3. 不调用任何接口，不使用 localStorage、sessionStorage 或 cookie，不收集也不保存任何输入。
4. 页面右上角有 EN / FR 语言切换。切换后，所有界面文字都换成对应语言的版本（原文见第六、七节），已有的输入和结果保留，并按新语言重新显示。
5. 界面里只能出现英文或法文，不能出现中文。
6. 手机宽度 375px 下不能出现横向滚动。
7. 设计要简洁、中性：白色背景、深灰文字、一种低调的强调色。不要做 logo，不要用 emoji，不要加动画特效。
8. 无障碍：每个输入框都要有 label，结果区域加 aria-live="polite"，键盘可以操作所有控件。
9. 把产品数据集中写在文件顶部的一个 JavaScript 数组里，方便以后替换成网站的真实数据源。
10. 把计算逻辑写成纯函数，和显示代码分开。
11. 在文件里加一个 runSelfTests() 函数，能在浏览器控制台运行。它要逐条检查第九节的验收用例，并打印每条是 PASS 还是 FAIL。

==================================================
三、产品数据（必须完全照抄，不要增删改）
==================================================

价格单位是加元，白色（White）和浅灰（Light Grey）同价。每个型号有两种配置：
- "Vanity Cabinet"：只有柜体
- "Vanity Cabinet + Top"：柜体加台面

每个型号都有 White 和 Light Grey 两种颜色。

| 型号 | 商品名（EN） | 商品名（FR） | 宽 in | 高 in | 深 in | 柜体价 | 柜体+台面价 | 商品页 URL（EN） |
|---|---|---|---|---|---|---|---|---|
| VS24 | Vanity Cabinet VS24 | Meuble-lavabo VS24 | 24 | 34 | 21 | 195 | 350 | https://www.vanstro.ca/products/vanity-cabinet-vs24-384/ |
| VS27 | Vanity Cabinet VS27 | Meuble-lavabo VS27 | 27 | 34 | 21 | 210 | 370 | https://www.vanstro.ca/products/vanity-cabinet-vs27-404/ |
| VS30 | Vanity Cabinet VS30 | Meuble-lavabo VS30 | 30 | 34 | 21 | 220 | 400 | https://www.vanstro.ca/products/vanity-cabinet-vs30-405/ |
| V3021STDR | 30" Vanity Cabinet – Single Door, Drawers Right (V3021STDR) | Meuble-lavabo V3021STDR | 30 | 34 | 21 | 350 | 530 | https://www.vanstro.ca/products/vanity-cabinet-v3021stdr-398/ |
| V3021STDL | 30" Vanity Cabinet – Single Door, Drawers Left (V3021STDL) | Meuble-lavabo V3021STDL | 30 | 34 | 21 | 350 | 530 | https://www.vanstro.ca/products/vanity-cabinet-v3021stdl-400/ |
| V3021TDR | 30" Vanity Cabinet – Two Doors, Drawers Right (V3021TDR) | Meuble-lavabo V3021TDR | 30 | 34 | 21 | 360 | 535 | https://www.vanstro.ca/products/vanity-cabinet-v3021tdr-414/ |
| V3021TDL | 30" Vanity Cabinet – Two Doors, Drawers Left (V3021TDL) | Meuble-lavabo V3021TDL | 30 | 34 | 21 | 360 | 535 | https://www.vanstro.ca/products/vanity-cabinet-v3021tdl-415/ |
| VS36 | Vanity Cabinet VS36 | Meuble-lavabo VS36 | 36 | 34 | 21 | 255 | 510 | https://www.vanstro.ca/products/vanity-cabinet-vs36-406/ |
| V3621TDR | Vanity Cabinet V3621TDR | Meuble-lavabo V3621TDR | 36 | 34 | 21 | 400 | 655 | https://www.vanstro.ca/products/vanity-cabinet-v3621tdr-413/ |
| V3621TDL | Vanity Cabinet V3621TDL | Meuble-lavabo V3621TDL | 36 | 34 | 21 | 400 | 655 | https://www.vanstro.ca/products/vanity-cabinet-v3621tdl-412/ |
| V4221 | Vanity Cabinet V4221 | Meuble-lavabo V4221 | 42 | 34 | 21 | 730 | 975 | https://www.vanstro.ca/products/vanity-cabinet-v4221-401/ |
| V4821 | Vanity Cabinet V4821 | Meuble-lavabo V4821 | 48 | 34 | 21 | 790 | 1075 | https://www.vanstro.ca/products/vanity-cabinet-v4821-402/ |
| V663522 | Vanity Cabinet V663522 | Meuble-lavabo V663522 | 66 | 35 | 22 | 925 | 1495 | https://www.vanstro.ca/products/vanity-cabinet-v663522-403/ |

配件（不是浴室柜，不出现在结果列表里，只在侧板提示里用到）：

| 型号 | 商品名（EN） | 商品名（FR） | 宽 in | 高 in | 厚 in | 价格 | 商品页 URL（EN） |
|---|---|---|---|---|---|---|---|
| VEP2230 | Vanity End Panel VEP2230 | Panneau d’extrémité de meuble-lavabo VEP2230 | 22 | 30 | 0.75 | 57.54 | https://www.vanstro.ca/products/vanity-end-panel-vep2230-380/ |

法文商品页的 URL：在 "https://www.vanstro.ca/" 后面加 "fr/"，例如 https://www.vanstro.ca/fr/products/vanity-cabinet-vs24-384/

重要：
- 商品名里有没有写门和抽屉布局，按上表原样显示。不要从型号代码（例如 STDR、TDL）推断布局，也不要额外加一栏"布局"。
- 不要添加表里没有的产品、颜色、尺寸或价格。

==================================================
四、输入
==================================================

1. 可用宽度（必填）：一个数字。
2. 单位：in / cm，默认 in。1 in = 2.54 cm，内部计算一律换算成英寸。选了 cm 时，所有输入和输出都用 cm 显示，保留一位小数。
3. 两侧情况（必填，单选，默认第一个）：
   - 两边都是墙
   - 一边是墙，一边空着
   - 两边都空着
4. 前方可用深度（选填）：从后墙到浴室柜正前方的东西（门、对面墙、浴缸边）的距离。
5. 配置（单选，默认"都显示"）：Vanity Cabinet / Vanity Cabinet + Top / 都显示。
6. 颜色（单选，默认"都显示"）：White / Light Grey / 都显示。两种颜色同价，这个选项只决定结果里"查看商品"链接旁边显示哪种颜色。
7. 按钮：提交后计算。另外，输入有变化时也要自动重新计算。

==================================================
五、计算和显示规则
==================================================

1. 宽度的有效范围是 1–200 in（3–508 cm，按当前单位判断）。超出范围或不是数字时，显示对应的错误提示（原文见第六、七节），不显示结果。
2. 结果：列出所有宽度小于或等于可用宽度的浴室柜，按宽度从宽到窄排列。宽度相同的型号放在同一组里，组内按上表顺序排列。
3. 每个型号显示：商品名、宽 × 高 × 深、剩余宽度（可用宽度减去型号宽度）、价格（按"配置"选项显示一种或两种），以及"查看商品"链接（按当前语言选英文或法文 URL）。
4. 前方深度：如果填了而且大于 0，每个型号多显示一行"剩余通道 = 前方可用深度 − 型号深度"。只显示数字，不判断够不够用。如果填的是空值、0、负数或非数字，不显示这一行，也不提示错误。如果结果是负数，显示 0。
5. 侧板提示：两侧情况选"一边空着"时，结果下方提示可以加 1 块 VEP2230；选"两边都空着"时，提示加 2 块。提示要带价格和商品链接。
6. 选"两边都是墙"，而且至少有一个型号的剩余宽度正好是 0 时，在结果下方显示"再量一次"的提示。
7. 没有任何型号放得下时（可用宽度小于 24 in），显示"最窄是 24""的提示，不显示列表。
8. 结果下方固定显示两句话：价格和提货说明、水管位置提醒（原文见第六、七节）。

格式：
- 英寸用分数显示，精确到 1/8，例如 1½"、3¼"、0"。法文用 "po"，例如 1½ po。
- 价格：英文写 $195、$1,075、$57.54；法文写 195 $、1 075 $、57,54 $（千位用空格分隔，小数点用逗号）。整数价格不显示小数。
- 单复数：结果数量是 1 时用单数句型（见文案）。
- 尺寸写法：英文 "24 × 34 × 21 in"，法文 "24 × 34 × 21 po"。选了 cm 时用 cm，保留一位小数。

==================================================
六、英文界面文案（逐字使用）
==================================================

页面标题（H2）：Find a vanity that fits your space

标题下的说明句：
Enter the width of your space to see every VanStro vanity that fits, with its exact size and price. No sign-up, and nothing you enter is saved.

输入框标签和说明：
- Space width — 说明：Measure wall to wall, or from the wall to the tub or shower.
- Units — in / cm
- Sides — Walls on both sides / Wall on one side, open on the other / Open on both sides
- Space in front (optional) — 说明：From the back wall to whatever is in front of the vanity, such as a door, the opposite wall or the edge of the tub.
- Configuration — Vanity Cabinet / Vanity Cabinet + Top / Show both
- Colour — White / Light Grey / Show both
- 按钮：Show vanities that fit

结果：
- 标题（复数）：{n} vanities fit a {W} space
- 标题（单数）：1 vanity fits a {W} space
- 每个型号：{商品名} · {w} × {h} × {d} in · {spare} to spare · Vanity Cabinet {价格1} · Vanity Cabinet + Top {价格2} · View product
- 前方深度：Leaves {x} in front of the vanity.
- 侧板提示（一边空着）：One side will be exposed. A vanity end panel (VEP2230, {价格}) can cover it.
- 侧板提示（两边都空着）：Both sides will be exposed. Two vanity end panels (VEP2230, {价格} each) can cover them.
- 再量一次：Measure again at the back and the front of the space; walls are not always square.
- 没有结果：The narrowest VanStro vanity is 24" wide. Contact us if you have a question about your space.（"Contact us" 链接到 https://www.vanstro.ca/contact/）
- 固定说明 1：Prices are national prices in Canadian dollars, the same at every dealer. When the vanity is in stock at your dealer, pickup is usually ready the same day or the next day after you order.
- 固定说明 2：Before you order, mark where the drain and water lines come through the wall; the sink should line up with them.

错误提示（按当前单位只显示一条）：
- in：Enter a width between 1" and 200".
- cm：Enter a width between 3 cm and 508 cm.

工具下方的问答区，标题（H2）：Vanity size questions
用 h3（问题）和 p（答案）显示，不要折叠，不要加 FAQ 结构化数据：

1. What is the standard width of a bathroom vanity?
   Common single-sink widths are 24", 30", 36" and 48". VanStro vanities come in 24", 27", 30", 36", 42", 48" and 66".
2. How tall are VanStro vanities?
   They are 34" high, in the comfort-height range. The 66" model is 35" high.
3. How deep are VanStro vanities?
   They are 21" deep. The 66" model is 22" deep.
4. What is the smallest VanStro vanity?
   VS24, at 24" wide, 34" high and 21" deep.
5. Does a VanStro vanity come with a countertop?
   Every model is sold as cabinet only or with a top. Choose the configuration on the product page.
6. What colours are available?
   White and Light Grey, at the same price.
7. Which 30" vanity should I choose?
   VS30, or one of the 30" models with drawers on the left or right and one or two doors (V3021STDR, V3021STDL, V3021TDR, V3021TDL). Choose the drawer side that suits your room, then check the drain and water line positions in the installation instructions on the product page.
8. What if one side of the vanity is exposed?
   A vanity end panel (VEP2230, 22" × 30") can cover the exposed side.
9. What are the cabinets made of?
   The box is ¾" plywood with melamine on both sides. Doors are ¾" MDF Shaker doors with a PVC matte soft-touch finish.
10. How fast can I pick up a vanity?
   When it is in stock at your dealer, pickup is usually ready the same day or the next day after you order.

==================================================
七、法文界面文案（逐字使用）
==================================================

页面标题：Trouvez un meuble-lavabo qui convient à votre espace

说明句：
Indiquez la largeur de votre espace pour voir tous les meubles-lavabos VanStro qui conviennent, avec leurs dimensions exactes et leur prix. Sans inscription, et rien de ce que vous entrez n'est enregistré.

输入框：
- Largeur de l'espace — Mesurez d'un mur à l'autre, ou du mur jusqu'à la baignoire ou à la douche.
- Unités — po / cm
- Côtés — Murs des deux côtés / Mur d'un côté, ouvert de l'autre / Ouvert des deux côtés
- Espace à l'avant (facultatif) — Du mur arrière jusqu'à ce qui se trouve devant le meuble, par exemple une porte, le mur opposé ou le bord de la baignoire.
- Configuration — Meuble-lavabo / Meuble-lavabo avec comptoir / Afficher les deux
- Couleur — Blanc / Gris pâle / Afficher les deux
- 按钮：Afficher les meubles qui conviennent

结果：
- 复数：{n} meubles-lavabos conviennent à un espace de {W}
- 单数：1 meuble-lavabo convient à un espace de {W}
- 每个型号：{商品名} · {w} × {h} × {d} po · {spare} de jeu · Meuble-lavabo {价格1} · Meuble-lavabo avec comptoir {价格2} · Voir le produit
- 前方深度：Il reste {x} devant le meuble.
- 侧板（一边空着）：Un côté restera apparent. Un panneau de finition (VEP2230, {价格}) peut le couvrir.
- 侧板（两边都空着）：Les deux côtés resteront apparents. Deux panneaux de finition (VEP2230, {价格} chacun) peuvent les couvrir.
- 再量一次：Mesurez de nouveau à l'arrière et à l'avant de l'espace; les murs ne sont pas toujours d'équerre.
- 没有结果：Le meuble-lavabo VanStro le plus étroit mesure 24 po de largeur. Communiquez avec nous si vous avez une question sur votre espace.（链接到 https://www.vanstro.ca/fr/contact/）
- 固定说明 1：Les prix sont des prix nationaux en dollars canadiens, les mêmes chez tous les concessionnaires. Lorsque le meuble est en stock chez votre concessionnaire, le ramassage est habituellement prêt le jour même ou le lendemain de la commande.
- 固定说明 2：Avant de commander, repérez l'endroit où le drain et les conduites d'eau sortent du mur; le lavabo doit être aligné sur eux.

错误提示：
- po：Entrez une largeur entre 1 po et 200 po.
- cm：Entrez une largeur entre 3 cm et 508 cm.

问答区标题：Questions sur les dimensions

1. Quelle est la largeur standard d'un meuble-lavabo?
   Les largeurs courantes pour un lavabo simple sont 24, 30, 36 et 48 po. Les meubles-lavabos VanStro existent en 24, 27, 30, 36, 42, 48 et 66 po.
2. Quelle est la hauteur des meubles-lavabos VanStro?
   Ils mesurent 34 po de hauteur, dans la plage dite « hauteur confort ». Le modèle de 66 po mesure 35 po.
3. Quelle est la profondeur des meubles-lavabos VanStro?
   Ils ont 21 po de profondeur. Le modèle de 66 po a 22 po.
4. Quel est le plus petit meuble-lavabo VanStro?
   Le VS24 : 24 po de largeur, 34 po de hauteur et 21 po de profondeur.
5. Le meuble-lavabo est-il vendu avec un comptoir?
   Chaque modèle est offert en meuble seul ou avec comptoir. Choisissez la configuration sur la page du produit.
6. Quelles couleurs sont offertes?
   Blanc et Gris pâle, au même prix.
7. Quel meuble de 30 po choisir?
   Le VS30, ou l'un des modèles de 30 po avec tiroirs à gauche ou à droite et une ou deux portes (V3021STDR, V3021STDL, V3021TDR, V3021TDL). Choisissez le côté des tiroirs qui convient à votre pièce, puis vérifiez l'emplacement du drain et des conduites d'eau dans les instructions d'installation de la page du produit.
8. Et si un côté du meuble reste apparent?
   Un panneau de finition (VEP2230, 22 × 30 po) peut le couvrir.
9. En quoi sont faits les meubles?
   Le caisson est en contreplaqué de ¾ po avec mélamine des deux côtés. Les portes Shaker sont en MDF de ¾ po avec fini PVC mat doux au toucher.
10. En combien de temps puis-je ramasser un meuble-lavabo?
   Lorsqu'il est en stock chez votre concessionnaire, le ramassage est habituellement prêt le jour même ou le lendemain de la commande.

==================================================
八、禁止事项
==================================================

- 不要写 free、gratuit、best、cheapest、#1、guaranteed、exclusive 这类词。
- 不要说 VanStro 提供测量或安装服务。
- 不要拿其他品牌或商店比价。
- 不要判断前方通道"够不够"，也不要引用任何建筑规范里的数字。
- 不要添加文案里没有的句子、标语或提示。

==================================================
九、验收用例（runSelfTests() 要逐条检查）
==================================================

1. 输入 30 in、两边都是墙：显示 7 款，顺序是 30" 组（VS30、V3021STDR、V3021STDL、V3021TDR、V3021TDL）、VS27、VS24。剩余宽度依次是 0、0、0、0、0、3、6，并显示"再量一次"的提示。
2. 输入 66 in：显示全部 13 款，V663522 的尺寸显示为 66 × 35 × 22。
3. 输入 23 in：显示"最窄是 24""的提示，不显示列表。
4. 输入 36 in、一边空着：显示 1 块 VEP2230 的提示，价格是 $57.54。
5. 输入 66 in、前方深度 40 in：深 21" 的款式显示 "Leaves 19" in front of the vanity."，V663522 显示 "Leaves 18" in front of the vanity."。
6. 单位选 cm、输入 91.44：结果和输入 36 in 相同，共 10 款，顺序是 VS36、V3621TDR、V3621TDL、VS30、V3021STDR、V3021STDL、V3021TDR、V3021TDL、VS27、VS24。
7. 输入 0、250 或 abc：显示错误提示，不显示结果。
8. 输入 31.5 in：VS30 的剩余宽度显示为 1½"。
9. 切换到 FR：所有文字变成法文，价格 1075 显示为 "1 075 $"，57.54 显示为 "57,54 $"。
10. 只有 1 款放得下时（输入 24 in）：标题用单数 "1 vanity fits a 24" space"。
11. 前方深度留空或填 0：不显示 "Leaves…" 这一行，也没有错误提示。

完成后，请给我：
1. 完整的 HTML 文件内容；
2. 在浏览器控制台运行 runSelfTests() 后的输出。
