import React from 'react';
import axios from 'axios';

function DeleteAccount() {
  const handleDeleteAccount = () => {
    axios.delete('http://localhost:33000/api/users/1')
      .then(response => {
        console.log(response);
        // Handle successful deletion here
      })
      .catch(error => {
        console.error(error);
        // Handle error here
      });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-semibold mb-4">Delete Account</h2>
      <button variant="contained" color="error" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccount;