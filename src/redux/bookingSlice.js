import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllBookings = createAsyncThunk(
  'fetchAllBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/booking/all');
      return response.data?.bookings || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookingDetails = createAsyncThunk(
  'fetchBookingDetails',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/booking/${bookingId}`);
      return response.data?.booking;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.bookings = [];
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(fetchBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer; 