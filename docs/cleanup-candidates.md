# Cleanup Candidates Snapshot

Date: 2025-12-06

This note captures files/directories that appear to be development assets or historical references no longer needed at runtime. Before deleting any of them, confirm with design/product and ensure no build/test scripts still rely on them.

## 1. Preview / Reference Components

| File | Notes |
| --- | --- |
| `avenqor-learn-risk-management-preview.tsx`<br>`avenqor-learn-trade-journal-preview.tsx`<br>`avenqor-learn-weekly-review-preview.tsx`<br>`avenqor-learn-pre-session-preview.tsx`<br>`avenqor-learn-position-sizing-preview.tsx`<br>`avenqor-learn-strategy-snapshot-preview.tsx` | Static previews used during initial implementation of the `/learn/*` pages. All corresponding production pages now live under `app/learn/...`. Safe to archive or remove once double-confirmed. |
| `avenqor-dashboard-library-preview.tsx`<br>`avenqor-dashboard-billing-preview.tsx`<br>`avenqor-dashboard-custom-courses-preview.tsx`<br>`avenqor-dashboard-settings-preview.tsx` | Old dashboard mockups. The live dashboard components exist under `app/dashboard/*`. Remove after verifying no designer/dev still references them. |
| `avenqor-auth-reset-password-preview.tsx` | Superseded by the actual reset-password flow in `app/forgot-password` + API logic. |

## 2. Legacy Specs / Docs

| File | Notes |
| --- | --- |
| `core.md`, `components-catalog.avenqor.md`, `design-system.avenqor.md`, `page-home.avenqor.md`, `routes-and-layout.avenqor.md` | Design references that became outdated after the new landing/home/dashboard revamp. Keep in `/docs/archive` or remove if versioned elsewhere. |
| `accessibility-and-seo-checklist.avenqor.md`, `pricing-and-tokens-spec.avenqor.md`, `i18n-content.avenqor.md` | Still useful but should move into `/docs/` for clarity; mark outdated sections. |

## 3. Data Dumps & Scripts

| Artifact | Notes |
| --- | --- |
| `avenqor-course-requests-*.json`, `avenqor-request-ready-course-trading-foundations.json`, `avenqor-pdf-rendering-map.v1.json` | One-off data exports used during seeding/testing. Consider moving into `/scripts/data/` or deleting once DB seeding relies on the canonical source. |
| `database_add_missing_fields.sql`, `logs/course-generation.log`, `error.log` | Legacy debugging artifacts. Remove from repo to avoid leaking internal info; future DB changes should live exclusively inside `prisma/migrations`. |
| `scripts/*.ts` – run `rg` to confirm usage. Some (e.g., `generate-specific-courses.ts`, `generate-5-courses.ts`) may be obsolete after the automated course ingestion pipeline. Document or delete per maintainer confirmation. |

## 4. Build Artifacts To Watch

- `.next`, `tsconfig.tsbuildinfo`, and Puppeteer-generated PDFs/images should stay out of git (already ignored). If they reappear, add them to `.gitignore`.

## Next Steps

1. Share this list with stakeholders; mark any files that must remain for documentation/compliance.
2. Create a PR that either deletes the agreed files or moves them into `/docs/archive`.
3. Update README/DEPLOY docs to reference the new locations (if applicable).

