<script lang="ts">
	export let value: number;
	export let max: number = 100;
	export let showLabel = true;
	export let variant: 'default' | 'warning' | 'danger' = 'default';

	$: percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;
	$: percentRounded = Math.round(percent);
	const variants = {
		default: 'bg-forest-500',
		warning: 'bg-velvet-500',
		danger: 'bg-velvet-700'
	};
</script>

<div class="w-full">
	{#if showLabel}
		<div class="flex justify-between text-sm mb-1">
			<span class="text-ink-600">{percentRounded}%</span>
			<span class="text-ink-600">{value} / {max}</span>
		</div>
	{/if}
	<div class="h-2.5 w-full rounded-full bg-cream-400 overflow-hidden">
		<div
			class="h-full rounded-full transition-all duration-500 {variants[variant]}"
			style="width: {percent}%"
			role="progressbar"
			aria-valuenow={value}
			aria-valuemin={0}
			aria-valuemax={max}
		></div>
	</div>
</div>
