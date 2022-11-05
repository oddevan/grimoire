import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getCardPrice } from "../lib/smolblog/card";
import { GrimoireCard } from "../types/GrimoireCard";

export default function CardPrice(params: { card: GrimoireCard }) {
	const { id } = params.card;
	const [price, setPrice] = useState<string | null>(null);

	useEffect(() => {
		setPrice(null);
		getCardPrice(id)
			.then((priceValue) => setPrice(priceValue))
			.catch((error) => console.error(error));
	}, [id]);

	return (
		<div className="d-grid gap-2">
			<Button
				aria-describedby="affiliate-info-text"
				variant="success"
				size="lg"
				href={`/api/card/${id}/buy-tcgp`}
			>
				{price
					? `Today's TCGplayer market price: ${price}`
					: "Buy on TCGplayer"}
			</Button>
			<p
				id="affiliate-info-text"
				className="text-muted text-end"
				style={{ fontSize: ".8em", marginTop: "0px" }}
			>
				Affiliate link: oddEvan may get a comission
			</p>
		</div>
	);
}
