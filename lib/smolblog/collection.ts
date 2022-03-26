import { GrimoireCollection } from "../../types/GrimoireCollection";
import { smolblogGetSettings, smolblogPostSettings } from "./utils";

export async function setCardQuantity(cardId: string, collectionId: number, quantity: number, smolblogAccessCode: string) {
	if (
		!cardId ||
		!collectionId ||
		!smolblogAccessCode
	) return undefined;

	const response = await fetch(
		`https://grimoireapp.smolblog.com/wp-json/grimoire/v1/collection/${collectionId}/updatecardquantity?card_id=${cardId}&quantity=${quantity}`,
		{
			// body: JSON.stringify({
			// 	card_id: cardId,
			// 	quantity
			// }),
			...smolblogPostSettings(smolblogAccessCode)
		}
	);
	const responseData = await response.json();

	if (!response.ok) {
		throw new Error(`Error from Smolblog: ${responseData.message ?? response.status}`);
	};
	
	return responseData;
}

export async function getUserCollections(smolblogAccessCode: string): Promise<[GrimoireCollection?]> {
	if (!smolblogAccessCode) return [];

	const response = await fetch(
		 `${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}collection/usercollections`,
		 smolblogGetSettings(smolblogAccessCode)
	);
	const collections = await response.json();

	if (!response.ok) {
		throw new Error(`Error from Smolblog: ${collections.message ?? response.status}`);
	};

	return collections;
}