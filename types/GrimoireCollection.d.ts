export interface GrimoireCollection {
	id: number;
	name: string;
	cards?: [GrimoireCard];
	hashes?: [string];
}