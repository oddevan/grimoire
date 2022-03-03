import {
	ApolloClient,
	NormalizedCacheObject,
	InMemoryCache,
} from "@apollo/client";
import { createContext, Fragment, useContext, useState } from "react";

export interface SmolblogContextProps {
	smolblogAccessCode: string;
	apolloClient?: ApolloClient<NormalizedCacheObject>;

	setSmolblogCode: Function;
	logoutSmolblog: Function;
}
const SmolblogContext = createContext<SmolblogContextProps>({
	smolblogAccessCode: "",
	setSmolblogCode: () => {},
	logoutSmolblog: () => {},
});

export default function SmolblogProvider({ children = <Fragment /> }) {
	const [smolblogAccessCode, setSmolblogAccessCode] = useState("");
	const [apolloClient, setApolloClient] = useState(
		new ApolloClient({ cache: new InMemoryCache() })
	);

	const setSmolblogCode = (code: string) => {
		setSmolblogAccessCode(code);
		setApolloClient(
			new ApolloClient({
				uri: "https://grimoireapp.smolblog.com/graphql/",
				cache: new InMemoryCache(),
				headers: { Authorization: `Bearer ${code}` },
			})
		);
	};

	const logoutSmolblog = () => {
		setSmolblogAccessCode("");
		setApolloClient(new ApolloClient({ cache: new InMemoryCache() }));
	};

	return (
		<SmolblogContext.Provider
			value={{
				smolblogAccessCode,
				apolloClient,
				setSmolblogCode,
				logoutSmolblog,
			}}
		>
			{children}
		</SmolblogContext.Provider>
	);
}

export function useSmolblog() {
	const context = useContext(SmolblogContext);

	if (!context)
		throw new Error("useSmolblog must be used inside a `SmolblogProvider`");

	return context;
}
