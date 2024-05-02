import React, { useState } from 'react';
import Logo from '../../assets/logo.png'; // Ensure the path is correct
import LockIcon from '@mui/icons-material/Lock'; // Import the lock icon from Material-UI

const LabLoginContainer = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for remember me checkbox

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== '' && password !== '') {
      onLogin();
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Box with rounded corners on the right side */}
      <div className="flex-1 bg-blue-700 rounded-r-3xl flex flex-col justify-center items-center">
        <img src={Logo} alt="Health Hive Logo" className="w-48 h-48" />
        <h2 className="text-white text-xl font-semibold mt-4"style={{ fontSize: 'calc(2rem + 1vw)' }}>Health Hive</h2>
      </div>

      {/* Right Box: LabLogin Component */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <div className="mb-4 flex flex-col items-center">
            <LockIcon style={{ fontSize: 40, color: '#3B82F6' }} />
            <h3 className="text-xl font-semibold my-2">Sign In</h3>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <a href="#" className="text-sm text-blue-500 hover:text-blue-700 text-left">
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
