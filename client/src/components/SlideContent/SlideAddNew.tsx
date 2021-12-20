import React from "react";
import { Button, Typography } from "@mui/material";
import styles from "./SlideAddNew.module.scss";
import AddIcon from "@mui/icons-material/Add";

interface ISlideAddNewProps {}

export const SlideAddNew: React.FC<ISlideAddNewProps> = ({}) => {
  return (
    <div className={styles.wrapper}>
      <Button className={styles.btnAddSlide}>
        <Typography className={styles.btnAddSlideText}>Новый слайд</Typography>
        <AddIcon
          className={styles.btnAddSlideIcon}
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
        />
      </Button>
    </div>
  );
};
