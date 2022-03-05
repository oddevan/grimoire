import { Fragment, useState } from "react";
import OAuth2Login from "react-simple-oauth2-login";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { getCurrentUserInfo } from "../lib/smolblog/user";
import { Vault } from "@ultimate/vault";

const User = () => {
	const { smolblogAccessCode, setSmolblogCode } = useSmolblog();
	const [user, setUser] = useState({ username: "", displayName: "" });
	const session = new Vault({ type: "session" });

	const onSuccess = (res: any) => {
		session.set<string>("smolblogUser", res.access_token);
		setSmolblogCode(res.access_token);
	};

	if (!smolblogAccessCode) {
		const userKey = session.get<string>("smolblogUser");
		if (userKey) {
			setSmolblogCode(userKey);
			return <Fragment />;
		}

		const redirectUri = `${window.location.protocol}//${window.location.host}/oauth-callback`;

		return (
			<OAuth2Login
				authorizationUrl="https://grimoireapp.smolblog.com/oauth/authorize/"
				responseType="token"
				clientId={process.env.NEXT_PUBLIC_SMOLBLOG_APP_ID ?? ""}
				redirectUri={redirectUri}
				onSuccess={onSuccess}
				onFailure={(res: any) => console.error(res)}
				className="btn btn-outline-light"
			/>
		);
	}

	if (user.displayName) {
		return (
			<span className="navbar-text">Logged in as {user.displayName ?? ""}</span>
		);
	}

	getCurrentUserInfo(smolblogAccessCode)
		.then((info) => info && setUser(info))
		.catch((error) => console.error(error));

	return <Fragment />;
};

export default User;
