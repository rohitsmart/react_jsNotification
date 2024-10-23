import React, { useState } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa'; // Importing bell and close icons
import avtar from '../../assests/icons/profile.png';
import './Header.css';
import { useNotification } from '../NotificationContext';

const Header = () => {
  const { notifications, hasUnreadNotifications, markNotificationsAsRead } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBellClick = () => {
    markNotificationsAsRead(); // Mark notifications as read when bell is clicked
    setShowNotifications((prev) => !prev); // Toggle notification box
  };

  const handleClose = () => {
    setShowNotifications(false); // Close the notification box
  };

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
          <div className="notification-box">
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
