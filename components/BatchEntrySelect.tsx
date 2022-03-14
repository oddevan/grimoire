import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { getUserCollections } from "../lib/smolblog/collection";
import { GrimoireCollection } from "../types/GrimoireCollection";

export default function BatchEntrySelect(props: { setCollection: Function }) {
	const { smolblogAccessCode } = useSmolblog();
	const [collections, setCollections] = useState<[GrimoireCollection?]>([]);
	const [busy, setBusy] = useState(false);

	useEffect(() => {
		setBusy(true);
		getUserCollections(smolblogAccessCode)
			.then((collections) => {
				setCollections(collections);
				setBusy(false);
			})
			.catch((error) => console.log(error));
	}, [smolblogAccessCode]);

	if (!smolblogAccessCode) {
		return (
			<Form.Select
				className="my-4"
				aria-label="Log in to select a collection"
				disabled
			>
				<option>Log in to select a collection</option>
			</Form.Select>
		);
	}

	if (!busy) {
		<Form.Select className="my-4" aria-label="Select a collection">
			<option>Select a collection</option>
			{collections.map((collection) => {
				if (!collection) return;
				return (
					<option key={`col-option-${collection.id}`} value={collection.id}>
						{collection.name}
					</option>
				);
			})}
		</Form.Select>;
	}

	return (
		<Form.Select className="my-4" aria-label="Loading collections" disabled>
			<option>Loading collections...</option>
		</Form.Select>
	);
}
