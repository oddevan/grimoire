declare module 'react-simple-oauth2-login' {
	interface OAuth2Props {
		id?: string,
		authorizationUrl: string,
		clientId: string,
		redirectUri: string,
		responseType: string,
		onSuccess: func,
		onFailure: func,
		buttonText?: string,
		children?: node,
		popupWidth?: number,
		popupHeight?: number,
		className?: string,
		render?: func,
		isCrossOrigin?: bool,
		onRequest?: func,
		scope?: string,
		state?: string,
		extraParams?: object,
	}

	interface OAuth2Login extends React.ComponentClass<OAuth2Props, any> {
	}

	const OAuth2Login: OAuth2Login;

	export = OAuth2Login;
}