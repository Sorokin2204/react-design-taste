import React, { useEffect } from "react";
import BriefListItem from "./BriefListItem";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getUserAction } from "../store/reducers/userReducer";
import Button from "@mui/material/Button";

const BriefList: React.FC = () => {
  const { users, loading } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {});
  return (
    <Grid container spacing={3} direction="row">
      <button
        onClick={() => {
          dispatch(getUserAction());
        }}
      >
        Load
      </button>
      {loading ? (
        <span>Загрузка...</span>
      ) : (
        users?.map((user) => (
          // @ts-ignore
          <div>{user.name}</div>
        ))
      )}
      <BriefListItem />
      <BriefListItem />
      <BriefListItem />
      <BriefListItem />
      <BriefListItem />
    </Grid>
  );
};

export default BriefList;
