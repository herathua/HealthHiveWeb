import React, { useState } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';
import { updatePassword } from '../../services/apiService';
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

    if (!password || password.length < 5) { // Adjusted to 5 for your requirement
      errors.password = 'Password must be at least 5 characters long.';
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
        console.log('Password update initiated:', response);
        
      } catch (error) {
        setResponseMessage('There was an error updating the password.');
        window.location.reload();
        console.error('Error updating password:', error);
      }
    }
  };

  const isPasswordUpdateDisabled = !password || !confirmPassword || error.password || error.confirmPassword;

  return (
    <div className="w-3/4 mx-auto px-4 sm:px-8 pt-3">  
      <h1 className="text-4xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full flex flex-col border border-blue-500">
      
        <LabData className="flex-grow" />
      </div>
      {/* <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-blue-500">
        <h2 className="text-2xl font-semibold mb-4">Update Password</h2>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordUpdate}
          disabled={isPasswordUpdateDisabled}
        >
          Update Password
        </Button>
      </div> */}
      {responseMessage && (
        <Typography variant="body1" color="secondary" mt={2}>
          {responseMessage}
        </Typography>
      )}
    </div>
  );
}

export default SettingsComponent;
