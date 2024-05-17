import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LabInfomationContent from '../LabInfomationContent/LabInfomationContent';


function SettingsComponent() {
  const [tempPassword, setTempPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    tempPassword: '',
    password: '',
    confirmPassword: ''
  });

  const validatePassword = () => {
    let isValid = true;
    const errors = {
      tempPassword: '',
      password: '',
      confirmPassword: ''
    };

    // Check if the new password is strong enough
    if (!password || password.length < 8 || !/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errors.password = 'Password must be at least 8 characters long and include a number, a lowercase and an uppercase letter.';
      isValid = false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handlePasswordUpdate = () => {
    if (validatePassword()) {
      // Perform PUT request to update the password
      console.log('Password is valid and being updated.');
    }
  };

  const isPasswordUpdateDisabled = !tempPassword || !password || !confirmPassword || error.password || error.confirmPassword;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full flex flex-col">
                    <LabInfomationContent className="flex-grow" />
                </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-semibold mb-4">Update Password</h2>
        <TextField
          label="Temporary Password"
          type="password"
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error.tempPassword}
          helperText={error.tempPassword}
        />
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error.password}
          helperText={error.password}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error.confirmPassword}
          helperText={error.confirmPassword}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordUpdate}
          disabled={isPasswordUpdateDisabled}
        >
          Update Password
        </Button>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-semibold mb-4">Delete Account</h2>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            const confirmDelete = window.confirm('Are you sure you want to delete your account?');
            if (confirmDelete) {
              // Perform DELETE request to delete the account
              console.log('Account deletion initiated.');
            }
          }}
        >
          Delete Account
        </Button>
      </div>

    </div>
  );
}

export default SettingsComponent;
