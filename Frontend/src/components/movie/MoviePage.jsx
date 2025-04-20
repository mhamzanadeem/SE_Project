// src/components/movie/MoviePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom"; // Added useHistory
import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  Grid,
  Chip,
  Rating,
  Button,
  Paper,
  TextField,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  useTheme, // Added useTheme
  Skeleton, // Added Skeleton for loading states
  Alert, // Added Alert for errors
} from "@mui/material";
import {
  Star as StarIcon,
  PlayArrow as PlayArrowIcon,
  Person as PersonIcon,
  // Comment as CommentIcon, // Optional
  Send as SendIcon,
  Facebook as FacebookIcon, // Keep if using social share
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Add as AddIcon, // For Add to Watchlist
  Check as CheckIcon, // For Watched
} from "@mui/icons-material";
import Upcomming from "../upcoming/Upcomming"; // Ensure this component is styled well

// IMPORTANT: Replace with environment variable
const api_key = process.env.REACT_APP_TMDB_API_KEY || "YOUR_FALLBACK_API_KEY";
if (!process.env.REACT_APP_TMDB_API_KEY) {
  console.warn("TMDB API Key not found in environment variables (MoviePage).");
}

// --- Helper Functions ---

// Format movie data for the 'Upcomming' component
const formatSimilarMovie = (movie) => ({
  id: movie.id,
  cover: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://via.placeholder.com/500x750?text=No+Image`, // Placeholder
  name: movie.title,
  time: movie.release_date ? movie.release_date.split("-")[0] : "N/A", // Year only
});

// Format cast data
const formatCastMember = (person) => ({
  id: person.id,
  name: person.name,
  character: person.character,
  profileUrl: person.profile_path
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : null, // Handle missing profile pics
});

const MoviePage = () => {
  const { id } = useParams();
  const history = useHistory(); // For navigation (e.g., back button, cast links)
  const theme = useTheme();

  // State for movie details, cast, recommendations, loading, and errors
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for reviews (UI only until backend integration)
  const [reviews, setReviews] = useState([
    // Placeholder/Example Reviews
    {
      id: 1,
      author: "MovieFan123",
      rating: 4.5,
      content: "Amazing!",
      date: "2023-06-15",
    },
    {
      id: 2,
      author: "CriticX",
      rating: 3.0,
      content: "Decent, but flawed.",
      date: "2023-06-10",
    },
  ]);
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false); // State for submission loading

  // Fetch movie data (details, credits, videos, recommendations)
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return; // Don't fetch if ID is missing

      setLoading(true);
      setError(null); // Reset error
      setMovie(null); // Reset movie state
      setCast([]);
      setSimilarMovies([]);
      setTrailerKey(null);

      try {
        // Fetch details, credits, videos, and recommendations in one go if possible, or parallel
        const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=credits,videos,recommendations`;
        const response = await fetch(detailsUrl);

        if (!response.ok) {
          console.error(`API Error (Movie Details): ${response.status}`);
          throw new Error(`Failed to fetch movie details (${response.status})`);
        }

        const data = await response.json();

        // Set movie details
        setMovie(data);

        // Set cast (top 12 or less)
        if (data.credits?.cast) {
          setCast(data.credits.cast.slice(0, 12).map(formatCastMember));
        }

        // Set similar movies (top 10 or less)
        if (data.recommendations?.results) {
          setSimilarMovies(
            data.recommendations.results.slice(0, 10).map(formatSimilarMovie)
          );
        }

        // Find the official YouTube trailer
        if (data.videos?.results) {
          const officialTrailer = data.videos.results.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.official
          );
          // Fallback to any trailer if official not found
          const anyTrailer = data.videos.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          );
          setTrailerKey(officialTrailer?.key || anyTrailer?.key || null);
        }
      } catch (err) {
        console.error("Error in fetchMovieData:", err);
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]); // Re-run effect if the movie ID changes

  // Handle review submission (Placeholder)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || userRating === 0) return; // Basic validation

    setSubmittingReview(true);
    // --- Backend Integration Placeholder ---
    // Replace this timeout with your actual API call to Django
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    console.log("Submitting Review:", {
      movieId: id,
      rating: userRating,
      text: reviewText,
    });
    // On successful submission from backend:
    // 1. Add the new review to the list (or refetch reviews)
    // 2. Clear the form
    // setReviews([...reviews, { id: Date.now(), author: 'CurrentUser', rating: userRating, content: reviewText, date: new Date().toISOString().split('T')[0]}]);
    setReviewText("");
    setUserRating(0);
    setSubmittingReview(false);
    // --- End Placeholder ---
  };

  // --- Render Logic ---

  if (loading) {
    return (
      // Display Skeletons for better loading experience
      <Box>
        {/* Skeleton for Hero Section */}
        <Skeleton variant="rectangular" height={{ xs: "50vh", md: "70vh" }} />
        {/* Skeleton for Cast */}
        <Container maxWidth="lg" sx={{ my: 6 }}>
          <Skeleton variant="text" width={200} height={60} sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Skeleton variant="rectangular" height={250} />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* Skeleton for Reviews (Optional) */}
        {/* Skeleton for Similar Movies */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Skeleton
            variant="text"
            width={300}
            height={60}
            sx={{ mb: 4, mx: "auto" }}
          />
          {/* Add skeleton for the slider/cards if needed */}
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Alert severity="error" variant="outlined">
          Error loading movie details: {error}
        </Alert>
        <Button onClick={() => history.goBack()} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!movie) {
    // This case should ideally be covered by the error state if fetch fails
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary">
          Movie not found.
        </Typography>
        <Button onClick={() => history.goBack()} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  // --- Main Content Render ---
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {" "}
      {/* Ensure background color */}
      {/* Movie Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "60vh", md: "70vh" }, // Use minHeight
          // Gradient overlay + background image
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          display: "flex",
          alignItems: "center", // Vertically center content
          py: { xs: 4, md: 6 }, // Padding top/bottom
          color: "white", // Default text color for this section
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
            {/* Poster Image */}
            <Grid item xs={12} sm={4} md={3}>
              <Box
                component="img"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : `https://via.placeholder.com/500x750?text=No+Poster`
                }
                alt={`${movie.title} Poster`}
                sx={{
                  width: "100%",
                  maxWidth: "300px", // Max width for poster
                  height: "auto",
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[10], // Add shadow
                  display: "block", // Fix potential inline spacing issues
                  mx: { xs: "auto", sm: 0 }, // Center on small screens
                }}
              />
            </Grid>
            {/* Movie Info */}
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                {movie.tagline || ""}
              </Typography>
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: "bold", mb: 1.5 }}
              >
                {movie.title} (
                {movie.release_date ? movie.release_date.split("-")[0] : "N/A"})
              </Typography>

              {/* Genres */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                {movie.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                  />
                ))}
                <Typography variant="body2" sx={{ mx: 1 }}>
                  •
                </Typography>
                <Typography variant="body2">
                  {movie.runtime ? `${movie.runtime} min` : "N/A"}
                </Typography>
              </Box>

              {/* Rating */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating
                  value={movie.vote_average ? movie.vote_average / 2 : 0}
                  precision={0.1} // Finer precision
                  readOnly
                  size="medium"
                  emptyIcon={
                    <StarIcon sx={{ color: "rgba(255,255,255,0.3)" }} />
                  }
                  icon={<StarIcon sx={{ color: "#f5c518" }} />} // Gold color for stars
                />
                <Typography variant="body1" sx={{ ml: 1.5 }}>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} /
                  10
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    ({movie.vote_count} votes)
                  </Typography>
                </Typography>
              </Box>

              {/* Overview */}
              <Typography
                variant="h6"
                sx={{ fontWeight: "medium", mt: 2, mb: 1 }}
              >
                Overview
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, maxWidth: "70ch" /* Limit line length */ }}
              >
                {movie.overview || "No overview available."}
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {trailerKey && (
                  <Button
                    variant="contained"
                    color="primary" // Use theme primary
                    startIcon={<PlayArrowIcon />}
                    // Use HTTPS for YouTube link
                    href={`https://www.youtube.com/watch?v=${trailerKey}`}
                    target="_blank" // Open in new tab
                    rel="noopener noreferrer" // Security best practice
                  >
                    Watch Trailer
                  </Button>
                )}
                {/* Add to Watchlist / Mark Watched Buttons (Requires state/backend) */}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.5)",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Add to Watchlist
                </Button>
                {/* <Button variant="outlined" startIcon={<CheckIcon />} sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>
                  Mark Watched
                </Button> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Cast Section */}
      {cast.length > 0 && (
        <Container maxWidth="lg" sx={{ my: { xs: 4, md: 6 } }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
            Top Cast
          </Typography>
          <Grid container spacing={2}>
            {cast.map((person) => (
              <Grid item xs={6} sm={4} md={2} key={person.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                  }}
                >
                  <Box
                    sx={{
                      height: { xs: 180, sm: 220, md: 250 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "grey.200",
                      overflow: "hidden",
                    }}
                  >
                    {person.profileUrl ? (
                      <Box
                        component="img"
                        src={person.profileUrl}
                        alt={person.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top center",
                        }}
                      />
                    ) : (
                      <PersonIcon sx={{ fontSize: 60, color: "grey.400" }} />
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                    {" "}
                    {/* Reduced padding */}
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      noWrap
                      gutterBottom
                    >
                      {person.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {person.character}
                    </Typography>
                  </CardContent>
                  {/* Optional: Link to actor's page */}
                  {/* <CardActions>
                      <Button size="small" onClick={() => history.push(`/person/${person.id}`)}>View Profile</Button>
                     </CardActions> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {/* Reviews Section - Optional, integrate with backend */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
            User Reviews
          </Typography>

          {/* Existing Reviews List */}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Paper
                key={review.id}
                sx={{ p: { xs: 2, md: 3 }, mb: 3, bgcolor: "background.paper" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                    {review.author.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.author}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Rating
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography
                        variant="caption"
                        sx={{ ml: 1, color: "text.secondary" }}
                      >
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ pl: { xs: 0, sm: 7 } /* Indent content */ }}
                >
                  {review.content}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography
              color="text.secondary"
              sx={{ textAlign: "center", fontStyle: "italic" }}
            >
              No reviews yet.
            </Typography>
          )}

          {/* Add Review Form */}
          <Paper
            sx={{ p: { xs: 2, md: 3 }, mt: 4, bgcolor: "background.paper" }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Write Your Review
            </Typography>
            <form onSubmit={handleReviewSubmit}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  component="legend"
                  variant="subtitle1"
                  sx={{ mb: 1 }}
                >
                  Your Rating *
                </Typography>
                <Rating
                  name="user-rating" // Add name for accessibility
                  value={userRating}
                  onChange={(event, newValue) => setUserRating(newValue)}
                  precision={0.5}
                  size="large"
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Review *"
                variant="outlined"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                sx={{ mb: 2 }}
                required // Add basic HTML validation
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={
                  submittingReview ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SendIcon />
                  )
                }
                disabled={
                  !reviewText.trim() || userRating === 0 || submittingReview
                }
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        // Use the Upcomming component, ensure its styling is consistent
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Upcomming items={similarMovies} title="You Might Also Like" />
        </Box>
      )}
    </Box>
  );
};

export default MoviePage;
