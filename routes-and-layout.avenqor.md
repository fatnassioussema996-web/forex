
# Avenqor Routes and Layouts

File: `routes-and-layout.avenqor.md`  
Version: 0.1  
Stack: Next.js (App Router), React, TailwindCSS

This document defines the URL structure, page grouping and layout usage for the Avenqor web app. It is designed for developers and AI assistants (e.g. in Cursor) to keep routing consistent and predictable.

---

## 1. High-level Structure

We split the app into 5 groups:

1. **Marketing / Public pages**
2. **Learning flows (courses, custom course, AI strategy)**
3. **Dashboard (authenticated area)**
4. **Checkout and payments**
5. **Legal and utility pages**

Localization (EN / AR) is handled at the framework level (e.g. Next.js i18n or provider) and **does not change the route paths** in this spec. The same path serves both languages with different content.

---

## 2. Layouts

We use three main layout types:

### 2.1 `MainLayout`

Used for all public marketing pages and most flows.

- Includes:
  - Sticky header with logo, nav, currency dropdown, language toggle, Sign in / Get started.
  - Footer with product links and legal links.
- Background:
  - Dark gradient + radial glows (as per design system).
- Route group (suggested): `app/(main)/*`.

Pages using `MainLayout`:

- `/`
- `/courses`
- `/courses/[slug]`
- `/learn` (Custom course + AI Strategy tabs)
- `/pricing`
- `/glossary`
- `/resources`
- `/faq`
- `/about`
- `/contact`
- All legal pages (can share the same layout but with simpler header if needed).

### 2.2 `DashboardLayout`

Used for authenticated user area.

- Includes:
  - Top bar with small logo, user menu, balance.
  - Left sidebar with links to dashboard sections (Courses, AI strategies, Transactions, Settings).
  - Main content area.
- Route group (suggested): `app/(dashboard)/dashboard/*`.

Pages using `DashboardLayout`:

- `/dashboard`
- `/dashboard/courses`
- `/dashboard/ai-strategies`
- `/dashboard/transactions`
- `/dashboard/settings`

### 2.3 `AuthLayout`

Used for sign-in and sign-up screens.

- Minimal header (just logo and “Education only”).
- Centered auth card.
- Route group (suggested): `app/(auth)/auth/*`.

Pages using `AuthLayout`:

- `/auth/sign-in`
- `/auth/sign-up` (optional for later)

---

## 3. Route List (Overview Table)

### 3.1 Marketing / Public

| Route            | Type       | Layout        | Nav label        | Notes                                                                 |
|------------------|------------|--------------|------------------|-----------------------------------------------------------------------|
| `/`              | Home       | MainLayout   | Home (logo)      | Hero, featured courses, paths, glossary/resources teasers, risk, FAQ |
| `/courses`       | Listing    | MainLayout   | Courses          | All public courses, filters, pagination                               |
| `/courses/[slug]`| Detail     | MainLayout   | —                | Individual course page                                                |
| `/pricing`       | Marketing  | MainLayout   | Pricing          | Tokens & direct payments details                                      |
| `/glossary`      | Content    | MainLayout   | Glossary         | Full glossary list and search                                         |
| `/resources`     | Content    | MainLayout   | Resources        | List of checklists, templates, PDFs                                   |
| `/faq`           | Content    | MainLayout   | FAQ              | Expanded FAQ beyond home snippet                                      |
| `/about`         | Marketing  | MainLayout   | About            | About Avenqor, mission, “not a broker” messaging                      |
| `/contact`       | Utility    | MainLayout   | Contact          | Contact form, basic company info                                     |

### 3.2 Learning Flows

| Route         | Type                | Layout      | Nav label        | Notes                                                                                              |
|--------------|---------------------|------------|------------------|----------------------------------------------------------------------------------------------------|
| `/learn`     | Flow (tabbed)       | MainLayout | Custom course / AI Strategy | Single page with two tabs: Custom course and AI Strategy                                          |
| `/learn?tab=custom` | Tab state    | MainLayout | Custom course    | Deep-link to open page with “Custom course” tab active                                            |
| `/learn?tab=ai`     | Tab state    | MainLayout | AI Strategy      | Deep-link to open page with “AI Strategy” tab active                                              |

Header nav:

- `Custom course` → link to `/learn?tab=custom`
- `AI Strategy` → link to `/learn?tab=ai`

Buttons:

- Hero “Request custom course” → `/learn?tab=custom`
- “Open AI Strategy Builder” → `/learn?tab=ai`

### 3.3 Dashboard (Authenticated)

| Route                     | Type        | Layout          | Nav label       | Notes                                                      |
|---------------------------|-------------|-----------------|-----------------|------------------------------------------------------------|
| `/dashboard`              | Overview    | DashboardLayout | Dashboard       | High-level summary: last courses, AI plans, balance        |
| `/dashboard/courses`      | Library     | DashboardLayout | My courses      | List of purchased courses with download/open actions       |
| `/dashboard/ai-strategies`| Library     | DashboardLayout | AI strategies   | History of generated AI plans                              |
| `/dashboard/transactions` | History     | DashboardLayout | Transactions    | Token purchase and spending history                        |
| `/dashboard/settings`     | Settings    | DashboardLayout | Settings        | Account details, language preference, notifications, etc.  |

Access rules:

- All `/dashboard/*` routes require authentication.
- Redirect unauthenticated users to `/auth/sign-in` with a “returnTo” parameter.

### 3.4 Checkout and Payments

| Route           | Type          | Layout      | Nav label | Notes                                                                                 |
|-----------------|---------------|------------|-----------|---------------------------------------------------------------------------------------|
| `/checkout`     | Checkout flow | MainLayout | —         | Single-page checkout for courses, token packs and custom top-ups                     |
| `/pricing`      | Marketing     | MainLayout | Pricing   | Describes token packs, custom top-up, direct course payments; links into `/checkout` |

Expected entry points into `/checkout`:

- From `/courses/[slug]` “Buy course” button.
- From `/pricing` “Buy token pack” / “Top up balance” buttons.
- From `/learn` when requesting a custom course or a paid AI strategy.

### 3.5 Legal and Utility

| Route                 | Type   | Layout      | Nav label         | Notes                                             |
|-----------------------|--------|------------|-------------------|---------------------------------------------------|
| `/risk-and-disclaimer`| Legal  | MainLayout | Risk & Disclaimer | Detailed risk text for all markets                |
| `/terms`              | Legal  | MainLayout | Terms & Conditions| Platform terms                                    |
| `/privacy`            | Legal  | MainLayout | Privacy Policy    | Data handling, cookies links here                 |
| `/cookies`            | Legal  | MainLayout | Cookies           | Cookie policy                                     |
| `/contact`            | Utility| MainLayout | Contact           | Contact us form                                   |

Footer links map to these routes.

### 3.6 Auth

| Route            | Type | Layout      | Nav label | Notes                                    |
|------------------|------|------------|-----------|------------------------------------------|
| `/auth/sign-in`  | Auth | AuthLayout | Sign in   | Used by header Sign in button            |
| `/auth/sign-up`  | Auth | AuthLayout | —         | Optional separate route if needed later  |

---

## 4. Header Navigation Mapping

Header items and their target routes:

- **Logo / brand** → `/`
- **Courses** → `/courses`
- **Custom course** → `/learn?tab=custom`
- **AI Strategy** → `/learn?tab=ai`
- **Pricing** → `/pricing`
- **Glossary** → `/glossary`
- **Resources** → `/resources`
- **FAQ** → `/faq`
- **Sign in** → `/auth/sign-in`
- **Get started**:
  - Default: `/pricing` or `/courses` (to be decided; default can be `/courses` for now).

Language and currency controls:

- Language toggle (EN/AR): does **not** change route, only locale in app state / provider.
- Currency dropdown: affects displayed prices (EUR, GBP, USD, AED), not the path.

---

## 5. Footer Navigation Mapping

Footer columns:

### 5.1 Brand & mini disclaimer

- Text only, no routes:
  - `Avenqor`
  - `Avenqor provides education only. We do not offer financial advice.`

### 5.2 Product links

- `Courses` → `/courses`
- `Custom course` → `/learn?tab=custom`
- `AI Strategy` → `/learn?tab=ai`
- `Glossary` → `/glossary`
- `Resources` → `/resources`

### 5.3 Legal links

- `Risk & Disclaimer` → `/risk-and-disclaimer`
- `Terms & Conditions` → `/terms`
- `Privacy Policy` → `/privacy`
- `Cookies` → `/cookies`
- `Contact` → `/contact`

---

## 6. Home Page Section Anchors (Optional)

On the `/` route, we may expose fragment anchors for smooth scroll from future links:

- `/#courses` → Featured courses section
- `/#paths` → Three ways to learn section
- `/#tokens` → Tokens and direct payments teaser
- `/#glossary` → Glossary and resources teaser
- `/#risk` → Risk notice
- `/#faq` → Home FAQ snippet

These are **optional** and should not replace the full pages (`/courses`, `/pricing`, `/glossary`, etc.), but can be used for marketing links and internal promos.

---

## 7. Access and Gating Rules

- Public pages:
  - `/`, `/courses`, `/courses/[slug]` (course description only),
  - `/pricing`, `/glossary`, `/resources`, `/faq`, `/about`, `/contact`,
  - all legal routes and `/learn` initial form views.

- Actions requiring authentication:
  - Purchasing a course (proceed to checkout as logged-in user).
  - Requesting a custom course (final submission).
  - Generating an AI strategy (if paid).
  - Accessing `/dashboard/*`.
  - Downloading purchased PDFs.

Suggested behaviour:

- If an unauthenticated user attempts a protected action:
  - redirect to `/auth/sign-in?returnTo=<original-path>`.

---

## 8. File and Directory Structure (Suggested)

Using Next.js App Router, a possible structure:

```text
app
├─ (main)
│  ├─ layout.tsx            // MainLayout
│  ├─ page.tsx              // Home (/)
│  ├─ courses
│  │  ├─ page.tsx           // /courses
│  │  └─ [slug]
│  │     └─ page.tsx        // /courses/[slug]
│  ├─ learn
│  │  └─ page.tsx           // /learn (tabs for custom/AI)
│  ├─ pricing
│  │  └─ page.tsx           // /pricing
│  ├─ glossary
│  │  └─ page.tsx           // /glossary
│  ├─ resources
│  │  └─ page.tsx           // /resources
│  ├─ faq
│  │  └─ page.tsx           // /faq
│  ├─ about
│  │  └─ page.tsx           // /about
│  ├─ contact
│  │  └─ page.tsx           // /contact
│  ├─ risk-and-disclaimer
│  │  └─ page.tsx           // /risk-and-disclaimer
│  ├─ terms
│  │  └─ page.tsx           // /terms
│  ├─ privacy
│  │  └─ page.tsx           // /privacy
│  └─ cookies
│     └─ page.tsx           // /cookies
│
├─ (dashboard)
│  ├─ dashboard
│  │  ├─ layout.tsx         // DashboardLayout
│  │  ├─ page.tsx           // /dashboard
│  │  ├─ courses
│  │  │  └─ page.tsx        // /dashboard/courses
│  │  ├─ ai-strategies
│  │  │  └─ page.tsx        // /dashboard/ai-strategies
│  │  ├─ transactions
│  │  │  └─ page.tsx        // /dashboard/transactions
│  │  └─ settings
│  │     └─ page.tsx        // /dashboard/settings
│
├─ (auth)
│  └─ auth
│     ├─ layout.tsx         // AuthLayout
│     ├─ sign-in
│     │  └─ page.tsx        // /auth/sign-in
│     └─ sign-up
│        └─ page.tsx        // /auth/sign-up (optional)
│
└─ checkout
   └─ page.tsx              // /checkout
```

This structure is a **guideline**; actual implementation can vary as long as route paths stay consistent with this spec.

---

## 9. Notes for AI in Cursor

When creating or editing pages:

1. Use the routes defined here; avoid inventing new paths unless explicitly requested.
2. Reuse `MainLayout`, `DashboardLayout`, and `AuthLayout` instead of building custom headers/footers per page.
3. For `Custom course` and `AI Strategy`, always:
   - link to `/learn?tab=custom` and `/learn?tab=ai`,
   - keep them as two tabs on a single page.
4. When adding internal links from content (e.g. in copy), prefer:
   - `/courses` over anchored `/#courses` when referring to the full view,
   - `/pricing` for payment and tokens details,
   - `/risk-and-disclaimer` for full risk statements.
5. Any new page or route should:
   - be classified into one of the 5 groups above,
   - specify which layout it uses.
