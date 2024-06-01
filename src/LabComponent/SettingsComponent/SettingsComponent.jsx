import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { updatePassword, deleteAccount } from '.././../services/apiService';
import LabData from '../../labinfo';

function SettingsComponent() {
  const [tempPassword, setTempPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    tempPassword: '',
    password: '',
    confirmPassword: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const validatePassword = () => {
    let isValid = true;
    const errors = {
      tempPassword: '',
      password: '',
      confirmPassword: ''
    };

    if (!password || password.length < 8 || !/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errors.password = 'Password must be at least 8 characters long and include a number, a lowercase and an uppercase letter.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handlePasswordUpdate = async () => {
    if (validatePassword()) {
      try {
        const response = await updatePassword(password);
        setResponseMessage('Password updated successfully!');
        console.log('Password is valid and being updated:', response);
      } catch (error) {
        setResponseMessage('There was an error updating the password.');
        console.error('Error updating password:', error);
      }
    }
  };

  const handleAccountDeletion = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      try {
        const response = await deleteAccount();
        setResponseMessage('Account deleted successfully!');
        console.log('Account deletion initiated:', response);
      } catch (error) {
        setResponseMessage('There was an error deleting the account.');
        console.error('Error deleting account:', error);
      }
    }
  };

  const isPasswordUpdateDisabled = !tempPassword || !password || !confirmPassword || error.password || error.confirmPassword;

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-3">
      <h1 className="text-4xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full flex flex-col">
        <LabData className="flex-grow" />
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
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
      {responseMessage && (
        <Typography variant="body1" color="secondary" mt={2}>
          {responseMessage}
        </Typography>
      )}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
        <Button
          variant="contained"
          color="error"
          onClick={handleAccountDeletion}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default SettingsComponent;
