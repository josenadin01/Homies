<script lang="ts">
	import { deliveryStore } from '$lib/stores';
	import { profiles } from '$lib/stores';
	import Card from '$lib/components/ui/Card.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import PersonBadge from './PersonBadge.svelte';
	import { formatCurrency, formatShortDate } from '$lib/utils/format';

	$: totalSpent = $deliveryStore.orders.reduce((sum, o) => sum + o.amount, 0);
	$: limit = $deliveryStore.monthlyLimit;
	$: variant = totalSpent >= limit ? 'danger' : totalSpent >= limit * 0.8 ? 'warning' : 'default';
	$: recentOrders = $deliveryStore.orders.slice(-3).reverse();
</script>

<Card padding="md">
	<div class="space-y-4">
		<div>
			<h3 class="text-lg font-semibold text-ink-800">Limite de delivery</h3>
			<p class="text-sm text-ink-600 mt-0.5">
				{formatCurrency(totalSpent)} de {formatCurrency(limit)} este mês
			</p>
		</div>
		<ProgressBar value={totalSpent} max={limit} {variant} />
		{#if recentOrders.length > 0}
			<div>
				<p class="text-sm font-medium text-ink-700 mb-2">Últimos pedidos</p>
				<ul class="space-y-2">
					{#each recentOrders as order}
						{@const profile = $profiles.find((p) => p.id === order.profileId)}
						<li class="flex items-center justify-between text-sm">
							<div class="flex items-center gap-2">
								<PersonBadge profile={profile} />
								<span class="text-ink-600">{formatShortDate(order.date)}</span>
								{#if order.note}
									<span class="text-ink-400">• {order.note}</span>
								{/if}
							</div>
							<span class="font-medium">{formatCurrency(order.amount)}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</Card>
