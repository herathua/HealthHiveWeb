import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    message: ''
  });

  const [tip, settip] = useState({
    tip: '',
    heading: '',
    type: ''
  });

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

    if (window.confirm('Do you want to submit?')) {
      try {
        const response = await axios.post('http://localhost:33000/api/dailyTips', newTip, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Form submitted:', response.data);
      } catch (error) {
        console.error('There was an error submitting the form!', error);
      }
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
        marginTop: 20,
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
          <MenuItem value="health_tip">Health Tips</MenuItem>
          <MenuItem value="health_news">Health News</MenuItem>
          <MenuItem value="health_warning">Health Warnings</MenuItem>
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
    </Box>
  );
};

export default HealthForm;
