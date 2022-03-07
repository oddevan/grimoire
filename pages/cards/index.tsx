import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { getCardCatalogInfo } from "../../staticBuild/smolblog";
import { GrimoireCard } from "../../types/GrimoireCard";

interface CardCatalogPageProps {
	cards: [GrimoireCard];
}

export default function CardCatalogPage(props: CardCatalogPageProps) {
	type set = {
		name: string;
		slug: string;
		cards: [GrimoireCard?];
	};

	const { cards } = props;
	const sets: [set?] = [];

	cards.forEach((card) => {
		let cardSet = sets.find((set) => set?.slug === card.setSlug);

		if (!cardSet) {
			cardSet = {
				name: card.setName ?? "",
				slug: card.setSlug ?? "",
				cards: [],
			};
			sets.push(cardSet);
		}

		cardSet.cards.push(card);
	});

	return (
		<Fragment>
			<Head>
				<title>Card Catalog - Grimoire</title>
			</Head>
			<h1>Card Catalog</h1>

			<div className="row">
				{sets.map((set) => {
					if (!set) return <Fragment />;
					return (
						<div key={set.slug} className="col-sm-6 col-md-4 col-lg-3">
							<h3>{set.name}</h3>
							<ul>
								{set.cards.map((card) => {
									if (!card) return <Fragment />;
									return (
										<li key={card.id}>
											<Link href={`/cards/${card.id}`}>
												<a>
													{card.name} <code>{card.id}</code>
												</a>
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</div>
		</Fragment>
	);
}

export const getStaticProps = async () => {
	const cards = await getCardCatalogInfo();
	return {
		props: {
			cards,
		},
	};
};
