import { Fragment, useEffect, useState, useCallback } from "react";
import OAuth2Login from "react-simple-oauth2-login";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { getCurrentUserInfo } from "../lib/smolblog/user";
import { Vault } from "@ultimate/vault";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import NBLink from "./NBLink";
import SmolblogLogin from "./SmolblogLogin";

const User = () => {
	const { smolblogAccessCode, setSmolblogCode } = useSmolblog();
	const [user, setUser] = useState({ username: "", displayName: "" });
	const session = new Vault({ type: "session" });

	const logout = () => {
		session.remove("smolblogUser");
		setSmolblogCode("");
	};

	useEffect(() => {
		getCurrentUserInfo(smolblogAccessCode)
			.then((info) => info && setUser(info))
			.catch((error) => {
				logout();
				console.error(error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [smolblogAccessCode]);

	useEffect(() => {
		const userKey = session.get<string>("smolblogUser");
		if (!smolblogAccessCode && userKey) {
			setSmolblogCode(userKey);
		}
		// Only want this to run on first render, so no dependencies.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!smolblogAccessCode) {
		return <SmolblogLogin className="btn btn-outline-light ms-2" />;
	}

	if (user.displayName) {
		return (
			<Fragment>
				<Nav>
					<NavDropdown title={user.displayName ?? user.username}>
						<NavDropdown.Item href={`/profile`} as={NBLink}>
							My Profile
						</NavDropdown.Item>
						<NavDropdown.Item href="/batch" as={NBLink}>
							Batch Entry
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Fragment>
		);
	}

	return <Navbar.Text>Loading...</Navbar.Text>;
};

export default User;
