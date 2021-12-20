import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./SlideEdit.module.scss";
import { Modal, Box, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ReactCrop, { Crop, ReactCropState } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CropIcon from "@mui/icons-material/Crop";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import HeightIcon from "@mui/icons-material/Height";
import WidthIcon from "@mui/icons-material/Width";
import axios from "axios";

interface ISlideEditProps {
  visible: boolean;
  fullImg: string;
}

export const SlideEdit: React.FC<ISlideEditProps> = ({ visible, fullImg }) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const imgRef = useRef<HTMLImageElement | null>(null);

  const getImageFromCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef.current,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        file.name = "croped";
        resolve(file);
        console.log(file);
      }, "image/jpeg");
    });
  };

  const handleClickSave = async () => {
    const file = await getImageFromCanvas();

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const formData = new FormData();

    formData.append("theImage", file);

    const response = await axios.post(
      "/api/save-cropped-image",
      formData,
      config
    );
    console.log(response.data);
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  const handleClickCrop = () => {
    setCropMod(!cropMod);
  };

  const handleClickFullWidth = () => {
    setCrop((prev) => ({
      ...prev,
      unit: "px",
      x: 0,
      width: imgRef.current.width,
    }));
  };
  const handleClickFullHeight = () => {
    setCrop((prev) => ({
      ...prev,
      unit: "px",
      y: 0,
      height: imgRef.current.height,
    }));
  };

  const [cropMod, setCropMod] = useState(false);
  return (
    <>
      <Modal open={visible} keepMounted={true} className={styles.modal}>
        <Box className={styles.wrapper}>
          <Box
            className={styles.modalHead}
            sx={{ backgroundColor: "primary.contrastText" }}
          >
            <IconButton sx={{ color: "error.main" }}>
              <CloseIcon sx={{ fontSize: "40px" }} />
            </IconButton>

            <Box>
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={handleClickFullWidth}
              >
                <HeightIcon
                  sx={{ fontSize: "40px", transform: "rotate(90deg)" }}
                />
              </IconButton>
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={handleClickCrop}
              >
                <CropIcon sx={{ fontSize: "40px" }} />
              </IconButton>
              {/*<IconButton sx={{ color: "primary.main" }}>*/}
              {/*  <OpenInFullIcon sx={{ fontSize: "40px" }} />*/}
              {/*</IconButton>{" "}*/}
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={handleClickFullHeight}
              >
                <HeightIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </Box>

            <IconButton
              sx={{ color: "success.main" }}
              onClick={handleClickSave}
            >
              <CheckIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          </Box>
          <Box className={styles.modalContent}>
            {cropMod ? (
              <ReactCrop
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                src={fullImg}
                crossorigin={"anonymous"}
              />
            ) : (
              <img className={styles.mainImg} src={fullImg} />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
