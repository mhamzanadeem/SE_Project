import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#f44336",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  })


  export default theme;