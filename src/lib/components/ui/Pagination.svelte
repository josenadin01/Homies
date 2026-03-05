<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;
	export let onPageChange: (page: number) => void;
</script>

{#if totalPages > 1}
	<div class="flex items-center justify-center gap-1 pt-4">
		<button
			class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-ink-600 hover:bg-cream-300"
			disabled={currentPage === 1}
			on:click={() => onPageChange(currentPage - 1)}
		>
			←
		</button>

		{#each Array(totalPages) as _, i}
			<button
				class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors {currentPage === i + 1
					? 'bg-forest-500 text-cream-50'
					: 'text-ink-600 hover:bg-cream-300'}"
				on:click={() => onPageChange(i + 1)}
			>
				{i + 1}
			</button>
		{/each}

		<button
			class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-ink-600 hover:bg-cream-300"
			disabled={currentPage === totalPages}
			on:click={() => onPageChange(currentPage + 1)}
		>
			→
		</button>
	</div>
{/if}
