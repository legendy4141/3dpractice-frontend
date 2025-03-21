import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#f4f4f4",
    },
    text: {
      primary: "#333",
    },
  },
});
