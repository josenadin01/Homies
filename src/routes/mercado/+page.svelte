<script lang="ts">
	import { marketStore, profiles, addMarketEntry, removeMarketEntry } from '$lib/stores';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import ProfileSelect from '$lib/components/ui/ProfileSelect.svelte';
	import PageSection from '$lib/components/ui/PageSection.svelte';
	import RemoveButton from '$lib/components/ui/RemoveButton.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import MarketEntryRow from '$lib/components/features/MarketEntryRow.svelte';
	import { formatCurrency, parseAmount } from '$lib/utils/format';

	const PAGE_SIZE = 5;

	let showForm = false;
	let newAmount = '';
	let newDate = new Date().toISOString().slice(0, 10);
	let newProfileId = $profiles[0]?.id ?? '1';
	let newDescription = '';
	let currentPage = 1;

	$: total = $marketStore.reduce((sum, e) => sum + e.amount, 0);
	$: sortedEntries = [...$marketStore].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	$: totalPages = Math.ceil(sortedEntries.length / PAGE_SIZE);
	$: currentPage = Math.min(currentPage, totalPages || 1);
	$: pageEntries = sortedEntries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	function handleAdd() {
		const amount = parseAmount(newAmount);
		if (amount === null) return;
		addMarketEntry({
			amount,
			date: newDate,
			profileId: newProfileId,
			description: newDescription || undefined
		});
		newAmount = '';
		newDescription = '';
		showForm = false;
		currentPage = 1;
	}
</script>

<div class="max-w-2xl mx-auto">
	<h1 class="text-2xl lg:text-3xl font-bold text-ink-800 mb-6">Mercado</h1>

	<Card padding="md" class="mb-6">
		<div class="flex justify-between items-center">
			<div>
				<h2 class="text-lg font-semibold text-ink-800">Total do mês</h2>
				<p class="text-ink-600">Gastos em compras de mercado</p>
			</div>
			<p class="text-2xl font-bold text-forest-500">{formatCurrency(total)}</p>
		</div>
	</Card>

	<PageSection
		title="Lançamentos"
		addLabel="+ Novo lançamento"
		showForm={showForm}
		onToggleForm={() => (showForm = !showForm)}
	/>

	{#if showForm}
		<Card padding="md" class="mb-6">
			<form on:submit|preventDefault={handleAdd} class="space-y-3">
				<Input label="Valor (R$)" type="text" placeholder="156,90" bind:value={newAmount} />
				<Input label="Descrição (opcional)" type="text" placeholder="Supermercado X" bind:value={newDescription} />
				<Input label="Data" type="date" bind:value={newDate} />
				<ProfileSelect label="Quem comprou" id="market-profile" bind:value={newProfileId} />
				<Button type="submit" variant="primary">Adicionar</Button>
			</form>
		</Card>
	{/if}

	<Card padding="md">
		{#if sortedEntries.length === 0}
			<EmptyState>Nenhum lançamento ainda.</EmptyState>
		{:else}
			<div class="divide-y divide-cream-400">
				{#each pageEntries as entry}
					{@const profile = $profiles.find((p) => p.id === entry.profileId)}
					<div class="group relative pr-20">
						<MarketEntryRow {entry} {profile} />
						<RemoveButton
							label="Remover lançamento"
							onRemove={() => removeMarketEntry(entry.id)}
						/>
					</div>
				{/each}
			</div>
			<Pagination {currentPage} {totalPages} onPageChange={(p) => (currentPage = p)} />
		{/if}
	</Card>
</div>
