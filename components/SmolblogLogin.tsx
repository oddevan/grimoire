import OAuth2Login from "react-simple-oauth2-login";
import { Vault } from "@ultimate/vault";
import { useSmolblog } from "../contexts/SmolblogProvider";

interface SmolblogLoginProps {
	className?: string;
}

export default function SmolblogLogin(props: SmolblogLoginProps) {
	const { setSmolblogCode } = useSmolblog();
	const redirectUri = `${window.location.protocol}//${window.location.host}/oauth-callback`;
	const session = new Vault({ type: "session" });

	const onSuccess = (res: any) => {
		session.set<string>("smolblogUser", res.access_token);
		setSmolblogCode(res.access_token);
	};

	return (
		<OAuth2Login
			authorizationUrl={
				process.env.NEXT_PUBLIC_SMOLBLOG_OAUTH_ENDPOINT ??
				"https://grimoireapp.smolblog.com/oauth/authorize/"
			}
			responseType="token"
			clientId={process.env.NEXT_PUBLIC_SMOLBLOG_APP_ID ?? ""}
			redirectUri={redirectUri}
			onSuccess={onSuccess}
			onFailure={(res: any) => console.error(res)}
			className={props.className}
		/>
	);
}
