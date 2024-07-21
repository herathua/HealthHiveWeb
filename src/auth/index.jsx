import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {//call this function to check if the user is authenticated
  const authToken = Cookies.get('authToken');
 // console.log('AuthToken:', authToken);
  if (!authToken) return false;

  const decodedToken = decodeToken(authToken);
  if (!decodedToken) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  //console.log('Token expiry:', decodedToken.exp);
  //console.log('Current time:', currentTime);
  return true;
};

export const isAdmin = () => {//call this function to check if the user is an admin
  const authToken = Cookies.get('authToken');
  const roles = getRolesFromToken(authToken);
  //console.log('Roles:', roles);
  return roles.includes('admin');
};

export const isLab = () => {//call this function to check if the user is a lab
  const authToken = Cookies.get('authToken');
  const roles = getRolesFromToken(authToken);
  //console.log('Roles:', roles);
  return roles.includes('lab');
};

const decodeToken = (token) => {
  try {
    //console.log('Token decoded:', jwtDecode(token));
    return jwtDecode(token);
  } catch (error) {
    console.error('Token decoding error:', error);
    return null;
  }
};

const getRolesFromToken = (token) => {
  const decodedToken = decodeToken(token);
  if (decodedToken && decodedToken.realm_access && decodedToken.resource_access['Health-Hive-Client'].roles[0]) {
    //console.log('Is lab:', decodedToken.resource_access['Health-Hive-Client'].roles[0].includes('lab'));
    return decodedToken.resource_access['Health-Hive-Client'].roles[0];
  }
  return [];
};