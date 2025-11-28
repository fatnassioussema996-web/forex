
# Avenqor AI Features Spec

File: `ai-features-spec.avenqor.md`  
Version: 0.1  
Scope: Behaviour and implementation guidelines for AI-powered features in Avenqor.

---

## 1. Purpose and Scope

Avenqor uses AI (OpenAI API) in **two main features**:

1. **Custom course by a pro trader**  
   - User fills a detailed profile.  
   - System generates a tailored PDF course.  
   - Delivery is communicated as **48–96 hours** to simulate a human expert working on it.

2. **AI strategy in seconds**  
   - User provides a concise set of inputs.  
   - System generates an **instant text plan** (setup + entry/exit + risk + checklist).  
   - Optionally extended with charts/illustrations in future.

This spec covers:

- UX and state machine for both features.
- Required form fields and validation.
- Prompt design and response formats for OpenAI.
- Token/billing hooks and rate limits.
- Safety and wording constraints (no financial advice, no promises).

---

## 2. Shared Constraints and Principles

**Hard business rules**

- Avenqor provides **education only**, not financial advice.
- No execution of trades, no signals, no copy-trading, no guaranteed returns.
- Content is designed for **learning and scenario thinking**, not direct “do this now” instructions.

**Words to avoid in AI outputs**

Prompts must explicitly instruct the model **not** to use phrases like:

- "guaranteed profit", "risk-free", "safe income", "consistent monthly returns"
- "you should open a trade now", "enter here immediately", "100% win rate"
- Direct trade calls tied to real-time prices.

Instead, wording should be:

- "example structure", "illustrative scenario", "for educational purposes", "hypothetical setup".

**Markets**

- Forex, Crypto, Binary options (shortened to `Forex`, `Crypto`, `Binary` in UI).
- Model must treat all three as **high-risk**.

---

## 3. Data Model (High-Level)

Not actual database schema, but conceptual entities.

### 3.1 `CustomCourseRequest`

Fields (minimal):

- `id` (string/UUID)
- `userId`
- `status`: `"draft" | "pending_payment" | "in_queue" | "processing" | "ready" | "failed"`
- `experienceYears`: `"0" | "1-2" | "3+"`
- `depositBudget`: string (e.g. "€2 000" or numeric value + currency)
- `riskTolerance`: `"low" | "medium" | "high"`
- `markets`: array of `"Forex" | "Crypto" | "Binary"`
- `tradingStyle`: `"scalp" | "day" | "swing"`
- `goalsFreeText`: long string
- `additionalNotes`: optional string (e.g. work schedule, preferred platforms)
- `language`: `"en" | "ar"`
- `createdAt`, `updatedAt`
- `estimatedReadyAt`: datetime (random 48–96h window)
- `tokensCost`: integer (e.g. 50000)
- `paymentId` (link to payment/checkout)
- `aiModel`: string (e.g. `gpt-4.1`)
- `aiPrompt`, `aiResponseStructured`: stored for audit
- `pdfUrl`: final generated course file (once ready)

### 3.2 `AiStrategyRun`

Fields (minimal):

- `id`
- `userId`
- `experienceYears`
- `depositBudget`
- `riskTolerance`
- `markets` (1+)
- `tradingStyle`
- `timeCommitment`: e.g. "1–2 hours per day", "weekends only" (nice to add)
- `mainObjective`: short free text
- `language`
- `createdAt`
- `tokensCost`
- `aiModel`
- `aiPrompt`, `aiResponseStructured`
- `renderedText` (Markdown/HTML for UI)
- `status`: `"processing" | "ready" | "failed"`

---

## 4. Custom Course (Pro Trader) – UX and Flow

### 4.1 Entry Points

- Home `Three ways to learn` card → **"Request custom course"** button → `/learn?tab=custom`
- Header nav **"Custom course"** → `/learn?tab=custom`
- Footer CTA secondary button.

### 4.2 Form Fields (v1)

Section: **Your profile**

- Experience:
  - Radio/pill group: `0 years`, `1–2 years`, `3+ years`.
- Deposit budget:
  - Text or number field (with currency hint): `Approximate deposit (EUR/GBP/USD/AED)`.
- Risk tolerance:
  - Pill group: `Low`, `Medium`, `High`.
- Markets:
  - Multi-select chips: `Forex`, `Crypto`, `Binary`.
- Trading style:
  - Pill group: `Scalp`, `Day`, `Swing`.

Section: **Your context**

- Time commitment:
  - Options: `1–2 hours per day`, `Evenings only`, `Weekends only`, `Flexible`, plus "Other" free text.
- Main objective (free text):
  - "What do you want to achieve with this course?"
- Additional notes (optional):
  - Platform, timezone, constraints, etc.

Section: **Delivery and consent**

- Email (if not already in account).
- Language preference: `EN` / `AR`.
- Checkbox:
  - `I understand that Avenqor provides education only and does not offer financial advice.`
- Checkbox:
  - `I agree to the Terms & Conditions and Risk & Disclaimer.`

### 4.3 Flow States

1. **Fill form → click “Continue”**
   - Validate required fields.
   - Save `CustomCourseRequest` as `draft` or `pending_payment`.

2. **Payment step**
   - Decide tokens vs direct payment.
   - After successful payment:
     - `status` → `"in_queue"`.
     - `estimatedReadyAt` = `createdAt + random(48h, 96h)`.

3. **AI generation (background job/worker)**

   Recommended implementation:

   - A queue/worker picks up `"in_queue"` items.
   - Calls OpenAI with a **structured prompt** to generate **course blueprint** (JSON or strict Markdown).
   - Calls PDF generator service to turn blueprint into final course PDF.
   - On success:
     - `status` → `"ready"`,
     - `pdfUrl` set,
     - email notification sent.

4. **User experience**

   - Immediately after payment:
     - Confirmation screen + email:  
       *"We’re preparing your custom course. You’ll receive it within 48–96 hours."*
   - Dashboard `/dashboard/courses`:
     - Shows the request with status `Pending` / `In progress` / `Ready`.
   - When `Ready`:
     - Email with download link.
     - Dashboard shows `Download PDF`.

---

## 5. AI Strategy – UX and Flow

### 5.1 Entry Points

- Home `Three ways to learn` card → **"Open AI Strategy Builder"** → `/learn?tab=ai`
- Header nav **"AI Strategy"** → `/learn?tab=ai`
- Later from dashboard (`New strategy`).

### 5.2 Form Fields (v1)

Section: **Basics**

- Experience years (same as custom course).
- Deposit budget (approximate, with currency hint).
- Risk tolerance: `Low`, `Medium`, `High`.

Section: **Markets and style**

- Primary markets (multi-select): `Forex`, `Crypto`, `Binary`.
- Trading style: `Scalp`, `Day`, `Swing`.
- Time commitment: same options as custom course.

Section: **Objective**

- Short free text:  
  `What do you want this plan to focus on?`  
  Example placeholders:
  - "Reduce over-trading and control risk per trade"
  - "Define one clear setup for BTC and one for EUR/USD"

Section: **Consent**

- Checkbox:  
  `I understand that this plan is for educational purposes only and is not financial advice.`

### 5.3 Flow States

1. User fills form → clicks **"Generate AI strategy"**.
2. Front-end sends POST `/api/ai-strategy` payload.
3. Backend:
   - Validates payload.
   - Verifies token balance **or** charges one-time price (as per pricing spec).
   - Creates `AiStrategyRun` with `status = "processing"`.
   - Calls OpenAI with structured prompt.

4. Response:

- On success:
  - Store structured response.
  - Render it into Markdown/HTML.
  - `status = "ready"`.
  - Return plan to caller.
- On failure:
  - `status = "failed"`.
  - Return generic error and log details.

5. UI behaviour:

- Show inline loading state (skeleton or spinner) within the result panel.
- After plan is ready:
  - Show `Download PDF` (optional v2),
  - Show `Save to dashboard` (implicit when logged in).

---

## 6. Prompt Design – Shared Elements

### 6.1 System Message Template (EN)

```text
You are an expert trading educator with deep experience in Forex, Crypto and Binary options.

Your job:
- Create structured, educational content for Avenqor users.
- Focus on concepts, frameworks and example scenarios.
- NEVER give real-time trading calls or signals.
- NEVER promise profits or specific performance.
- ALWAYS treat trading as high-risk and emphasise risk management.

Avenqor is an education-only platform:
- Do not present your output as financial advice.
- Use clear headings, bullet lists and checklists.
- Avoid hype and marketing language.
```

For Arabic, either translate this system message or let the model answer in AR based on a user parameter.

### 6.2 Safety Add-on

Append to every system or user message:

```text
Forbidden:
- Phrases like "guaranteed profit", "risk-free", "safe income", "easy money".
- Direct instructions to open or close a specific trade right now.
- Real-time price calls based on current market data.

If the user asks for signals, copy-trading or guaranteed returns:
- Politely refuse and redirect them to risk management and education.
```

---

## 7. Prompt Design – Custom Course Blueprint

### 7.1 Goal

Generate a **course blueprint** that will be fed into a PDF generator. Output must be **strict JSON** that follows a known structure.

### 7.2 Output JSON Shape (v1)

```jsonc
{
  "meta": {
    "title": "string",
    "subtitle": "string",
    "level": "Beginner | Intermediate | Advanced",
    "markets": ["Forex", "Crypto"],
    "estimatedStudyHours": 12,
    "language": "en"
  },
  "profileSummary": {
    "experienceYears": "0 | 1-2 | 3+",
    "riskTolerance": "low | medium | high",
    "depositBudgetNote": "string",
    "timeCommitment": "string",
    "mainObjective": "string"
  },
  "riskOverview": {
    "highLevelWarning": "string",
    "keyPoints": ["string", "string", "string"]
  },
  "modules": [
    {
      "title": "Module 1 title",
      "goal": "What the learner should be able to do after this module.",
      "sections": [
        {
          "title": "Section title",
          "content": [
            "Paragraph 1 as plain text.",
            "Paragraph 2 as plain text.",
            "Use lists like this: 1) item one 2) item two."
          ],
          "checklist": [
            "Practical checklist item one.",
            "Practical checklist item two."
          ]
        }
      ]
    }
  ],
  "finalChecklist": [
    "Global checklist item one.",
    "Global checklist item two."
  ]
}
```

### 7.3 Example User Prompt (Backend)

Pseudocode for the backend OpenAI call:

```ts
const messages = [
  { role: "system", content: SYSTEM_MESSAGE_CUSTOM_COURSE },
  {
    role: "user",
    content: [
      "Create a tailored course blueprint for this profile.",
      "",
      "Profile:",
      `Experience: ${experienceYears} years`,
      `Deposit budget: ${depositBudget}`,
      `Risk tolerance: ${riskTolerance}`,
      `Markets: ${markets.join(", ")}`,
      `Trading style: ${tradingStyle}`,
      `Time commitment: ${timeCommitment}`,
      `Main objective: ${mainObjective}`,
      additionalNotes ? `Additional notes: ${additionalNotes}` : "",
      "",
      "Output:",
      "- Return STRICT JSON only.",
      "- Follow the JSON schema provided.",
      "- Do not include any comments or Markdown.",
      "- Emphasise risk management and education.",
    ].join("\n")
  }
];
```

---

## 8. Prompt Design – AI Strategy Plan

### 8.1 Goal

Generate a **single, focused strategy plan** that can be rendered directly in the UI as Markdown, plus optionally a more structured JSON for storage.

### 8.2 Output Format – Hybrid (Markdown + Embedded Structure)

Preferred approach: ask model for **Markdown** with a consistent structure:

```text
# Strategy name

## Profile summary
- Experience: ...
- Risk tolerance: ...
- Markets: ...
- Style: ...
- Time commitment: ...
- Objective: ...

## Core idea
Short explanation of the main setup or approach.

## Market and timeframe
- Markets covered: ...
- Suggested timeframes: ...

## Entry logic
Explain entry conditions step by step.

## Exit logic
Explain exit conditions and what to avoid.

## Risk management
Bullet list:
- Maximum risk per trade
- Maximum open risk
- Example position sizing rule
- When to stop trading (daily/weekly limits)

## Checklist before placing any trade
- [...]
- [...]

## Example scenario (illustrative only)
Describe one or two hypothetical trades WITHOUT using real-time prices.
```

Alternatively, a JSON-style structure can be added in v2.

### 8.3 Example User Prompt (Backend)

```ts
const messages = [
  { role: "system", content: SYSTEM_MESSAGE_STRATEGY },
  {
    role: "user",
    content: [
      "Create an educational trading plan for this user.",
      "",
      "Profile:",
      `Experience: ${experienceYears} years`,
      `Deposit budget: ${depositBudget}`,
      `Risk tolerance: ${riskTolerance}`,
      `Markets: ${markets.join(", ")}`,
      `Trading style: ${tradingStyle}`,
      `Time commitment: ${timeCommitment}`,
      `Objective: ${objective}`,
      "",
      "Requirements:",
      "- Answer in Markdown.",
      "- Use the headings: Profile summary, Core idea, Market and timeframe, Entry logic, Exit logic, Risk management, Checklist before placing any trade, Example scenario (illustrative only).",
      "- Emphasise risk management and the possibility of losing capital.",
      "- Do NOT give real-time trade calls or promise profits.",
    ].join("\n")
  }
];
```

---

## 9. Token and Billing Hooks

Actual pricing will be defined in the pricing spec, but AI flows must integrate with tokens:

### 9.1 Custom Course

- Consumes a **fixed token amount per course** (e.g. 50 000 Avenqor tokens).
- Logic:
  - On purchase:
    - If paying with tokens:
      - Check balance ≥ cost → deduct immediately.
    - If paying with fiat:
      - Keep track of equivalent consumed tokens for internal metrics.

### 9.2 AI Strategy

- Consumes a **smaller token amount per run** (e.g. 2 000–5 000 tokens).
- Logic:
  - Before calling OpenAI:
    - Check that user has enough tokens or attach run to a one-time purchase.
  - Always log:
    - `tokensCost` on our side,
    - `promptTokens` and `completionTokens` from OpenAI for optimisation.

---

## 10. Error Handling and Timeouts

### 10.1 API Call Failures

If OpenAI API fails or times out:

- For Custom Course:
  - Mark `status = "failed"` or leave as `"in_queue"` and retry later.
  - Do **not** repeatedly charge tokens or payments.
  - Notify user via email if it cannot be generated after X attempts.

- For AI Strategy:
  - Show in UI:
    - `We couldn’t generate your plan right now. Please try again in a few minutes.`
  - Optionally refund tokens automatically if no output is produced.

### 10.2 Validation Errors

- Back-end must hard-validate:
  - Required fields present.
  - Basic sanity check on deposit (non-negative, not insane values).
- Return structured errors; front-end maps to fields.

---

## 11. Telemetry and Logging

- For each AI request, store:
  - `userId` (or null for anon),
  - feature type (`custom_course` or `ai_strategy`),
  - truncated prompt (sensitive parts removed if needed),
  - model name,
  - token usage,
  - status (`success` / `failure`),
  - timestamps.

- Do **not** log raw financial account numbers, passwords or similar sensitive data.

---

## 12. Notes for AI in Cursor

When generating or editing code for AI features:

1. Use the routes and flows defined here:
   - `/learn?tab=custom` for custom course.
   - `/learn?tab=ai` for AI strategy.
2. Do not promise profits or present advice:
   - Always shape copy and prompts around education and risk awareness.
3. For new fields in forms:
   - Extend `CustomCourseRequest` and `AiStrategyRun` consistently.
   - Update prompts to include the new signal.
4. Keep response formats consistent:
   - Custom course → **JSON blueprint** for PDF.
   - AI strategy → **Markdown plan** with defined sections.
5. Handle loading and error states in UI explicitly:
   - never silently fail,
   - always give the user clear next steps.
6. Always respect the **education only / no financial advice** positioning in copy and system prompts.
