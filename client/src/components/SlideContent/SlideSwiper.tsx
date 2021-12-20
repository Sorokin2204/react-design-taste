import React, { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ISlide, ITask } from "../../redux/brief/briefItem.type";
import styles from "./SlideSwiper.module.scss";

import {
  Button,
  IconButton,
  styled,
  Tooltip,
  TooltipProps,
  Typography,
  useTheme,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LeftIcon from "@mui/icons-material/ChevronLeft";
import RightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import {
  BriefSingleTaskSelect,
  BriefSingleTaskUpdateLocalAction,
} from "../../redux/brief/briefItem.reducer";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { red } from "@mui/material/colors";
import { SlideEdit } from "./SlideEdit";

interface ISlideSwiperProps {
  task: ITask;
  updateTask(): void;
  setTaskUpdated: (arg: any) => ITask;
  taskUpdated: ITask;
}
SwiperCore.use([Pagination, Navigation]);

const DeleteTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

export const SlideSwiper: React.FC<ISlideSwiperProps> = ({
  task,
  updateTask,
  setTaskUpdated,
  taskUpdated,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [visibleEditModal, setVisibleEditModal] =
    React.useState<boolean>(false);
  const [fullImage, setFullImage] = useState<string>("");
  const { selectedTaskId, selectedSlideId } = useTypedSelector(
    (state) => state.briefSingleReducer
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleTooltipOpen = () => {
    setOpen(!open);
  };
  const handleDeleteSlide = () => {
    setOpen(false);
    setTaskUpdated((prev: any) => ({
      ...prev,
      slides: prev.slides.filter(
        (slide: ISlide) => slide.id != selectedSlideId
      ),
    }));
    console.log(task);
  };
  const handleSlideChange = (slide: SwiperCore) => {
    setOpen(false);
    setActiveSlideIndex(slide.activeIndex);
    const objectIdActiveSlide: string =
      slide.slides[slide.activeIndex].attributes["data-id"].value;
    if (selectedTaskId && objectIdActiveSlide) {
      dispatch(
        BriefSingleTaskSelect({
          selectedTaskId: selectedTaskId,
          selectedSlideId: objectIdActiveSlide,
        })
      );
    }
  };

  const handleEditClick = () => {
    const fullImage = taskUpdated!.slides!.find(
      (slide) => slide.id === selectedSlideId
    ).fullImage;
    setVisibleEditModal(true);
    setFullImage(fullImage);
  };

  useEffect(() => {
    updateTask();
  }, [taskUpdated]);

  useEffect(() => {
    const indexSlide = task.slides.findIndex(
      (slide) => slide.id === selectedSlideId
    );
    setTaskUpdated(task);
    setActiveSlideIndex(indexSlide);
  }, [task]);

  return (
    <>
      <Swiper
        onSlideChange={handleSlideChange}
        className={styles.swiper}
        followFinger={false}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{ prevEl, nextEl }}
        pagination={{
          type: "fraction",
        }}
      >
        {taskUpdated?.slides.map((slide) => (
          <SwiperSlide data-id={slide.id}>
            <div className={styles.slide} data-id={slide.id}>
              <img className={styles.slideImage} src={slide.fullImage} />
            </div>
          </SwiperSlide>
        ))}

        <div ref={(node) => setPrevEl(node)} className={styles.leftNav}>
          <LeftIcon sx={{ color: "primary.main", fontSize: "60px" }} />
        </div>
        <div ref={(node) => setNextEl(node)} className={styles.rightNav}>
          <RightIcon sx={{ color: "primary.main", fontSize: "60px" }} />
        </div>

        <div
          className={styles.pagination}
          style={{ color: theme.palette.primary.contrastText }}
        ></div>

        <DeleteTooltip
          arrow
          className={styles.tooltipDelete}
          placement={"left"}
          title={
            <>
              <Typography>Are you sure ?</Typography>
              <Button
                variant={"outlined"}
                onClick={handleDeleteSlide}
                style={{
                  color: theme.palette.primary.contrastText,
                  borderColor: theme.palette.primary.contrastText,
                  marginLeft: "12px",
                }}
              >
                Yes
              </Button>
            </>
          }
          onClick={handleTooltipOpen}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <IconButton className={styles.slideBtnDelete}>
            <DeleteIcon sx={{ color: "error.main", fontSize: "40px" }} />
          </IconButton>
        </DeleteTooltip>
        <IconButton className={styles.slideBtnEdit}>
          <EditIcon
            sx={{ color: "success.main", fontSize: "40px" }}
            onClick={handleEditClick}
          />
        </IconButton>
      </Swiper>
      <SlideEdit visible={visibleEditModal} fullImg={fullImage} />
    </>
  );
};
