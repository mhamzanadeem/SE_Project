// src/components/header/Header.jsx

import React, { useState, useContext } from "react";

// Added CircularProgress to the imports

import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";

import { styled, useTheme } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";

import HistoryIcon from "@mui/icons-material/History";

import PersonIcon from "@mui/icons-material/Person";

import AddIcon from "@mui/icons-material/Add";

import NotificationsIcon from "@mui/icons-material/Notifications";

import FilterListIcon from "@mui/icons-material/FilterList";

import Brightness4Icon from "@mui/icons-material/Brightness4";

import Brightness7Icon from "@mui/icons-material/Brightness7";

import { Link, useLocation, useHistory } from "react-router-dom";

import { useUser, UserButton } from "@clerk/clerk-react";

// User Feature Imports

import AdvancedSearch from "./AdvancedSearch";

import { ColorModeContext } from "../../theme/ThemeProvider";

// --- Teammate's Styled Components ---

const SidebarButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  justifyContent: "flex-start",

  padding: "8px 12px",

  width: "100%",

  textTransform: "none",

  color: isActive ? theme.palette.common.black : theme.palette.common.white,

  backgroundColor: isActive ? theme.palette.common.white : "transparent",

  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.common.white
      : theme.palette.action.hover,
  },

  "& .MuiButton-startIcon": {
    color: isActive ? theme.palette.common.black : theme.palette.common.white,
  },
}));

const Header = ({ children }) => {
  const location = useLocation();

  const history = useHistory();

  const { isSignedIn, user, isLoaded } = useUser();

  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

  const handleAdvancedSearchToggle = () => {
    setAdvancedSearchOpen(!advancedSearchOpen);
  };

  const displayName =
    isLoaded && isSignedIn
      ? user?.firstName || user?.primaryEmailAddress?.emailAddress || "User"
      : "Guest";

  const navItems = [
    { path: "/", label: "Home", icon: <HomeIcon /> },

    { path: "/history", label: "History", icon: <HistoryIcon /> },

    ...(isSignedIn
      ? [{ path: "/profile", label: "Profile", icon: <PersonIcon /> }]
      : []),

    {
      path: "/notifications",

      label: "Notifications",

      icon: <NotificationsIcon />,
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}

        <Box
          sx={{
            width: "256px",

            bgcolor: "#000000",

            display: "flex",

            flexDirection: "column",

            height: "100%",

            borderRight: `1px solid ${theme.palette.divider}`,

            flexShrink: 0,
          }}
        >
          {/* Sidebar Top Section */}

          <Box sx={{ p: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",

                color: "#f44336",

                mb: 3,

                textAlign: "center",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Watchlists
              </Link>
            </Typography>

            {/* Navigation Buttons */}

            <Box sx={{ mb: 3 }}>
              {navItems.map((item) => (
                <SidebarButton
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  isActive={location.pathname === item.path}
                >
                  {item.label}
                </SidebarButton>
              ))}
            </Box>

            {/* Advanced Search Trigger */}

            <Tooltip title="Advanced Search">
              <SidebarButton
                onClick={handleAdvancedSearchToggle}
                startIcon={<FilterListIcon />}
              >
                Advanced Search
              </SidebarButton>
            </Tooltip>

            {/* Theme Toggle */}

            <Tooltip
              title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
            >
              <SidebarButton
                onClick={colorMode.toggleColorMode}
                startIcon={
                  theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )
                }
              >
                {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
              </SidebarButton>
            </Tooltip>

            {/* Create Watchlist Button */}

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
              sx={{
                bgcolor: "#f44336",

                "&:hover": { bgcolor: "#d32f2f" },

                mt: 3,

                textTransform: "none",
              }}
            >
              Create watchlist
            </Button>
          </Box>

          {/* Sidebar Bottom Section (User Info/Auth) */}

          <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid #333333" }}>
            {!isLoaded ? (
              // Now CircularProgress can be used

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} sx={{ color: "white" }} />
              </Box>
            ) : isSignedIn ? (
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <UserButton
                  afterSignOutUrl="/"
                  appearance={
                    {
                      /* Clerk appearance */
                    }
                  }
                />

                <Typography
                  sx={{
                    ml: 1.5,

                    color: "white",

                    flex: 1,

                    overflow: "hidden",

                    textOverflow: "ellipsis",

                    whiteSpace: "nowrap",
                  }}
                  title={displayName}
                >
                  {displayName}
                </Typography>
              </Box>
            ) : (
              <SidebarButton
                component={Link}
                to="/auth"
                startIcon={<PersonIcon />}
              >
                Sign In / Sign Up
              </SidebarButton>
            )}
          </Box>
        </Box>

        {/* Content Area */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,

            overflowY: "auto",

            bgcolor: "background.default",

            p: 3,

            height: "100vh",

            pb: "80px", // Padding for fixed footer
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Advanced Search Dialog */}

      <AdvancedSearch
        open={advancedSearchOpen}
        onClose={() => setAdvancedSearchOpen(false)}
      />
    </>
  );
};

export default Header;
