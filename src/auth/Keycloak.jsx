import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const GetToken = async (email, password) => {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('myclient:L3EAIPntMBOoVJYfc0p1gM4PpIIwcqrL')
    };

    const data = new URLSearchParams({
      'client_id': 'health-hive-client',
      'grant_type': 'password',
      'username': email,
      'password': password
    }).toString();

    const response = await axios.post("http://localhost:8080/realms/Health-Hive/protocol/openid-connect/token", data, { headers });
    const authToken = response.data.access_token; // Save the token
    const refreshToken = response.data.refresh_token; // Save the refresh token
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

const decodeToken = (token) => {
  try {
    console.log('Token decoded:', jwtDecode(token));
    return jwtDecode(token);
  } catch (error) {
    console.error('Token decoding error:', error);
    return null;
  }
};

const getRolesFromToken = (token) => {
  const decodedToken = decodeToken(token);
  if (decodedToken && decodedToken.realm_access && decodedToken.resource_access['health-hive-client'].roles[0]) {
    console.log('Is lab:', decodedToken.resource_access['health-hive-client'].roles[0].includes('lab'));
    return decodedToken.resource_access['health-hive-client'].roles[0];
  }
  return [];
};

export const isAuthenticated = () => {//call this function to check if the user is authenticated
  const authToken = Cookies.get('authToken');
  if (!authToken) return false;

  const decodedToken = decodeToken(authToken);
  if (!decodedToken) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  console.log('Token expiry:', decodedToken.exp);
  return decodedToken.exp > currentTime;
};

export const isAdmin = () => {//call this function to check if the user is an admin
  const authToken = Cookies.get('authToken');
  const roles = getRolesFromToken(authToken);
  console.log('Roles:', roles);
  return roles.includes('admin');
};

export const isLab = () => {//call this function to check if the user is a lab
  const authToken = Cookies.get('authToken');
  const roles = getRolesFromToken(authToken);
  console.log('Roles:', roles);
  return roles.includes('lab');
};
