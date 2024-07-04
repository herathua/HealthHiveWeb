import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';

export default function AccountCreationSuccessful() {
  return (
    <Box
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
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#4f6bed' }} />
        <Typography variant="h4" component="h2" sx={{ marginTop: 2 }}>
          Account Creation Successful!
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginTop: 2, textAlign: 'center', color: 'text.secondary' }}
        >
          Your account has been successfully created. You can now access all the features available to our users.
        </Typography>
        <Button variant="contained" sx={{ marginTop: 4, backgroundColor: '#4f6bed' }} href="/user">
          Home
        </Button>
      </Paper>
    </Box>
  );
}
