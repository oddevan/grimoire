import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { GrimoireCard } from '../../types/GrimoireCard';

export async function getAllCardIdsWithClient(apollo: ApolloClient<NormalizedCacheObject>) {
	interface queryResult {
		__typename: String,
		id: String
	}

	const { data } = await apollo.query({
    query: gql`
      query cardSlugs {
        card {
					id
				}
      }
    `
  });

	return data.card.map((item:queryResult) => {
		return { params: { id: item.id } }
	})
}

export async function getCardCatalogInfoWithClient(apollo: ApolloClient<NormalizedCacheObject>): Promise<[GrimoireCard?]> {
const { data } = await apollo.query({
    query: gql`
      query cardCatalog {
        card {
					id,
					name,
					setName,
					setSlug
				}
      }
    `
  });

	return data.card || [];
}

export async function getCardInfoWithClient(id: string, apollo: ApolloClient<NormalizedCacheObject>) : Promise<GrimoireCard | undefined> {
	const { data } = await apollo.query({
    query: gql`
      query cardInfo {
				card(grimoireId: "${id}") {
					id
					hash
					name
					sku
					imgUrl
					setName
					printings {
						id
						name
						setName
					}
				}
			}
    `
  });

	return data.card[0] || undefined
}
