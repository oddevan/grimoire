import OAuth2Login from "react-simple-oauth2-login";
import { Vault } from "@ultimate/vault";
import { useSmolblog } from "../contexts/SmolblogProvider";
import BadgeIcon from "./icons/Badge";

interface SmolblogLoginProps {
	className?: string;
}

export default function SmolblogLogin(props: SmolblogLoginProps) {
	const { setSmolblogCode } = useSmolblog();
	const redirectUri = `${window.location.protocol}//${window.location.host}/oauth?callback=true`;
	const session = new Vault({ type: "session" });

	const className = props.className ?? "btn btn-primary";

	const onSuccess = (res: any) => {
		session.set<string>("smolblogUser", res.access_token);
		setSmolblogCode(res.access_token);
	};

	return (
		<OAuth2Login
			authorizationUrl={process.env.NEXT_PUBLIC_GRIMOIRE_OAUTH_ENDPOINT ?? ""}
			responseType="token"
			clientId={process.env.NEXT_PUBLIC_GRIMOIRE_APP_ID ?? ""}
			redirectUri={redirectUri}
			onSuccess={onSuccess}
			onFailure={(res: any) => console.error(res)}
			className={className}
		>
			<BadgeIcon />
			<span className="ml-2">Login</span>
		</OAuth2Login>
	);
}
