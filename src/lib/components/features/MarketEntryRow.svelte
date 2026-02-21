<script lang="ts">
	import PersonBadge from './PersonBadge.svelte';
	import type { MarketEntry } from '$lib/types';
	import type { Profile } from '$lib/types';
	import { formatCurrency, formatShortDate } from '$lib/utils/format';

	export let entry: MarketEntry;
	export let profile: Profile | undefined;
</script>

<div class="flex items-center justify-between py-3 border-b border-cream-400 last:border-0">
	<div class="flex items-center gap-3">
		<PersonBadge {profile} />
		<div>
			<p class="font-medium text-ink-800">{entry.description || 'Mercado'}</p>
			<p class="text-sm text-ink-500">{formatShortDate(entry.date)}</p>
		</div>
	</div>
	<span class="font-semibold text-ink-800">{formatCurrency(entry.amount)}</span>
</div>
