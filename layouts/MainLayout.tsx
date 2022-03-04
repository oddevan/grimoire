import Navbar from "../components/Navbar";
import SmolblogProvider from "../contexts/SmolblogProvider";
import { Fragment } from "react";

export default function MainLayout(props: any) {
	const { children } = props;

	return (
		<SmolblogProvider>
			<Fragment>
				<Navbar />
				<main className="container">{children}</main>
				<hr />
				<p style={{ textAlign: "center", fontSize: "0.5em" }}>
					Built by <a href="https://www.oddevan.com/">oddEvan</a> in South
					Carolina | Printing, pricing, and images from{" "}
					<a href="https://tcgplayer.com/">TCGplayer</a> | Card details from{" "}
					<a href="https://pokemontcg.io">Pok&eacute;monTCG API</a> |{" "}
					<a href="http://github.com/oddevan/grimoire">View Source</a>
					<br />
					All Pok&eacute;mon elements &trade; and &copy; The Pok&eacute;mon
					Company. This site is not affiliated with or endorsed by The
					Pok&eacute;mon Company, its affiliates or subsidiaries.
				</p>
			</Fragment>
		</SmolblogProvider>
	);
}
