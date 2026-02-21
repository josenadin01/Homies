<script lang="ts">
	export let type: 'text' | 'number' | 'date' = 'text';
	export let value: string = '';
	export let placeholder: string = '';
	export let label: string = '';
	export let name: string = '';
	export let disabled = false;
	export let required = false;
	export let className: string = '';

	const inputClass =
		'w-full px-4 py-2.5 rounded-xl border border-cream-400 bg-cream-100 text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors';
</script>

<label class="block {className}">
	{#if label}
		<span class="block text-sm font-medium text-ink-700 mb-1">{label}</span>
	{/if}
	{#if type === 'text'}
		<input
			type="text"
			{name}
			{placeholder}
			{disabled}
			{required}
			bind:value
			class={inputClass}
		/>
	{:else if type === 'number'}
		<input
			type="number"
			{name}
			{placeholder}
			{disabled}
			{required}
			bind:value
			class={inputClass}
		/>
	{:else if type === 'date'}
		<input
			type="date"
			{name}
			{placeholder}
			{disabled}
			{required}
			bind:value
			class={inputClass}
		/>
	{/if}
</label>
