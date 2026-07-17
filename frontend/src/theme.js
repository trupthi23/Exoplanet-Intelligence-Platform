import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    mode: "dark",

    primary: {
      main: "#3B82F6",
    },

    secondary: {
      main: "#10B981",
    },

    background: {

      default: "#0F172A",

      paper: "#1E293B",

    },

    text: {

      primary: "#F8FAFC",

      secondary: "#CBD5E1",

    },

  },

  typography: {

    fontFamily:
      '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h3: {

      fontWeight: 700,

      letterSpacing: "-0.5px",

    },

    h4: {

      fontWeight: 700,

    },

    h5: {

      fontWeight: 600,

    },

    h6: {

      fontWeight: 600,

    },

    button: {

      textTransform: "none",

      fontWeight: 600,

    },

  },

  shape: {

    borderRadius: 16,

  },

  components: {

    MuiCard: {

      styleOverrides: {

        root: {

          borderRadius: 18,

          backgroundColor: "#1E293B",

          boxShadow:
            "0px 8px 30px rgba(0,0,0,0.35)",

        },

      },

    },

    MuiPaper: {

      styleOverrides: {

        root: {

          borderRadius: 18,

          backgroundColor: "#1E293B",

        },

      },

    },

    MuiButton: {

      styleOverrides: {

        root: {

          borderRadius: 10,

          padding: "10px 18px",

          fontWeight: 600,

        },

      },

    },

    MuiTextField: {

      defaultProps: {

        variant: "outlined",

      },

    },

    MuiTableHead: {

      styleOverrides: {

        root: {

          backgroundColor: "#23304A",

        },

      },

    },

  },

});

export default theme;