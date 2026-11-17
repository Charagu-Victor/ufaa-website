# UFAA website: Strapi CMS + Next.js

A CMS-driven website for the Unclaimed Financial Assets Authority.
Editors manage content in **Strapi** (`cms/`); visitors see a fast, accessible **Next.js** site (`web/`).

```
ufaa-website/
  cms/   Strapi 5 (TypeScript)   admin + REST API, port 1337
  web/   Next.js 16 (App Router) public website, port 3000
```

Requires Node.js 22 LTS (Strapi supports only LTS releases) and npm.

## Quick start (local)

```bash
# 1. CMS
cd cms
cp .env.example .env            # then replace every "tobemodified" with a random value
SEED_DEMO_DATA=true npm run develop   # first run only: loads placeholder content
# open http://localhost:1337/admin and create the first administrator

# 2. Website (second terminal)
cd web
cp .env.example .env.local
npm run dev                     # http://localhost:3000
```

Public (anonymous) read access to published content is granted automatically on start (`cms/src/index.ts`).
Drafts are never exposed. No API token is needed unless you later restrict the Public role.

## What editors manage

| Strapi content | Appears on the site | Notes |
|---|---|---|
| Site Setting (single) | Header alert banner, footer, contact details, USSD code, claims platform link | Set **Claim Portal Url** so "Search for your assets" opens the real claims platform |
| Homepage (single) | Hero text, key facts, "how a claim works" steps, intro | Steps also appear on Search and claim |
| Page | `/about/...`, `/find-and-claim/...`, `/holders/...`, `/services/...` | The **Parent** field picks the menu group and URL; body is Markdown |
| News Article | `/news` | Categories, featured flag, cover image |
| Notice | `/notices` | Attach the PDF; optional expiry date |
| Tender / Vacancy | `/tenders`, `/vacancies` | Shows Open/Closed from the closing time; attach adverts and documents |
| Publication | `/publications` | Annual reports, plans, service charter, claim and holder forms |
| FAQ | `/faqs` | Grouped by General, Claims, Beneficiaries, Holders |
| Office | `/contact` | Mark one as head office |
| Team Member | `/leadership` | Board or Management, with photo and profile |

All content types use Draft & Publish. Menus build themselves from published Pages.

## Keeping the site fresh

Pages are cached and refresh at most every 5 minutes (`REVALIDATE_SECONDS`). For instant updates, add a webhook in Strapi
(Settings > Webhooks):

- URL: `https://your-site/api/revalidate`
- Header: `x-revalidate-secret` = the `REVALIDATE_SECRET` value in `web/.env.local`
- Events: Entry publish, unpublish, update, delete (and Media update)

## Preview drafts

Pages and News Articles get a **Preview** button in the Strapi editor. It opens `/preview/...` on the website using
`CLIENT_URL` and `PREVIEW_SECRET` (set the same `PREVIEW_SECRET` in `cms/.env` and `web/.env.local`).

## Deploying

Build and run both apps on Node 22:

```bash
cd cms && npm ci && NODE_ENV=production npm run build && NODE_ENV=production npm run start
cd web && npm ci && npm run build && npm run start
```

- Use PostgreSQL in production (`npm install pg` in `cms/`, then set the `DATABASE_*` variables). SQLite is for local work only.
- Run both under a process manager (PM2 or systemd) behind Nginx with HTTPS.
- Store uploads on persistent disk or an S3-compatible provider, and back up the database and uploads.
- Set strong, unique secrets: `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, `REVALIDATE_SECRET`, `PREVIEW_SECRET`.
- Put the Strapi admin on a restricted address (for example `cms.example.go.ke`) and enable two-factor sign-in policies at the proxy or identity layer as your ICT policy requires.
- Confirm hosting location and data-protection requirements with ICT and legal before go-live.

## Placeholder content: review before launch

`SEED_DEMO_DATA=true` loads starter content drawn from public UFAA information (mandate, vision and mission, FAQ answers,
claim timelines, head office address, contact numbers, USSD code, one press release). It is a starting point only:
confirm every figure, address, document requirement and the core-values list with the responsible UFAA officers, then edit or
replace it in Strapi. Do not seed a database that already holds real content.

## Code map

- `cms/src/api/*/content-types/*/schema.json` content model; `cms/src/components/shared` reusable blocks
- `cms/src/index.ts` public read permissions; `cms/src/seed.ts` optional starter content; `cms/config/admin.ts` preview button
- `web/src/lib/strapi.ts` all CMS queries (cache tags map to webhook models); `web/src/lib/types.ts` content types
- `web/src/components/` header, footer and shared UI; `web/src/app/` routes
- `web/src/app/globals.css` colour and type tokens (ledger blue, ochre, status green and clay)
