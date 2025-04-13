// components/homes/HomeCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

const HomeCard = ({
  item: { id, cover, name, rating, time, desc, starring, genres, tags },
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "black",
        color: "white",
      }}
    >
      <CardMedia
        component="img"
        image={cover}
        alt={name}
        sx={{
          width: "100%",
          height: "90vh",
          objectFit: "cover",
          filter: "brightness(0.6)",
        }}
      />

      {/* Content Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0,0,0,0.7)",
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          {name}
        </Typography>

        {/* Rating and Time */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            ⭐ {rating} (IMDb)
          </Typography>
          <Typography
            variant="body1"
            sx={{ bgcolor: "gray", px: 1, borderRadius: 1 }}
          >
            GP
          </Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>
            ⏳ {time}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
          {desc}
        </Typography>

        {/* Additional Info */}
        <Typography variant="body2">
          <strong>Starring:</strong> {starring}
        </Typography>
        <Typography variant="body2">
          <strong>Genres:</strong> {genres}
        </Typography>
        <Typography variant="body2">
          <strong>Tags:</strong> {tags}
        </Typography>

        {/* Buttons */}
        <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<PlayArrow />}
            sx={{ mr: 2 }}
          >
            Play Now
          </Button>
          <Link to={`/singlepage/${id}`} style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="warning">
              Watch Trailer
            </Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default HomeCard;
