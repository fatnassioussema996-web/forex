
# Avenqor Accessibility & SEO Checklist

File: `accessibility-and-seo-checklist.avenqor.md`  
Version: 0.1  
Scope: Practical checklist for accessibility (WCAG 2.2 AA), performance and SEO for Avenqor (avenqor.net), covering marketing pages, flows and dashboard.

---

## 1. Goals

- Meet or exceed **WCAG 2.2 AA** for all public and authenticated pages.
- Keep **Core Web Vitals** in healthy ranges:
  - **LCP** < 2.5s,
  - **CLS** < 0.1,
  - **INP** < 200ms (or FID equivalent).
- Ensure solid **SEO and discoverability** for main topics:
  - Forex education, Crypto education, Binary options education.
- Keep implementation **realistic for Next.js + React + Tailwind** and compatible with the Avenqor design system.

---

## 2. Global Accessibility Checklist

### 2.1 HTML and landmarks

- [ ] Set correct `lang` and `dir` on `<html>`:
  - `lang="en" dir="ltr"` for English.
  - `lang="ar" dir="rtl"` for Arabic.
- [ ] Use semantic landmarks:
  - One `<header>` per layout,
  - `<nav>` with `aria-label="Main"` for primary navigation,
  - `<main id="main-content">` for page content,
  - `<footer>` for footer.
- [ ] Add a **“Skip to main content”** link as the first focusable element in the page:
  - Visible on focus,
  - Points to `#main-content`.

### 2.2 Headings and structure

- [ ] Exactly one `<h1>` per page (e.g. hero heading).
- [ ] Use `h2` for main sections, `h3` for subsections; **no heading level gaps**.
- [ ] For cards:
  - Use `h3` / `h4` for titles inside sections.
- [ ] Ensure heading text is **descriptive**, not generic (“Learn more” is not a heading).

### 2.3 Color and contrast

- [ ] Text vs background adheres to **WCAG 2.2 AA**:
  - Normal text: contrast ratio ≥ 4.5:1,
  - Large text (≥ 18pt / 24px or 14pt / 18.66px bold): ≥ 3:1.
- [ ] Buttons and key UI controls:
  - Text contrast to button background ≥ 4.5:1,
  - Button background contrast vs page background sufficient to appear as a control.
- [ ] Do not rely on color alone for meaning:
  - Use icons, patterns or text labels for states (e.g. “Education only”, “Instant” badges).

### 2.4 Keyboard navigation

- [ ] All interactive elements are reachable via keyboard:
  - `Tab`, `Shift+Tab`, `Enter`, `Space`, arrow keys for menus/carousels where appropriate.
- [ ] Links and buttons:
  - Use semantic `<button>`/`<a>` elements,
  - Do **not** attach click handlers to `<div>` / `<span>` unless additionally wired with roles and key handlers (prefer avoiding this).
- [ ] Focus order matches visual order and logical reading order.
- [ ] No keyboard traps:
  - User can always tab away from modals, accordions, overlays.

### 2.5 Focus styles

- [ ] Use **visible focus outlines** for all focusable elements.
- [ ] Do not remove outlines without providing a clear visible alternative.
- [ ] In dark theme:
  - Use high-contrast outline (e.g. `ring-cyan-400` or `outline-offset` with lighter shade).
- [ ] Ensure focus state is accessible in both EN and AR layouts.

### 2.6 Motion and animation

- [ ] Respect user preferences:
  - Wrap non-essential animations with `prefers-reduced-motion` checks or Framer Motion’s equivalent.
- [ ] Keep hover/press transitions between **120–220ms**.
- [ ] Scroll-in animations:
  - 350–450ms, ease-out,
  - Avoid aggressive parallax or large-scale motion.
- [ ] No flashing or strobing effects.

### 2.7 Forms (Custom course / AI Strategy / Checkout)

- [ ] All inputs have visible labels (`<label for="...">` or ARIA-labelled).
- [ ] Placeholder is not used as a substitute for a label.
- [ ] Group related options (experience, risk, style) using:
  - `<fieldset>` + `<legend>` or accessible group labels.
- [ ] Required fields are:
  - marked visually,
  - described in text (e.g. “All fields marked * are required”),
  - announced to assistive tech (e.g. `aria-required="true"` or native `required`).
- [ ] Error states:
  - Show error text near the field,
  - Use `aria-invalid="true"` on erroneous inputs,
  - Link error text to the field via `aria-describedby`.
- [ ] Ensure **checkboxes for consent** (Terms, Risk) are keyboard operable and clearly labelled.

### 2.8 Components-specific

**Hero slideshow**

- [ ] Use buttons for slide selectors.
- [ ] Provide `aria-label` or `aria-controls` for each dot (e.g. “Show slide 1 of 3: Forex Foundations”).
- [ ] Announce active slide:
  - Use `aria-live="polite"` on slide container or headings.
- [ ] Auto rotation:
  - Provide a way to pause or stop rotation in future (v2), or keep interval slow and non-critical.

**FAQ (accordion)**

- [ ] Use `<button>` inside `<h3>` or accessible pattern:
  - Each item: `button` with `aria-expanded` and `aria-controls`.
- [ ] Ensure summary text alone is sufficient to understand the question.

**Cards and badges**

- [ ] Entire card should only be a `button` or `link` when truly needed.
- [ ] Otherwise, keep CTA as a clear button/link within the card.

### 2.9 Media and charts

- [ ] Images (course covers, Sora visuals):
  - Use descriptive `alt` text,
  - For decorative images, use `alt=""` and `aria-hidden="true"`.
- [ ] Video sections (if used in future):
  - Provide play/pause controls,
  - Provide captions or transcripts for essential content.
- [ ] Charts (market widgets):
  - If embedded from a 3rd party:
    - ensure container has descriptive label (e.g. “BTC price chart – educational view only”),
    - provide a short **textual summary** next to the chart for users who cannot interpret it visually.

---

## 3. Performance & Core Web Vitals Checklist

### 3.1 LCP (Largest Contentful Paint) < 2.5s

- [ ] LCP element on home:
  - Usually the hero heading or hero background block.
- [ ] Optimise by:
  - Using **server components** for static content where possible.
  - Minimising render-blocking JS.
  - Avoiding large, unoptimised hero videos in v1.
- [ ] Use `next/image` with:
  - proper `sizes`,
  - responsive images and lazy loading.

### 3.2 CLS (Cumulative Layout Shift) < 0.1

- [ ] Always reserve space for:
  - images (set width/height or aspect ratio),
  - dynamic components (chart placeholders, cards).
- [ ] Avoid injecting banners or toasts that push content down.
- [ ] For font loading:
  - Use `next/font` with `display: swap` to avoid layout jumps.

### 3.3 INP (Interaction to Next Paint) < 200ms

- [ ] Avoid heavy synchronous logic in click handlers (AI calls must be async with spinners).
- [ ] Use `React.Suspense` and dynamic imports for heavy components:
  - TradingView widgets,
  - analytics scripts.
- [ ] Keep bundle size under control:
  - No massive client-only libraries on all pages.
  - Lazy-load dashboard-only dependencies.

### 3.4 Network and caching

- [ ] Enable HTTP caching for static assets via Next.js defaults.
- [ ] Use incremental static regeneration (ISR) where suitable for marketing pages.
- [ ] Compress responses (Gzip/Brotli).
- [ ] Use CDN (Vercel) for hosting static content and images.

---

## 4. SEO Checklist – Technical

### 4.1 Page titles and meta descriptions

For each major page, define:

- [ ] Unique `<title>` (~55–65 chars).
- [ ] `<meta name="description">` (~140–160 chars).
- [ ] Use Next.js `metadata` API or `<Head>` for implementation.

Examples:

- Home:
  - Title: `Avenqor – Forex, Crypto & Binary Options Education (No Signals)`
  - Description: `Structured PDF courses and AI-generated strategies for Forex, Crypto and Binary options. Education only, no financial advice or trading signals.`

- Courses:
  - Title: `Avenqor Courses – Forex, Crypto & Binary Options PDF Training`
  - Description: `Browse beginner, intermediate and advanced courses for Forex, Crypto and Binary options. Delivered as structured PDFs for self-paced learning.`

### 4.2 URL structure

- [ ] Use clean, descriptive slugs:
  - `/courses/forex-foundations-from-zero-to-first-trade`
- [ ] Use kebab-case for slugs, no IDs in URLs unless necessary.
- [ ] Avoid query-only URLs for primary content (queries okay for tabs, e.g. `/learn?tab=ai`).

### 4.3 Canonical and indexing

- [ ] Set `rel="canonical"` for main pages to avoid duplicates (especially if query params present).
- [ ] `robots.txt`:
  - Allow indexing of public pages,
  - Disallow `/dashboard/*`, `/auth/*`, `/api/*`.
- [ ] `sitemap.xml`:
  - Include all public pages, including course detail pages.

### 4.4 Open Graph & Twitter cards

- [ ] For key pages (home, courses, learn, pricing) define:
  - `og:title`, `og:description`, `og:url`,
  - `og:image` (static preview, not a trade screenshot),
  - `twitter:card` = `summary_large_image`.
- [ ] Ensure OG images:
  - Use brand identity (Avenqor logomark),
  - Do not show real-time prices or anything that looks like a signal.

---

## 5. SEO Checklist – Content & Semantics

### 5.1 Copy and tone

- [ ] Emphasise:
  - “education only”,
  - “no signals, no promises”.
- [ ] Use natural language including core terms:
  - “Forex education”, “Crypto trading education”, “Binary options risk and education”.
- [ ] Avoid misleading claims:
  - no “guaranteed profit”, “safe income”, etc.

### 5.2 Headings and keywords

- [ ] Primary keyword focus per page:
  - Home: Avenqor brand + “Forex / Crypto / Binary education”.
  - Courses: “Forex courses”, “Crypto courses”, “Binary options courses”.
  - Learn (custom course): “custom trading course”, “tailored trading PDF”.
  - AI Strategy: “AI trading plan”, “AI-generated strategy (education only)”.
- [ ] Make headings clear and descriptive:
  - `Courses designed for clarity, not hype.` is acceptable but can be paired with subheading mentioning Forex/Crypto/Binary.

### 5.3 Internal linking

- [ ] From home:
  - Link to `/courses`, `/learn?tab=custom`, `/learn?tab=ai`, `/pricing`, `/glossary`, `/resources`, `/risk-and-disclaimer`.
- [ ] From `/courses`:
  - Link to course details, glossary, resources.
- [ ] From `/risk-and-disclaimer`:
  - Link back to home and courses, emphasising education-only stance.

### 5.4 Structured data (JSON-LD)

- [ ] Add **Organization** schema on home:
  - `@type: Organization`,
  - name: `Avenqor`,
  - URL: `https://avenqor.net`,
  - `sameAs` if any social links (future).

- [ ] Add **Course** schema for course detail pages:
  - `@type: Course`,
  - name, description, provider = Avenqor,
  - `courseMode`: “online”,
  - `educationalCredentialAwarded`: `null` or omit (no certificates).

- [ ] Add **FAQPage** schema on FAQ page:
  - Use the same Q&A content from `/faq`.

---

## 6. SEO Checklist – Internationalisation (EN / AR)

- [ ] Use `lang` and `dir` correctly as in section 2.
- [ ] For each significant page:
  - Provide `hreflang` tags:
    - `hreflang="en"` for English version,
    - `hreflang="ar"` for Arabic version,
    - `hreflang="x-default"` pointing to English (or language selector logic).
- [ ] Ensure:
  - Arabic translations keep the same **risk disclaimers** and meaning,
  - No promises or claims are added in translation.

---

## 7. Page-specific Acceptance Criteria

### 7.1 Home (`/`)

- [ ] One `<h1>` in Hero.
- [ ] Hero slideshow:
  - accessible controls and text,
  - no excessive motion.
- [ ] Market snapshot:
  - chart placeholder with clear text label and disclaimer.
- [ ] Featured courses:
  - cards use headings and descriptive links,
  - price + token info not confusing.
- [ ] Risk section:
  - visually prominent,
  - linked to `/risk-and-disclaimer`.

### 7.2 Courses (`/courses`, `/courses/[slug]`)

- [ ] Listing:
  - filter controls accessible by keyboard and screen readers.
- [ ] Detail:
  - clear course outline in headings and lists,
  - risk notice or link to risk page.

### 7.3 Learn (`/learn?tab=custom`, `/learn?tab=ai`)

- [ ] Tabs:
  - accessible (role `tablist`, `tab`, `tabpanel` or a simpler pattern).
- [ ] Forms:
  - all fields labelled,
  - errors clearly explained,
  - consent checkboxes present.

### 7.4 Dashboard (`/dashboard/*`)

- [ ] Sidebar navigation:
  - keyboard accessible, visible focus.
- [ ] Tables/lists:
  - `aria-label` or `caption` for screen readers.
- [ ] Download links for PDFs:
  - clearly labelled, show file type and size if possible.

---

## 8. Pre-Launch Checklist & KPIs

### 8.1 Accessibility checks

- [ ] Run automated checks:
  - Lighthouse,
  - axe DevTools (or similar).
- [ ] Manual checks:
  - Navigate entire site with keyboard only,
  - Test with at least one screen reader (NVDA, VoiceOver).
- [ ] Fix all **critical** and **serious** issues before launch.

### 8.2 Performance KPIs

- [ ] Lighthouse / WebPageTest on home, courses and learn pages:
  - Performance score ≥ 90 on desktop, ≥ 80 on mobile.
  - LCP < 2.5s,
  - CLS < 0.1,
  - INP < 200ms.
- [ ] Ensure images and assets are optimised:
  - no uncompressed >1MB hero images,
  - use `next/image` for all main visuals.

### 8.3 SEO KPIs

- [ ] All main pages have:
  - unique title + description,
  - open graph tags,
  - h1 present.
- [ ] XML sitemap and robots.txt configured and deployed.
- [ ] Basic indexing check:
  - after launch, verify via Google Search Console that:
    - home, courses, learn, pricing, risk, faq are indexed.

---

## 9. Notes for AI in Cursor

When generating or modifying code:

1. **Do not remove** accessibility features:
   - skip links,
   - semantic headings,
   - aria labels.
2. If adding new components:
   - define labels, roles and keyboard interaction explicitly.
3. For new copy or sections:
   - ensure risk messaging and education-only stance is present where relevant.
4. When touching layout:
   - avoid introducing layout shifts,
   - test with simulated slow network if possible.
5. Always keep **dark mode contrast** in mind:
   - no low-contrast text,
   - avoid pure-grey-on-grey without meeting AA contrast.
