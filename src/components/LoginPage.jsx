import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import LockIcon from '@mui/icons-material/Lock';
import {GetToken,GetLabIdByEmail } from '../services/apiService';
//import { GetToken } from './auth/Keycloak';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


const LabLoginContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await GetToken(email, password);
      if (response) {
        const { access_token: token } = response; // Destructure the access_token from response

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Store the token in cookies
        Cookies.set('authToken', token, { expires: response.expires_in / 86400 }); // expires_in is in seconds
        //console.log('Token');
        // Call the GetLabIdByEmail function


        // Navigate to /lab after successful login
        //jwtDecode(token);
        if (getRolesFromToken(token) === 'lab') { await GetLabIdByEmail(email); navigate('/lab'); }
        else if (getRolesFromToken(token) === 'admin') navigate('/admin');
        //else console.log('Invalid email or password');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid email or password');
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
    className="flex-1 bg-blue-700 rounded-r-3xl flex flex-col justify-center items-center"
    style={{ backgroundColor: 'rgb(30, 58, 138)' }}
  >
       <a href="/">
          <img src={Logo} alt="Health Hive Logo" className="mx-auto h-24 w-24 md:h-48 md:w-48" />
        </a>
        <h2 className="text-white text-xl font-semibold mt-4" style={{ fontSize: 'calc(2rem + 1vw)' }}>Health Hive</h2>
        <span className="text-white" style={{ padding: '10px' }}>Health passport system</span>
      </div>
      <div className="flex-1 flex justify-center items-center bg-gray-100" style={{ padding: '10px' }}>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <div className="mb-4 flex flex-col items-center">
            <LockIcon style={{ fontSize: 40, color: '#1e3a8a' }} />
            <h3 className="text-xl font-semibold my-2">Sign In</h3>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
          </div>
          {loginError && <p className="text-red-500 text-xs italic">{loginError}</p>}
          <div className="flex flex-col space-y-2">
            <button
              className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
            <a href="https://lemur-6.cloud-iam.com/auth/realms/teamnova/login-actions/reset-credentials" className="text-sm text-blue-500 hover:text-blue-700 text-left">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabLoginContainer;
