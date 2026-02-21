<script lang="ts">
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import type { Profile } from '$lib/types';

	export let profile: Profile | undefined;
</script>

{#if profile}
	<div class="inline-flex items-center gap-2">
		<Avatar initials={profile.initials} iconType={profile.iconType} color={profile.color} size="sm" />
		<span class="text-sm font-medium text-ink-700">{profile.name}</span>
	</div>
{:else}
	<span class="text-sm text-ink-400">—</span>
{/if}
