// components/header/AdvancedSearch.jsx
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Tabs,
  Tab,
  Typography,
  Autocomplete,
  CircularProgress,
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Movie as MovieIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";

// IMPORTANT: Replace with environment variable
const api_key = process.env.REACT_APP_TMDB_API_KEY || "YOUR_FALLBACK_API_KEY";
if (!process.env.REACT_APP_TMDB_API_KEY) {
  console.warn(
    "TMDB API Key not found in environment variables (AdvancedSearch)."
  );
}

const AdvancedSearch = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0); // Default to movie search tab
  const [movieQuery, setMovieQuery] = useState("");
  const [personQuery, setPersonQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [movieOptions, setMovieOptions] = useState([]);
  const [personOptions, setPersonOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]); // Fetched on mount

  const [movieLoading, setMovieLoading] = useState(false);
  const [personLoading, setPersonLoading] = useState(false);
  const [genreLoading, setGenreLoading] = useState(false); // For genre fetch

  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch genre list on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      setGenreLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGenreOptions(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenreOptions([]); // Set empty on error
      } finally {
        setGenreLoading(false);
      }
    };
    fetchGenres();
  }, []); // Fetch only once

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Optionally reset inputs when switching tabs
    // setMovieQuery(""); setMovieOptions([]); setMovieLoading(false);
    // setPersonQuery(""); setPersonOptions([]); setPersonLoading(false);
    // setSelectedGenres([]);
  };

  // Debounced Movie Search
  useEffect(() => {
    const trimmedInput = movieQuery.trim();
    if (trimmedInput.length < 2) {
      setMovieOptions([]);
      setMovieLoading(false);
      return;
    }
    setMovieLoading(true);
    const controller = new AbortController();
    const debounce = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
          trimmedInput
        )}&language=en-US&page=1&include_adult=false`,
        { signal: controller.signal }
      )
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response.status)
        )
        .then((data) => setMovieOptions((data.results || []).slice(0, 7)))
        .catch(
          (err) =>
            err.name !== "AbortError" &&
            console.error("Movie search error:", err)
        )
        .finally(() => setMovieLoading(false));
    }, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [movieQuery]);

  // Debounced Person Search
  useEffect(() => {
    const trimmedInput = personQuery.trim();
    if (trimmedInput.length < 2) {
      setPersonOptions([]);
      setPersonLoading(false);
      return;
    }
    setPersonLoading(true);
    const controller = new AbortController();
    const debounce = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${api_key}&query=${encodeURIComponent(
          trimmedInput
        )}&language=en-US&page=1&include_adult=false`,
        { signal: controller.signal }
      )
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response.status)
        )
        .then((data) =>
          setPersonOptions(
            (data.results || []).filter((p) => p.profile_path).slice(0, 7)
          )
        ) // Filter people with profile pics
        .catch(
          (err) =>
            err.name !== "AbortError" &&
            console.error("Person search error:", err)
        )
        .finally(() => setPersonLoading(false));
    }, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [personQuery]);

  // --- Navigation Handlers ---

  // Navigate to selected movie's detail page
  const handleMovieSelect = (movie) => {
    if (movie?.id) {
      onClose(); // Close the dialog
      history.push(`/movie/${movie.id}`);
    }
  };

  // Navigate to search results page filtered by selected person
  const handlePersonSelect = (person) => {
    if (person?.id) {
      onClose(); // Close the dialog
      history.push(
        `/search?person=${person.id}&name=${encodeURIComponent(person.name)}`
      );
    }
  };

  // Navigate to search results page filtered by selected genres
  const handleGenreSearch = () => {
    if (selectedGenres.length > 0) {
      onClose(); // Close the dialog
      const genreIds = selectedGenres.map((g) => g.id).join(",");
      const genreNames = selectedGenres.map((g) => g.name).join(", ");
      history.push(
        `/search?genres=${genreIds}&names=${encodeURIComponent(genreNames)}`
      );
    }
  };

  // Render Autocomplete Option (Generic for Movie/Person)
  const renderOption = (props, option, type) => (
    <Box
      component="li"
      {...props}
      key={option.id}
      sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1, px: 2 }}
    >
      <img
        loading="lazy"
        src={
          type === "movie"
            ? option.poster_path
              ? `https://image.tmdb.org/t/p/w92${option.poster_path}`
              : `https://via.placeholder.com/40x60/${
                  theme.palette.mode === "dark" ? "333/666" : "ccc/999"
                }?text=N/A`
            : option.profile_path
            ? `https://image.tmdb.org/t/p/w92${option.profile_path}`
            : `https://via.placeholder.com/40x60/${
                theme.palette.mode === "dark" ? "333/666" : "ccc/999"
              }?text=N/A`
        }
        alt={
          type === "movie" ? `${option.title} poster` : `${option.name} profile`
        }
        style={{
          width: 40,
          height: 60,
          objectFit: "cover",
          borderRadius: 4,
          flexShrink: 0,
        }}
      />
      <Box sx={{ overflow: "hidden" }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {type === "movie" ? option.title : option.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type === "movie"
            ? option.release_date
              ? option.release_date.split("-")[0]
              : "N/A"
            : option.known_for_department || ""}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: "background.paper",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          py: 1.5,
          px: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Advanced Search
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="advanced search tabs"
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: "divider", flexShrink: 0 }}
      >
        <Tab icon={<MovieIcon />} iconPosition="start" label="Movie Title" />
        <Tab icon={<PersonIcon />} iconPosition="start" label="Person" />
        <Tab icon={<CategoryIcon />} iconPosition="start" label="Genres" />
      </Tabs>

      {/* Dialog Content (Scrollable) */}
      <DialogContent sx={{ pt: 3, flexGrow: 1, overflowY: "auto" }}>
        {/* Movie Search Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0}>
          {tabValue === 0 && (
            <Autocomplete
              options={movieOptions}
              getOptionLabel={(option) => option.title || ""}
              onInputChange={(event, newValue) => setMovieQuery(newValue)}
              onChange={(event, newValue) => handleMovieSelect(newValue)}
              loading={movieLoading}
              loadingText="Loading movies..."
              noOptionsText={
                movieQuery.length < 2 ? "Type 2+ characters" : "No movies found"
              }
              renderOption={(props, option) =>
                renderOption(props, option, "movie")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Search by Movie Title"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {movieLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          )}
        </Box>

        {/* Person Search Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1}>
          {tabValue === 1 && (
            <Autocomplete
              options={personOptions}
              getOptionLabel={(option) => option.name || ""}
              onInputChange={(event, newValue) => setPersonQuery(newValue)}
              onChange={(event, newValue) => handlePersonSelect(newValue)}
              loading={personLoading}
              loadingText="Loading people..."
              noOptionsText={
                personQuery.length < 2
                  ? "Type 2+ characters"
                  : "No people found"
              }
              renderOption={(props, option) =>
                renderOption(props, option, "person")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Search by Person Name"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {personLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          )}
        </Box>

        {/* Genre Search Tab */}
        <Box role="tabpanel" hidden={tabValue !== 2}>
          {tabValue === 2 && (
            <>
              <Autocomplete
                multiple
                options={genreOptions}
                loading={genreLoading} // Show loading while fetching genres
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={selectedGenres}
                onChange={(event, newValue) => setSelectedGenres(newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      key={option.id}
                      size="small"
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Movie Genres"
                    placeholder={
                      selectedGenres.length === 0
                        ? "Select one or more genres..."
                        : ""
                    }
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {genreLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: "center" }}
              >
                Click 'Search by Genre' below after making selections.
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions
        sx={{ p: 2, borderTop: 1, borderColor: "divider", flexShrink: 0 }}
      >
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        {/* Show Search button only for Genre tab */}
        {tabValue === 2 && (
          <Button
            onClick={handleGenreSearch}
            variant="contained"
            color="primary"
            disabled={selectedGenres.length === 0} // Disable if no genres selected
            startIcon={<SearchIcon />}
          >
            Search by Genre
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AdvancedSearch;
