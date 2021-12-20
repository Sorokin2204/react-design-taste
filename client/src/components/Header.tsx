import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import AccountIcon from "@mui/icons-material/AccountCircle";
import SaveIcon from "@mui/icons-material/Save";
import Container from "@mui/material/Container";
import { Box, Input, TextField, Toolbar } from "@mui/material";
import Stack from "@mui/material/Stack";

interface IHeaderProprs {
  isEditBriefPage?: boolean;
}

const Header: React.FC<IHeaderProprs> = ({ isEditBriefPage }) => {
  return (
    <AppBar position="static" sx={{ mb: 2 }} color={"primary"}>
      <Container>
        <Toolbar sx={{ justifyContent: "center" }}>
          {isEditBriefPage ? (
            <Box>
              <Input
                placeholder={"Название брифа"}
                disableUnderline={true}
                sx={{
                  fontSize: "20px",
                  color: "white",
                  input: {
                    "&::placeholder": {
                      color: "white",
                    },
                  },
                }}
              />
              <IconButton sx={{ color: "inherit" }}>
                <SaveIcon />
              </IconButton>
            </Box>
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
