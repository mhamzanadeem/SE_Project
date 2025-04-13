// src/clerkConfig.js
import { ClerkProvider as ReactClerkProvider } from "@clerk/clerk-react";

console.log("All ENV Variables:", process.env); // Debugging

// IMPORTANT: Ensure your .env file has REACT_APP_CLERK_PUBLISHABLE_KEY defined
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

console.log("Clerk Publishable Key:", PUBLISHABLE_KEY); // Debugging

if (!PUBLISHABLE_KEY) {
  // Provide a more helpful error message
  console.error("Missing Clerk Publishable Key.");
  console.error(
    "Please ensure REACT_APP_CLERK_PUBLISHABLE_KEY is set in your environment variables (e.g., .env file)."
  );
  // Optionally throw an error, or allow the app to load with a warning
  // throw new Error("Missing Clerk Publishable Key. Check your environment variables.");
}

// Re-export ClerkProvider with the key automatically included
// You might need to adjust this if you pass other props to ClerkProvider
const ClerkProvider = ({ children }) => {
  if (!PUBLISHABLE_KEY) {
    // Render children without Clerk if key is missing, or show an error component
    return (
      <>
        <div
          style={{
            color: "red",
            padding: "20px",
            border: "1px solid red",
            margin: "20px",
          }}
        >
          Clerk Publishable Key is missing. Authentication features will not
          work. Please set REACT_APP_CLERK_PUBLISHABLE_KEY.
        </div>
        {children}
      </>
    );
  }
  // Pass navigation functions if using react-router
  // import { useHistory } from 'react-router-dom';
  // const history = useHistory();
  // const navigate = (to) => history.push(to);

  return (
    <ReactClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      // navigate={navigate} // Uncomment if using react-router v5
      // Add other ClerkProvider props here if needed
    >
      {children}
    </ReactClerkProvider>
  );
};

export { ClerkProvider };
// No need to export PUBLISHABLE_KEY separately if ClerkProvider handles it.
