import { useSmolblog } from "../contexts/SmolblogProvider";
import { Fragment, useEffect, useState } from "react";
import InventoryLineItem from "./InventoryLineItem";
import { GrimoireCard } from "../types/GrimoireCard";
import {
	CardCollectionLineItem,
	getUserCollectionsForCard,
} from "../lib/smolblog/card";
import { Col, Row } from "react-bootstrap";

export interface UserInventoryProps {
	card: GrimoireCard;
}

export default function UserInventory(props: UserInventoryProps) {
	const { card } = props;
	const { smolblogAccessCode } = useSmolblog();
	const [inventoryItems, setInventoryItems] = useState<
		[CardCollectionLineItem?]
	>([]);

	useEffect(() => {
		getUserCollectionsForCard(smolblogAccessCode, card.id).then((result) =>
			setInventoryItems(result ?? [])
		);
	}, [card, smolblogAccessCode]);

	if (!smolblogAccessCode && global.window) {
		return <Fragment />;
	}

	return (
		<Row className="justify-content-center">
			<Col md="8">
				<h2 className="h3">My Inventory</h2>
				{inventoryItems.map(
					(lineItem) =>
						lineItem && (
							<InventoryLineItem
								key={Math.random()}
								card={card}
								collection={lineItem.collection}
								quantity={lineItem.quantity}
							/>
						)
				)}
			</Col>
		</Row>
	);
}
