import React from "react";
import TestAuth from './components/TestAuth';

import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import HomePage from "./home/HomePage.jsx";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import API from "./components/API";
import AuthPage from "./pages/AuthPage";
import SignUpPage from "./pages/SignUpPage";
import SearchResultsPage from "./components/searchresults/SearchResultsPage";
import Profile from "./components/profile/Profile";

const Layout = ({ children }) => {
  const location = useLocation();
  // Hide header/footer for auth routes
  const hideLayout = location.pathname.startsWith("/auth");
  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};


function App() {
  return (
    <Router>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/api" component={API} />
          <Route path="/auth/signup" component={SignUpPage} />
          <Route path="/auth/" component={AuthPage} />
          <Route path="/search" component={SearchResultsPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/test-auth" component={TestAuth} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
