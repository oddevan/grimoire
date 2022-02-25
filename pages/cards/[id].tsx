import type { GetStaticPropsContext } from "next";
import { getAllCardIds, getCardInfo } from "../../staticBuild";
import { GrimoireCard } from "../../types/GrimoireCard";

type CardPageParams = {
	id: string;
};

export default function CardPage(card: GrimoireCard) {
	return (
		<div>
			<h1>{card.name}</h1>

			<p>
				This card has the ID <code>{card.id}</code> and hash{" "}
				<code>{card.hash}</code>. Its TCGplayer SKU is {card.sku}.
			</p>
		</div>
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
