import { GrimoireCollection } from "../../types/GrimoireCollection";
import { smolblogGetSettings } from "./utils";

export interface CardCollectionLineItem {
	collection: GrimoireCollection;
	quantity: number;
}

export async function getUserCollectionsForCard(cardId: string): Promise<CardCollectionLineItem[]> {
	const response = await fetch(`/api/card/${cardId}/usercollections`);

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

export async function getCardPrice(cardId: string): Promise<string|null> {
	if (!cardId) return null;
	
	const response = await fetch(
		`/api/card/${cardId}/price`
	);

	if (!response.ok || !response.status) {
		console.error('Error getting card price', response);
		return null;
	}

	const { price } = await response.json();
	if (isNaN(+price)) return null;

	const formattedPrice = new Intl.NumberFormat(`en-US`, {
		currency: `USD`,
		style: 'currency',
	}).format(price);

  return formattedPrice;
}