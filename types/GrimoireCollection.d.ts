export interface GrimoireCollection {
	id: number;
	name: string;
	slug?: string;
	isPublic?: boolean;
	cards?: GrimoireCollectionEntry[];
}

export interface GrimoireCollectionEntry {
	quantity: number;
	card: GrimoireCard;
}