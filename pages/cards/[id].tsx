import { GetStaticProps } from "next";
import { getAllCardIds, getCardInfo } from "../../staticBuild";
import { GrimoireCard } from "../../types/GrimoireCard";

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

export const getStaticProps: GetStaticProps = async (context) => {
	// const id: string = context.params ? ( (context.params.id is String[]) ? context.params.id[0] : context.params.id ) : ''
	const card = await getCardInfo(context.params?.id);
	return { props: { card } };
};
