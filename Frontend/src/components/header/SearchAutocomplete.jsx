// components/header/SearchAutocomplete.jsx

import React, { useState, useEffect } from "react";
import {
  TextField,
  CircularProgress,
  Autocomplete,
  Popper,
  Box,
  Typography,
  InputAdornment,
  useTheme, // Import useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// IMPORTANT: Replace with environment variable
const api_key = process.env.REACT_APP_TMDB_API_KEY || "YOUR_FALLBACK_API_KEY";
if (!process.env.REACT_APP_TMDB_API_KEY) {
  console.warn(
    "TMDB API Key not found in environment variables. Using fallback or potentially failing."
  );
}

const SearchAutocomplete = ({ onSearchSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme(); // Use theme for styling

  useEffect(() => {
    // Trim input and check length before fetching
    const trimmedInput = inputValue.trim();
    if (trimmedInput.length < 2) {
      // Require at least 2 characters
      setOptions([]);
      setLoading(false); // Ensure loading is off
      return;
    }

    setLoading(true);
    const controller = new AbortController();

    // Debounce API call
    const debounce = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
          trimmedInput // Use trimmed input for query
        )}&language=en-US&page=1&include_adult=false`, // Added language, page, adult filter
        { signal: controller.signal }
      )
        .then((response) => {
          if (!response.ok) {
            // Handle specific errors if possible (e.g., 401 Unauthorized, 404 Not Found)
            console.error(`API Error: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Filter results for minimal required data (poster, release date)
          const filtered = (data.results || []).filter(
            (movie) => movie.poster_path && movie.release_date
          );
          setOptions(filtered.slice(0, 7)); // Show slightly more options
        })
        .catch((err) => {
          // Don't log AbortError, it's expected
          if (err.name !== "AbortError") {
            console.error("Search Autocomplete Fetch Error:", err);
            setOptions([]); // Clear options on error
          }
        })
        .finally(() => setLoading(false));
    }, 300); // Slightly shorter debounce time

    // Cleanup function: clear timeout and abort fetch if component unmounts or input changes
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [inputValue]); // Depend only on inputValue

  return (
    <Autocomplete
      freeSolo // Allows searching for the exact text entered
      options={options}
      getOptionLabel={(option) =>
        // Handle both string input (freeSolo) and movie objects
        typeof option === "string" ? option : option.title || ""
      }
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        // If an option object is selected, use its title
        // If freeSolo text is submitted (newValue is string), use the string
        const query = typeof newValue === "string" ? newValue : newValue?.title;
        if (query && query.trim()) {
          onSearchSelect(query.trim()); // Call the handler passed via props
          // Consider clearing input after selection/search:
          // setInputValue("");
          // setOptions([]);
        }
      }}
      loading={loading}
      loadingText="Loading..."
      noOptionsText={
        inputValue.length < 2 ? "Type to search..." : "No movies found"
      }
      // Custom Popper for better styling control
      PopperComponent={(popperProps) => (
        <Popper
          {...popperProps}
          sx={{
            // Ensure suggestions appear above other elements like AppBar
            zIndex: theme.zIndex.modal + 1,
            "& .MuiPaper-root": {
              // Style the dropdown paper
              borderRadius: theme.shape.borderRadius,
              marginTop: "4px", // Add some space below the input
              boxShadow: theme.shadows[4],
              // Use theme colors for background and text
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            },
          }}
        />
      )}
      // Render custom option layout
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.id} // Essential for list rendering
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            py: 1,
            px: 2,
            // Add hover effect using theme colors
            "&:hover": {
              bgcolor: theme.palette.action.hover,
            },
            // Add divider (optional)
            // borderBottom: `1px solid ${theme.palette.divider}`,
            // '&:last-child': { borderBottom: 'none' },
          }}
        >
          <img
            loading="lazy" // Lazy load images
            src={
              option.poster_path
                ? `https://image.tmdb.org/t/p/w92${option.poster_path}`
                : // Provide a theme-aware placeholder or use MUI Avatar
                  `https://via.placeholder.com/40x60/${
                    theme.palette.mode === "dark" ? "333/666" : "ccc/999"
                  }?text=N/A`
            }
            alt={`${option.title} poster`} // More descriptive alt text
            style={{
              width: 40,
              height: 60,
              objectFit: "cover",
              borderRadius: theme.shape.borderRadius / 2, // Smaller radius for image
              flexShrink: 0, // Prevent image shrinking
            }}
          />
          <Box sx={{ overflow: "hidden" }}>
            {" "}
            {/* Prevent text overflow */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }} // Prevent title wrap
            >
              {option.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* Safely access year, provide fallback */}
              {option.release_date ? option.release_date.split("-")[0] : "N/A"}
            </Typography>
          </Box>
        </Box>
      )}
      // Render the input field
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          placeholder="Search movies..."
          variant="outlined"
          size="small" // Use smaller size consistent with header
          sx={{
            // Inherit width from parent Box in Header
            "& .MuiOutlinedInput-root": {
              borderRadius: theme.shape.borderRadius, // Consistent radius
              // Use theme colors for background and text
              bgcolor: theme.palette.background.paper, // Use paper background for contrast
              color: theme.palette.text.primary,
              // Adjust padding if needed
              // paddingRight: '10px !important', // Example override if needed for loading icon space

              "& fieldset": {
                // Optional: customize border
                // borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                // Optional: customize hover border
                // borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                // Optional: customize focus border
                // borderColor: theme.palette.primary.dark,
              },
            },
            // Style placeholder text
            "& .MuiInputBase-input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },
          }}
          InputProps={{
            ...params.InputProps,
            // Add search icon at the start
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
            // Keep loading indicator at the end
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
                ) : null}
                {/* This part is needed to render the clear button etc. */}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchAutocomplete;
