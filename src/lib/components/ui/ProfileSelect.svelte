<script lang="ts">
	import { profiles } from '$lib/stores';

	export let label: string = 'Quem fez';
	export let id: string = 'profile-select';
	export let value: string = '';
	export let className: string = '';

	const inputClass =
		'w-full px-4 py-2.5 rounded-xl border border-cream-400 bg-cream-100 text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors';
</script>

<div class="{className}">
	<label for={id} class="block text-sm font-medium text-ink-700 mb-1">{label}</label>
	<select id={id} bind:value class={inputClass}>
		{#each $profiles as profile}
			<option value={profile.id}>{profile.name}</option>
		{/each}
	</select>
</div>
