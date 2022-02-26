export interface GrimoireCard {
	id: string,
	name: string,
	sku?: number,
	guruId?: string,
	hash?: string,
	printings?: [GrimoireCard],
}
