export interface GrimoireCard {
	id: string,
	name: string,
	imgUrl?: string,
	setName?: string,
	setSlug?: string,
	sku?: number,
	guruId?: string,
	hash?: string,
	price?: number,
	printings?: [GrimoireCard],
}
