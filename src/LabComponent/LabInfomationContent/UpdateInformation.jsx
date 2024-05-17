import React, { useState } from 'react';
import axios from 'axios';
import LabInfomationContent from '../LabInfomationContent/LabInfomationContent';
import InputField from './InputField'; // Import InputField component

function UpdateInformation({ initialData = {}, onUpdate }) {
  const [formData, setFormData] = useState(initialData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    // Validate telephone: must be exactly 10 digits
    if (formData.telephone.length !== 10 || !/^\d{10}$/.test(formData.telephone)) {
      formIsValid = false;
      tempErrors.telephone = 'Telephone number must be exactly 10 digits.';
    }

    // Validate email: simple validation for format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      tempErrors.email = 'Email is invalid.';
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    // Reset errors on change
    if (errors[id]) {
      setErrors({ ...errors, [id]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please correct the errors before submitting.');
      return;
    }

    try {
      await axios.put('http://localhost:33000/api/labs/1', formData);
      onUpdate(formData);
      alert('Information updated successfully!');
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error updating information:', error);
      alert('An error occurred while updating information.');
    }
  };

  if (formSubmitted) {
    return <LabInfomationContent />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Laboratory Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Registration No" id="labRegID" value={formData.labRegID} onChange={handleChange} />
        <InputField label="Laboratory Name" id="labName" value={formData.labName} onChange={handleChange} />
        <InputField label="Address" id="address" value={formData.address} onChange={handleChange} />
        <InputField label="Email" id="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <InputField label="Telephone" id="telephone" value={formData.telephone} onChange={handleChange} error={errors.telephone} />
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
