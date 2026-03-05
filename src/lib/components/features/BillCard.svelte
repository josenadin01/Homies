<script lang="ts">
	import PersonBadge from './PersonBadge.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import type { Bill } from '$lib/types';
	import type { Profile } from '$lib/types';
	import { formatCurrency, formatDate } from '$lib/utils/format';

	export let bill: Bill;
	export let profile: Profile | undefined;
</script>

<div class="flex items-center gap-3 py-3">
	<div class="flex-none w-20">
		<PersonBadge {profile} />
	</div>
	<div class="flex-1 min-w-0">
		<p class="font-medium text-ink-800 truncate">{bill.description}</p>
		<p class="text-sm text-ink-500">Venc. {formatDate(bill.dueDate)}</p>
	</div>
	<span class="flex-none w-24 font-semibold text-ink-800">{formatCurrency(bill.amount)}</span>
	<div class="flex-none w-24 flex justify-center">
		{#if bill.paid}
			<Badge variant="success">Pago</Badge>
		{:else}
			<Badge variant="warning">Pendente</Badge>
		{/if}
	</div>
</div>
