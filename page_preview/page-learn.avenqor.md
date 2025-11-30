# Avenqor Learn Page Specification (`/learn`)

> Dual-mode page for **Custom Course Request** and **AI Strategy Builder** in a single, consistent layout.

---

## 1. Page goal & success metrics

### 1.1. Goal

Provide a single, focused entry point where the user can:

1. Submit a **custom course request** (fulfilled in 48–96 hours via PDF).
2. Generate an **instant AI-based strategy plan** (educational only).

Both flows must keep **risk awareness** and **“education only”** messaging visible and consistent.

### 1.2. Primary metrics (UX / product)

- % of visitors who start one of the forms (custom or AI).
- % of visitors who complete the form (valid submission).
- Time to first action (switch tab, click preset, pick experience level).
- Share of **Custom vs AI** usage over time.
- Error/validation rate on required inputs (email, consents, etc. – when wired).

---

## 2. Entry points & routing

- Main nav: **Learn** → `/learn`.
- CTA from home:
  - “Request custom course” → `/learn?mode=custom`.
  - “Open AI Strategy Builder” → `/learn?mode=ai`.
- Internal links:
  - From course detail: “Prefer tailored?” → `/learn?mode=custom`.
  - From dashboard: “Generate new AI strategy” → `/learn?mode=ai`.

**Routing rule (future logic, not enforced in preview):**

- If `mode=custom` → open page with **Custom Course** tab active.
- If `mode=ai` → open page with **AI Strategy** tab active.
- Default with no query → **Custom Course** tab active.

---

## 3. Layout & structure

### 3.1. Global layout

- Dark-first layout, consistent with home:
  - `bg-slate-950` body.
  - Subtle gradient “neuro-fintech” background (cyan/indigo radial overlays).
- **Sticky header** with:
  - Compact logo block (`AV`, “Avenqor”, “Learn” tag).
  - Right-side badges:
    - `Education only` with `ShieldCheck`.
    - `PDF outputs` with `FileText`.
  - “Back to home” button (simple outline, text-only).

- Main content:
  1. **Intro section** with breadcrumb and tab switcher.
  2. **Tab content** (Custom Course or AI Strategy).
  3. Right-column “explainers” (risk reminders, pricing hints, usage guidance).

### 3.2. Sections (top-level blocks)

1. **Intro & tabs**
   - Breadcrumb: `Home / Learn`.
   - H1: “Build your path: custom course or AI strategy.”
   - Short description explaining two options.
   - `LearnTabSwitcher`:
     - Pills: `Custom course`, `AI strategy`.
     - Each with icon (Lucide: `UserCog`, `Cpu`).
   - Small info-pill: “Education only · no signals”.

2. **Tab: Custom course request**
   - Left column: multi-step **profile form**.
   - Right column: explainer cards:
     - How custom course works.
     - Risk reminder (amber card).
     - Pricing explanation (tokens + currencies).

3. **Tab: AI Strategy Builder**
   - Left column: AI strategy form with presets.
   - Right column: info cards:
     - Adjustable depth (tokens scaling).
     - How AI strategies relate to courses.
     - Risk reminder (no signals / no guarantees).

---

## 4. Components & states

### 4.1. Tab switcher (`LearnTabSwitcher`)

- Type: pill-based segmented control on dark background.
- Visuals:
  - Container: `inline-flex`, rounded-full, `bg-slate-950/90`, `border-slate-800`, `p-1`.
  - Active tab:
    - `bg-slate-100`, `text-slate-950`, subtle shadow.
    - Icon in dark (`text-slate-900`).
  - Inactive tab:
    - `text-slate-300`, icon `text-cyan-300`.
    - Hover: `text-cyan-300`.

- Props:
  - `active: "custom" | "ai"`.
  - `onChange(key: TabKey)`.

### 4.2. Section wrapper (`Section`)

- Shared wrapper used for scroll animations:
  - Width: `max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`.
  - Uses `useInView` + `framer-motion`:
    - Initial: `{ opacity: 0, y: 24 }`.
    - When in view: `{ opacity: 1, y: 0 }`, `duration: 0.45`.

---

## 5. Custom Course tab – form UX

### 5.1. Form sections

1. **Experience**
   - Label: “Your trading experience” (required).
   - Options (buttons):
     - “0 years / complete beginner”
     - “1–2 years”
     - “3+ years”
   - Future behavior: single-select; visually show active state.

2. **Markets**
   - Label: “Markets you want covered”.
   - Options (multi-select buttons):
     - “Forex”
     - “Crypto”
     - “Binary options”.

3. **Typical deposit size**
   - Label: “Typical deposit size”.
   - Options grid:
     - `< 1 000`
     - `1 000 – 5 000`
     - `5 000 – 20 000`
     - `20 000+`.
   - Purpose: help calibrate examples & risk.

4. **Risk tolerance & trading style**
   - Two sub-blocks side by side on desktop:
     - Risk tolerance:
       - “Low”, “Medium”, “High”.
     - Trading style:
       - “Scalping”, “Day trading”, “Swing”, “Position”.

5. **Time & tools**
   - Time available per week:
     - Free-text input.
     - Placeholder: “For example: 3 evenings + 1 weekend session”.
   - Platforms / brokers:
     - Free-text input (optional).
     - Placeholder: “For example: MT4, MT5, TradingView, Binance...”.

6. **Goals (core free-text)**
   - Label: “What do you want from this course?”
   - Helper text: “Please be as specific as possible”.
   - Textarea:
     - Placeholder: example about risk per trade, price structure, simple plan.

7. **Extra notes (optional)**
   - Label: “Anything else we should know? (optional)”.
   - Textarea:
     - Placeholder: past issues, psychological challenges, constraints.

8. **Consents**
   - Checkboxes:
     1. “I understand this is educational material only. Avenqor does not provide financial advice or trading signals.”
     2. “I confirm that I have read and accept the Terms & Conditions and Risk & Disclaimer.”
   - Both required for valid submission in real implementation.

9. **CTA & delivery info**
   - Primary button:
     - Label: “Submit request”.
     - Style: cyan pill, drop shadow, small arrow icon.
   - Helper text:
     - “You will receive a confirmation email and the PDF within 48–96 hours.”

### 5.2. Right-column cards

1. **Delivery explainer**
   - Badge: `Clock` + “Delivered in 48–96 hours”.
   - Copy:
     - Explains “senior trader (via AI)” and intentional delay.
   - Bullet list of outcomes:
     - Modules sequenced to profile.
     - Market-aligned examples.
     - Checklist and actions for 4–8 weeks.

2. **Risk reminder**
   - Amber border + `AlertTriangle`.
   - Text:
     - Custom courses are still education only.
     - No removal of risk / no guarantees.
   - Link: “Read full risk & disclaimer”.

3. **Pricing explainer**
   - Explains:
     - Custom course uses more tokens than single course.
     - Pay with tokens or in EUR/GBP/USD/AED.
   - Badge: `Layers` + “Example only – final pricing TBD”.

---

## 6. AI Strategy tab – UX & fields

### 6.1. Form sections

1. **Quick presets**
   - Pills:
     - “Conservative intraday (1–2 trades/day)”
     - “Balanced swing (multi-day holds)”
     - “Exploratory scalping (high frequency, small size)”
   - Behavior (future):
     - Pre-fill suggested risk per trade, max trades per day, etc.

2. **Core profile**
   - Main market (select):
     - Forex / Crypto / Binary options.
   - Primary time frame (select):
     - M15 / M30 / H1 / H4 / D1.
   - Risk per trade (%):
     - Numeric input, placeholder: `0.5 – 1.0`.
   - Max trades per day:
     - Numeric input, placeholder: `3`.

3. **Instruments & focus**
   - Instruments:
     - Text input, placeholder: `EURUSD, GBPUSD, BTCUSDT...`.
   - Key things to focus on (optional):
     - Text input, placeholder: “fewer trades, clear rules, news avoidance...”.

4. **Output detail level**
   - Pills:
     - “Quick summary”
     - “Standard plan”
     - “Deep-dive guide”
   - Note: “Higher detail uses more tokens”.

5. **Consent**
   - Single checkbox:
     - “I understand that the generated plan is for educational purposes only and does not contain trading signals or guaranteed results.”

6. **CTA & output hint**
   - Primary button:
     - Label: “Generate AI strategy”.
   - Helper text:
     - “The plan will appear below in a structured format and be saved to your library.”

7. **Output preview placeholder**
   - Card titled “AI strategy output”.
   - Description bullets (example only):
     - Setup description.
     - Entry & exit logic.
     - Risk framework.
     - Checklist.

### 6.2. Right-column cards

1. **Adjustable depth**
   - `SlidersHorizontal` icon.
   - Explains scaling of token cost with detail level.

2. **How it fits with courses**
   - Encourages taking at least one structured course before relying heavily on AI plans.

3. **Risk reminder**
   - Amber card with `AlertTriangle`.
   - Text: no signals, no guarantees, user remains responsible.
   - Link: “Read full risk & disclaimer”.

---

## 7. Visual style & motion

### 7.1. Visual

- Background:
  - `bg-slate-950`, layered radial gradients (cyan / indigo) with low opacity.
- Cards:
  - `bg-slate-950/90` or `bg-slate-950/80`.
  - Borders:
    - Default: `border-slate-900`/`800`.
    - Highlight: `border-amber-500/40` for risk, `border-cyan-500/60` for premium.
- Typography:
  - Title: text-xl / text-2xl (`font-semibold`, `text-slate-50`).
  - Body: `text-xs`–`text-sm`, `text-slate-300/90`.
  - Meta / helpers: `text-[11px]`, `text-slate-400/500`.
- Icons:
  - Lucide: `ShieldCheck`, `FileText`, `UserCog`, `Cpu`, `Clock`, `Layers`, `AlertTriangle`, `SlidersHorizontal`, `Info`.

### 7.2. Motion & interactions

- `Section`:
  - Fade + translate on scroll in (framer-motion).
- Cards (info and side cards):
  - On hover: `whileHover={{ y: -3 or -6, scale: 1.01–1.02 }}`.
- Buttons:
  - Primary cyan: micro-shadow, hover brighten.
- Tab switcher:
  - Smooth transform on active change.

---

## 8. Accessibility & copy constraints

- All interactive elements:
  - Must be reachable via keyboard (Tab).
  - Buttons vs. inputs separated correctly in real implementation.
- Checkboxes:
  - Use visible focus ring in final.
- Text:
  - Clear “education only / no financial advice” wording on both tabs.
- Error handling (future):
  - Required field validation with short, simple messages.
  - Ensure copy works in EN + has room for AR translation.

---

## 9. Future implementation notes (beyond preview)

- Integrate with:
  - Auth (user must be signed in to submit forms).
  - Tokens & billing:
    - Custom course = product + token consumption or direct payment.
    - AI strategy generation = token consumption per generation.
  - Email service:
    - Send confirmation & course delivery email for custom courses.
  - AI backend:
    - OpenAI API for:
      - Course PDF generation.
      - Strategy text generation + saving to user library.

- Telemetry:
  - Capture `mode` (custom/ai), presets used, submitted risk level, etc. for product analysis.

