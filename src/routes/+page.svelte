<script lang="ts">
	import { deliveryStore, marketStore, billsStore, remindersStore, profiles } from '$lib/stores';
	import Card from '$lib/components/ui/Card.svelte';
	import DeliveryLimitCard from '$lib/components/features/DeliveryLimitCard.svelte';
	import PersonBadge from '$lib/components/features/PersonBadge.svelte';
	import BillCard from '$lib/components/features/BillCard.svelte';
	import ReminderRow from '$lib/components/features/ReminderRow.svelte';
	import { formatCurrency } from '$lib/utils/format';

	$: deliveryTotal = $deliveryStore.orders.reduce((sum, o) => sum + o.amount, 0);
	$: marketTotal = $marketStore.reduce((sum, e) => sum + e.amount, 0);
	$: pendingBills = $billsStore.filter((b) => !b.paid);
	$: upcomingReminders = $remindersStore.filter((r) => !r.completed).slice(0, 3);
</script>

<div class="max-w-4xl mx-auto">
	<h1 class="text-2xl lg:text-3xl font-bold text-ink-800 mb-6">Olá, vocês! 👋</h1>

	<div class="grid gap-6 lg:grid-cols-2 mb-8">
		<DeliveryLimitCard />
		<Card padding="md">
			<div class="space-y-4">
				<h3 class="text-lg font-semibold text-ink-800">Gastos no mercado</h3>
				<p class="text-2xl font-bold text-forest-500">{formatCurrency(marketTotal)}</p>
				<p class="text-sm text-ink-600">Total do mês</p>
				<a href="/mercado" class="text-forest-500 font-medium hover:underline text-sm">
					Ver detalhes →
				</a>
			</div>
		</Card>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<Card padding="md">
			<div class="space-y-3">
				<div class="flex justify-between items-center">
					<h3 class="text-lg font-semibold text-ink-800">Contas pendentes</h3>
					<a href="/contas" class="text-forest-500 font-medium hover:underline text-sm">
						Ver todas
					</a>
				</div>
				{#if pendingBills.length === 0}
					<p class="text-ink-500 text-sm py-4">Nenhuma conta pendente 🎉</p>
				{:else}
					<div class="divide-y divide-cream-400">
						{#each pendingBills.slice(0, 3) as bill}
							{@const profile = $profiles.find((p) => p.id === bill.profileId)}
							<BillCard {bill} profile={profile} />
						{/each}
					</div>
				{/if}
			</div>
		</Card>

		<Card padding="md">
			<div class="space-y-3">
				<div class="flex justify-between items-center">
					<h3 class="text-lg font-semibold text-ink-800">Próximos lembretes</h3>
					<a href="/lembretes" class="text-forest-500 font-medium hover:underline text-sm">
						Ver todos
					</a>
				</div>
				{#if upcomingReminders.length === 0}
					<p class="text-ink-500 text-sm py-4">Nenhum lembrete pendente</p>
				{:else}
					<div class="divide-y divide-cream-400">
						{#each upcomingReminders as reminder}
							{@const profile = $profiles.find((p) => p.id === reminder.profileId)}
							<ReminderRow {reminder} profile={profile} />
						{/each}
					</div>
				{/if}
			</div>
		</Card>
	</div>
</div>
