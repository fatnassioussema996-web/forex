
# Avenqor i18n Content & Structure

File: `i18n-content.avenqor.md`  
Version: 0.1  
Scope: Language, direction and content keys for EN / AR localisation.

---

## 1. Goals

- Support **two locales**:
  - `en` – primary, default.
  - `ar` – Modern Standard Arabic, RTL.
- Keep **routes the same** for both languages (no `/en` or `/ar` prefix in v1).
- Make it easy for:
  - Next.js app to switch languages at runtime.
  - AI assistants (Cursor) to **reuse existing keys** instead of hardcoding strings.
- Ensure all **risk / education-only messaging** is consistent across locales.

---

## 2. Locale and Direction Model

### 2.1 Locales

Supported locales:

- `en` – English (primary content language, used for all new copy first).
- `ar` – Arabic (Modern Standard, business-formal tone).

### 2.2 Direction

- `en` → `dir="ltr"`
- `ar` → `dir="rtl"`

Implementation guideline:

- At app root (e.g. `<html>` or `<body>`), set:

  - `lang={locale}`
  - `dir={locale === "ar" ? "rtl" : "ltr"}`

- For components like `Header`, `Footer`, `Section`, do not hardcode direction; inherit from root.
- For layouts with grid, use utility classes that are direction-agnostic wherever possible (`gap`, `justify-between`, `space-y-*` instead of `ml-*`/`mr-*`).

---

## 3. Namespaces and Files

Suggested structure:

```text
i18n/
  en/
    common.json
    home.json
    learn.json
    pricing.json
    courses.json
    dashboard.json
    legal.json
    faq.json
  ar/
    common.json
    home.json
    learn.json
    pricing.json
    courses.json
    dashboard.json
    legal.json
    faq.json
```

**Namespaces (purpose):**

- `common` – navigation, footer, shared labels, buttons.
- `home` – hero, sections, CTAs used only on `/`.
- `learn` – copy for `/learn` (Custom course / AI Strategy tabs).
- `pricing` – copy for `/pricing` (token packs, top-up, explanations).
- `courses` – listing and detail page generic strings.
- `dashboard` – headings, sidebar labels, empty states.
- `legal` – headings for Risk & Disclaimer, Terms, Privacy, Cookies.
- `faq` – FAQ headings and generic patterns.

---

## 4. Key Naming Conventions

General pattern:

- Use **flat keys** in each namespace where possible.
- Use **camelCase** for key names.
- For lists (cards, steps, FAQs), use arrays.

Example patterns:

- `home.hero.title`
- `home.hero.subtitle`
- `home.hero.ctaPrimaryLabel`
- `home.paths.items[0].title`

For JSON files:

- No dots inside keys; dots are logical, not literal.

Example:

```jsonc
// home.json
{
  "hero": {
    "title": "...",
    "subtitle": "...",
    "ctaPrimaryLabel": "...",
    "ctaSecondaryLabel": "..."
  }
}
```

---

## 5. `common.json` – Shared Strings

### 5.1 `en/common.json` (core keys)

```jsonc
{
  "brand": {
    "name": "Avenqor",
    "tagline": "Education only"
  },
  "nav": {
    "courses": "Courses",
    "customCourse": "Custom course",
    "aiStrategy": "AI Strategy",
    "pricing": "Pricing",
    "glossary": "Glossary",
    "resources": "Resources",
    "faq": "FAQ",
    "about": "About",
    "contact": "Contact"
  },
  "auth": {
    "signIn": "Sign in",
    "getStarted": "Get started"
  },
  "currency": {
    "gbp": "GBP",
    "eur": "EUR",
    "usd": "USD",
    "aed": "AED"
  },
  "language": {
    "en": "EN",
    "ar": "AR"
  },
  "footer": {
    "educationOnlyLine": "Avenqor provides education only. We do not offer financial advice.",
    "productsTitle": "Products",
    "legalTitle": "Legal",
    "links": {
      "riskDisclaimer": "Risk & Disclaimer",
      "terms": "Terms & Conditions",
      "privacy": "Privacy Policy",
      "cookies": "Cookies",
      "contact": "Contact"
    }
  },
  "buttons": {
    "viewAllCourses": "View all courses",
    "viewFullPricing": "View full pricing & tokens",
    "openFullGlossary": "Open full glossary",
    "viewAllResources": "View all resources",
    "readFullRiskDisclaimer": "Read full risk & disclaimer"
  },
  "badges": {
    "educationOnly": "Education only",
    "deliveredByEmail": "Delivered via email",
    "instant": "Instant"
  }
}
```

### 5.2 `ar/common.json` (core keys)

```jsonc
{
  "brand": {
    "name": "أفِنكور",
    "tagline": "لأغراض تعليمية فقط"
  },
  "nav": {
    "courses": "الدورات",
    "customCourse": "دورة مخصصة",
    "aiStrategy": "استراتيجية الذكاء الاصطناعي",
    "pricing": "الأسعار",
    "glossary": "قاموس المصطلحات",
    "resources": "الموارد",
    "faq": "الأسئلة الشائعة",
    "about": "من نحن",
    "contact": "اتصل بنا"
  },
  "auth": {
    "signIn": "تسجيل الدخول",
    "getStarted": "ابدأ الآن"
  },
  "currency": {
    "gbp": "GBP",
    "eur": "EUR",
    "usd": "USD",
    "aed": "AED"
  },
  "language": {
    "en": "EN",
    "ar": "AR"
  },
  "footer": {
    "educationOnlyLine": "أفِنكور يقدّم محتوىً تعليمياً فقط ولا يقدّم نصائح مالية.",
    "productsTitle": "المنتجات",
    "legalTitle": "الشؤون القانونية",
    "links": {
      "riskDisclaimer": "المخاطر والتنصل القانوني",
      "terms": "الشروط والأحكام",
      "privacy": "سياسة الخصوصية",
      "cookies": "ملفات تعريف الارتباط",
      "contact": "اتصل بنا"
    }
  },
  "buttons": {
    "viewAllCourses": "استعرض جميع الدورات",
    "viewFullPricing": "عرض التفاصيل الكاملة للأسعار والرموز",
    "openFullGlossary": "فتح القاموس الكامل",
    "viewAllResources": "عرض جميع الموارد",
    "readFullRiskDisclaimer": "قراءة صفحة المخاطر والتنصل القانونية بالكامل"
  },
  "badges": {
    "educationOnly": "لأغراض تعليمية فقط",
    "deliveredByEmail": "تُرسل عبر البريد الإلكتروني",
    "instant": "فوري"
  }
}
```

---

## 6. `home.json` – Home Page Content

### 6.1 `en/home.json`

```jsonc
{
  "hero": {
    "badgeLeft": "Avenqor Club",
    "badgeRight": "Education only",
    "title": "Premium education for high-risk markets.",
    "subtitle": "Structured Forex, Crypto and Binary options courses with custom PDFs and AI-generated strategies. No signals, no promises – just clear learning paths.",
    "ctaPrimaryLabel": "Explore courses",
    "ctaSecondaryLabel": "Request custom course",
    "bullets": [
      "No financial advice – education only.",
      "Courses delivered as structured PDFs.",
      "AI strategies with token-based access."
    ]
  },
  "heroSlideshow": {
    "labelTop": "Featured today",
    "labelSub": "Selected Avenqor courses",
    "ctaViewCourse": "View course",
    "slideCounterPrefix": "Slide",
    "slideCounterOf": "of",
    "slides": [
      {
        "level": "Beginner",
        "market": "Forex",
        "title": "Forex Foundations: From Zero to First Trade",
        "summary": "A base in core concepts, order types and risk per trade."
      },
      {
        "level": "Intermediate",
        "market": "Crypto",
        "title": "Crypto Volatility Structures",
        "summary": "Volatility cycles, liquidity zones and structured approaches to managing major crypto pairs."
      },
      {
        "level": "Advanced",
        "market": "Binary",
        "title": "Binary Risk & Payout Geometry",
        "summary": "Payout curves, risk stacking and the structure of binary exposure."
      }
    ]
  },
  "marketSnapshot": {
    "title": "Market snapshot",
    "subtitle": "Live prices from major markets to support your learning. Avenqor never provides trading signals or investment advice.",
    "disclaimer": "Data is shown for educational purposes only.",
    "widgetHint": "Data widget placeholder (TradingView).",
    "chartHint": "Real-time BTC / FX chart placeholder"
  },
  "featuredCourses": {
    "title": "Courses designed for clarity, not hype.",
    "subtitle": "Choose by market and level. Each course is a structured PDF you can study at your own pace.",
    "ctaViewAll": "View all courses",
    "filtersLabel": "Filters",
    "levelFilters": ["All", "Beginner", "Intermediate", "Advanced"],
    "marketFilters": ["Forex", "Crypto", "Binary"]
  },
  "paths": {
    "title": "Three ways to learn with Avenqor.",
    "subtitle": "Pick the format that fits your current stage and time.",
    "items": [
      {
        "title": "Structured PDF courses",
        "text": "Pre-built learning paths for Forex, Crypto and Binary, organised by level.",
        "cta": "Browse courses"
      },
      {
        "title": "Custom course by a pro trader",
        "text": "Share your experience, deposit size, risk tolerance and goals. Receive a tailored PDF within 48–96 hours.",
        "badge": "Delivered via email",
        "cta": "Request custom course"
      },
      {
        "title": "AI strategy in seconds",
        "text": "Generate a structured trading plan with entry/exit logic and a risk checklist, based on your inputs.",
        "badge": "Instant",
        "cta": "Open AI Strategy Builder"
      }
    ]
  },
  "howItWorks": {
    "title": "How Avenqor fits into your learning.",
    "subtitle": "A simple sequence that keeps education and risk awareness at the center.",
    "steps": [
      {
        "title": "Define your path",
        "text": "Choose between ready-made courses, a custom PDF or an AI-generated strategy."
      },
      {
        "title": "Add balance or pay directly",
        "text": "Use tokens across products or pay in EUR, GBP, USD or AED at checkout."
      },
      {
        "title": "Get your PDF",
        "text": "Download and study at your own pace with a clear module structure."
      },
      {
        "title": "Refine with AI strategies",
        "text": "Generate additional AI plans as your understanding and needs evolve."
      }
    ]
  },
  "tokensTeaser": {
    "title": "Tokens and direct payments.",
    "subtitle": "Pick what’s more convenient: token packs, custom top-ups or direct payments for courses.",
    "items": [
      {
        "title": "Token packs",
        "text": "Buy predefined token packs and use them across all Avenqor products."
      },
      {
        "title": "Custom top-up",
        "text": "Add any amount to your balance and spend tokens as you go."
      },
      {
        "title": "Direct course payments",
        "text": "Pay for ready-made courses in EUR, GBP, USD or AED at checkout."
      }
    ],
    "ctaPricing": "View full pricing & tokens"
  },
  "glossaryResources": {
    "glossary": {
      "title": "Glossary",
      "subtitle": "Clear explanations of key Forex, Crypto and Binary terms – without jargon.",
      "items": [
        {
          "term": "Leverage",
          "definition": "How much exposure you control per unit of capital."
        },
        {
          "term": "Drawdown",
          "definition": "The peak-to-trough decline of your account."
        },
        {
          "term": "Risk per trade",
          "definition": "The percentage of capital you put at stake in one idea."
        }
      ],
      "cta": "Open full glossary"
    },
    "resources": {
      "title": "Resources",
      "subtitle": "Printable PDFs and templates to support your daily routine.",
      "items": [
        {
          "label": "Risk Management Checklist (PDF)",
          "definition": "A step-by-step list to review before any trade."
        },
        {
          "label": "Position Sizing Template (PDF)",
          "definition": "A simple structure to calculate lot size based on risk."
        }
      ],
      "cta": "View all resources"
    }
  },
  "riskNotice": {
    "title": "High-risk markets require high awareness.",
    "body": "Trading Forex, Crypto and Binary options is highly speculative and can lead to substantial or total loss of capital. Avenqor provides education only. We do not manage funds, execute trades or offer financial advice.",
    "cta": "Read full risk & disclaimer"
  },
  "faq": {
    "title": "Frequently asked questions",
    "subtitle": "Key points about what Avenqor is – and what it is not."
  },
  "footerCta": {
    "title": "Start with one course or a single AI plan.",
    "subtitle": "No signals. No promises. Just structured education for Forex, Crypto and Binary markets.",
    "ctaPrimary": "Explore courses",
    "ctaSecondary": "Request custom course"
  }
}
```

### 6.2 `ar/home.json`

Arabic equivalents, preserving structure and risk tone:

```jsonc
{
  "hero": {
    "badgeLeft": "نادي أفِنكور",
    "badgeRight": "لأغراض تعليمية فقط",
    "title": "تعليم متميز لأسواق عالية المخاطر.",
    "subtitle": "دورات منظمة في الفوركس والعملات الرقمية والخيارات الثنائية، مع ملفات PDF مخصصة واستراتيجيات يتم إنشاؤها بالذكاء الاصطناعي. بدون إشارات تداول وبدون وعود بالأرباح – فقط مسارات تعليمية واضحة.",
    "ctaPrimaryLabel": "استعرض الدورات",
    "ctaSecondaryLabel": "اطلب دورة مخصصة",
    "bullets": [
      "ليست نصيحة مالية – محتوى تعليمي فقط.",
      "الدورات تُقدَّم كملفات PDF منظمة.",
      "استراتيجيات بالذكاء الاصطناعي تعتمد على رصيد الرموز."
    ]
  },
  "heroSlideshow": {
    "labelTop": "مختارات اليوم",
    "labelSub": "دورات مختارة من أفِنكور",
    "ctaViewCourse": "عرض الدورة",
    "slideCounterPrefix": "شريحة",
    "slideCounterOf": "من",
    "slides": [
      {
        "level": "مبتدئ",
        "market": "الفوركس",
        "title": "أساسيات الفوركس: من الصفر إلى أول صفقة",
        "summary": "قاعدة في المفاهيم الأساسية وأنواع الأوامر وحجم المخاطرة في كل صفقة."
      },
      {
        "level": "متوسط",
        "market": "العملات الرقمية",
        "title": "هياكل تقلبات العملات الرقمية",
        "summary": "دورات التقلب ومناطق السيولة ونهج منظم للتعامل مع أزواج العملات الرقمية الرئيسية."
      },
      {
        "level": "متقدم",
        "market": "الخيارات الثنائية",
        "title": "مخاطر الخيارات الثنائية وهندسة العوائد",
        "summary": "منحنيات العائد، تكديس المخاطر وكيفية هيكلة التعرض في الخيارات الثنائية."
      }
    ]
  },
  "marketSnapshot": {
    "title": "لمحة عن السوق",
    "subtitle": "أسعار لحظية من أهم الأسواق لدعم تجربتك التعليمية. أفِنكور لا يقدّم إشارات تداول أو نصائح استثمارية.",
    "disclaimer": "يُعرض هذا البيانات لأغراض تعليمية فقط.",
    "widgetHint": "عنصر واجهة بيانات (TradingView) – موضع مؤقت.",
    "chartHint": "منطقة مخطط لحظي لزوج BTC / أزواج الفوركس – موضع مؤقت."
  },
  "featuredCourses": {
    "title": "دورات مصممة للوضوح، لا للضجيج.",
    "subtitle": "اختر حسب السوق ومستوى الخبرة. كل دورة عبارة عن ملف PDF منظم يمكنك دراسته بالوتيرة التي تناسبك.",
    "ctaViewAll": "استعرض جميع الدورات",
    "filtersLabel": "عوامل التصفية",
    "levelFilters": ["الكل", "مبتدئ", "متوسط", "متقدم"],
    "marketFilters": ["الفوركس", "العملات الرقمية", "الخيارات الثنائية"]
  },
  "paths": {
    "title": "ثلاث طرق للتعلم مع أفِنكور.",
    "subtitle": "اختر الصيغة التي تناسب مستواك الحالي ووقتك المتاح.",
    "items": [
      {
        "title": "دورات PDF منظمة",
        "text": "مسارات تعليمية جاهزة للفوركس والعملات الرقمية والخيارات الثنائية، مصنّفة حسب مستوى الخبرة.",
        "cta": "استعرض الدورات"
      },
      {
        "title": "دورة مخصصة يعدّها متداول محترف",
        "text": "شارك خبرتك الحالية وحجم الإيداع ومستوى المخاطرة المفضل وأهدافك. ستحصل على ملف PDF مخصص خلال ٤٨–٩٦ ساعة.",
        "badge": "تُرسل عبر البريد الإلكتروني",
        "cta": "اطلب دورة مخصصة"
      },
      {
        "title": "استراتيجية بالذكاء الاصطناعي في ثوانٍ",
        "text": "أنشئ خطة تداول منظمة مع منطق نقاط الدخول والخروج وقائمة مراجعة للمخاطر، بناءً على مدخلاتك.",
        "badge": "فوري",
        "cta": "فتح أداة استراتيجية الذكاء الاصطناعي"
      }
    ]
  },
  "howItWorks": {
    "title": "كيف يندمج أفِنكور مع رحلة تعلمك.",
    "subtitle": "تسلسل بسيط يضع التعليم والوعي بالمخاطر في المركز.",
    "steps": [
      {
        "title": "حدّد مسارك",
        "text": "اختر بين الدورات الجاهزة أو ملف PDF مخصص أو استراتيجية يتم إنشاؤها بالذكاء الاصطناعي."
      },
      {
        "title": "أضف رصيداً أو ادفع مباشرة",
        "text": "استخدم الرموز عبر المنتجات المختلفة أو ادفع مباشرة باليورو أو الجنيه الإسترليني أو الدولار الأمريكي أو الدرهم الإماراتي."
      },
      {
        "title": "استلم ملف الـ PDF",
        "text": "حمّل الدليل وادرسه بالوتيرة التي تناسبك ضمن هيكل وحدات واضح."
      },
      {
        "title": "طوّر خطتك عبر استراتيجيات الذكاء الاصطناعي",
        "text": "أنشئ خططاً إضافية كلما تطور فهمك واحتياجاتك."
      }
    ]
  },
  "tokensTeaser": {
    "title": "الرموز وطرق الدفع المباشرة.",
    "subtitle": "اختر ما يناسبك أكثر: باقات من الرموز، شحن مخصص للرصيد أو دفع مباشر مقابل الدورات.",
    "items": [
      {
        "title": "باقات الرموز",
        "text": "اشترِ باقات رموز جاهزة واستخدمها عبر جميع منتجات أفِنكور."
      },
      {
        "title": "شحن مخصص للرصيد",
        "text": "أضف أي مبلغ إلى رصيدك واصرف الرموز حسب احتياجك."
      },
      {
        "title": "دفع مباشر مقابل الدورات",
        "text": "ادفع مقابل الدورات الجاهزة باليورو أو الجنيه الإسترليني أو الدولار الأمريكي أو الدرهم الإماراتي عند الدفع."
      }
    ],
    "ctaPricing": "عرض التفاصيل الكاملة للأسعار والرموز"
  },
  "glossaryResources": {
    "glossary": {
      "title": "قاموس المصطلحات",
      "subtitle": "شروحات واضحة لأهم مصطلحات الفوركس والعملات الرقمية والخيارات الثنائية – بدون تعقيد لغوي.",
      "items": [
        {
          "term": "الرافعة المالية",
          "definition": "مقدار التعرض الذي تتحكم به مقابل كل وحدة من رأس المال."
        },
        {
          "term": "التراجع (Drawdown)",
          "definition": "نسبة الانخفاض من أعلى قيمة للحساب إلى أدنى قيمة لاحقة."
        },
        {
          "term": "نسبة المخاطرة في الصفقة",
          "definition": "النسبة المئوية من رأس المال التي تضعها في مخاطرة في فكرة واحدة."
        }
      ],
      "cta": "فتح القاموس الكامل"
    },
    "resources": {
      "title": "الموارد",
      "subtitle": "ملفات PDF ونماذج جاهزة لدعم روتينك اليومي في المتابعة.",
      "items": [
        {
          "label": "قائمة مراجعة إدارة المخاطر (PDF)",
          "definition": "قائمة خطوات تراجعها قبل أي صفقة."
        },
        {
          "label": "نموذج حساب حجم الصفقة (PDF)",
          "definition": "قالب بسيط لحساب حجم العقد بناءً على نسبة المخاطرة."
        }
      ],
      "cta": "عرض جميع الموارد"
    }
  },
  "riskNotice": {
    "title": "الأسواق عالية المخاطر تحتاج إلى وعي عالٍ.",
    "body": "تداول الفوركس والعملات الرقمية والخيارات الثنائية نشاط عالي المضاربة ويمكن أن يؤدي إلى خسارة كبيرة أو كاملة لرأس المال. أفِنكور يقدم محتوىً تعليمياً فقط، ولا يدير الأموال أو ينفّذ الصفقات أو يقدّم نصائح استثمارية.",
    "cta": "قراءة صفحة المخاطر والتنصل القانونية بالكامل"
  },
  "faq": {
    "title": "الأسئلة الشائعة",
    "subtitle": "نقاط أساسية توضح ما هو أفِنكور – وما ليس هو عليه."
  },
  "footerCta": {
    "title": "ابدأ بدورة واحدة أو خطة ذكاء اصطناعي واحدة.",
    "subtitle": "بدون إشارات تداول. بدون وعود. فقط تعليم منظم لأسواق الفوركس والعملات الرقمية والخيارات الثنائية.",
    "ctaPrimary": "استعرض الدورات",
    "ctaSecondary": "اطلب دورة مخصصة"
  }
}
```

---

## 7. Other Namespaces (Outline Only)

For brevity, other namespaces (`learn`, `pricing`, `courses`, `dashboard`, `legal`, `faq`) should follow the same pattern:

- Group by section (e.g. `forms`, `steps`, `emptyStates`).
- Keep **keys stable**, even if wording changes.
- Always mirror structure between `en` and `ar`.

Example sketch for `en/learn.json`:

```jsonc
{
  "tabs": {
    "customCourse": "Custom course",
    "aiStrategy": "AI Strategy"
  },
  "customCourse": {
    "title": "Custom course by a pro trader",
    "intro": "Share your profile and objectives. Receive a tailored PDF within 48–96 hours.",
    "sections": {
      "profile": "Your profile",
      "context": "Your context",
      "delivery": "Delivery and consent"
    },
    "fields": {
      "experience": "Experience",
      "depositBudget": "Approximate deposit (EUR/GBP/USD/AED)",
      "riskTolerance": "Risk tolerance",
      "markets": "Markets",
      "tradingStyle": "Trading style",
      "timeCommitment": "Time commitment",
      "objective": "What do you want to achieve with this course?",
      "notes": "Additional notes",
      "email": "Email for delivery",
      "language": "Preferred language"
    },
    "consent": {
      "educationOnly": "I understand that Avenqor provides education only and does not offer financial advice.",
      "terms": "I agree to the Terms & Conditions and Risk & Disclaimer."
    },
    "cta": "Continue to payment"
  }
}
```

(Arabic version mirrors keys but uses AR strings.)

---

## 8. Implementation Notes for Cursor

When AI in Cursor works with localisation:

1. **Do not hardcode** English strings in components:
   - use hooks like `t("home.hero.title")` or equivalent.
2. Respect `dir` changes:
   - do not fix paddings/margins as `ml-*`/`mr-*` when both sides appear; use symmetrical spacing where possible.
3. When adding new copy:
   - define keys in English namespace,
   - add **placeholder** values in Arabic with a `TODO` comment if translation is unknown.
4. Never weaken or omit:
   - risk warnings,
   - education-only disclaimers,
   - differences between Avenqor and brokers/signal providers.
5. Keep array order identical between `en` and `ar` so UI logic relying on index does not break (cards, steps, slides, etc.).
