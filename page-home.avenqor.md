
# Avenqor Home Page Spec

File: `page-home.avenqor.md`  
Route: `/`  
Version: 0.1

This document describes the structure, content, and behaviour of the Avenqor home page. It is intended for developers and AI assistants working on the Next.js + Tailwind + Framer Motion implementation.

---

## 1. Purpose and KPIs

**Purpose**

The home page should:

- Clearly explain what Avenqor is (education-only, not a broker or signal provider).
- Communicate that the platform covers Forex, Crypto and Binary options.
- Show three core learning paths: ready-made courses, custom course, instant AI strategy.
- Build trust and seriousness through tone, design and risk messaging.
- Drive users to:
  - explore courses,
  - request a custom course,
  - open the AI Strategy builder.

**Primary KPIs**

- Click-through rate (CTR) on:
  - `Explore courses` (Hero + Footer CTA),
  - `Request custom course` (Hero + Footer CTA + path card),
  - `Open AI Strategy Builder` (path card).
- Percentage of visitors scrolling past:
  - Featured Courses,
  - Risk Notice section.
- Time on page and bounce rate for first-time visitors.

---

## 2. Layout and Meta

- Layout: `MainLayout` (header + footer shared across marketing pages).
- Theme: dark-first, using the design system colors and typography.
- Container: `max-w-6xl`, `px-4 sm:px-6 lg:px-8`, sections wrapped with `<Section>` component.
- Scroll behaviour:
  - Each section uses scroll-in animation via Framer Motion (see Motion section below).
- SEO:
  - `<title>`: `Avenqor – Premium education for Forex, Crypto and Binary markets`
  - `<meta name="description">`: concise description focusing on structured education and risk awareness.
  - OG tags to match the same message.

---

## 3. Sections Overview (Information Architecture)

Order of sections from top to bottom:

1. Header (global)
2. Hero
3. Market Snapshot
4. Featured Courses
5. Three Ways to Learn (Choose your path)
6. How Avenqor Fits Into Your Learning (How it works)
7. Tokens and Direct Payments
8. Glossary and Resources
9. Risk Notice (Risk & Disclaimer teaser)
10. FAQ
11. Footer CTA
12. Footer (global)

Each section below includes: purpose, layout, content (EN + AR), and interactions.

---

## 4. Header

**Purpose**

- Provide brand identity and main navigation.
- Allow switching language (EN / AR).
- Prepare space for currency selection (dropdown; initial implementation can be visual only).

**Layout**

- Sticky header: `position: sticky; top: 0; z-index: 30;`.
- Background: `bg-slate-950/80` with `backdrop-blur-xl`.
- Border: `border-b border-slate-900/80`.
- Content:
  - Left: logo + brand.
  - Center: navigation items (hidden on small screens).
  - Right: currency dropdown (compact), language toggle (EN/AR), Sign in, Get started.

**Content**

- Brand block:
  - Logo: square `AV` with gradient from cyan to blue.
  - Text: `Avenqor` + small label `Education only`.

- Navigation items:
  - `Courses`
  - `Custom course`
  - `AI Strategy`
  - `Pricing`
  - `Glossary`
  - `Resources`
  - `FAQ`

- Right-side controls:
  - Currency dropdown (initially: `GBP` label with chevron).
  - Language toggle: `EN` (active pill) / `AR` (secondary).
  - Buttons: `Sign in` (secondary), `Get started` (primary).

**Copy (EN)**

- Brand subtitle: `Education only`.

**Copy (AR)** (Modern Standard Arabic)

> Use RTL when AR is active; below is the Arabic equivalent for the subtitle:
- Brand subtitle AR: `لأغراض تعليمية فقط`

---

## 5. Hero

**Purpose**

- Deliver Avenqor's core message immediately.
- Offer primary CTAs: explore courses, request custom course.
- Make clear that Avenqor is educational, not financial advice.
- Highlight the “featured today” course via a slideshow on the right.

**Layout**

- 2-column grid on desktop (`lg:grid-cols-12`):
  - Left (`lg:col-span-6`): text content and CTAs.
  - Right (`lg:col-span-6`): HeroSlideshow card with glowing background.
- On mobile: stacked vertically.

**Left Column Content**

- Small pill:
  - `Avenqor Club` + small cyan dot + `Education only`.
- Main heading.
- Supporting paragraph.
- Two buttons (primary and secondary).
- Three small bullets with icons (ShieldCheck, FileText, Cpu).

**Copy – EN**

- Badge pill:
  - `Avenqor Club`
  - `Education only`

- Hero title:
  - `Premium education for high-risk markets.`

- Hero paragraph:
  - `Structured Forex, Crypto and Binary options courses with custom PDFs and AI-generated strategies. No signals, no promises – just clear learning paths.`

- Buttons:
  - Primary: `Explore courses`
  - Secondary: `Request custom course`

- Bullets:
  1. `No financial advice – education only.`
  2. `Courses delivered as structured PDFs.`
  3. `AI strategies with token-based access.`

**Copy – AR** (RTL; semantic equivalent, not word-for-word)

- Badge pill:
  - `نادي أفِنكور`
  - `لأغراض تعليمية فقط`

- Hero title AR:
  - `تعليم متميز لأسواق عالية المخاطر.`

- Hero paragraph AR:
  - `دورات منظمة في الفوركس والعملات الرقمية والخيارات الثنائية، مع ملفات PDF مخصصة واستراتيجيات يتم إنشاؤها بالذكاء الاصطناعي. بدون إشارات تداول وبدون وعود بالأرباح – فقط مسارات تعليمية واضحة.`

- Buttons AR:
  - Primary: `استعرض الدورات`
  - Secondary: `اطلب دورة مخصصة`

- Bullets AR:
  1. `ليست نصيحة مالية – محتوى تعليمي فقط.`
  2. `الدورات تُقدَّم كملفات PDF منظمة.`
  3. `استراتيجيات بالذكاء الاصطناعي تعتمد على رصيد الرموز.`

**Right Column – HeroSlideshow**

- Component cycles through `heroSlides` array.
- Auto-advance every ~6 seconds; user can click bullets to select slide.
- Each slide shows:
  - level (Beginner/Intermediate/Advanced),
  - market (Forex/Crypto/Binary),
  - course title,
  - short summary,
  - `View course` link.

**HeroSlides Data (EN)**

1. Beginner / Forex
   - Title: `Forex Foundations: From Zero to First Trade`
   - Summary: `A base in core concepts, order types and risk per trade.`

2. Intermediate / Crypto
   - Title: `Crypto Volatility Structures`
   - Summary: `Volatility cycles, liquidity zones and structured approaches to managing major crypto pairs.`

3. Advanced / Binary
   - Title: `Binary Risk & Payout Geometry`
   - Summary: `Payout curves, risk stacking and the structure of binary exposure.`

**HeroSlides – AR**

The UI still uses English titles for course names. If a full AR locale is implemented later, translations can be:

1. Beginner / Forex
   - Title AR: `أساسيات الفوركس: من الصفر إلى أول صفقة`
   - Summary AR: `قاعدة في المفاهيم الأساسية وأنواع الأوامر وحجم المخاطرة في كل صفقة.`

2. Intermediate / Crypto
   - Title AR: `هياكل تقلبات العملات الرقمية`
   - Summary AR: `دورات التقلب ومناطق السيولة ونهج منظم للتعامل مع أزواج العملات الرقمية الرئيسية.`

3. Advanced / Binary
   - Title AR: `مخاطر الخيارات الثنائية وهندسة العوائد`
   - Summary AR: `منحنيات العائد، تكديس المخاطر وكيفية هيكلة التعرض في الخيارات الثنائية.`

**Interactions and Motion**

- Section scroll-in: fade + upward motion (see Motion).
- Slideshow:
  - Cards animate with `opacity 0 → 1`, `y 12 → 0` on change.
- Buttons:
  - Standard hover states according to design system.

---

## 6. Market Snapshot

**Purpose**

- Show that Avenqor is anchored in real markets (using live widgets later).
- Reinforce that all data is for educational purposes only.

**Layout**

- 2 columns on desktop:
  - Left: text explanation and disclaimer.
  - Right: chart/widget placeholder.
- On mobile: stacked with text above chart.

**Copy – EN**

- Section title: `Market snapshot`
- Paragraph:  
  `Live prices from major markets to support your learning. Avenqor never provides trading signals or investment advice.`
- Info line:
  - icon: `Info`
  - text: `Data is shown for educational purposes only.`
- Placeholder: `Data widget placeholder (TradingView).`
- Chart area placeholder: `Real-time BTC / FX chart placeholder`.

**Copy – AR**

- Section title AR: `لمحة عن السوق`
- Paragraph AR:  
  `أسعار لحظية من أهم الأسواق لدعم تجربتك التعليمية. أفِنكور لا يقدّم إشارات تداول أو نصائح استثمارية.`
- Info line AR:  
  `يُعرض هذا البيانات لأغراض تعليمية فقط.`
- Placeholders can stay in English for developers, or:
  - `عنصر واجهة بيانات (TradingView) – موضع مؤقت.`
  - `منطقة مخطط لحظي لزوج BTC / أزواج الفوركس – موضع مؤقت.`

**Interactions**

- Currently static; later will host a TradingView widget.
- No user interaction required in MVP.

---

## 7. Featured Courses

**Purpose**

- Tease a small set of featured courses.
- Show structure: level, market, format, price, tokens.

**Layout**

- Section header with title, description and `View all courses` link.
- Filters row: level filters + market filters.
- Grid of three `CardCourse` components (1 column on mobile, 3 columns on desktop).

**Copy – EN**

- Section title: `Courses designed for clarity, not hype.`
- Paragraph:  
  `Choose by market and level. Each course is a structured PDF you can study at your own pace.`
- Link: `View all courses`.

- Filters:
  - Pill: `Filters`
  - Level filters: `All`, `Beginner`, `Intermediate`, `Advanced`.
  - Market filters: `Forex`, `Crypto`, `Binary`.

- Course cards data (EN, sample):

  1. Beginner / Forex  
     - Title: `Forex Foundations: From Zero to First Trade`  
     - Desc: `Build a base in Forex – from key terms and order types to risk per trade and journaling.`  
     - Price: `€79`  
     - Tokens: `≈ 7 900 tokens`  

  2. Intermediate / Crypto  
     - Title: `Crypto Volatility Structures`  
     - Desc: `Understand volatility cycles, liquidity zones and structured approaches to managing crypto swings.`  
     - Price: `€99`  
     - Tokens: `≈ 9 900 tokens`  

  3. Advanced / Binary  
     - Title: `Binary Risk & Payout Geometry`  
     - Desc: `A deep dive into payout curves, risk stacking and how to structure binary exposure.`  
     - Price: `€119`  
     - Tokens: `≈ 11 900 tokens`  

- CTA inside card: `View details`.

**Copy – AR**

- Section title AR: `دورات مصممة للوضوح، لا للضجيج.`
- Paragraph AR:  
  `اختر حسب السوق ومستوى الخبرة. كل دورة عبارة عن ملف PDF منظم يمكنك دراسته بالوتيرة التي تناسبك.`
- Link AR: `استعرض جميع الدورات`.

Filters AR (optional for full AR localisation):

- `الكل`, `مبتدئ`, `متوسط`, `متقدم`
- `الفوركس`, `العملات الرقمية`, `الخيارات الثنائية`

Course titles can remain in English initially to match product naming.

**Interactions**

- Filter pills currently visual-only in preview;
  later they should filter the course grid via state.
- Cards hover with slight lift and border highlight.

---

## 8. Three Ways to Learn (Choose your path)

**Purpose**

- Present the three main offerings in one glance:
  - ready-made PDF courses,
  - custom course by a pro trader,
  - AI strategy builder.

**Layout**

- Section title + short description.
- 3 cards (`CardPath`) in a 1x3 grid (stacked on mobile).
- Each card has icon, title, text, optional badge, CTA.

**Copy – EN**

- Section title: `Three ways to learn with Avenqor.`
- Paragraph: `Pick the format that fits your current stage and time.`

Cards:

1. Structured PDF courses  
   - Title: `Structured PDF courses`  
   - Text: `Pre-built learning paths for Forex, Crypto and Binary, organised by level.`  
   - CTA: `Browse courses`

2. Custom course by a pro trader  
   - Title: `Custom course by a pro trader`  
   - Text: `Share your experience, deposit size, risk tolerance and goals. Receive a tailored PDF within 48–96 hours.`  
   - Badge: `Delivered via email`  
   - CTA: `Request custom course`

3. AI strategy in seconds  
   - Title: `AI strategy in seconds`  
   - Text: `Generate a structured trading plan with entry/exit logic and a risk checklist, based on your inputs.`  
   - Badge: `Instant`  
   - CTA: `Open AI Strategy Builder`

**Copy – AR**

- Section title AR: `ثلاث طرق للتعلم مع أفِنكور.`
- Paragraph AR: `اختر الصيغة التي تناسب مستواك الحالي ووقتك المتاح.`

Cards AR (titles + summaries):

1. Structured PDF courses  
   - Title AR: `دورات PDF منظمة`  
   - Text AR: `مسارات تعليمية جاهزة للفوركس والعملات الرقمية والخيارات الثنائية، مصنّفة حسب مستوى الخبرة.`  

2. Custom course by a pro trader  
   - Title AR: `دورة مخصصة يعدّها متداول محترف`  
   - Text AR: `شارك خبرتك الحالية وحجم الإيداع ومستوى المخاطرة المفضل وأهدافك. ستحصل على ملف PDF مخصص خلال ٤٨–٩٦ ساعة.`  
   - Badge AR: `تُرسل عبر البريد الإلكتروني`  

3. AI strategy in seconds  
   - Title AR: `استراتيجية بالذكاء الاصطناعي في ثوانٍ`  
   - Text AR: `أنشئ خطة تداول منظمة مع منطق نقاط الدخول والخروج وقائمة مراجعة للمخاطر، بناءً على مدخلاتك.`  
   - Badge AR: `فوري`  

**Interactions**

- Cards hover with spring animation (`y -6`, `scale 1.02`).
- CTA buttons use ghost-link style (cyan text).

---

## 9. How Avenqor Fits Into Your Learning (How it works)

**Purpose**

- Briefly explain the learning flow in four clear steps.

**Layout**

- Section title and paragraph.
- Grid of four `CardStep` items.

**Copy – EN**

- Title: `How Avenqor fits into your learning.`
- Paragraph: `A simple sequence that keeps education and risk awareness at the center.`

Steps:

1. `Define your path`  
   `Choose between ready-made courses, a custom PDF or an AI-generated strategy.`

2. `Add balance or pay directly`  
   `Use tokens across products or pay in EUR, GBP, USD or AED at checkout.`

3. `Get your PDF`  
   `Download and study at your own pace with a clear module structure.`

4. `Refine with AI strategies`  
   `Generate additional AI plans as your understanding and needs evolve.`

**Copy – AR**

- Title AR: `كيف يندمج أفِنكور مع رحلة تعلمك.`
- Paragraph AR: `تسلسل بسيط يضع التعليم والوعي بالمخاطر في المركز.`

Steps AR:

1. `حدّد مسارك`  
   `اختر بين الدورات الجاهزة أو ملف PDF مخصص أو استراتيجية يتم إنشاؤها بالذكاء الاصطناعي.`

2. `أضف رصيداً أو ادفع مباشرة`  
   `استخدم الرموز عبر المنتجات المختلفة أو ادفع مباشرة باليورو أو الجنيه الإسترليني أو الدولار الأمريكي أو الدرهم الإماراتي.`

3. `استلم ملف الـ PDF`  
   `حمّل الدليل وادرسه بالوتيرة التي تناسبك ضمن هيكل وحدات واضح.`

4. `طوّر خطتك عبر استراتيجيات الذكاء الاصطناعي`  
   `أنشئ خططاً إضافية كلما تطور فهمك واحتياجاتك.`

**Interactions**

- Each step card has a subtle hover (`y -4`, `scale 1.01`).

---

## 10. Tokens and Direct Payments

**Purpose**

- Introduce the token system and direct payment option.
- Educate the user that both models exist and are interchangeable for most flows.

**Layout**

- Section title + paragraph.
- Three `CardStep`-style tiles.

**Copy – EN**

- Title: `Tokens and direct payments.`
- Paragraph: `Pick what’s more convenient: token packs, custom top-ups or direct payments for courses.`

Cards:

1. Token packs  
   - Title: `Token packs`  
   - Text: `Buy predefined token packs and use them across all Avenqor products.`  

2. Custom top-up  
   - Title: `Custom top-up`  
   - Text: `Add any amount to your balance and spend tokens as you go.`  

3. Direct course payments  
   - Title: `Direct course payments`  
   - Text: `Pay for ready-made courses in EUR, GBP, USD or AED at checkout.`  

- Link: `View full pricing & tokens`.

**Copy – AR**

- Title AR: `الرموز وطرق الدفع المباشرة.`
- Paragraph AR: `اختر ما يناسبك أكثر: باقات من الرموز، شحن مخصص للرصيد أو دفع مباشر مقابل الدورات.`

Cards AR:

1. `باقات الرموز`  
   `اشترِ باقات رموز جاهزة واستخدمها عبر جميع منتجات أفِنكور.`

2. `شحن مخصص للرصيد`  
   `أضف أي مبلغ إلى رصيدك واصرف الرموز حسب احتياجك.`

3. `دفع مباشر مقابل الدورات`  
   `ادفع مقابل الدورات الجاهزة باليورو أو الجنيه الإسترليني أو الدولار الأمريكي أو الدرهم الإماراتي عند الدفع.`

Link AR: `عرض التفاصيل الكاملة للأسعار والرموز`

**Interactions**

- Cards hover with small lift and scale.
- Link is a ghost-link CTA.

---

## 11. Glossary and Resources

**Purpose**

- Provide educational support materials:
  - glossary for key terms,
  - resources (checklists and templates).

**Layout**

- Two panels side by side (stack on mobile):
  - Left: Glossary.
  - Right: Resources.

**Copy – EN**

Glossary panel:

- Title: `Glossary`
- Subtitle: `Clear explanations of key Forex, Crypto and Binary terms – without jargon.`
- Example items:
  - `Leverage` – how much exposure you control per unit of capital.
  - `Drawdown` – the peak-to-trough decline of your account.
  - `Risk per trade` – the percentage of capital you put at stake in one idea.
- CTA: `Open full glossary`.

Resources panel:

- Title: `Resources`
- Subtitle: `Printable PDFs and templates to support your daily routine.`
- Example items:
  - `Risk Management Checklist (PDF)` – a step-by-step list to review before any trade.
  - `Position Sizing Template (PDF)` – a simple structure to calculate lot size based on risk.
- CTA: `View all resources`.

**Copy – AR**

Glossary AR:

- Title AR: `قاموس المصطلحات`
- Subtitle AR: `شروحات واضحة لأهم مصطلحات الفوركس والعملات الرقمية والخيارات الثنائية – بدون تعقيد لغوي.`

Example items AR:

- `الرافعة المالية` – مقدار التعرض الذي تتحكم به مقابل كل وحدة من رأس المال.  
- `التراجع (Drawdown)` – نسبة الانخفاض من أعلى قيمة للحساب إلى أدنى قيمة لاحقة.  
- `نسبة المخاطرة في الصفقة` – النسبة المئوية من رأس المال التي تضعها في مخاطرة في فكرة واحدة.  

CTA AR: `فتح القاموس الكامل`

Resources AR:

- Title AR: `الموارد`
- Subtitle AR: `ملفات PDF ونماذج جاهزة لدعم روتينك اليومي في المتابعة.`

Example items AR:

- `قائمة مراجعة إدارة المخاطر (PDF)` – قائمة خطوات تراجعها قبل أي صفقة.  
- `نموذج حساب حجم الصفقة (PDF)` – قالب بسيط لحساب حجم العقد بناءً على نسبة المخاطرة.  

CTA AR: `عرض جميع الموارد`

**Interactions**

- Panels hover with small lift and border accent.

---

## 12. Risk Notice (Risk and Disclaimer teaser)

**Purpose**

- Strong reminder that markets are high risk.
- Clarify that Avenqor does not manage funds or provide advice.
- Link to full Risk & Disclaimer page.

**Layout**

- Single bordered card with amber accent.
- Left: warning icon in a circular container.
- Right: title, paragraph, CTA.

**Copy – EN**

- Title: `High-risk markets require high awareness.`
- Paragraph:  
  `Trading Forex, Crypto and Binary options is highly speculative and can lead to substantial or total loss of capital. Avenqor provides education only. We do not manage funds, execute trades or offer financial advice.`
- CTA: `Read full risk & disclaimer`.

**Copy – AR**

- Title AR: `الأسواق عالية المخاطر تحتاج إلى وعي عالٍ.`
- Paragraph AR:  
  `تداول الفوركس والعملات الرقمية والخيارات الثنائية نشاط عالي المضاربة ويمكن أن يؤدي إلى خسارة كبيرة أو كاملة لرأس المال. أفِنكور يقدم محتوىً تعليمياً فقط، ولا يدير الأموال أو ينفّذ الصفقات أو يقدّم نصائح استثمارية.`  
- CTA AR: `قراءة صفحة المخاطر والتنصل القانونية بالكامل`

**Interactions**

- Hover on CTA link only (text color change).
- Card itself remains stable, minimal motion to keep seriousness.

---

## 13. FAQ

**Purpose**

- Answer the most important clarifying questions about what Avenqor is / is not.
- Further distance the platform from brokers and signal providers.

**Layout**

- Section heading and short intro.
- List of `<details>` accordions, each with question and answer.

**FAQ Items – EN**

1. Q: `Is Avenqor a broker or a signal provider?`  
   A: `No. Avenqor is an educational platform. We do not execute trades, manage funds or provide trading signals.`

2. Q: `Do you guarantee any profit or performance?`  
   A: `No. Markets are unpredictable and high risk. Our focus is on structured education, not on promising outcomes.`

3. Q: `How are custom courses delivered?`  
   A: `You complete a short profile and payment. We prepare a tailored PDF and send it to your email within 48–96 hours.`

4. Q: `What is the difference between a custom course and an AI strategy?`  
   A: `A custom course is a deeper, structured PDF covering multiple modules. An AI strategy is a focused, instantly generated plan with a checklist.`

5. Q: `Which payment options and currencies do you support?`  
   A: `You can use tokens or pay directly in EUR, GBP, USD and AED. Specific payment methods depend on your region.`

**FAQ Items – AR**

1. Q AR: `هل أفِنكور شركة وساطة أو مزوّد إشارات تداول؟`  
   A AR: `لا. أفِنكور منصة تعليمية. لا نقوم بتنفيذ الصفقات أو إدارة الأموال أو تقديم إشارات تداول.`  

2. Q AR: `هل تضمنون أي أرباح أو أداء معيّن؟`  
   A AR: `لا. الأسواق غير متوقعة وعالية المخاطر. تركيزنا على التعليم المنظم، وليس على وعود بتحقيق نتائج.`  

3. Q AR: `كيف يتم تسليم الدورات المخصصة؟`  
   A AR: `تقوم بملء ملف تعريفي قصير وإتمام الدفع. نقوم بإعداد ملف PDF مخصص ونرسله إلى بريدك الإلكتروني خلال ٤٨–٩٦ ساعة.`  

4. Q AR: `ما الفرق بين الدورة المخصصة واستراتيجية الذكاء الاصطناعي؟`  
   A AR: `الدورة المخصصة عبارة عن ملف PDF أعمق ومنظم يضم عدة وحدات. أما استراتيجية الذكاء الاصطناعي فهي خطة مركزة يتم إنشاؤها فوراً مع قائمة مراجعة للمخاطر.`  

5. Q AR: `ما هي طرق الدفع والعملات التي تدعمونها؟`  
   A AR: `يمكنك استخدام الرموز داخل النظام أو الدفع مباشرة باليورو أو الجنيه الإسترليني أو الدولار الأمريكي أو الدرهم الإماراتي. طرق الدفع المتاحة تعتمد على بلد إقامتك.`  

**Interactions**

- `<details>` native accordion behaviour.
- Chevron-like indicator rotates on open (CSS `group-open`).

---

## 14. Footer CTA

**Purpose**

- Final prompt to start with a course or AI plan.
- Repeat main value proposition and non-hype message.

**Layout**

- Card with background and border, two columns on desktop:
  - Left: text.
  - Right: buttons.

**Copy – EN**

- Title: `Start with one course or a single AI plan.`
- Paragraph: `No signals. No promises. Just structured education for Forex, Crypto and Binary markets.`
- Buttons:
  - Primary: `Explore courses`
  - Secondary: `Request custom course`

**Copy – AR**

- Title AR: `ابدأ بدورة واحدة أو خطة ذكاء اصطناعي واحدة.`
- Paragraph AR: `بدون إشارات تداول. بدون وعود. فقط تعليم منظم لأسواق الفوركس والعملات الرقمية والخيارات الثنائية.`

Buttons AR (if localized):

- Primary: `استعرض الدورات`
- Secondary: `اطلب دورة مخصصة`

---

## 15. Footer

**Purpose**

- Provide persistent legal messaging and quick links.
- Re-iterate education-only stance.

**Layout**

- Three columns at desktop; stacked on mobile:
  - Brand + mini disclaimer.
  - Product links.
  - Legal links.

**Copy – EN**

Brand block:

- `Avenqor`
- `Avenqor provides education only. We do not offer financial advice.`

Product links:

- `Courses`
- `Custom course`
- `AI Strategy`
- `Glossary`
- `Resources`

Legal links:

- `Risk & Disclaimer`
- `Terms & Conditions`
- `Privacy Policy`
- `Cookies`
- `Contact`

**Copy – AR**

Brand block AR:

- `أفِنكور`
- `أفِنكور يقدّم محتوىً تعليمياً فقط ولا يقدّم نصائح مالية.`

Links AR can be localised as needed:

- `الدورات`
- `دورة مخصصة`
- `استراتيجية الذكاء الاصطناعي`
- `قاموس المصطلحات`
- `الموارد`
- `المخاطر والتنصل القانوني`
- `الشروط والأحكام`
- `سياسة الخصوصية`
- `ملفات تعريف الارتباط`
- `اتصل بنا`

---

## 16. Motion Summary for Home Page

Use Framer Motion consistently:

- `<Section>`:
  - initial: `{ opacity: 0, y: 24 }`
  - animate when in view: `{ opacity: 1, y: 0 }`
  - transition: `duration 0.35–0.45, ease: "easeOut"`, `once: true`.

- Cards (`CardCourse`, `CardPath`, `CardStep`, Glossary/Resources tiles, Tokens tiles):
  - whileHover:
    - `y: -4` to `-6`,
    - `scale: 1.01` to `1.02` (not on course grid if it causes layout jitter).
  - transition:
    - `{ type: "spring", stiffness: 240–260, damping: 20–22 }`.

- Hero slideshow:
  - Changing slides:
    - initial: `{ opacity: 0, y: 12 }`
    - animate: `{ opacity: 1, y: 0 }`
    - `duration ~0.35`, `easeOut`.
  - Auto-rotate interval: ~6000ms.

Buttons and links:

- Hover: 120–180ms transition, `ease-out`.
- Make sure primary CTA buttons have a clear focus style as well.

---

## 17. Notes for AI in Cursor

When generating or editing the home page:

1. Do not change the overall section order unless explicitly requested.
2. Keep **risk and education-only messaging** intact and clearly visible (Hero, Risk Notice, Footer).
3. Preserve the copy semantics when translating to AR; do not weaken risk statements.
4. Use the colors and typography from `design-system.avenqor.md`.
5. When adding new cards or content, follow the same structural patterns:
   - heading sizes,
   - spacing,
   - hover behaviour,
   - scroll-in animation.
6. When in doubt between marketing hype and sober clarity, always choose clarity.
