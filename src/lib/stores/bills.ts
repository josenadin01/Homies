import { writable } from 'svelte/store';
import type { Bill } from '$lib/types';
import { supabase } from '$lib/supabase';

export const billsStore = writable<Bill[]>([]);
export const billsLoading = writable(false);

export async function initBills() {
	billsLoading.set(true);

	const { data, error } = await supabase
		.from('bills')
		.select('*')
		.order('due_date', { ascending: true });

	if (!error && data) {
		billsStore.set(
			data.map((r) => ({
				id: r.id,
				description: r.description,
				amount: r.amount,
				dueDate: r.due_date,
				profileId: r.profile_id,
				paid: r.paid
			}))
		);
	}

	billsLoading.set(false);
}

export async function addBill(bill: Omit<Bill, 'id'>) {
	const { data, error } = await supabase
		.from('bills')
		.insert({
			description: bill.description,
			amount: bill.amount,
			due_date: bill.dueDate,
			profile_id: bill.profileId,
			paid: bill.paid
		})
		.select()
		.single();

	if (!error && data) {
		billsStore.update((bills) => [
			...bills,
			{ id: data.id, description: data.description, amount: data.amount, dueDate: data.due_date, profileId: data.profile_id, paid: data.paid }
		]);
	}
}

export async function toggleBillPaid(id: string) {
	let currentPaid = false;
	billsStore.update((bills) => {
		return bills.map((b) => {
			if (b.id === id) {
				currentPaid = !b.paid;
				return { ...b, paid: currentPaid };
			}
			return b;
		});
	});

	await supabase.from('bills').update({ paid: currentPaid }).eq('id', id);
}

export async function removeBill(id: string) {
	const { error } = await supabase.from('bills').delete().eq('id', id);
	if (!error) {
		billsStore.update((bills) => bills.filter((b) => b.id !== id));
	}
}
