import React, { useState } from 'react';
import axios from 'axios';
import LabInfomationContent from '../LabInfomationContent/LabInfomationContent';
import InputField from './InputField'; // Import InputField component

// UpdateInformation component
function UpdateInformation({ initialData = {}, onUpdate }) {
  const [formData, setFormData] = useState(initialData);
  const [formSubmitted, setFormSubmitted] = useState(false); // Define formSubmitted state variable
  const [errorMessage, setErrorMessage] = useState(''); // Define errorMessage state variable

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
      await axios.put('http://localhost:33000/api/labs/1', formData);
      onUpdate(formData); // Update parent component's data
      alert('Information updated successfully!');
      setFormSubmitted(true); // Set formSubmitted to true after successful submission
    } catch (error) {
      console.error('Error updating information:', error);
      alert('An error occurred while updating information.');
      alert(errorMessage);
    }
  };

  // Render LabInfomationContent component if formSubmitted is true
  if (formSubmitted) {
    return <LabInfomationContent/>;
  }

  // Render the form
  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Laboratory Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Registration No" id="labRegID" value={formData.labRegID} onChange={handleChange} />
        <InputField label="Laboratory Name" id="labName" value={formData.labName} onChange={handleChange} />
        <InputField label="Address" id="address" value={formData.address} onChange={handleChange} />
        <InputField label="Email" id="email" value={formData.email} onChange={handleChange} />
        <InputField label="Telephone" id="telephone" value={formData.telephone} onChange={handleChange} />
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