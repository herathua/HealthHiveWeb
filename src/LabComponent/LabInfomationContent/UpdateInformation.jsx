import React, { useState } from 'react';
import axios from 'axios';
import LabInfomationContent from './LabInfomationContent';

// UpdateInformation component
function UpdateInformation({ initialData = {}, onUpdate }) {
    const [formData, setFormData] = useState(initialData);
    const [formSubmitted, setFormSubmitted] = useState(false); // Define formSubmitted state variable

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send updated data to server using PUT request
            await axios.put('http://localhost:33000/api/labs/3', formData);
            onUpdate(formData); // Update parent component's data
            alert('Information updated successfully!');
            setFormSubmitted(true); // Set formSubmitted to true after successful submission
            
        } catch (error) {
            console.error('Error updating information:', error);
            alert('An error occurred while updating information.');
        }
    };

    // Render LabInfomationContent component if formSubmitted is true
    if (formSubmitted) {
        return <LabInfomationContent />;
    }
    
    // Render the form
    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md flex flex-col bg-gray-200">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Laboratory Info</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="labRegID" className="block text-gray-700 text-sm font-bold mb-2">Laboratory Name</label>
                <input type="text" id="labRegID" value={formData.labRegID} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="labName" className="block text-gray-700 text-sm font-bold mb-2">Registration No</label>
                <input type="text" id="labName" value={formData.labName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="text" id="address" value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Telephone</label>
                <input type="text" id="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="telephone" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                <input type="text" id="telephone" value={formData.telephone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex justify-between">
    <button type="submit" className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
        Save
    </button>
    <button type="button" onClick={() => setFormSubmitted(true)} className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
        Exit
    </button>
</div>

        </form>
        </div>
    );
}

export default UpdateInformation;
