# Vercel Build Preparation Plan
Updated: 2025-12-06

This checklist captures everything we need before flipping the project to the Vercel production pipeline.

## 1. Environment Variables
Configure these in the Vercel dashboard (Project → Settings → Environment Variables). Use the same values in `.env.local` for local parity.

| Key | Notes |
| --- | --- |
| `DATABASE_URL` | Neon pooled connection string (`?pgbouncer=true&sslmode=require`). |
| `NEXTAUTH_URL` | `https://<project>.vercel.app` (Preview → automatic). |
| `NEXTAUTH_SECRET` | 32+ char secret (generate via `openssl rand -base64 32`). |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | For NextAuth Google provider. |
| `OPENAI_API_KEY`, `OPENAI_ORG_ID` | Required for AI strategy generation. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Nodemailer (existing password reset + purchase emails). |
| `TOKEN_BASE_CURRENCY`, `TOKEN_PRICE_GBP`, ... | Whatever custom pricing envs exist in `.env`. |
| `VERCEL_ENV` (automatic) | Use inside code if environment-specific logic needed. |

Action items:
- Update `.env.example` and `README.md` to list every required variable.
- Run `npx prisma generate` whenever `DATABASE_URL` changes.

## 2. Database & Prisma
1. Ensure all migrations are committed (`prisma/migrations/*`).
2. Locally run `npx prisma migrate deploy` to mimic the Vercel build-step behavior.
3. Verify Prisma retry helper (`withPrismaRetry`) wraps every API route that hits the DB.

## 3. Build Commands
- `npm install`
- `npm run lint`
- `npm run typecheck`
- `npm run build` (Next.js) — `prebuild` automatically runs `rimraf .next` to keep traces clean.

Notes:
- Stop `next dev` before running `npm run build` to avoid OS locks on `.next/trace`; or run `npm run clean` manually when needed.
- Keep Puppeteer deps (`@sparticuz/chromium`) pinned; works on Vercel’s serverless runtime.

## 4. Static Assets & i18n
- All videos/images live under `/public`. Confirm no external URLs requiring rewrite rules.
- `next-intl` config must remain accessible (already fixed in `app/providers.tsx` and `i18n/request.ts`).
- Large course PDFs/images under `public/courses` are static; Vercel will host them automatically.

## 5. QA & Monitoring
- Smoke test key flows locally & in Preview deploys: `/`, `/learn` tabs, `/pricing`, `/checkout`, `/dashboard/*`, `/cart`, `/api/*`.
- Confirm token balance updates + emails fire in Preview (use staging SMTP credentials).
- Enable Vercel Web Analytics + Log Drains for early error detection.
- After production deploy, monitor Prisma logs for `Error { kind: Closed }`; adjust pooling if it persists.

## 6. Operational Notes
- Production background work (AI strategy generation, PDF creation) already runs inside API routes. Monitor execution time; move to background workers if needed.
- Receipts + invoices rely on Puppeteer; add alerting for failures (currently only logs).
- If build time approaches Vercel limits, explore `experimental.turbo` in `next.config.js`.

Following this plan ensures predictable builds and fewer surprises once the repo is wired into Vercel’s CI/CD.

