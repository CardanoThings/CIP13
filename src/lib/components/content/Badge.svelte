<script lang="ts">
	let { children, class: className = '' } = $props<{
		children?: any;
		class?: string;
	}>();
</script>

<span class={`badge ${className}`}>
	{@render children?.()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		height: 28px;
		padding: 0 10px;
		border-radius: 999px;
		background: #fff;
		color: #000;
		font-size: 12px;
		line-height: 1;
		letter-spacing: -0.01em;
		font-weight: 500; /* medium */
		white-space: nowrap;
	}
</style>

