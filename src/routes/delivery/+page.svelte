<script lang="ts">
	import { deliveryStore, profiles, addDeliveryOrder, removeDeliveryOrder, setMonthlyLimit } from '$lib/stores';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import ProfileSelect from '$lib/components/ui/ProfileSelect.svelte';
	import PageSection from '$lib/components/ui/PageSection.svelte';
	import RemoveButton from '$lib/components/ui/RemoveButton.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import PersonBadge from '$lib/components/features/PersonBadge.svelte';
	import { formatCurrency, formatShortDate, parseAmount } from '$lib/utils/format';

	let showForm = false;
	let newAmount = '';
	let newDate = new Date().toISOString().slice(0, 10);
	let newProfileId = $profiles[0]?.id ?? '1';
	let newNote = '';
	let editLimit = false;
	let tempLimit = $deliveryStore.monthlyLimit.toString();

	$: totalSpent = $deliveryStore.orders.reduce((sum, o) => sum + o.amount, 0);
	$: limit = $deliveryStore.monthlyLimit;
	$: variant = totalSpent >= limit ? 'danger' : totalSpent >= limit * 0.8 ? 'warning' : 'default';

	function handleAdd() {
		const amount = parseAmount(newAmount);
		if (amount === null) return;
		addDeliveryOrder({
			amount,
			date: newDate,
			profileId: newProfileId,
			note: newNote || undefined
		});
		newAmount = '';
		newNote = '';
		showForm = false;
	}

	function handleSetLimit() {
		const val = parseFloat(tempLimit);
		if (!isNaN(val) && val > 0) {
			setMonthlyLimit(val);
			editLimit = false;
		}
	}
</script>

<div class="max-w-2xl mx-auto">
	<h1 class="text-2xl lg:text-3xl font-bold text-ink-800 mb-6">Delivery</h1>

	<Card padding="md" class="mb-6">
		<div class="space-y-4">
			<div class="flex justify-between items-start">
				<div>
					<h2 class="text-lg font-semibold text-ink-800">Limite mensal</h2>
					{#if editLimit}
						<div class="flex gap-2 mt-2">
							<Input
								type="number"
								bind:value={tempLimit}
								placeholder="300"
							/>
							<Button variant="primary" size="sm" on:click={handleSetLimit}>Ok</Button>
							<Button variant="ghost" size="sm" on:click={() => (editLimit = false)}>Cancelar</Button>
						</div>
					{:else}
						<button
							type="button"
							class="text-forest-500 font-medium cursor-pointer hover:underline mt-1 text-left bg-transparent border-none p-0"
							on:click={() => {
								editLimit = true;
								tempLimit = limit.toString();
							}}
						>
							{formatCurrency(limit)} (editar)
						</button>
					{/if}
				</div>
				<p class="text-2xl font-bold text-ink-800">{formatCurrency(totalSpent)}</p>
			</div>
			<ProgressBar value={totalSpent} max={limit} {variant} />
		</div>
	</Card>

	<PageSection
		title="Pedidos"
		addLabel="+ Novo pedido"
		showForm={showForm}
		onToggleForm={() => (showForm = !showForm)}
	/>

	{#if showForm}
		<Card padding="md" class="mb-6">
			<form
				on:submit|preventDefault={handleAdd}
				class="space-y-3"
			>
				<Input
					label="Valor (R$)"
					type="text"
					placeholder="45,90"
					bind:value={newAmount}
				/>
				<Input label="Data" type="date" bind:value={newDate} />
				<ProfileSelect
					label="Quem pediu"
					id="delivery-profile"
					bind:value={newProfileId}
				/>
				<Input
					label="Observação (opcional)"
					type="text"
					placeholder="iFood, Rappi..."
					bind:value={newNote}
				/>
				<Button type="submit" variant="primary">Adicionar</Button>
			</form>
		</Card>
	{/if}

	<Card padding="md">
		{#if $deliveryStore.orders.length === 0}
			<EmptyState>Nenhum pedido registrado ainda.</EmptyState>
		{:else}
			<ul class="divide-y divide-cream-400">
				{#each $deliveryStore.orders.slice().reverse() as order}
					{@const profile = $profiles.find((p) => p.id === order.profileId)}
					<li class="flex items-center justify-between py-3 group pr-16">
						<div class="flex items-center gap-3">
							<PersonBadge profile={profile} />
							<div>
								<p class="font-medium text-ink-800">{formatShortDate(order.date)}</p>
								{#if order.note}
									<p class="text-sm text-ink-500">{order.note}</p>
								{/if}
							</div>
						</div>
						<div class="flex items-center gap-3">
							<span class="font-semibold">{formatCurrency(order.amount)}</span>
							<RemoveButton
								label="Remover pedido"
								inline
								onRemove={() => removeDeliveryOrder(order.id)}
							/>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</Card>
</div>
