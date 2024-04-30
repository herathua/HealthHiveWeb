import React, { useEffect, useState } from 'react';

function CustomerDetails({ patientId }) {
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:33000/api/users/${patientId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPatientDetails(data);
      } catch (error) {
        setError(error.message);
        console.error("Fetching patient details failed:", error);
      }
      setLoading(false);
    };

    fetchPatientDetails();
  }, [patientId]);  // Dependency array to ensure the effect runs only when patientId changes

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Details</h2>
      {patientDetails && (
        <ul className="list-disc space-y-3 text-gray-700">
          <li><strong>Full Name:</strong> <span className="text-gray-600">{patientDetails.fullName}</span></li>
          <li><strong>Email:</strong> <span className="text-gray-600">{patientDetails.email}</span></li>
          <li><strong>Telephone:</strong> <span className="text-gray-600">{patientDetails.telephoneNumber}</span></li>
          <li><strong>Gender:</strong> <span className="text-gray-600">{patientDetails.gender}</span></li>
          <li><strong>Age:</strong> <span className="text-gray-600">{patientDetails.age}</span></li>
          <li><strong>Date of Birth:</strong> <span className="text-gray-600">{patientDetails.dateOfBirth}</span></li>
          <li><strong>Birth Certificate Number:</strong> <span className="text-gray-600">{patientDetails.birthCertificateNumber}</span></li>
          <li><strong>NIC:</strong> <span className="text-gray-600">{patientDetails.nic}</span></li>
          <li><strong>Emergency Contact:</strong> <span className="text-gray-600">{patientDetails.emergencyContactName}</span></li>
          <li><strong>Emergency Contact Phone:</strong> <span className="text-gray-600">{patientDetails.emergencyContactNumber}</span></li>
        </ul>
      )}
    </div>
  );
}

export default CustomerDetails;
