
# Avenqor Pricing & Tokens Spec

File: `pricing-and-tokens-spec.avenqor.md`  
Version: 0.1  
Scope: Tokens, prices, currencies and checkout behaviour for Avenqor.

---

## 1. Goals

Pricing and token system should:

- Be **simple to explain** to users (no casino vibes).
- Support **three main flows**:
  1. Buy token packs.
  2. Custom top-up of balance with any amount.
  3. Pay for ready-made courses directly in fiat (EUR/GBP/USD/AED).
- Work cleanly with:
  - Custom course requests (high-ticket, delayed delivery).
  - AI strategy runs (low-ticket, instant).
  - Multi-currency display (GBP, EUR, USD, AED).

The spec is intentionally **MVP-friendly** but structured so that later changes (prices, packs, discounts) can be done via configuration rather than scattered constants.

---

## 2. Currency Model

### 2.1 Supported currencies (UI)

- `EUR`
- `GBP`
- `USD`
- `AED`

### 2.2 Base currency

- **Canonical pricing currency**: `EUR`.
- All product base prices are defined in EUR.
- Display in other currencies is done via a **conversion layer**:

  - Could be:
    - static conversion table updated occasionally, or
    - backend API fetching FX rates.
  - For this spec we assume:
    - A backend service returns **current rates** and **rounded prices** for each product in all supported currencies.

### 2.3 Display rules

- Always show prices as **whole currency or with 0/2 decimals**, depending on standard:

  - EUR, GBP, USD: `€79`, `£79`, `$79` (no decimals for round numbers).
  - AED: `AED 299` (prefix).

- On course cards and pricing tables:
  - show **one currency** at a time, based on the header currency selector.
- Tokens view:
  - show **approximate token value** using the base EUR mapping (see next section).

---

## 3. Token Model

### 3.1 Conversion

Base rule (aligned with home page examples):

- `100 tokens = 1.00 EUR` (base internal mapping).

Examples:

- Course `€79` → `79 * 100 = 7 900 tokens`.
- Course `€99` → `9 900 tokens`.
- Course `€119` → `11 900 tokens`.

When showing approximate tokens for a price defined in another display currency:

- Convert that currency price to EUR (using backend rate),
- multiply by 100,
- round to nearest 100 tokens for a clean number.

### 3.2 Token properties

- Tokens are **non-refundable** and **non-transferable** (legal details go to Terms).
- Tokens do **not expire** in MVP (can be changed later via config flag).
- Tokens are used for:
  - AI strategy runs.
  - Custom course requests (if chosen instead of direct fiat payment).
  - Optionally: ready-made courses (payment with balance).

### 3.3 Token arithmetic rules

- Internal representation:
  - integer `tokens` field,
  - no floating-point math.
- When converting prices to tokens:
  - compute in backend and **store as integers**.
- When deducting tokens:
  - always check `balance >= cost`,
  - fail gracefully with clear error if insufficient.

---

## 4. Token Packs (MVP)

Token packs are pre-defined SKU-like products purchasable in fiat. Prices below are **examples** and should be configurable.

### 4.1 Proposed packs

Base currency: EUR.

| Pack ID         | Label            | Tokens | Base price (EUR) | Effective rate     |
|-----------------|------------------|--------|------------------|--------------------|
| `tp-5k`         | Starter          | 5 000  | €50              | 100 tokens / €1    |
| `tp-10k`        | Standard         | 10 000 | €95              | ~105 tokens / €1   |
| `tp-25k`        | Pro              | 25 000 | €225             | ~111 tokens / €1   |
| `tp-50k`        | Advanced         | 50 000 | €430             | ~116 tokens / €1   |
| `tp-100k`       | Expert           | 100 000| €800             | 125 tokens / €1    |

- Larger packs give a **better price per token**.
- Exact numbers can be tweaked, but shape should be:
  - small pack = simple 100 tokens / unit,
  - large pack = slightly discounted.

### 4.2 Display on pricing page

For each pack, show:

- Label: `Starter`, `Standard`, `Pro`, `Advanced`, `Expert`.
- Tokens: `5 000 tokens`.
- Price:
  - `€50` (converted to current UI currency).
- Effective rate line (optional, small text):
  - `≈ 100 tokens per €1` or `≈ 116 tokens per €1`.

---

## 5. Custom Top-Up

### 5.1 Behaviour

- User can add any amount (within min/max) to their balance.

Flow:

1. User selects a currency and enters an amount (e.g. `€30`).
2. Backend:
   - Converts amount to EUR (if needed),
   - multiplies by 100,
   - applies optional bonus logic (v2),
   - returns number of tokens that will be credited.
3. Checkout:
   - Payment is processed in selected currency.
4. On success:
   - tokens credited immediately,
   - transaction recorded.

### 5.2 Limits

- Min amount: `€10` equivalent.
- Max amount: `€2 000` equivalent (can be adjusted; anti-fraud).

### 5.3 UI messaging

- Primary label: `Custom top-up`.
- Placeholder: `Enter amount`.
- Helper text:
  - `You will receive approximately X tokens.`
  - `Exact amount is shown before confirming payment.`

---

## 6. Product Pricing (Courses, Custom Course, AI Strategy)

### 6.1 Ready-made courses (PDF)

Example baseline (EUR):

| Course tier    | Examples (from home)                              | Price (EUR) | Tokens (100 per €) |
|----------------|----------------------------------------------------|-------------|--------------------|
| Beginner       | `Forex Foundations: From Zero to First Trade`      | €79         | 7 900 tokens       |
| Intermediate   | `Crypto Volatility Structures`                     | €99         | 9 900 tokens       |
| Advanced       | `Binary Risk & Payout Geometry`                    | €119        | 11 900 tokens      |

- Each course has:
  - `priceEur` field in DB,
  - derived fields for other currencies and tokens.

### 6.2 Custom course by pro trader

- High-effort product (AI + PDF generation + human-like delay).
- Suggested pricing (can be configured):

  - Base price: `€249` (24 900 tokens).
  - Optional:
    - Add-ons (e.g. “follow-up Q&A” in future).

- Payment options:

  - **Fiat**:
    - Pay full price in selected currency at checkout.
  - **Tokens**:
    - Require `tokens >= 24 900`,
    - Deduct immediately on confirming request.

### 6.3 AI strategy plan

- Low-ticket, instant.

Suggested pricing:

- `€19` per run (1 900 tokens).

Alternative options:

- Bundles (3 strategies for €49) – v2.

MVP:

- One price per run.
- If user has tokens:
  - Deduct tokens **first**.
- If user has no or insufficient tokens:
  - Offer either:
    - direct one-time purchase,
    - or redirect to pricing page to buy tokens.

---

## 7. Checkout UX & Rules

### 7.1 Entry points to `/checkout`

- “Buy course” or “View details → Buy” from:
  - `/courses`
  - `/courses/[slug]`
- “Buy token pack” or “Custom top-up” from `/pricing`.
- Submission of custom course request from `/learn?tab=custom`.
- “Generate AI strategy” if paid (from `/learn?tab=ai`).

### 7.2 Cart model (MVP)

Simplified model:

- Cart contains either:
  - a single course purchase, **or**
  - a single token pack/custom top-up, **or**
  - a single high-ticket item (custom course).
- No multi-line shopping cart needed for MVP.

### 7.3 Choosing payment method

For items that support tokens and fiat (courses, custom course, AI strategy):

- If user has enough tokens:
  - Show two options:
    - `Pay with tokens (X tokens)` – highlighted if user seems token-first.
    - `Pay with card` – shows price in selected currency.
- If user does not have enough tokens:
  - Show card payment as primary.
  - Optionally show:
    - `Buy tokens instead` link to `/pricing#tokens`.

### 7.4 Taxes and fees (high-level)

- Backend is responsible for:
  - computing VAT,
  - adding any regional taxes,
  - returning final totals to frontend.
- UI:
  - simply displays `Total` and `incl. VAT` / `excl. VAT` labels as provided.
- Tokens:
  - When buying tokens, user is paying for **digital content credits** (details in Terms).

---

## 8. Display Conventions in UI

### 8.1 On course cards

- Show:

  - Title, level, market, short description.
  - `Price` in selected currency.
  - `Tokens` line with `≈ X tokens`.

Example:

- Price: `€79`.
- Tokens: `≈ 7 900 tokens`.

### 8.2 On pricing page

Separate sections:

1. **Token packs**
   - Cards with label, tokens, price, effective rate, `Buy pack` CTA.

2. **Custom top-up**
   - Simple card with amount input, approximate tokens, `Top up` CTA.

3. **Direct course payments**
   - Short copy explaining that users **can** pay without tokens if they prefer:
     - `Pay for ready-made courses in EUR, GBP, USD or AED at checkout.`

4. **AI strategy and custom course**
   - Short boxes with:
     - product name,
     - price,
     - tokens equivalent,
     - link to `/learn`.

### 8.3 In dashboard

- `Balance` shown as:
  - `Tokens: 12 300`, and optionally
  - `≈ €123` (based on static conversion at **time of display**, not a promise).
- Transaction history:
  - Clearly label:
    - `Token purchase`,
    - `Custom top-up`,
    - `Course purchase`,
    - `AI strategy run`,
    - `Custom course request`.

---

## 9. Edge Cases and Safeguards

### 9.1 Insufficient tokens

When user tries to:

- Generate an AI strategy, or
- Request a custom course, or
- Buy a course with tokens,

and `balance < cost`:

- UI should show:
  - `You don’t have enough tokens for this action.`
  - CTA: `Buy tokens` linking to `/pricing#tokens`.

### 9.2 Mixed payments (v2, not MVP)

- No partial token + card payments in MVP.
- Either full tokens or full fiat per transaction.

### 9.3 Refunds

- **Not handled in this spec**; defined in legal/ops documents.
- From tech side:
  - refunds should not silently re-credit tokens without an explicit decision.

---

## 10. Config & Constants (for Developers / AI in Cursor)

Recommended to centralise all pricing config in a single file, e.g.:

```ts
// src/config/pricing.ts
export const TOKEN_PER_EUR = 100;

export const TOKEN_PACKS = [
  { id: "tp-5k", label: "Starter", tokens: 5000, priceEur: 50 },
  { id: "tp-10k", label: "Standard", tokens: 10000, priceEur: 95 },
  { id: "tp-25k", label: "Pro", tokens: 25000, priceEur: 225 },
  { id: "tp-50k", label: "Advanced", tokens: 50000, priceEur: 430 },
  { id: "tp-100k", label: "Expert", tokens: 100000, priceEur: 800 },
];

export const COURSE_PRICING = {
  beginner: 79,
  intermediate: 99,
  advanced: 119,
};

export const CUSTOM_COURSE_PRICE_EUR = 249;
export const AI_STRATEGY_PRICE_EUR = 19;
```

Conversion and formatting can be handled by a small pricing service:

```ts
// src/lib/pricing.ts
type Currency = "EUR" | "GBP" | "USD" | "AED";

export function priceInCurrency(
  baseEur: number,
  currency: Currency,
  rates: Record<Currency, number>
) {
  const raw = baseEur * rates[currency];
  // Round to 0 or 2 decimals depending on currency rules
  return Math.round(raw); // simplification
}

export function tokensFromEur(amountEur: number, tokenPerEur = TOKEN_PER_EUR) {
  return Math.round(amountEur * tokenPerEur);
}
```

---

## 11. Notes for AI in Cursor

When generating or modifying pricing-related code:

1. Use **EUR as base** for all canonical prices.
2. Derive tokens using the `100 tokens = 1 EUR` rule unless config overrides it.
3. For new products:
   - add entries to central pricing config,
   - always define `priceEur` and derive others.
4. Do not introduce:
   - fractional tokens,
   - partial-token payments (MVP).
5. Maintain alignment with marketing copy:
   - token packs,
   - direct course payments,
   - AI strategy and custom course pricing.
6. Any UI text about money should avoid:
   - promising returns,
   - framing tokens as investments; they are **credits** to access educational content.
