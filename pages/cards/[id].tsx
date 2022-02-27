import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
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
				{card.name}
				<br />
				<small className="text-muted">{card.setName}</small>
			</h1>

			<div className="row">
				<div className="col-sm-6 col-lg-8 col-xl-9">
					<div className="row">
						<div className="col-sm-6">
							{card.imgUrl ? (
								<Image
									src={card.imgUrl}
									alt={card.name}
									width="200"
									height="278"
								/>
							) : (
								<Fragment />
							)}
						</div>
						<div className="col-sm-6"></div>
					</div>
				</div>
				<div className="col-sm-6 col-lg-4 col-xl-3">
					<div className="alert alert-primary">
						Grimoire ID: <code>{card.id}</code>
					</div>
					{card.printings ? (
						<div className="card">
							<h3 className="card-header">Other printings</h3>
							<div className="list-group-flush">
								{card.printings.map((printing) => (
									<Link key={printing.id} href={`/cards/${printing.id}`}>
										<a className="list-group-item list-group-item-action">
											{printing.name}
											{printing.setName ? (
												<Fragment>
													<br />
													<small className="text-muted">
														{printing.setName}
													</small>
												</Fragment>
											) : (
												<Fragment />
											)}
										</a>
									</Link>
								))}
							</div>
						</div>
					) : (
						<Fragment />
					)}
				</div>
			</div>
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
