import Link from "next/link";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

export function MainLayout(props: any) {
  const { children } = props;
  return (
    <>
      <Navbar expand="md">
        <div className="container">
          <NavbarBrand>Grimoire</NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <Nav>
              <NavItem>
                <NavLink href="/catalog">Catalog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/decks">Decks</NavLink>
              </NavItem>
            </Nav>
          </NavbarCollapse>
        </div>
      </Navbar>
      <main className="container">{children}</main>
    </>
  );
}
