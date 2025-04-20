// components/upcoming/Ucard.jsx

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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Ucard = ({ item: { id, cover, name, time } }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" },
        width: 280, // Ensure consistent width
      }}
    >
      <Link
        to={`/movie/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia component="img" height="250" image={cover} alt={name} />
      </Link>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="gray" mt={1}>
          {time}
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

export default Ucard;
