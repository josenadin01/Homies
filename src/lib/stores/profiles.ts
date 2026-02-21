import { writable } from 'svelte/store';
import type { Profile } from '$lib/types';

export const profiles = writable<Profile[]>([
	{
		id: '1',
		name: 'Zé',
		initials: 'Z',
		color: 'bg-forest-500 text-cream-50',
		iconType: 'dog'
	},
	{
		id: '2',
		name: 'Naki',
		initials: 'N',
		color: 'bg-velvet-500 text-cream-50',
		iconType: 'penguin'
	}
]);

