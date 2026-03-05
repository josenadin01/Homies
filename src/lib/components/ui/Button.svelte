<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let type: 'button' | 'submit' = 'button';
	export let disabled = false;
	export let className: string = '';

	const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed';
	const variants = {
		primary: 'bg-forest-500 text-cream-50 hover:bg-forest-600 focus:ring-forest-500',
		secondary: 'bg-velvet-500 text-cream-50 hover:bg-velvet-600 focus:ring-velvet-500',
		outline: 'border-2 border-cream-400 text-ink-800 hover:bg-cream-200 focus:ring-ink-400',
		ghost: 'text-ink-700 hover:bg-cream-200 focus:ring-ink-400'
	};
	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};
</script>

<button
	{type}
	{disabled}
	class="{base} {variants[variant]} {sizes[size]} {className}"
	on:click
>
	<slot />
</button>
