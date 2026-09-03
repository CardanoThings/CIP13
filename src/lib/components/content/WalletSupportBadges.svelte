<script>
	import { resolve } from '$app/paths';
	import walletSupport from '$lib/data/wallet-support.json';

	/**
	 * pageData uses short tags like `["CIP-13"]`; wallet-support.json uses full column headers.
	 * Route slug disambiguates CIP-13 (default pay vs //stake).
	 */
	const SLUG_TO_MATRIX_COLUMN = {
		pay: { 'CIP-13': 'default (CIP-13)' },
		stake: { 'CIP-13': '//stake (CIP-13)' },
		claim: { 'CIP-99': '//claim (CIP-99)' },
		drep: { 'CIP-162': '//drep (CIP-162)' },
		browse: { 'CIP-158': '//browse (CIP-158)' }
	};

	let { title = 'Supported wallets', columns, authority } = $props();

	const allColumns = walletSupport.columns ?? [];
	const rows = walletSupport.rows ?? [];

	const slug = $derived((authority ?? '').replace(/^\/\//, ''));

	const matrixColumnKeys = $derived.by(() => {
		const tags = columns?.length ? columns : null;
		if (!tags) return allColumns;

		const resolved = [];
		for (const tag of tags) {
			const mapped = slug ? SLUG_TO_MATRIX_COLUMN[slug]?.[tag] : undefined;
			if (mapped && allColumns.includes(mapped)) {
				resolved.push(mapped);
				continue;
			}
			// Fallback: first column whose label includes this CIP tag (ambiguous for shared CIP-13)
			const fallback = allColumns.find((c) => c.includes(`(${tag})`));
			if (fallback) resolved.push(fallback);
		}
		return resolved.length ? resolved : allColumns;
	});

	const relevantRows = $derived.by(() => {
		const cols = matrixColumnKeys;
		return rows.filter((row) => cols.some((col) => row.values[col] === 'supported'));
	});
</script>

<section class="mt-8 sm:mt-12 sm:w-2/3" aria-label={title}>
	<h2 class="text-white text-4xl font-thin sm:font-thin pb-4 sm:text-6xl">
		{title}
	</h2>
	{#if relevantRows.length > 0}
		<p class="text-white font-thin leading-relaxed mb-4">
			Full matrix on the <a class="home-link" href={resolve('/#wallet-support')}>homepage</a>.
		</p>
		<ul class="badges" role="list">
			{#each relevantRows as row (row.wallet)}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external wallet URL -->
					<a class="badge" href={row.link} target="_blank" rel="noopener noreferrer">
						{row.wallet}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-white font-thin leading-relaxed">
			No tracked wallets list support for this link type yet.
		</p>
	{/if}
</section>

<style>
	.home-link {
		color: rgba(255, 255, 255, 0.9);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.home-link:hover {
		color: #fff;
	}

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.badge {
		display: inline-block;
		padding: 6px 12px;
		border: 2px solid rgba(255, 255, 255, 0.9);
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 600;
		color: #fff;
		text-decoration: none;
		background: rgba(255, 255, 255, 0.06);
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.badge:hover {
		background: rgba(255, 255, 255, 0.14);
		border-color: #fff;
	}
</style>
