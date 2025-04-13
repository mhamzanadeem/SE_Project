import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { useHistory } from "react-router-dom"; // Changed from useNavigate to useHistory

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const history = useHistory(); // Changed from useNavigate to useHistory

  // Debugging logs
  console.log("User data:", user);
  console.log("Is signed in:", isSignedIn);

  if (!isLoaded) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Your Profile
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <strong>First Name:</strong> {user.firstName || "Not provided"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Last Name:</strong> {user.lastName || "Not provided"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Email:</strong>{" "}
          {user.primaryEmailAddress?.emailAddress || "No email found"}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")} 
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default Profile;
