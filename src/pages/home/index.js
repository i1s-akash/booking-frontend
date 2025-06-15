import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import LoginModal from '../../components/admin/login';

const Home = () => {
  const navigate = useNavigate();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Booking Frontend
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/slots')}
          fullWidth
        >
          Book Slot
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => setIsAdminModalOpen(true)}
          fullWidth
        >
          Admin Login
        </Button>
      </Box>
      <LoginModal
        open={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
    </Container>
  );
}; 

export default Home;