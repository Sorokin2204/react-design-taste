import React from "react";
import Drawer from "@mui/material/Drawer";

import { MainLayout } from "../layout/MainLayout";
import { useTypedSelector } from "../hooks/useTypedSelector";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { CircularProgress } from "@mui/material";
import moment from "moment";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { PassedCloseAction } from "../redux/passed/passed.reducer";
interface IPassedDrawerProps {}

export const PassedDrawer: React.FC<IPassedDrawerProps> = ({}) => {
  const passedSelector = useTypedSelector((state) => state.passedAllReducer);
  const dispatch = useDispatch();

  const closeDrawerHandle = () => {
    dispatch(PassedCloseAction());
  };

  return (
    <>
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
        open={passedSelector.isOpenDrawer}
      >
        <IconButton
          color={"primary"}
          sx={{ maxWidth: "40px" }}
          onClick={closeDrawerHandle}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        {passedSelector.isLoading ? (
          <CircularProgress
            size={40}
            status={"loading"}
            style={{ marginLeft: "50%", left: -20, top: 10 }}
          />
        ) : (
          <List>
            {passedSelector.passedAll.map((passedItem) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={passedItem.image}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={passedItem.fullName}
                  secondary={moment(new Date()).format("MMM DD HH:mm")}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
    </>
  );
};
