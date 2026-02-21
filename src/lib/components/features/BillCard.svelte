<script lang="ts">
	import PersonBadge from './PersonBadge.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import type { Bill } from '$lib/types';
	import type { Profile } from '$lib/types';
	import { formatCurrency, formatDate } from '$lib/utils/format';

	export let bill: Bill;
	export let profile: Profile | undefined;
</script>

<div class="flex items-center justify-between py-3 border-b border-cream-400 last:border-0">
	<div class="flex items-center gap-3">
		<PersonBadge {profile} />
		<div>
			<p class="font-medium text-ink-800">{bill.description}</p>
			<p class="text-sm text-ink-500">Vencimento: {formatDate(bill.dueDate)}</p>
		</div>
	</div>
	<div class="flex items-center gap-3">
		<span class="font-semibold text-ink-800">{formatCurrency(bill.amount)}</span>
		{#if bill.paid}
			<Badge variant="success">Pago</Badge>
		{:else}
			<Badge variant="warning">Pendente</Badge>
		{/if}
	</div>
</div>
