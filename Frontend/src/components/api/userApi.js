// src/components/api/userApi.js

import apiClient from './apiClient';

/**
 * Registers a new user.
 * Corresponds to POST /api/user/
 *
 * @param {object} userData - Object containing user registration details.
 * @param {string} userData.username - The desired username.
 * @param {string} userData.password - The desired password.
 * @param {string} [userData.email] - The user's email (if required).
 * @param {string} [userData.first_name] - User's first name (if required).
 * @param {string} [userData.last_name] - User's last name (if required).
 * @returns {Promise<object>} - A promise that resolves to the newly created user object (or confirmation).
 * @throws {Error} - Throws an error if registration fails (e.g., username taken).
 */
export const registerUser = async (userData) => {
  // Concatenate first_name and last_name to create the 'name' field
  const name = `${userData.fname} ${userData.lname}`;
  console.log(name)
  // Updated payload with concatenated name
  const payload = {
    username: userData.username,
    password: userData.password,
    email: userData.email,
    name: name,  // Concatenate first and last name to a single field
  };

  console.log('Attempting user registration at /user/ with payload:', payload); // For debugging

  try {
    const response = await apiClient.post('/user/', payload);
    console.log('User registration successful:', response.data); // For debugging
    return response.data;
  } catch (error) {
    console.error(
      'Error registering user:',
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    const errorMessage = error.response?.data?.username?.[0] || 
                         error.response?.data?.password?.[0] || 
                         error.response?.data?.detail ||
                         'Registration failed. Please check your input and try again.';
    throw new Error(errorMessage);
  }
};

/**
 * Logs in a user.
 * *** PLACEHOLDER - Endpoint URL needs confirmation ***
 *
 * @param {object} credentials - User credentials.
 * @param {string} credentials.username - The username.
 * @param {string} credentials.password - The password.
 * @returns {Promise<object>} - A promise resolving to login response data (often includes auth token).
 * @throws {Error} - Throws an error if login fails.
 */
export const loginUser = async (credentials) => {
  const loginEndpoint = '/auth/login/';

  console.log(`Attempting login to ${loginEndpoint} for user:`, credentials.username);

  try {
    const response = await apiClient.post(loginEndpoint, {
      username: credentials.username,
      password: credentials.password,
    });
    
    // Check the response structure, store the token if it exists
    if (response.data.access) {
      localStorage.setItem('authToken', response.data.access);
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }
    }

    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error logging in:',
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    const errorMessage = error.response?.data?.detail || 'Login failed. Please check username and password.';
    throw new Error(errorMessage);

  }
};

/**
 * Logs out a user.
 * *** PLACEHOLDER - Endpoint URL needs confirmation ***
 * Often requires sending the refresh token or just hitting the endpoint while authenticated.
 *
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const logoutUser = async () => {
  const logoutEndpoint = '/auth/logout/'; // <-- !! CONFIRM THIS !!

  console.log(`Attempting logout from ${logoutEndpoint}`); // For debugging

  try {
    await apiClient.post(logoutEndpoint, {}); // Payload might be needed e.g. { "refresh": "token..." }
    console.log('Logout successful'); // For debugging
  } catch (error) {
    console.error(
      'Error logging out:',
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    throw new Error('Logout failed.');
  }
};

/**
 * Fetches the profile of the currently authenticated user.
 * *** PLACEHOLDER - Endpoint URL needs confirmation ***
 *
 * @returns {Promise<object>} - A promise resolving to the current user's profile data.
 * @throws {Error} - Throws an error if fetching fails (e.g., not authenticated).
 */
export const getCurrentUserProfile = async () => {
  const profileEndpoint = '/user/me/'; // <-- !! CONFIRM THIS !! (Maybe it's just /api/user/ ?)

  console.log(`Fetching current user profile from ${profileEndpoint}`); // For debugging

  try {
    const response = await apiClient.get(profileEndpoint);
    console.log('Fetched current user profile:', response.data); // For debugging
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching user profile:',
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    throw new Error('Failed to load user profile.');
  }
};

/**
 * Fetches profile details for ANY user, given their ID.
 * Corresponds to GET /api/user/<pk>/
 *
 * @param {number|string} userId - The ID of the user profile to fetch.
 * @returns {Promise<object>} - A promise resolving to the user's profile data.
 * @throws {Error} - Throws an error if fetching fails.
 */
export const getUserProfileById = async (userId) => {
  console.log(`Fetching profile for user ID: ${userId}`); // For debugging
  try {
    const response = await apiClient.get(`/user/${userId}/`);
    console.log(`Fetched profile for user ${userId}:`, response.data); // For debugging
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching profile for user ${userId}:`,
      error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : error.message
    );
    throw new Error('Failed to load user profile.');
  }
};

// Add functions for updating user profile (PUT/PATCH /user/<pk>/) if needed.
