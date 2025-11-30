
# Avenqor Pages Roadmap

File: `avenqor-pages-roadmap.md`  
Version: 0.1  
Purpose: Track page design & implementation progress for Avenqor in the IDE.

---

## 1. Legend

- **Status**
  - `done` – page designed and approved (implementation may still be refined).
  - `in-progress` – currently being designed/implemented.
  - `planned` – agreed but not started yet.
- **Phase**
  - `P1 – Core funnel` – pages that directly impact first revenue.
  - `P2 – Account & dashboard` – signed-in experience and balances.
  - `P3 – Legal & trust` – policies, disclaimers, FAQ, “about”.
  - `P4 – System & edge` – error pages, payment outcomes.

---

## 2. Recommended Implementation Order (High-Level)

**P1 – Core funnel (marketing & purchase path)**  
1. Home (/) – ✅ already designed.  
2. Courses listing (/courses).  
3. Course detail (/courses/[slug]).  
4. Learn – Custom & AI tabs (/learn).  
5. Pricing & tokens (/pricing).  
6. Checkout core (/checkout).

**P2 – Account & dashboard**  
7. Auth pages (sign-in, sign-up, reset).  
8. Dashboard overview (/dashboard).  
9. My library (/dashboard/library).  
10. Custom courses statuses (/dashboard/custom-courses).  
11. Billing & tokens (/dashboard/billing).  
12. Account settings (/dashboard/settings).

**P3 – Legal, trust & info**  
13. FAQ (/faq).  
14. About (/about).  
15. Contact (/contact).  
16. Risk & Disclaimer (/legal/risk-and-disclaimer).  
17. Terms & Conditions (/legal/terms).  
18. Privacy Policy (/legal/privacy).  
19. Cookies Policy (/legal/cookies).  
20. Glossary (/glossary).  
21. Resources (/resources).

**P4 – System & edge pages**  
22. Checkout success (/checkout/success).  
23. Checkout error (/checkout/error).  
24. 404 (/404).  
25. 500 (/500).

---

## 3. Page List with Status

> Update this table as work progresses.

### 3.1 P1 – Core funnel

| Order | Phase | Page name             | Route                          | Status     | Notes                            |
|-------|-------|-----------------------|--------------------------------|-----------|----------------------------------|
| 1     | P1    | Home                  | `/`                            | done      | Visual preview & content ready. |
| 2     | P1    | Courses listing       | `/courses`                     | done      | Grid, filters, pagination.      |
| 3     | P1    | Course detail         | `/courses/[slug]`              | done      | Outline, syllabus, buy options. |
| 4     | P1    | Learn (Custom & AI)   | `/learn`                       | done      | Tabs: custom course / AI plan.  |
| 5     | P1    | Pricing & tokens      | `/pricing`                     | done      | Packs + custom top-up details.  |
| 6     | P1    | Checkout              | `/checkout`                    | done  | One-item flow (course/tokens).  |

### 3.2 P2 – Account & dashboard

| Order | Phase | Page name               | Route                          | Status   | Notes                                   |
|-------|-------|-------------------------|--------------------------------|---------|-----------------------------------------|
| 7     | P2    | Sign in                 | `/auth/sign-in`                | done | Simple form, redirect to dashboard.     |
| 8     | P2    | Sign up                 | `/auth/sign-up`                | done | Token-based onboarding.                 |
| 9     | P2    | Reset password          | `/auth/reset-password`         | planned | Forgot/reset flow (email-based).        |
| 10    | P2    | Dashboard overview      | `/dashboard`                   | planned | Balance + recent items snapshot.        |
| 11    | P2    | My library              | `/dashboard/library`           | planned | Courses + AI strategies list.           |
| 12    | P2    | Custom courses          | `/dashboard/custom-courses`    | planned | Status: pending / in progress / ready.  |
| 13    | P2    | Billing & tokens        | `/dashboard/billing`           | planned | Transactions, top-ups, packs.           |
| 14    | P2    | Account settings        | `/dashboard/settings`          | planned | Profile, language, notifications.       |

### 3.3 P3 – Legal, trust & info

| Order | Phase | Page name             | Route                                 | Status   | Notes                                    |
|-------|-------|-----------------------|---------------------------------------|---------|------------------------------------------|
| 15    | P3    | FAQ                   | `/faq`                                | done| Tiny FAQ on home links here.             |
| 16    | P3    | About                 | `/about`                              | planned | Brand story, positioning, team concept.  |
| 17    | P3    | Contact               | `/contact`                            | planned | Form + email + minimal info.             |
| 18    | P3    | Risk & Disclaimer     | `/legal/risk-and-disclaimer`          | planned | Central risk messaging.                  |
| 19    | P3    | Terms & Conditions    | `/legal/terms`                        | planned | Tokens, digital content, no guarantees.  |
| 20    | P3    | Privacy Policy        | `/legal/privacy`                      | planned | Data, cookies, analytics.                |
| 21    | P3    | Cookies Policy        | `/legal/cookies`                      | planned | Banner + consent logic reference.        |
| 22    | P3    | Glossary              | `/glossary`                           | planned | Full version of key terms.               |
| 23    | P3    | Resources             | `/resources`                          | planned | Checklists, templates, PDFs.             |

### 3.4 P4 – System & edge pages

| Order | Phase | Page name        | Route                 | Status   | Notes                                 |
|-------|-------|------------------|-----------------------|---------|---------------------------------------|
| 24    | P4    | Checkout success | `/checkout/success`   | planned | Clear confirmation & next steps.      |
| 25    | P4    | Checkout error   | `/checkout/error`     | planned | Error state + support guidance.       |
| 26    | P4    | 404 Not Found    | `/404`                | planned | Brand-consistent, soft language.      |
| 27    | P4    | 500 Error        | `/500`                | planned | Fallback for unexpected failures.     |

---

## 4. Suggested Work Sequence (Detailed)

Use this as a practical order when working in Cursor / IDE.

### Step 1 – Stabilise core visual language

- [x] Home preview + design system baseline.
- [x] Token packs & custom top-up preview block.
- [ ] Extract shared layout (header, footer, containers) into reusable components.

### Step 2 – Courses funnel

- [ ] Design & implement `/courses`:
  - card layout and filters (market, level),
  - real content placeholders.
- [ ] Design & implement `/courses/[slug]`:
  - hero with level/market,
  - syllabus, module list,
  - pricing block (tokens + direct payment),
  - risk notice slice.

### Step 3 – Learn (Custom + AI)

- [ ] Design `/learn` with tab interface:
  - Tab 1: Custom course form, step-by-step, consent checkboxes.
  - Tab 2: AI strategy form, presets + advanced options.
- [ ] Define empty states and “after submit” confirmations.

### Step 4 – Pricing & checkout

- [ ] Move token pack & custom top-up section into `/pricing`.
- [ ] Add explanatory copy about tokens vs direct payments.
- [ ] Implement `/checkout` preview:
  - summary card for what is being purchased,
  - token vs direct payment choice,
  - risk & terms checkbox.

### Step 5 – Auth & dashboard skeleton

- [ ] Create simple versions of sign-in, sign-up, reset.
- [ ] Implement dashboard shell with sidebar and header.
- [ ] Add basic views for:
  - overview,
  - library,
  - custom course statuses,
  - billing.

### Step 6 – Legal & trust

- [ ] Add stubs for legal pages with correct routes and headings.
- [ ] Fill Risk & Disclaimer with strong education-only messaging.
- [ ] Link from home risk section, footer, and key flows.

### Step 7 – System pages & polishing

- [ ] Implement `/checkout/success` and `/checkout/error`.
- [ ] Implement custom 404 and 500 with branded messages.
- [ ] Run accessibility + SEO checklist and fix issues.

---

## 5. Notes for Future Updates

- When a page is fully designed and accepted, set its status to `done`.
- When a page is being actively worked on, set `in-progress`.
- Any new routes should be appended to this file and assigned a phase.
