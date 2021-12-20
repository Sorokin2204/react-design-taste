import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import BriefItem from "./BriefItem";
import { MainLayout } from "../../layout/MainLayout";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { BriefAllRequestAction } from "../../redux/briefs/briefList.reducer";

interface IBriefAllProps {}

export const BriefAll: React.FC<IBriefAllProps> = ({}) => {
  interface IBrief {
    id: string;
    title: string;
    countSteps: number;
    countPassed: number;
    slug: string;
  }

  const briefSelector = useTypedSelector((state) => state.briefAllReducer);
  const { idActiveBrief } = useTypedSelector((state) => state.passedAllReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(BriefAllRequestAction());
  }, []);

  return (
    <>
      <Grid container spacing={3} direction="row">
        {briefSelector.isLoading ? (
          <CircularProgress
            size={40}
            status={"loading"}
            style={{ marginLeft: "50%", left: -20, top: 10 }}
          />
        ) : briefSelector.error ? (
          <div>Error - {briefSelector.error}</div>
        ) : (
          briefSelector.briefAll?.map((brief) => (
            <React.Fragment key={brief.id}>
              <BriefItem
                brief={brief}
                isActive={idActiveBrief === brief.id ? true : false}
              />
            </React.Fragment>
          ))
        )}
      </Grid>
    </>
  );
};
