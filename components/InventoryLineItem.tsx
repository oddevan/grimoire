import { useState } from "react";
import { setCardQuantity } from "../lib/smolblog/collection";
import { GrimoireCard } from "../types/GrimoireCard";
import { GrimoireCollection } from "../types/GrimoireCollection";
import { useSmolblog } from "../contexts/SmolblogProvider";

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
	const [fieldValue, setFieldValue] = useState(props.quantity);
	const [isBusy, setBusy] = useState(false);
	const { smolblogAccessCode } = useSmolblog();

	const onChange = (event: React.FocusEvent<HTMLInputElement>) => {
		setFieldValue(parseInt(event.target.value));
	};

	const onBlur = () => {
		if (fieldValue == quantity) return;

		setBusy(true);
		setCardQuantity(card.id, collection.id, fieldValue, smolblogAccessCode)
			.then((result) => {
				setQuantity(result.quantity);
				setBusy(false);
			})
			.catch((error) => {
				console.log({ error });
			});
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
					value={fieldValue}
					onChange={onChange}
					onBlur={onBlur}
					disabled={isBusy}
				/>
			</div>
			<div className="col-auto">
				{isBusy && <span className="text-muted">Saving...</span>}
			</div>
		</div>
	);
}
