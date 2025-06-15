import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSlots = createAsyncThunk(
  'fetchSlots',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/slots');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookSlot = createAsyncThunk(
  'bookSlot',
  async ({ slotId, name, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/booking/create', {
        slotId,
        name,
        email
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data?.message || "Something went wrong");
    }
  }
);

const initialState = {
  slotsByDate: [],
  loading: false,
  error: null,
  bookingSuccess: false
};

const slotSlice = createSlice({
  name: 'slots',
  initialState,
  reducers: {
    clearBookingSuccess: (state) => {
      state.bookingSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slotsByDate = action.payload;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch slots';
      })
      .addCase(bookSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingSuccess = action?.payload?.booking?._id;
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to book slot';
      });
  }
});

export const { clearBookingSuccess, clearError } = slotSlice.actions;
export default slotSlice.reducer; 