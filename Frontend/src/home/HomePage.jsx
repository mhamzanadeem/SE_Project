
// src/home/HomePage.jsx
import React, { useState, useEffect } from "react"; // Added useState, useEffect
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Skeleton,
  Alert,
  Container,
} from "@mui/material"; // Added Skeleton, Alert, Container
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star"; // For rating
import { Link, useHistory } from "react-router-dom"; // Added Link, useHistory

// Feature Imports
import SearchAutocomplete from "../components/header/SearchAutocomplete"; // Import SearchAutocomplete

// --- Teammate's Styled Components (Keep or adapt as needed) ---
const MovieCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent", // Use theme background if needed or keep transparent
  boxShadow: "none", // Keep no shadow for this design
  position: "relative",
  height: "100%", // Ensure card takes full grid item height
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const RatingBadge = styled(Box)(({ theme, rating }) => {
  // Pass rating to style
  const isGood = rating >= 7; // Example threshold for "good" rating
  const isOkay = rating >= 5 && rating < 7;
  let bgColor;
  if (isGood) bgColor = theme.palette.success.light; // Greenish
  else if (isOkay) bgColor = theme.palette.warning.light; // Yellowish
  else bgColor = theme.palette.error.light; // Reddish

  return {
    display: "inline-flex",
    alignItems: "center",
    // Use theme colors with opacity
    backgroundColor:
      theme.palette.mode === "dark"
        ? `rgba(${parseInt(bgColor.slice(1, 3), 16)}, ${parseInt(
            bgColor.slice(3, 5),
            16
          )}, ${parseInt(bgColor.slice(5, 7), 16)}, 0.3)`
        : bgColor,
    padding: "2px 6px",
    borderRadius: theme.shape.borderRadius / 2,
    fontSize: "12px",
    fontWeight: "medium",
    color: theme.palette.getContrastText(bgColor), // Ensure text is readable
  };
});

// --- API Key ---
// IMPORTANT: Replace with environment variable
const api_key = process.env.REACT_APP_TMDB_API_KEY || "YOUR_FALLBACK_API_KEY";
if (!process.env.REACT_APP_TMDB_API_KEY) {
  console.warn(
    "TMDB API Key not found in environment variables (HomePage - Teammate)."
  );
}

// --- HomePage Component ---
const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory(); // For navigation

  // Fetch popular movies on mount
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPopularMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
        setError(err.message || "Failed to load movies.");
        setPopularMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMovies();
  }, []); // Empty dependency array runs once on mount

  // Handle search selection from SearchAutocomplete
  const handleSearchSelect = (query) => {
    if (query && query.trim()) {
      history.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    // Container removed, assuming main Box in Header provides padding
    // Or add Container here if Header doesn't provide padding: <Container maxWidth="xl">...</Container>
    <Box sx={{ flexGrow: 1 }}>
      {" "}
      {/* Use flexGrow if needed within Header's main Box */}
      {/* Welcome message (Teammate's structure) */}
      <Paper
        elevation={0} // No shadow to match teammate's style
        sx={{
          border: "1px solid rgba(244, 67, 54, 0.2)", // Teammate's border
          borderRadius: "8px", // Teammate's radius
          p: 3,
          mb: 4,
          bgcolor: "rgba(18, 18, 18, 0.8)", // Teammate's background
          color: "white", // Ensure text is visible
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
          Welcome to{" "}
          <Box component="span" sx={{ color: "#f44336" }}>
            Watchlists
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ color: "#bdbdbd", mb: 1 }}>
          Browse movies, add them to watchlists and share them with friends.
        </Typography>
        <Typography variant="body2" sx={{ color: "#bdbdbd" }}>
          Just click the{" "}
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#333333",
              px: 0.75,
              py: 0.25,
              borderRadius: "4px",
              verticalAlign: "middle",
            }}
          >
            <AddIcon sx={{ fontSize: "16px" }} />
          </Box>{" "}
          to add a movie, the poster to see more details or{" "}
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#333333",
              px: 0.75,
              py: 0.25,
              borderRadius: "4px",
              verticalAlign: "middle",
            }}
          >
            <CheckIcon sx={{ fontSize: "16px" }} />
          </Box>{" "}
          to mark the movie as watched.
        </Typography>
      </Paper>
      {/* Search bar (Integrate SearchAutocomplete here) */}
      <Box sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}>
        {" "}
        {/* Center and limit width */}
        <SearchAutocomplete onSearchSelect={handleSearchSelect} />
      </Box>
      {/* Popular movies Section */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", mb: 3, color: "text.primary" }}
      >
        Popular Movies Right Now
      </Typography>
      {/* Conditional Rendering for Loading/Error/Content */}
      {loading ? (
        <Grid container spacing={2}>
          {[...Array(10)].map(
            (
              _,
              index // Render 10 skeletons
            ) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Skeleton
                  variant="rectangular"
                  sx={{ height: 280, borderRadius: 1 }}
                />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            )
          )}
        </Grid>
      ) : error ? (
        <Alert severity="error" variant="outlined">
          {error}
        </Alert>
      ) : (
        <Grid container spacing={2.5}>
          {" "}
          {/* Slightly more spacing */}
          {popularMovies.map((movie) => (
            // Use appropriate grid sizing, lg={2.4} results in 5 items per row
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={movie.id}>
              <MovieCard>
                {" "}
                {/* Use teammate's styled card */}
                {/* Link the image and potentially title to the movie detail page */}
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "2 / 3",
                      bgcolor: "grey.800",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : `https://via.placeholder.com/500x750?text=No+Image`
                      }
                      alt={`${movie.title} Poster`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Add to Watchlist Button (Positioned Absolute) */}
                    <IconButton
                      aria-label="Add to watchlist"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent link navigation
                        e.stopPropagation(); // Prevent link navigation
                        console.log("Add to watchlist:", movie.id); // Placeholder action
                      }}
                      sx={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        bgcolor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
                        padding: "4px", // Smaller padding
                        zIndex: 2, // Ensure it's above image
                      }}
                    >
                      <AddIcon sx={{ fontSize: "18px" }} />{" "}
                      {/* Slightly smaller icon */}
                    </IconButton>
                  </Box>
                </Link>
                {/* Movie Info Below Image */}
                <Box sx={{ p: 1, pt: 1.5, flexGrow: 1 }}>
                  {" "}
                  {/* Padding for text */}
                  {/* Rating */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    {movie.vote_average && movie.vote_average > 0 ? (
                      <>
                        <RatingBadge rating={movie.vote_average}>
                          <StarIcon sx={{ fontSize: "12px", mr: 0.5 }} />{" "}
                          {movie.vote_average.toFixed(1)}
                        </RatingBadge>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          / 10
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        No rating
                      </Typography>
                    )}
                  </Box>
                  {/* Title and Year */}
                  <Box>
                    <Link
                      to={`/movie/${movie.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          color: "text.primary",
                          mb: 0.2, // Small margin bottom
                          // Clamp line to prevent overflow
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          minHeight: "2.5em", // Reserve space for two lines
                        }}
                        title={movie.title} // Show full title on hover
                      >
                        {movie.title}
                      </Typography>
                    </Link>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      (
                      {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "N/A"}
                      )
                    </Typography>
                  </Box>
                </Box>
              </MovieCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default HomePage;
