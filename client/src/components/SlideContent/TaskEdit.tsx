import React, { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ISlide, ITask } from "../../redux/brief/briefItem.type";
import styles from "./TaskEdit.module.scss";

import { Button, IconButton, Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import {
  BriefSingleTaskSelect,
  BriefSingleTaskUpdateLocalAction,
} from "../../redux/brief/briefItem.reducer";
import { SlideSwiper } from "./SlideSwiper";
import AddIcon from "@mui/icons-material/Add";
import { randomBytes } from "crypto";
import { SlideEdit } from "./SlideEdit";

interface ISlideEditProps {
  task: ITask;
}

export const TaskEdit: React.FC<ISlideEditProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [taskUpdated, setTaskUpdated] = useState<ITask>(task);
  const updateTask = () =>
    dispatch(BriefSingleTaskUpdateLocalAction({ updatedTask: taskUpdated }));

  const handleSlideAdd = () => {
    const emptySlideSrc = "../../../image/no-image.png";
    const emptySildeId = randomBytes(16).toString("hex");
    const emptySlide = {
      id: emptySildeId,
      fullImage: emptySlideSrc,
      thumbnailImage: emptySlideSrc,
    };
    setTaskUpdated((prev) => ({
      ...prev,
      slides: [...prev.slides, emptySlide],
    }));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <Input
          className={styles.headInputName}
          placeholder={"Текст вопроса..."}
          value={taskUpdated.question}
          onChange={(event) =>
            setTaskUpdated((prevstate) => ({
              ...prevstate,
              question: event.target.value,
            }))
          }
        />
        <IconButton className={styles.headBtnDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          className={styles.headBtnDelete}
          onClick={(event) => updateTask()}
        >
          <SaveIcon />
        </IconButton>
      </div>
      <SlideSwiper
        task={task}
        updateTask={updateTask}
        taskUpdated={taskUpdated}
        setTaskUpdated={setTaskUpdated}
      />
      <IconButton
        onClick={handleSlideAdd}
        size={"large"}
        sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}
        className={styles.slideBtnAdd}
      >
        <AddIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    </div>
  );
};
