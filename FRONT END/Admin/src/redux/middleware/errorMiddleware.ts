import { Middleware } from 'redux';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { showNotification } from '../slices/errorSlice';

/**
 * Middleware that catches rejected API calls and dispatches error notifications
 */
export const errorMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
  // Check if the action is a rejected action from an API call
  if (isRejectedWithValue(action)) {
    // Extract the error message
    let errorMessage: string;
    
    if (typeof action.payload === 'string') {
      errorMessage = action.payload;
    } else if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
      errorMessage = (action.payload as { message: string }).message || 'Ocorreu um erro na requisição';
    } else {
      errorMessage = 'Ocorreu um erro na requisição';
    }
    
    // Dispatch error notification
    dispatch(showNotification({
      message: errorMessage,
      type: 'error',
      timeout: 5000
    }));
  }
  
  return next(action);
};