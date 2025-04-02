import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  CardActionArea,
} from "@mui/material";

const SearchResultsPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract query from URL parameters
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const api_key = "bad64aad7360bfd1615d7eea5599e286";

  useEffect(() => {
    if (!query) {
      setError("No search query provided.");
      setLoading(false);
      return;
    }

    console.log("Search query:", query);

    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
          query
        )}`;
        console.log("Fetching from:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API returned:", data.results);
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, api_key]);

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
    );
  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );

  if (!movies || movies.length === 0)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No movies found for "{query}"
      </Typography>
    );

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2c5364" }}
      >
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  sx={{ borderRadius: 2 }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResultsPage;
