import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { getSets } from "../../lib/static";
import { GrimoireSet } from "../../types/GrimoireSet";

export default function BatchEntryIndex(props: { sets: [GrimoireSet?] }) {
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
	const sets = await getSets();

	return { props: { sets } };
}
