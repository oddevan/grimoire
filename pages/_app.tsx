import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function GrimoireApp({ Component, pageProps }: AppProps) {
  useEffect(() => {}, []);

  return <Component {...pageProps} />;
}

export default GrimoireApp;
