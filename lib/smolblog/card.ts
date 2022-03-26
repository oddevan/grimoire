import { GrimoireCollection } from "../../types/GrimoireCollection";
import { smolblogGetSettings } from "./utils";

export interface CardCollectionLineItem {
	collection: GrimoireCollection;
	quantity: number;
}

export async function getUserCollectionsForCard(smolblogAccessCode: string, cardId: string): Promise<[CardCollectionLineItem?]> {
	if (!smolblogAccessCode || !cardId) return [];
	
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}card/${cardId}/usercollections`,
		smolblogGetSettings(smolblogAccessCode),
	);

	if (!response.ok || !response.status) return [];

	const collectionData = await response.json();

  return collectionData ? collectionData.map((lineItem: any) => {
		return {
			collection: {
				id: lineItem.id,
				name: lineItem.name,
			},
			quantity: lineItem.quantity
		}
	}) : [];
}