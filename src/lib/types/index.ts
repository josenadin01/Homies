export interface Profile {
	id: string;
	name: string;
	initials: string;
	color: string;
	iconType?: 'dog' | 'penguin';
}

export interface DeliveryOrder {
	id: string;
	amount: number;
	date: string;
	profileId: string;
	note?: string;
}

export interface DeliveryState {
	monthlyLimit: number;
	orders: DeliveryOrder[];
}

export interface MarketEntry {
	id: string;
	amount: number;
	date: string;
	profileId: string;
	description?: string;
}

export interface Bill {
	id: string;
	description: string;
	amount: number;
	dueDate: string;
	profileId: string;
	paid: boolean;
}

export interface Reminder {
	id: string;
	text: string;
	date: string;
	profileId: string;
	completed: boolean;
}
