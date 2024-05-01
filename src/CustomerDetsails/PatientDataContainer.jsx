import React from 'react';
import CustomerDetails from './CustomerDetails';
//import LabResponseShare from './LabResponseShare';

function PatientDataContainer({ patientId }) {
  return (
    
    <div className="flex justify-center items-start space-x-4 p-4">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <CustomerDetails patientId={patientId} />
      </div>
    </div>
  );
}

export default PatientDataContainer;

