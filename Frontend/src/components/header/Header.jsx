import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { Menu as MenuIcon, Search, Notifications } from "@mui/icons-material";

// Custom Search Autocomplete Component
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
          // Only include movies with a poster and release date
          const filtered = data.results.filter(
            (movie) => movie.poster_path && movie.release_date
          );
          // Limit to top 5 suggestions
          setOptions(filtered.slice(0, 5));
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
      ListboxProps={{
        style: {
          // Each option is approx 56px tall; if fewer than 5 options, set height accordingly.
          maxHeight: `${Math.min(options.length, 5) * 56}px`,
          overflow: "hidden",
          backgroundColor: "#fafafa",
          borderRadius: "4px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
        },
      }}
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

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const history = useHistory();

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "API", path: "/api" },
  ];

  const handleSearchSelect = (query) => {
    if (query.trim()) {
      history.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <AppBar position="static" sx={{ background: "#000" }}>
      <Toolbar sx={{ justifyContent: "space-between", py: 1.5 }}>
        {/* Left: Logo and Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="./images/logo.png" alt="Logo" width={120} />
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 3 }}>
            {navLinks.map((item) => (
              <Button
                key={item.title}
                component={Link}
                to={item.path}
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  fontSize: "1rem",
                  background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -4,
                      width: "100%",
                      height: "2px",
                      background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                    },
                  },
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Right: Search Autocomplete, Icons, and Authentication */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Autocomplete Search Bar for sm and up */}
          <Box sx={{ mr: 2, display: { xs: "none", sm: "block" } }}>
            <SearchAutocomplete onSearchSelect={handleSearchSelect} />
          </Box>
          {/* Mobile: Show a search icon if full search bar is hidden */}
          <IconButton
            color="inherit"
            sx={{
              display: { xs: "block", sm: "none" },
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.1)", color: "#ff4b2b" },
            }}
            onClick={() => {
              const query = prompt("Search Movies:");
              if (query && query.trim()) {
                handleSearchSelect(query);
              }
            }}
          >
            <Search />
          </IconButton>
          <IconButton
            color="inherit"
            sx={{
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.1)", color: "#ff4b2b" },
            }}
          >
            <Notifications />
          </IconButton>
          <SignedOut>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              sx={{
                bgcolor: "#e50813",
                ml: 2,
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              component={Link}
              to="/profile"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
                fontSize: "1rem",
                background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                transition: "all 0.3s ease",
                mr: 2,
                "&:hover": {
                  transform: "translateY(-3px)",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -4,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                  },
                },
              }}
            >
              Profile
            </Button>
            <UserButton />
          </SignedIn>
          <IconButton
            color="inherit"
            edge="end"
            sx={{
              display: { md: "none" },
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.1)", color: "#ff4b2b" },
            }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <List sx={{ width: 200 }}>
          {navLinks.map((item) => (
            <ListItem
              button
              key={item.title}
              component={Link}
              to={item.path}
              onClick={toggleDrawer}
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  "& .MuiListItemText-primary": { color: "#ff4b2b" },
                },
              }}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
