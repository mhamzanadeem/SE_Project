// src/theme/ThemeProvider.jsx
import React, { createContext, useState, useMemo, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Define context for color mode toggling
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // Initialize mode from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    try {
      const storedMode = localStorage.getItem("themeMode");
      return storedMode || "light";
    } catch (error) {
      console.error("Error reading themeMode from localStorage:", error);
      return "light"; // Fallback to light mode on error
    }
  });

  // Persist mode to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("themeMode", mode);
    } catch (error) {
      console.error("Error saving themeMode to localStorage:", error);
    }
  }, [mode]);

  // Memoize color mode context value
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  // Memoize theme creation based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // Set the mode (light or dark)
          ...(mode === "light"
            ? {
                // Light mode palette
                primary: {
                  main: "#e50813", // Example primary color
                },
                secondary: {
                  main: "#ff4b2b", // Example secondary color
                },
                background: {
                  default: "#f0f0f0", // Light grey background
                  paper: "#ffffff", // White paper background
                },
                text: {
                  primary: "#333333", // Dark text
                  secondary: "#555555", // Lighter dark text
                },
              }
            : {
                // Dark mode palette
                primary: {
                  main: "#ff3d47", // Example primary color (adjust for dark)
                },
                secondary: {
                  main: "#ff6b4b", // Example secondary color (adjust for dark)
                },
                background: {
                  default: "#121212", // Very dark grey background
                  paper: "#1e1e1e", // Slightly lighter dark paper
                },
                text: {
                  primary: "#f5f5f5", // Light text
                  secondary: "#aaaaaa", // Darker light text
                },
              }),
        },
        components: {
          // Override component styles based on mode
          MuiAppBar: {
            styleOverrides: {
              root: {
                // Use theme colors instead of hardcoding
                backgroundColor: mode === "light" ? "#000" : "#121212",
                color: mode === "light" ? "#fff" : "#f5f5f5", // Ensure text is visible
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: ({ theme }) => ({
                // Access theme here
                boxShadow: theme.shadows[mode === "light" ? 3 : 5], // Use theme shadows
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[mode === "light" ? 6 : 8],
                },
              }),
            },
          },
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
            styleOverrides: {
              root: {
                textTransform: "none", // Keep consistent button text casing
              },
            },
          },
        },
        shape: {
          borderRadius: 8, // Consistent border radius
        },
        typography: {
          fontFamily:
            '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', // Example font stack
          // Adjust font weights as needed
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 500 },
          h6: { fontWeight: 500 },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline applies baseline styles & background color */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Export default for convenience if needed, but named export is clear
// export default ThemeProvider;
