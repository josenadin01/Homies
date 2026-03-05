import { writable } from 'svelte/store';
import type { DeliveryState, DeliveryOrder } from '$lib/types';
import { supabase } from '$lib/supabase';

export const deliveryStore = writable<DeliveryState>({ monthlyLimit: 300, orders: [] });
export const deliveryLoading = writable(false);

export async function initDelivery() {
	deliveryLoading.set(true);

	const [ordersResult, settingsResult] = await Promise.all([
		supabase.from('delivery_orders').select('*').order('date', { ascending: false }),
		supabase.from('delivery_settings').select('monthly_limit').eq('id', 1).single()
	]);

	deliveryStore.update((state) => ({
		monthlyLimit: settingsResult.data?.monthly_limit ?? state.monthlyLimit,
		orders: (ordersResult.data ?? []).map((r) => ({
			id: r.id,
			amount: r.amount,
			date: r.date,
			profileId: r.profile_id,
			note: r.note ?? undefined
		}))
	}));

	deliveryLoading.set(false);
}

export async function addDeliveryOrder(order: Omit<DeliveryOrder, 'id'>) {
	const { data, error } = await supabase
		.from('delivery_orders')
		.insert({
			amount: order.amount,
			date: order.date,
			profile_id: order.profileId,
			note: order.note ?? null
		})
		.select()
		.single();

	if (!error && data) {
		deliveryStore.update((state) => ({
			...state,
			orders: [
				{ id: data.id, amount: data.amount, date: data.date, profileId: data.profile_id, note: data.note ?? undefined },
				...state.orders
			]
		}));
	}
}

export async function removeDeliveryOrder(id: string) {
	const { error } = await supabase.from('delivery_orders').delete().eq('id', id);
	if (!error) {
		deliveryStore.update((state) => ({
			...state,
			orders: state.orders.filter((o) => o.id !== id)
		}));
	}
}

export async function setMonthlyLimit(limit: number) {
	const { error } = await supabase
		.from('delivery_settings')
		.upsert({ id: 1, monthly_limit: limit });

	if (!error) {
		deliveryStore.update((state) => ({ ...state, monthlyLimit: limit }));
	}
}
