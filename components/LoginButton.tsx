import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

export default function LoginButton() {
	const supabase = useSupabaseClient();

	const popover = (
		<Popover id="supabase-login-form">
			<Popover.Header>Login</Popover.Header>
			<Popover.Body>
				<Auth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					providers={["apple", "discord"]}
					theme="default"
				/>
			</Popover.Body>
		</Popover>
	);

	return (
		<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
			<Button variant="outline-light">Login</Button>
		</OverlayTrigger>
	);
}
