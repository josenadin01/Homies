<script lang="ts">
	import { Dog, Icon } from 'lucide-svelte';
	import { penguin } from '@lucide/lab';

	export let initials: string;
	export let iconType: 'dog' | 'penguin' | undefined = undefined;
	export let color: string = 'bg-forest-500 text-cream-50';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let className: string = '';

	const sizes = {
		sm: 'w-7 h-7',
		md: 'w-9 h-9',
		lg: 'w-11 h-11'
	};
	const iconSizes = {
		sm: 14,
		md: 18,
		lg: 22
	};
</script>

<div
	class="inline-flex items-center justify-center rounded-full shrink-0 {color} {sizes[size]} {className}"
	title={initials}
>
	{#if iconType === 'dog'}
		<Dog size={iconSizes[size]} strokeWidth={2} />
	{:else if iconType === 'penguin'}
		<Icon iconNode={penguin} size={iconSizes[size]} strokeWidth={2} />
	{:else}
		<span class="font-semibold text-xs">{initials}</span>
	{/if}
</div>
