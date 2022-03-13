import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React, { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import BatchEntrySelect from "../../components/BatchEntrySelect";
import { useSmolblog } from "../../contexts/SmolblogProvider";
import { getCardCatalogInfo } from "../../lib/static/smolblog";
import { GrimoireCard } from "../../types/GrimoireCard";
import { GrimoireCollection } from "../../types/GrimoireCollection";

interface BatchEntrySetPageProps {
	cards: [GrimoireCard?];
	name: string;
}

export default function BatchEntrySet(props: BatchEntrySetPageProps) {
	const { cards, name } = props;
	const [collection, setCollection] = useState<
		GrimoireCollection | undefined
	>();
	const { smolblogAccessCode } = useSmolblog();

	return (
		<Fragment>
			<Head>
				<title>Batch Entry - Grimoire</title>
			</Head>
			<h1>Batch Entry: {name}</h1>

			<Row className="justify-content-center">
				<Col md="8">
					<BatchEntrySelect />
					{collection ? (
						<p>Populate it!</p>
					) : (
						cards.map((card) => {
							if (!card) return;
							return (
								<Row key={`card-${card.id}`}>
									<Col sm="8" md="6" lg="8" xl="9">
										{card.name} <code>{card.id}</code>
									</Col>
									<Col sm="4" lg="2">
										<label
											htmlFor={`${card.id}-quantity`}
											className="visually-hidden"
										>
											Quantity
										</label>
										<input
											type="number"
											className="form-control"
											id={`${card.id}-quantity`}
											value="0"
											disabled
										/>
									</Col>
								</Row>
							);
						})
					)}
				</Col>
			</Row>
		</Fragment>
	);
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext): Promise<{ props: BatchEntrySetPageProps }> {
	const catalog = await getCardCatalogInfo();
	const cards: [GrimoireCard?] = [];

	if (!params) return { props: { cards: [], name: "" } };

	const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

	catalog.forEach((card) => {
		if (!card || !card.setSlug || card.setSlug !== slug) {
			return;
		}
		cards.push(card);
	});

	const name = cards[0]?.setName ?? slug ?? "";

	return { props: { cards, name } };
}

export async function getStaticPaths() {
	const catalog = await getCardCatalogInfo();
	const sets: [String?] = [];

	catalog.forEach((card) => {
		if (!card || sets.includes(card?.setSlug)) return;
		sets.push(card.setSlug);
	});

	const paths = sets.map((slug) => {
		return { params: { slug } };
	});

	return {
		paths,
		fallback: false,
	};
}
