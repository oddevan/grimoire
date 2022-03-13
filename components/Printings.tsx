import Link from "next/link";
import { Fragment } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { GrimoireCard } from "../types/GrimoireCard";
import NBLink from "./NBLink";

export interface PrintingsProps {
	printings?: [GrimoireCard];
}

export default function Printings(props: PrintingsProps) {
	const { printings } = props;

	if (!printings) return <Fragment />;

	return (
		<Card>
			<Card.Header className="h4" as="h3">
				Other printings
			</Card.Header>
			<ListGroup variant="flush">
				{printings.map((printing) => (
					<ListGroup.Item
						action
						key={printing.id}
						href={`/cards/${printing.id}`}
						as={NBLink}
					>
						{printing.name}
						{printing.setName ? (
							<Fragment>
								<br />
								<small className="text-muted">{printing.setName}</small>
							</Fragment>
						) : (
							<Fragment />
						)}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Card>
	);
}
