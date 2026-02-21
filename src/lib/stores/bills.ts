import { writable } from 'svelte/store';
import type { Bill } from '$lib/types';

const mockBills: Bill[] = [
	{ id: '1', description: 'Aluguel', amount: 1500, dueDate: '2025-02-10', profileId: '1', paid: true },
	{ id: '2', description: 'Conta de luz', amount: 180, dueDate: '2025-02-15', profileId: '2', paid: false },
	{ id: '3', description: 'Internet', amount: 99, dueDate: '2025-02-20', profileId: '1', paid: false }
];

export const billsStore = writable<Bill[]>(mockBills);

export function addBill(bill: Omit<Bill, 'id'>) {
	billsStore.update((bills) => [
		...bills,
		{
			...bill,
			id: crypto.randomUUID()
		}
	]);
}

export function toggleBillPaid(id: string) {
	billsStore.update((bills) =>
		bills.map((b) => (b.id === id ? { ...b, paid: !b.paid } : b))
	);
}

export function removeBill(id: string) {
	billsStore.update((bills) => bills.filter((b) => b.id !== id));
}
