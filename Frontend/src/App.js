// src/App.js
import React from "react";

// Added Box and Typography imports
import { CssBaseline, Box, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Page/Component Imports
import HomePage from "./home/HomePage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import API from "./components/API";
import AuthPage from "./pages/AuthPage";
import SignUpPage from "./pages/SignUpPage";
import SearchResultsPage from "./components/searchresults/SearchResultsPage";
import Profile from "./components/profile/Profile";
import MoviePage from "./components/movie/MoviePage";

// No separate Layout component needed if Header includes the main content area


function App() {
  return (
    <Router>
      <CssBaseline />
      {/*
        The teammate's Header now wraps the main content structure (Sidebar + Main Area).
        We pass the specific page component to Header based on the route.
      */}
      <Switch>
        {/* Authentication routes might not use the main Header */}
        <Route path="/auth/signup" component={SignUpPage} />
        <Route path="/auth" component={AuthPage} />

        {/* Routes that use the main Header/Sidebar layout */}
        <Route path="/">
          {" "}
          {/* Catch-all for routes using the Header */}
          <Header>
            {" "}
            {/* Pass children to Header */}
            <Switch>
              {" "}
              {/* Nested Switch to determine content inside Header's main area */}
              <Route exact path="/" component={HomePage} />
              <Route path="/api" component={API} />
              <Route path="/search" component={SearchResultsPage} />
              <Route path="/profile" component={Profile} />
              <Route path="/movie/:id" component={MoviePage} />
              <Route path="/history">
                {" "}
                {/* Example History Route */}
                {/* Now Box and Typography can be used */}
                <Box sx={{ p: 3 }}>
                  <Typography>History Page Content</Typography>
                </Box>
              </Route>
              <Route path="/notifications">
                {" "}
                {/* Example Notifications Route */}
                {/* Now Box and Typography can be used */}
                <Box sx={{ p: 3 }}>
                  <Typography>Notifications Page Content</Typography>
                </Box>
              </Route>
              {/* Add other routes managed by Header here */}
            </Switch>
          </Header>
        </Route>
      </Switch>
      <Footer /> {/* Render the fixed footer */}
    </Router>
  );
}

export default App;
