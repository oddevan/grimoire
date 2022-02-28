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
			</Fragment>
		</SmolblogProvider>
	);
}
