import dynamic from "next/dynamic";
import { Container, Nav, Navbar } from "react-bootstrap";
import NBLink from "./NBLink";

const UserDynamic = dynamic(() => import("./User"), { ssr: false });

export default function GrimoireNavbar() {
	return (
		<Navbar variant="dark" bg="primary" expand="md">
			<Container>
				<Navbar.Brand href="/" as={NBLink}>
					Grimoire
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-mobile-collapse" />
				<Navbar.Collapse id="navbar-mobile-collapse">
					<Nav className="me-auto">
						<Nav.Link href="/cards" as={NBLink}>
							Catalog
						</Nav.Link>
					</Nav>
					<UserDynamic />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
