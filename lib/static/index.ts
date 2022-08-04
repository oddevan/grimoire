import { ApolloClient, InMemoryCache } from '@apollo/client'
import { getAllCardIdsWithClient, getCardInfoWithClient, getCardCatalogInfoWithClient } from "./cards"
import { getSetCardsWithClient, getSetSlugsWithClient, getSetsWithClient } from './sets';

const apollo = new ApolloClient({
  uri: process.env.BUILD_DATA_URL,
  cache: new InMemoryCache()
});

export const getAllCardIds = async () => getAllCardIdsWithClient(apollo);
// export const getCardCatalogInfo = async () => getCardCatalogInfoWithClient(apollo);
export const getCardInfo = async (cardId: string) => getCardInfoWithClient(cardId, apollo);

export const getSetSlugs = async () => getSetSlugsWithClient(apollo);
export const getSets = async () => getSetsWithClient(apollo);
export const getSetCards = async (slug: string) => getSetCardsWithClient(slug, apollo);