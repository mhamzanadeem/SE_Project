// src/components/api/movieApi.js

// Import the configured Axios instance we created earlier
import apiClient from './apiClient';

/**
 * Searches for movies via the backend using a POST request.
 * The backend expects the search term in the request body.
 *
 * @param {string} searchQuery - The search term entered by the user.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of movie objects found.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const searchMovies = async (searchQuery) => {
  // *** IMPORTANT: Confirm the exact key ('query' below) with your backend team. ***
  // It might be 'search', 'title', 'searchTerm', etc.
  const payload = {
    query: searchQuery
  };

  console.log('Sending search request to /movie/ with payload:', payload); // For debugging

  try {
    // Use apiClient.post and send the payload as the second argument
    // The base URL ('http://127.0.0.1:8000/api') is already set in apiClient
    const response = await apiClient.post('/movie/', payload);

    console.log('Received search response:', response.data); // For debugging

    // Assuming the backend returns an array of movie results directly in response.data
    return response.data;

  } catch (error) {
    // Log detailed error information
    console.error(
      'Error searching movies:',
      // Display error message from backend if available, otherwise Axios error message
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    // Re-throw the error so the component calling this function can handle it (e.g., show an error message to the user)
    throw new Error('Failed to fetch search results. Please try again.');
  }
};

/**
 * Fetches details for a specific movie from our backend using its ID.
 *
 * @param {number|string} movieId - The unique identifier (PK) of the movie.
 * @returns {Promise<object>} - A promise that resolves to the detailed movie object.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const getMovieDetails = async (movieId) => {
  console.log(`Requesting details for movie ID: ${movieId}`); // For debugging

  try {
    // Use apiClient.get with the specific movie endpoint URL
    // Example: If movieId is 123, this requests GET /api/movie/123/
    const response = await apiClient.get(`/movie/${movieId}/`);

    console.log('Received movie details response:', response.data); // For debugging

    // Assuming the backend returns the movie details object directly in response.data
    return response.data;

  } catch (error) {
    console.error(
      `Error fetching details for movie ${movieId}:`,
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    // Throw a user-friendly error message
    throw new Error('Failed to load movie details. Please try again.');
  }
};

// Add more movie-related API functions here if needed in the future.