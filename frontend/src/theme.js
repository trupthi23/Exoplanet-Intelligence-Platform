import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    mode: "dark",

    primary: {
      main: "#3B82F6",
    },

    secondary: {
      main: "#8B5CF6",
    },

    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },

  },

  typography: {

    fontFamily:
      "'Inter','Roboto',sans-serif",

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

  },

  shape: {
    borderRadius: 18,
  },

});

export default theme;