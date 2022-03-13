import { Fragment, useEffect, useState, useCallback } from "react";
import OAuth2Login from "react-simple-oauth2-login";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { getCurrentUserInfo } from "../lib/smolblog/user";
import { Vault } from "@ultimate/vault";
import { Nav, NavDropdown } from "react-bootstrap";
import NBLink from "./NBLink";

const User = () => {
	const { smolblogAccessCode, setSmolblogCode } = useSmolblog();
	const [user, setUser] = useState({ username: "", displayName: "" });
	const session = new Vault({ type: "session" });

	const onSuccess = (res: any) => {
		session.set<string>("smolblogUser", res.access_token);
		setSmolblogCode(res.access_token);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
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
	}, [logout, smolblogAccessCode]);

	useEffect(() => {
		const userKey = session.get<string>("smolblogUser");
		if (!smolblogAccessCode && userKey) {
			setSmolblogCode(userKey);
		}
		// Only want this to run on first render, so no dependencies.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!smolblogAccessCode) {
		const userKey = session.get<string>("smolblogUser");
		if (userKey) {
			setSmolblogCode(userKey);
			return <Fragment />;
		}

		const redirectUri = `${window.location.protocol}//${window.location.host}/oauth-callback`;

		return (
			<Fragment>
				<OAuth2Login
					authorizationUrl="https://grimoireapp.smolblog.com/oauth/authorize/"
					responseType="token"
					clientId={process.env.NEXT_PUBLIC_SMOLBLOG_APP_ID ?? ""}
					redirectUri={redirectUri}
					onSuccess={onSuccess}
					onFailure={(res: any) => console.error(res)}
					className="btn btn-outline-light ms-2"
				/>
			</Fragment>
		);
	}

	if (user.displayName) {
		return (
			<Fragment>
				<Nav>
					<NavDropdown title={user.displayName ?? user.username}>
						<NavDropdown.Item href={`/users/${user.username}`} as={NBLink}>
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

	return <Fragment />;
};

export default User;
