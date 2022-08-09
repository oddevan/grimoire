import { getAllCardIdsWithClient, getCardInfoWithClient } from "./cards"
import { getSetCardsWithClient, getSetSlugsWithClient, getSetsWithClient, getSetWithCardsWithClient } from './sets';

export const getAllCardIds = async () => getAllCardIdsWithClient();
export const getCardInfo = async (cardId: string) => getCardInfoWithClient(cardId);

export const getSetSlugs = async () => getSetSlugsWithClient();
export const getSets = async () => getSetsWithClient();
export const getSetWithCards = async (slug: string) => getSetWithCardsWithClient(slug);
export const getSetCards = async (slug: string) => getSetCardsWithClient(slug);