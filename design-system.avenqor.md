
# Avenqor Design System

Version: 0.2  
Scope: Web app for Avenqor (Forex / Crypto / Binary education platform)  
Stack: Next.js, React, TailwindCSS, Lucide Icons, Framer Motion

---

## 1. Brand and Tone

**What Avenqor is**

- Premium, serious education platform for high-risk markets (Forex, Crypto, Binary).
- Focus: structured learning, risk awareness, clarity.
- No signals, no copy-trading, no "easy money".

**Tone of voice**

- Serious, calm, "older brother who knows what he is doing".
- Clear, concrete, no hype, no meme slang.
- We never promise returns or performance.

**Hard rules**

- Do not use phrases like:
  - "guaranteed profit", "safe income", "passive income", "signals", "copy our trades".
- Always keep the idea "Education only, no financial advice" visible in:
  - hero area,
  - risk section,
  - footer,
  - legal pages.

---

## 2. Color System

Base palette built on Tailwind slate, cyan, indigo and amber.

### 2.1 Base hex palette

These are the **actual hex codes** that define the Avenqor look.

**Neutrals (dark surfaces)**

- `AvenqorBlack` — `#020617` (approx. slate-950)  
  Used for: page background, dark overlays.

- `AvenqorSlate900` — `#0F172A` (slate-900)  
  Used for: cards, panels, header/footer backgrounds.

- `AvenqorSlate800` — `#1E293B` (slate-800)  
  Used for: borders, dividers, secondary card backgrounds.

- `AvenqorSlate700` — `#334155` (slate-700)  
  Used for: subtle borders, input borders.

- `AvenqorSlate500` — `#64748B` (slate-500)  
  Used for: muted text, icons.

- `AvenqorSlate300` — `#CBD5F5` (close to slate-300)  
  Used for: main body text on very dark backgrounds (with opacity when needed).

**Primary / Accent**

- `AvenqorCyan400` — `#22D3EE` (cyan-400)  
  Primary accent color (buttons, icons, highlights).

- `AvenqorCyan500` — `#06B6D4` (cyan-500)  
  Slightly stronger accent (gradients, focused states).

- `AvenqorIndigo500` — `#6366F1` (indigo-500)  
  Secondary accent (background gradients, subtle glows).

**Semantic**

- `AvenqorAmber400` — `#FBBF24` (amber-400)  
  Warning / risk highlight (risk cards, critical notices).

- `AvenqorEmerald400` — `#4ADE80` (emerald-400)  
  Positive / "ready" state (e.g. custom course ready).

- `AvenqorRose500` — `#F43F5E` (rose-500)  
  Errors (form validation, API failures).

### 2.2 Semantic tokens for components

Use **semantic tokens** inside components rather than hardcoding Tailwind classes. The semantic tokens then map to hex values (directly or via Tailwind utilities).

- `bg-page` — main page background  
  - Hex: `#020617`  
  - Tailwind: `bg-slate-950`

- `bg-elevated` — main cards and panels  
  - Hex: between `#020617` and `#0F172A`  
  - Tailwind: `bg-slate-950/90`, `bg-slate-900/80`

- `bg-elevated-soft` — softer cards, nested content  
  - Hex: ~ `#0F172A` with transparency  
  - Tailwind: `bg-slate-900/60`

- `border-subtle` — low-contrast borders  
  - Hex: `#020617` – `#0F172A`  
  - Tailwind: `border-slate-900`

- `border-strong` — active/focus borders  
  - Hex: `#334155` or `#22D3EE`  
  - Tailwind: `border-slate-700`, `border-cyan-400`

- `text-main` — main body text  
  - Hex: `#F9FAFB` (white-ish, Tailwind `slate-50`)  
  - Tailwind: `text-slate-50`

- `text-muted` — secondary text  
  - Hex: close to `#CBD5F5` with opacity  
  - Tailwind: `text-slate-300/90`

- `text-soft` — tertiary text  
  - Hex: `#64748B`  
  - Tailwind: `text-slate-400` / `text-slate-500`

- `accent-primary` — primary cyan  
  - Hex: `#22D3EE`  
  - Tailwind: `text-cyan-400`, `bg-cyan-400`, `border-cyan-400`

- `accent-secondary` — indigo support  
  - Hex: `#6366F1`  
  - Tailwind: `text-indigo-500`, gradients

- `accent-warning` — risk highlight  
  - Hex: `#FBBF24`  
  - Tailwind: `text-amber-300`, `border-amber-500/40`

### 2.3 Background and gradients

**Page background**

- Base:
  - `background: linear-gradient(to bottom right, #020617, #0F172A, #020617);`
  - Tailwind: `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`.

**Glow overlay**

- Radial cyan glow on top:
  - `rgba(56, 189, 248, 0.28)` → cyan-like.
- Radial indigo glow on bottom:
  - `rgba(129, 140, 248, 0.18)` → indigo-like.
- Tailwind (already in code):
  - `bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]`

**Gradient for hero/video frame**

- Example:
  - `from-cyan-500/15 via-slate-900/60 to-indigo-500/10`
  - Hexes: `#06B6D4` → `#0F172A` → `#6366F1`

---

## 3. Typography

Primary font: system-ui stack (for example `Inter`, `SF Pro Text`, `system-ui`).

### 3.1 Text styles

Desktop baseline:

- `HeadingXL` (Hero H1): `text-4xl lg:text-5xl`, `font-semibold`, `tracking-tight`.
- `HeadingL` (section titles): `text-xl`, `font-semibold`.
- `HeadingM` (card titles): `text-sm`, `font-semibold`.
- `Body` (main text): `text-sm sm:text-base`, normal weight.
- `BodySmall`: `text-xs`, helper and meta.
- `Legal`: `text-[11px]`, for disclaimers and legal meta.

Line height:

- Headings: `leading-tight`.
- Body: `leading-relaxed` (important on dark backgrounds).

### 3.2 Rules

- Use at most two font weights: regular and semibold (bold only for logo if needed).
- Uppercase:
  - small badges (`EDUCATION ONLY`, `BEGINNER`),
  - tiny labels (for example "FEATURED TODAY").
- Do not use long ALL CAPS sentences.

---

## 4. Layout and Spacing

### 4.1 Page container

- Max width: `max-w-6xl` (roughly 1152px).
- Horizontal padding:
  - `px-4` on mobile,
  - `sm:px-6`,
  - `lg:px-8` on larger screens.

Use a wrapper component:

- `<Section>`:
  - centers the content with the max-width container,
  - wraps the inner content in a motion div for scroll-in animation.

### 4.2 Vertical rhythm

Base step: 8px grid.

- Between major sections:
  - `pt-10 pb-14` on the first section,
  - `pb-14` between sections by default.
- Inside components:
  - `gap-4` and `gap-5` for layout groups,
  - `space-y-3` and `space-y-4` for text stacks.

### 4.3 Breakpoints

Tailwind defaults:

- `sm` ≥ 640px
- `md` ≥ 768px
- `lg` ≥ 1024px
- `xl` ≥ 1280px

Guidelines:

- Hero:
  - `grid-cols-1` on mobile,
  - `lg:grid-cols-12` with 6 / 6 split on desktop.
- Course lists:
  - mobile: 1 column,
  - `md`: 2 or 3 columns,
  - `lg`: 3 or 4 columns depending on section.
- Text width:
  - avoid more than 70–80 characters per line for long paragraphs.

---

## 5. Iconography

Icon library: Lucide.

Common icons:

- Risk and safety: `ShieldCheck`, `AlertTriangle`.
- Content and docs: `BookOpen`, `FileText`, `BookOpenCheck`, `FolderKanban`.
- AI and controls: `Cpu`, `SlidersHorizontal`.
- User and path: `UserCog`, `Compass`.
- Payments and tokens: `CreditCard`, `Coins`, `ShoppingCart`, `PlusCircle`.
- Info: `Info`.

Rules:

- Default size: `w-4 h-4` (Hero and main tiles can use `w-5 h-5`).
- Color:
  - primary icons: `text-cyan-300` or `text-cyan-400`,
  - secondary icons: `text-slate-400`.
- Icons must be paired with text labels for accessibility.

---

## 6. Components (UI Kit)

Names are indicative for React + Tailwind.

### 6.1 Buttons

Variants:

- `ButtonPrimary`
  - Styles: `rounded-full`, `bg-[#22D3EE]` or `bg-cyan-400`, `text-slate-950`,
    `hover:bg-[#06B6D4]` or `hover:bg-cyan-300`,
    `shadow-[0_14px_32px_rgba(8,145,178,0.65)]`.
  - Usage: main CTAs (Explore courses, Get started).

- `ButtonSecondary`
  - Styles: `rounded-full`, `border border-slate-700`, `bg-transparent`,
    `text-slate-100`, `hover:border-slate-500`.
  - Usage: secondary CTAs (Request custom course, Open AI strategy).

- `ButtonGhostLink`
  - Styles: no background,
    `text-cyan-300 hover:text-cyan-200`, small size.
  - Usage: small inline CTAs ("View all courses", "Read full risk and disclaimer").

States:

- Hover: color and border change, slight shadow change.
- Disabled: `opacity-50`, `cursor-not-allowed`.
- Loading: optional spinner icon or text "Loading..." depending on context.

### 6.2 Badges

- `BadgePill` (brand and meta)
  - Avenqor Club, Education only, levels (Beginner, Intermediate, Advanced).
  - Styles: `text-[10px-11px]`, `rounded-full`,
    `bg-slate-900/80`, `border-slate-700/80`, `text-slate-200`.

- `BadgeTag`
  - For course meta: market (Forex, Crypto, Binary) and format (PDF).
  - Styles: `px-2 py-0.5`, `rounded-full`, `border-slate-700`,
    `bg-slate-800/80`, `text-slate-300`.

- `BadgeStatus`
  - For status in dashboard and orders: Pending, In progress, Ready.
  - Colors:
    - Pending: neutral slate (`border-slate-600`, `text-slate-300`).
    - In progress: cyan (`border-[#22D3EE]`, `text-[#22D3EE]`).
    - Ready: emerald (`border-[#4ADE80]`, `text-[#4ADE80]`).

### 6.3 Cards

- `CardCourse`
  - For course listing (home and courses page).
  - Contains:
    - media cover (placeholder or Sora-generated image),
    - badges (level, market, format),
    - title, short description,
    - price in currency,
    - price in tokens,
    - small CTA button.
  - Style:
    - `background: #020617` to `#0F172A` gradient or `bg-slate-900/60`,
    - `border: 1px solid #1E293B` (slate-800),
    - `border-radius: 16px` (Tailwind `rounded-2xl`),
    - hover: `border-color: #22D3EE` (`border-cyan-400/70`),
      `transform: translateY(-4px)`.

- `CardPath`
  - For "Three ways to learn with Avenqor".
  - Contains icon, title, description, optional badge, CTA link.
  - Hover: `y -6`, `scale 1.02`, using spring animation.

- `CardStep`
  - For linear flows such as "How Avenqor fits into your learning".
  - Small icon, short title, short explanatory text.
  - Background: `bg-slate-950/70`, `border-slate-900`.

- `CardWarning`
  - For risk and disclaimer messaging.
  - Style:
    - background: `#020617` / `bg-slate-950/90`,
    - border: `1px solid rgba(251, 191, 36, 0.4)` (amber),
    - icon color: `#FBBF24`,
    - text: `text-xs` body text + CTA link.

### 6.4 Inputs and Controls

- `TextField`
  - Dark input:
    - background: `#020617` (`bg-slate-950`),
    - border: `#1E293B` (`border-slate-800`),
    - border-radius: `12px` (`rounded-xl`),
    - text color: `#F9FAFB` (`text-slate-50`),
    - placeholder: `#64748B` (`text-slate-500`).
    - Focus:
      - `border-color: #22D3EE`,
      - `box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.5)`.

- `TextArea`
  - Same as `TextField`, but `min-height: 120px`.
  - For open-ended answers (goals, experience notes).

- `Select` and `PillToggle`
  - For discrete choices (experience, risk level, trading style, markets).
  - Visual:
    - pill container with `bg-slate-900`,
    - unselected: `border-slate-700`, `text-slate-300`,
    - selected: `border-[#22D3EE]`, `bg-slate-900/80`, `text-slate-50`.

- `ToggleChips`
  - For multi-select (e.g. Forex + Crypto).
  - Same visual language as `PillToggle`.

### 6.5 Navigation

- `Header`
  - Left: logo (AV gradient from `#22D3EE` to `#3B82F6`) and brand text.
  - Center: navigation items (Courses, Custom course, AI Strategy, Pricing, Glossary, Resources, FAQ).
  - Right:
    - currency dropdown (compact, label + chevron),
    - language toggle (EN / AR),
    - Sign in button,
    - Get started (primary).
  - Style:
    - `background: rgba(2, 6, 23, 0.8)` (`bg-slate-950/80`),
    - `backdrop-filter: blur(16px)` (`backdrop-blur-xl`),
    - `border-bottom: 1px solid #020617` (`border-slate-900/80`).

- `NavLink`
  - `text-xs`, default `text-slate-200`,
  - hover: `text-[#22D3EE]` (`hover:text-cyan-300`),
  - active: can use bottom border or full cyan text.

- `Footer`
  - Three groups:
    - Brand and mini disclaimer.
    - Main links (Courses, Custom, AI, Glossary, Resources).
    - Legal links (Risk and Disclaimer, Terms and Conditions, Privacy Policy, Cookies, Contact).
  - Flat background:
    - `bg-slate-950/95`,
    - `border-top: 1px solid #020617`.
  - Required sentence:
    - "Avenqor provides education only. We do not offer financial advice."

---

## 7. Motion and Micro-interactions

Library: Framer Motion.

### 7.1 Section entry (scroll)

Component `<Section>`:

- On entering viewport:
  - initial: `{ opacity: 0, y: 24 }`
  - animate: `{ opacity: 1, y: 0 }`
  - transition: `duration 0.35–0.45s`, `ease: "easeOut"`.
- `once: true` for each section (no re-trigger on scroll back).

### 7.2 Hover on cards

- Path, steps, tokens, glossary, resources:
  - `whileHover={{ y: -4 to -6, scale: 1.01 to 1.02 }}`,
  - `transition={{ type: "spring", stiffness: 240 to 260, damping: 20 to 22 }}`.

- Course card:
  - Only small vertical lift and border highlight:
    - `hover:-translate-y-1`,
    - `hover:border-cyan-400/70`,
    - do not scale to avoid grid jitter.

### 7.3 Hero slideshow

- Auto rotation about every 6 seconds.
- On slide change:
  - initial: `{ opacity: 0, y: 12 }`
  - animate: `{ opacity: 1, y: 0 }`
  - `duration: ~0.35s`, `ease: "easeOut"`.

### 7.4 Buttons and links

- Timing:
  - hover: 120–180 ms,
  - click: as fast as possible.
- Easing:
  - `ease-out` on hover,
  - `ease-in-out` for background or long transitions.
- Links that open modals or AI flows should trigger a clear visual feedback:
  - spinner or progress state if response takes more than a short moment.

---

## 8. Accessibility

Target: WCAG 2.2 AA.

Key rules:

- Contrast:
  - main text vs background: at least 4.5:1,
  - small labels and badges: check contrast carefully on dark surfaces.
- Focus:
  - never remove focus outlines globally,
  - add clear custom focus styles for primary buttons and links (border + glow).
- States:
  - color is not the only indicator (use icons and labels for statuses).
- Keyboard:
  - all interactive elements reachable via Tab,
  - obvious focus order,
  - Enter/Space works on buttons and interactive pills.
- AR / RTL:
  - Arabic version uses `dir="rtl"` at least on the `<html>` or main layout level,
  - components must not rely on hardcoded left/right directions for meaning only.

---

## 9. Tailwind implementation notes (suggested)

Example extension fragment for `tailwind.config.js` (this is only a guideline for developers):

```js
// tailwind.config.js (fragment)
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#22D3EE',      // cyan-400
          primarySoft: '#0F172A',  // slate-900-like background
          warning: '#FBBF24',      // amber-400
        },
      },
      boxShadow: {
        'brand-strong': '0 14px 32px rgba(8,145,178,0.65)',
        'card-deep': '0 20px 50px rgba(15,23,42,0.95)',
      },
      maxWidth: {
        page: '72rem', // ~1152px
      },
    },
  },
};
```

Components should either:

- use Tailwind classes directly (`bg-slate-950`, `text-slate-50`, `text-slate-300/90`), or
- use a small design token layer via CSS variables if introduced later.

---

## 10. Summary for AI in Cursor

When AI in Cursor writes or edits UI for Avenqor:

1. Use **dark-first** design: deep slate background, high contrast text.
2. Use the base hex palette for any new color values:
   - backgrounds around `#020617` – `#0F172A`,
   - accents around `#22D3EE` and `#6366F1`,
   - risk using `#FBBF24`.
3. Wrap page sections with `<Section>` to keep consistent width and scroll-in animations.
4. Use the described typography hierarchy for headings and body text.
5. For new components:
   - base them on the patterns: `CardCourse`, `CardPath`, `CardStep`, `CardWarning`,
     `ButtonPrimary`, `ButtonSecondary`, `BadgePill`, `BadgeTag`, `BadgeStatus`.
6. In any text:
   - do not promise profit,
   - keep Avenqor as an education-only platform,
   - avoid wording that implies financial advice or guaranteed outcomes.
