import React from 'react';
import { FaBell } from 'react-icons/fa'; // Bell icon from react-icons
import avtar from '../../assests/icons/profile.png';
import './Header.css';
import { useNotification } from '../NotificationContext';

const Header = () => {
  const { hasUnreadNotifications, markNotificationsAsRead } = useNotification(); // Access the unread notifications state

  const handleBellClick = () => {
    markNotificationsAsRead(); // Mark notifications as read when bell is clicked
  };

  return (
    <header className="header">
      <div className="profile-section">
        <img src={avtar} alt="Profile" className="profile-avatar" />
        <span className="username">{localStorage.getItem("username")}</span>
      </div>
      
      <div className="notification-section" onClick={handleBellClick}>
        <div className={`notification-icon ${hasUnreadNotifications ? 'glow' : ''}`}>
          <FaBell />
        </div>
      </div>
    </header>
  );
};

export default Header;
