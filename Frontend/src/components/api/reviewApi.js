// src/components/api/reviewApi.js

// Import the configured Axios instance
import apiClient from './apiClient';

/**
 * Fetches reviews/comments for a specific movie.
 * Assumes the backend supports filtering comments by movie ID via a query parameter.
 *
 * @param {number|string} movieId - The unique identifier (PK) of the movie whose reviews are needed.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of review/comment objects.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const getMovieReviews = async (movieId) => {
  // *** IMPORTANT: Confirm the query parameter name ('movie' below) with your backend team. ***
  // It might be 'movie_id', 'movieId', 'post', etc., depending on the backend setup.
  const params = {
    movie: movieId // Send movieId as a query parameter for filtering
  };

  console.log(`Requesting reviews for movie ID: ${movieId} using params:`, params); // For debugging

  try {
    // Use apiClient.get for the base comment endpoint, passing the params object
    // Axios will correctly format this into a query string like /api/comment/?movie=123
    const response = await apiClient.get('/comment/', { params });

    console.log('Received movie reviews response:', response.data); // For debugging

    // Assuming the backend returns an array of review objects
    return response.data;

  } catch (error) {
    console.error(
      `Error fetching reviews for movie ${movieId}:`,
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    throw new Error('Failed to load reviews. Please try again.');
  }
};

/**
 * Posts a new review/comment for a specific movie.
 *
 * @param {object} reviewData - An object containing the review details.
 * @param {number|string} reviewData.movie - The ID of the movie being reviewed.
 * @param {number} reviewData.rating - The rating given (e.g., 1-5).
 * @param {string} reviewData.text - The text content of the review.
 * @param {number|string} [reviewData.user] - The ID of the user posting the review (if required by backend). Backend might infer this from authentication.
 * @returns {Promise<object>} - A promise that resolves to the newly created review/comment object.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const postReview = async (reviewData) => {
  // *** IMPORTANT: Confirm the exact payload structure expected by the backend. ***
  // Ensure keys like 'movie', 'rating', 'text', 'user' match the Django Serializer fields.
  // The backend might automatically associate the logged-in user, so 'user' might not be needed here.
  const payload = {
    movie: reviewData.movie,   // Make sure this key matches backend expectation
    rating: reviewData.rating, // Make sure this key matches backend expectation
    text: reviewData.text,     // Make sure this key matches backend expectation
    // user: reviewData.user, // Include if backend requires user ID explicitly in payload
  };

  console.log('Posting new review to /comment/ with payload:', payload); // For debugging

  try {
    // Use apiClient.post to send the new review data
    const response = await apiClient.post('/comment/', payload);

    console.log('Received post review response:', response.data); // For debugging

    // Assuming the backend returns the newly created review object
    return response.data;

  } catch (error) {
    console.error(
      'Error posting review:',
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    // Provide specific feedback if possible (e.g., validation errors from response.data)
    const errorMessage = error.response?.data?.detail || 'Failed to submit review. Please try again.';
    throw new Error(errorMessage);
  }
};

/**
 * Deletes a specific review/comment.
 *
 * @param {number|string} reviewId - The unique identifier (PK) of the review to delete.
 * @returns {Promise<void>} - A promise that resolves when deletion is successful.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const deleteReview = async (reviewId) => {
  console.log(`Requesting deletion of review ID: ${reviewId}`); // For debugging

  try {
    // Use apiClient.delete for the specific comment endpoint URL
    // Example: If reviewId is 45, this requests DELETE /api/comment/45/
    // DELETE requests typically don't have a request body.
    // A successful DELETE usually returns a 204 No Content status.
    await apiClient.delete(`/comment/${reviewId}/`);

    console.log(`Successfully deleted review ID: ${reviewId}`); // For debugging

    // No data is usually returned on successful deletion (204 status)
    return; // Indicate success

  } catch (error) {
    console.error(
      `Error deleting review ${reviewId}:`,
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    throw new Error('Failed to delete review. Please try again.');
  }
};


// Add functions for updating reviews here if needed (e.g., using PUT or PATCH on /comment/<reviewId>/)