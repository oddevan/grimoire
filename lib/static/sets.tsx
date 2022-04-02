import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { GrimoireCard } from "../../types/GrimoireCard";
import { GrimoireSet } from "../../types/GrimoireSet";

export async function getSetSlugsWithClient(
	apollo: ApolloClient<NormalizedCacheObject>
) {
	interface queryResult {
		__typename: string;
		setSlug: string;
	}

	const { data } = await apollo.query({
		query: gql`
			query setSlugs {
				card {
					setSlug
				}
			}
		`,
	});

	const reducedData: [string?] = [];
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

export async function getSetsWithClient(
	apollo: ApolloClient<NormalizedCacheObject>
) {
	interface queryResult {
		__typename: string;
		setName: string;
		setSlug: string;
	}

	const { data } = await apollo.query({
		query: gql`
			query setSlugs {
				card {
					setName
					setSlug
				}
			}
		`,
	});

	const reducedData: [GrimoireSet?] = [];
	data.card.forEach((card: queryResult) => {
		const { setName, setSlug } = card;
		if (reducedData.findIndex((set) => set?.slug == setSlug) < 0) {
			reducedData.push({ name: setName, slug: setSlug });
		}
	});

	return reducedData;
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
