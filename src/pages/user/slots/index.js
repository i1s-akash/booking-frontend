import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Fade
} from '@mui/material';
import { fetchSlots, bookSlot, clearBookingSuccess, clearError } from '../../../redux/slotSlice';
import BookSlotDialog from '../../../components/user/bookSlot';
import moment from 'moment';

const Slots = ({
  slotsByDate,
  loading,
  error,
  bookingSuccess,
  fetchSlots,
  bookSlot,
  clearBookingSuccess,
  clearError
}) => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    if (bookingSuccess) {
      clearBookingSuccess();
      navigate(`/confirmation/${bookingSuccess}`);
    }
  }, [bookingSuccess]);

  const handleSlotClick = (slot) => {
    clearError();
    setSelectedSlot(slot);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSlot(null);
    setFormData({ name: '', email: '' });
    clearBookingSuccess();
    clearError();
  };

  const handleSubmit = () => {
    bookSlot({
      slotId: selectedSlot._id,
      ...formData
    });
    handleClose();
  };

  if (loading && !slotsByDate.length) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Available Slots
          </Typography>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/')}
            variant="outlined"
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {slotsByDate && slotsByDate?.length > 0 && slotsByDate.map((dateGroup) => (
        <Paper 
          key={dateGroup.date} 
          sx={{ 
            p: 3, 
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              mb: 3,
              fontWeight: 600,
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <EventAvailableIcon /> {moment(dateGroup.date).format('dddd, MMMM D, YYYY')}
          </Typography>
          <Grid container spacing={2}>
            {dateGroup.slots && dateGroup.slots?.length > 0 && dateGroup.slots.map((slot) => (
              <Grid item xs={12} sm={6} md={3} key={slot._id}>
                <Fade in={true} timeout={500}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        gap: 1
                      }}>
                        <AccessTimeIcon color={slot.isBooked ? "disabled" : "primary"} />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: slot.isBooked ? 'text.disabled' : 'text.primary'
                          }}
                        >
                          {slot.startTime} - {slot.endTime}
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 2,
                          color: slot.isBooked ? 'text.disabled' : 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        {slot.isBooked ? 'Already Booked' : 'Available for Booking'}
                      </Typography>

                      <Button
                        variant={slot.isBooked ? "outlined" : "contained"}
                        color={slot.isBooked ? "secondary" : "primary"}
                        fullWidth
                        size="large"
                        disabled={slot.isBooked || loading}
                        onClick={() => handleSlotClick(slot)}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          py: 1
                        }}
                      >
                        {loading ? <CircularProgress size={20} /> : slot.isBooked ? 'Booked' : 'Book Now'}
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}

      <BookSlotDialog
        open={open}
        onClose={handleClose}
        selectedSlot={selectedSlot}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  slotsByDate: state.slot.slotsByDate,
  loading: state.slot.loading,
  error: state.slot.error,
  bookingSuccess: state.slot.bookingSuccess
});

const mapDispatchToProps = {
  fetchSlots,
  bookSlot,
  clearBookingSuccess,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(Slots);