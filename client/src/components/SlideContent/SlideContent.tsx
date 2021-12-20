import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Grid } from "@mui/material";
import { SlideAddNew } from "./SlideAddNew";
import { TaskEdit } from "./TaskEdit";

interface ISlideContentProps {}

export const SlideContent: React.FC<ISlideContentProps> = ({}) => {
  const { selectedTaskId, selectedSlideId, BriefSingle } = useTypedSelector(
    (state) => state.briefSingleReducer
  );

  const selectedTask = BriefSingle?.tasks.find(
    (task) => task.id === selectedTaskId
  );
  return (
    <Grid item xs={9}>
      {selectedTaskId ? <TaskEdit task={selectedTask} /> : <SlideAddNew />}
    </Grid>
  );
};
