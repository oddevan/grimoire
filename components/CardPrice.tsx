import { useState, Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getCardPrice } from "../lib/smolblog/card";

export default function CardPrice(params: { id: string }) {
	const [price, setPrice] = useState<number>(-1);
	const { id } = params;

	useEffect(() => {
		setPrice(-1);
		getCardPrice(id)
			.then((priceValue) => setPrice(priceValue))
			.catch((error) => console.error(error));
	}, [id]);

	if (!price || price < 0) return <Fragment />;

	return (
		<div className="d-grid gap-2">
			<Button
				variant="success"
				size="lg"
				href={`${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}card/${id}/link`}
			>
				Today&apos;s TCGplayer market price: {`\$${price}`}
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
