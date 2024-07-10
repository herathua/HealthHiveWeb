import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Snackbar, Alert } from '@mui/material';
import { HealthtipAPI } from '../../services/apiService';

const HealthForm1 = () => {
  const [formData, setFormData] = useState({
    type: '',
    message: ''
  });

  const [tip, settip] = useState({
    tip: '',
    heading: '',
    type: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTip = {
      tip: formData.message,
      heading: formData.type,
      type: formData.type,
      date: new Date().toISOString()
    };

    settip(newTip);

    if (newTip.tip && newTip.heading && newTip.type && newTip.date) {
      try {

        const response = await HealthtipAPI(newTip);

        console.log('Form submitted:', response);
        setSnackbarMessage('Form submitted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        setSnackbarMessage('Error submitting the form!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setTimeout(() => {
          window.location.reload();
        }, 3000); // 6000 ms = 6 seconds
      }
    
    }
    else {
      setSnackbarMessage('Please fill all the fields!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      type: '',
      message: ''
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
        padding: 3,
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value="">
            <em>Select a type</em>
          </MenuItem>
          <MenuItem value="Health Tips">Health Tips</MenuItem>
          <MenuItem value="Health News">Health News</MenuItem>
          <MenuItem value="Health Warnings">Health Warnings</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="message"
        name="message"
        label="Message"
        value={formData.message}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        variant="outlined"
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
        <Button type="button" onClick={handleCancel} variant="outlined" color="secondary">Cancel</Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HealthForm1;
