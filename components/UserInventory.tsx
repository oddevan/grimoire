import type { ApolloConsumer } from "@apollo/client";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { Fragment, useState } from "react";
import InventoryLineItem from "./InventoryLineItem";
import { GrimoireCard } from "../types/GrimoireCard";

export interface UserInventoryProps {
	card: GrimoireCard;
}

export default function UserInventory(props: UserInventoryProps) {
	const { card } = props;
	const { smolblogAccessCode, apolloClient } = useSmolblog();
	const [inventoryItems, setInventoryItems] = useState([]);

	if (!smolblogAccessCode && global.window) {
		return <Fragment />;
	}

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<h2 className="h3">My Inventory</h2>
				{inventoryItems.map((lineItem) => (
					<InventoryLineItem
						key={Math.random()}
						card={card}
						collection={lineItem.collection}
						quantity={lineItem.quantity}
					/>
				))}
			</div>
		</div>
	);
}
