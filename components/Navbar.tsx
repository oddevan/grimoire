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
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-md-end">
					<Nav>
						<Nav.Link href="/cards" as={NBLink}>
							Catalog
						</Nav.Link>
					</Nav>
					<div className="d-flex">
						<UserDynamic />
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
