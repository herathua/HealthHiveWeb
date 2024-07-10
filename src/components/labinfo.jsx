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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting lab data:', lab); // Debug log
    PutLabdata(lab)
      .then(response => {
        console.log('Lab data updated successfully:', response);
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
