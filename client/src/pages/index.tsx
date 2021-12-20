import React, { useEffect, useRef } from "react";
import { MainLayout } from "../layout/MainLayout";
import Router from "next/router";

export default function Home() {
  useEffect(() => {
    Router.push("/briefs/qwer");
  }, []);

  return (
    <>
      <h1>qwer</h1>
    </>
  );
}
