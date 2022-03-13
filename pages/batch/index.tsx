import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { getCardCatalogInfo } from "../../lib/static/smolblog";

interface Set {
	name: string;
	slug: string;
}

export default function BatchEntryIndex(props: { sets: [Set?] }) {
	const { sets } = props;

	return (
		<Fragment>
			<Head>
				<title>Batch Entry - Grimoire</title>
			</Head>
			<h1>Batch Entry</h1>
			<p>Choose a set:</p>
			<ul>
				{sets.map((set) => {
					if (!set) return;
					return (
						<li key={`set-${set.slug}`}>
							<Link href={`/batch/${set.slug}`}>
								<a>{set.name}</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</Fragment>
	);
}

export async function getStaticProps() {
	const catalog = await getCardCatalogInfo();
	const sets: [Set?] = [];

	catalog.forEach((card) => {
		if (!card || sets.find((set) => set?.slug === card.setSlug)) return;
		sets.push({
			name: card.setName ?? "",
			slug: card.setSlug ?? "",
		});
	});

	return { props: { sets } };
}
