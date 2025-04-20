// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Assuming clerkConfig.js correctly exports ClerkProvider and sets up the key
import { ClerkProvider } from "./clerkConfig";
import { ThemeProvider } from "./theme/ThemeProvider"; // Import your custom ThemeProvider

// Ensure the Clerk Publishable Key is loaded correctly, potentially via clerkConfig.js
// const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
// if (!clerkPubKey) {
//  throw new Error("Missing Clerk Publishable Key");
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // ClerkProvider should ideally wrap ThemeProvider if theme depends on auth state,
  // or vice-versa if auth components need the theme. Choose the order that makes sense.
  // Wrapping ThemeProvider first is common.
  <React.StrictMode>
    <ThemeProvider>
      {" "}
      {/* Your custom ThemeProvider */}
      <ClerkProvider>
        {" "}
        {/* ClerkProvider from clerkConfig */}
        <App />
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
);
