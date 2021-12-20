import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./SlideAll.module.scss";
import { SlideItem } from "./SlideItem";
import { ITask } from "../../redux/brief/briefItem.type";
import { Tooltip, Typography } from "@mui/material";

interface ITaskItemProps {
  task: ITask;
  countTask: number;
  scrollTop: number;
}

export const TaskItem: React.FC<ITaskItemProps> = ({
  task,
  countTask,
  scrollTop,
}) => {
  const [isHoverOtherSlides, setIsHoverOtherSlides] = useState(false);

  const handlerMouseEnter = (): void => {
    setIsHoverOtherSlides(true);
  };
  const handlerMouseLeave = (): void => {
    setIsHoverOtherSlides(false);
  };

  const inputRef = useRef<HTMLDivElement>();
  const [scrollTransformY, setScrollTransformY] = useState<number>(0);

  useEffect(() => {
    setScrollTransformY(inputRef!.current!.getBoundingClientRect().top - 56);
  }, [scrollTop]);
  const handlerLoad = () => {
    setScrollTransformY(inputRef!.current!.getBoundingClientRect().top - 56);
  };
  return (
    <>
      <Tooltip
        placement={"top"}
        title={<Typography>{task.question}</Typography>}
        sx={{
          "& .MuiTooltip-tooltip": {
            backgroundColor: "#fff",
          },
        }}
      >
        <div
          className={`${styles.slideList} ${
            isHoverOtherSlides ? styles.slideHover : ""
          }`}
          ref={inputRef}
          onLoad={handlerLoad}
        >
          {task.slides.map((slide, index) => (
            <SlideItem
              image={slide.thumbnailImage}
              countTask={++countTask}
              countSlide={index}
              isOtherSlide={!!index}
              numberSlide={task.slides.length}
              handlerMouseEnter={handlerMouseEnter}
              handlerMouseLeave={handlerMouseLeave}
              taskId={task.id}
              slideId={slide.id}
              transformY={scrollTransformY}
            />
          ))}
        </div>
      </Tooltip>
    </>
  );
};
