import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Container>
            <Typography variant="h1" gutterBottom>
                Welcome to the Landing Page!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLoginClick}>
                Login
            </Button>
        </Container>
    );
};

export default LandingPage;
