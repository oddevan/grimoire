import Navbar from "../components/Navbar";

export default function MainLayout(props: any) {
	const { children } = props;

	return (
		<>
			<Navbar />
			<main className="container">{children}</main>
		</>
	);
}
