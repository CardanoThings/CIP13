<script lang="ts">
	import Badge from './Badge.svelte';
	let { title, authority, cips = [], status } = $props();
</script>

<header class="sm:w-2/3 mt-8">
	{#if authority}
		<div class="text-7xl text-white font-normal mb-4" aria-label="Link authority">
			{authority}
		</div>
	{/if}
	<h1 class="text-white text-6xl font-thin sm:font-thin pb-2 sm:text-8xl">
		{title}
	</h1>

	<div class="mt-4 flex flex-wrap gap-1 pb-12" aria-label="Page badges">
		{#if cips.length}
			{#each cips as cip (String(cip))}
				<Badge>{'CIP-' + cip}</Badge>
			{/each}
		{/if}

		<Badge>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
	</div>
</header>
