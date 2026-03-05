<script lang="ts">
	import { billsStore, profiles, addBill, toggleBillPaid, removeBill } from '$lib/stores';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import ProfileSelect from '$lib/components/ui/ProfileSelect.svelte';
	import PageSection from '$lib/components/ui/PageSection.svelte';
	import RemoveButton from '$lib/components/ui/RemoveButton.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import BillCard from '$lib/components/features/BillCard.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import { formatCurrency, parseAmount } from '$lib/utils/format';

	const PAGE_SIZE = 5;

	let showForm = false;
	let hoveredIndex: number | null = null;
	let currentPage = 1;
	let newDescription = '';
	let newAmount = '';
	let newDueDate = new Date().toISOString().slice(0, 10);
	let newProfileId = $profiles[0]?.id ?? '1';

	$: pendingTotal = $billsStore.filter((b) => !b.paid).reduce((sum, b) => sum + b.amount, 0);
	$: paidTotal = $billsStore.filter((b) => b.paid).reduce((sum, b) => sum + b.amount, 0);
	$: sortedBills = [...$billsStore].sort(
		(a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
	);
	$: totalPages = Math.ceil(sortedBills.length / PAGE_SIZE);
	$: currentPage = Math.min(currentPage, totalPages || 1);
	$: pageBills = sortedBills.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	function handleAdd() {
		const amount = parseAmount(newAmount);
		if (amount === null || !newDescription.trim()) return;
		addBill({
			description: newDescription.trim(),
			amount,
			dueDate: newDueDate,
			profileId: newProfileId,
			paid: false
		});
		newDescription = '';
		newAmount = '';
		showForm = false;
		currentPage = 1;
	}
</script>

<div class="max-w-2xl mx-auto">
	<h1 class="text-2xl lg:text-3xl font-bold text-ink-800 mb-6">Contas</h1>

	<div class="grid grid-cols-2 gap-4 mb-6">
		<Card padding="md">
			<p class="text-sm text-ink-600">Pendentes</p>
			<p class="text-xl font-bold text-forest-500">{formatCurrency(pendingTotal)}</p>
		</Card>
		<Card padding="md">
			<p class="text-sm text-ink-600">Pagas</p>
			<p class="text-xl font-bold text-velvet-600">{formatCurrency(paidTotal)}</p>
		</Card>
	</div>

	<PageSection
		title="Lista de contas"
		addLabel="+ Nova conta"
		showForm={showForm}
		onToggleForm={() => (showForm = !showForm)}
	/>

	{#if showForm}
		<Card padding="md" class="mb-6">
			<form on:submit|preventDefault={handleAdd} class="space-y-3">
				<Input
					label="Descrição"
					type="text"
					placeholder="Aluguel, Luz, Internet..."
					bind:value={newDescription}
					required
				/>
				<Input
					label="Valor (R$)"
					type="text"
					placeholder="150,00"
					bind:value={newAmount}
				/>
				<Input label="Vencimento" type="date" bind:value={newDueDate} />
				<ProfileSelect
					label="Quem cadastrou"
					id="bills-profile"
					bind:value={newProfileId}
				/>
				<Button type="submit" variant="primary">Adicionar</Button>
			</form>
		</Card>
	{/if}

	<Card padding="md">
		{#if $billsStore.length === 0}
			<EmptyState>Nenhuma conta cadastrada.</EmptyState>
		{:else}
			<div>
				{#each pageBills as bill, i}
					{@const profile = $profiles.find((p) => p.id === bill.profileId)}
					<div
						class="group relative pr-20 px-2 hover:rounded-xl hover:bg-cream-200 transition-colors {i > 0 && hoveredIndex !== i && hoveredIndex !== i - 1 ? 'border-t border-cream-400' : ''}"
						on:mouseenter={() => (hoveredIndex = i)}
						on:mouseleave={() => (hoveredIndex = null)}
					>
						<button
							class="w-full text-left"
							on:click={() => toggleBillPaid(bill.id)}
							role="checkbox"
							aria-checked={bill.paid}
						>
							<BillCard {bill} {profile} />
						</button>
						<RemoveButton
							label="Remover conta"
							onRemove={(e) => {
								e?.stopPropagation?.();
								removeBill(bill.id);
							}}
						/>
					</div>
				{/each}
			</div>
			<Pagination {currentPage} {totalPages} onPageChange={(p) => (currentPage = p)} />
		{/if}
	</Card>
</div>
