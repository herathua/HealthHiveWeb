import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function LabLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Construct the request body
        const requestBody = {
            labRegID: username,
            labPassword: password
        };

        try {
            // Make a POST request to the login endpoint
            const response = await axios.post('http://localhost:33000/api/labs/login', requestBody);

            // Handle the response here (e.g., redirect, show message)
            console.log('Login successful:', response.data);
        } catch (error) {
            // Handle errors (e.g., display error message)
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md flex flex-col bg-gray-200">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Laboratory Info</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LabLogin;
