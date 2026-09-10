<script>
	/** @type {{ children: import('svelte').Snippet }} */
	let { children } = $props();
</script>

<section class="p-4">
	{@render children()}
</section>
