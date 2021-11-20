import React from "react";
import { Card } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/Assignment";
import Grid from "@mui/material/Grid";

const BriefListItem: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" component="div">
              Hello brief. Very long briefffff.....
            </Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <ListIcon />
            </IconButton>
          </Stack>
          <Stack direction="row">
            <Typography color="text.secondary">12 steps</Typography>
            <Typography sx={{ ml: 2 }} color="text.secondary">
              12 steps
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BriefListItem;
