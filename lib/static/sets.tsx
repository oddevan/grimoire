import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { GrimoireCard } from "../../types/GrimoireCard";

export async function getSetSlugsWithClient(
	apollo: ApolloClient<NormalizedCacheObject>
) {
	interface queryResult {
		__typename: String;
		setSlug: String;
	}

	const { data } = await apollo.query({
		query: gql`
			query cardSlugs {
				card {
					setSlug
				}
			}
		`,
	});

	const reducedData: [String?] = [];
	data.card.forEach((card: queryResult) => {
		const { setSlug } = card;
		if (!reducedData.includes(setSlug)) {
			reducedData.push(setSlug);
		}
	});

	return reducedData.map((item) => {
		return item ? { params: { slug: item } } : undefined;
	});
}

export async function getSetCardsWithClient(
	slug: string,
	apollo: ApolloClient<NormalizedCacheObject>
): Promise<[GrimoireCard?]> {
	const { data } = await apollo.query({
		query: gql`
      query cardCatalog {
        card(setSlug: "${slug}") {
					id,
					name,
					setName,
					setSlug
				}
      }
    `,
	});

	return data.card || [];
}
