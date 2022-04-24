import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      light: "#F8FAFB",
      main: "#4D81B7",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1871E8",
    },
    action: {
      main: "#555F7C",
    },
    text: {
      primary: "#000000",
      secondary: "#7D7A7A",
    },
  },
});

export default theme;
