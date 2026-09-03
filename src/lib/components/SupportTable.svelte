<script>
	import { Asterisk, Check, CircleQuestionMark, Minus } from 'lucide-svelte';

	const {
		title = 'Wallet',
		columns = [
			'default (CIP-13)',
			'//pay (CIP-157)',
			'//stake (CIP-13)',
			'//claim (CIP-99)',
			'//drep (CIP-162)',
			'//browse (CIP-158)'
		],
		rows = []
	} = $props();

	const icons = {
		partial: { label: 'Partial Support', Icon: Asterisk },
		supported: { label: 'Supported', Icon: Check },
		untested: { label: 'Not Tested yet', Icon: CircleQuestionMark },
		none: { label: 'No Support yet', Icon: Minus }
	};

	const legendOrder = /** @type {Array<keyof typeof icons>} */ ([
		'partial',
		'supported',
		'untested',
		'none'
	]);
</script>

<table class="min-w-full border-collapse" id="wallet-support">
	<thead class="border-4 border-white">
		<tr class="bg-white text-black">
			<th class="th-wallet relative h-[170px] w-[240px] px-6 text-left text-sm font-semibold">
				<span class="th-base absolute left-3 leading-none">{title}</span>
			</th>
			{#each columns as col (col)}
				<th class="relative h-[110px] w-[92px] px-3 text-center">
					<span
						class="th-base th-rot absolute left-1/2 inline-flex -translate-x-1/2 leading-none text-xs font-semibold tracking-wide whitespace-nowrap"
					>
						{col}
					</span>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class="text-white border-4 border-white">
		{#each rows as row (row.wallet)}
			<tr class="bg-black/50">
				<td class="walletCell border-t border-white px-3 py-3 text-base align-middle"
					>{row.wallet}</td
				>
				{#each columns as col (col)}
					{@const statusKey = row.values?.[col] ?? 'none'}
					{@const Icon = icons[statusKey]?.Icon ?? icons.none.Icon}
					<td class="iconCell border-t border-white px-3 py-3 text-center align-middle">
						<span class="iconWrap text-white">
							<Icon size={18} />
						</span>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>

	<tfoot>
		<tr>
			<td
				colspan={columns.length + 1}
				class="py-1 pl-3 relative bg-white border-white border-4 text-black text-[0.65rem]"
			>
				<strong class="font-medium">Last updated:</strong> 2026-05-18
			</td>
		</tr>
		<tr>
			<td colspan={columns.length + 1} class="pt-3 pl-0 relative -left-1.5">
				<ul class="flex flex-col items-start text-[0.65rem] text-white/25">
					{#each legendOrder as key (key)}
						{@const Icon = icons[key]?.Icon ?? icons.none.Icon}
						<li class="flex items-center gap-0.5">
							<span class="inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
								<Icon size={12} />
							</span>
							<span>{icons[key].label}</span>
						</li>
					{/each}
				</ul>
			</td>
		</tr>
	</tfoot>
</table>

<style>
	:global(:root) {
		/* single source of truth for header baseline alignment */
		--th-baseline: 20px;
	}

	.th-base {
		bottom: var(--th-baseline);
	}

	.th-rot {
		height: 72px;
		writing-mode: vertical-rl;
		transform: rotate(180deg);
	}

	/* Icons share the same row vertical center as wallet names */
	:global(#wallet-support tbody td.walletCell),
	:global(#wallet-support tbody td.iconCell) {
		vertical-align: middle;
		line-height: 1.5;
	}

	.iconWrap {
		display: inline-flex;
		width: 1.5rem;
		height: 1.5rem;
		align-items: center;
		justify-content: center;
	}
</style>
