import { writable } from 'svelte/store';

/**
 * One-shot page column transition after nav drawer link navigation.
 * Cleared in +layout `afterNavigate`. `null` = no animation.
 * @type {import('svelte/store').Writable<null | 'desktop' | 'mobile'>}
 */
export const pendingNavPageTransition = writable(null);
