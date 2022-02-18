import {
	createContext,
	Dispatch,
	Fragment,
	SetStateAction,
	useContext,
	useState,
} from "react";

export interface SmolblogContextProps {
	smolblogAccessCode: string;
	setSmolblogAccessCode: Dispatch<SetStateAction<string>>;
}
const SmolblogContext = createContext<SmolblogContextProps>({
	smolblogAccessCode: "",
	setSmolblogAccessCode: () => {},
});

export default function SmolblogProvider({ children = <Fragment /> }) {
	const [smolblogAccessCode, setSmolblogAccessCode] = useState("");

	return (
		<SmolblogContext.Provider
			value={{
				smolblogAccessCode,
				setSmolblogAccessCode,
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
