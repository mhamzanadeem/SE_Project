import { Box, Typography, Button, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import HomeIcon from "@mui/icons-material/Home"
import HistoryIcon from "@mui/icons-material/History"
import PersonIcon from "@mui/icons-material/Person"
import AddIcon from "@mui/icons-material/Add"
import { Link, useLocation } from "react-router-dom"
import HomePage from "../../home/HomePage"
import { useUser,UserButton } from "@clerk/clerk-react";
import Profile from "../profile/Profile"

// Styled components
const SidebarButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  justifyContent: "flex-start",
  padding: "8px 12px",
  width: "100%",
  textTransform: "none",
  color: isActive ? "black" : "white", // Text color
  backgroundColor: isActive ? "white" : "transparent",
  "&:hover": {
    backgroundColor: isActive ? "white" : "#424242",
  },
  "& .MuiButton-startIcon": {
    color: isActive ? "black" : "white", // Icon color
  },
}))

const Header = () => {

  const location = useLocation();
  const { isSignedIn, user, isLoaded } = useUser();
  const displayName = isLoaded && isSignedIn ? user?.firstName || user?.primaryEmailAddress?.emailAddress || "User" : "GUEST";

  // Function to render the appropriate component based on the route
  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return <HomePage />;
      case "/profile":
        return <Profile />;  
      case "/notification":
        return <Profile />;    
      case "/history": 
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ color: "white" }}>
              History
            </Typography>
            <Typography sx={{ color: "white" }}>This is your History page.</Typography>
          </Box>
        );
      default:
        return (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ color: "white" }}>404 - Page Not Found</Typography>
          </Box>
        );
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "calc(100vh - 40px)" }}>
        {/* Sidebar */}
        <Box sx={{ width: "256px", bgcolor: "#000000", display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#f44336", mb: 2 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Watchlists
              </Link>
            </Typography>

            <Box sx={{ mb: 3 }}>
              <SidebarButton
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                isActive={location.pathname === "/"} 
                >
                Home
              </SidebarButton>
              <SidebarButton
                component={Link}
                to="/history"
                startIcon={<HistoryIcon />}
                isActive={location.pathname === "/history"}
                              >
                History
              </SidebarButton>
              <SidebarButton
                component={Link}
                to="/profile"
                startIcon={<HistoryIcon />}
                isActive={location.pathname === "/profile"}
                              >
                Profile
              </SidebarButton>
              <SidebarButton
                component={Link}
                to="/notification"
                startIcon={<HistoryIcon />}
                isActive={location.pathname === "/notification"}
                              >
                Notifications
              </SidebarButton>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
              sx={{
                bgcolor: "#f44336",
                "&:hover": { bgcolor: "#d32f2f" },
                mb: 3,
                textTransform: "none",
              }}
            >
              Create watchlist
            </Button>

            <Divider sx={{ borderColor: "#333333", mb: 2 }} />
            <Typography variant="subtitle1" sx={{ color: "#9e9e9e", mb: 1 }}>
              My Lists
            </Typography>
          </Box>

          <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid #333333" }}>
            {isLoaded && isSignedIn ? (
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: 24,
                        height: 24,
                      },
                      userButtonTrigger: {
                        padding: "8px 12px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#333333",
                        },
                      },
                      userButtonPopoverCard: {
                        backgroundColor: "#424242",
                        color: "white",
                      },
                    },
                  }}
                  afterSignOutUrl="/"
                />
                <Typography sx={{ ml: 1, color: "white", flex: 1 }}>{displayName}</Typography>
              </Box>
            ) : (
              <SidebarButton
                component={Link}
                to="/profile"
                startIcon={<PersonIcon />}
                sx={{ "&:hover": { bgcolor: "#333333" } }}
              >
                {displayName}
              </SidebarButton>
            )}
          </Box>
        </Box>
        {/* Content Area */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {renderContent()}
        </Box>
      </Box>
    </>
  )
}

export default Header
