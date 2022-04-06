import { useState, Fragment, useEffect } from "react";
import { Alert } from "react-bootstrap";
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
		<Alert variant="success">Today&apos;s market price: {`\$${price}`}</Alert>
	);
}
