import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import MainLayout from "../layouts/MainLayout";

function GrimoireApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default GrimoireApp;
