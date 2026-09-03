<script lang="ts">
	import ContentPageShell from '$lib/components/content/ContentPageShell.svelte';
	import ContentTitle from '$lib/components/content/ContentTitle.svelte';
	import ContentIntro from '$lib/components/content/ContentIntro.svelte';
	import { page } from '$app/state';

	// Error details are available on `$page` for SvelteKit error pages.
	const statusCode = $derived(Number(page.status ?? 500));
	const message = $derived(page.error?.message ?? 'Unknown error');
	const title = "I can't believe this... but there seems to be a problem.";
</script>

<ContentPageShell>
	<ContentTitle {title} status={'Error ' + statusCode.toString()} authority="web+cardano" />
	<ContentIntro intro={message} />
</ContentPageShell>
