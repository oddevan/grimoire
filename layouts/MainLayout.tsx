import Navbar from "../components/Navbar";
import SmolblogProvider from "../contexts/SmolblogProvider";

export default function MainLayout(props: any) {
	const { children } = props;

	return (
		<SmolblogProvider>
			<Navbar />
			<main className="container">{children}</main>
		</SmolblogProvider>
	);
}
