import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/api" component={API} />
            <Route path="/auth/signup" component={SignUpPage} />
            <Route path="/auth/" component={AuthPage} />
            <Route path="/search" component={SearchResultsPage} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
