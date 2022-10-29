import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Printings from "../../components/Printings";
import { getAllCardIds, getCardInfo } from "../../lib/static";
import { GrimoireCard } from "../../types/GrimoireCard";
import dynamic from "next/dynamic";
import { Col, Row } from "react-bootstrap";
import CardPrice from "../../components/CardPrice";

type CardPageParams = {
	id: string;
};

const DynamicUserInventory = dynamic(
	() => import("../../components/UserInventory"),
	{ ssr: false }
);

export default function CardPage(card: GrimoireCard) {
	return (
		<Fragment>
			<Head>
				<title>{card.name} - Grimoire</title>
			</Head>
			<h1>
				{card.name} <small className="text-muted">{card.setName}</small>
			</h1>

			<Row>
				<Col sm="6" lg="8" xl="9">
					<h2 className="visually-hidden">Card info</h2>
					<Row>
						<Col sm="6">
							{card.imgUrl ? (
								<img
									src={card.imgUrl}
									alt={card.name}
									className="img-fluid"
									width="200"
									height="278"
								/>
							) : (
								<Fragment />
							)}
						</Col>
						<Col sm="6">
							<dl className="row">
								<dt className="col-lg-6">TCGplayer SKU:</dt>
								<dd className="col-lg-6">{card.sku}</dd>
								<dt className="col-lg-6">Grimoire ID:</dt>
								<dd className="col-lg-6">
									<code>{card.id}</code>
								</dd>
							</dl>
							<CardPrice card={card} />
						</Col>
					</Row>
				</Col>
				<Col sm="6" lg="4" xl="3">
					<Printings printings={card.printings} />
				</Col>
			</Row>
			<DynamicUserInventory card={card} />
		</Fragment>
	);
}

export const getServerSideProps = async ({
	params,
	res,
}: GetServerSidePropsContext<CardPageParams>) => {
	const card = await getCardInfo(params?.id ?? "");

	if (!card) {
		throw new TypeError(
			params?.id ? `No card found for id ${params.id}` : "Params not passed"
		);
	}
	if (!card.price) {
		delete card.price;
	}

	const secondsInDay = 60 * 60 * 24;

	res.setHeader(
		"Cache-Control",
		`public, s-maxage=${secondsInDay}, stale-while-revalidate=${
			secondsInDay * 7
		}`
	);

	return { props: card }; // Cache page for 1 day.
};
