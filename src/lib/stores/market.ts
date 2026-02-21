import { writable } from 'svelte/store';
import type { MarketEntry } from '$lib/types';

const mockEntries: MarketEntry[] = [
	{ id: '1', amount: 156.9, date: '2025-02-10', profileId: '1', description: 'Supermercado X' },
	{ id: '2', amount: 89.5, date: '2025-02-17', profileId: '2', description: 'Atacadão' },
	{ id: '3', amount: 42.0, date: '2025-02-19', profileId: '1' }
];

export const marketStore = writable<MarketEntry[]>(mockEntries);

export function addMarketEntry(entry: Omit<MarketEntry, 'id'>) {
	marketStore.update((entries) => [
		...entries,
		{
			...entry,
			id: crypto.randomUUID()
		}
	]);
}

export function removeMarketEntry(id: string) {
	marketStore.update((entries) => entries.filter((e) => e.id !== id));
}
