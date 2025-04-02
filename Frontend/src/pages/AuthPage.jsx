import React from "react";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import { SignIn } from "@clerk/clerk-react";
import VideoBackgroundOverlay from "./VideoBackgroundOverlay";

const AuthPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
      }}
    >
      <Container maxWidth="md" sx={{ p: 0 }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* Left Side: Video Background Overlay */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <VideoBackgroundOverlay />
            </Grid>
            {/* Right Side: Sign In Form */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                backgroundColor: "rgba(255,255,255,0.98)",
                p: 4,
              }}
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
              >
                Sign In
              </Typography>
              <SignIn
                path="/auth"
                routing="path"
                // Update signUpUrl to point to our custom SignUpPage
                signUpUrl="/auth/signup"
                afterSignInUrl="/"
                appearance={{
                  elements: {
                    rootBox: {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                    headerTitle: {
                      display: "none",
                    },
                    formButtonPrimary: {
                      backgroundColor: "#ff4b2b",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      "&:hover": {
                        backgroundColor: "#ff416c",
                      },
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthPage;
