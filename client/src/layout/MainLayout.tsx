import React from "react";
import Header from "../components/Header";
import { Container } from "@mui/material";

interface IMainLayoutProps {
  isEditBriefPage?: boolean;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  isEditBriefPage,
}) => {
  return (
    <>
      <Header isEditBriefPage={isEditBriefPage} />
      <Container sx={{ overflowY: "hidden" }}>{children}</Container>
    </>
  );
};
