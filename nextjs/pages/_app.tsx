import { AppProps } from "next/app";
import "../styles/globals.css";
import { trpc } from "@/utils/trpc";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider adapter={NextAdapter}>
      <Component {...pageProps} />
    </QueryParamProvider>
  );
}

export default trpc.withTRPC(MyApp);
