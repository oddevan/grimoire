import type { ApolloConsumer } from "@apollo/client";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { Fragment, useState } from "react";

export interface UserInventoryProps {
	cardId: string;
}

export default function UserInventory(props: UserInventoryProps) {
	const { cardId } = props;
	const { smolblogAccessCode, apolloClient } = useSmolblog();
	const [ inventoryItems, setInventoryItems ] = useState([]);

	if (!smolblogAccessCode && global.window) {
		return <Fragment />;
	}

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<h2 className="h3">My Inventory</h2>
			</div>
		</div>
	);
}
