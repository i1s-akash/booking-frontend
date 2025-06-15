import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { fetchAllBookings, clearError } from '../../../redux/bookingSlice';
import moment from 'moment';

const Bookings = ({
  bookings,
  loading,
  error,
  fetchAllBookings,
  clearError
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    setIsAuthenticated(!!authStatus);
    if (!authStatus) {
      navigate('/');
      return;
    }
    fetchAllBookings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" onClose={clearError}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          All Bookings
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>Booking ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>Start Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings && bookings?.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell sx={{ textAlign: 'center' }}>{booking._id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{booking.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{booking.email}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{moment(booking.slot.date).format('DD-MM-YYYY')}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{booking.slot.startTime}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{booking.slot.endTime}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="h6" color="text.secondary">
                    No bookings found. The booking list is currently empty.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  bookings: state.booking.bookings,
  loading: state.booking.loading,
  error: state.booking.error
});

const mapDispatchToProps = {
  fetchAllBookings,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);