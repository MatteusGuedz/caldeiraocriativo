import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { removeNotification } from '../../redux/slices/errorSlice';
import './style.scss';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector(state => state.error);

  useEffect(() => {
    // Auto-remove notifications after their timeout (default: 5000ms)
    notifications.forEach((notification: any) => {
      const timeout = notification.timeout || 5000;
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, timeout);

      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  const handleClose = (id: string) => {
    dispatch(removeNotification(id));
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-container">
      {notifications.map((notification: any) => (
        <div 
          key={notification.id} 
          className={`notification ${notification.type}`}
        >
          <div className="notification-content">
            {notification.type === 'error' && <span className="icon">❌</span>}
            {notification.type === 'success' && <span className="icon">✅</span>}
            {notification.type === 'info' && <span className="icon">ℹ️</span>}
            {notification.type === 'warning' && <span className="icon">⚠️</span>}
            <span className="message">{notification.message}</span>
          </div>
          <button 
            className="close-btn"
            onClick={() => handleClose(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;