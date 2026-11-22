/** Display labels for a wallet-support row's `platform`. */
export const PLATFORM_LABELS = /** @type {Record<string, string>} */ ({
	mobile: 'Mobile',
	extension: 'Browser extension',
	desktop: 'Desktop'
});

/** @param {{ wallet: string, platform?: string }} row */
export const rowKey = (row) => `${row.wallet}:${row.platform ?? ''}`;
