import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa'; // Importing bell and close icons
import avtar from '../../assests/icons/profile.png';
import './Header.css';
import { useNotification } from '../NotificationContext';

const Header = () => {
  const { notifications, hasUnreadNotifications, markNotificationsAsRead } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null); // Reference to the notification box

  const handleBellClick = () => {
    markNotificationsAsRead(); // Mark notifications as read when bell is clicked
    setShowNotifications((prev) => !prev); // Toggle notification box
  };

  const handleClose = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the bell click handler
    setShowNotifications(false); // Close the notification box
  };

  // Close the notification box if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationRef]);

  return (
    <header className="header">
      <div className="profile-section">
        <img src={avtar} alt="Profile" className="profile-avatar" />
        <span className="username">{localStorage.getItem("username")}</span>
      </div>

      <div className="notification-section" onClick={handleBellClick} title={notifications.length === 0 ? "No notifications" : "Click to view notifications"}>
        <div className={`notification-icon ${hasUnreadNotifications ? 'glow' : ''}`}>
          <FaBell />
        </div>
        {showNotifications && (
          <div className="notification-box" ref={notificationRef}>
            <div className="notification-header">
              <span>Notifications</span>
              <FaTimes onClick={handleClose} className="close-icon" />
            </div>
            {notifications.length === 0 ? (
              <div className="no-notifications">No notifications available.</div>
            ) : (
              notifications.map((note, index) => (
                <div key={index} className="notification-item">{note}</div>
              ))
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
