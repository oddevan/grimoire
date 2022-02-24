import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GrimoireCard } from '../types/GrimoireCard';

const apollo = new ApolloClient({
  uri: 'https://grimoireapp.smolblog.com/graphql/',
  cache: new InMemoryCache()
});

export async function getAllCardIds() {
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

export async function getCardInfo(id: string) : Promise<GrimoireCard | undefined> {
	const { data } = await apollo.query({
    query: gql`
      query cardInfo {
				card(grimoireId: "${id}") {
					id
					hash
					name
					sku
				}
			}
    `
  });

	return data.card[0] || undefined
}
