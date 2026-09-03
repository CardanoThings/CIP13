<script>
	import IntroHero from '$lib/components/IntroHero.svelte';
	import SupportTable from '$lib/components/SupportTable.svelte';
	import walletSupport from '$lib/data/wallet-support.json';
	import pageData from '$lib/data/pageData.json';
	import { Heart, MoveRight } from 'lucide-svelte';
	import { resolve } from '$app/paths';

	const { columns, rows } = walletSupport;

	const pages = $derived(
		Object.entries(pageData)
			.filter(([path]) => path !== '/')
			.map(([path, page]) => ({ path, ...page }))
	);
</script>

<div class="w-full mx-auto mb-0 mt-8">
	<div class="p-4">
		<IntroHero />
	</div>
</div>
<section class="px-4 md:w-2/3">
	<h2 class="text-white text-6xl font-thin sm:font-thin pb-4 sm:text-8xl">
		Cardano made simple with CIP-13
	</h2>

	<p class="text-white pt-4 font-thin leading-relaxed">
		Originally created by <span class="font-normal"> Robert Phair</span>,
		<span class="font-normal"> Sebastian Guillemot</span>
		and <span class="font-normal"> Vincente Almonacid</span> in 2020, CIP-13 introduced the
		<span class="font-normal">web+cardano</span>
		URI scheme for Cardano. This standard, and its recent enhancements, allows to easily create links
		that directly launch compatible (installed) Cardano wallets like Begin, Vespr, Eternl or Yoroi on
		mobile devices and trigger pre-defined actions, such as creating a pre-filled ADA transaction, a Stake
		Pool or DRep delegation or open websites in the in-app browser of a mobile wallet to gain access to
		the full dApp experience.
	</p>
	<p class="text-white pt-4 font-thin leading-relaxed">
		<span class="font-normal">And yes:</span> This works with QR-Codes too.
	</p>
	<p class="text-white pt-4 font-thin leading-relaxed">
		This website explains the different types of Cardano links, how to create them, and tracks the
		support for some of the most popular Cardano wallets.
	</p>
	<p class="text-white pt-4 font-thin leading-relaxed">
		<strong>Happy Building!</strong>
	</p>
</section>

<!-- linking to all the other pages on this site -->
<section class="p-4 md:w-2/3 sm:mt-8">
	<h2 class="text-white text-4xl font-thin sm:font-thin pb-4 sm:text-6xl">
		Current live or planned Cardano links
	</h2>
	<p class="text-white pt-4 font-thin leading-relaxed text-sm mb-4">
		<strong>Disclaimer:</strong> Make sure the wallet(s) your target audience uses supports the feature
		you are looking for - if not, reach out to the wallet devs and ask them to implement it.
	</p>
	<ul class="text-white pt-4 leading-relaxed font-medium sm:grid sm:grid-cols-2 sm:mt-4 sm:gap-4">
		{#each pages as page (page.path)}
			<li class=" border-white border-4 p-4 mb-4 sm:mb-0">
				<div class="text-3xl text-white font-medium mb-2">/{page.path}</div>
				<div class="text-white font-thin leading-relaxed mb-2 text-sm">{page.description}</div>
				<div class="flex items-center gap-2">
					<MoveRight size={16} strokeWidth={2.5} />
					<a href={resolve(page.path)} class="font-medium">Learn More</a>
				</div>
			</li>
		{/each}
	</ul>
</section>

<section class="p-4 md:w-2/3 sm:mt-8">
	<h2 class="text-white text-4xl font-thin sm:font-thin pb-4 sm:text-6xl">Wallet Support</h2>
	<p class="text-white pt-4 font-thin leading-relaxed text-sm mb-4">
		Some of the newer CIP-13 enhancements are not yet supported by all wallets. This table tracks
		the support for some of the most popular Cardano wallets.
	</p>
	<SupportTable title="Wallet" {columns} {rows} />
</section>

<section class="p-4 md:w-2/3 sm:mt-8">
	<h2 class="text-white text-4xl font-thin sm:font-thin pb-4 sm:text-6xl">CIP? What?!</h2>

	<p class="text-white pt-4 font-thin leading-relaxed">
		<strong>Cardano Improvement Proposals (CIPs)</strong> are a structured process for suggesting, discussing,
		and implementing changes to the Cardano blockchain ecosystem. Community members submit ideas, which
		are reviewed, refined, and approved to ensure transparency, technical quality, and decentralized governance.
	</p>

	<p class="text-white pt-4 font-thin leading-relaxed">
		<strong>Everyone can take part in this process by submitting a CIP proposal.</strong> The proposal
		is then reviewed and refined by the Cardano community and if accepted, becomes a formal standard.
	</p>

	<p class="text-white pt-4 font-thin leading-relaxed">
		<strong>CIPs</strong> can be seen as proposed guidelines on how things <strong>should</strong> work.
		In case of CIP-13 and enhancements, this means every wallet decides on their own if and how to adapt
		these standards. Always make sure check if the feature you are looking for is supported by the wallets
		of your target audience (and reach out to the wallet devs if not, they might be willing to implement
		it).
	</p>

	<ul class="text-white pt-4 leading-relaxed font-medium">
		<li class="flex items-center gap-2">
			<MoveRight size={16} strokeWidth={2.5} />
			<a href="https://cips.cardano.org/" target="_blank">Official CIP directory on cardano.org</a>
		</li>

		<li class="flex items-center gap-2">
			<MoveRight size={16} strokeWidth={2.5} />
			<a href="https://github.com/cardano-foundation/CIPs" target="_blank"
				>Official CIP repository on GitHub</a
			>
		</li>

		<li class="flex items-center gap-2">
			<MoveRight size={16} strokeWidth={2.5} />
			<a href="https://github.com/cardano-foundation/CIPs/wiki" target="_blank">Official CIP Wiki</a
			>
		</li>
	</ul>
</section>

<section class="p-4 md:w-2/3 sm:mt-8 border-4 border-white pb-5 m-4">
	<h2 class="text-white text-xl font-medium sm:font-thin pb-4 sm:text-xl border-b-4 border-white">
		Feedback & Bug Reports
	</h2>
	<p class="text-white pt-4 font-thin leading-relaxed">
		If you found a bug or have a suggestion for improvements, please open an issue on this <a
			href="https://github.com/CardanoThings/CIP13/issues"
			target="_blank"
			class="font-medium border-b pb-1">Github repository</a
		>. There is also an ongoing discussion about the current state of CIP-13 and its ongoing
		enhancements on this
		<a
			href="https://github.com/cardano-foundation/CIPs/issues/836"
			target="_blank"
			class="font-medium border-b pb-1">Github issue</a
		>.
	</p>
</section>

<section class="p-4 flex flex-col items-center md:w-2/3 sm:mt-8">
	<div class="flex items-center gap-2">
		<Heart class="text-white animate-bounce" size={18} />
		<Heart class="text-white fill-white animate-bounce [animation-delay:200ms]" size={24} />
		<Heart class="text-white animate-bounce [animation-delay:400ms]" size={18} />
	</div>
	<p class="text-white pt-4 font-thin leading-relaxed text-xs sm:text-base italic">
		Special thanks and shoutouts to all the community members who worked on this over the years, the
		whole CIP-Crew for keeping an eye on things and making sure we are all on the same page and all
		the underpaid wallet devs for keeping up with this process.
	</p>
</section>
