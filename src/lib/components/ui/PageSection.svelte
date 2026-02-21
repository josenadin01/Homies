<script lang="ts">
	import Button from './Button.svelte';

	export let title: string;
	export let addLabel: string = 'Adicionar';
	export let showForm: boolean = false;
	export let onToggleForm: () => void = () => {};
</script>

<div class="flex justify-between items-center mb-4 mt-6">
	<h2 class="text-lg font-semibold text-ink-800">{title}</h2>
	<Button variant="primary" size="sm" on:click={onToggleForm}>
		{showForm ? 'Cancelar' : addLabel}
	</Button>
</div>
