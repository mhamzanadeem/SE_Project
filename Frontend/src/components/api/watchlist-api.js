import apiClient from "./api-client";

// Get all watchlist movies for a user
export const getWatchlist = async (userId) => {
  try {
    const response = await apiClient.get(`/watchlist/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

// Add a movie to a user's watchlist
export const addToWatchlist = async (userId, movieId) => {
  try {
    const response = await apiClient.post(`/watchlist/`, {
      userId,
      movieId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

// Remove a movie from a user's watchlist
export const removeFromWatchlist = async (movieId) => {
  try {
    const response = await apiClient.delete(`/watchlist/${movieId}/`);
    return response.data;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
};

// Check if a movie is already in a user's watchlist
export const isInWatchlist = async (userId, movieId) => {
  try {
    const response = await apiClient.get(`/watchlist/${userId}/${movieId}/`);
    return response.data; // true or false
  } catch (error) {
    console.error("Error checking watchlist status:", error);
    throw error;
  }
};
