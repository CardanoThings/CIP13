<script>
	let { children } = $props();
</script>

<div class="bg">
	<div class="content">{@render children()}</div>
</div>

<style>
	.bg {
		display: flow-root;
		min-height: 100vh;
		background-color: #000a0f;
		background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
		background-size: 36px 36px;
		background-position: 0 0;
	}

	.content {
		position: relative;
		z-index: 1;
	}
</style>
