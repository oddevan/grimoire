import { Fragment, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PlusIcon from "../components/icons/Plus";
import { createCollection } from "../lib/smolblog/collection";

export default function CreateCollectionModal(props: {
	smolblogAccessCode: string;
	onSuccess: VoidFunction;
}) {
	const [show, setShow] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [newColName, setNewColName] = useState("");

	const { smolblogAccessCode, onSuccess } = props;

	const onChange = (event: React.FocusEvent<HTMLInputElement>) => {
		setNewColName(event.target.value.trim());
	};

	const showModal = () => setShow(true);
	const cancelModal = () => {
		setNewColName("");
		setShow(false);
		setBusy(false);
	};
	const saveModal = () => {
		setBusy(true);
		setError("");
		createCollection(newColName, smolblogAccessCode)
			.then(() => {
				onSuccess();
				cancelModal();
			})
			.catch((error) => {
				setError(error.message);
				setBusy(false);
			});
	};

	return (
		<>
			<Button variant="primary" className="mt-3" onClick={showModal}>
				<PlusIcon /> Add Collection
			</Button>
			<Modal show={show} onHide={cancelModal}>
				<Modal.Header closeButton>
					<Modal.Title>Add new collection</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Label htmlFor="newCollectionName">Name</Form.Label>
					<Form.Control
						type="text"
						id="newCollectionName"
						aria-describedby="nameHelpBlock"
						disabled={busy}
						isInvalid={!!error}
						onChange={onChange}
					/>
					<Form.Text id="nameHelpBlock" muted>
						Choose a name that you have not already used for a collection.
					</Form.Text>
					<Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={cancelModal} disabled={busy}>
						Cancel
					</Button>
					<Button variant="primary" onClick={saveModal} disabled={busy}>
						Create Collection
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
