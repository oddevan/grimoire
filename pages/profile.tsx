import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { getCurrentUserInfo, UserInfo } from "../lib/smolblog/user";
import { GrimoireCollection } from "../types/GrimoireCollection";
import dynamic from "next/dynamic";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import CollectionTable from "../components/CollectionTable";
import { getUserCollections, downloadExport } from "../lib/smolblog/collection";
import CreateCollectionModal from "../components/CreateCollectionModal";
import CSVIcon from "../components/icons/CSV";
import download from "downloadjs";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProfilePage() {
	const [collections, setCollections] = useState<GrimoireCollection[]>([]);
	const session = useSession();
	// const { smolblogAccessCode } = useSmolblog();

	// useEffect(() => {
	// 	if (!smolblogAccessCode) return;
	// 	getCurrentUserInfo(smolblogAccessCode)
	// 		.then(setUser)
	// 		.catch((error) => console.log(`Error from Smolblog: ${error}`));
	// }, [smolblogAccessCode]);

	useEffect(() => {
		refreshCollections();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	const refreshCollections = () => {
		if (!session) return;
		setCollections([]);
		getUserCollections()
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
					{session ? (
						""
					) : (
						<p style={{ textAlign: "center" }}>
							You need to log in for this to work.
						</p>
					)}

					{/* <h2>My Info</h2>

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
					</Row> */}

					<h2>My Collections</h2>

					<Accordion>
						{collections?.map((collection) => {
							if (!collection || !collection.cards) return <Fragment />;

							return (
								<Accordion.Item
									key={`collection-${collection.id}`}
									eventKey={`collection-${collection.id}`}
								>
									<Accordion.Header>{collection.name}</Accordion.Header>
									<Accordion.Body>
										{/* <p className="text-end">
											<Button
												variant="secondary"
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
										</p> */}
										{collection.cards ? (
											<CollectionTable cards={collection.cards} />
										) : (
											<Fragment />
										)}
									</Accordion.Body>
								</Accordion.Item>
							);
						})}
					</Accordion>
					{/* 
					<p className="text-end">
						<CreateCollectionModal
							smolblogAccessCode={smolblogAccessCode}
							onSuccess={refreshCollections}
						/>
					</p> */}
				</Col>
			</Row>
		</Fragment>
	);
}
