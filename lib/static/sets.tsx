import { api } from "../utils";
import { GrimoireCard } from "../../types/GrimoireCard";
import { GrimoireSet } from "../../types/GrimoireSet";

export async function getSetSlugsWithClient(): Promise<string[]> {
	return await api.get("/routes/sets");
}

export async function getSetsWithClient(): Promise<GrimoireSet[]> {
	return await api.get("/sets");
}

export async function getSetWithCardsWithClient(
	slug: string
): Promise<GrimoireSet> {
	const set = (await api.get(`/sets/${slug}`)) as GrimoireSet;
	set.cards = await getSetCardsWithClient(slug);
	return set;
}

export async function getSetCardsWithClient(slug: string): Promise<GrimoireCard[]> {
	return await api.get(`/sets/${slug}/cards`);
}
