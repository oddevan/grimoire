import { Button } from "react-bootstrap";
import { GrimoireCard } from "../types/GrimoireCard";

export default function CardPrice(params: { card: GrimoireCard }) {
	const { id, price } = params.card;

	return (
		<div className="d-grid gap-2">
			<Button variant="success" size="lg" href={`/api/card/${id}/buy-tcgp`}>
				{price && price > 0
					? `Today's TCGplayer market price: \$${price}`
					: "Buy on TCGplayer"}
			</Button>
			<p
				className="text-muted text-end"
				style={{ fontSize: ".8em", marginTop: "0px" }}
			>
				Affiliate link: oddEvan may get a comission
			</p>
		</div>
	);
}
