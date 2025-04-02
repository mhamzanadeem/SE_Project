import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider, PUBLISHABLE_KEY } from "./clerkConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ClerkProvider>
);
