import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ITask } from "../../redux/brief/briefItem.type";

import styles from "./SlideItem.module.scss";

import WebIcon from "@mui/icons-material/Web";
import useHover from "../../hooks/useHover";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { BriefSingleTaskSelect } from "../../redux/brief/briefItem.reducer";
interface ISlideItemProps {
  image: string;
  countSlide: number;
  countTask: number;
  numberSlide: number;
  isOtherSlide: boolean;
  taskId: string;
  slideId: string;
  handlerMouseEnter(): void;
  handlerMouseLeave(): void;
  transformY: number;
}

export const SlideItem: React.FC<ISlideItemProps> = ({
  image,
  countSlide,
  numberSlide,
  isOtherSlide,
  countTask,
  handlerMouseEnter,
  handlerMouseLeave,
  taskId,
  slideId,
  transformY,
}) => {
  const { selectedTaskId, selectedSlideId } = useTypedSelector(
    (state) => state.briefSingleReducer
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const handlerClick = () => {
    dispatch(
      BriefSingleTaskSelect({
        selectedTaskId: taskId,
        selectedSlideId: slideId,
      })
    );
  };

  return (
    <div
      className={`${styles.slide} ${
        isOtherSlide ? styles.slideOther : styles.slideMain
      } slideOther`}
      style={
        isOtherSlide
          ? {
              transform: `translate(calc(${countSlide * 100}% + ${
                countSlide * 18
              }px),${transformY}px)`,
            }
          : {}
      }
      onMouseEnter={handlerMouseEnter}
      onMouseLeave={handlerMouseLeave}
      onClick={handlerClick}
    >
      <img className={styles.slideImg} src={image} alt="" />

      {!isOtherSlide ? (
        <Stack
          className={styles.slideHead}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography
            className={styles.slideCount}
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            {countTask}
          </Typography>
          <IconButton
            className={styles.slideBtn}
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Typography className={styles.slideBtnCount}>
              {numberSlide}
            </Typography>
            <WebIcon fontSize={"medium"} />
          </IconButton>
        </Stack>
      ) : (
        ""
      )}
    </div>
  );
};
