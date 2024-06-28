import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    heading: '',
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('Do you want to submit?')) {
      console.log('Form submitted:', formData);
      // Process form data here
    }
  };

  const handleCancel = () => {
    setFormData({
      heading: '',
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
        <InputLabel id="heading-label">Heading</InputLabel>
        <Select
          labelId="heading-label"
          id="heading"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          label="Heading"
        >
          <MenuItem value="">
            <em>Select a heading</em>
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
