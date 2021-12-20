import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { rootStore } from "../redux/root.store";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@mui/material/styles";
import { theme } from "../theme";
import "../style.scss";
// const theme = unstable_createMuiStrictModeTheme();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={rootStore}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}
