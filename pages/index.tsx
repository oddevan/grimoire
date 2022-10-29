import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
	const session = useSession();

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
				{session ? (
					<Link href="/profile">
						<a>Go to your profile</a>
					</Link>
				) : (
					<span />
				)}
			</p>

			<p>
				Grimoire is currently in private beta. If you would like to try it out
				and are willing to give feedback on your experience,{" "}
				<a href="https://eph.me/smolblog-beta-request">
					request a Smolblog beta account
				</a>
				.
			</p>
		</div>
	);
};

export default Home;
