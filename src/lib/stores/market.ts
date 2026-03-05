import { writable } from 'svelte/store';
import type { MarketEntry } from '$lib/types';
import { supabase } from '$lib/supabase';

export const marketStore = writable<MarketEntry[]>([]);
export const marketLoading = writable(false);

export async function initMarket() {
	marketLoading.set(true);

	const { data, error } = await supabase
		.from('market_entries')
		.select('*')
		.order('date', { ascending: false });

	if (!error && data) {
		marketStore.set(
			data.map((r) => ({
				id: r.id,
				amount: r.amount,
				date: r.date,
				profileId: r.profile_id,
				description: r.description ?? undefined
			}))
		);
	}

	marketLoading.set(false);
}

export async function addMarketEntry(entry: Omit<MarketEntry, 'id'>) {
	const { data, error } = await supabase
		.from('market_entries')
		.insert({
			amount: entry.amount,
			date: entry.date,
			profile_id: entry.profileId,
			description: entry.description ?? null
		})
		.select()
		.single();

	if (!error && data) {
		marketStore.update((entries) => [
			{ id: data.id, amount: data.amount, date: data.date, profileId: data.profile_id, description: data.description ?? undefined },
			...entries
		]);
	}
}

export async function removeMarketEntry(id: string) {
	const { error } = await supabase.from('market_entries').delete().eq('id', id);
	if (!error) {
		marketStore.update((entries) => entries.filter((e) => e.id !== id));
	}
}
