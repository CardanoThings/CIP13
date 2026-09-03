<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import { Check, Copy, ExternalLink } from 'lucide-svelte';
	import '$lib/css/markdown.css';

	let { label = 'Example link', uri, linkBuildExplanation } = $props();

	// Markdown from repo data (trusted).
	const explainHtml = $derived(marked.parse(linkBuildExplanation ?? ''));

	let qrDataUrl = $state(null);
	let copied = $state(false);
	let copyTimer = null;

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(uri);
			copied = true;
			if (copyTimer) clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 900);
		} catch {
			// ignore
		}
	}

	onMount(async () => {
		const QRCode = await import('qrcode');
		qrDataUrl = await QRCode.toDataURL(uri, {
			margin: 1,
			scale: 6,
			errorCorrectionLevel: 'M',
			color: { dark: '#000000', light: '#ffffff' }
		});
	});
</script>

<section class="p-4 border-4 border-white sm:w-2/3 mt-8" aria-label={label}>
	<h2 class="text-xl font-light mb-4 sm:text-2xl text-white">How to build the link</h2>
	{#if linkBuildExplanation}
		<div class="explain md-intro" aria-label="How this link is structured">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html explainHtml}
		</div>
	{/if}

	<div class="grid mt-4">
		<div class="uriWrap">
			<div class="uriField">
				<span class="k uriK">Example URI</span>
				<pre class="uri"><code>{uri}</code></pre>
			</div>
			<div class="actionRow">
				<button
					type="button"
					class="actionBtn"
					onclick={handleCopy}
					aria-label={copied ? 'Copied' : 'Copy URI to clipboard'}
				>
					<span class="btnIcon" aria-hidden="true">
						{#if copied}
							<Check size={16} strokeWidth={2.5} />
						{:else}
							<Copy size={16} strokeWidth={2.5} />
						{/if}
					</span>
					{copied ? 'Copied' : 'Copy'}
				</button>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- custom web+cardano URI scheme -->
				<a class="actionBtn" href={uri}>
					<span class="btnIcon" aria-hidden="true">
						<ExternalLink size={16} strokeWidth={2.5} />
					</span>
					Try link
				</a>
			</div>
		</div>

		<div class="qrWrap">
			<div class="k">QR Code Example</div>
			{#if qrDataUrl}
				<img class="qr" src={qrDataUrl} alt="QR code for the example link" />
			{:else}
				<div class="qrSkeleton" aria-hidden="true"></div>
			{/if}
		</div>
	</div>
</section>

<style>
	.explain {
		margin: 0 0 14px;
		color: #fff;
		font-size: 16px;
		font-weight: 200; /* match homepage font-thin */
		line-height: 1.625; /* tailwind leading-relaxed */
		max-width: 75ch;
	}

	.actionRow {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}

	.actionBtn {
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin: 0;
		padding: 8px 14px;
		min-height: 40px;
		border: 2px solid rgba(255, 255, 255, 0.9);
		border-radius: 999px;
		font-family: inherit;
		font-size: 13px;
		font-weight: 650;
		line-height: 1.2;
		letter-spacing: 0.02em;
		color: #fff;
		text-decoration: none;
		background: rgba(255, 255, 255, 0.08);
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
		white-space: nowrap;
		cursor: pointer;
		-webkit-appearance: none;
		appearance: none;
		-webkit-tap-highlight-color: transparent;
	}

	/* Match button & link visuals (anchors keep default blue/purple otherwise). */
	a.actionBtn,
	a.actionBtn:visited {
		color: #fff;
	}

	.actionBtn:hover {
		background: rgba(255, 255, 255, 0.16);
		border-color: #fff;
	}

	.actionBtn:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.85);
		outline-offset: 3px;
	}

	.btnIcon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		opacity: 0.95;
	}

	.uriWrap {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		min-width: 0;
	}

	.uriField {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}

	.uriK {
		display: block;
	}

	.grid {
		margin-top: 14px;
		display: grid;
		gap: 16px;
		grid-template-columns: 1fr;
	}

	@media (min-width: 860px) {
		.grid {
			grid-template-columns: 1.4fr 0.6fr;
			align-items: start;
		}
	}

	/* Stack layout: space between URI block and QR; side-by-side: labels align at top */
	@media (max-width: 859px) {
		.qrWrap {
			margin-top: 1rem;
		}
	}

	.k {
		font-size: 12px;
		color: #fff;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		font-weight: 650;
	}

	.uri {
		margin: 0;
		padding: 12px;
		border: 1px solid color-mix(in srgb, white 14%, transparent);
		background: rgba(0, 0, 0, 0.35);
		overflow: auto;
		white-space: pre-wrap;
		word-break: break-word;
		font-size: 13px;
		line-height: 1.35;
		color: #fff;
	}

	.qrWrap {
		display: grid;
		justify-items: stretch;
	}

	.qr {
		margin-top: 8px;
		width: 100%;
		aspect-ratio: 1 / 1;
		height: auto;
		background: #fff;
		image-rendering: crisp-edges;
		object-fit: contain;
	}

	.qrSkeleton {
		margin-top: 8px;
		width: 100%;
		aspect-ratio: 1 / 1;
		height: auto;
		border: 1px solid color-mix(in srgb, white 14%, transparent);
		background: rgba(0, 0, 0, 0.25);
	}
</style>
