<script lang="ts">
	import PersonBadge from './PersonBadge.svelte';
	import type { MarketEntry } from '$lib/types';
	import type { Profile } from '$lib/types';
	import { formatCurrency, formatShortDate } from '$lib/utils/format';

	export let entry: MarketEntry;
	export let profile: Profile | undefined;
</script>

<div class="flex items-center gap-3 py-3">
	<div class="flex-none w-20">
		<PersonBadge {profile} />
	</div>
	<div class="flex-1 min-w-0">
		<p class="font-medium text-ink-800 truncate">{entry.description || 'Mercado'}</p>
		<p class="text-sm text-ink-500">{formatShortDate(entry.date)}</p>
	</div>
	<span class="flex-none w-24 text-right font-semibold text-ink-800">{formatCurrency(entry.amount)}</span>
</div>
