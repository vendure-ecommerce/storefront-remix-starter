import { createTheme } from "@mui/material/styles";

export const olive = "#115E5C";
export const orange = "#FE7C22";
export const theme = createTheme({
  palette: {
    primary: {
      main: orange,
    },
    secondary: {
      main: olive,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
