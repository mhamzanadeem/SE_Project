import React, { useState, useEffect } from "react";
import {
  TextField,
  CircularProgress,
  Autocomplete,
  Popper,
  Box,
  Typography,
} from "@mui/material";

const SearchAutocomplete = ({ onSearchSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const api_key = "bad64aad7360bfd1615d7eea5599e286";

  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setOptions([]);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const debounce = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
          inputValue
        )}`,
        { signal: controller.signal }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Filter out movies without a poster or release date
          const filtered = data.results.filter(
            (movie) => movie.poster_path && movie.release_date
          );
          setOptions(filtered.slice(0, 5)); // Limit to top 5 suggestions
        })
        .catch((err) => {
          if (err.name !== "AbortError") console.error(err);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [inputValue, api_key]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.title || ""}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={(event, newValue) => {
        if (newValue && newValue.title) {
          onSearchSelect(newValue.title);
        }
      }}
      loading={loading}
      PopperComponent={(popperProps) => (
        <Popper
          {...popperProps}
          sx={{
            zIndex: 1300,
            "& .MuiPaper-root": {
              // Remove any fixed height to allow auto-sizing
              maxHeight: "none",
              overflowY: "visible",
              backgroundColor: "#fafafa",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            py: 1,
            px: 2,
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #e0e0e0",
            "&:last-child": { borderBottom: "none" },
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w92${option.poster_path}`}
            alt={option.title}
            style={{
              width: 50,
              height: "auto",
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              {option.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {option.release_date}
            </Typography>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Movies..."
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "#fff",
            width: "250px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
            },
          }}
          InputProps={{
            ...params.InputProps,
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "4px",
              },
            },
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{ width: "250px" }}
    />
  );
};

export default SearchAutocomplete;
