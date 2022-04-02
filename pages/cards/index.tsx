import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";

export default function CardCatalogPage() {
	return (
		<Fragment>
			<Head>
				<title>Card Catalog - Grimoire</title>
			</Head>
			<h1>Card Catalog</h1>

			<Link href="/sets">
				<a>Browse by set</a>
			</Link>
		</Fragment>
	);
}
