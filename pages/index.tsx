import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { useEffect, useState } from "react";

const LoginDynamic = dynamic(() => import("../components/SmolblogLogin"), {
	ssr: false,
});

const Home: NextPage = () => {
	const [showLogin, setShowLogin] = useState(false);
	const { smolblogAccessCode } = useSmolblog();

	useEffect(() => {
		setShowLogin(!smolblogAccessCode);
	}, [smolblogAccessCode]);

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
			<p style={{ textAlign: "center" }}>
				{showLogin ? (
					<LoginDynamic />
				) : (
					<Link href="/profile">
						<a>Go to your profile</a>
					</Link>
				)}
			</p>
		</div>
	);
};

export default Home
