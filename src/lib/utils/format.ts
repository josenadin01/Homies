export function formatCurrency(value: number): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(value);
}

export function formatDate(dateStr: string): string {
	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(new Date(dateStr));
}

export function formatShortDate(dateStr: string): string {
	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: 'short'
	}).format(new Date(dateStr));
}

/** Parse BR number format (e.g. "45,90") to number. Returns null if invalid. */
export function parseAmount(value: string): number | null {
	const num = parseFloat(value.replace(',', '.'));
	return !isNaN(num) && num > 0 ? num : null;
}
