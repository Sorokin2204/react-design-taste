import React, { MouseEventHandler, useState } from "react";
import { Card, ToggleButton, useTheme } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/Assignment";
import Grid from "@mui/material/Grid";
import { IBrief } from "../../redux/briefs/briefList.type";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { PassedRequestAction } from "../../redux/passed/passed.reducer";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

interface IBriefItem {
  brief: IBrief;
  isActive: boolean;
}

const BriefItem: React.FC<IBriefItem> = ({ brief, isActive }) => {
  const { isOpenDrawer } = useTypedSelector((state) => state.passedAllReducer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const editBriefHandle = (
    event: React.MouseEvent<HTMLElement>,
    briefSlug: string
  ) => {
    router.push(`/briefs/edit/${briefSlug}`);
  };
  const passedBriefHandle = (
    event: React.MouseEvent<HTMLElement>,
    briefId: string
  ) => {
    dispatch(PassedRequestAction({ idBrief: briefId }));
  };

  return (
    <Grid data-id={brief.id} item xs={12}>
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" component="div">
              {brief.title}
            </Typography>
            <Link href={`/briefs/edit/${brief.slug}`}>
              <IconButton component="a">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              onClick={(e) => passedBriefHandle(e, brief.id)}
              className={isActive ? "active" : ""}
              sx={{
                "&.active": {
                  background: `${theme.palette.primary.main}`,
                  color: `${theme.palette.primary.light}`,
                  transition: `none`,
                },
              }}
              color="primary"
            >
              <ListIcon />
            </IconButton>
          </Stack>
          <Stack direction="row">
            <Typography color="text.secondary">
              {brief.countSteps} steps
            </Typography>
            <Typography sx={{ ml: 2 }} color="text.secondary">
              {brief.countPassed} passed
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BriefItem;
