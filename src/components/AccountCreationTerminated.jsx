import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountCreationTerminated({ formType }) {
  const navigate = useNavigate();
 console.log(formType);
  const handleBackToForm = () => {
    const path = formType === 'lab' ? 'admin/labcreation' : 'admin/usercreation';
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#4f6bed',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '50px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <CancelIcon sx={{ fontSize: 60, color: '#4f6bed' }} />
        <Typography variant="h4" component="h2" sx={{ marginTop: 2, color: '#4f6bed' }}>
          Account Creation Terminated!
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginTop: 2, textAlign: 'center', color: 'text.secondary' }}
        >
          We were unable to create your account due to a processing error. Please try again or contact support if the problem persists.
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 4, backgroundColor: '#4f6bed' }}
          onClick={handleBackToForm}
        >
          Back to Form
        </Button>
      </Paper>
    </Box>
  );
}
