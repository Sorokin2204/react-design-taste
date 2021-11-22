import React, { useEffect } from "react";
import BriefListItem from "./BriefListItem";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BriefAllRequestAction } from "../store/reducers/brief-reducer";
import axios from "axios";

const BriefList: React.FC = () => {
  const { briefAll, isLoading, error } = useTypedSelector(
    (state) => state.briefAllReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {});
  return (
    <Grid container spacing={3} direction="row">
      <button
        onClick={async () => {
          dispatch(BriefAllRequestAction());
        }}
      >
        Load
      </button>
      {isLoading ? (
        <span>Загрузка...</span>
      ) : error ? (
        <div>Error - {error}</div>
      ) : (
        briefAll?.map((brief) => (
          // @ts-ignore
          <div>{brief.title}</div>
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
