import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import InventoryLineItem from "../../components/InventoryLineItem";
import { getCardCatalogInfo } from "../../lib/static";
import { GrimoireCard } from "../../types/GrimoireCard";
import { GrimoireCollection } from "../../types/GrimoireCollection";

const DynamicBatchEntrySelect = dynamic(
	() => import("../../components/BatchEntrySelect"),
	{ ssr: false }
);

interface BatchEntrySetPageProps {
	cards: [GrimoireCard?];
	name: string;
}

export default function BatchEntrySet(props: BatchEntrySetPageProps) {
	const { cards, name } = props;
	const [collection, setCollection] = useState<
		GrimoireCollection | undefined
	>();

	return (
		<Fragment>
			<Head>
				<title>Batch Entry - Grimoire</title>
			</Head>
			<h1>Batch Entry: {name}</h1>

			<Row className="justify-content-center">
				<Col md="8">
					<DynamicBatchEntrySelect setCollection={setCollection} />
					{collection
						? cards.map((card) => {
								if (!card) return;
								const setEntry = collection.cards?.find(
									(entry) => entry.card.id == card.id
								);
								const quantity = setEntry?.quantity || 0;

								return (
									<InventoryLineItem
										key={`card-${card.id}`}
										card={card}
										collection={collection}
										quantity={quantity}
										showCard
									/>
								);
						  })
						: cards.map((card) => {
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
						  })}
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

	cards.sort((a, b) => {
		const nameA = a?.id.toUpperCase() ?? "";
		const nameB = b?.id.toUpperCase() ?? "";
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
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
