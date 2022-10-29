import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { SSRProvider } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";

function GrimoireApp({
	Component,
	pageProps,
}: AppProps<{ initialSession: Session }>) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	return (
		<SessionContextProvider
			initialSession={pageProps.initialSession}
			supabaseClient={supabaseClient}
		>
			<SSRProvider>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</SSRProvider>
		</SessionContextProvider>
	);
}

export default GrimoireApp;
