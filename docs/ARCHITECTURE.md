# Architecture

How the site is put together. Read this before changing a page, the wallet matrix, or the build. Upstream facts — CIP status, what wallets do — live in [ECOSYSTEM.md](ECOSYSTEM.md), not here.

## What it is

A static SvelteKit site (Svelte 5 runes, Tailwind 4) prerendered with `@sveltejs/adapter-static` and served from GitHub Pages at `cip13.cardanothings.io`. There is no server and no client-side data fetching: everything a page shows is in the two JSON files below at build time.

## The two data files

Almost every content change is an edit to one of these.

**`src/lib/data/pageData.json`** — one entry per link-type page, keyed by path (`/pay`, `/stake`, `/drep`, `/claim`, `/browse`).

| Field                  | Used for                                                                                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`, `description` | Page heading and the card on the homepage                                                                                                                                                      |
| `cips`                 | CIP tags shown on the page                                                                                                                                                                     |
| `status`               | The badge beside the title. It currently describes wallet availability, not the CIP's own status, and the two disagree for some pages (#9). `ContentTitle.svelte` assumes it is always present |
| `intro`                | Rendered as markdown by `ContentIntro.svelte` (`marked`), so links and emphasis work                                                                                                           |
| `linkBuildExplanation` | Markdown, shown with the example link                                                                                                                                                          |
| `exampleLink`          | The URI `HowTo.svelte` renders with copy, "Try link" and a QR code                                                                                                                             |
| `walletSupportColumns` | Short CIP tags (`["CIP-13"]`) mapped to matrix columns — see below                                                                                                                             |
| `supportingDocs`       | `{ label, href }` links at the bottom of the page                                                                                                                                              |

**`src/lib/data/wallet-support.json`** — the support matrix: `lastUpdated`, `columns` (full header strings such as `//browse (CIP-158)`), and `rows`, each `{ wallet, link, values }` with a status per column: `supported`, `partial`, `untested` or `none`. The schema and the self-report process are in [CONTRIBUTING.md](../CONTRIBUTING.md#wallet-support-self-report).

## Routes

| Route      | Files                                     | What it does                                                                                                                                                |
| ---------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`        | `src/routes/+page.svelte`, `+page.js`     | Hero, a card per `pageData` entry, the full matrix (`SupportTable.svelte`)                                                                                  |
| `/[slug]/` | `src/routes/[slug]/+page.js`, `.svelte`   | One page per `pageData` key. `entries()` lists the keys for prerendering; a slug with no entry falls back to a "Content coming soon" page rather than a 404 |
| layout     | `src/routes/+layout.js`, `+layout.svelte` | `prerender = true` and `trailingSlash = 'always'`, so `/pay` is emitted as `pay/index.html` and GitHub Pages serves it without a SPA fallback               |

A link-type page is assembled in `[slug]/+page.svelte` from `ContentTitle`, `ContentIntro`, `HowTo`, `WalletSupportBadges` and `SupportingDocs`, all under `src/lib/components/content/`.

## How a page finds its wallets

`WalletSupportBadges.svelte` turns a page's short tags into matrix columns through `SLUG_TO_MATRIX_COLUMN`, keyed by slug because two columns share CIP-13 (`default` for `/pay`, `//stake` for `/stake`). It then lists the rows whose status is `supported` in any of those columns.

Two traps when adding a link type:

- **A slug missing from `SLUG_TO_MATRIX_COLUMN`** falls back to the first column whose label contains the tag, and if none matches, to _every_ column — so a new page would list every wallet that supports anything. Add the mapping and the column together.
- **`SupportTable.svelte`'s default `columns`** still lists `//pay (CIP-157)`, which isn't in the data. The homepage passes explicit columns, so it's harmless until another caller relies on the default.

Adding a link type therefore touches: a `pageData.json` entry, a new entry in `columns` plus a value in every row of `wallet-support.json`, the slug mapping, and the five-column lists in the wallet-support PR template (and, once it lands, the wallet-support issue form).

## Build, CI and deploy

| Command          | Runs                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm run dev`   | Vite dev server                                                                                                                         |
| `pnpm run lint`  | `prettier --check .` then `eslint .`. Prettier checks every file in the tree, including untracked ones, so local-only files can fail it |
| `pnpm run check` | `svelte-kit sync` and `svelte-check` against `jsconfig.json` (types are JSDoc, not TypeScript)                                          |
| `pnpm run build` | Prerenders to `build/`                                                                                                                  |

- **CI** (`.github/workflows/ci.yml`) runs lint, check and build on every PR to `development` or `main` and on pushes to `development`.
- **Deploy** (`.github/workflows/deploy.yml`) runs check and build and publishes `build/` to GitHub Pages on every push to `main`, or by hand.

## Branches and review

- `development` is the default branch; all PRs target it. `main` is production, reached by a PR from `development`.
- `development` is protected and requires an approving review. An author can't approve their own PR, so every change needs a second person.
- The custom domain is set in three places that must agree: `SITE_HOST` in `src/lib/site.js`, `static/CNAME`, and DNS. The steps are in the README.
