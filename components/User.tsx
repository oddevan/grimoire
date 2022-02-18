import { useState } from "react";
import OAuth2Login from "react-simple-oauth2-login";
import { useSmolblog } from "../contexts/SmolblogProvider";

const User = () => {
	const { smolblogAccessCode, setSmolblogAccessCode } = useSmolblog();

	const onSuccess = (res: any) => {
		setSmolblogAccessCode(res.access_token);
	};

	if (smolblogAccessCode) {
		return <span className="navbar-text">Logged in as [TBD]</span>;
	}

	return (
		<OAuth2Login
			authorizationUrl="https://smolblog.com/oauth/authorize/"
			responseType="token"
			clientId={process.env.NEXT_PUBLIC_SMOLBLOG_APP_ID ?? ""}
			redirectUri="https://grimoire.oddevan.com/oauth-callback"
			onSuccess={onSuccess}
			onFailure={(res: any) => console.error(res)}
			className="btn btn-outline-light"
		/>
	);
};

export default User;
