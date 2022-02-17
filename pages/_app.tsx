import '../styles/globals.css'
import type { AppProps } from "next/app";

function GrimoireApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default GrimoireApp
