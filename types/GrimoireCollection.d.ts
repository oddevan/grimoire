export interface GrimoireCollection {
	id: number;
	name: string;
	cards?: [{
		card: GrimoireCard,
		quantity: number
	}];
}