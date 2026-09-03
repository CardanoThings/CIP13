# web+cardano (CIP-13)

SvelteKit static site documenting CIP-13 / `web+cardano` links.

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

The site is deployed automatically to GitHub Pages on pushes to `main` (see `.github/workflows/deploy.yml`).

**Custom domain:** `cip13.cardanothings.io`

To change the public domain later:

1. Update `SITE_HOST` in [`src/lib/site.js`](src/lib/site.js)
2. Update [`static/CNAME`](static/CNAME) to the same hostname
3. Point DNS (CNAME → `cardanothings.github.io`) and set the custom domain in the repo **Settings → Pages**

Enable Pages in the repo settings: **Source = GitHub Actions**.
