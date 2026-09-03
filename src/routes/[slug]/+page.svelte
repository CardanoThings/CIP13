<script lang="ts">
	import ContentPageShell from '$lib/components/content/ContentPageShell.svelte';
	import ContentTitle from '$lib/components/content/ContentTitle.svelte';
	import ContentIntro from '$lib/components/content/ContentIntro.svelte';
	import IntroHero from '$lib/components/IntroHero.svelte';
	import HowTo from '$lib/components/content/HowTo.svelte';
	import WalletSupportBadges from '$lib/components/content/WalletSupportBadges.svelte';
	import SupportingDocs from '$lib/components/content/SupportingDocs.svelte';

	let { data } = $props();
</script>

<ContentPageShell>
	<IntroHero />
	<ContentTitle title={data.title} authority="" cips={data.cips} status={data.status} />
	<ContentIntro intro={data.intro} />
	<HowTo uri={data.exampleLink} linkBuildExplanation={data.linkBuildExplanation} />
	<WalletSupportBadges title="Wallet Support" columns={data.walletSupportColumns} authority={data.authority} />
	<SupportingDocs docs={data.supportingDocs} />
</ContentPageShell>
