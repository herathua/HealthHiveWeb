import axios from 'axios';
import Cookies from 'js-cookie';
//localhost:33000
//const BASE_URL = 'http://13.202.67.81:10000/usermgtapi/api';
const BASE_URL = 'http://localhost:33000/api';
// const KEYCLOAK_LOGOUT_URL ='http://keycloak-hh:8080/realms/Health-Hive/protocol/openid-connect/logout';
//https://lemur-1.cloud-iam.com/auth/admin/healthhivelk/console/
const KEYCLOAK_LOGOUT_URL = 'https://lemur-14.cloud-iam.com/auth/realms/teamnovauom/protocol/openid-connect/logout';
const cachingKey = 'cachedLabData';
const userId = '60038a45-147a-48ef-866b-5bda9beb245f';
//let labId = getEmailFromToken(authToken); // Get lab ID from token
let labId = localStorage.getItem('labId') || null;
let authToken = null; // Variable to store the authentication token
let refreshToken = null; // Variable to store the refresh token

const initializeTokensFromCookies = () => {
  authToken = Cookies.get('authToken');
  refreshToken = Cookies.get('refreshToken');
  console.log('Initialized tokens from cookies');
};

// Call this function when the app starts
initializeTokensFromCookies();

export const GetToken = async (email, password) => {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('myclient:L3EAIPntMBOoVJYfc0p1gM4PpIIwcqrL')
    };

    const data = new URLSearchParams({
      'client_id': 'Health-Hive-Client',
      'grant_type': 'password',
      //'client_secret': 'L3EAIPntMBOoVJYfc0p1gM4PpIIwcqrL',
      'username': email,
      'password': password
    }).toString();

    // const response = await axios.post("http://localhost:8080/realms/Health-Hive/protocol/openid-connect/token", data, { headers });
    const response = await axios.post("https://lemur-14.cloud-iam.com/auth/realms/teamnovauom/protocol/openid-connect/token", data, { headers });
    authToken = response.data.access_token; // Save the token
    refreshToken = response.data.refresh_token; // Save the refresh token
    console.log('AuthToken:', authToken);
    console.log('RefreshToken:', refreshToken);
    console.log('User logged in:', response.data);

    // Store tokens in cookies
    Cookies.set('authToken', authToken, { expires: response.data.expires_in / 86400 }); // expires_in is in seconds, convert to days
    Cookies.set('refreshToken', refreshToken, { expires: response.data.refresh_expires_in / 86400 }); // refresh_expires_in is in seconds, convert to days

    return response.data;

  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export const RefreshToken = async () => {
  try {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('myclient:L3EAIPntMBOoVJYfc0p1gM4PpIIwcqrL')
    };

    const data = new URLSearchParams({
      'client_id': 'health-Hive-client',
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken
    }).toString();

    // const response = await axios.post("http://localhost:8080/realms/Health-Hive/protocol/openid-connect/token", data, { headers });
    const response = await axios.post("https://lemur-14.cloud-iam.com/auth/realms/teamnovauom/protocol/openid-connect/token", data, { headers });
    authToken = response.data.access_token; // Save the new token
    refreshToken = response.data.refresh_token; // Save the new refresh token
    console.log('New AuthToken:', authToken);
    console.log('New RefreshToken:', refreshToken);

    // Update tokens in cookies
    Cookies.set('authToken', authToken, { expires: response.data.expires_in / 86400 }); // expires_in is in seconds, convert to days
    Cookies.set('refreshToken', refreshToken, { expires: response.data.refresh_expires_in / 86400 }); // refresh_expires_in is in seconds, convert to days

    return response.data;

  } catch (error) {
    console.error('Refresh token error:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};

export const logoutUser = async () => {
  try {
    if (!authToken) {
      throw new Error('No refresh token available');
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('myclient:L3EAIPntMBOoVJYfc0p1gM4PpIIwcqrL')
    };

    const data = new URLSearchParams({
      'client_id': 'health-hive-client',
      'client_secret': 'L3EAIPntMBOoVJYfc0p1gM4PpIIwcqrL',
      'refresh_token': refreshToken
    }).toString();

    await axios.post(KEYCLOAK_LOGOUT_URL, data, { headers });

    // Clear tokens from client-side storage
    authToken = null;
    refreshToken = null;
    Cookies.remove(authToken);
    Cookies.remove(refreshToken);
    console.log('User logged out successfully');
    //window.location.href = '/login';

  } catch (error) {
    console.error('Logout error:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};

export const performAuthenticatedRequest = async (url, method, data) => {
  try {
    // Initialize tokens from cookies if not already initialized
    if (!authToken || !refreshToken) {
      initializeTokensFromCookies();
    }

    // Check if authToken is available
    const storedAuthToken = Cookies.get('authToken');
    if (!storedAuthToken) {
      throw new Error('No authentication token available');
    }

    // Check if authToken is expired
    const tokenExpirationTime = decodeToken(storedAuthToken).payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime >= tokenExpirationTime) {
      await RefreshToken(); // Refresh the token
    }

    // Make authenticated request with the new token
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    };
    const response = await axios({ method, url, data, headers });
    return response.data;

  } catch (error) {
    console.error('Authenticated request error:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};

const decodeToken = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const decoded = {
    header: JSON.parse(atob(parts[0])),
    payload: JSON.parse(atob(parts[1])),
    signature: parts[2]
  };

  return decoded;
};

// Function to get email from the token


export const fetchLabData = async (labId) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const cachedData = localStorage.getItem(cachingKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      const headers = {
        'Authorization': 'Bearer ' + authToken // Set the token in headers
      };
      const response = await axios.get(`${BASE_URL}/labs/${labId}`, { headers });
      const data = response.data;
      localStorage.setItem(cachingKey, JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.error('Fetch lab data error:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error; // Propagate error for handling elsewhere
    }
  }
};
export const updateLabData = async (labId, newData) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    localStorage.removeItem(cachingKey);
    const response = await axios.put(`${BASE_URL}/labs/${labId}`, newData, { headers });
    return response.data; // Return updated data or handle response as needed
  } catch (error) {
    throw new Error('Error updating lab information');
  }
};
export const ViewUserPutAPI = async (id, selectedUser) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }
    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.put(`${BASE_URL}/users/${id}`, selectedUser, { headers });
    return response; // Return updated data or handle response as needed
  } catch (error) {
    throw new Error('Error updating lab information');
  }
};

export const ViewLabPutAPI = async (id, selectedLab) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }
    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.put(`${BASE_URL}/labs/${id}`, selectedLab, { headers });
    return response; // Return updated data or handle response as needed
  } catch (error) {
    throw new Error('Error updating lab information');
  }
};

export const ViewTipPutAPI = async (id, selectedTip) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }
    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.put(`${BASE_URL}/dailyTips/${id}`, selectedTip, { headers });
    return response; // Return updated data or handle response as needed
  } catch (error) {
    throw new Error('Error updating lab information');
  }
};

export const GetLabIdByEmail = async (email) => {
  try {
    const authToken = Cookies.get('authToken'); // Assuming you store the authToken in cookies

    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken
    };

    const response = await axios.get(`${BASE_URL}/labs/email/${email}`, { headers });
    labId = response.data.id;

    // Store the labId in localStorage
    localStorage.setItem('labId', labId);

    console.log('lab id :', labId);
    return labId;
  } catch (error) {
    throw new Error('Error updating lab information');
  }
};

export const fetchLabInfo = async () => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/labs/${labId}`, { headers });
    console.log('Lab data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the lab information: ", error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {

      throw error;
    }
  }
};

export const fetchLabRequestsByLabId = async () => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/labRequests/lab/${labId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching lab requests:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};
//fetchUserUrl
export const fetchUserUrl = async (userId) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/users/${userId}`, { headers });
    return response.data.profilePictureUrl;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};

export const fetchReports = async (formattedStartDate,formattedEndDate) => {
  localStorage.getItem('labId');
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/labOldUploadss/lab-old-uploads`, { 
      params: {
        labid: labId, 
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
      headers 
    });
    return response;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};

export const fetchTip= async () => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }
    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/dailyTips`, { headers });
    return response;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};

export const fetchUserName = async (userId) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/users/${userId}`, { headers });
    return response.data.fullName;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};


export const FetchUserAPI = async () => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/users`, { headers });
    return response;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};


export const FetchLabAPI = async () => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/labs`, { headers });
    return response;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};

export const fetchUserDataByUserId = async (userId) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.get(`${BASE_URL}/users/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return 'Unknown User';
  }
};

export const UplodeFileToIPFS = async (file) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${BASE_URL}/ipfs/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + authToken // Set the token in headers
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
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.post(`${BASE_URL}/labDataUploads`, {
      description,
      labRequest: labRequestId,
    }, { headers });
    return response.data;
  } catch (error) {
    console.error('Error handling lab data upload:', error);
    return null;
  }
};

export const HealthtipAPI = async (newTip) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.post(`${BASE_URL}/dailyTips`, newTip, { headers });
    return response.data;
  } catch (error) {
    console.error('Error handling lab data upload:', error);
    return null;
  }
};

export const handleFileMetadatainAPI = async (fileName, fileType, filePath, createdDate, labDataUploadId) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.post(`${BASE_URL}/files`, {
      name: fileName,
      type: fileType,
      filePath,
      fileHash: filePath,
      createdDate,
      labDataUpload: labDataUploadId,
    }, { headers });
    //console.log('File metadata uploaded:', response.data);
  } catch (error) {
    console.error('Error handling file metadata:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};

export const checkUploadStatusInAPI = async (labRequestId) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    if (labRequestId != null) {
      const headers = {
        'Authorization': 'Bearer ' + authToken // Set the token in headers
      };
      const response = await axios.get(`${BASE_URL}/labDataUploads/lab-data-uploads/${labRequestId}`, { headers });
      console.log('Upload status:', response.data);
      console.log('Upload labRequestId :', labRequestId);
      return response.data;
    } else {
      console.log('No labRequestId found');
      return null;
    }
  } catch (error) {
    //console.error('Error logging in:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};

// Function to delete user account
export const deleteUserAccount = async (userId) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      Authorization: `Bearer ${authToken}`
    };
    const response = await axios.delete(`${BASE_URL}/users/${userId}`, { headers });
    return response; // Return response data if needed
  } catch (error) {
    throw error; // Throw error for handling in component
  }
};

export const deleteLabAccount = async (email) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      Authorization: `Bearer ${authToken}`
    };
    const response = await axios.delete(`${BASE_URL}/labs/${email}`, { headers });
    return response; // Return response data if needed
  } catch (error) {
    throw error; // Throw error for handling in component
  }
};

export const deleteDailytip = async (id) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      Authorization: `Bearer ${authToken}`
    };
    const response = await axios.delete(`${BASE_URL}/dailyTips/${id}`, { headers });
    return response; // Return response data if needed
  } catch (error) {
    throw error; // Throw error for handling in component
  }
};

export const deleteUserAccountByemail = async (email) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      Authorization: `Bearer ${authToken}`
    };
    const response = await axios.delete(`${BASE_URL}/users/${email}`, { headers });
    return response; // Return response data if needed
  } catch (error) {
    throw error; // Throw error for handling in component
  }
};

export const PutLabdata = async (lab) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    //console.log(`Sending PUT request to ${BASE_URL}/labs/${labId} with data:`, lab); // Debug log
    const response = await axios.put(`${BASE_URL}/labs/${labId}`, lab, { headers });
    //console.log('Lab data updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating lab data:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    //console.log('User logged in:', response.data);
    return response.data; // This should contain the token
  } catch (error) {
    console.error('Error logging in:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};

export const deleteAccount = async () => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.delete(`${BASE_URL}/users/${labId}`, lab, { headers });
    //console.log('Account deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};
export const LabFormPostAPI = async (formValues) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.post(`${BASE_URL}/labs`, formValues, { headers });
    return response;
  } catch (error) {
    console.error('Error handling lab data upload:', error);
    return null;
  }
};

export const DailyTipsPostAPI = async (formValues) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.post(`${BASE_URL}/dailyTips`, formValues, { headers });
    return response;
  } catch (error) {
    console.error('Error handling lab data upload:', error);
    return null;
  }
};

export const CreatePersonalAcountPostAPI = async (formValues) => {
  try {
    if (!authToken) {
      throw new Error('No auth token available');
    }

    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    const response = await axios.post(`${BASE_URL}/users`, formValues, { headers });
    return response;
  } catch (error) {
    console.error('Error handling lab data upload:', error);
    return null;
  }
};

export const updatePassword = async (newPassword) => {
  try {
    // Construct the request body
    const requestBody = {
      type: "password",
      value: newPassword,
      temporary: false // Set to false to update the password permanently
    };

    // Making the PUT request to update the password
    const response = await axios.put(`https://lemur-14.cloud-iam.com/auth/realms/teamnovauom/users/${userId}/reset-password`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.status === 200) {
      throw new Error(response.data.error_description || 'Failed to update password');
    }

    return response.data; // Assuming the response is JSON
  } catch (error) {
    console.error('Error updating password:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
  
};