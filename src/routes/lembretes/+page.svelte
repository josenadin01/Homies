<script lang="ts">
	import {
		remindersStore,
		profiles,
		addReminder,
		toggleReminderCompleted,
		removeReminder
	} from '$lib/stores';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import ProfileSelect from '$lib/components/ui/ProfileSelect.svelte';
	import PageSection from '$lib/components/ui/PageSection.svelte';
	import RemoveButton from '$lib/components/ui/RemoveButton.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ReminderRow from '$lib/components/features/ReminderRow.svelte';

	let showForm = false;
	let newText = '';
	let newDate = new Date().toISOString().slice(0, 10);
	let newProfileId = $profiles[0]?.id ?? '1';

	$: pendingReminders = $remindersStore.filter((r) => !r.completed);
	$: completedReminders = $remindersStore.filter((r) => r.completed);
	$: sortedPending = [...pendingReminders].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	function handleAdd() {
		if (!newText.trim()) return;
		addReminder({
			text: newText.trim(),
			date: newDate,
			profileId: newProfileId,
			completed: false
		});
		newText = '';
		showForm = false;
	}
</script>

<div class="max-w-2xl mx-auto">
	<h1 class="text-2xl lg:text-3xl font-bold text-ink-800 mb-6">Lembretes</h1>

	<PageSection
		title="Lista"
		addLabel="+ Novo lembrete"
		showForm={showForm}
		onToggleForm={() => (showForm = !showForm)}
	/>

	{#if showForm}
		<Card padding="md" class="mb-6">
			<form on:submit|preventDefault={handleAdd} class="space-y-3">
				<Input
					label="O que lembrar?"
					type="text"
					placeholder="Pagar IPTU, trocar lâmpada..."
					bind:value={newText}
					required
				/>
				<Input label="Data" type="date" bind:value={newDate} />
				<ProfileSelect
					label="Quem criou"
					id="reminders-profile"
					bind:value={newProfileId}
				/>
				<Button type="submit" variant="primary">Adicionar</Button>
			</form>
		</Card>
	{/if}

	{#if sortedPending.length > 0}
		<Card padding="md" class="mb-6">
			<h3 class="text-sm font-medium text-ink-600 mb-3">Pendentes</h3>
			<div class="divide-y divide-cream-400">
				{#each sortedPending as reminder}
					{@const profile = $profiles.find((p) => p.id === reminder.profileId)}
					<div class="group relative pr-20">
						<button
							class="w-full text-left"
							on:click={() => toggleReminderCompleted(reminder.id)}
							role="checkbox"
							aria-checked={reminder.completed}
						>
							<ReminderRow {reminder} {profile} />
						</button>
						<RemoveButton
							label="Remover lembrete"
							onRemove={(e) => {
								e?.stopPropagation?.();
								removeReminder(reminder.id);
							}}
						/>
					</div>
				{/each}
			</div>
		</Card>
	{/if}

	{#if completedReminders.length > 0}
		<Card padding="md">
			<h3 class="text-sm font-medium text-ink-600 mb-3">Concluídos</h3>
			<div class="divide-y divide-cream-400">
				{#each completedReminders as reminder}
					{@const profile = $profiles.find((p) => p.id === reminder.profileId)}
					<div class="group relative pr-20">
						<button
							class="w-full text-left"
							on:click={() => toggleReminderCompleted(reminder.id)}
							role="checkbox"
							aria-checked={reminder.completed}
						>
							<ReminderRow {reminder} {profile} />
						</button>
						<RemoveButton
							label="Remover lembrete"
							onRemove={(e) => {
								e?.stopPropagation?.();
								removeReminder(reminder.id);
							}}
						/>
					</div>
				{/each}
			</div>
		</Card>
	{/if}

	{#if $remindersStore.length === 0}
		<Card padding="md">
			<EmptyState className="py-8">Nenhum lembrete ainda. Adicione o primeiro!</EmptyState>
		</Card>
	{/if}
</div>
