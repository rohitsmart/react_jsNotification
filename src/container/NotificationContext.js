import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import './notify.css';
import { notify } from '../api/endpoint';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false); // New state for unread notifications
  const eventSourceRef = useRef(null);

  const addNotification = (message) => {
    console.log("Adding notification:", message);
    setNotifications((prev) => [...prev, message]);
    setHasUnreadNotifications(true); // Set unread notifications when a new one is received
    setTimeout(() => {
      setNotifications((prev) => prev.filter((_, i) => i !== 0));
    }, 5000);
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("Username for notifications:", username);

    if (username) {
      const connectToEventSource = () => {
        eventSourceRef.current = new EventSource(`${notify}?username=${username}`);

        eventSourceRef.current.onmessage = (event) => {
          console.log("Notification received:", event.data);
          addNotification(event.data);
        };

        eventSourceRef.current.onerror = (err) => {
          console.error("EventSource error:", err);
          eventSourceRef.current.close();
          setTimeout(() => {
            console.log("Reconnecting to notifications...");
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
    setHasUnreadNotifications(false); // Mark notifications as read when user views them
  };

  return (
    <NotificationContext.Provider value={{ addNotification, notifications, hasUnreadNotifications, markNotificationsAsRead }}>
      {children}
      <NotificationDisplay notifications={notifications} />
    </NotificationContext.Provider>
  );
};

// NotificationDisplay component
const NotificationDisplay = ({ notifications }) => {
  return (
    <div className="notification-container">
      {notifications.map((note, index) => (
        <div key={index} className="notification">
          {note}
        </div>
      ))}
    </div>
  );
};

export default NotificationProvider;
