# web+cardano (CIP-13)

SvelteKit static site documenting CIP-13 / `web+cardano` links.

**License:** [Apache-2.0](LICENSE)

**Contributing:** see [CONTRIBUTING.md](CONTRIBUTING.md). Wallet teams can self-report CIP compliance by updating [`src/lib/data/wallet-support.json`](src/lib/data/wallet-support.json) and opening a PR with the [Wallet support](.github/PULL_REQUEST_TEMPLATE/wallet-support.md) template.

Day-to-day work and contributor PRs target the **`development`** branch. Production deploys only from **`main`**.

## Developing

```sh
pnpm install
pnpm run dev
```

## Building

```sh
pnpm run build
pnpm run preview
```

Output is written to `build/`.

## Deploy (GitHub Pages)

The site is deployed automatically to GitHub Pages on pushes to `main` (see `.github/workflows/deploy.yml`). Merge `development` → `main` when you want to ship.

**Custom domain:** `cip13.cardanothings.io`

To change the public domain later:

1. Update `SITE_HOST` in [`src/lib/site.js`](src/lib/site.js)
2. Update [`static/CNAME`](static/CNAME) to the same hostname
3. Point DNS (CNAME → `cardanothings.github.io`) and set the custom domain in the repo **Settings → Pages**

Enable Pages in the repo settings: **Source = GitHub Actions**.
