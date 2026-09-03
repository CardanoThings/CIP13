<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { pendingNavPageTransition } from '$lib/navTransition.js';
	import { Menu, MoveDown, MoveLeft, MoveRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const DRAWER_MS = 320;

	let open = $state(false);
	let isMobile = $state(false);
	let drawerEl = $state(/** @type {HTMLElement | null} */ (null));
	let toggleButtonEl = $state(/** @type {HTMLButtonElement | null} */ (null));

	onMount(() => {
		const mq = window.matchMedia('(max-width: 599px)');
		const sync = () => {
			isMobile = mq.matches;
		};
		sync();
		mq.addEventListener('change', sync);

		// Close the desktop drawer when clicking outside it.
		// Use `pointerdown` so it feels immediate and doesn't depend on where the click lands.
		const onDocumentPointerDown = (/** @type {PointerEvent} */ event) => {
			// Only apply this behavior to the desktop drawer.
			if (!open || isMobile) return;

			const target = event.target;
			if (!(target instanceof Node)) return;

			if (drawerEl && drawerEl.contains(target)) return;
			if (toggleButtonEl && toggleButtonEl.contains(target)) return;

			open = false;
		};
		document.addEventListener('pointerdown', onDocumentPointerDown, true);

		return () => {
			mq.removeEventListener('change', sync);
			document.removeEventListener('pointerdown', onDocumentPointerDown, true);
		};
	});

	const links = [
		{ label: 'pay', href: '/pay' },
		{ label: 'stake', href: '/stake' },
		{ label: 'drep', href: '/drep' },
		{ label: 'claim', href: '/claim' },
		{ label: 'browse', href: '/browse' }
	];

	function openDrawer() {
		open = true;
	}

	async function onNavLinkClick(/** @type {MouseEvent} */ e, /** @type {string} */ href) {
		e.preventDefault();
		const path = resolve(href);
		if (page.url.pathname === path) {
			open = false;
			return;
		}
		pendingNavPageTransition.set(isMobile ? 'mobile' : 'desktop');
		open = false;
		try {
			await goto(path);
		} catch {
			pendingNavPageTransition.set(null);
		}
	}

	function onCloseClick() {
		open = false;
	}
</script>

<div
	class="fixed bottom-0 bg-white right-4 border-4 border-white p-1 h-22 w-20 z-10 shadow-[-8px_-8px_0_0_#000]"
>
	<button
		class=" bg-white inline-block"
		onclick={openDrawer}
		bind:this={toggleButtonEl}
	>
		<Menu class="text-black w-16 h-16" />
	</button>
</div>
{#if isMobile}
	{#if open}
		<nav
			class="fixed h-full w-full bg-white top-0 left-0 p-6 z-20 overflow-hidden"
			in:fly={{ y: '100%', duration: DRAWER_MS, opacity: 1 }}
			out:fly|local={{ y: '100%', duration: DRAWER_MS, opacity: 1 }}
		>
			<div class="text-black font-semibold text-2xl mb-2">web+cardano:</div>
			<ul>
				{#each links as link, index (link.href + index)}
					<li
						class="text-black font-semibold text-6xl mb-4 border-b-6 border-black pb-4 flex items-center justify-between"
					>
						<a
							href={resolve(link.href)}
							onclick={(e) => onNavLinkClick(e, link.href)}
							class="flex items-center justify-between w-full"
						>
							{link.label}

							<MoveRight class="text-black w-12 h-12" strokeWidth={2} />
						</a>
					</li>
				{/each}
				<li
					class="text-black font-semibold text-6xl mb-4 border-b-6 border-black pb-4 flex items-center justify-between"
				>
					<button class="bg-white flex items-center justify-between w-full" onclick={onCloseClick}>
						<span class="text-black">close</span>
						<MoveDown class="text-black w-12 h-12 mr-1" strokeWidth={2} />
					</button>
				</li>
			</ul>
		</nav>
	{/if}
{/if}

{#if !isMobile}
	{#if open}
		<nav
			bind:this={drawerEl}
			class="fixed h-full w-fit max-w-[min(100vw,24rem)] bg-white top-0 right-0 p-6 z-20 overflow-y-auto shadow-[-8px_0_0_0_#000]"
			in:fly={{ x: '100%', duration: DRAWER_MS, opacity: 1 }}
			out:fly|local={{ x: '100%', duration: DRAWER_MS, opacity: 1 }}
		>
			<div class="text-black font-semibold text-2xl mb-2">web+cardano:</div>
			<ul>
				{#each links as link, index (link.href + index)}
					<li
						class="text-black font-semibold text-4xl mb-4 border-b-4 border-black pb-4 flex items-center justify-between"
					>
						<a
							href={resolve(link.href)}
							onclick={(e) => onNavLinkClick(e, link.href)}
							class="flex items-center justify-between w-full min-w-48 gap-8"
						>
							{link.label}
							<MoveRight class="text-black w-10 h-10 shrink-0" strokeWidth={2} />
						</a>
					</li>
				{/each}
				<li
					class="text-black font-semibold text-4xl mb-4 border-b-4 border-black pb-4 flex items-center justify-between"
				>
					<button class="bg-white flex items-center justify-between w-full" onclick={onCloseClick}>
						<span class="text-black">close</span>
						<MoveLeft class="text-black w-10 h-10 mr-1" strokeWidth={2} />
					</button>
				</li>
			</ul>
		</nav>
	{/if}
{/if}
