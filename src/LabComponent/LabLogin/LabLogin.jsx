import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/logo.png';
import LockIcon from '@mui/icons-material/Lock';

const LabLoginContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //const response = await axios.post('/api/login', { email, password });
      //console.log(response.data);
      navigate('/lab'); // Example navigation

    } catch (error) {
      console.error('Login error:', error);
      setEmailError('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 bg-blue-700 rounded-r-3xl flex flex-col justify-center items-center">
        <img src={Logo} alt="Health Hive Logo" className="mx-auto h-24 w-24 md:h-48 md:w-48" />
        <h2 className="text-white text-xl font-semibold mt-4" style={{ fontSize: 'calc(2rem + 1vw)' }}>Health Hive</h2>
        <span className="text-white" style={{ padding: '10px' }}>Health passport system</span>
      </div>
      <div className="flex-1 flex justify-center items-center bg-gray-100" style={{ padding: '10px' }}>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <div className="mb-4 flex flex-col items-center">
            <LockIcon style={{ fontSize: 40, color: '#3B82F6' }} />
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
          <div className="flex flex-col space-y-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
            <a href="/lab" className="text-sm text-blue-500 hover:text-blue-700 text-left">
              Forgot password?
            </a>
            <div className="flex justify-between text-sm">
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Don't have an account? Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabLoginContainer;
