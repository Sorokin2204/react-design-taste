import React, { useEffect, useRef, useState } from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { BriefSingleRequestAction } from "../../redux/brief/briefItem.reducer";
import { SlideItem } from "./SlideItem";
import styles from "./SlideAll.module.scss";
import useHover from "../../hooks/useHover";
import { TaskItem } from "./TaskItem";
import useRealTimers = jest.useRealTimers;

interface ISlideAllProps {}

export const SlideAll: React.FC<ISlideAllProps> = ({}) => {
  const dispatch = useDispatch();
  const { BriefSingle, isLoading, error } = useTypedSelector(
    (state) => state.briefSingleReducer
  );
  const allListRef = useRef<HTMLElement>();
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    dispatch(BriefSingleRequestAction());
  }, []);

  const handleScroll = () => {
    setScrollTop(allListRef!.current!.scrollTop);
  };
  return (
    <Grid
      sx={{
        maxHeight: "92vh",
      }}
      item
      xs={3}
      style={{
        position: "relative",
      }}
    >
      <Stack
        direction={"column"}
        spacing={2}
        style={{
          minHeight: "92vh",
          height: "92vh",
          // position: "absolute",
          overflowY: "scroll",
          // width: "96vw",
        }}
        onScroll={handleScroll}
        ref={allListRef}
      >
        {isLoading
          ? Array.from(new Array(4)).map(() => (
              <Skeleton
                animation="wave"
                height={"200px"}
                variant="rectangular"
                style={{ borderRadius: "10px" }}
                sx={{ maxWidth: "270px" }}
              />
            ))
          : BriefSingle?.tasks.map((task, countTask) => (
              <TaskItem
                task={task}
                countTask={countTask}
                scrollTop={scrollTop}
              />
            ))}
      </Stack>
    </Grid>
  );
};
