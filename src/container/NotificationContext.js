import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import './notify.css';
import { notify } from '../api/endpoint';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const eventSourceRef = useRef(null);

  const addNotification = (message) => {
    console.log("Adding notification:", message); // Debug log
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((_, i) => i !== 0));
    }, 5000);
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("Username for notifications:", username); // Debug log
    if (username) {
      eventSourceRef.current = new EventSource(`${notify}?username=${username}`);
      eventSourceRef.current.onmessage = (event) => {
        console.log("Notification received:", event.data); // Debug log
        addNotification(event.data);
      };

      return () => {
        eventSourceRef.current.close();
      };
    }
  }, []);

  return (
    <NotificationContext.Provider value={addNotification}>
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
