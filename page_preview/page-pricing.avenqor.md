# Avenqor Pricing & Tokens Page Specification (`/pricing`)

> Dedicated page for **token packs, custom top-ups and direct payments**. Acts as a single source of truth for how pricing works inside Avenqor.

---

## 1. Page goal & success metrics

### 1.1. Goal

Give users a **clear, non-pushy overview** of:

- How token packs work.
- How custom top-up works.
- When you can **pay directly** for a single course.
- How all of this connects to **Forex / Crypto / Binary** education and AI tools.

The tone must stay **educational and transparent**, not hype or “salesy”.

### 1.2. Primary UX/product metrics

- % of visits that click a **token pack CTA**.
- % that click **Custom top-up**.
- % that click **direct payment** entry points.
- Scroll depth to **Risk & token notice** block (this is important).
- Time on page before first click on any pricing-related CTA.

---

## 2. Entry points & routing

- Main navigation: **Pricing** → `/pricing`.
- From Home:
  - “Token packs & custom top-up” teaser → `/pricing`.
- From Dashboard (later):
  - “Top up balance” / “View token packs” → `/pricing`.
- From Checkout (later):
  - Link “How tokens work” → `/pricing#how-tokens-work` (optional anchor).

No complex query parameters needed for MVP; one stable URL is enough.

---

## 3. Layout & information architecture

### 3.1. Global layout

- Dark-first layout, consistent with home:
  - Body: `bg-slate-950`.
  - Background gradients:
    - Top cyan glow.
    - Bottom indigo glow.
- Sticky header:
  - Compact logo block with “Pricing & tokens” label.
  - Right-side badges:
    - `Use tokens across courses and AI`.
    - `Education only`.
  - “Back to home” button (simple outlined pill).

### 3.2. Top-level sections (desktop)

1. **Hero & context**
   - Breadcrumb `Home / Pricing & tokens`.
   - H1 + introductory copy.
   - Explainer card about **illustrative token rates**.

2. **Token packs**
   - Three token packs in a grid.
   - Middle pack marked as **Most popular**.

3. **Custom top-up & Direct payment**
   - Two-column layout:
     - Left: Custom top-up explainer.
     - Right: Direct payment explainer.

4. **How tokens work inside Avenqor**
   - Four-step horizontal sequence.

5. **Risk & token notice**
   - Amber framed block with explicit risk/education copy.

6. **Final CTA**
   - Dual-CTA block:
     - “Choose a token pack”
     - “Set custom top-up”

---

## 4. Hero & header section

### 4.1. Header (sticky)

- Left:
  - Logo squircle: `AV` inside gradient circle.
  - Title stack:
    - `Avenqor` (brand).
    - `Pricing & tokens` (label, all caps, tiny tracking).
- Center:
  - On md+ screens: badges row.
    - `Wallet` icon + “Use tokens across courses and AI”.
    - `ShieldCheck` icon + “Education only”.
- Right:
  - Button: “Back to home”.
  - Style: rounded-full, outline.

### 4.2. Hero content

- Breadcrumb:
  - `Home / Pricing & tokens`.
- H1:
  - “One balance for courses and AI strategies.”
- Body text:
  - Explain that tokens can be used for:
    - Structured PDF courses.
    - Custom courses.
    - AI-generated strategies.
  - Clarify that you can also **pay directly** for a single course if you prefer.

- Three small bullet items with icons:
  1. `Coins` – “One balance for Forex, Crypto and Binary content.”
  2. `CreditCard` – “Pay with tokens or direct in EUR, GBP, USD or AED.”
  3. `Repeat` – “Top up any time – tokens do not expire.” (MVP assumption).

### 4.3. Hero side card – example rate

**Card title:** “Example effective rate”

**Purpose:**

- Communicate that shown numbers are **illustrative**.
- Reassure user that **final rates** will live in Terms & Conditions and payment logic.

**Body copy (approx):**

- Token pricing will be defined per region and currency.
- The page simply demonstrates **how packs and custom top-ups fit into the interface**.
- Example (non-binding) text:
  - “For example: 100 tokens might correspond to approximately £1.00 (or regional equivalent), but final values will be defined in legal terms and payment settings.”

**Badges:**

- Top-right badge: `Non-binding`.

---

## 5. Token packs section

### 5.1. Section intro

- Title:
  - “Token packs.”
- Subtitle:
  - “Start small or commit for longer – each pack loads tokens into your Avenqor balance for use across courses and AI.”
- Side note (right-aligned, small):
  - “Currency shown here is illustrative. Final pricing may differ.”
  - Info row:
    - `Info` icon + “Exact token conversion will be defined in production.”

### 5.2. Packs (3 cards)

Packs are **visual only** in this preview; pricing may change later.

1. **Starter pack**
   - Name: “Focused Start”
   - Price: “£39.99”
   - Tokens line: “≈ 4 000 tokens”
   - “Best for”: “First course or a few AI strategies.”
   - Bullets (examples):
     - “Try Avenqor with a small, contained balance.”
     - “Enough for one full course and several AI plans.”
   - Style:
     - Standard card: dark background, slate border.

2. **Growth pack (highlighted)**
   - Name: “Structured Growth”
   - Label: “Most popular”
   - Price: “£69.99”
   - Tokens line: “≈ 7 000 tokens”
   - “Best for”: “Regular use across markets.”
   - Bullets:
     - “Comfortable room for multiple courses and strategies.”
     - “Better value per token compared to Starter.”
   - Style:
     - Cyan border.
     - Stronger shadow.
     - “Most popular” badge.

3. **Pro pack**
   - Name: “Discipline Pro”
   - Price: “£99.99”
   - Tokens line: “≈ 10 000 tokens”
   - “Best for”: “Long-term structured learning.”
   - Bullets:
     - “Built for traders who plan to study consistently.”
     - “Best value per token in the current packs.”

### 5.3. Pack card interactions

- On hover:
  - Slight lift (`y: -6`, `scale: 1.02` for highlighted, `1.01` for others).
- CTA:
  - Text: “Select [Pack name]”.
  - In real app, this would lead to:
    - Checkout with selected pack.
    - Or token-top-up modal.

---

## 6. Custom top-up & Direct payment

Two cards side-by-side on desktop, stacked on mobile.

### 6.1. Custom top-up card

**Header:**

- Icon: `Wallet`.
- Title: “Custom top-up”.
- Subtitle:
  - “Set any amount in your preferred currency. In production, the system converts it to tokens automatically.”

**Body / UI elements:**

- Faux input group:
  - Left block:
    - Label: “Amount”.
    - Example text value: `0.01`.
  - Right block:
    - Currency stack as text only: `GBP · EUR · USD · AED`.
    - Important note: On this page it’s **purely visual**, actual currency selection is controlled by header currency selector in real app.

- Helper text:
  - “Minimum 0.01 in any supported currency. No formal maximum – larger top-ups are simply converted into more tokens.”

**CTA:**

- Text: “Preview in tokens”.
- In real app this would live-hook into **current exchange rate** and show tokens estimate.

### 6.2. Direct payment card

**Header:**

- Icon: `CreditCard`.
- Title: “Pay directly for a single course”.
- Subtitle:
  - “If you prefer not to manage a balance, you can pay for individual courses or custom PDFs directly in your currency.”

**Body bullets:**

1. “Use EUR, GBP, USD or AED depending on your region.”
2. “Tokens are not required – direct payment simply unlocks that specific product.”
3. “In future, you can always convert to a token-based workflow if you prefer.”

**CTA:**

- Text: “See example checkout”.

---

## 7. “How tokens work” section

### 7.1. Purpose

Explain the **lifecycle** of tokens in 4 simple steps.

### 7.2. Steps (4 cards)

1. **Step 1 – Add tokens**
   - Copy:
     - “Buy a pack or set a custom top-up using your preferred currency.”

2. **Step 2 – Use tokens on content**
   - Copy:
     - “Spend tokens on ready-made courses, custom PDFs and AI strategies.”

3. **Step 3 – Track in your dashboard**
   - Copy:
     - “See balance, usage and history – including which products used how many tokens.”

4. **Step 4 – Top up when needed**
   - Copy:
     - “Tokens do not expire, so you can top up at your own pace when the balance gets low.” (MVP assumption; can be updated later.)

### 7.3. Visual & motion

- Cards:
  - `bg-slate-950/70`.
  - `border-slate-900`.
  - Simple rounded corners.
- Animations:
  - Slight lift on hover (`y: -4`, `scale: 1.01`).

---

## 8. Risk & token notice section

### 8.1. Intent

This section is **non-optional** and must stay clearly visible, not collapsed.

### 8.2. Visual

- Full-width card inside standard container.
- Border:
  - `border-amber-500/40`.
- Icon:
  - `AlertTriangle` in amber circle.
- Background:
  - Dark, `bg-slate-950/90`.

### 8.3. Copy (structure)

1. **Headline**
   - “Important risk and token notice.”

2. **Paragraph 1 – Trading risk**
   - Explain:
     - Forex, Crypto and Binary options are **highly speculative**.
     - **Substantial or total loss of capital** is possible.
     - Avenqor:
       - Provides **education only**.
       - Does **not** provide signals, managed accounts, trade execution or guarantees.

3. **Paragraph 2 – Tokens**
   - Explain:
     - Tokens are a way to **access digital educational content** inside Avenqor.
     - Tokens are **not a financial product or investment**.
     - Token pricing, refund rules and region-specific limitations are defined in:
       - Terms & Conditions.
       - Risk & Disclaimer.

4. **Link-style CTA**
   - Text: “Read full risk & disclaimer”.
   - In real app: route to the dedicated Risk & Disclaimer page.

---

## 9. Final CTA section

### 9.1. Visual

- Card with border:
  - `border-slate-900`.
- Slight more neutral style than risk card.
- Used as a **closing encouragement**, not a pushy sales pitch.

### 9.2. Copy

- Title:
  - “Ready to load your first balance?”
- Body:
  - “Start with a small pack or custom top-up. You can always switch to a different approach later – your focus stays on structured learning.”

- CTAs:
  1. Primary:
     - “Choose a token pack”
     - Cyan pill button.
  2. Secondary:
     - “Set custom top-up”
     - Outline pill.

---

## 10. Components & states

### 10.1. Shared components

- `Section`:
  - Wrapper for sections with:
    - Max width.
    - Left/right padding.
    - Framer Motion fade + `y` animation on in-view.
- `PackCard`:
  - Props:
    - `name`, `price`, `tokens`, `bestFor`, `bullets`, `highlighted`, `label`.
  - Use consistent layout for card content.
- `InfoNote`/inline info blocks:
  - Icon + text for supporting information.

### 10.2. States

- Token pack hover:
  - Light pop, but keep **readability and focus**.
- Buttons:
  - All CTAs have hover states and remain keyboard-focusable.
- No loading/errors here – it is a **static informational preview**.

---

## 11. Responsiveness & accessibility

### 11.1. Responsive behaviour

- Mobile:
  - Sections stack vertically.
  - Token packs: vertical list.
  - Two-column sections (Custom vs Direct) become stacked cards.
- Tablet/desktop:
  - Grid columns as described above.

### 11.2. Accessibility

- Ensure **color contrast** meets WCAG 2.2 AA.
- All CTAs must:
  - Be keyboard-focusable.
  - Have visible focus outlines (handled at global design-system level).
- Risk and “education only” copy:
  - Must be readable and **not hidden** behind interactions.

---

## 12. Copy constraints & localisation

- Language: EN (primary). AR (Arabic) will be added in i18n layer.
- Avoid:
  - “Guarantee”, “safe”, “secure returns”, “easy profit”, and similar.
- Allowed framing:
  - “Educational content”, “learning paths”, “structured PDFs”, “AI-based tools”.
- All numbers in packs (e.g., tokens, prices) are **placeholders** and must be easy to change later from config.

