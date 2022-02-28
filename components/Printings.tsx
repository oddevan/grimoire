import Link from "next/link";
import { Fragment } from "react";
import { GrimoireCard } from "../types/GrimoireCard";

export interface PrintingsProps {
	printings?: [GrimoireCard];
}

export default function Printings(props: PrintingsProps) {
	const { printings } = props;

	if (!printings) return <Fragment />;

	return (
		<div className="card">
			<h3 className="card-header h4">Other printings</h3>
			<div className="list-group-flush">
				{printings.map((printing) => (
					<Link key={printing.id} href={`/cards/${printing.id}`}>
						<a className="list-group-item list-group-item-action">
							{printing.name}
							{printing.setName ? (
								<Fragment>
									<br />
									<small className="text-muted">{printing.setName}</small>
								</Fragment>
							) : (
								<Fragment />
							)}
						</a>
					</Link>
				))}
			</div>
		</div>
	);
}
