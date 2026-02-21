<script lang="ts">
	import PersonBadge from './PersonBadge.svelte';
	import type { Reminder } from '$lib/types';
	import type { Profile } from '$lib/types';
	import { formatShortDate } from '$lib/utils/format';

	export let reminder: Reminder;
	export let profile: Profile | undefined;
</script>

<div class="flex items-center justify-between py-3 border-b border-cream-400 last:border-0">
	<div class="flex items-center gap-3">
		<PersonBadge {profile} />
		<div>
			<p class="font-medium text-ink-800 {reminder.completed ? 'line-through text-ink-500' : ''}">
				{reminder.text}
			</p>
			<p class="text-sm text-ink-500">{formatShortDate(reminder.date)}</p>
		</div>
	</div>
</div>
