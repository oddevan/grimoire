import { createContext, Fragment, useContext, useState } from "react";

export interface SmolblogContextProps {
	smolblogAccessCode: string;

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

	const setSmolblogCode = (code: string) => {
		setSmolblogAccessCode(code);
	};

	const logoutSmolblog = () => {
		setSmolblogAccessCode("");
	};

	return (
		<SmolblogContext.Provider
			value={{
				smolblogAccessCode,
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
