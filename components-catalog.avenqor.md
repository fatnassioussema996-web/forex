
# Avenqor Components Catalog

File: `components-catalog.avenqor.md`  
Version: 0.1  
Scope: Shared React + Tailwind components for Avenqor (marketing pages and early flows)

This document lists the **main UI components**, their purpose, props and usage patterns. It is meant for developers and AI assistants (Cursor) to **reuse existing building blocks** instead of reinventing UI per page.

The catalog focuses on:

- marketing pages (home, courses, pricing, glossary, resources),
- learning flows (custom course form, AI strategy),
- basic shells for dashboard and auth (high-level).

Code examples are **TypeScript-flavoured** but can be adapted.

---

## 1. Layout Primitives

### 1.1 `<Section>`

**Purpose**

- Wraps each page section in a centered container with max width and padding.
- Handles scroll-in animation via Framer Motion.

**Location (suggested)**

- `src/components/layout/Section.tsx`

**Props**

```ts
type SectionProps = {
  children: React.ReactNode;
  className?: string; // extra layout/padding/spacing classes for inner wrapper
  as?: keyof JSX.IntrinsicElements; // optional semantic tag, default "section"
};
```

**Behaviour**

- Centers content with `max-w-6xl` and responsive `px-4 sm:px-6 lg:px-8`.
- Uses `motion.div` and `useInView`:
  - `initial={{ opacity: 0, y: 24 }}`
  - `animate={{ opacity: 1, y: 0 }}` when in view
  - `transition={{ duration: 0.35–0.45, ease: "easeOut" }}`

**Usage**

- Wrap every major section (`Hero`, `MarketSnapshot`, `FeaturedCourses`, etc.).
- Do not nest Sections inside Sections.

---

### 1.2 `<PageShell>`

**Purpose**

- Base shell for marketing pages:
  - background gradients,
  - video/visual layer (future),
  - header and footer inclusion.

**Location (suggested)**

- `src/components/layout/PageShell.tsx`

**Props**

```ts
type PageShellProps = {
  children: React.ReactNode;
};
```

**Behaviour**

- Sets:
  - `min-h-screen`,
  - dark gradient background,
  - radial glows layer (as in home preview),
  - optional slot for global toasts.

**Usage**

- Used inside `MainLayout`.
- Home, Courses, Pricing and other public pages render their content as children.

---

## 2. Navigation Components

### 2.1 `<Header>`

**Purpose**

- Sticky top navigation for marketing pages.

**Location**

- `src/components/navigation/Header.tsx`

**Props**

```ts
type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  navItems: NavItem[];
  onSignInClick?: () => void;
  onGetStartedClick?: () => void;
};
```

**Structure**

- Left: logo + brand
  - Logo square with `AV` letters and cyan/blue gradient.
  - Text: `Avenqor` and `Education only` label.

- Center: horizontal nav (hidden on small screens).
- Right: currency switcher, language toggle, `Sign in`, `Get started`.

**Styling**

- Sticky: `sticky top-0 z-30`.
- Background: `bg-slate-950/80 backdrop-blur-xl`.
- Border: `border-b border-slate-900/80`.

---

### 2.2 `<CurrencySwitcher>`

**Purpose**

- Allow user to view prices in different currencies.
- Initial implementation: visual only.

**Location**

- `src/components/navigation/CurrencySwitcher.tsx`

**Props**

```ts
type Currency = "GBP" | "EUR" | "USD" | "AED";

type CurrencySwitcherProps = {
  value: Currency;
  onChange?: (currency: Currency) => void; // optional in preview-only
};
```

**Behaviour**

- For MVP, can be implemented as:
  - pill group (as in home preview), or
  - compact dropdown (`select`) in production.
- In design, it appears as pill group with active highlight.

---

### 2.3 `<LanguageToggle>`

**Purpose**

- Switch between EN and AR locales.

**Props**

```ts
type Language = "en" | "ar";

type LanguageToggleProps = {
  value: Language;
  onChange?: (language: Language) => void;
};
```

**Behaviour**

- Visual pill with `EN` and `AR`.
- In production:
  - updates i18n provider,
  - toggles `dir="rtl"` for Arabic.

---

### 2.4 `<Footer>`

**Purpose**

- Shared footer for marketing pages with mini disclaimer and key links.

**Props**

```ts
type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  productLinks: FooterLink[];
  legalLinks: FooterLink[];
};
```

**Content**

- Brand block:
  - `Avenqor`
  - `Avenqor provides education only. We do not offer financial advice.`
- Product links: Courses, Custom course, AI Strategy, Glossary, Resources.
- Legal links: Risk & Disclaimer, Terms, Privacy, Cookies, Contact.

---

## 3. Buttons and Badges

### 3.1 `<ButtonPrimary>`

**Purpose**

- Main CTAs (Explore courses, Get started, Request custom course, etc.).

**Props**

```ts
type ButtonPrimaryProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  leadingIcon?: React.ReactNode;
  loading?: boolean;
};
```

**Styles**

- `rounded-full bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm px-4 sm:px-4 py-2`
- Hover: `hover:bg-cyan-300`
- Shadow: `shadow-[0_14px_32px_rgba(8,145,178,0.65)]`

---

### 3.2 `<ButtonSecondary>`

**Purpose**

- Secondary CTAs (Request custom course where primary is Explore courses, etc.).

**Props**

- Same as `ButtonPrimary`.

**Styles**

- `rounded-full border border-slate-700 text-slate-100 bg-transparent text-xs sm:text-sm px-4 py-2`
- Hover: `hover:border-slate-500`

---

### 3.3 `<ButtonGhostLink>`

**Purpose**

- Inline text CTAs (“View all courses”, “Read full risk & disclaimer”).

**Props**

```ts
type ButtonGhostLinkProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
```

**Styles**

- `inline-flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200`

---

### 3.4 `<BadgePill>`

**Purpose**

- Small badges for hero, status labels and meta.

**Props**

```ts
type BadgePillProps = {
  children: React.ReactNode;
  tone?: "neutral" | "info" | "warning" | "success";
};
```

**Usage Examples**

- `Avenqor Club`
- `Education only`
- `Delivered via email`
- Levels and markets when not using specific meta chips.

---

### 3.5 `<MetaChip>`

**Purpose**

- Small chips used inside cards for level, market and format.

**Props**

```ts
type MetaChipProps = {
  label: string;
};
```

**Usage**

- `Beginner`, `Intermediate`, `Advanced`.
- `Forex`, `Crypto`, `Binary`.
- `PDF`.

---

## 4. Content Cards

### 4.1 `<CardCourse>`

**Purpose**

- Display a course in grids and lists (home, /courses listing, dashboard library).

**Props**

```ts
type Level = "Beginner" | "Intermediate" | "Advanced";
type Market = "Forex" | "Crypto" | "Binary";

type CardCourseProps = {
  level: Level;
  market: Market;
  title: string;
  description: string;
  priceLabel: string;    // e.g. "€79"
  tokensLabel?: string;  // e.g. "≈ 7 900 tokens"
  onClickDetails?: () => void;
  hrefDetails?: string;  // alternative to handler
  coverLabel?: string;   // e.g. "Course cover (Sora image)"
};
```

**Structure**

- Cover: 16:9, gradient background, placeholder text or Sora image.
- Meta chips: level, market, `PDF`.
- Body: icon (`BookOpen`), title, description.
- Footer: price, tokens, inline “View details” CTA.

**Usage**

- On home page: 3-featured courses.
- On `/courses`: grid of many courses.
- In dashboard: variant with “Open PDF” button.

---

### 4.2 `<CardPath>`

**Purpose**

- Represent one of the three learning paths (structured courses, custom course, AI strategy).

**Props**

```ts
type CardPathProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
  ctaLabel: string;
  href?: string;
};
```

**Behaviour**

- Hover motion:
  - `whileHover={{ y: -6, scale: 1.02 }}`
  - spring transition.
- Used on home page “Three ways to learn with Avenqor”.

---

### 4.3 `<CardStep>`

**Purpose**

- Small step card used in “How Avenqor fits into your learning” and “Tokens & payments”.

**Props**

```ts
type CardStepProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};
```

**Structure**

- Icon in small circle.
- Title and short description.

---

### 4.4 `<CardToken>`

**Purpose**

- Specific variant of `CardStep` for token information (token packs, top-up, direct payments).

**Props**

- Can reuse `CardStepProps` or extend with meta like “Recommended”.

---

### 4.5 `<CardGlossary>` & `<CardResource>`

**Purpose**

- Glossary teaser and resources teaser on home and on their dedicated pages.

**Props**

```ts
type CardGlossaryProps = {
  title: string;
  description: string;
  items: { term: string; explanation: string }[];
  ctaLabel: string;
  href?: string;
};

type CardResourceProps = {
  title: string;
  description: string;
  items: { label: string; explanation: string }[];
  ctaLabel: string;
  href?: string;
};
```

**Usage**

- Home page teaser (as in preview).
- On `/glossary` and `/resources` we may reuse styles but with more content.

---

### 4.6 `<CardRiskNotice>`

**Purpose**

- Strong warning card with amber border and risk text.

**Props**

```ts
type CardRiskNoticeProps = {
  title: string;
  body: string;
  ctaLabel: string;
  href?: string;
};
```

**Structure**

- Icon (`AlertTriangle`) in amber circle.
- Title + body text.
- Ghost-link CTA to `/risk-and-disclaimer`.

---

### 4.7 `<FaqItem>` / `<FaqList>`

**Purpose**

- Collapsible FAQ item list.

**Props**

```ts
type FaqItemProps = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: FaqItemProps[];
};
```

**Behaviour**

- Uses `<details>` + `<summary>` or a custom accordion.
- Chevron rotates on open (`group-open:rotate-90`).

---

### 4.8 `<HeroSlideshow>`

**Purpose**

- Right side of Hero, showing rotating featured courses.

**Props**

```ts
type HeroSlide = {
  level: Level;
  market: Market;
  title: string;
  summary: string;
};

type HeroSlideshowProps = {
  slides: HeroSlide[];
  autoRotateMs?: number; // default 6000
};
```

**Behaviour**

- Auto-rotate through slides with interval.
- Manual selection via dots/bars.
- Slide transition: fade + up motion (`opacity 0→1`, `y 12→0`).

---

### 4.9 `<MarketSnapshot>`

**Purpose**

- Display short explanation + placeholder/real widget with a chart (BTC / FX).

**Props**

```ts
type MarketSnapshotProps = {
  title?: string;
  description?: string;
  disclaimer?: string;
  children?: React.ReactNode; // chart widget slot
};
```

**Usage**

- Home page “Market snapshot” section.
- Future: might be reused on dashboard.

---

## 5. Form Components (Custom Course & AI Strategy)

These will be primarily used on `/learn` (tabbed page).

### 5.1 `<TextField>`

**Purpose**

- Standard text input for name, email, deposit size (text or number).

**Props**

Use a thin wrapper around `<input>`:

```ts
type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};
```

**Behaviour**

- Dark styling as in design system.
- Shows helper text and error below.

---

### 5.2 `<TextArea>`

**Purpose**

- For free-form answers (“What do you want to achieve?”).

**Props**

```ts
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};
```

---

### 5.3 `<PillToggleGroup>`

**Purpose**

- Select a single option from a small set (experience level, risk level, trading style).

**Props**

```ts
type PillOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

type PillToggleGroupProps<T extends string> = {
  label?: string;
  options: PillOption<T>[];
  value: T;
  onChange: (next: T) => void;
};
```

**Examples**

- Experience: `0 / 1–2 / 3+ years`
- Risk: `Low / Medium / High`
- Style: `Scalp / Day / Swing`

---

### 5.4 `<ToggleChipsGroup>`

**Purpose**

- Multi-select for markets and instruments.

**Props**

```ts
type ToggleChipsGroupProps<T extends string> = {
  label?: string;
  options: PillOption<T>[];
  values: T[];
  onChange: (next: T[]) => void;
};
```

**Examples**

- Markets: `Forex`, `Crypto`, `Binary` (user may choose multiple).
- Instruments (later): `Majors`, `Altcoins`, etc.

---

### 5.5 `<CheckboxField>`

**Purpose**

- Consent to Terms & Conditions and risk disclaimer.

**Props**

```ts
type CheckboxFieldProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: React.ReactNode; // can include links
  error?: string;
};
```

**Usage**

- On `/learn` submission forms.
- On `/checkout` before purchase.

---

## 6. Dashboard Shell (High-Level)

Later, but good to define early.

### 6.1 `<DashboardLayout>`

**Purpose**

- Wraps all `/dashboard/*` routes with sidebar and top bar.

**Props**

```ts
type DashboardLayoutProps = {
  children: React.ReactNode;
};
```

**Structure**

- Sidebar:
  - `Dashboard`, `My courses`, `AI strategies`, `Transactions`, `Settings`.
- Top bar:
  - Small logo, user avatar/name, balance.

---

### 6.2 `<StatSummaryCard>`

**Purpose**

- Show quick stats (courses bought, AI strategies generated, current balance, etc.).

**Props**

```ts
type StatSummaryCardProps = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  helperText?: string;
};
```

---

### 6.3 `<ListRowCourse>` / `<ListRowStrategy>`

**Purpose**

- Display a row in dashboard lists (purchased courses, AI strategies).

**Props**

```ts
type ListRowCourseProps = {
  title: string;
  market: Market;
  level: Level;
  purchasedAt: string;
  status: "available" | "processing";
  onOpen?: () => void;
  onDownload?: () => void;
};

type ListRowStrategyProps = {
  title: string;
  market: Market;
  createdAt: string;
  status: "ready" | "processing";
  onOpen?: () => void;
};
```

---

## 7. Naming and Folder Conventions

Suggested folder organization:

```text
src
├─ components
│  ├─ layout
│  │  ├─ PageShell.tsx
│  │  └─ Section.tsx
│  ├─ navigation
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  ├─ CurrencySwitcher.tsx
│  │  └─ LanguageToggle.tsx
│  ├─ buttons
│  │  ├─ ButtonPrimary.tsx
│  │  ├─ ButtonSecondary.tsx
│  │  └─ ButtonGhostLink.tsx
│  ├─ cards
│  │  ├─ CardCourse.tsx
│  │  ├─ CardPath.tsx
│  │  ├─ CardStep.tsx
│  │  ├─ CardToken.tsx
│  │  ├─ CardGlossary.tsx
│  │  ├─ CardResource.tsx
│  │  └─ CardRiskNotice.tsx
│  ├─ faq
│  │  ├─ FaqItem.tsx
│  │  └─ FaqList.tsx
│  ├─ hero
│  │  └─ HeroSlideshow.tsx
│  ├─ forms
│  │  ├─ TextField.tsx
│  │  ├─ TextArea.tsx
│  │  ├─ PillToggleGroup.tsx
│  │  ├─ ToggleChipsGroup.tsx
│  │  └─ CheckboxField.tsx
│  └─ dashboard
│     ├─ DashboardLayout.tsx
│     ├─ StatSummaryCard.tsx
│     ├─ ListRowCourse.tsx
│     └─ ListRowStrategy.tsx
└─ ...
```

---

## 8. Notes for AI in Cursor

When generating or editing components:

1. **Reuse** these component names and props whenever possible instead of hardcoding markup in pages.
2. Keep **styles consistent** with `design-system.avenqor.md`:
   - dark backgrounds,
   - cyan/indigo accents,
   - rounded-2xl cards, rounded-full buttons.
3. For new components:
   - base them on existing patterns (`CardCourse`, `CardPath`, `CardStep`, `ButtonPrimary`, `Section`),
   - keep animation timings in the 120–220ms range for hovers, 350–450ms for scroll-in.
4. Remember the **risk/education-only** stance:
   - no UI elements should imply signals, auto-trading or guaranteed returns.
5. Prefer **composition**:
   - pages combine these building blocks;
   - avoid duplicating structures that can be abstracted into cards or shared sections.
