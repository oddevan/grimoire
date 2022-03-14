export interface GrimoireCollection {
	id: number;
	name: string;
	slug?: string;
	isPublic?: boolean;
	cards?: [{
		card: GrimoireCard,
		quantity: number
	}];
}