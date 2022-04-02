import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getSetCards, getSetSlugs } from "../../lib/static";
import { GrimoireSet } from "../../types/GrimoireSet";

export default function BatchEntrySet(props: GrimoireSet) {
	const { cards, name } = props;

	if (!cards) return <p className="text-muted">This set is empty.</p>;

	return (
		<Fragment>
			<Head>
				<title>{name} - Grimoire</title>
			</Head>
			<h1>{name}</h1>

			<Row className="justify-content-center">
				<Col md="8">
					{cards.map((card) => {
						if (!card) return;
						return (
							<Row key={`card-${card.id}`}>
								<Col sm="8" md="6" lg="8" xl="9">
									<Link href={`/cards/${card.id}`}>
										<a>{card.name}</a>
									</Link>
								</Col>
								<Col sm="4" lg="2">
									<code>{card.id}</code>
								</Col>
							</Row>
						);
					})}
				</Col>
			</Row>
		</Fragment>
	);
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext): Promise<{ props: GrimoireSet }> {
	if (!params) return { props: { cards: [], name: "", slug: "" } };

	const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? "";
	const cards = await getSetCards(slug ?? "");
	const name = cards[0]?.setName ?? slug ?? "";

	return { props: { cards, name, slug } };
}

export async function getStaticPaths() {
	const paths = await getSetSlugs();
	return {
		paths,
		fallback: false,
	};
}
