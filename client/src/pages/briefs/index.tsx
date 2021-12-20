import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { PassedDrawer } from "../../components/PassedDrawer";
import { BriefAll } from "../../components/Brief/BriefAll";

export default function Briefs() {
  return (
    <>
      <MainLayout>
        <BriefAll />
        <PassedDrawer />
      </MainLayout>
    </>
  );
}
