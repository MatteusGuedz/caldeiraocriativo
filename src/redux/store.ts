import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/authSlice';
import userProgressReducer from './slices/userProgressSlice';
import achievementsReducer from './slices/achievementsSlice';
import errorReducer from './slices/errorSlice';
import { errorMiddleware } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProgress: userProgressReducer,
    achievements: achievementsReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['error/showNotification'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'meta.arg'],
        // Ignore these paths in the state
        ignoredPaths: ['error.notifications[].timestamp'],
      },
    }).concat(errorMiddleware),
});