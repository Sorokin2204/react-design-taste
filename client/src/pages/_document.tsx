import React from "react";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html>
      <Head />
      <CssBaseline />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
