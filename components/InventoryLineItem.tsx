import { Fragment, useState } from "react";
import { setCardQuantity } from "../lib/smolblog/collection";
import { GrimoireCard } from "../types/GrimoireCard";
import { GrimoireCollection } from "../types/GrimoireCollection";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { Row, Col } from "react-bootstrap";

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
		<Row className={className}>
			<Col sm="8" md="6" lg="8" xl="9">
				{showCard ? (
					<Fragment>
						{card.name} <code>{card.id}</code>
					</Fragment>
				) : (
					collection.name
				)}
			</Col>
			<Col sm="4" lg="2">
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
			</Col>
			<Col md="2" xl="1">
				{isBusy && <span className="text-muted">Saving...</span>}
			</Col>
		</Row>
	);
}
