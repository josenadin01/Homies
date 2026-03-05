import { writable } from 'svelte/store';
import type { Reminder } from '$lib/types';
import { supabase } from '$lib/supabase';

export const remindersStore = writable<Reminder[]>([]);
export const remindersLoading = writable(false);

export async function initReminders() {
	remindersLoading.set(true);

	const { data, error } = await supabase
		.from('reminders')
		.select('*')
		.order('date', { ascending: true });

	if (!error && data) {
		remindersStore.set(
			data.map((r) => ({
				id: r.id,
				text: r.text,
				date: r.date,
				profileId: r.profile_id,
				completed: r.completed
			}))
		);
	}

	remindersLoading.set(false);
}

export async function addReminder(reminder: Omit<Reminder, 'id'>) {
	const { data, error } = await supabase
		.from('reminders')
		.insert({
			text: reminder.text,
			date: reminder.date,
			profile_id: reminder.profileId,
			completed: reminder.completed
		})
		.select()
		.single();

	if (!error && data) {
		remindersStore.update((reminders) => [
			...reminders,
			{ id: data.id, text: data.text, date: data.date, profileId: data.profile_id, completed: data.completed }
		]);
	}
}

export async function toggleReminderCompleted(id: string) {
	let currentCompleted = false;
	remindersStore.update((reminders) => {
		return reminders.map((r) => {
			if (r.id === id) {
				currentCompleted = !r.completed;
				return { ...r, completed: currentCompleted };
			}
			return r;
		});
	});

	await supabase.from('reminders').update({ completed: currentCompleted }).eq('id', id);
}

export async function removeReminder(id: string) {
	const { error } = await supabase.from('reminders').delete().eq('id', id);
	if (!error) {
		remindersStore.update((reminders) => reminders.filter((r) => r.id !== id));
	}
}
