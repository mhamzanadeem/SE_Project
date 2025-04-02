import React from "react";
import { Box, Typography } from "@mui/material";

const VideoBackgroundOverlay = () => {
  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
          type="video/mp4"
        />
      </video>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome Back!
        </Typography>
        <Typography variant="h6">Sign in to experience more.</Typography>
      </Box>
    </Box>
  );
};

export default VideoBackgroundOverlay;
