import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SettingsComponent() {
  const [tempPassword, setTempPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      // Perform DELETE request to delete the account
    }
  };

  const handlePasswordUpdate = () => {
    // Perform PUT request to update the password
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2> {/* Added "Settings" heading */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-semibold mb-4">Update Password</h2>
        <TextField
          label="Temporary Password"
          type="password"
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
          fullWidth
          margin="normal"
          className="mb-4"
        />
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          className="mb-4"
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          className="mb-4"
        />
        <Button variant="contained" color="primary" onClick={handlePasswordUpdate}>
          Update Password
        </Button>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-semibold mb-4">Delete Account</h2>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default SettingsComponent;
