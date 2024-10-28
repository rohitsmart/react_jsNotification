import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { notify } from '../api/endpoint';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const eventSourceRef = useRef(null);

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
    setHasUnreadNotifications(true);
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      const connectToEventSource = () => {
        eventSourceRef.current = new EventSource(`${notify}?username=${username}`);
        eventSourceRef.current.onmessage = (event) => {
          addNotification(event.data);
        };
        eventSourceRef.current.onerror = (err) => {
          eventSourceRef.current.close();
          setTimeout(() => {
            connectToEventSource();
          }, 5000);
        };
      };
      connectToEventSource();
      return () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
      };
    }
  }, []);

  const markNotificationsAsRead = () => {
    setHasUnreadNotifications(false);
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      setNotifications, // Exposing setNotifications
      hasUnreadNotifications, 
      markNotificationsAsRead 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
