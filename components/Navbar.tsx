import dynamic from "next/dynamic";
import { Container, Nav, Navbar } from "react-bootstrap";
import NBLink from "./NBLink";
import GrimoireLogo from "./icons/Grimoire";
import LoginButton from "./LoginButton";

const UserDynamic = dynamic(() => import("./User"), { ssr: false });

export default function GrimoireNavbar() {
	return (
		<Navbar variant="dark" bg="primary" expand="md">
			<Container>
				<Navbar.Brand href="/" as={NBLink}>
					<GrimoireLogo />
					Grimoire
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-mobile-collapse" />
				<Navbar.Collapse id="navbar-mobile-collapse">
					<Nav className="me-auto">
						<Nav.Link href="/sets" as={NBLink}>
							Catalog
						</Nav.Link>
					</Nav>
					{/* <UserDynamic /> */}
					<LoginButton />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
