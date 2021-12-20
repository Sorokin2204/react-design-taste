import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "../../../layout/MainLayout";
import { Grid, Skeleton, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import SwiperCore, { Pagination } from "swiper";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { BriefSingleRequestAction } from "../../../redux/brief/briefItem.reducer";
import { SlideAll } from "../../../components/Slide/SlideAll";
import { SlideMain } from "../../../components/Slide/SlideMain";
import { SlideContent } from "../../../components/SlideContent/SlideContent";
// SwiperCore.use([Pagination]);

export default function BriefEditPage() {
  const route = useRouter();

  return (
    <>
      <MainLayout isEditBriefPage>
        <Grid container spacing={3}>
          <SlideAll />
          <SlideContent />
        </Grid>
      </MainLayout>
    </>
  );
}
