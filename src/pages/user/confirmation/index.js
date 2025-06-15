import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { fetchBookingDetails, clearCurrentBooking } from '../../../redux/bookingSlice';

const Confirmation = ({ booking, loading, fetchBookingDetails, clearCurrentBooking }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBookingDetails(id);
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Confirmed!
        </Typography>
        {booking && (
          <>
            <Typography variant="h6" gutterBottom>
              Booking Details:
            </Typography>
            <Typography>Name: {booking.name}</Typography>
            <Typography>Email: {booking.email}</Typography>
            <Typography>Date: {booking.slot.date}</Typography>
            <Typography>Start Time: {booking.slot.startTime}</Typography>
            <Typography>End Time: {booking.slot.endTime}</Typography>
          </>
        )}
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              clearCurrentBooking()
              navigate('/')
            }}
          >
            Home Page
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              clearCurrentBooking()
              navigate('/slots')
            }}
          >
            Book Another Slot
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  booking: state.booking.currentBooking,
  loading: state.booking.loading
});

const mapDispatchToProps = {
  fetchBookingDetails,
  clearCurrentBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);