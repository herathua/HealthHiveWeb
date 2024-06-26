import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';

export default function AccountCreationTerminated() {
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
        <Button variant="contained" sx={{ marginTop: 4, backgroundColor: '#4f6bed' }} href="/signup">
          Back to Form
        </Button>
      </Paper>
    </Box>
  );
}