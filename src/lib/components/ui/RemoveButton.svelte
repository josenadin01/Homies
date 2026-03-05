<script lang="ts">
	export let label: string = 'Remover';
	export let className: string = '';
	export let onRemove: (e?: Event) => void = () => {};
	/** When true, button is inline in flex. When false, uses absolute positioning (parent needs relative). */
	export let inline: boolean = false;
</script>

<button
	class="text-ink-400 hover:text-forest-500 text-sm transition-opacity {inline
		? 'opacity-0 group-hover:opacity-100'
		: 'absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-10'} {className}"
	on:click={(e) => onRemove(e)}
	aria-label={label}
>
	Remover
</button>
