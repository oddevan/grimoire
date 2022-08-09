import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import InventoryLineItem from "../../components/InventoryLineItem";
import { getSetWithCards, getSetSlugs } from "../../lib/static";
import { GrimoireCollection } from "../../types/GrimoireCollection";
import { GrimoireSet } from "../../types/GrimoireSet";

const DynamicBatchEntrySelect = dynamic(
	() => import("../../components/BatchEntrySelect"),
	{ ssr: false }
);

export default function BatchEntrySet(props: GrimoireSet) {
	const { cards, name } = props;
	const [collection, setCollection] = useState<
		GrimoireCollection | undefined
	>();

	if (!cards) return <p className="text-muted">This set is empty.</p>;

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
									(entry) => entry?.card.id == card.id
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
}: GetStaticPropsContext): Promise<{ props: GrimoireSet }> {
	if (!params) return { props: { cards: [], name: "", slug: "" } };

	const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? "";
	const set = await getSetWithCards(slug);

	return { props: set };
}

export async function getStaticPaths() {
	const slugs = await getSetSlugs();
	return {
		paths: slugs.map((slug) => {
			return { params: { slug } };
		}),
		fallback: false,
	};
}
