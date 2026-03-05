<script lang="ts">
	import PersonBadge from './PersonBadge.svelte';
	import type { Reminder } from '$lib/types';
	import type { Profile } from '$lib/types';
	import { formatShortDate } from '$lib/utils/format';

	export let reminder: Reminder;
	export let profile: Profile | undefined;
</script>

<div class="flex items-center gap-3 py-3">
	<div class="flex-none w-20">
		<PersonBadge {profile} />
	</div>
	<div class="flex-1 min-w-0">
		<p class="font-medium text-ink-800 truncate {reminder.completed ? 'line-through text-ink-500' : ''}">
			{reminder.text}
		</p>
		<p class="text-sm text-ink-500">{formatShortDate(reminder.date)}</p>
	</div>
</div>
