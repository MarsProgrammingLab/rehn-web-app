# Rehn & The Idols — band website

A fast, hardened four-page site for the band: **Home, About, Shows, and Contact**. The band edits their own copy and show dates, booking inquiries go straight to their inbox, and there's no server to run.

- **Stack:** React 19 + JavaScript, Vite, React Router (declarative mode), CSS Modules
- **Hosting:** Cloudflare Pages (static, global CDN)
- **Quality gate:** GitHub Actions (lint, test, build) + branch protection on `main`

## MVP checklist

- [ ] **1. Live on the band's domain.** Four routes in one shared layout, on Cloudflare Pages over HTTPS, gated by CI, with a preview URL on every PR.
  - [x] Routes, shared layout, not-found page
  - [x] CI gate on every push to `main` and every PR
  - [x] `main` protected: PR + passing `check` required, no bypass (tested with a deliberately failing PR)
  - [x] Deployed to `pages.dev` with the CSP and security headers
  - [x] Hosting moved into the band's Cloudflare account
  - [ ] Band's domain attached, `www` → apex redirect, HTTPS on both. _In progress: apex and `www` added to Pages, waiting for verification._
- [ ] **2. Content the band edits themselves.** All copy comes from JSON in `src/content/`; a band member edits the bio in Pages CMS and sees it live within minutes.
- [ ] **3. Upcoming shows.** Sorted by date, past shows hidden automatically, empty state pointing to Instagram.
- [ ] **4. Booking form on the Contact page.** Validation with field-level errors, honeypot, privacy note, POST to the form service, SPF/DKIM/DMARC on the band's domain; inquiry lands in the inbox, not spam.
- [ ] **5. Security and privacy baseline.** securityheaders.com grade A, clean console, clean `npm audit`, no cookies, pinned Actions, read-only token, Dependabot.
- [ ] **6. Fast, findable, accessible.** Lighthouse mobile 95+ in all four categories (enforced in CI), LCP < 2.5 s, CLS < 0.1, works by keyboard, titles/descriptions per page, sitemap, Search Console.
      **Later (not in the MVP):** music/video embeds, per-page link previews (prerendering), shows as rich results, own backend, merch, press kit, mailing list, embedded Instagram feed.

## Run it locally

Requires the Node version in `.nvmrc`.

```bash
npm ci            # install exactly what package-lock.json lists
npm run dev       # dev server at http://localhost:5173
npm run lint      # ESLint
npm run format    # Prettier (rewrites files)
npm test          # Vitest, single run
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
```

Security headers only exist on a deploy, so check CSP changes on a PR's preview URL, not on the dev server.

## How changes ship

1. Branch off `main` → commit → push → open a pull request.
2. CI runs lint, test, and build; Cloudflare Pages builds a **preview URL** for the PR.
3. Merge (squash) once `check` is green and the preview looks right. Pages then deploys `main` to production.
   Direct pushes to `main` are blocked.

## Project layout

```
public/_headers        CSP and security headers (copied into dist/ by Vite)
src/main.jsx           mounts the app inside BrowserRouter
src/App.jsx            route table
src/components/        Layout, SiteHeader, SiteFooter, Navigation
src/pages/             one component per route, plus NotFound
.github/workflows/     CI gate
```

## Accounts and ownership

| What                | Where                                              | Owner                                    |
| ------------------- | -------------------------------------------------- | ---------------------------------------- |
| Source code         | GitHub `MarsProgrammingLab/rehn-web-app` (public)  | Martavias                                |
| Hosting             | Cloudflare Pages, in the band's Cloudflare account | The band; Martavias is an account member |
| DNS                 | Cloudflare, in the band's Cloudflare account       | The band                                 |
| Domain registration | REGISTRAR-NAME (renews RENEWAL-DATE)               | The band                                 |

## Decision log

| Date       | Decision                                                                                                                                     | Why                                                                                                                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-04 | **React + JavaScript + Vite**, no TypeScript yet                                                                                             | Smallest setup that runs; types come later in the learning plan.                                                                                                                                                                |
| 2026-11-04 | **Node major version pinned in `.nvmrc`**                                                                                                    | One source of truth for my machine, GitHub Actions, and Cloudflare's build.                                                                                                                                                     |
| 2026-11-04 | **Prettier + `eslint-config-prettier`** (last in the ESLint config)                                                                          | Prettier owns formatting; ESLint owns correctness. They never fight.                                                                                                                                                            |
| 2026-11-04 | **Vitest with `--passWithNoTests`**                                                                                                          | CI needs a test step before any tests exist. Remove the flag when the first real test lands (slice 3).                                                                                                                          |
| 2026-11-06 | **`react-router` v8 only**, no `react-router-dom`                                                                                            | `react-router-dom` only re-exports `react-router`; installing both pulled in two different versions. Notes were written for v7, but the declarative API (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `NavLink`) is unchanged. |
| 2026-11-07 | **Booking page renamed Contact** (`/contact`)                                                                                                | The band's choice. The page still holds the booking inquiry form from MVP item 4; brief and wireframes updated to match.                                                                                                        |
| 2026-11-07 | **Cloudflare Pages, not Workers**                                                                                                            | A Pages project needs no config file; `_headers` and the SPA deep-link fallback work out of the box. The first attempt accidentally created a Worker, which failed without a Wrangler config.                                   |
| 2026-11-07 | **Branch protection: PR + `check` required, no bypass, 0 approvals**                                                                         | Pages deploys `main` without waiting for CI, so the only real gate is that `main` can't change without a green check. Solo developer, so approvals would lock me out.                                                           |
| 2026-11-07 | **"Require code scanning results" turned off**                                                                                               | CodeQL isn't set up, so the rule blocked every merge. Revisit in slice 5 (security baseline).                                                                                                                                   |
| 2026-11-07 | **Custom domain postponed**                                                                                                                  | Waiting on access to the band's domain. When unblocked: band's Cloudflare account owns registrar, DNS, and Pages; I'm added as a member. Don't hard-code the `pages.dev` URL anywhere.                                          |
| 2026-11-11 | **Pages project moved into the band's Cloudflare account**; domain's DNS on Cloudflare                                                       | Cloudflare only attaches an apex domain to a Pages project in the same account as the domain's zone, and the client should own every account the site depends on. The old project in my account was deleted.                    |
| 2026-11-11 | **Apex is canonical; `www` → apex with a 301** (dashboard Redirect Rule, path and query kept); **Always Use HTTPS** on; **HSTS off for now** | One canonical URL for search engines and links. A `_redirects` file can't match on hostname. HSTS waits until every subdomain the band uses is known (slice 6).                                                                 |
