import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { GrimoireCollection } from "../types/GrimoireCollection";

export default function BatchEntrySelect(props: { setCollection: Function }) {
	const { smolblogAccessCode } = useSmolblog();
	const [collections, setCollections] = useState<[GrimoireCollection?]>([]);

	useEffect(() => {
		// get collections from Smolblog
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

	return (
		<Form.Select className="my-4" aria-label="Loading collections" disabled>
			<option>Loading collections...</option>
		</Form.Select>
	);
}
