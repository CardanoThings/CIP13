<script>
	let { size = 40, color = '#fff' } = $props();
</script>

<div class="loader" aria-label="Loading" role="status" style={`--size: ${size}px; --c:${color};`}>
	<div class="dot"></div>
</div>

<style>
	.loader {
		--size: 48px;
		--border: 4px;
		--dot: 15px;
		--gap: 4px;
		--inner: calc(var(--size) - (2 * var(--border)));
		--travel: calc(var(--inner) - (2 * var(--gap)) - var(--dot));

		width: var(--size);
		height: var(--size);
		border: var(--border) solid var(--c);
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}

	.dot {
		width: var(--dot);
		height: var(--dot);
		background-color: var(--c);
		position: absolute;
		top: var(--gap);
		left: var(--gap);
		animation: travel 600ms linear infinite;
	}

	@keyframes travel {
		0%,
		18% {
			transform: translate(0, 0);
		}
		18% {
			animation-timing-function: cubic-bezier(0.2, 0.9, 0.15, 1);
		}
		25%,
		43% {
			transform: translate(var(--travel), 0);
		}
		43% {
			animation-timing-function: cubic-bezier(0.2, 0.9, 0.15, 1);
		}
		50%,
		68% {
			transform: translate(var(--travel), var(--travel));
		}
		68% {
			animation-timing-function: cubic-bezier(0.2, 0.9, 0.15, 1);
		}
		75%,
		93% {
			transform: translate(0, var(--travel));
		}
		93% {
			animation-timing-function: cubic-bezier(0.2, 0.9, 0.15, 1);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>
