import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { getCurrentUserInfo, UserInfo } from "../lib/smolblog/user";
import {
	GrimoireCollection,
	GrimoireCollectionEntry,
} from "../types/GrimoireCollection";
import dynamic from "next/dynamic";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import CollectionTable from "../components/CollectionTable";
import { getUserCollections, downloadExport } from "../lib/smolblog/collection";
import CreateCollectionModal from "../components/CreateCollectionModal";
import CSVIcon from "../components/icons/CSV";
import download from "downloadjs";

const LoginDynamic = dynamic(() => import("../components/SmolblogLogin"), {
	ssr: false,
});

export default function ProfilePage() {
	const [collections, setCollections] = useState<[GrimoireCollection?]>([]);
	const [user, setUser] = useState<UserInfo | undefined>(undefined);
	const { smolblogAccessCode } = useSmolblog();

	useEffect(() => {
		if (!smolblogAccessCode) return;
		getCurrentUserInfo(smolblogAccessCode)
			.then(setUser)
			.catch((error) => console.log(`Error from Smolblog: ${error}`));
	}, [smolblogAccessCode]);

	useEffect(() => {
		refreshCollections();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const refreshCollections = () => {
		if (!user) return;
		setCollections([]);
		getUserCollections(smolblogAccessCode)
			.then(setCollections)
			.catch((error) => console.log(`Error from Smolblog: ${error}`));
	};

	return (
		<Fragment>
			<Head>
				<title>Profile - Grimoire</title>
			</Head>
			<h1>Profile Page</h1>

			<Row className="justify-content-center">
				<Col xl="10" xxl="9">
					{smolblogAccessCode ? (
						""
					) : (
						<p style={{ textAlign: "center" }}>
							You need to log in for this to work.
							<br />
							<LoginDynamic />
						</p>
					)}

					<h2>My Info</h2>

					<Row as={"dl"}>
						<Col sm="6" lg="3" as={"dt"}>
							Name:
						</Col>
						<Col sm="6" lg="3" as={"dd"}>
							{user?.displayName}
						</Col>
						<Col sm="6" lg="3" as={"dt"}>
							Username:
						</Col>
						<Col sm="6" lg="3" as={"dd"}>
							{user?.username}
						</Col>
					</Row>

					<h2>My Collections</h2>

					<Accordion>
						{collections?.map((collection) => {
							if (!collection || !collection.cards) return <Fragment />;

							// via https://www.benmvp.com/blog/filtering-undefined-elements-from-array-typescript/
							const filteredCards = collection.cards.filter(
								(card): card is GrimoireCollectionEntry => !!card
							);

							return (
								<Accordion.Item
									key={`collection-${collection.id}`}
									eventKey={`collection-${collection.id}`}
								>
									<Accordion.Header>{collection.name}</Accordion.Header>
									<Accordion.Body>
										<p className="text-end">
											<Button
												variant="secondary"
												// href={`${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}collection/${collection.id}/export`}
												onClick={async () => {
													const csvData = await downloadExport(
														collection.id,
														smolblogAccessCode
													);
													download(
														csvData,
														`${collection.name}.csv`,
														"text/csv"
													);
												}}
											>
												<CSVIcon />
												Download CSV of {collection.name}
											</Button>
										</p>
										{collection.cards ? (
											<CollectionTable cards={filteredCards} />
										) : (
											<Fragment />
										)}
									</Accordion.Body>
								</Accordion.Item>
							);
						})}
					</Accordion>

					<p className="text-end">
						<CreateCollectionModal
							smolblogAccessCode={smolblogAccessCode}
							onSuccess={refreshCollections}
						/>
					</p>
				</Col>
			</Row>
		</Fragment>
	);
}
