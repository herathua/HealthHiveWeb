import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import logo from '../src/assets/logo.png';
import backgroundImage from '../src/assets/backgroundImage.jpeg'; // Add your background image path here

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleUserClick = () => {
    navigate('/login');
  };

  return (
    <Container
      maxWidth="false" // This prop should be either 'xs', 'sm', 'md', 'lg', 'xl', false
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        textAlign: 'center',
        bgcolor: '#e0f7fa', // Light blue background color
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* Main Content Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          bgcolor: 'rgba(224, 247, 250, 0.6)', // Semi-transparent white background
          padding: 5,
          borderRadius: 3,
          boxShadow: 3,
          marginTop: 3,
          marginBottom: 2,
        }}
      >
        <img src={logo} alt="Health Hive" style={{ width: 150, marginBottom: 20 }} />
        <Typography variant="h2" gutterBottom color="primary">
          HealthHive
        </Typography>
        <Typography variant="h6" gutterBottom>
          Securely Store and Manage Your Health Data
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 600 }}>
          Upload and access your health reports anytime, anywhere. Powered by blockchain technology for enhanced security.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
          <Button
            onClick={handleAdminClick}
            variant="contained"
            color="primary"
            sx={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Admin Login
          </Button>
          <Button
            onClick={handleUserClick}
            variant="contained"
            color="success"
            sx={{ padding: '10px 20px', fontSize: '16px' }}
          >
            User Login
          </Button>
        </Box>
        <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          padding: 2,
          borderRadius: 3,
          bgcolor: 'rgba(224, 247, 250, 0.9)', // Semi-transparent white background
          marginTop: 6,
        }}
      >
        <Typography variant="body1" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body2" color="textSecondary">
        Email:<Link href="mailto:contact@healthhive.com"> contact@healthhive.com</Link> |{' '}
          Phone:<Link href="tel:+1234567890"> (123) 456-7890</Link>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 1 }}>
          {/* Social Media Icons */}
          <IconButton href="https://facebook.com" target="_blank" rel="noopener" color="inherit">
            <Facebook />
          </IconButton>
          <IconButton href="https://twitter.com" target="_blank" rel="noopener" color="inherit">
            <Twitter />
          </IconButton>
          <IconButton href="https://linkedin.com" target="_blank" rel="noopener" color="inherit">
            <LinkedIn />
          </IconButton>
          {/* Add more social media links as needed */}
        </Box>
      </Box>
      </Box>

      
    </Container>
  );
};

export default LandingPage;
