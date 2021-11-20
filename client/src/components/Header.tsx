import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import AccountIcon from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import { Toolbar } from "@mui/material";
import Stack from "@mui/material/Stack";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container>
        <Toolbar>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h5" component={"div"}>
              Добавить бриф
            </Typography>
            <IconButton color={"inherit"}>
              <AddIcon fontSize="large" />
            </IconButton>
          </Stack>
          <IconButton color={"inherit"}>
            <AccountIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
