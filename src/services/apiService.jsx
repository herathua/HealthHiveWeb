import axios from 'axios';

const BASE_URL = 'http://localhost:33000/api';
const cachingKey = 'cachedLabData';
const labId = 1;
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
export const fetchLabInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/labs/${labId}`);
    console.log('Lab data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the lab information: ", error);
    throw error;
  }
};

export const fetchLabRequestsByLabId = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/labRequests/lab/${labId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lab requests:', error);
    throw error;
  }
};

export const fetchUserName = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data.fullName;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};

export const fetchUserDataByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};

export const UplodeFileToIPFS = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${BASE_URL}/ipfs/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const handleLabDataUploadinAPI = async (labRequestId, description) => {
  try {
    const response = await axios.post(`${BASE_URL}/labDataUploads`, {
      description,
      labRequest: labRequestId,
    });
    return response.data;
  } catch (error) {
    console.error('Error handling lab data upload:', error);
    return null;
  }
};

export const handleFileMetadatainAPI = async (fileName, fileType, filePath, createdDate, labDataUploadId) => {
  try {
    const response = await axios.post(`${BASE_URL}/files`, {
      name: fileName,
      type: fileType,
      filePath,
      createdDate,
      labDataUpload: labDataUploadId,
    });
    console.log('File metadata uploaded:', response.data);
  } catch (error) {
    console.error('Error handling file metadata:', error);
  }
};

export const checkUploadStatusInAPI = async (labRequestId) => {
  try {
    const response = await axios.get(`${BASE_URL}/labDataUploads/lab/${labRequestId}`);
    return response.data;
  } catch (error) {
    return null;
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
export const PutLabdata = async (lab) => {
  try {
    console.log(`Sending PUT request to ${BASE_URL}/labs/${labId} with data:`, lab); // Debug log
    const response = await axios.put(`${BASE_URL}/labs/${labId}`, lab);
    console.log('Lab data updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating lab data:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    console.log('User logged in:', response.data);
    return response.data; // This should contain the token
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


export const deleteAccount = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${labId}`, {
    });
    console.log('Account deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};
export const updatePassword = async (password) => {
  try {
    // Fetching lab info asynchronously
    const data = await fetchLabInfo();
    const email = data.email;

    // Making the axios POST request
    const response = await axios.put(`${BASE_URL}/users/login`, {
      email,
      password,
    });

    console.log('Password updated successfully:', response.data, "email :", email, "password:", password);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};