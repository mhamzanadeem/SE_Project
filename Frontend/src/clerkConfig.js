import { ClerkProvider } from "@clerk/clerk-react";

console.log("All ENV Variables:", process.env); // Debugging

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

console.log("Clerk Publishable Key:", PUBLISHABLE_KEY); // Debugging

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Check your .env file.");
}

export { ClerkProvider, PUBLISHABLE_KEY };
