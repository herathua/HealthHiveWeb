import axios from 'axios';

const BASE_URL = 'http://localhost:33000/api';
const cachingKey = 'cachedLabData';

// Function to fetch lab data
export const fetchLabData = async (labId) => {
    const cachedData = localStorage.getItem(cachingKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    } else {
        const response = await axios.get(`${BASE_URL}/labs/${labId}`);
        const data = response.data;
        localStorage.setItem(cachingKey, JSON.stringify(data));
        return data;
    }
};

// Function to update lab data
export const updateLabData = async (labId, newData, authToken) => {
    try {
        // Make API call to update lab data
        localStorage.removeItem(cachingKey);
        return newData; // Return updated data or handle response as needed
    } catch (error) {
        throw new Error('Error updating lab information');
    }
};
export const fetchLabInfo = async (labId) => {
    try {
      const response = await axios.get(`${BASE_URL}/labs/${labId}`);
      return response.data;
    } catch (error) {
      console.error("There was an error fetching the lab information: ", error);
      throw error;
    }
  };
  // Function to delete user account
export const deleteUserAccount = async (userId, authToken) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return response.data; // Return response data if needed
    } catch (error) {
      throw error; // Throw error for handling in component
    }
  };