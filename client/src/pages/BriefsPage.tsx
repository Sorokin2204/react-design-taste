import React, { useState } from "react";

import Header from "../components/Header";
import BriefListItem from "../components/BriefListItem";
import BriefList from "../components/BriefList";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
const BriefsPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const DrawerToggleHandle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header />
      <Container>
        <BriefList />
      </Container>

      <Button onClick={DrawerToggleHandle}>Open Drawer</Button>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Button onClick={DrawerToggleHandle}>Toggle</Button>
        <p>12345</p>
      </Drawer>
    </>
  );
};

export default BriefsPage;
