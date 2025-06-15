import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import bookingReducer from './bookingSlice';
import slotReducer from './slotSlice';

const logger = createLogger({
  collapsed: true,
});

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    slot: slotReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
}); 