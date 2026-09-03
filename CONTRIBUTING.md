# Contributing

Thanks for helping improve the CIP-13 / `web+cardano` docs site.

## Prerequisites

- Node.js 22+
- [pnpm](https://pnpm.io/) (this repo pins `pnpm@11.20.0`)

```sh
pnpm install
pnpm run dev
```

Before opening a PR that changes site code, run:

```sh
pnpm run lint
```

## Ways to contribute

- **Site / docs fixes** — UI, copy, examples, or bugs in the SvelteKit app
- **Page content** — link-type docs live in [`src/lib/data/pageData.json`](src/lib/data/pageData.json)
- **Wallet support** — self-report CIP compliance in [`src/lib/data/wallet-support.json`](src/lib/data/wallet-support.json) (see below)

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Wallet support self-report

Wallet teams can update the public support matrix by editing **only** [`src/lib/data/wallet-support.json`](src/lib/data/wallet-support.json) and opening a pull request with the **Wallet support** template.

### What to edit

1. Fork the repo and create a branch.
2. Either add a new object under `rows`, or update an existing wallet’s `values`.
3. Each row needs:
   - `wallet` — display name
   - `link` — wallet website or docs URL
   - `values` — a status for **every** entry in the top-level `columns` array

Do **not** invent new column names. If a new CIP / link type should appear in the table, [open an issue](https://github.com/CardanoThings/CIP13/issues) first.

### Allowed status values

| Status | Meaning |
| --- | --- |
| `supported` | Works for this link type |
| `partial` | Works with known limitations (describe them in the PR) |
| `untested` | Claimed or unknown; not verified yet |
| `none` | Not implemented |

### Evidence

In the PR, include enough for maintainers to review the claim: release notes, docs URL, demo / deep link, screenshots, or short repro steps.

### Open the PR

Use the **Wallet support** pull request template:

1. Open a PR against `main`
2. In the GitHub compare UI, choose the **Wallet support** template (or use [this link](https://github.com/CardanoThings/CIP13/compare/main...main?quick_pull=1&template=wallet-support.md) after pushing your branch)

### Maintainers

When merging wallet-support changes, bump the hardcoded **Last updated** date in [`src/lib/components/SupportTable.svelte`](src/lib/components/SupportTable.svelte).

## Code style

Formatting and linting are enforced with Prettier and ESLint (`pnpm run lint` / `pnpm run format`). Match existing patterns in the repo.
