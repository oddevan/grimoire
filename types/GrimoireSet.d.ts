import { GrimoireCard } from "./GrimoireCard";

export interface GrimoireSet {
	name: string;
	slug: string;
	cards?: [GrimoireCard?];
}