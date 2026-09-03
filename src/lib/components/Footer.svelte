<script>
	import { asset } from '$app/paths';
</script>

<footer class="mt-4 mx-auto px-4 flex justify-between items-center pb-4">
	<div class="flex w-fit items-center">
		<div
			class="text-center text-xs text-white font-regular flex flex-col items-center border-2 border-white p-2 mt-4 border-r-0 h-full bg-black/50"
		>
			<div class="border-b-2 pb-2 mb-2">Brought to you by</div>
			<a
				href="https://cardanothings.io"
				target="_blank"
				rel="noopener noreferrer"
				class="font-regular">CardanoThings.io</a
			>
		</div>
		<div class="logo rounded-r-full w-fit overflow-hidden mt-4 border-2 border-white p-1">
			<a href="https://cardanothings.io" target="_blank" rel="noopener noreferrer">
				<img src={asset('/cardanothings.jpg')} alt="CardanoThings.io" width="58" height="60" />
			</a>
		</div>
	</div>
</footer>
