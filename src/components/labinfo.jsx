import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { PutLabdata, fetchLabInfo } from '../services/apiService';

const LabData = () => {
  const [lab, setLab] = useState({
    id: '',
    labRegID: '',
    labName: '',
    address: '',
    email: '',
    telephone: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch the lab data with GET request
    fetchLabInfo()
      .then(response => {
        setLab(response);
      })
      .catch(error => {
        console.error('There was an error fetching the lab data!', error);
      });
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLab(prevLab => ({
      ...prevLab,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!lab.labName) newErrors.labName = 'Lab Name is required';
    if (!lab.address) newErrors.address = 'Address is required';
    if (!lab.telephone) newErrors.telephone = 'Telephone is required';
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(lab.telephone)) {
      newErrors.telephone = 'Telephone must be 10 digits and contain numbers only';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    PutLabdata(lab)
      .then(response => {
        setResponseMessage('Lab data updated successfully!');
      })
      .catch(error => {
        console.error('There was an error updating the lab data!', error);
        setResponseMessage('There was an error updating the lab data.');
      });
  };

  return (
    <Container sx={{ maxWidth: '500px', mt: 4 }}>
      <h2 className="text-2xl font-semibold mb-4">Lab data</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID"
              name="id"
              value={lab.id}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lab Registration ID"
              name="labRegID"
              value={lab.labRegID}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={lab.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lab Name"
              name="labName"
              value={lab.labName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.labName}
              helperText={errors.labName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={lab.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Telephone"
              name="telephone"
              value={lab.telephone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.telephone}
              helperText={errors.telephone}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Lab Data
        </Button>
      </form>
      {responseMessage && (
        <Typography variant="body1" color="secondary" mt={2}>
          {responseMessage}
        </Typography>
      )}
    </Container>
  );
};

export default LabData;
