// components/trending/TrendingCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const TrendingCard = ({ item }) => {
  const { id, cover, name, rating, time, genres } = item;
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <Link
        to={`/movie/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia component="img" height="350" image={cover} alt={name} />
      </Link>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <StarIcon sx={{ color: "#f5c518" }} />
          <Typography variant="body2">{rating} IMDb</Typography>
          <Typography variant="body2" color="gray">
            • {time}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {Array.isArray(genres) ? genres.join(", ") : "Unknown Genre"}
        </Typography>
        <Button
          component={Link}
          to={`/movie/${id}`}
          variant="contained"
          color="error"
          startIcon={<PlayArrowIcon />}
          fullWidth
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Watch Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingCard;
