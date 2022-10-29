import { GrimoireCollection } from "../../types/GrimoireCollection";
import { smolblogGetSettings } from "./utils";

export interface CardCollectionLineItem {
	collection: GrimoireCollection;
	quantity: number;
}

export async function getUserCollectionsForCard(smolblogAccessCode: string, cardId: string): Promise<CardCollectionLineItem[]> {
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

export async function getCardPrice(cardId: string): Promise<number> {
	if (!cardId) return -1;
	
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}card/${cardId}/price`
	);

	if (!response.ok || !response.status) return -1;

	const priceData = await response.json();

  return priceData.price ?? -1;
}