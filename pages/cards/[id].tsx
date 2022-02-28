import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Printings from "../../components/Printings";
import UserInventory from "../../components/UserInventory";
import SmolblogProvider from "../../contexts/SmolblogProvider";
import { getAllCardIds, getCardInfo } from "../../staticBuild";
import { GrimoireCard } from "../../types/GrimoireCard";

type CardPageParams = {
	id: string;
};

export default function CardPage(card: GrimoireCard) {
	return (
		<Fragment>
			<Head>
				<title>{card.name} - Grimoire</title>
			</Head>
			<h1>
				{card.name} <small className="text-muted">{card.setName}</small>
			</h1>

			<div className="row">
				<div className="col-sm-6 col-lg-8 col-xl-9">
					<h2 className="visually-hidden">Card info</h2>
					<div className="row">
						<div className="col-sm-6">
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
						</div>
						<div className="col-sm-6">
							<dl className="row">
								<dt className="col-lg-6">TCGplayer SKU:</dt>
								<dd className="col-lg-6">{card.sku}</dd>
								<dt className="col-lg-6">PokemonTCG.guru ID</dt>
								<dd className="col-lg-6">{card.guruId}</dd>
							</dl>
						</div>
					</div>
				</div>
				<div className="col-sm-6 col-lg-4 col-xl-3">
					<div className="alert alert-primary">
						Grimoire ID: <code>{card.id}</code>
					</div>
					<Printings printings={card.printings} />
				</div>
			</div>
			<UserInventory cardId={card.id} />
		</Fragment>
	);
}

export async function getStaticPaths() {
	const paths = await getAllCardIds();
	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<CardPageParams>) => {
	const card = await getCardInfo(params?.id ?? "");

	if (!card) {
		throw new TypeError(
			params?.id ? `No card found for id ${params.id}` : "Params not passed"
		);
	}

	return { props: card };
};
