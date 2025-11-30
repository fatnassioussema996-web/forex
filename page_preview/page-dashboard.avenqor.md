# Avenqor Dashboard Page Specification (`/dashboard`)

> Auth-only page where users see **their learning overview, token balance, custom course status, AI strategies and recent activity**.

---

## 1. Page goal & success metrics

### 1.1. Goal

Give a signed-in user a **clear, calm overview** of:

- Current **token balance** and quick ways to top up.
- Status of any **custom course requests**.
- Recently accessed **PDF courses** and **AI strategies**.
- Recent **token/payment activity**.

Dashboard must feel like a **control center**, not a trading terminal.

### 1.2. UX & product metrics

- Time to first click on:
  - “Top up balance”
  - “New AI strategy”
  - “Browse courses”
- % of users who open at least one **course/AI item** per dashboard visit.
- % of users who open **billing history** or **risk & disclaimer** from dashboard.
- Scroll depth (do users see the **transactions table**?).

---

## 2. Entry points & routing

- Main nav: **Dashboard** → `/dashboard` (auth-only).
- Post-login redirect:
  - Default redirect after successful login → `/dashboard`.
- Other entries:
  - From Learn/Products pages: “Go to dashboard” actions after purchase/generation.
  - From email links:
    - “View in dashboard” → `/dashboard` (later with anchors or filters).

No query parameters needed in MVP; filters can be added later.

---

## 3. Layout & structure

### 3.1. Global layout

- Dark-first design, consistent with home and pricing:
  - Body: `bg-slate-950`.
  - Background gradients with cyan/indigo glows.
- Sticky header with:
  - Logo & “Dashboard” label.
  - Badges: `Education only` & `PDF courses & AI outputs`.
  - Top-right: compact **Account** button (opens account/settings page).

- Main content vertical flow:

1. **Overview header & KPI cards**
2. **Main content grid**
   - Left: **Library (courses & strategies)**
   - Right: **Risk reminder, billing snapshot, quick actions**
3. **Transactions table (recent tokens & payments)**

### 3.2. Sections overview

1. **Overview**
   - Breadcrumb: `Home / Dashboard`.
   - H1: “Welcome back. Here is your learning overview.”
   - Description explaining what the dashboard shows.
   - Two small pill badges: `Learning overview`, `Recent activity`.
   - 3 KPI cards (Token balance, Custom course status, Recent activity).

2. **Library & side column**
   - Left (2/3 width on desktop):
     - “Your courses & strategies” header.
     - List of mixed items:
       - PDF course items.
       - AI strategy items.
       - Custom course items.
   - Right (1/3 width):
     - Risk reminder card.
     - Billing snapshot.
     - Quick actions.

3. **Transactions**
   - Compact token & payment activity table.

---

## 4. Header & overview

### 4.1. Header (sticky)

**Left:**

- Logo avatar:
  - `AV` inside gradient square.
- Text stack:
  - Brand: `Avenqor`.
  - Label: `Dashboard` (uppercase, tiny tracking).

**Center (md+ only):**

- Badges row (text + icon):
  - `ShieldCheck` + “Education only”.
  - `FileText` + “PDF courses & AI outputs”.

**Right:**

- “Account” button:
  - Icon: `Settings`.
  - Outline pill, text: “Account”.
  - Opens account settings in real implementation.

### 4.2. Overview block

- Breadcrumb:
  - `Home / Dashboard`.
- H1:
  - “Welcome back. Here is your learning overview.”
- Supporting text:
  - Explain:
    - You can track token balance.
    - See custom course status.
    - See recent AI strategies.
    - Reminder that Avenqor is **education only**.

- Tag badges:
  - `BarChart3` + “Learning overview”.
  - `History` + “Recent activity”.

---

## 5. KPI cards

Three cards in a grid on desktop, stacked on mobile.

### 5.1. Token balance card

- Title: “Token balance”.
- Icon: `Wallet`.
- Main figure (example): `4 860 tokens`.
- Subtext:
  - “Approx. £48.60 equivalent – exact value depends on current pricing.” (placeholder).
- CTAs:
  - Primary pill: “Top up balance”.
  - Secondary outline: “View pricing”.
- In real app:
  - “Top up balance” → `/pricing` with preset top-up view or open modal.
  - “View pricing” → `/pricing`.

### 5.2. Custom course status card

- Title: “Custom course status”.
- Icon: `Clock`.
- Course title (example):
  - “Crypto swing framework for part-time trader”.
- Status pill:
  - Amber pill, text: “In progress · 48–96h window”.
  - Icon: `Clock`.
- Explanation:
  - “Once ready, your PDF will be emailed to you and appear in your library.”

In real data:

- Status variations:
  - `Pending` / `In progress` / `Ready`.
- When ready:
  - Green/teal pill, icon `CheckCircle2`.

### 5.3. Recent activity card

- Title: “Recent activity”.
- Icon: `Sparkles`.
- Subtitle:
  - “3 learning items this week” (example).
- Bulleted description of last few actions:
  - Completed a course.
  - Generated AI strategy.
  - Requested custom course.

This is **read-only** in MVP; later can be tied to real usage metrics.

---

## 6. Library section (courses & strategies)

### 6.1. Header row

- Title:
  - “Your courses & strategies”.
- Subtitle (small):
  - “Latest items are shown first. All are educational PDFs or AI outputs.”
- Actions (right side):
  - Button: “Browse courses” with `BookOpen`.
  - Button: “New AI strategy” with `Cpu`.

### 6.2. Item types

Three example items (static in preview):

1. **PDF course**
   - Label pill: “PDF course”.
   - Market pill: e.g. “Forex”.
   - Level pill: “Beginner / Intermediate / Advanced”.
   - Format pill: “PDF”.
   - Title: “Forex Foundations: From Zero to First Trade”.
   - Status:
     - “Completed” with `CheckCircle2` (green).

2. **AI strategy**
   - Label: “AI strategy”.
   - Market: e.g. “Forex”.
   - Format: doesn’t need “PDF” if stored in app, but preview uses a simple set.
   - Title: “Intraday structure on EURUSD (M30)”.
   - Status:
     - “Ready” with `Sparkles` icon.

3. **Custom course**
   - Label: “Custom course”.
   - Market: e.g. “Crypto”.
   - Title: “Crypto swing framework for part-time trader”.
   - Status:
     - “In progress” with `Clock`.

### 6.3. Layout & interactions

- Item layout:
  - Card, horizontal on desktop; stacked on mobile.
  - Left: icon + text meta (pills) + status line.
  - Right: actions.

- Icons by type:
  - Course: `BookOpen`.
  - AI: `Cpu`.
  - Custom: `FileText`.

- Status line:
  - Icon + status text + small “Education only – not a signal.”

- Actions (right side):
  - Primary button:
    - “Open PDF” (or “Open output”).
  - Secondary text link:
    - “Details” + `ArrowRight`.

MVP: all actions are **non-functional** placeholders.

---

## 7. Right-hand column

### 7.1. Risk reminder card

- Icon: `AlertTriangle` in amber circle.
- Title:
  - “Education only – no guarantees.”
- Body:
  - Explain:
    - All PDFs and AI strategies are **educational material**.
    - No trade signals, no profit guarantees.
- Link CTA:
  - “Read full risk & disclaimer”.
  - In real app: route to dedicated Risk & Disclaimer page.

### 7.2. Billing snapshot card

- Icon: `CreditCard`.
- Title:
  - “Billing & tokens”.
- Subtitle:
  - “A snapshot of recent payments and token usage.”
- Metrics (example numbers):
  - “Tokens spent last 30 days” → `4 200`.
  - “AI strategies generated” → `6`.
  - “Courses unlocked” → `3`.
- CTA:
  - “Open full billing history”.

In real app, numbers come from user’s billing/usage logs.

### 7.3. Quick actions card

- Title:
  - “Quick actions”.
- Buttons (full-width):

1. “Browse all courses”
   - Icon: `BookOpen`.
   - Right side: `ArrowRight`.

2. “Request a new custom course”
   - Icon: `FileText`.

3. “Generate AI strategy”
   - Icon: `Cpu`.

In production, these route to:

- `/courses`
- `/learn?mode=custom`
- `/learn?mode=ai`

---

## 8. Transactions section

### 8.1. Header

- Title:
  - “Recent token & payment activity”.
- Subtitle:
  - “A simple log of how tokens and payments move through your account.”
- Link:
  - “View all activity”.

### 8.2. Table structure

Columns:

1. **Type**
   - Tag: “Top-up”, “Course”, “AI strategy”, “Custom course”, etc.

2. **Detail**
   - Row title: product or action name.
   - Meta: short explanation (“Course purchase”, “AI generation”, ...).

3. **Date**
   - ISO-ish string (YYYY-MM-DD) in preview.

4. **Amount**
   - Right-aligned.
   - Either:
     - Currency/payments: `- £69.99`.
     - Tokens: `- 2 300 tokens`.
   - Preview mixes both.

Example rows (static preview):

- Top-up – “Structured Growth token pack” – `- £69.99` – meta: `+ 7 000 tokens`.
- Course – “Crypto Volatility Structures (PDF)” – `- 2 300 tokens`.
- AI strategy – “Balanced swing plan (BTCUSDT)” – `- 400 tokens`.
- Custom course – “Binary risk foundations (PDF)” – `- 3 500 tokens`.

### 8.3. Visual

- Container:
  - Rounded-2xl.
  - `border-slate-900`, `bg-slate-950/80`.
- Header row:
  - Slightly darker background, smaller font.
- Body rows:
  - `divide-y` between rows.
  - All fonts around `11px`–`12px` to keep table compact.

---

## 9. Visual style & motion

### 9.1. Visual

- Background:
  - Gradient from dark slate + radial cyan/indigo glows.
- Cards:
  - `bg-slate-950/80` or `bg-slate-950/90`.
  - Borders:
    - Default: `border-slate-900`.
    - Accent (risk): `border-amber-500/40`.
    - Accent (highlight): `border-cyan-500/60` when needed.
- Typography:
  - Title: `text-xl` for H1, `text-lg` for section titles.
  - Body: `text-sm` or `text-[11px]` for dense info.
- Icons:
  - Lucide icons:
    - `ShieldCheck`, `Wallet`, `Sparkles`, `BookOpen`, `Cpu`, `Clock`, `CheckCircle2`, `ArrowRight`, `AlertTriangle`, `FileText`, `CreditCard`, `Settings`, `BarChart3`, `History`.

### 9.2. Motion

- `Section`:
  - Fade + upward motion on in-view (same pattern as other pages).
- KPI cards and info cards:
  - Slight lift & scale on hover, not overly strong to avoid “gamification”.
- Buttons:
  - Basic hover color changes.
  - In final implementation, add focus rings for keyboard.

---

## 10. States & future behavior

### 10.1. States (conceptual)

Dashboard will need more states than static preview:

- **Empty state** (no courses/strategies yet):
  - Show a friendly empty state in the library area with CTAs:
    - “Browse courses”
    - “Generate first AI strategy”
- **No custom course in progress**:
  - Replace status card text with:
    - “No active custom course. You can request one when you are ready.”
- **Zero token balance**:
  - Token card should:
    - Show 0 balance.
    - Emphasize “Top up balance” primary CTA.
- **Error states** (future):
  - Handle API failures for loading library or transactions.

### 10.2. Auth requirement

- `/dashboard` must be **protected route**.
- If user not logged in:
  - Redirect to login page (`/login`) or show login prompt.

---

## 11. Accessibility & localisation

- All interactive elements:
  - Keyboard-focusable (buttons, links).
  - Visible focus styles (via global design system).
- Copy:
  - Keep EN concise, avoid jargon when possible.
  - Remember that AR localisation will be added; avoid overly complex sentence chains.
- Risk copy:
  - Must remain visible in at least one card on the page (risk reminder).
  - Phrases like “education only” and “not a signal” should be easy to translate.

---

## 12. Integration notes (future implementation)

- Data sources:
  - Authenticated user profile.
  - Token balance & transaction history.
  - Purchased courses & AI strategies.
  - Custom course requests & statuses.

- Telemetry:
  - Track:
    - Clicks on “Top up balance”, “Browse courses”, “New AI strategy”.
    - Opens of risk & disclaimer from dashboard.
    - Scroll reach to bottom/transactions.

- Navigation:
  - Ensure consistent layout with other pages:
    - Same header height.
    - Same max-width and paddings via `Section` wrapper.

