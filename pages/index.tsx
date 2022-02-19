import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import SmolblogProvider from "../contexts/SmolblogProvider";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Grimoire</title>
				<meta name="description" content="A TCG management app by oddEvan" />
			</Head>
			<h1>Grimoire</h1>
			<p>
				A TCG management app by{" "}
				<Link href={"https://www.oddevan.com/"}>
					<a>oddEvan</a>
				</Link>
				.
			</p>
		</div>
	);
};

export default Home
