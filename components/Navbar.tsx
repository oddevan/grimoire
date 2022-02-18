import Link from "next/link";
import SmolblogProvider from "../contexts/SmolblogProvider";
import User from "./User";

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-primary">
			<div className="container">
				<Link href="/">
					<a className="navbar-brand">Grimoire</a>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse justify-content-md-end"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link href="/catalog">
								<a className="nav-link">Catalog</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/decks">
								<a className="nav-link">Decks</a>
							</Link>
						</li>
					</ul>
					<div className="d-flex">
						<SmolblogProvider>
							<User />
						</SmolblogProvider>
					</div>
				</div>
			</div>
		</nav>
	);
}
