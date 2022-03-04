import { useState } from "react";
import { GrimoireCard } from "../types/GrimoireCard";
import { GrimoireCollection } from "../types/GrimoireCollection";

export interface InventoryLineItemProps {
	card: GrimoireCard;
	collection: GrimoireCollection;
	quantity: number;
	className?: string;
	showCard?: boolean;
}

export default function InventoryLineItem(props: InventoryLineItemProps) {
	const { card, collection, className, showCard } = props;
	const [quantity, setQuantity] = useState(props.quantity);

	const onChange = (event: React.FocusEvent<HTMLInputElement>) => {
		setQuantity(parseInt(event.target.value));
	};

	return (
		<div className={`row ${className}`}>
			<div className="col-auto">{showCard ? card.name : collection.name}</div>
			<div className="col-auto">
				<label
					htmlFor={`${card}-${collection}-quantity`}
					className="visually-hidden"
				>
					Quantity
				</label>
				<input
					type="number"
					className="form-control"
					id={`${card}-${collection}-quantity`}
					value={quantity}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}
