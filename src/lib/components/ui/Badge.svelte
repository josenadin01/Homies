<script lang="ts">
	export let variant: 'default' | 'success' | 'warning' | 'info' = 'default';
	export let className: string = '';

	const variants = {
		default: 'bg-cream-300 text-ink-800',
		success: 'bg-forest-200 text-forest-800',
		warning: 'bg-velvet-200 text-velvet-800',
		info: 'bg-cream-400 text-ink-700'
	};
</script>

<span
	class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {variants[variant]} {className}"
	role="status"
>
	<slot />
</span>
