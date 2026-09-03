<script>
	import '$lib/css/app.css';
	import '$lib/css/general-sans.css';
	import Background from '$lib/components/Background.svelte';
	import Header from '$lib/components/Header.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import { pendingNavPageTransition } from '$lib/navTransition.js';
	import { fly } from 'svelte/transition';
	import { SITE_ORIGIN } from '$lib/site.js';

	let { children } = $props();

	const MAIN_ENTER_MS = 800;
	/** Out+in can run sequentially (~2×); clear after so transitions still see the mode. */
	const TRANSITION_CLEAR_MS = MAIN_ENTER_MS * 2 + 100;

	let navTransitionClearTimeout = /** @type {ReturnType<typeof setTimeout> | null} */ (null);

	afterNavigate(() => {
		if (navTransitionClearTimeout) clearTimeout(navTransitionClearTimeout);
		navTransitionClearTimeout = setTimeout(() => {
			navTransitionClearTimeout = null;
			pendingNavPageTransition.set(null);
		}, TRANSITION_CLEAR_MS);
	});

	/** Old page: desktop slides out to the right. */
	function mainOut(/** @type {Element} */ node) {
		if (get(pendingNavPageTransition) !== 'desktop') {
			return { duration: 0 };
		}
		return fly(node, {
			x: '100%',
			duration: MAIN_ENTER_MS,
			opacity: 1
		});
	}

	/** New page: desktop from the left; mobile from the top. */
	function mainEnter(/** @type {Element} */ node) {
		const mode = get(pendingNavPageTransition);
		if (mode === 'desktop') {
			return fly(node, {
				x: '-100%',
				duration: MAIN_ENTER_MS,
				opacity: 1
			});
		}
		if (mode === 'mobile') {
			return fly(node, {
				y: '-100%',
				duration: MAIN_ENTER_MS,
				opacity: 1
			});
		}
		return { duration: 0 };
	}
</script>

<svelte:head>
	<meta property="og:url" content="{SITE_ORIGIN}{page.url.pathname}" />
	<meta property="og:image" content="{SITE_ORIGIN}/social.png" />
	<meta name="twitter:image" content="{SITE_ORIGIN}/social.png" />
</svelte:head>

<Background>
	<Navigation />
	<!--
	  Grid stack: during key transitions Svelte keeps outgoing + incoming nodes as siblings
	  in the same cell so both are visible while old flies right and new flies in from left.
	-->
	<div class="page-crossfade-stack">
		{#key page.url.pathname}
			<div in:mainEnter|global out:mainOut|global>
				<Header />
				<main class="sm:mt-8 sm:max-w-4xl sm:mx-auto">
					{@render children()}
					<Footer />
				</main>
			</div>
		{/key}
	</div>
</Background>

<style>
	.page-crossfade-stack {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		grid-template-areas: 'page';
		overflow-x: clip;
		isolation: isolate;
	}

	.page-crossfade-stack > :global(*) {
		grid-area: page;
		min-width: 0;
		will-change: transform;
	}

	/* During overlap, first node is outgoing — paint it above the incoming slide. */
	.page-crossfade-stack:has(> :nth-child(2)) > :global(*:first-child) {
		z-index: 2;
	}

	.page-crossfade-stack:has(> :nth-child(2)) > :global(*:last-child) {
		z-index: 1;
	}
</style>
