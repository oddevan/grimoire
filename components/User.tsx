import { ApolloConsumer } from "@apollo/client";
import { useState } from "react";
import OAuth2Login from "react-simple-oauth2-login";
import { useSmolblog } from "../contexts/SmolblogProvider";
import { getCurrentUserInfo, UserInfo } from "../lib/smolblog/user";

const User = () => {
	const { smolblogAccessCode, setSmolblogCode, apolloClient } = useSmolblog();
	const [user, setUser] = useState({ username: "", displayName: "" });

	const onSuccess = (res: any) => {
		setSmolblogCode(res.access_token);
	};

	if (!smolblogAccessCode) {
		return (
			<OAuth2Login
				authorizationUrl="https://grimoireapp.smolblog.com/oauth/authorize/"
				responseType="token"
				clientId={process.env.NEXT_PUBLIC_SMOLBLOG_APP_ID ?? ""}
				redirectUri={`${
					process.env.NEXT_PUBLIC_VERCEL_URL ?? ""
				}/oauth-callback`}
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

	getCurrentUserInfo(apolloClient)
		.then((info) => info && setUser(info))
		.catch((error) => console.error(error));

	return <span className="navbar-text">Loading...</span>;
};

export default User;
