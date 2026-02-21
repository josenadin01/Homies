<script lang="ts">
	export let className: string = '';
</script>

<p class="text-ink-500 py-6 text-center {className}">
	<slot />
</p>
