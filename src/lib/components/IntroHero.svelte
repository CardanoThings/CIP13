<script>
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';

	const words = ['//drep', '//stake', '//pay', '//claim', '//browse'];
	const maxWordLength = Math.max(...words.map((w) => w.length));

	let typed = $state(words[0].slice(0, 2));
	let wordIndex = $state(0);
	let charIndex = $state(2); // keep the leading '/' always
	let direction = $state('typing'); // 'typing' | 'deleting'

	let timeoutId;
	let cursorOn = $state(true);
	let cursorTimer;
	let initialPath = '';
	let stopped = false;

	function prefersReducedMotion() {
		if (typeof window === 'undefined') return true;
		return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
	}

	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	function schedule(fn, ms) {
		timeoutId = setTimeout(fn, ms);
	}

	function stopAnimation(/** @type {{ keepCursor?: boolean } | undefined} */ options) {
		if (stopped) return;
		const keepCursor = options?.keepCursor ?? false;

		stopped = true;
		if (timeoutId) clearTimeout(timeoutId);

		if (!keepCursor) {
			if (cursorTimer != null) clearInterval(cursorTimer);
			cursorTimer = null;
			// Keep cursor steady after the animation finishes.
			cursorOn = true;
		}
	}

	onMount(() => {
		initialPath = page.url.pathname;
		stopped = false;

		// Only animate the word that matches the current pathname.
		// Example: /pay => animate just `//pay` once.
		const slug = initialPath.replace(/^\//, '');
		const bySlug = /** @type {Record<string, string>} */ ({
			drep: '//drep',
			stake: '//stake',
			pay: '//pay',
			claim: '//claim',
			browse: '//browse'
		});
		const isKnownActionRoute = Boolean(slug && bySlug[slug]);
		const activeWords = isKnownActionRoute ? [bySlug[slug]] : words;
		const singleWordMode = activeWords.length === 1;

		// Reset animation state for the selected word(s).
		wordIndex = 0;
		charIndex = 2; // keep the leading '/' always
		direction = 'typing';

		// Ensure '/' is shown immediately so the headline doesn't collapse.
		typed = activeWords[wordIndex].slice(0, charIndex);

		// Always run the typing animation (incl. mobile + users with "Reduce Motion" on).
		// For reduced-motion preference, skip only the blinking cursor — not the typewriter effect.
		const reduced = prefersReducedMotion();
		if (reduced) {
			cursorOn = true;
		} else {
			cursorTimer = setInterval(() => {
				cursorOn = !cursorOn;
			}, 500);
		}

		const tick = () => {
			// When navigating away, stop timers so only the current pathname animates.
			if (stopped || page.url.pathname !== initialPath) {
				stopAnimation();
				return;
			}

			const word = activeWords[wordIndex];

			if (direction === 'typing') {
				if (charIndex < word.length) {
					charIndex += 1;
					typed = word.slice(0, charIndex);
					// Natural typing cadence: slightly variable per keystroke.
					const ms = rand(55, 115) + (Math.random() < 0.06 ? rand(120, 220) : 0);
					schedule(tick, ms);
					return;
				}

				// Finished typing the full word; pause.
				if (singleWordMode) {
					// Type exactly once on action pages.
					typed = word;
					stopAnimation({ keepCursor: true });
					return;
				}

				direction = 'deleting';
				// Small “hold” before starting to delete again.
				schedule(tick, rand(220, 360));
				return;
			}

			// Deleting
			if (singleWordMode) {
				stopAnimation({ keepCursor: true });
				return;
			}

			const keepPrefixLen = 1;
			if (charIndex > keepPrefixLen) {
				charIndex -= 1;
				typed = word.slice(0, charIndex);
				const ms = rand(35, 75);
				schedule(tick, ms);
				return;
			}

			// We've deleted down to just the '/' prefix; move to the next word
			// while keeping '/' visible so layout never collapses.
			direction = 'typing';
			const nextIndex = (wordIndex + 1) % activeWords.length;
			wordIndex = nextIndex;
			charIndex = keepPrefixLen;
			typed = activeWords[nextIndex].slice(0, keepPrefixLen);
			schedule(tick, rand(180, 320));
		};

		// On action pages (e.g. /stake) we only type once; add a small delay
		// so the page feels less “busy” on first load.
		if (singleWordMode) {
			schedule(tick, 1000);
		} else {
			tick();
		}
	});

	onDestroy(() => {
		stopAnimation();
	});

	// Stop immediately when the route changes (outgoing instances might still
	// be alive during key transitions).
	$effect(() => {
		if (!initialPath) return;
		if (page.url.pathname !== initialPath) stopAnimation();
	});
</script>

<section class="w-full mx-auto mb-4 mt-8">
	<div class="grid gap-[14px]">
		<h1
			class="font-medium tracking-[-0.03em] leading-[1.08] text-[clamp(28px,4vw,56px)] text-white whitespace-nowrap"
			aria-label="web+cardano actions"
		>
			<span
				class="text-7xl items-baseline whitespace-nowrap"
				style={`min-width: ${maxWordLength + 1}ch;`}
				aria-live="polite"
				aria-atomic="true"
			>
				{typed}
				<span class={`leading-none ${cursorOn ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
					/
				</span>
			</span>
		</h1>
	</div>
</section>
