import apiClient from './apiClient';

// Function to fetch all comments for a movie (GET)
export const fetchComments = async (movieId) => {
  try {
    const response = await apiClient.get(`/comment/?movie=${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Function to post a new comment (POST)
export const postComment = async (movieId, commentData) => {
  try {
    const response = await apiClient.post('/comment/', {
      movie: movieId,
      text: commentData.text,
      author: commentData.author,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
};

// Function to update an existing comment (PUT)
export const updateComment = async (commentId, updatedData) => {
  try {
    const response = await apiClient.put(`/comment/${commentId}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// Function to delete a comment (DELETE)
export const deleteComment = async (commentId) => {
  try {
    await apiClient.delete(`/comment/${commentId}/`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

