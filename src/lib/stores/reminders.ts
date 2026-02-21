import { writable } from 'svelte/store';
import type { Reminder } from '$lib/types';

const mockReminders: Reminder[] = [
	{ id: '1', text: 'Pagar IPTU', date: '2025-02-25', profileId: '1', completed: false },
	{ id: '2', text: 'Trocar lâmpada da cozinha', date: '2025-02-22', profileId: '2', completed: false },
	{ id: '3', text: 'Renovar documento', date: '2025-02-28', profileId: '1', completed: true }
];

export const remindersStore = writable<Reminder[]>(mockReminders);

export function addReminder(reminder: Omit<Reminder, 'id'>) {
	remindersStore.update((reminders) => [
		...reminders,
		{
			...reminder,
			id: crypto.randomUUID()
		}
	]);
}

export function toggleReminderCompleted(id: string) {
	remindersStore.update((reminders) =>
		reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
	);
}

export function removeReminder(id: string) {
	remindersStore.update((reminders) => reminders.filter((r) => r.id !== id));
}
