import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";

function GrimoireApp({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</SSRProvider>
	);
}

export default GrimoireApp;
