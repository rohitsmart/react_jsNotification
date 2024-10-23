import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';
import avtar from '../../assests/icons/profile.png';
import './Header.css';
import { useNotification } from '../NotificationContext';

const Header = () => {
  const { notifications, hasUnreadNotifications, markNotificationsAsRead, setNotifications } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const handleBellClick = () => {
    markNotificationsAsRead();
    setShowNotifications((prev) => !prev);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setShowNotifications(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
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
            <div className="notification-body">
              {notifications.length === 0 ? (
                <div className="no-notifications">No notifications available.</div>
              ) : (
                notifications.map((note, index) => (
                  <div key={index} className="notification-item">{note}</div>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <button className="clear-all-btn" onClick={handleClearAll}>
                Clear All Notifications
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
