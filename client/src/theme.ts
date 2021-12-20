import { createTheme, Tooltip, withStyles } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";

export const theme = createTheme({
  components: {
    MuiIconButton: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      defaultProps: { disableRipple: true, disableTouchRipple: true },
    },
    MuiTextField: {
      defaultProps: {},
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: grey[900],
          margin: "0px",
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#01579b",
      contrastText: "#fff",
      // text: "#fff",
    },
    error: {
      main: red[500],
    },
    success: {
      main: green[500],
    },
  },
});
