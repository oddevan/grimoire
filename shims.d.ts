import OAuth2Login from "react-simple-oauth2-login";
import { ComponentProps } from 'react'

declare module 'react-simple-oauth2-login' {
	// tslint:disable-next-line:no-empty-interface
	export interface reactSimpleOAuth2Login{}

	export type OAuth2LoginProps = ComponentProps<typeof OAuth2Login>;
}