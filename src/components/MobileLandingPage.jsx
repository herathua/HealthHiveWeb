import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container, Link } from '@mui/material';
import logo from '../assets/logo.png';
import click from '../assets/click.svg';
import chain from '../assets/chain.svg';
import lock from '../assets/lock.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/login');
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
        textAlign: 'center',
        bgcolor: 'rgba(30, 58, 138,0.9)', // Change the background color here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 8,
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
          bgcolor: 'rgba(224, 247, 250, 0.9)', // Semi-transparent white background
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
        <Typography variant="body1" sx={{ color: 'rgba(30, 58, 138, 0.9)', maxWidth: 600 }}>
          Upload and access your health reports anytime, anywhere. Powered by blockchain technology for enhanced security.
        </Typography>
        <Box
  sx={{
    display: 'grid',
    gap: '16px',
    mt: 3,
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Button
    onClick={handleAdminClick}
    sx={{
      backgroundColor: '#1E3A8A',
      color: '#FFFFFF',
      py: 2,
      px: 4,
      borderRadius: '24px',
      fontSize: '16px',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#15397C',
      },
    }}
  >
    Admin Login
  </Button>
  <Button
    onClick={handleUserClick}
    sx={{
      border: '2px solid #1E3A8A',
      color: '#1E3A8A',
      py: 2,
      px: 4,
      borderRadius: '24px',
      fontSize: '16px',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#E0F7FA',
      },
    }}
  >
    Lab Login
  </Button>
  <Button
    
    sx={{
      backgroundColor: '#FF0000',
      color: '#FFFFFF',
      py: 2,
      px: 1,
      borderRadius: '24px',
      fontSize: '16px',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#E60000',
      },
    }}
  >
    Download App
  </Button>
</Box>
<div>
        <div className="max-w-screen-xl mx-auto py-20 px-4 ">
          <h2 className="text-center text-5xl font-bold text-black">Revolutionize Your Health Data Management</h2>
          <h4 className="text-center text-2xl font-bold text-black mt-4">Upload and retrieve your health reports on-the-go. Enjoy unparalleled security with our blockchain-based platform.</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            <div className="flex flex-col items-center m-10">
              <img src={lock} alt="Lock" className="h-16 m-10" />
              <h3 className="text-3xl font-semibold text-black">Secure and Encrypted</h3>
              <p className="text-2xl text-black text-center m-4">Your health data is securely stored and encrypted, ensuring privacy and protection against unauthorized access.</p>
            </div>
            <div className="flex flex-col items-center m-10">
              <img src={click} alt="Click" className="h-16 m-10" />
              <h3 className="text-3xl font-semibold text-black">User-Friendly Interface</h3>
              <p className="text-2xl text-black text-center m-4">Our platform is designed with a simple and intuitive interface, making it easy for users of all technical levels to navigate and manage their health data.</p>
            </div>
            <div className="flex flex-col items-center m-10">
              <img src={chain} alt="Chain" className="h-16 m-10" />
              <h3 className="text-3xl font-semibold text-black text-center break-normal ...">Blockchain Technology</h3>
              <p className="text-2xl text-black text-center m-4">Experience the unparalleled security and transparency of blockchain technology for managing and storing your health data.</p>
            </div>
          </div>
        </div>
      </div>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: 2,
            borderRadius: 3,
            bgcolor: 'rgba(224, 247, 250, 0.6)', // Semi-transparent white background
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
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
