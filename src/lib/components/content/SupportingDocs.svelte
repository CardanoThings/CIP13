<script>
	import { MoveRight } from 'lucide-svelte';

	let { docs = [] } = $props();
</script>

<section class="mt-8 sm:mt-12 sm:w-2/3" aria-label="Supporting documents">
	<h2 class="text-white text-4xl font-thin sm:font-thin pb-4 sm:text-6xl">Resources</h2>
	<p class="text-white font-thin leading-relaxed mb-4">
		Here you can find the official CIPs and other resources for this CIP.
	</p>
	{#if docs.length}
		<ul>
			{#each docs as d (d.href)}
				<li class="flex items-start gap-2">
					<MoveRight size={16} strokeWidth={2.5} class="mt-1 text-white" />
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={d.href} target="_blank" rel="noreferrer" class="text-white font-medium">
						{d.label}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="empty">No documents linked yet.</p>
	{/if}
</section>
