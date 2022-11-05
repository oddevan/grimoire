export interface GrimoireCollection {
	id: string;
	name: string;
	slug?: string;
	isPublic?: boolean;
	cards?: GrimoireCollectionEntry[];
}

export interface GrimoireCollectionEntry {
	quantity: number;
	card: GrimoireCard;
}