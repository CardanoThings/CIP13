<script lang="ts">
	import { marked } from 'marked';
	import '$lib/css/markdown.css';

	let { intro } = $props();

	// Parse the intro as markdown so emphasis/links render correctly.
	// The source content is authored in-repo (docs), so we treat it as trusted.
	const html = $derived(marked.parse(intro ?? ''));
</script>

<div class="md-intro sm:w-2/3" aria-label="Page intro">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>
