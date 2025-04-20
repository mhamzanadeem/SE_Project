// src/components/searchresults/SearchResultsPage.jsx

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Container, // Added Container
  useTheme,
  Alert, // Added Alert
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star"; // Added StarIcon

// IMPORTANT: Replace with environment variable
const api_key = process.env.REACT_APP_TMDB_API_KEY || "YOUR_FALLBACK_API_KEY";
if (!process.env.REACT_APP_TMDB_API_KEY) {
  console.warn(
    "TMDB API Key not found in environment variables (SearchResultsPage)."
  );
}

const SearchResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("Search Results");
  const theme = useTheme();

  useEffect(() => {
    // Reset state on new search
    setLoading(true);
    setError(null);
    setResults([]);
    setSearchTitle("Search Results"); // Reset title

    const params = new URLSearchParams(location.search);
    const query = params.get("query"); // Basic title search
    const personId = params.get("person"); // Person filter
    const personName = params.get("name"); // Person name for title
    const genreIds = params.get("genres"); // Genre filter (comma-separated IDs)
    const genreNames = params.get("names"); // Genre names for title

    let apiUrl = "";
    let pageTitle = "Search Results";

    // Determine API URL and Page Title based on search parameters
    if (query) {
      pageTitle = `Results for "${query}"`;
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
        query
      )}&language=en-US&page=1&include_adult=false`;
    } else if (personId) {
      pageTitle = `Movies featuring ${decodeURIComponent(
        personName || "Selected Person"
      )}`;
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_cast=${personId}&language=en-US&page=1&sort_by=popularity.desc&include_adult=false`;
    } else if (genreIds) {
      pageTitle = `Movies in Genres: ${decodeURIComponent(
        genreNames || "Selected Genres"
      )}`;
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc&include_adult=false`;
    } else {
      // No valid search criteria provided
      setError("No search criteria provided. Please try searching again.");
      setLoading(false);
      setSearchTitle("Invalid Search");
      return; // Stop execution
    }

    setSearchTitle(pageTitle); // Set the dynamic title

    // --- Fetch Data ---
    console.log("Fetching Search Results from API:", apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          console.error("Search API Response Error Status:", response.status);
          throw new Error(`API request failed! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Search API Data Received:", data);
        // Ensure data.results is an array, default to empty if null/undefined
        setResults(Array.isArray(data.results) ? data.results : []);
      })
      .catch((err) => {
        console.error("Search Fetch Error:", err);
        setError(`Failed to fetch results. ${err.message}`);
        setResults([]); // Clear results on error
      })
      .finally(() => {
        setLoading(false);
      });

    // Dependency array: Re-run effect if the URL search string changes
  }, [location.search]); // Removed api_key from deps as it should be stable

  // --- Render Logic ---

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    // Use Container for consistent padding and max-width
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        {searchTitle}
      </Typography>

      {error && ( // Display error prominently if it occurred
        <Alert severity="error" variant="outlined" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {!error &&
        results.length === 0 && ( // Show only if no error and no results
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 4, color: "text.secondary" }}
          >
            No movies found matching your criteria.
          </Typography>
        )}

      {results.length > 0 && ( // Only render grid if there are results
        <Grid container spacing={3}>
          {results.map((movie) =>
            // Ensure each movie has a valid ID before rendering
            movie.id ? (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Card
                  sx={{
                    height: "100%", // Make cards fill grid item height
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper", // Use theme background
                    borderRadius: theme.shape.borderRadius, // Use theme radius
                    overflow: "hidden", // Prevent content overflow
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  {/* Link the entire card area to the movie detail page */}
                  <CardActionArea
                    component={Link}
                    to={`/movie/${movie.id}`} // Correct link to movie detail page
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // Aspect ratio using padding-top trick or aspect-ratio property
                        // aspectRatio: '2 / 3', // Modern CSS approach
                        // height: 0, paddingTop: '150%', // Older padding-top trick
                        height: { xs: 300, sm: 350, md: 400 }, // Fixed height approach (simpler)
                        objectFit: "cover",
                        bgcolor: "grey.200", // Background for loading/missing images
                      }}
                      image={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : // Placeholder using theme colors
                            `https://via.placeholder.com/500x750/${
                              theme.palette.mode === "dark"
                                ? "333/666"
                                : "ccc/999"
                            }?text=No+Image`
                      }
                      alt={`${movie.title || "Movie"} poster`} // Better alt text
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      {" "}
                      {/* Allow content to push footer down */}
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : "N/A"}
                      </Typography>
                      {/* Display Rating */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <StarIcon
                          sx={{ color: "#f5c518", fontSize: "1rem", mr: 0.5 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ) : null // Skip rendering if movie ID is missing
          )}
        </Grid>
      )}
    </Container>
  );
};

export default SearchResultsPage;
