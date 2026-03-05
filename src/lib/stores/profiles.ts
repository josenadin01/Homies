import { writable } from 'svelte/store';
import type { Profile } from '$lib/types';
import { supabase } from '$lib/supabase';

export const profiles = writable<Profile[]>([]);
export const profilesLoading = writable(false);

export async function initProfiles() {
	profilesLoading.set(true);

	const { data, error } = await supabase
		.from('profiles')
		.select('id, name, initials, color, icon_type');

	if (!error && data) {
		profiles.set(
			data.map((r) => ({
				id: r.id,
				name: r.name,
				initials: r.initials,
				color: r.color,
				iconType: r.icon_type as Profile['iconType']
			}))
		);
	}

	profilesLoading.set(false);
}
