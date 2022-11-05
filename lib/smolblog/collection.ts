import { Session } from "@supabase/supabase-js";
import { GrimoireCollection } from "../../types/GrimoireCollection";

export async function setCardQuantity(cardId: string, collectionId: number, quantity: number, smolblogAccessCode: string) {
	if (
		!cardId ||
		!collectionId ||
		!smolblogAccessCode
	) return undefined;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}collection/${collectionId}/updatecardquantity`,
		{
			body: JSON.stringify({
				card_id: cardId,
				quantity
			}),
			method: 'POST'
		}
	);
	const responseData = await response.json();

	if (!response.ok) {
		throw new Error(`Error from Smolblog: ${responseData.message ?? response.status}`);
	};
	
	return responseData;
}

export async function getUserCollections(): Promise<GrimoireCollection[]> {
	const response = await fetch(
		 `/api/collection/usercollections`
	);
	const collections = await response.json();

	if (!response.ok) {
		throw new Error(`Error from API: ${collections.message ?? response.status}`);
	};

	return collections;
}

export async function createCollection(name: string, smolblogAccessCode: string) {
	if (
		!name ||
		!smolblogAccessCode
	) return undefined;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}collection/create`,
		{
			body: JSON.stringify({ name }),
			method: 'POST'
		}
	);
	const responseData = await response.json();

	if (!response.ok) {
		throw new Error(`Error from Smolblog: ${responseData.message ?? response.status}`);
	};
	
	return responseData;
}

export async function downloadExport(collectionId: number, smolblogAccessCode: string) {
	if (!smolblogAccessCode || !collectionId) return;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}collection/${collectionId}/export`
	);
	
	if (!response.ok) {
		const errorObj = await response.json().catch(() => undefined);
		throw new Error(`Error from Smolblog: ${errorObj?.message ?? response.status}`);
	}

	return response.blob();
};