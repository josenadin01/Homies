<script lang="ts">
	export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
	export let className: string = '';

	const paddings = {
		none: '',
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-6'
	};
</script>

<div
	class="bg-cream-100 rounded-2xl shadow-sm border border-cream-400 overflow-hidden {paddings[padding]} {className}"
	role="article"
>
	<slot />
</div>
