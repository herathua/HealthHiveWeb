import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const LabData = () => {
  const [lab, setLab] = useState({
    id: '',
    labRegID: '',
    labName: '',
    address: '',
    email: '',
    telephone: ''
  });

  useEffect(() => {
    // Fetch the lab data with GET request
    axios.get('http://localhost:33000/api/labs/1')
      .then(response => {
        setLab(response.data);
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
    // Update the lab data with PUT request
    axios.put('http://localhost:33000/api/labs/1', lab)
      .then(response => {
        console.log('Lab data updated successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the lab data!', error);
      });
  };

  return (
    <Container>
      <h2 className="text-2xl font-semibold mb-4">Lab data</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID"
          name="id"
          value={lab.id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Lab Registration ID"
          name="labRegID"
          value={lab.labRegID}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Lab Name"
          name="labName"
          value={lab.labName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={lab.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={lab.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Telephone"
          name="telephone"
          value={lab.telephone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" 
        variant="contained" 
        color="primary" 
        
        >
          Update Lab Data
        </Button>
      </form>
    </Container>
  );
};

export default LabData;
