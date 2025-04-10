import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'error' | 'success' | 'info' | 'warning';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timeout?: number;
  timestamp: number;
}

interface ErrorState {
  notifications: Notification[];
}

const initialState: ErrorState = {
  notifications: []
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const id = Math.random().toString(36).substring(2, 9);
      state.notifications.push({
        ...action.payload,
        id,
        timestamp: Date.now()
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    }
  }
});

export const { showNotification, removeNotification, clearAllNotifications } = errorSlice.actions;

export default errorSlice.reducer;