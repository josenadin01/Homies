import { writable } from 'svelte/store';
import type { DeliveryState, DeliveryOrder } from '$lib/types';

const mockOrders: DeliveryOrder[] = [
	{ id: '1', amount: 45.9, date: '2025-02-15', profileId: '1', note: 'iFood' },
	{ id: '2', amount: 62.0, date: '2025-02-18', profileId: '2', note: 'Rappi' },
	{ id: '3', amount: 38.5, date: '2025-02-20', profileId: '1' }
];

export const deliveryStore = writable<DeliveryState>({
	monthlyLimit: 300,
	orders: mockOrders
});

export function addDeliveryOrder(order: Omit<DeliveryOrder, 'id'>) {
	deliveryStore.update((state) => ({
		...state,
		orders: [
			...state.orders,
			{
				...order,
				id: crypto.randomUUID()
			}
		]
	}));
}

export function removeDeliveryOrder(id: string) {
	deliveryStore.update((state) => ({
		...state,
		orders: state.orders.filter((o) => o.id !== id)
	}));
}

export function setMonthlyLimit(limit: number) {
	deliveryStore.update((state) => ({ ...state, monthlyLimit: limit }));
}
